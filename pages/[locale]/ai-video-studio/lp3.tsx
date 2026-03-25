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

export default function LP3({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Masih Edit Manual?" : "Still Editing Manually?"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-red-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-pulse text-sm text-red-400 font-bold tracking-wide">
            😫 Lagi Capek Edit Video?
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Masih</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">Edit Manual?</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Kalau tiap konten harus mulai dari nol, wajar kalau capek duluan. Sekarang ada workflow yang bikin semuanya jadi lebih cepat."
          </p>

          {/* Image */}
          <div className="relative w-full max-w-2xl mb-16 shadow-2xl shadow-red-500/10 rounded-3xl overflow-hidden border border-white/10">
            <img 
              src="https://i.postimg.cc/5tW8jQGG/Gemini-Generated-Image-d1nxoed1nxoed1nx.png" 
              alt="Frustrated Editor" 
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl text-left mb-16">
            {/* CARA LAMA */}
            <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
                <h3 className="text-red-400 font-black mb-6 text-xl">CARA LAMA</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-red-200">
                    <span className="text-red-500 font-bold">😫</span> Manual & Melelahkan
                  </li>
                  <li className="flex items-center gap-3 text-red-200/70">
                    <span className="text-red-500 font-bold">✗</span> Edit berjam-jam
                  </li>
                  <li className="flex items-center gap-3 text-red-200/70">
                    <span className="text-red-500 font-bold">✗</span> Perlu skill editing
                  </li>
                  <li className="flex items-center gap-3 text-red-200/70">
                    <span className="text-red-500 font-bold">✗</span> Hasil kurang konsisten
                  </li>
                  <li className="flex items-center gap-3 text-red-200/70">
                    <span className="text-red-500 font-bold">✗</span> Budget mahal
                  </li>
                </ul>
            </div>
            {/* PAKAI AI */}
            <div className="p-8 rounded-3xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                <h3 className="text-green-400 font-black mb-6 text-xl">PAKAI AI</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-green-200">
                    <span className="text-green-500 font-bold">⚡</span> Otomatis & Cepat
                  </li>
                  <li className="flex items-center gap-3 text-green-200">
                    <span className="text-green-500 font-bold">✓</span> Selesai dalam menit
                  </li>
                  <li className="flex items-center gap-3 text-green-200">
                    <span className="text-green-500 font-bold">✓</span> Tanpa skill khusus
                  </li>
                  <li className="flex items-center gap-3 text-green-200">
                    <span className="text-green-500 font-bold">✓</span> Hasil profesional
                  </li>
                  <li className="flex items-center gap-3 text-green-200">
                    <span className="text-green-500 font-bold">✓</span> Hemat budget
                  </li>
                </ul>
            </div>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-12 py-5 font-black text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-red-500/20 active:scale-95 text-lg"
          >
            SAYA MAU YANG CEPAT ⚡
          </a>

          <div className="mt-12 text-sm text-gray-500">
            ⚡ Dipercaya 50,000+ kreator Indonesia
          </div>
        </main>
      </div>
    </Layout>
  );
}
