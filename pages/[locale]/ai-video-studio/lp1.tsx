import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function LP1({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Konten Ini Bikin Laku" : "This Content Drives Sales"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">AI-Powered Content Creation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Konten Ini</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">Bikin Laku</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Banyak seller sebenarnya punya produk bagus, tapi kalah di konten. Ternyata sekarang ada cara bikin konten lebih cepat tanpa ribet edit manual."
          </p>

          {/* Featured Image Section */}
          <div className="relative w-full max-w-4xl mb-16 group">
            <img 
              src="https://i.postimg.cc/zGJdvMgf/Gemini-Generated-Image-ttxwt9ttxwt9ttxw.png" 
              alt="AI Video Generation Comparison" 
              className="rounded-3xl border border-white/10 shadow-2xl shadow-purple-500/10"
            />
            {/* Overlays */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg">BEFORE</div>
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg">AFTER</div>
          </div>

          {/* Stats Comparison */}
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
            <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm text-left">
              <h3 className="text-red-400 font-bold mb-4 uppercase tracking-widest text-sm">CARA LAMA</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="text-red-500">✗</span> Waktu: 3 Jam+
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="text-red-500">✗</span> Biaya: Jutaan
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="text-red-500">✗</span> Hasil: Sepi
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm text-left">
              <h3 className="text-green-400 font-bold mb-4 uppercase tracking-widest text-sm">PAKAI AI</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="text-green-500">✓</span> Waktu: &lt; 5 Menit
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="text-green-500">✓</span> Biaya: Hitungan Perak
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="text-green-500">✓</span> Hasil: Laku!
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25"
          >
            Pelajari Selengkapnya
            <span className="ml-2 animate-bounce-x">→</span>
          </a>

          {/* Trust Badge */}
          <div className="mt-12 flex items-center gap-4 text-gray-500">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05050a] bg-gradient-to-br from-gray-700 to-gray-800"></div>
              ))}
            </div>
            <p className="text-sm">Dipercaya 50,000+ kreator Indonesia</p>
          </div>
        </main>
      </div>
      <style jsx>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </Layout>
  );
}
