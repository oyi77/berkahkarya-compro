import { GoogleGenAI, Schema, Type, Modality } from "@google/genai";
import { AppInputs, CreativePlanResponse, FileData, GroundingSource } from "../types";
// Removed non-existent STYLE_MAPPING import
import { CONTENT_STYLES, REALISM_LOCK } from "../constants";
import { buildViralDNAInjection } from "../utils";

const MODEL_PLANNING = 'gemini-3-pro-preview';
const MODEL_IMAGE = 'gemini-2.5-flash-image';
const MODEL_TTS = 'gemini-2.5-flash-preview-tts';

export class GeminiService {
  private static getClient() {
    // Initialize GoogleGenAI with named parameter apiKey
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async runTrendEngine(apiKey: string, videoFile: FileData, niche: string, refs?: { product?: FileData | null, model?: FileData | null, background?: FileData | null }): Promise<string> {
    const ai = this.getClient();
    
    const hasProduct = !!refs?.product;
    const hasModel = !!refs?.model;
    const hasBackground = !!refs?.background;

    const dna = buildViralDNAInjection({ hasProduct, hasModel, hasBackground, mode: 'trend_engine' });

    const systemInstruction = `You are TREND ENGINE — Viral Anatomy (Full Auto, TikTok Raw Creator Mode).
${dna}
Analyze the viral TikTok video for ${niche.toUpperCase()}.
Rebuild it into 6 frames using the Smartphone Raw Creator style.

STRICT RULES:
- If Voiceover exists: Output VO only in Indonesian.
- If Music-only: Output Music Blueprint.
- Prompts must include: "Use Image A as strict identity anchor" and "Use Image B as strict product reference".
- Captured Phone Look Only. No extra commentary.`;

    const parts: any[] = [
      { inlineData: { mimeType: videoFile.mimeType, data: videoFile.data } },
      { text: `Analyze this video and rebuild it for ${niche}. Apply Global Viral Realism DNA.` }
    ];

    if (hasModel) parts.push({ text: "Reference Image A (Identity Anchor)", inlineData: { mimeType: refs.model!.mimeType, data: refs.model!.data } });
    if (hasProduct) parts.push({ text: "Reference Image B (Product)", inlineData: { mimeType: refs.product!.mimeType, data: refs.product!.data } });
    if (hasBackground) parts.push({ text: "Reference Background Plate", inlineData: { mimeType: refs.background!.mimeType, data: refs.background!.data } });

    // Proper generation request using ai.models.generateContent
    const response = await ai.models.generateContent({
      model: MODEL_PLANNING,
      contents: { parts },
      config: { systemInstruction }
    });

    return response.text || "No output generated.";
  }

  static async getCreativePlan(apiKey: string, style: string, inputs: AppInputs, topic: string, language: string, scriptStyle: string): Promise<CreativePlanResponse> {
    const ai = this.getClient();
    
    const dna = buildViralDNAInjection({ 
      hasProduct: !!inputs.productImage, 
      hasModel: !!inputs.modelImage, 
      hasBackground: !!inputs.backgroundImage,
      mode: style
    });

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        tiktokScript: { type: Type.STRING },
        shotPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
        shotScripts: { type: Type.ARRAY, items: { type: Type.STRING } },
        consistency_profile: { type: Type.STRING },
        tiktokMetadata: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        platformPrompts: {
           type: Type.ARRAY,
           items: { type: Type.OBJECT, properties: { dreamina: { type: Type.STRING }, grok: { type: Type.STRING }, meta: { type: Type.STRING } } }
        }
      },
      required: ["tiktokScript", "shotPrompts", "shotScripts", "consistency_profile"]
    };

    const systemInstruction = `You are a Senior Creative Director & Viral Strategist. 
${dna}
Generate a high-conversion storyboard with exactly 6 shots. 
Enforce TikTok Raw Creator aesthetics.`;

    const userQuery = `Buat rencana konten viral: ${topic}. Gaya: ${style}. Bahasa: ${language}. Tone: ${scriptStyle}.`;

    const response = await ai.models.generateContent({
      model: MODEL_PLANNING,
      contents: { parts: [{ text: userQuery }] },
      config: { 
        responseMimeType: "application/json", 
        responseSchema, 
        systemInstruction,
        tools: (style === 'realestate' || style === 'ugc') ? [{googleSearch: {}}] : undefined 
      }
    });

    try {
      // Access response.text directly (property access, not method call)
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.error("Failed to parse creative plan JSON:", response.text);
      throw new Error("Gagal membuat rencana kreatif. Silakan coba lagi.");
    }
  }

  static async generateImage(apiKey: string, prompt: string, referenceImages: (FileData | string)[], config: any): Promise<string> {
    const ai = this.getClient();
    const { style, consistencyProfile, hasProduct, hasModel, hasBackground } = config;
    
    const dna = buildViralDNAInjection({ 
      hasProduct: !!hasProduct, 
      hasModel: !!hasModel, 
      hasBackground: !!hasBackground,
      mode: style 
    });

    const strongPrompt = `
${dna}
[CORE ACTION]
${prompt}.
Identity: ${consistencyProfile}.
Style: ${style}.
Aspect: 9:16 Vertical.
Rules: Smartphone realism, natural skin, no AI glow, grounded shadows.
Exclude: digital painting, 3d render, watermark, text, redesign.`;

    const imageParts: any[] = referenceImages.map(ref => {
        if (typeof ref === 'string') return { text: ref };
        return { inlineData: { mimeType: ref.mimeType, data: ref.data } };
    });

    try {
      const response = await ai.models.generateContent({
        model: MODEL_IMAGE,
        contents: { parts: [{ text: strongPrompt }, ...imageParts] },
        config: {
            imageConfig: { aspectRatio: "9:16" }
        }
      });

      const candidate = response.candidates?.[0];
      if (!candidate) throw new Error("No candidate returned from API");
      
      // Iterate over parts to find inlineData (image generation result)
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
      
      throw new Error("No image data returned from API parts");
    } catch (err: any) {
      console.error("Gemini Image API Error:", err);
      throw new Error(`Render Failed: ${err.message || 'Unknown error'}`);
    }
  }

  static async generateTTS(apiKey: string, text: string, voiceName: string): Promise<string> {
    const ai = this.getClient();
    // Use Modality.AUDIO for TTS requests
    const response = await ai.models.generateContent({
      model: MODEL_TTS,
      contents: { parts: [{ text }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName || 'Puck' } } }
      }
    });
    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return data || "";
  }
}
