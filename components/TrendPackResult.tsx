
import React, { useState, useMemo } from 'react';
import { TrendPromptPack } from '../types';
import { Copy, Sparkles, Camera, Zap, Fingerprint, PlayCircle } from 'lucide-react';
import { copyTextToClipboard } from '../utils';
import { GeminiService } from '../services/geminiService';
import { SkeletonLoader } from './UIComponents';

interface TrendPackResultProps {
  result: TrendPromptPack | string;
  apiKey: string;
}

export const TrendPackResult: React.FC<TrendPackResultProps> = ({ result, apiKey }) => {
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const isRawText = typeof result === 'string';

  const extractedPrompts = useMemo(() => {
    if (!isRawText) return [];
    const text = result as string;
    const prompts: string[] = [];
    
    const lines = text.split('\n');
    let currentPrompt = "";
    let collecting = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const match = line.match(/^Image\s*(\d+)/i);
        if (match) {
            if (currentPrompt) prompts.push(currentPrompt.trim());
            currentPrompt = "";
            collecting = true;
        } else if (collecting) {
            if (line.match(/^\d+\)\s+[A-Z\s]+/) || line.match(/^[A-Z\s]{5,}:/)) {
                collecting = false;
                if (currentPrompt) prompts.push(currentPrompt.trim());
                currentPrompt = "";
            } else {
                currentPrompt += line + " ";
            }
        }
    }
    if (currentPrompt) prompts.push(currentPrompt.trim());
    return prompts;
  }, [result, isRawText]);

  const handleGenerateImage = async (index: number, prompt: string) => {
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    try {
      const url = await GeminiService.generateImage(apiKey, prompt, [], {
        style: 'trend_replication',
        consistencyProfile: 'Viral Aesthetic Hook'
      });
      setGeneratedImages(prev => ({ ...prev, [index]: `data:image/png;base64,${url}` }));
    } catch (e) {
      alert("Gagal merender gambar. Coba lagi.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  if (isRawText) {
    const textResult = result as string;
    const sections = textResult.split(/(?=\d\)\s+[A-Z\s]+|IMAGE DIRECT PROMPT PACK|EXECUTION STEPS)/g);

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-zinc-950 font-black shadow-xl shadow-yellow-500/20"><Fingerprint size={24}/></div>
               <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Trend <span className="text-yellow-500">Engine</span> Intelligence</h2>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">TikTok Raw Creator Mode Active</p>
               </div>
            </div>
            <button 
                onClick={() => { copyTextToClipboard(textResult); alert("Full report copied!"); }}
                className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group"
            >
                <Copy size={14} className="group-hover:scale-110 transition-transform"/> Copy Full Report
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {sections.map((sec, i) => {
                    if (sec.includes("IMAGE DIRECT PROMPT PACK")) return null;
                    const titleMatch = sec.match(/^\d\)\s+([A-Z\s]+)/) || sec.match(/^([A-Z\s]{5,})/);
                    const title = titleMatch ? titleMatch[1] : `Analysis Section ${i}`;
                    const content = sec.replace(/^\d\)\s+[A-Z\s]+/, "").trim();

                    if (!content || content.length < 5) return null;

                    return (
                        <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl group hover:border-zinc-700 transition-all">
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
                <div className="bg-zinc-50 text-zinc-950 p-8 rounded-3xl shadow-2xl shadow-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><PlayCircle size={80}/></div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">Execution Roadmap</h3>
                    <div className="space-y-6 relative z-10">
                        {sections.find(s => s.includes("EXECUTION STEPS"))?.replace("EXECUTION STEPS", "").trim().split('\n').filter(l => l.trim()).map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                                <span className="text-[10px] font-black opacity-20 mt-1">{idx+1}</span>
                                <p className="text-xs font-bold leading-tight">{step.replace(/^\d+\.?\s*-?\s*|Step\s+\d+:\s*/i, '')}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-3xl">
                   <h3 className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">Reference Lock Mode</h3>
                   <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                      AI is strictly preserving Image A (Identity) and Image B (Product) across all frames to ensure 1:1 continuity for your affiliate content.
                   </p>
                </div>
            </div>
         </div>

         {extractedPrompts.length > 0 && (
            <div className="space-y-8 pt-8 border-t border-zinc-900">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-zinc-100">
                     <Camera size={28} className="text-indigo-500"/> Prompt <span className="text-indigo-500">Rebuild</span> Pack
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black text-zinc-500 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 uppercase tracking-widest">{extractedPrompts.length} Viral Frames</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {extractedPrompts.map((prompt, i) => (
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
      </div>
    );
  }

  return null;
};
