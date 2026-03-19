
import React from 'react';
import { 
  User, Tv, Camera, RefreshCw, Footprints, Building, Wand2, Coffee, Video, Plane, Shirt, Zap
} from 'lucide-react';
import { ContentStyle } from './types';

export const LANGUAGES = [ 
  { id: 'Indonesian', name: 'Bahasa Indonesia (ID)' }, 
  { id: 'Malay', name: 'Bahasa Melayu (MY)' }, 
  { id: 'English', name: 'English (US)' } 
];

export const SCRIPT_STYLES = [ 
  { id: 'Direct & Clear', name: 'Langsung & Jelas' }, 
  { id: 'Poetic', name: 'Puitis & Menyentuh' }, 
  { id: 'Casual', name: 'Santai & Akrab' }, 
  { id: 'Professional', name: 'Resmi & Terpercaya' }, 
  { id: 'Hype', name: 'Semangat (Racun Belanja)' } 
];

export const TREND_TARGET_STYLES = [
  { id: 'shopee', name: 'Shopee Product Listing' },
  { id: 'tiktok_affiliate', name: 'TikTok Affiliate Style' },
  { id: 'insta_editorial', name: 'Instagram Editorial' },
  { id: 'magazine_luxury', name: 'Magazine Luxury' }
];

export const UGC_LIGHTING_PRESETS = [
  { id: 'natural_window_soft', name: 'Cahaya Jendela Natural (Lembut)' },
  { id: 'studio_softbox', name: 'Studio Softbox (Terang)' },
  { id: 'cinematic_contrast', name: 'Kontras Sinematik (Mewah)' },
  { id: 'product_high_key', name: 'Produk High Key (Tajam)' },
  { id: 'warm_sunset', name: 'Nuansa Matahari Terbenam (Hangat)' }
];

export const UGC_CAMERA_ANGLES = [
  { id: 'eye_level_medium', name: 'Sejajar Mata (Natural)' },
  { id: 'top_down_product', name: 'Dari Atas Produk (Flatlay)' },
  { id: 'low_angle_power', name: 'Sudut Bawah (Kesan Kokoh)' },
  { id: 'side_3_4_portrait', name: 'Sudut Samping 3/4 (Estetik)' },
  { id: 'macro_texture', name: 'Makro Tekstur (Detail)' }
];

export const UGC_MOOD_LOCKS = [
  { id: 'fresh_clean', name: 'Cerah & Bersih' },
  { id: 'luxury_premium', name: 'Mewah & Premium' },
  { id: 'playful', name: 'Ceria & Menyenangkan' },
  { id: 'serious_review', name: 'Review Serius (Detail)' },
  { id: 'cozy_home', name: 'Suasana Rumah Nyaman' }
];

export const UGC_CAMERA_STYLES = [
  { id: 'handheld_micro', name: 'Handheld Micro' },
  { id: 'static_tripod', name: 'Static Tripod' }
];

export const UGC_BACKGROUND_PRESETS = [
  { id: 'room', name: 'Ruangan Dalam Rumah (Sederhana)' },
  { id: 'vanity', name: 'Meja Rias (Estetik)' },
  { id: 'studio', name: 'Studio Bersih Minimalis' },
  { id: 'cafe', name: 'Suasana Kafe Santai' },
  { id: 'outdoor', name: 'Luar Ruangan (Golden Hour)' }
];

// GLOBAL LOCKS - Aligned with Viral Realism DNA
export const REALISM_LOCK = "Smartphone raw photo, handheld creator style, natural 35mm lens, realistic skin texture with pores, fabric wrinkles, soft side-window lighting, neutral contrast, grounded contact shadows, captured marketplace look, 9:16 vertical crop.";

export const VOICE_OPTIONS = [ 
  { id: 'Puck', name: 'Pria - Ramah' }, 
  { id: 'Fenrir', name: 'Pria - Berat & Berwibawa' }, 
  { id: 'Charon', name: 'Pria - Narator Kalem' }, 
  { id: 'Kore', name: 'Wanita - Ceria & Semangat' }, 
  { id: 'Aoede', name: 'Wanita - Elegan & Mewah' }, 
  { id: 'Leda', name: 'Wanita - Gaya Bercerita' } 
];

export const TRYON_ENVIRONMENTS = [
  "Studio Minimal", "Studio High-End", "Kamar Estetik", "Jalanan Kota", 
  "Cafe Modern", "Fashion Store", "Outdoor Park", "Runway Lights"
];

export const TRYON_LIGHTING = [
  "Soft Natural", "Studio Softbox", "Dramatic Cinematic", "High-Key Clean", "Golden Hour", "Neon Night"
];

