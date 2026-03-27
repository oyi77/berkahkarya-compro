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

export default function LP6({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Hasil Nyata Seller" : "Real Seller Results"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-pink-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-yellow-400 font-bold tracking-wide">
            ⭐ Real Testimonials
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Hasil Nyata</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">Seller</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Bukan cuma janji, ini bukti nyata dari seller yang sudah sukses pakai Openclaw Saas Bot."
          </p>

          {/* Featured Image */}
          <div className="relative w-full max-w-4xl mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-pink-500/10">
            <img 
              src="https://i.postimg.cc/VNPX50T2/Gemini-Generated-Image-wqs45xwqs45xwqs4.png" 
              alt="Real Results Showcase" 
              className="w-full h-auto"
            />
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-20 text-left">
            {/* Sarah */}
            <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl">S</div>
                <div>
                  <h4 className="font-bold text-white">Sarah</h4>
                  <p className="text-xs text-gray-400 font-medium">Fashion Seller</p>
                </div>
                <div className="ml-auto flex text-yellow-500 text-xs">★★★★★</div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">"Dari 5K jadi 150K followers dalam 3 bulan. Ini mah ga masuk akal tapi nyata!"</p>
            </div>
            {/* Budi */}
            <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center font-bold text-xl">B</div>
                <div>
                  <h4 className="font-bold text-white">Budi</h4>
                  <p className="text-xs text-gray-400 font-medium">F&B Owner</p>
                </div>
                <div className="ml-auto flex text-yellow-500 text-xs">★★★★★</div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">"Orderan naik 300% setelah pakai konten dari AI ini. Worth every penny!"</p>
            </div>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 font-black text-white bg-gradient-to-r from-yellow-600 to-pink-600 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-500/20 active:scale-95 text-xl"
          >
            Gabung Sekarang
          </a>

          <div className="mt-12 text-sm text-gray-500 font-medium">
            🏆 Dipercaya 50,000+ kreator Indonesia
          </div>
        </main>
      </div>
    </Layout>
  );
}
