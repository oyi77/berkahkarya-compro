import React from 'react';
import Layout from '@/components/Layout';

type Locale = 'id' | 'en';

export default function LP2({ locale }: { locale: Locale }) {
  const isIndo = locale === 'id';
  
  return (
    <Layout 
      title={isIndo ? "Serius Sesimpel Ini?" : "Seriously This Simple?"}
      description="Buat konten profesional dengan AI dalam hitungan menit."
    >
      <div className="bg-[#05050a] text-white min-h-screen font-sans selection:bg-orange-500/30 selection:text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[130px]"></div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-shake">
            <span className="text-sm font-black text-orange-400">😱 SHOCKING TRUTH!</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span>Serius</span><br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 ">Sesimpel Ini?</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            "Awalnya gue kira bikin konten tetap harus ribet. Tapi ternyata ada cara yang jauh lebih simpel buat bikin visual yang lebih niat."
          </p>

          {/* Featured Image */}
          <div className="relative w-full max-w-3xl mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10 animate-float">
            <img 
              src="https://i.postimg.cc/8PsRYSMn/Gemini-Generated-Image-je8mgkje8mgkje8m.png" 
              alt="AI Video Growth" 
              className="w-full h-auto"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="block text-4xl font-black text-orange-500 mb-1">+847%</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Engagement</span>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="block text-4xl font-black text-purple-500 mb-1">52K</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Views</span>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="block text-4xl font-black text-blue-500 mb-1">2.3K</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sales</span>
            </div>
          </div>

          {/* CTA */}
          <a 
            href="https://saas.aitradepulse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
          >
            Klaim Free Trial Kamu Sekarang
            <span className="ml-2">🔥</span>
          </a>

          <div className="mt-12 text-sm text-gray-500 font-medium">
            🔥 Dipercaya 50,000+ kreator Indonesia
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 2s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
}