export const TIKTOK_COMPLIANCE_FRAMES = [
  { id: 'hook', name: 'Tight Beauty Portrait (Hook)', instruction: 'Tight beauty portrait framing face and upper torso. Focus on natural skin and features.' },
  { id: 'authority', name: 'Full Body Front Authority', instruction: 'Full body wide shot, centered, model standing straight. Handheld perspective.' },
  { id: 'power', name: 'Low Angle Power', instruction: 'Low angle shot looking up at the model. Heroic stance, handheld drift.' },
  { id: 'profile', name: 'Side Compression Profile', instruction: 'Side profile shot showing garment fit and seams. Soft side lighting.' },
  { id: 'editorial', name: 'Intimate Editorial Offset', instruction: 'Editorial pose, slightly offset, leaning posture. Real environment interaction.' },
  { id: 'macro', name: 'Macro Fabric Detail', instruction: 'Macro extreme close-up of fabric texture, seams, and material quality. Real tactile feel.' }
];

export const CONTENT_STYLES: Record<string, ContentStyle> = {
  trend_engine: {
      id: 'trend_engine',
      name: 'Trend Engine Viral Pack',
      icon: <Zap size={18} className="text-yellow-400" />,
      description: 'Viral Anatomy: Bedah video viral dan buat prompt pack untuk replikasi.',
      inputs: ['viralVideo', 'productImage', 'modelImage'],
      audioStrategy: 'none'
  },
  tryon: {
      id: 'tryon',
      name: 'Fashion Try-On',
      icon: <Shirt size={18} />,
      description: 'AI memakaikan produk fashion ke model dan membuat lookbook cinematic.',
      inputs: ['modelImage', 'tryonProducts'],
      audioStrategy: 'dubbing'
  },
  ugc: { 
      id: 'ugc', 
      name: 'Review Jujur (UGC)', 
      icon: <User size={18} />, 
      description: 'Video testimoni asli yang bikin penonton lebih percaya.', 
      inputs: ['productImage', 'modelImage', 'backgroundImage'],
      audioStrategy: 'hybrid_ugc' 
  },
  ads: { 
      id: 'ads', 
      name: 'Iklan Produk Mewah', 
      icon: <Tv size={18} />, 
      description: 'Video promosi gaya studio untuk brand yang ingin tampil berkelas.', 
      inputs: ['productImage', 'modelImage', 'backgroundImage'],
      audioStrategy: 'hybrid_ads'
  },
  presentation: { 
      id: 'presentation', 
      name: 'Katalog Fashion', 
      icon: <Camera size={18} />, 
      description: 'Tunjukkan detail pakaian dengan gerakan estetik yang memikat.', 
      inputs: ['productImage', 'modelImage', 'backgroundImage'],
      audioStrategy: 'dubbing'
  },
  mannequin: { 
      id: 'mannequin', 
      name: 'Pajangan Manekin', 
      icon: <RefreshCw size={18} />, 
      description: 'Cara simpel pamerkan baju dari depan dan belakang dengan rapi.', 
      inputs: ['productImage', 'modelImage'],
      audioStrategy: 'dubbing'
  },
  treadmill: { 
      id: 'treadmill', 
      name: 'Koleksi Berjalan', 
      icon: <Footprints size={18} />, 
      description: 'Tampilkan banyak baju sekaligus dalam satu video pendek yang seru.', 
      inputs: ['outfitBatch', 'modelImage', 'backgroundImage'],
      audioStrategy: 'dubbing'
  },
  realestate: { 
      id: 'realestate', 
      name: 'Tur Properti', 
      icon: <Building size={18} />, 
      description: 'Ajak calon pembeli keliling rumah atau apartemen secara virtual.', 
      inputs: ['realEstateBatch', 'modelImage'],
      audioStrategy: 'selectable'
  },
  aesthetic: { 
      id: 'aesthetic', 
      name: 'Video Estetik Tangan', 
      icon: <Wand2 size={18} />, 
      description: 'Tunjukkan produk langsung dari tanganmu, terasa lebih dekat.', 
      inputs: ['productImage', 'backgroundImage'],
      audioStrategy: 'dubbing'
  },
  foodie: { 
      id: 'foodie', 
      name: 'Review Makanan', 
      icon: <Coffee size={18} />, 
      description: 'Buat penonton ngiler dengan detail makanan yang menggoda selera.', 
      inputs: ['productImage', 'modelImage'],
      audioStrategy: 'lipsync'
  },
  cinematic: { 
      id: 'cinematic', 
      name: 'Gaya Sinematik', 
      icon: <Video size={18} />, 
      description: 'Video produk dengan nuansa film layar lebar yang elegan.', 
      inputs: ['productImage', 'modelImage'],
      audioStrategy: 'dubbing'
  },
  travel: { 
      id: 'travel', 
      name: 'Vlog Jalan-jalan', 
      icon: <Plane size={18} />, 
      description: 'Ceritakan keseruan di lokasi wisata atau perjalanan liburanmu.', 
      inputs: ['locationImage', 'modelImage'],
      audioStrategy: 'hybrid_vlog'
  }
};
