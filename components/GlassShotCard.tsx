
import React, { useState } from 'react';
import { RefreshCw, Video, AlertCircle, Download, X, Copy, ExternalLink, Info, Monitor, Edit3, Check, RotateCcw, ChevronDown, Wand2, ArrowRight } from 'lucide-react';
import { Shot } from '../types';
import { generateFallbackPrompt, copyTextToClipboard, ensureString } from '../utils';
import { SkeletonLoader } from './UIComponents';

interface GlassShotCardProps {
  shot: Shot;
  index: number;
  onRegenerate: (index: number) => void;
  onUpdatePrompt?: (newPrompt: string) => void;
  flowLabel?: string;
  style: string;
  audioType: string;
  scriptStyle: string;
}

export const GlassShotCard: React.FC<GlassShotCardProps> = ({ shot, index, onRegenerate, onUpdatePrompt, flowLabel, style, audioType, scriptStyle }) => {
  const [tool, setTool] = useState<string | null>(null); 
  const [showTools, setShowTools] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [tempPrompt, setTempPrompt] = useState(shot.visual_prompt);
  
  const prompts = shot.platformPrompts || {}; 
  
  const getDisplayPrompt = (t: string) => {
      let p = t === 'dreamina' ? prompts.dreamina : (t === 'grok' ? prompts.grok : prompts.meta);
      if (t === 'grok' || !p || p === "Prompt loading..." || p.includes("...")) {
          return generateFallbackPrompt(t, shot, style, index, audioType, shot.voiceover_script, scriptStyle);
      }
      return ensureString(p);
  };

  const handleApplyPrompt = () => {
    if (onUpdatePrompt) onUpdatePrompt(tempPrompt);
    setIsEditingPrompt(false);
  };

  const TOOL_INFO: Record<string, {title: string, desc: string}> = {
      dreamina: { title: "Dreamina AI", desc: "Cocok untuk hasil video yang sinematik dan mewah." },
      grok: { title: "Grok AI", desc: "Sangat pas untuk gerakan bicara model yang pas (Lip Sync)." },
      meta: { title: "Meta AI", desc: "Terbaik untuk hasil video yang stabil dan tidak goyang." }
  };

  const TOOL_LINKS: Record<string, string> = {
      dreamina: "https://dreamina.capcut.com/ai-tool/home",
      grok: "https://grok.com/",
      meta: "https://www.meta.ai/"
  };

  return (
      <div className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-zinc-700 hover:shadow-violet-500/5">
          <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
              {shot.isLoading ? (
                  <SkeletonLoader />
              ) : shot.imageUrl ? (
                  <>
                      <img src={shot.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={`Scene ${index + 1}`}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                      <div className="absolute top-4 left-4 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-100 shadow-2xl uppercase tracking-[0.2em] ring-1 ring-white/10">{ensureString(flowLabel || `SCENE ${index+1}`)}</div>
                      
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 z-10">
                          <button onClick={() => {
                              const link = document.createElement('a');
                              link.href = shot.imageUrl!;
                              link.download = `Gambar_Scene_${index + 1}.png`;
                              link.click();
                          }} className="bg-zinc-50 p-2.5 rounded-xl text-zinc-950 hover:bg-white shadow-2xl transition-all active:scale-90" title="Unduh Gambar">
                              <Download size={16} />
                          </button>
                          <button 
                            onClick={() => {
                                setTempPrompt(shot.visual_prompt);
                                setIsEditingPrompt(true);
                            }} 
                            className="bg-zinc-900/90 border border-zinc-700 p-2.5 rounded-xl text-zinc-400 hover:text-violet-400 shadow-2xl transition-all active:scale-90" 
                            title="Ubah Deskripsi Scene"
                          >
                              <Edit3 size={16} />
                          </button>
                          <button onClick={() => { if(confirm("Buat ulang gambar ini?")) onRegenerate(index); }} className="bg-zinc-900/90 border border-zinc-700 p-2.5 rounded-xl text-zinc-400 hover:text-violet-400 shadow-2xl transition-all active:scale-90" title="Coba Ulang Scene">
                              <RefreshCw size={16} />
                          </button>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <p className="text-[10px] text-zinc-300 line-clamp-2 bg-zinc-950/60 backdrop-blur p-2 rounded-lg border border-white/5 font-medium leading-relaxed italic">
                             "{shot.voiceover_script || 'Narasi tidak tersedia'}"
                          </p>
                      </div>

                      {isEditingPrompt && (
                        <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl p-6 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300 z-40">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[11px] font-black text-violet-400 uppercase tracking-[0.2em] flex items-center gap-2"><Wand2 size={14}/> Ubah Deskripsi Scene</span>
                                <button onClick={() => setIsEditingPrompt(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={18}/></button>
                            </div>
                            <textarea 
                                value={tempPrompt}
                                onChange={(e) => setTempPrompt(e.target.value)}
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-[12px] font-medium text-zinc-300 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/5 outline-none resize-none custom-scrollbar mb-5 leading-relaxed"
                                placeholder="Jelaskan perubahan gaya atau aksi untuk scene ini..."
                            />
                            <div className="flex gap-3">
                                <button onClick={() => setTempPrompt(shot.visual_prompt)} className="flex-1 py-3.5 bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-zinc-700 transition-all uppercase tracking-widest active:scale-95"><RotateCcw size={14}/> KEMBALI AWAL</button>
                                <button onClick={handleApplyPrompt} className="flex-1 py-3.5 bg-violet-600 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-violet-500 transition-all uppercase tracking-widest shadow-lg shadow-violet-500/20 active:scale-95"><Check size={14}/> SIMPAN</button>
                            </div>
                        </div>
                      )}
                  </>
              ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 text-[10px] font-black uppercase p-8 text-center gap-4 bg-red-950/10">
                    <div className="bg-red-500/10 p-5 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse"><AlertCircle size={36}/></div>
                    <span className="tracking-widest">Gagal Menampilkan Scene</span>
                    <button onClick={() => onRegenerate(index)} className="bg-zinc-50 text-zinc-950 px-8 py-3 rounded-xl hover:bg-white transition-all tracking-[0.2em] shadow-xl active:scale-95">COBA LAGI</button>
                  </div>
              )}
          </div>
          <div className="p-6 bg-zinc-900 relative z-20">
              {!showTools ? (
                  <button 
                      onClick={() => setShowTools(true)}
                      className="w-full py-4 bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-2xl text-[10px] font-black shadow-inner hover:bg-zinc-800 hover:border-violet-500/30 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] group/btn"
                  >
                      <Video size={16} className="text-violet-500 group-hover/btn:scale-110 transition-transform" /> JADIKAN VIDEO (LANJUT AI) <ChevronDown size={14} className="opacity-40"/>
                  </button>
              ) : (
                  <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Monitor size={12}/> Pilih Aplikasi Video AI</span>
                          <button onClick={() => { setShowTools(false); setTool(null); }} className="text-zinc-600 hover:text-red-400 transition-colors"><X size={18}/></button>
                       </div>
                      <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-2xl mb-4 border border-zinc-800 shadow-inner">
                          {['dreamina', 'grok', 'meta'].map(t => (
                              <button key={t} onClick={() => setTool(tool === t ? null : t)} className={`flex-1 py-2.5 text-[10px] uppercase font-black rounded-xl transition-all ${tool === t ? 'bg-zinc-50 text-zinc-950 shadow-xl scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}>{t}</button>
                          ))}
                      </div>
                      
                      {tool ? (
                          <div className="bg-violet-500/5 border border-violet-500/10 p-4 rounded-2xl mb-4 flex items-start gap-3 border-dashed">
                              <Info size={16} className="text-violet-500 mt-0.5 shrink-0"/>
                              <div>
                                  <p className="text-[10px] font-black text-violet-300 uppercase tracking-widest mb-1">{TOOL_INFO[tool].title}</p>
                                  <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">{TOOL_INFO[tool].desc}</p>
                              </div>
                          </div>
                      ) : (
                          <p className="text-[9px] text-zinc-600 text-center py-4 font-bold uppercase tracking-widest">Silakan pilih salah satu aplikasi di atas</p>
                      )}
                  </div>
              )}

              {tool && showTools && (
                  <div className="absolute bottom-full left-0 right-0 p-8 bg-zinc-900 border-t border-zinc-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-3xl animate-in slide-in-from-bottom-8 z-30">
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em]">SALIN PERINTAH UNTUK {tool.toUpperCase()}</span>
                            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Tempel perintah ini di aplikasi video favoritmu</span>
                        </div>
                        <button onClick={() => setTool(null)} className="text-zinc-500 hover:text-zinc-300 p-2"><X size={20}/></button>
                      </div>
                      <div className="h-44 overflow-y-auto custom-scrollbar text-[12px] text-zinc-400 font-medium leading-relaxed mb-6 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 select-all selection:bg-violet-500/30 ring-1 ring-white/5">
                        {getDisplayPrompt(tool)}
                      </div>
                      
                      <div className="flex gap-3">
                        <button onClick={() => {copyTextToClipboard(getDisplayPrompt(tool)); alert("Perintah AI berhasil disalin!");}} className="flex-1 py-4 bg-zinc-800 text-zinc-300 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-zinc-700 transition-all uppercase tracking-widest active:scale-95"><Copy size={16}/> SALIN PERINTAH</button>
                        <a href={TOOL_LINKS[tool]} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-zinc-50 text-zinc-950 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-white transition-all uppercase tracking-widest shadow-xl active:scale-95">
                            <ExternalLink size={16}/> LANJUT KE {tool.toUpperCase()} <ArrowRight size={14}/>
                        </a>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
};
