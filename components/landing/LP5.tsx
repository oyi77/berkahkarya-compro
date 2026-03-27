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

export default function LP5({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Ini Cara Baru" : "The New Way"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-green-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-green-400 font-bold tracking-wide">
            🚀 New Method 2024
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Ini Cara</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500">Baru</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Banyak orang masih pakai cara lama buat bikin konten. Padahal sekarang sudah ada cara yang lebih cepat dan lebih praktis."
          </p>

          {/* Featured Image */}
          <div className="relative w-full max-w-4xl mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10 border-t-white/20">
            <img 
              src="https://i.postimg.cc/fbQYkSF6/Gemini-Generated-Image-n24qbzn24qbzn24q.png" 
              alt="New Evolution of Content" 
              className="w-full h-auto"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mb-12">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-green-500/30 transition-all cursor-default">
              <span className="block text-3xl sm:text-4xl font-black text-green-400 mb-1">+847%</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Engagement</span>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-all cursor-default">
              <span className="block text-3xl sm:text-4xl font-black text-cyan-400 mb-1">52K</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Views</span>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-500/30 transition-all cursor-default">
              <span className="block text-3xl sm:text-4xl font-black text-blue-400 mb-1">2.3K</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Sales</span>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/30 transition-all cursor-default">
              <span className="block text-3xl sm:text-4xl font-black text-white mb-1">4.9★</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Rating</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-16">
            <span className="px-4 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-gray-300">✓ 50K+ Users</span>
            <span className="px-4 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-gray-300">✓ Free Trial</span>
            <span className="px-4 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-gray-300">✓ Indonesia</span>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 font-black text-white bg-gradient-to-r from-green-600 to-cyan-600 rounded-full hover:scale-105 transition-all shadow-xl shadow-green-500/20 active:scale-95 text-xl"
          >
            Pelajari Lebih Lanjut 
          </a>
        </main>
      </div>
    </Layout>
  );
}
