import { GoogleGenAI, Schema, Type, Modality } from "@google/genai";
import { AppInputs, CreativePlanResponse, FileData } from "./types";
import { CONTENT_STYLES, REALISM_LOCK } from "./constants";
import { buildViralDNAInjection } from "./utils";

// Model names aligned with guidelines
const MODEL_PLANNING = 'gemini-3-pro-preview';
const MODEL_IMAGE_LITE = 'gemini-2.5-flash-image';
const MODEL_IMAGE_PRO = 'gemini-3-pro-image-preview';
const MODEL_TTS = 'gemini-2.5-flash-preview-tts';
const MODEL_VIDEO_ANALYSIS = 'gemini-3-flash-preview';

export class GeminiService {
  /**
   * Helper to execute API calls with exponential backoff retry for 429 errors
   */
  private static async withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let delay = 2000;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (err: any) {
        const errorMessage = err?.message || String(err);
        const isQuotaError = errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED");
        const isNotFoundError = errorMessage.includes("Requested entity was not found");

        if (isNotFoundError) throw new Error("API_KEY_NOT_FOUND");

        if (isQuotaError && i < maxRetries - 1) {
          console.warn(`Quota exceeded (429). Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
        throw err;
      }
    }
    throw new Error("Max retries exceeded for API call.");
  }

  // Use process.env.API_KEY directly and create new instance right before call as per guidelines
  private static getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async uploadGeminiFile(apiKey: string, file: File): Promise<FileData> {
    const ai = this.getClient();
    // Fix: ai.files.upload returns the FileMetadata object directly in this context, it doesn't have a .file property
    const uploadResponse = await ai.files.upload({
      file: file,
      config: { displayName: file.name }
    });
    
    // Use uploadResponse directly instead of uploadResponse.file
    let geminiFile = uploadResponse as any;
    while (geminiFile.state === 'PROCESSING') {
      await new Promise(resolve => setTimeout(resolve, 3000));
      geminiFile = await ai.files.get({ name: geminiFile.name });
    }
    
    if (geminiFile.state !== 'ACTIVE') {
      throw new Error(`Video processing failed with state: ${geminiFile.state}`);
    }
    
    return {
      fileUri: geminiFile.uri,
      mimeType: geminiFile.mimeType,
      name: geminiFile.name,
      size: file.size,
      state: 'READY'
    };
  }

  static async analyzeProductImage(apiKey: string, productImage: FileData): Promise<string> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const prompt = "You are Product Analyzer. Read the uploaded product image. Infer: product name (if visible), category, key benefit (safe generic, no medical claims), target user, and tone suggestion. Return a short Indonesian product description, TikTok-friendly, max 250 chars.";
      
      const contents = productImage.fileUri ? 
        { parts: [{ fileData: { mimeType: productImage.mimeType, fileUri: productImage.fileUri } }, { text: prompt }] } :
        { parts: [{ inlineData: { mimeType: productImage.mimeType, data: productImage.data! } }, { text: prompt }] };

      const response = await ai.models.generateContent({
        model: MODEL_PLANNING,
        contents
      });
      return response.text || "Deskripsi produk tidak tersedia.";
    });
  }

  static async getCampaignDetail(apiKey: string, style: string, language: string, scriptStyle: string, fields: any, existingText: string, mode: "generate" | "improve"): Promise<string> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const prompt = mode === "generate" 
        ? `Generate a viral marketing campaign description in ${language} using: Product: ${fields.productName}, Audience: ${fields.targetAudience}, Benefit: ${fields.keyBenefit}, Promo: ${fields.pricePromo}. Style: ${style}.`
        : `Improve this description: ${existingText}. Style: ${style}. Tone: ${scriptStyle}.`;

      const response = await ai.models.generateContent({
        model: MODEL_PLANNING,
        contents: { parts: [{ text: prompt }] },
        config: { systemInstruction: "Generate plain text description in Indonesian. No markdown. TikTok friendly." }
      });
      return response.text || "";
    });
  }

  static async runTrendEngine(apiKey: string, videoFile: FileData, niche: string, refs?: { product?: FileData | null, model?: FileData | null, background?: FileData | null }): Promise<string> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const dna = buildViralDNAInjection({ hasProduct: !!refs?.product, hasModel: !!refs?.model, hasBackground: !!refs?.background, mode: 'trend_engine' });
      
      const systemInstruction = `TITLE:
TREND ENGINE VIRAL PACK

SECTION 1:
CLEAN OUTPUT RULES:
- NO ON-SCREEN TEXT. CLEAN PLATE FOR CAPCUT.
- No subtitles, no captions, no watermark, no UI overlay, no shopping cart icon.
- Ignore overlays/watermarks present in the reference viral video; treat them as noise.
- Keep realistic physics and creator smartphone look.

SECTION 2:
REFERENCE LOCK (if refs exist):
${refs?.model ? '- Use Image A as strict identity anchor (match face/body/skin tone/age).' : ''}
${refs?.product ? '- Use Image B as strict product reference (no substitution/redesign).' : ''}
${refs?.background ? '- Lock background plate (do not change environment).' : ''}

SECTION 3:
STORYBOARD (SCENE 1-6):
SCENE 1:
VISUAL PROMPT: [Detailed prompt for Frame 1]
ACTION: [Action description]
CAMERA: [Camera movement]
LIGHTING: [Light setting]
... (Repeat for SCENE 2 through 6)

SECTION 4:
VIDEO PROMPT (PROVIDER-AGNOSTIC):
- One continuous detailed paragraph prompt covering the entire visual sequence.
- Include camera motion: slow push in, gentle pan, micro handheld, realistic physics.
- NO cinematic movie camera movements.
- Preserve identity/product/background/lighting continuity from refs.
- Do NOT mention subtitles/captions/overlays.

SECTION 5:
VOICE OVER (INDONESIAN) — Tone: Santai TikTok:
SCENE 1: [Script]
SCENE 2: [Script]
...
SCENE 6: [Script]
Note: If video appears music-only, still output VO but label as "OPTIONAL VO" and include a "MUSIC BLUEPRINT" bullet list.`;

      const parts: any[] = [];
      
      if (videoFile.fileUri) {
        parts.push({ fileData: { mimeType: videoFile.mimeType, fileUri: videoFile.fileUri } });
      } else if (videoFile.data) {
        parts.push({ inlineData: { mimeType: videoFile.mimeType, data: videoFile.data } });
      } else {
        throw new Error("Video data is missing.");
      }

      parts.push({ text: `Analyze this viral video and rebuild its anatomy for ${niche}. Tone: Santai TikTok. Follow the structure of TREND ENGINE VIRAL PACK exactly.` });

      if (refs?.model?.fileUri) {
        parts.push({ text: "Reference Image A (Identity Anchor)", fileData: { mimeType: refs.model.mimeType, fileUri: refs.model.fileUri } });
      } else if (refs?.model?.data) {
        parts.push({ text: "Reference Image A (Identity Anchor)", inlineData: { mimeType: refs.model.mimeType, data: refs.model.data } });
      }

      if (refs?.product?.fileUri) {
        parts.push({ text: "Reference Image B (Product Reference)", fileData: { mimeType: refs.product.mimeType, fileUri: refs.product.fileUri } });
      } else if (refs?.product?.data) {
        parts.push({ text: "Reference Image B (Product Reference)", inlineData: { mimeType: refs.product.mimeType, data: refs.product.data } });
      }

      if (refs?.background?.fileUri) {
        parts.push({ text: "Reference Image C (Background Plate)", fileData: { mimeType: refs.background.mimeType, fileUri: refs.background.fileUri } });
      } else if (refs?.background?.data) {
        parts.push({ text: "Reference Image C (Background Plate)", inlineData: { mimeType: refs.background.mimeType, data: refs.background.data } });
      }

      const response = await ai.models.generateContent({
        model: MODEL_VIDEO_ANALYSIS,
        contents: [{ role: "user", parts }],
        config: { systemInstruction }
      });

      const resultText = response.text;
      if (!resultText || resultText.trim().length < 50) {
        throw new Error("Analisis gagal (output kosong). Coba video lain / kompres.");
      }
      return resultText;
    });
  }

  static async getCreativePlan(apiKey: string, style: string, inputs: AppInputs, topic: string, language: string, scriptStyle: string): Promise<CreativePlanResponse> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const dna = buildViralDNAInjection({ hasProduct: !!inputs.productImage || inputs.ugcProducts.length > 0, hasModel: !!inputs.modelImage, hasBackground: !!inputs.backgroundImage, mode: style });
      
      const responseSchema: Schema = {
        type: Type.OBJECT,
        properties: {
          tiktokScript: { type: Type.STRING },
          shotPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
          shotScripts: { type: Type.ARRAY, items: { type: Type.STRING } },
          consistency_profile: { type: Type.STRING },
          tiktokMetadata: { type: Type.OBJECT, properties: { description: { type: Type.STRING }, keywords: { type: Type.ARRAY, items: { type: Type.STRING } } } }
        },
        required: ["tiktokScript", "shotPrompts", "shotScripts", "consistency_profile", "tiktokMetadata"]
      };

      const systemInstruction = `Senior TikTok Director. ${dna}\nPlan 6 shots. Focus on authenticity. Shot 4 MUST be macro/texture focus. Identity/Product lock. No outfit change across scenes.`;
      const response = await ai.models.generateContent({
        model: MODEL_PLANNING,
        contents: { parts: [{ text: `Topic: ${topic}. Language: ${language}. Style: ${style}.` }] },
        config: { responseMimeType: "application/json", responseSchema, systemInstruction }
      });
      return JSON.parse(response.text || '{}');
    });
  }

  static async generateImage(apiKey: string, prompt: string, referenceImages: (FileData | string)[], config: any): Promise<string> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const modelName = config.useHighQuality ? MODEL_IMAGE_PRO : MODEL_IMAGE_LITE;
      
      const parts: any[] = referenceImages.map(ref => {
        if (typeof ref === 'string') return { text: ref };
        if (ref.fileUri) return { fileData: { mimeType: ref.mimeType, fileUri: ref.fileUri } };
        return { inlineData: { mimeType: ref.mimeType, data: ref.data! } };
      });
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts },
        config: { imageConfig: { aspectRatio: "9:16", imageSize: config.useHighQuality ? "1K" : undefined } }
      });

      const data = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (!data) throw new Error("Image generation failed (Empty response).");
      return data;
    });
  }

  static async generateTTS(apiKey: string, text: string, voiceName: string): Promise<string> {
    return this.withRetry(async () => {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: MODEL_TTS,
        contents: { parts: [{ text }] },
        config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName || 'Puck' } } } }
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
    });
  }
}
