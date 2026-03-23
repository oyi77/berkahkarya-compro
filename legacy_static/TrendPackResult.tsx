
import React, { useState, useMemo } from 'react';
import { TrendPromptPack } from './types';
import { Copy, Sparkles, Camera, Zap, Fingerprint, PlayCircle, Video, Mic, ShieldAlert, FileText, AlertCircle } from 'lucide-react';
import { copyTextToClipboard } from './utils';
import { GeminiService } from './geminiService';
import { SkeletonLoader } from './UIComponents';

interface TrendPackResultProps {
  result: TrendPromptPack | string;
  apiKey: string;
}

export const TrendPackResult: React.FC<TrendPackResultProps> = ({ result, apiKey }) => {
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [showRaw, setShowRaw] = useState(false);

  const isRawText = typeof result === 'string';

  const parsedData = useMemo(() => {
    if (!isRawText) return null;
    const text = result as string;
    
    const data: Record<string, string> = {
      storyboard: "",
      videoPrompt: "",
      voiceOver: "",
      cleanRules: "",
      referenceLock: ""
    };
    const extractedPrompts: string[] = [];

    // Robust extraction using SECTION headers
    const sectionRegex = /SECTION \d+:\s*([A-Z\s\(\)-]+)([\s\S]*?)(?=SECTION \d+:|$)/g;
    let match;
    while ((match = sectionRegex.exec(text)) !== null) {
      const header = match[1].trim();
      const content = match[2].trim();
      
      if (header.includes("STORYBOARD")) data.storyboard = content;
      else if (header.includes("VIDEO PROMPT")) data.videoPrompt = content;
      else if (header.includes("VOICE OVER")) data.voiceOver = content;
      else if (header.includes("CLEAN OUTPUT RULES")) data.cleanRules = content;
      else if (header.includes("REFERENCE LOCK")) data.referenceLock = content;
    }

    // Secondary parsing for SCENE blocks inside Storyboard
    if (data.storyboard) {
      const scenes = data.storyboard.split(/SCENE \d+:/);
      scenes.forEach(scene => {
        const vpMatch = scene.match(/VISUAL PROMPT:\s*([\s\S]*?)(?=\n[A-Z\s]+:|$)/);
        if (vpMatch) extractedPrompts.push(vpMatch[1].trim());
      });
    }

    const isSuccessful = extractedPrompts.length > 0 && !!data.videoPrompt;

    return { 
      storyboard: data.storyboard,
      videoPrompt: data.videoPrompt,
      voiceOver: data.voiceOver,
      cleanRules: data.cleanRules,
      referenceLock: data.referenceLock,
      extractedPrompts,
      isSuccessful
    };
  }, [result, isRawText]);

  const handleGenerateImage = async (index: number, prompt: string) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    try {
      const url = await GeminiService.generateImage(apiKey, prompt, [], {
        style: 'trend_engine',
        consistencyProfile: 'Viral Aesthetic Hook'
      });
      setGeneratedImages(prev => ({ ...prev, [index]: `data:image/png;base64,${url}` }));
    } catch (e) {
      alert("Gagal merender gambar. Coba lagi.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  if (isRawText && parsedData) {
    const textResult = result as string;
    
    if (!textResult.trim()) {
      return (
        <div className="bg-red-950/20 border border-red-500/30 p-12 rounded-3xl text-center space-y-4 animate-in fade-in">
           <AlertCircle size={48} className="text-red-500 mx-auto" />
           <h2 className="text-xl font-black uppercase text-red-400">Output Kosong</h2>
           <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gagal mendapatkan analisis dari AI. Coba upload video yang lebih pendek atau kompres ukurannya.</p>
        </div>
      );
    }

    const analysisSections = textResult.split(/(?=\d\)\s+[A-Z\s]+|SECTION \d+: )/g).filter(s => !s.startsWith("SECTION"));

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-zinc-950 font-black shadow-xl shadow-yellow-500/20"><Fingerprint size={24}/></div>
               <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Trend <span className="text-yellow-500">Engine</span> Viral Pack</h2>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Universal Intelligence Rebuild</p>
               </div>
            </div>
            <button 
                onClick={() => { copyTextToClipboard(textResult); alert("Full report copied!"); }}
                className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group"
            >
                <Copy size={14} className="group-hover:scale-110 transition-transform"/> Copy Full Report
            </button>
         </div>

         {!parsedData.isSuccessful && (
           <div className="bg-zinc-900/50 border border-yellow-500/20 p-6 rounded-3xl flex items-start gap-4 animate-pulse">
              <AlertCircle size={20} className="text-yellow-500 shrink-0"/>
              <div>
                 <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">Parsing Terbatas</h4>
                 <p className="text-[9px] text-zinc-500 font-bold leading-relaxed uppercase tracking-widest">Beberapa bagian storyboard mungkin tidak terdeteksi otomatis. Gunakan tombol "Raw Report" di bawah untuk melihat output lengkap.</p>
              </div>
           </div>
         )}

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {parsedData.cleanRules && (
                  <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl flex items-start gap-4">
                      <ShieldAlert className="text-red-500 shrink-0" size={20}/>
                      <div>
                          <h4 className="text-[11px] font-black text-red-400 uppercase tracking-widest mb-1">Clean Output Rules</h4>
                          <p className="text-[10px] text-zinc-500 font-medium leading-relaxed whitespace-pre-wrap">{parsedData.cleanRules}</p>
                      </div>
                  </div>
                )}

                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                        <span className="w-6 h-px bg-yellow-500/30"></span> STORYBOARD BREAKDOWN
                    </h3>
                    <div className="text-zinc-300 text-sm leading-relaxed font-medium whitespace-pre-wrap font-mono text-[11px]">
                        {parsedData.storyboard || "Extracting storyboard..."}
                    </div>
                </div>

                {analysisSections.map((sec, i) => {
                    const titleMatch = sec.match(/^\d\)\s+([A-Z\s]+)/) || sec.match(/^([A-Z\s]{5,})/);
                    const title = titleMatch ? titleMatch[1] : `Section ${i+1}`;
                    const content = sec.replace(/^\d\)\s+[A-Z\s]+/, "").trim();
                    if (!content || content.length < 5) return null;
                    return (
                        <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                            <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                                <span className="w-6 h-px bg-yellow-500/30"></span> {title}
                            </h3>
                            <div className="text-zinc-300 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                                {content}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-8">
                <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-2xl shadow-indigo-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Video size={60}/></div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2"><Sparkles size={14}/> Video Prompt (Universal)</h3>
                    <p className="text-[11px] font-medium leading-relaxed mb-6 opacity-90 line-clamp-6">{parsedData.videoPrompt || "Generating universal prompt..."}</p>
                    <button 
                      onClick={() => { copyTextToClipboard(parsedData.videoPrompt || ""); alert("Video prompt copied!"); }}
                      className="w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Copy size={14}/> Copy Universal Prompt
                    </button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Mic size={60}/></div>
                    <h3 className="text-[11px] font-black text-zinc-100 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">Voice Over (Indonesian)</h3>
                    <div className="space-y-4 relative z-10">
                        <div className="text-[11px] text-zinc-400 font-medium leading-relaxed whitespace-pre-wrap italic line-clamp-6">
                            {parsedData.voiceOver || "Generating voice over script..."}
                        </div>
                        <button 
                          onClick={() => { copyTextToClipboard(parsedData.voiceOver || ""); alert("VO Script copied!"); }}
                          className="w-full py-3 bg-zinc-800 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          <Copy size={14}/> Copy VO Script
                        </button>
                    </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-3xl">
                   <h3 className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">Reference Lock Mode</h3>
                   <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed whitespace-pre-wrap">
                      {parsedData.referenceLock || "AI is strictly preserving identity and product consistency across all frames."}
                   </div>
                </div>
            </div>
         </div>

         {parsedData.extractedPrompts.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-zinc-900">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-zinc-100">
                     <Camera size={28} className="text-indigo-500"/> Prompt <span className="text-indigo-500">Rebuild</span> Pack
                  </h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {parsedData.extractedPrompts.map((prompt, i) => (
                      <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col group hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] transition-all">
                          <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
                                {loadingStates[i] ? (
                                    <SkeletonLoader />
                                ) : generatedImages[i] ? (
                                    <img src={generatedImages[i]} className="w-full h-full object-cover animate-in fade-in duration-500" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4 opacity-20 group-hover:opacity-60 transition-all duration-500">
                                        <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center"><Camera size={32}/></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Frame {i+1} Rebuild</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur px-4 py-2 rounded-xl border border-zinc-800 text-[10px] font-black text-indigo-400 uppercase tracking-widest z-10">
                                    FRAME {i+1}
                                </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col gap-4">
                              <div className="flex-1">
                                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed italic line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                    "{prompt}"
                                </p>
                              </div>
                              <div className="flex gap-2 pt-2">
                                  <button 
                                    onClick={() => { copyTextToClipboard(prompt); alert(`Prompt ${i+1} copied!`); }}
                                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
                                  >
                                      <Copy size={12}/> Copy
                                  </button>
                                  <button 
                                    onClick={() => handleGenerateImage(i, prompt)}
                                    disabled={loadingStates[i]}
                                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/10 flex items-center justify-center gap-2 active:scale-95"
                                  >
                                      {loadingStates[i] ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Sparkles size={12}/>}
                                      {loadingStates[i] ? 'Rendering...' : 'Render'}
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
               </div>
            </div>
         )}

         {/* Raw Fallback Section */}
         <div className="pt-12 border-t border-zinc-900">
            <button 
               onClick={() => setShowRaw(!showRaw)}
               className="w-full py-4 bg-zinc-900/50 border border-zinc-800 text-zinc-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-zinc-300 transition-all"
            >
               <FileText size={14}/> {showRaw ? "Sembunyikan Raw Report" : "Lihat Raw Report Lengkap"}
            </button>
            {showRaw && (
              <div className="mt-4 p-8 bg-zinc-950 border border-zinc-900 rounded-3xl animate-in slide-in-from-top-4">
                 <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Gemini Engine Raw Output</h4>
                    <button 
                       onClick={() => { copyTextToClipboard(textResult); alert("Copied!"); }}
                       className="p-2 text-zinc-600 hover:text-white transition-colors"
                    ><Copy size={16}/></button>
                 </div>
                 <pre className="text-zinc-500 text-[11px] font-medium leading-relaxed whitespace-pre-wrap font-mono italic">
                    {textResult}
                 </pre>
              </div>
            )}
         </div>
      </div>
    );
  }

  return null;
};
