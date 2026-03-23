
import React from 'react';

export interface FileData {
  data?: string;
  mimeType: string;
  fileUri?: string;
  name?: string;
  size?: number;
  state?: "LOCAL" | "UPLOADING" | "PROCESSING" | "READY" | "FAILED";
  error?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface CreativePlanResponse {
  tiktokScript: string;
  shotPrompts: string[];
  shotScripts: string[];
  consistency_profile: string;
  location_dna?: string;
  background_control?: {
    mode: string;
    preset: string;
  };
  tiktokMetadata: {
    description: string;
    keywords: string[];
  };
  platformPrompts?: Record<string, string>[];
}

export interface Shot {
  shot_number: number;
  visual_prompt: string;
  voiceover_script: string;
  imageUrl: string | null;
  isLoading: boolean;
  error?: string | null;
  platformPrompts?: Record<string, string>;
  outfitImage?: FileData | null;
  locationImage?: FileData | null;
  modelImage?: FileData | null;
  productRefIndex?: number;
  frameType?: string;
}

export interface TrendPromptPack {
  videoSummary: string;
  sceneDetection: string[];
  lightingCameraSignature: string;
  imagePrompts: string[];
  audioBlueprint: string;
  executionSteps: string[];
}

export interface TryOnSettings {
  environment: string;
  customEnvironment: string;
  lighting: string;
  ratio: string;
  quantity: number;
  instructions: string;
  backgroundMode: 'upload' | 'ai';
  complianceMode: boolean; 
}

export interface UGCSettings {
  backgroundMode: "uploaded_lock" | "preset_select" | "auto" | "ai_generate" | "none";
  backgroundPreset: string;
  backgroundPrompt: string;
  lightingPreset: string;
  cameraStyle: string;
  cameraAnglePreset: string;
  moodLock: string;
  moodTone: string;
}

export interface AppInputs {
  productImage: FileData | null;
  ugcProducts: (FileData | null)[]; // Additive: Multi-product support
  modelImage: FileData | null;
  backgroundImage: FileData | null;
  outfitImages: (FileData | null)[];
  locationImages: (FileData | null)[];
  topic: string;
  mood: string;
  language: string;
  scriptStyle: string;
  modelPrompt: string;
  backgroundPrompt: string;
  audioType: string;
  tryonProducts: (FileData | null)[];
  tryonSettings: TryOnSettings;
  ugcSettings: UGCSettings;
  viralVideo: FileData | null; 
  trendTargetStyle: string; 
}

export interface ContentStyle {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  inputs: string[];
  audioStrategy: string;
}
