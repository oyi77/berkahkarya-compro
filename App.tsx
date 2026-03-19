
import React, { useState, useEffect, useRef } from 'react';
import { Layout, User, X, Plus, Home, Sparkles, ShieldCheck, Check, Smartphone, Monitor, Target, Layers, FileOutput, ArrowLeft, Image as ImageIcon, Camera as CameraIcon, Package, Zap, Upload, Sliders, ChevronDown, ChevronUp, Palette, Camera, Key, AlertTriangle, ExternalLink, RefreshCw, ShieldAlert, FileVideo } from 'lucide-react';
import { AppInputs, FileData, Shot, ContentStyle, TrendPromptPack } from './types';
import { CONTENT_STYLES, TRYON_ENVIRONMENTS, TRYON_LIGHTING, TIKTOK_COMPLIANCE_FRAMES, SCRIPT_STYLES, LANGUAGES, TREND_TARGET_STYLES, UGC_LIGHTING_PRESETS, UGC_CAMERA_STYLES, UGC_BACKGROUND_PRESETS, UGC_CAMERA_ANGLES, UGC_MOOD_LOCKS } from './constants';
import { UploadCard, SelectBox } from './UIComponents';
import { GlassShotCard } from './GlassShotCard';
import { TrendPackResult } from './TrendPackResult';
import { GeminiService } from './geminiService';
import { buildTryOnPrompt, buildUGCPrompt } from './utils';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"setup" | "storyboard" | "output">("setup");
  const [selectedStyle, setSelectedStyle] = useState<string>('ugc');
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState("");
  const [storyboard, setStoryboard] = useState<Shot[]>([]);
  const [trendResult, setTrendResult] = useState<TrendPromptPack | string | null>(null);
  const [consistencyContext, setConsistencyContext] = useState("");
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [useHighQuality, setUseHighQuality] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [autoSyncTTS, setAutoSyncTTS] = useState(false); 
  const [isAnalyzingProduct, setIsAnalyzingProduct] = useState(false); 
  const [viralVideoMeta, setViralVideoMeta] = useState<{ sizeMB?: number; durationSec?: number; fileName?: string; loadedAt?: number } | null>(null);

  // Assistant states
  const [showAssistant, setShowAssistant] = useState(false);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [assistantForm, setAssistantForm] = useState({
    productName: '',
    targetAudience: '',
    keyBenefit: '',
    pricePromo: ''
  });
  
  const apiKey = process.env.API_KEY || '';

  useEffect(() => {
    const checkKey = async () => {
      const selected = await (window as any).aistudio?.hasSelectedApiKey();
      setHasCustomKey(!!selected);
    };
    checkKey();
  }, []);

  const [inputs, setInputs] = useState<AppInputs>({
    productImage: null,
    ugcProducts: [], 
    modelImage: null, backgroundImage: null,
    outfitImages: [null, null, null, null, null, null],
    locationImages: [null, null, null, null, null, null], 
    topic: '', mood: 'Soft', language: 'Indonesian', scriptStyle: 'Direct & Clear',
    modelPrompt: '', backgroundPrompt: '', audioType: 'dubbing',
    tryonProducts: [],
    tryonSettings: {
      environment: 'Studio Minimal',
      customEnvironment: '',
      lighting: 'Soft Natural',
      ratio: '9:16',
      quantity: 5,
      instructions: '',
      backgroundMode: 'ai',
      complianceMode: false
    },
    ugcSettings: {
      backgroundMode: "preset_select",
      backgroundPreset: "room",
      backgroundPrompt: "",
      lightingPreset: "natural_window_soft",
      cameraStyle: "handheld_micro",
      cameraAnglePreset: "eye_level_medium",
      moodLock: "fresh_clean",
      moodTone: "casual_friendly"
    },
    viralVideo: null,
    trendTargetStyle: 'tiktok_affiliate'
  });

  const handleClearFile = (type: string) => {
    if (type === 'general') setInputs(prev => ({ ...prev, productImage: null }));
    else if (type === 'model') setInputs(prev => ({ ...prev, modelImage: null }));
    else if (type === 'background') setInputs(prev => ({ ...prev, backgroundImage: null }));
    else if (type === 'video') {
      setInputs(prev => ({ ...prev, viralVideo: null }));
      setViralVideoMeta(null);
    }
  };

  const handleVideoUpload = async (file: File) => {
    setInputs(prev => ({ 
      ...prev, 
      viralVideo: { 
        mimeType: file.type, 
        state: 'UPLOADING', 
        size: file.size, 
        name: file.name 
      } 
    }));
    
    try {
        const geminiFile = await GeminiService.uploadGeminiFile(apiKey, file);
        setInputs(prev => ({
            ...prev,
            viralVideo: geminiFile
        }));
        setError(null);
    } catch (err: any) {
        setInputs(prev => ({
            ...prev,
            viralVideo: {
                mimeType: file.type,
                state: 'FAILED',
                error: err.message || "Gagal memproses video"
            }
        }));
        handleError(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'video') {
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > 50) {
          setError("Video terlalu besar. Maksimum 50MB untuk stabilitas.");
          e.target.value = '';
          return;
        }
        
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 120) {
            setError("Video terlalu panjang. Maksimum 120 detik.");
            e.target.value = '';
            return;
          }
          setViralVideoMeta({
            sizeMB: Math.round(sizeMB * 10) / 10,
            durationSec: Math.round(video.duration),
            fileName: file.name,
            loadedAt: Date.now()
          });
          handleVideoUpload(file);
        };
        video.src = URL.createObjectURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        const fileData: FileData = { data: base64, mimeType: file.type };
        if (type === 'general') setInputs(prev => ({ ...prev, productImage: fileData }));
        else if (type === 'ugc_multi') setInputs(prev => ({ ...prev, ugcProducts: [...prev.ugcProducts, fileData] }));
        else if (type === 'model') setInputs(prev => ({ ...prev, modelImage: fileData }));
        else if (type === 'background') setInputs(prev => ({ ...prev, backgroundImage: fileData }));
        else if (type === 'tryon_product') setInputs(prev => ({ ...prev, tryonProducts: [...prev.tryonProducts, fileData] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveUgcProduct = (index: number) => {
    setInputs(prev => ({ ...prev, ugcProducts: prev.ugcProducts.filter((_, i) => i !== index) }));
  };

  const handleAnalyzeProductFromPhoto = async () => {
    const mainProd = inputs.productImage || inputs.ugcProducts[0];
    if (!mainProd) return setError("Upload foto produk terlebih dahulu.");
    setIsAnalyzingProduct(true);
    try {
      const result = await GeminiService.analyzeProductImage(apiKey, mainProd);
      setInputs(prev => ({ ...prev, topic: result }));
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsAnalyzingProduct(false);
    }
  };

  const handleCampaignAssistant = async (mode: "generate" | "improve") => {
    if (mode === "generate" && !assistantForm.productName) {
      return setError("Nama produk wajib diisi untuk generate deskripsi.");
    }
    setIsAssistantLoading(true);
    try {
      const result = await GeminiService.getCampaignDetail(
        apiKey,
        selectedStyle,
        inputs.language,
        inputs.scriptStyle,
        assistantForm,
        inputs.topic,
        mode
      );
      setInputs(prev => ({ ...prev, topic: result }));
      setShowAssistant(false);
    } catch (err: any) {
      handleError(err);
    } finally {
      setIsAssistantLoading(false);
    }
  };

  const handleSelectApiKey = async () => {
    try {
      await (window as any).aistudio?.openSelectKey();
      setHasCustomKey(true);
      setError(null);
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const handleError = (e: any) => {
    const msg = e.message || String(e);
    if (msg === "API_KEY_NOT_FOUND") {
      setError("API Key tidak valid atau tidak ditemukan. Silakan pilih ulang.");
      handleSelectApiKey();
    } else if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
      setError("Quota API Habis. Silakan gunakan API Key berbayar sendiri atau tunggu beberapa saat.");
    } else {
      setError(msg);
    }
  };

  const handleGenerateStoryboard = async () => {
    const styleConfig = CONTENT_STYLES[selectedStyle];
    if (!styleConfig) return setError("Gaya tidak valid");

    if (selectedStyle === 'trend_engine') {
      if (!inputs.viralVideo) return setError("Upload video viral terlebih dahulu");
      if (inputs.viralVideo.state && inputs.viralVideo.state !== 'READY') {
          return setError("Tunggu sampai video selesai diproses (Video Siap ✅).");
      }
      
      setIsAnalyzing(true); setProgress("Membedah Anatomi Video (Trend Engine)...");
      setTrendResult(null); setStoryboard([]);
      try {
        const trendPromise = GeminiService.runTrendEngine(apiKey, inputs.viralVideo, inputs.trendTargetStyle, {
          product: inputs.productImage,
          model: inputs.modelImage,
          background: inputs.backgroundImage
        });
        
        const timeoutPromise = new Promise<string>((_, reject) => 
          setTimeout(() => reject(new Error("Analisis video terlalu lama. Coba video lebih pendek atau kompres.")), 120000)
        );

        const resultText = await Promise.race([trendPromise, timeoutPromise]);
        
        setTrendResult(resultText);
        setProgress("Bedah Selesai!");
        setActiveTab('storyboard');
      } catch (err: any) {
        handleError(err);
      } finally {
        setIsAnalyzing(false);
      }
      return;
    }

    if (selectedStyle === 'tryon') {
      if (!inputs.modelImage) return setError("Masukkan foto model (wajib)");
      if (!inputs.tryonProducts.length) return setError("Masukkan minimal 1 foto produk fashion");
      
      setIsAnalyzing(true); setProgress("Menyiapkan Produksi Batch Fashion...");
      setStoryboard([]); setTrendResult(null);
      
      try {
        const localShots: Shot[] = [];
        const consistencyProfile = "High-end Fashion Model - Accurate Fit";
        setConsistencyContext(consistencyProfile);
        
        for (let i = 0; i < inputs.tryonSettings.quantity; i++) {
          localShots.push({
            shot_number: i + 1,
            visual_prompt: "Standard Lookbook Scene",
            voiceover_script: `Lookbook Style ${i + 1}`,
            imageUrl: null,
            isLoading: true,
            productRefIndex: i % inputs.tryonProducts.length
          });
        }

        setStoryboard(localShots);
        setIsAnalyzing(false); setIsGeneratingImages(true);
        
        const updatedShots = [...localShots];
        const hasUploadedBg = !!(inputs.tryonSettings.backgroundMode === 'upload' && inputs.backgroundImage);

        for (let i = 0; i < updatedShots.length; i++) {
          setProgress(`Merender Shot Fashion ${i+1}/${updatedShots.length}...`);
          const currentProduct = inputs.tryonProducts[updatedShots[i].productRefIndex!];
          const finalPrompt = buildTryOnPrompt(inputs.tryonSettings, consistencyProfile, updatedShots[i].frameType, hasUploadedBg);
          
          updatedShots[i].visual_prompt = finalPrompt;
          const refs: FileData[] = [inputs.modelImage, currentProduct as FileData];
          if (hasUploadedBg) refs.push(inputs.backgroundImage!);

          try {
            const url = await GeminiService.generateImage(apiKey, finalPrompt, refs, { 
              style: 'tryon', 
              consistencyProfile,
              hasProduct: true,
              hasModel: true,
              hasBackground: hasUploadedBg,
              useHighQuality
            });
            updatedShots[i].imageUrl = `data:image/png;base64,${url}`;
          } catch (e: any) {
            updatedShots[i].error = e.message || "Render Gagal";
            handleError(e);
          }
          updatedShots[i].isLoading = false;
          setStoryboard([...updatedShots]);
        }
        setIsGeneratingImages(false); setProgress("Selesai!"); setActiveTab('storyboard');
        return;
      } catch (err: any) {
        handleError(err);
        setIsAnalyzing(false); setIsGeneratingImages(false);
        return;
      }
    }

    setIsAnalyzing(true); setProgress("Merancang Storyboard Strategis...");
    setStoryboard([]); setTrendResult(null);
    try {
        const plan = await GeminiService.getCreativePlan(apiKey, selectedStyle, inputs, inputs.topic, inputs.language, inputs.scriptStyle);
        const initialShots: Shot[] = plan.shotPrompts.map((p, i) => ({
            shot_number: i + 1,
            visual_prompt: p,
            voiceover_script: plan.shotScripts[i] || "",
            imageUrl: null,
            isLoading: true,
            platformPrompts: plan.platformPrompts?.[i] || {}
        }));
        setStoryboard(initialShots);
        setConsistencyContext(plan.consistency_profile);
        setIsAnalyzing(false); setIsGeneratingImages(true);
        
        const updated = [...initialShots];
        const hasBg = !!inputs.backgroundImage;

        for (let i = 0; i < updated.length; i++) {
            setProgress(`Visualizing Scene ${i + 1}/${updated.length}...`);
            
            let finalPrompt = updated[i].visual_prompt;
            let currentProd: FileData | null = inputs.productImage;
            
            if (selectedStyle === 'ugc') {
              const ugcProds = inputs.ugcProducts.length > 0 ? inputs.ugcProducts : [inputs.productImage];
              const rotationIndex = Math.floor(i / 2); 
              currentProd = ugcProds[rotationIndex % ugcProds.length];
              finalPrompt = buildUGCPrompt(inputs.ugcSettings, plan.consistency_profile, updated[i].visual_prompt, hasBg);
            }

            const refs: FileData[] = [];
            if (inputs.modelImage) refs.push(inputs.modelImage);
            if (currentProd) refs.push(currentProd);
            if (hasBg) refs.push(inputs.backgroundImage!);

            try {
              const url = await GeminiService.generateImage(apiKey, finalPrompt, refs, { 
                style: selectedStyle, 
                consistencyProfile: plan.consistency_profile,
                hasProduct: !!currentProd,
                hasModel: !!inputs.modelImage,
                hasBackground: hasBg,
                useHighQuality
              });
              updated[i].imageUrl = `data:image/png;base64,${url}`;
            } catch (e: any) {
              updated[i].error = e.message || "Render Gagal";
              handleError(e);
            }
            updated[i].isLoading = false;
            setStoryboard([...updated]);
        }
        setIsGeneratingImages(false); setActiveTab('storyboard');
    } catch (err: any) {
        handleError(err);
        setIsAnalyzing(false); setIsGeneratingImages(false);
    }
  };

  const handleRegenerateShot = async (index: number) => {
      const updated = [...storyboard];
      const shot = updated[index];
      updated[index].isLoading = true;
      updated[index].imageUrl = null;
      updated[index].error = null;
      setStoryboard([...updated]);

      try {
          const refs: FileData[] = [];
          let currentProd = inputs.productImage;
          if (selectedStyle === 'ugc') {
            const ugcProds = inputs.ugcProducts.length > 0 ? inputs.ugcProducts : [inputs.productImage];
            currentProd = ugcProds[Math.floor(index / 2) % ugcProds.length];
          }

          if (selectedStyle === 'tryon') {
              const tryonProd = inputs.tryonProducts[shot.productRefIndex!];
              if (inputs.modelImage) refs.push(inputs.modelImage);
              if (tryonProd) refs.push(tryonProd);
              if (inputs.tryonSettings.backgroundMode === 'upload' && inputs.backgroundImage) refs.push(inputs.backgroundImage);
          } else {
              if (inputs.modelImage) refs.push(inputs.modelImage);
              if (currentProd) refs.push(currentProd);
              if (inputs.backgroundImage) refs.push(inputs.backgroundImage);
          }

          let finalPrompt = shot.visual_prompt;
          if (selectedStyle === 'ugc') {
             finalPrompt = buildUGCPrompt(inputs.ugcSettings, consistencyContext, shot.visual_prompt, !!inputs.backgroundImage);
          }

          const url = await GeminiService.generateImage(apiKey, finalPrompt, refs, { 
            style: selectedStyle, 
            consistencyProfile: consistencyContext,
            hasProduct: selectedStyle === 'tryon' ? true : !!currentProd,
            hasModel: !!inputs.modelImage,
            hasBackground: selectedStyle === 'tryon' ? (inputs.tryonSettings.backgroundMode === 'upload' && !!inputs.backgroundImage) : !!inputs.backgroundImage,
            useHighQuality
          });
          updated[index].imageUrl = `data:image/png;base64,${url}`;
      } catch (e: any) {
          updated[index].error = e.message || "Regen Gagal";
          handleError(e);
      } finally {
          updated[index].isLoading = false;
          setStoryboard([...updated]);
      }
  };

  const renderSetupSidebar = () => (
    <aside className={`${activeTab === 'setup' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 border-r border-zinc-900 overflow-y-auto custom-scrollbar p-6 bg-zinc-950 flex-col gap-8 shrink-0`}>
      <section>
        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-4 flex items-center gap-2">
            <Target size={12} className="text-indigo-500"/> Pilih Model Produksi
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(CONTENT_STYLES).map((style: ContentStyle) => (
            <button key={style.id} onClick={() => setSelectedStyle(style.id)} className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border ${selectedStyle === style.id ? 'bg-zinc-50 border-zinc-50 text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}>
              <div className="mb-1.5 transition-transform duration-300 group-hover:scale-110">{style.icon}</div>
              <span className="text-[9px] font-black uppercase tracking-tight text-center">{style.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-3">
         <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Key size={12}/> API & Quality</label>
            {hasCustomKey && <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase">Paid Key Active</span>}
         </div>
         <div className="flex flex-col gap-2">
            <button onClick={handleSelectApiKey} className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
               <ShieldCheck size={14}/> {hasCustomKey ? "Ubah API Key" : "Gunakan API Key Sendiri"}
            </button>
            <label className="flex items-center gap-2 cursor-pointer group mt-1">
               <div onClick={() => setUseHighQuality(!useHighQuality)} className={`w-8 h-4 rounded-full p-0.5 transition-all ${useHighQuality ? 'bg-violet-600' : 'bg-zinc-700'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full transition-all ${useHighQuality ? 'translate-x-4' : 'translate-x-0'}`}></div>
               </div>
               <span className="text-[9px] font-black text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">Render Kualitas Tinggi (1K)</span>
            </label>
         </div>
      </section>

      {selectedStyle === 'trend_engine' ? (
         <section className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex flex-col gap-2">
                <label className={`relative flex flex-col items-center justify-center h-48 rounded-2xl border border-dashed transition-all duration-500 group overflow-hidden cursor-pointer ${inputs.viralVideo ? 'bg-zinc-900 border-yellow-500 shadow-2xl shadow-yellow-500/10' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'}`}>
                    {inputs.viralVideo ? (
                        <div className="absolute inset-0 z-0">
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center opacity-40">
                               <FileVideo size={40}/>
                            </div>
                        </div>
                    ) : null}
                    <div className={`mb-2 p-3 rounded-xl transition-all duration-500 relative z-10 ${inputs.viralVideo ? 'bg-yellow-600 text-white shadow-xl shadow-yellow-500/20' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>
                        {inputs.viralVideo?.state === 'READY' ? <Check size={18} strokeWidth={3}/> : <Upload size={18}/>}
                    </div>
                    <span className="text-[9px] font-black relative z-10 text-center px-4 uppercase tracking-[0.2em]">
                        {inputs.viralVideo ? (inputs.viralVideo.state === 'READY' ? 'Video Viral Siap' : 'Memproses Video...') : 'Upload Video Viral'}
                    </span>
                    <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} className="hidden" />
                </label>
                
                {inputs.viralVideo?.state && (
                  <p className={`text-[9px] font-black uppercase tracking-widest text-center mt-1 transition-all ${
                    inputs.viralVideo.state === 'READY' ? 'text-green-500' : 
                    inputs.viralVideo.state === 'FAILED' ? 'text-red-500' : 'text-yellow-500 animate-pulse'
                  }`}>
                    {inputs.viralVideo.state === 'UPLOADING' && "Uploading Video..."}
                    {inputs.viralVideo.state === 'PROCESSING' && "Processing Anatomi Video..."}
                    {inputs.viralVideo.state === 'READY' && "Video Siap ✅"}
                    {inputs.viralVideo.state === 'FAILED' && `Gagal: ${inputs.viralVideo.error || "Coba lagi"}`}
                  </p>
                )}

                {viralVideoMeta && (
                  <div className="px-2 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                      <FileVideo size={14}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-zinc-100 uppercase tracking-widest truncate">{viralVideoMeta.fileName}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.2em]">✅ {viralVideoMeta.durationSec}s • {viralVideoMeta.sizeMB}MB</p>
                    </div>
                  </div>
                )}
                {!inputs.viralVideo && (
                  <p className="text-[8px] text-zinc-600 font-bold text-center uppercase tracking-widest">Belum ada video viral dimuat</p>
                )}

                <div className="mt-4">
                  <SelectBox 
                    label="Target Adaptasi Style" 
                    value={inputs.trendTargetStyle} 
                    onChange={(e) => setInputs(p => ({...p, trendTargetStyle: e.target.value}))} 
                    options={TREND_TARGET_STYLES.map(s => ({v: s.id, l: s.name}))}
                    icon={<Zap size={12} className="text-yellow-500"/>}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-900">
                   <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Referensi Tambahan (Opsional)</p>
                   <UploadCard label="Foto Produk" hasFile={!!inputs.productImage} fileData={inputs.productImage} onChange={(e) => handleFileUpload(e, 'general')} onClear={() => handleClearFile('general')} />
                   <UploadCard label="Foto Model" hasFile={!!inputs.modelImage} fileData={inputs.modelImage} onChange={(e) => handleFileUpload(e, 'model')} onClear={() => handleClearFile('model')} />
                   <UploadCard label="Latar Tetap" hasFile={!!inputs.backgroundImage} fileData={inputs.backgroundImage} onChange={(e) => handleFileUpload(e, 'background')} onClear={() => handleClearFile('background')} />
                </div>
            </div>
         </section>
      ) : selectedStyle === 'tryon' ? (
        <section className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="space-y-4">
            <UploadCard label="Foto Model (Wajib)" hasFile={!!inputs.modelImage} fileData={inputs.modelImage} onChange={(e) => handleFileUpload(e, 'model')} onClear={() => handleClearFile('model')} icon={<User size={16}/>} />
            
            <div className="space-y-2">
               <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Produk Fashion (Multiple)</label>
               <div className="grid grid-cols-3 gap-2">
                 {inputs.tryonProducts.map((p, i) => (
                   <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
                     {p && <img src={`data:${p.mimeType};base64,${p.data}`} className="w-full h-full object-cover" />}
                     <button onClick={() => setInputs(prev => ({ ...prev, tryonProducts: prev.tryonProducts.filter((_, idx) => idx !== i) }))} className="absolute top-1 right-1 p-1 bg-black/60 rounded text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                   </div>
                 ))}
                 <label className="aspect-square rounded-xl border border-dashed border-zinc-800 bg-zinc-950 flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
                    <Plus size={16} className="text-zinc-600"/>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'tryon_product')} className="hidden" />
                 </label>
               </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-zinc-900 pt-4">
             <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Background</label>
                <div className="flex gap-1 p-1 bg-zinc-900 rounded-lg">
                   {['ai', 'upload'].map(m => (
                     <button key={m} onClick={() => setInputs(p => ({...p, tryonSettings: {...p.tryonSettings, backgroundMode: m as any}}))} className={`px-2 py-1 text-[8px] font-black uppercase rounded ${inputs.tryonSettings.backgroundMode === m ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}>{m}</button>
                   ))}
                </div>
             </div>
             {inputs.tryonSettings.backgroundMode === 'upload' && (
               <UploadCard label="Foto Latar (Immutable)" hasFile={!!inputs.backgroundImage} fileData={inputs.backgroundImage} onChange={(e) => handleFileUpload(e, 'background')} onClear={() => handleClearFile('background')} />
             )}
             <SelectBox label="Suasana Lokasi" value={inputs.tryonSettings.environment} onChange={(e) => setInputs(p => ({...p, tryonSettings: {...p.tryonSettings, environment: e.target.value}}))} options={TRYON_ENVIRONMENTS.map(e => ({v: e, l: e}))} />
             <SelectBox label="Pencahayaan" value={inputs.tryonSettings.lighting} onChange={(e) => setInputs(p => ({...p, tryonSettings: {...p.tryonSettings, lighting: e.target.value}}))} options={TRYON_LIGHTING.map(l => ({v: l, l: l}))} />
             
             <textarea placeholder="Instruksi tambahan..." value={inputs.tryonSettings.instructions} onChange={(e) => setInputs(p => ({...p, tryonSettings: {...p.tryonSettings, instructions: e.target.value}}))} className="w-full h-24 p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[10px] text-zinc-300 outline-none resize-none" />
          </div>
        </section>
      ) : (
        <section className="space-y-6 animate-in fade-in duration-500">
           {selectedStyle === 'ugc' ? (
             <div className="space-y-3">
               <UploadCard label="Foto Produk (Main)" hasFile={!!inputs.productImage} fileData={inputs.productImage} onChange={(e) => handleFileUpload(e, 'general')} onClear={() => handleClearFile('general')} />
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">+ Tambah Produk</label>
                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{inputs.ugcProducts.length} Variasi</span>
                 </div>
                 <div className="grid grid-cols-4 gap-2">
                   {inputs.ugcProducts.map((p, i) => (
                     <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 group">
                        {p && <img src={`data:${p.mimeType};base64,${p.data}`} className="w-full h-full object-cover" />}
                        <button onClick={() => handleRemoveUgcProduct(i)} className="absolute top-0 right-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100"><X size={8}/></button>
                     </div>
                   ))}
                   <label className="aspect-square rounded-lg border border-dashed border-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors">
                      <Plus size={12} className="text-zinc-500"/>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'ugc_multi')} className="hidden" />
                   </label>
                 </div>
                 <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest leading-tight">Rotasi per 2 scene otomatis.</p>
               </div>
             </div>
           ) : (
             CONTENT_STYLES[selectedStyle]?.inputs.includes('productImage') && (
               <UploadCard label="Foto Produk" hasFile={!!inputs.productImage} fileData={inputs.productImage} onChange={(e) => handleFileUpload(e, 'general')} onClear={() => handleClearFile('general')} />
             )
           )}

           {CONTENT_STYLES[selectedStyle]?.inputs.includes('modelImage') && (
             <UploadCard label="Model (Reference)" hasFile={!!inputs.modelImage} fileData={inputs.modelImage} onChange={(e) => handleFileUpload(e, 'model')} onClear={() => handleClearFile('model')} icon={<User size={16}/>} />
           )}

           {CONTENT_STYLES[selectedStyle]?.inputs.includes('backgroundImage') && (
             <UploadCard label="Latar (Reference)" hasFile={!!inputs.backgroundImage} fileData={inputs.backgroundImage} onChange={(e) => handleFileUpload(e, 'background')} onClear={() => handleClearFile('background')} icon={<ImageIcon size={16}/>} />
           )}

           {selectedStyle === 'ugc' && (
              <div className="space-y-4 pt-4 border-t border-zinc-900">
                 <label className="text-[10px] font-black text-violet-500 uppercase tracking-widest flex items-center gap-2"><Sliders size={12}/> Pengaturan Tampilan Video</label>
                 <SelectBox label="Pengaturan Latar" value={inputs.ugcSettings.backgroundMode} onChange={(e) => setInputs(p => ({...p, ugcSettings: {...p.ugcSettings, backgroundMode: e.target.value as any}}))} 
                      options={[{v: 'uploaded_lock', l: 'Gunakan Foto Latar (Unggahan)'}, {v: 'preset_select', l: 'Latar Otomatis dari AI'}, {v: 'auto', l: 'Latar Studio Netral'}, {v: 'ai_generate', l: 'Buat Latar Kustom (AI)'}]} icon={<ImageIcon size={14}/>} />
                 
                 {inputs.ugcSettings.backgroundMode === 'preset_select' && (
                   <SelectBox label="Pilih Suasana Tempat" value={inputs.ugcSettings.backgroundPreset} onChange={(e) => setInputs(p => ({...p, ugcSettings: {...p.ugcSettings, backgroundPreset: e.target.value as any}}))} options={UGC_BACKGROUND_PRESETS.map(o => ({v: o.id, l: o.name}))} />
                 )}

                 <div className="grid grid-cols-2 gap-3">
                    <SelectBox label="Pencahayaan" value={inputs.ugcSettings.lightingPreset} onChange={(e) => setInputs(p => ({...p, ugcSettings: {...p.ugcSettings, lightingPreset: e.target.value as any}}))} options={UGC_LIGHTING_PRESETS.map(o => ({v: o.id, l: o.name}))} icon={<Zap size={14}/>} />
                    <SelectBox label="Sudut Kamera" value={inputs.ugcSettings.cameraAnglePreset} onChange={(e) => setInputs(p => ({...p, ugcSettings: {...p.ugcSettings, cameraAnglePreset: e.target.value as any}}))} options={UGC_CAMERA_ANGLES.map(o => ({v: o.id, l: o.name}))} icon={<CameraIcon size={14}/>} />
                 </div>
                 <SelectBox label="Nuansa & Warna Video" value={inputs.ugcSettings.moodLock} onChange={(e) => setInputs(p => ({...p, ugcSettings: {...p.ugcSettings, moodLock: e.target.value as any}}))} options={UGC_MOOD_LOCKS.map(o => ({v: o.id, l: o.name}))} icon={<Palette size={14}/>} />
              </div>
           )}

           <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Deskripsi Produk</label>
                <div className="flex gap-2">
                  <button onClick={handleAnalyzeProductFromPhoto} disabled={isAnalyzingProduct} className="text-[9px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1 hover:text-violet-300">
                    {isAnalyzingProduct ? <RefreshCw size={10} className="animate-spin"/> : <ImageIcon size={10}/>} Buatkan Deskripsi Otomatis
                  </button>
                  <button onClick={() => setShowAssistant(!showAssistant)} className="text-[9px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1">✨ Bantuan AI</button>
                </div>
              </div>

              {showAssistant && (
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-3">
                   <input type="text" placeholder="Nama Produk*" value={assistantForm.productName} onChange={e => setAssistantForm({...assistantForm, productName: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[10px] text-zinc-300 outline-none" />
                   <div className="flex gap-2">
                     <button onClick={() => handleCampaignAssistant('generate')} disabled={isAssistantLoading} className="flex-1 py-2 bg-violet-600 text-white rounded-xl text-[9px] font-black uppercase">Generate</button>
                     <button onClick={() => handleCampaignAssistant('improve')} disabled={isAssistantLoading} className="flex-1 py-2 bg-zinc-100 text-zinc-950 rounded-xl text-[9px] font-black uppercase">Improve</button>
                   </div>
                </div>
              )}

              <textarea placeholder="Ceritakan singkat produkmu..." value={inputs.topic} onChange={(e) => setInputs(p => ({...p, topic: e.target.value}))} className="w-full h-32 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[11px] text-zinc-300 outline-none resize-none" />
           </div>
           <div className="grid grid-cols-2 gap-3">
             <SelectBox label="Style Script" value={inputs.scriptStyle} onChange={(e) => setInputs(p => ({...p, scriptStyle: e.target.value}))} options={SCRIPT_STYLES.map(s => ({v: s.id, l: s.name}))} />
             <SelectBox label="Bahasa" value={inputs.language} onChange={(e) => setInputs(p => ({...p, language: e.target.value}))} options={LANGUAGES.map(l => ({v: l.id, l: l.name}))} />
           </div>
        </section>
      )}

      <div className="mt-auto pt-4 border-t border-zinc-900">
        <button 
          onClick={handleGenerateStoryboard} 
          disabled={isAnalyzing || isGeneratingImages || (selectedStyle === 'trend_engine' && inputs.viralVideo?.state && inputs.viralVideo.state !== 'READY')} 
          className="w-full py-5 rounded-2xl font-black text-xs transition-all uppercase tracking-widest flex items-center justify-center gap-2 bg-zinc-50 text-zinc-950 hover:bg-white disabled:opacity-50"
        >
          {isAnalyzing || isGeneratingImages ? <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={16}/>} PRODUKSI KONTEN
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {renderSetupSidebar()}
      
      <main className="flex-1 overflow-y-auto custom-scrollbar p-8 relative">
        {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-950/90 backdrop-blur-xl border border-red-500/50 text-red-100 px-6 py-4 rounded-2xl z-[60] flex items-center gap-4 animate-in slide-in-from-top-4 shadow-2xl max-w-lg w-full">
                <AlertTriangle size={24} className="text-red-500 shrink-0"/>
                <div className="flex-1">
                  <span className="text-[11px] font-black uppercase tracking-widest block mb-1">Peringatan Sistem</span>
                  <p className="text-[10px] font-bold text-red-200/80 leading-tight">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-zinc-400 hover:text-white"><X size={18}/></button>
            </div>
        )}
        
        <div className="max-w-6xl mx-auto pb-20">
            <header className="mb-12 flex items-end justify-between">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">Berkah Karya <span className="text-violet-500">MVP Pro</span></h1>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">AI-Powered Content Creation Suite</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl">
                      <Zap size={14} className={autoSyncTTS ? "text-violet-500" : "text-zinc-600"}/>
                      <span className="text-[10px] font-black uppercase tracking-widest">Auto Sync Voice Over</span>
                      <button onClick={() => setAutoSyncTTS(!autoSyncTTS)} className={`w-8 h-4 rounded-full p-0.5 transition-all ${autoSyncTTS ? 'bg-violet-600' : 'bg-zinc-700'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-all ${autoSyncTTS ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </button>
                   </div>
                   <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest leading-none">{autoSyncTTS ? "Auto update: 1.2 detik setelah mengetik" : "Voice Over dibuat manual"}</p>
                </div>
            </header>

            {trendResult ? (
              <TrendPackResult result={trendResult} apiKey={apiKey} />
            ) : storyboard.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {storyboard.map((shot, idx) => (
                      <GlassShotCard 
                        key={idx} shot={shot} index={idx} 
                        onRegenerate={handleRegenerateShot} 
                        onUpdatePrompt={(newP) => {
                            const updated = [...storyboard]; updated[idx].visual_prompt = newP; setStoryboard(updated); handleRegenerateShot(idx);
                        }}
                        autoSyncTTS={autoSyncTTS}
                        flowLabel={shot.frameType ? `${TIKTOK_COMPLIANCE_FRAMES.find(f => f.id === shot.frameType)?.name}` : undefined}
                        style={selectedStyle} audioType={inputs.audioType} scriptStyle={inputs.scriptStyle}
                      />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-800">
                    <Layers size={40} className="opacity-20 mb-4" />
                    <p className="text-xs font-black uppercase tracking-[0.4em] opacity-40">Konfigurasikan Produk di Panel Kiri</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
