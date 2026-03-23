
import React from 'react';
import { Upload, X, Check, Image as ImageIcon, Monitor, Smartphone, Users, MessageCircle, ArrowRight, Trash2, HelpCircle } from 'lucide-react';
import { FileData } from './types';

export const WelcomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-3xl p-4 animate-in fade-in duration-700">
      <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl p-10 md:p-14 max-w-xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
          
          <div className="text-center mb-10">
              <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-950 font-black text-3xl mx-auto mb-8 shadow-2xl shadow-white/10 ring-8 ring-zinc-800/50">BK</div>
              <h2 className="text-4xl font-black text-zinc-50 tracking-tighter mb-4 uppercase">BERKAH KARYA <span className="text-violet-500">STUDIO</span></h2>
              <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.4em] mb-2 leading-relaxed">Platform AI Kreatif untuk Konten Jualan</p>
              <div className="h-px w-20 bg-zinc-800 mx-auto my-6"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                  { icon: <Monitor size={22} />, label: "Panduan PC", link: "https://youtu.be/VLf_9JVS_6I" },
                  { icon: <Smartphone size={22} />, label: "Panduan HP", link: "https://youtu.be/BtZdJQkF-Ro" },
                  { icon: <Users size={22} />, label: "Grup Komunitas", link: "https://t.me/+0ya6fSZRW_5mZDdl" },
                  { icon: <MessageCircle size={22} />, label: "Tanya Admin", link: "https://wa.me/6288985584050" }
              ].map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group">
                      <div className="text-zinc-500 group-hover:text-violet-400 transition-colors group-hover:scale-110 duration-300">{item.icon}</div>
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest">{item.label}</span>
                  </a>
              ))}
          </div>

          <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800 mb-8 flex items-start gap-4">
              <HelpCircle className="text-violet-500 shrink-0" size={20}/>
              <div>
                  <h4 className="text-[10px] font-black text-zinc-100 uppercase tracking-widest mb-1">Saran Produksi</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">Gunakan foto produk yang terang dan tajam agar AI bisa menghasilkan visual yang lebih profesional dan menarik pembeli.</p>
              </div>
          </div>

          <button onClick={onClose} className="w-full py-5 bg-zinc-50 text-zinc-950 rounded-2xl font-black text-xs shadow-2xl hover:bg-white transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] group active:scale-[0.98]">
              MASUK KE STUDIO PRODUKSI <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
          </button>
      </div>
  </div>
);

export const SkeletonLoader: React.FC = () => (
  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 animate-shimmer border border-zinc-800">
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-10">
      <ImageIcon size={40} />
      <div className="w-32 h-1.5 bg-zinc-700 rounded-full"></div>
      <p className="text-[10px] font-bold uppercase tracking-widest">Sedang Memproses Gambar...</p>
    </div>
  </div>
);

export const UploadCard: React.FC<{
  label: string;
  hasFile: boolean;
  fileData: FileData | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  icon?: React.ReactNode;
}> = ({ label, hasFile, fileData, onChange, onClear, icon }) => {
  const displayIcon = icon || <Upload size={18}/>;
  return (
      <div className="flex flex-col gap-1.5">
          <label className={`relative flex flex-col items-center justify-center h-32 rounded-2xl border border-dashed transition-all duration-500 group overflow-hidden cursor-pointer ${hasFile ? 'bg-zinc-900 border-violet-500 shadow-2xl shadow-violet-500/10' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'}`}>
              {hasFile && fileData ? (
                  <div className="absolute inset-0 z-0">
                      <img src={`data:${fileData.mimeType};base64,${fileData.data}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Preview" />
                      <div className="absolute inset-0 bg-zinc-950/50 backdrop-blur-[2px]"></div>
                  </div>
              ) : null}
              <div className={`mb-2 p-3 rounded-xl transition-all duration-500 relative z-10 ${hasFile ? 'bg-violet-600 text-white shadow-xl shadow-violet-500/20 ring-4 ring-violet-500/20' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 group-hover:text-zinc-300'}`}>
                  {hasFile ? <Check size={18} strokeWidth={3}/> : displayIcon}
              </div>
              <span className={`text-[9px] font-black relative z-10 text-center px-4 uppercase tracking-[0.2em] ${hasFile ? 'text-zinc-50 drop-shadow-md' : 'text-zinc-500'}`}>{label}</span>
              <input type="file" accept="image/*" onChange={onChange} className="hidden" />
              {hasFile && (
                  <button onClick={(e) => { e.preventDefault(); onClear(); }} title="Hapus Gambar" className="absolute top-2 right-2 z-20 bg-zinc-900/90 backdrop-blur-md text-zinc-400 p-2 rounded-lg hover:bg-red-900 hover:text-white transition-all border border-zinc-800 shadow-xl"><Trash2 size={12}/></button>
              )}
          </label>
          <div className="px-1 flex justify-between items-center">
             <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{hasFile ? 'Foto Berhasil Dimuat' : 'Belum Ada Foto'}</span>
             {hasFile && <span className="text-[8px] text-violet-500 font-black uppercase">Siap</span>}
          </div>
      </div>
  );
};

export const InputMethodToggle: React.FC<{
  mode: 'upload' | 'prompt';
  setMode: (mode: 'upload' | 'prompt') => void;
  label: string;
}> = ({ mode, setMode, label }) => (
  <div className="flex items-center justify-between mb-1 px-1">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shadow-inner">
          <button onClick={() => setMode('upload')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest ${mode === 'upload' ? 'bg-zinc-50 text-zinc-950 shadow-md scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}>Pilih Foto</button>
          <button onClick={() => setMode('prompt')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest ${mode === 'prompt' ? 'bg-zinc-50 text-zinc-950 shadow-md scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}>Gunakan AI</button>
      </div>
  </div>
);

export const SelectBox: React.FC<{
  label: string;
  value: string;
  options: { v: string; l: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ReactNode;
}> = ({ label, value, options, onChange, icon }) => (
  <div className="relative group">
    <div className="absolute top-[-8px] left-3 bg-zinc-950 px-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest z-10 transition-colors group-focus-within:text-violet-500">{label}</div>
    {icon && <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-violet-500 transition-colors">{icon}</div>}
    <select 
      value={value} 
      onChange={onChange}
      className={`w-full bg-zinc-950 border border-zinc-800 rounded-2xl ${icon ? 'pl-11' : 'pl-5'} pr-10 py-4 text-[11px] text-zinc-200 font-bold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 appearance-none cursor-pointer transition-all hover:bg-zinc-900/50`}
    >
      {options.map(opt => <option key={opt.v} value={opt.v} className="bg-zinc-900">{opt.l}</option>)}
    </select>
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-600">
        <ArrowRight size={14} className="rotate-90"/>
    </div>
  </div>
);

export const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = React.useState('');
    React.useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let timeout: ReturnType<typeof setTimeout>;
        const animate = () => {
            if (!isDeleting && index <= text.length) {
                setDisplayedText(text.substring(0, index));
                index++;
                timeout = setTimeout(animate, 150);
            } else if (isDeleting && index >= 0) {
                setDisplayedText(text.substring(0, index));
                index--;
                timeout = setTimeout(animate, 80);
            } else if (index > text.length) {
                isDeleting = true;
                timeout = setTimeout(animate, 3000); 
            } else if (index < 0) {
                isDeleting = false;
                timeout = setTimeout(animate, 1000); 
            }
        };
        animate();
        return () => clearTimeout(timeout);
    }, [text]);
    return (
        <span className="text-violet-500">
            {displayedText}
            <span className="animate-pulse text-zinc-50 opacity-40">|</span>
        </span>
    );
};
