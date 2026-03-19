
import { TIKTOK_COMPLIANCE_FRAMES, UGC_BACKGROUND_PRESETS, UGC_LIGHTING_PRESETS, UGC_CAMERA_ANGLES, UGC_MOOD_LOCKS } from './constants';
import { FileData, Shot, TryOnSettings, UGCSettings } from './types';

export const ensureString = (val: any): string => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? "Yes" : "No";
  if (Array.isArray(val)) return val.map(item => ensureString(item)).join(', ');
  if (typeof val === 'object') {
    try { return Object.values(val).map(v => ensureString(v)).join(' | '); } catch (e) { return "Complex Data"; }
  }
  return String(val);
};

export const safeArray = (val: any): any[] => (Array.isArray(val) ? val : []);

/**
 * Global Viral Realism DNA Injection
 */
export const buildViralDNAInjection = (params: {
  hasProduct: boolean;
  hasModel: boolean;
  hasBackground: boolean;
  mode?: string;
}) => {
  return `
[GLOBAL VIRAL REALISM DNA - MANDATORY ENFORCEMENT]
- VISUAL: Smartphone realism (35-50mm lens), handheld micro-drift (3-5%). Captured phone look, NOT AI render.
- TEXTURE: Visible skin pores, real fabric wrinkles, natural reflections, neutral contrast. No plastic skin or AI-glow.
- LIGHTING: Soft side-window key light. Enforce clean grounded contact shadows. Match lighting to reference plates.
- COMPOSITION: Vertical 9:16, tight-crop, scroll-stopper framing.
- REFERENCE LOCK:
  ${params.hasModel ? "  * MODEL (Image A): STRICT IDENTITY LOCK. Face, hair, makeup, and proportions must match 1:1." : ""}
  ${params.hasProduct ? "  * PRODUCT (Image B): STRICT PRODUCT LOCK. Logo, color, shape, and texture must match 1:1. No redesign." : ""}
  ${params.hasBackground ? "  * BACKGROUND (Image C): IMMUTABLE BACKGROUND PLATE. DO NOT change geometry, walls, floor, furniture, or perspective." : ""}
`;
};

/**
 * UGC Specific Prompt Builder with Strict Constraints (UGC Review ONLY)
 */
export const buildUGCPrompt = (settings: UGCSettings, consistencyProfile: string, basePrompt: string, hasUploadedBg: boolean): string => {
  // 1. Lighting Preset
  let lightingRule = "Natural side window light, late afternoon, soft shadows.";
  const lightOpt = UGC_LIGHTING_PRESETS.find(l => l.id === settings.lightingPreset);
  if (lightOpt) lightingRule = `Lighting: ${lightOpt.name} preset. Professional but realistic.`;

  // 2. Camera Angle
  let cameraRule = "Handheld smartphone perspective.";
  const angleOpt = UGC_CAMERA_ANGLES.find(a => a.id === settings.cameraAnglePreset);
  if (angleOpt) cameraRule = `Perspective: ${angleOpt.name} camera angle.`;

  // 3. Mood Lock
  let moodRule = "";
  const moodOpt = UGC_MOOD_LOCKS.find(m => m.id === settings.moodLock);
  if (moodOpt) moodRule = `Mood: ${moodOpt.name}.`;

  // 4. Background Strategy
  let bgRule = "BACKGROUND: Minimal professional studio environment.";
  if (settings.backgroundMode === 'uploaded_lock' && hasUploadedBg) {
    bgRule = "BACKGROUND LOCK: STRICTLY preserve the provided background image (Image C). Do not regenerate walls, floor, or geometry.";
  } else if (settings.backgroundMode === 'ai_generate') {
    bgRule = `BACKGROUND: ${settings.backgroundPrompt}.`;
  } else if (settings.backgroundMode === 'preset_select') {
    const presetName = UGC_BACKGROUND_PRESETS.find(p => p.id === settings.backgroundPreset)?.name || "Room";
    bgRule = `BACKGROUND: ${presetName}. Realistic creator environment.`;
  }

  // --- HARD PRODUCT LOCKS (A3-A7) ---
  const referenceLock = `
[REFERENCE LOCK - MANDATORY]
- Use uploaded images as immutable references; match identity, product, and wardrobe exactly.
- CATEGORY LOCK: Do not reinterpret category. Fashion remains fashion, skincare remains skincare. No substitution.
- WEARABLE LOGIC: If Image B is clothing, model MUST wear it. Remove previous outfit. Match fabric, print, and cut 1:1.
- OBJECT LOGIC: If Image B is an object, model holds/demonstrates it. Match label and shape exactly.
- VISUAL FIDELITY: Preserve product color, shape, texture, and text. No redesign. No shopping cart icons.
`;

  // --- HARD NEGATIVE CONSTRAINTS (A8) ---
  const negatives = `no random bottle, no generic serum, no product substitution, no extra hands, no extra fingers, no floating product, no shopping cart icon, no UI overlay, no watermark, no missing legs, no deformed anatomy.`;

  return `
VERTICAL 9:16, captured photo realism. Smartphone camera.
${referenceLock}
${bgRule}
${lightingRule}
${cameraRule}
${moodRule}
Identity Anchor: ${consistencyProfile}
ACTION: ${basePrompt}
--negative_prompt ${negatives}, cinematic, 3d render, anime, cartoon, text.`;
};

export const buildTryOnPrompt = (settings: TryOnSettings, consistencyProfile: string, frameId?: string, hasUploadedBg: boolean = false): string => {
  const lighting = settings.lighting;
  const extra = settings.instructions;
  const frameInfo = frameId ? TIKTOK_COMPLIANCE_FRAMES.find(f => f.id === frameId) : null;
  const framingPrompt = frameInfo ? `Framing: ${frameInfo.instruction}.` : '';
  
  const dna = buildViralDNAInjection({ hasProduct: true, hasModel: true, hasBackground: hasUploadedBg, mode: 'tryon' });
  const bgInstruction = hasUploadedBg ? "ACTION: Use Image C as immutable background." : `Environment: ${settings.environment}.`;

  return `${dna}
MASTERPIECE FASHION RENDER. ${framingPrompt} ${bgInstruction} ${lighting} lighting.
Model identity: ${consistencyProfile}. Model is wearing the exact garment from product reference. ${extra}.
--negative_prompt digital painting, anime, cinematic render, perfect skin, 3d, watermark, text.`;
};

export const buildGoogleFlowPrompt = (shot: Shot, index: number): string => {
  return `
[GOOGLE FLOW VIDEO PROMPT - SCENE ${index + 1}]
PRIMARY IMAGE PREFERENCE: Use the generated image as a strict visual lock for model, product, wardrobe, lighting, and background.
STRICT CONTINUITY: Do not reinterpret visual elements.

TIMELINE:
0-2s: Hook - Gentle zoom in on ${index === 3 ? 'product texture' : 'model face'}.
2-5s: Demo - Subtle handheld motion of model interacting with product.
5-8s: Reaction/Result - Authentic expression, showing efficacy.
8-12s: CTA - Natural gesture towards the bottom of the frame.

MOTION CONSTRAINTS:
- Slow push-in movement.
- Gentle camera pan.
- Micro handheld smartphone drift.
- Realistic physics.
- NO cinematic movie camera movements.
`;
};

export const generateFallbackPrompt = (tool: string, shot: Shot, style: string, index: number, audioType: string, script: string, scriptStyle: string): string => {
    return `Viral video for ${tool.toUpperCase()}. ${shot.visual_prompt}. Vibe: ${scriptStyle}. 9:16 Vertical.`;
};

export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
