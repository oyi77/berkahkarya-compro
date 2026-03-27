import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Layout from '@/components/Layout';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function LP4({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Tinggal Upload Doang" : "Just Upload It"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-cyan-400 font-bold tracking-wide">
            ⚡ Super Simple Process
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Tinggal</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">Upload Doang</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Gak perlu banyak tools atau edit panjang. Sekarang cukup dari satu input, bisa langsung jadi konten yang siap pakai."
          </p>

          {/* Featured Image */}
          <div className="relative w-full max-w-4xl mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
            <img 
              src="https://i.postimg.cc/MGJ1Xf4N/Gemini-Generated-Image-m9dyorm9dyorm9dy.png" 
              alt="Simple Upload Workflow" 
              className="w-full h-auto"
            />
          </div>

          {/* 3 Step Process */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-default">
              <span className="text-cyan-400 font-bold mb-4 block text-xs tracking-widest uppercase">STEP 1</span>
              <h3 className="text-2xl font-black text-white mb-2">UPLOAD</h3>
              <p className="text-sm text-gray-400">Kirim foto produk kamu ke bot</p>
            </div>
            {/* Step 2 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-default relative overflow-hidden group">
              <span className="text-purple-400 font-bold mb-4 block text-xs tracking-widest uppercase">STEP 2</span>
              <h3 className="text-2xl font-black text-white mb-2">AI MAGIC</h3>
              <p className="text-sm text-gray-400">Proses otomatis oleh AI</p>
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {/* Step 3 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-default">
              <span className="text-green-400 font-bold mb-4 block text-xs tracking-widest uppercase">STEP 3</span>
              <h3 className="text-2xl font-black text-white mb-2">DONE</h3>
              <p className="text-sm text-gray-400">Konten siap pakai & viral!</p>
            </div>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 font-black text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 text-xl"
          >
            COBA SEKARANG 🚀
          </a>

          <div className="mt-12 text-sm text-gray-500 font-medium">
            🚀 Dipercaya 50,000+ kreator Indonesia
          </div>
        </main>
      </div>
    </Layout>
  );
}
