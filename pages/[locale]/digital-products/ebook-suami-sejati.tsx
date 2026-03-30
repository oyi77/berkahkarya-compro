import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

// Tracking helper
const trackEvent = (eventName: string, eventData?: any) => {
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventData);
  }
  
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }

  // Meta CAPI (server-side via API route)
  if (typeof window !== 'undefined') {
    fetch('/api/track-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: window.location.href,
        user_data: {
          client_ip_address: '',
          client_user_agent: navigator.userAgent,
        },
        custom_data: eventData,
      }),
    }).catch(console.error);
  }
};

export default function EbookSuamiSejati({ locale }: { locale: Locale }) {
  const router = useRouter();
  const isID = locale === 'id';

  useEffect(() => {
    // Track page view on mount
    trackEvent('PageView', {
      page_title: 'Ebook Suami Sejati Ultimate',
      content_category: 'digital_product',
      content_name: 'ebook-suami-sejati',
    });

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 25 && !sessionStorage.getItem('scroll_25')) {
        trackEvent('ViewContent', { scroll_depth: 25 });
        sessionStorage.setItem('scroll_25', '1');
      }
      if (scrollPercent > 50 && !sessionStorage.getItem('scroll_50')) {
        trackEvent('ViewContent', { scroll_depth: 50 });
        sessionStorage.setItem('scroll_50', '1');
      }
      if (scrollPercent > 75 && !sessionStorage.getItem('scroll_75')) {
        trackEvent('ViewContent', { scroll_depth: 75 });
        sessionStorage.setItem('scroll_75', '1');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (section: string) => {
    trackEvent('InitiateCheckout', {
      content_name: 'ebook-suami-sejati',
      content_category: 'digital_product',
      value: 99000,
      currency: 'IDR',
      cta_section: section,
    });

    // Redirect to checkout
    window.location.href = 'https://lynk.id/jendralbot/l7qdy174d73d/checkout';
  };

  const meta = {
    title: isID
      ? 'Program Suami Sejati Ultimate — Panduan Lengkap Membangun Keharmonisan Rumah Tangga | BerkahKarya'
      : 'Ultimate Husband Program — Complete Guide to Building Marital Harmony | BerkahKarya',
    description: isID
      ? 'Panduan lengkap untuk pria memahami pasangan, membangun kedekatan emosional, meningkatkan kualitas hubungan rumah tangga. Bonus 3 panduan + 6 video eksklusif.'
      : 'Complete guide for men to understand partners, build emotional closeness, improve marital quality. Bonus 3 guides + 6 exclusive videos.',
  };

  return (
    <Layout title={meta.title} description={meta.description}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              {isID ? '50 Kuota Tersisa Hari Ini' : '50 Slots Left Today'}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {isID ? (
                <>
                  Hubungan Mulai Hambar?<br />
                  <span className="text-yellow-400">Merasa Tidak Dihargai</span><br />
                  Walau Sudah Berusaha Maksimal?
                </>
              ) : (
                <>
                  Relationship Getting Bland?<br />
                  <span className="text-yellow-400">Feel Unappreciated</span><br />
                  Even Though You Try Your Best?
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              {isID
                ? 'Masalahnya bukan di kamu. Masalahnya: tidak ada yang ajarin cara berkomunikasi, memahami pasangan, dan membangun kedekatan yang benar. Sekarang ada solusinya.'
                : 'The problem isn\'t you. The problem: nobody taught you how to communicate, understand your partner, and build genuine closeness. Now there\'s a solution.'}
            </p>

            {/* CTA Primary */}
            <button
              onClick={() => handleCTAClick('hero')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50"
            >
              {isID ? '🚀 Ambil Sekarang — Rp 99.000' : '🚀 Get Now — Rp 99,000'}
            </button>

            <p className="text-sm text-slate-400 mt-4">
              {isID ? '✅ Akses instan via email · 💯 Garansi 7 hari uang kembali' : '✅ Instant access via email · 💯 7-day money-back guarantee'}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Problem + Agitate Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hook */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
              {isID ? 'Kenapa Hubungan Kamu Terasa Jauh Padahal Tinggal Serumah?' : 'Why Does Your Relationship Feel Distant Even Though You Live Together?'}
            </h2>
            <p className="text-xl text-center text-slate-600 mb-12">
              {isID
                ? 'Ini bukan salah kamu. Ini karena tidak ada yang mengajarkan ini sebelumnya.'
                : 'It\'s not your fault. Nobody taught you this before.'}
            </p>

            {/* Pain Points Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: '😔',
                  title: isID ? 'Komunikasi Tidak Nyambung' : 'Communication Disconnected',
                  desc: isID
                    ? 'Kamu bicara A, dia dengar B. Makin dijelaskan makin salah paham. Akhirnya diam-diaman — tapi masalah makin menumpuk.'
                    : 'You say A, she hears B. The more you explain, the worse the misunderstanding. You end up silent — but problems keep piling up.',
                },
                {
                  icon: '❄️',
                  title: isID ? 'Hubungan Terasa Dingin' : 'Relationship Feels Cold',
                  desc: isID
                    ? 'Dulu dekat, sekarang terasa seperti teman serumah. Obrolan cuma seperlunya. Waktu bersama tidak lagi hangat seperti dulu.'
                    : 'Used to be close, now feels like roommates. Conversations only when necessary. Time together no longer warm like before.',
                },
                {
                  icon: '🤷‍♂️',
                  title: isID ? 'Merasa Tidak Dihargai' : 'Feel Unappreciated',
                  desc: isID
                    ? 'Kerja keras, pulang malam, kasih nafkah — tapi dia tidak pernah bilang terima kasih. Merasa seperti ATM berjalan.'
                    : 'Work hard, come home late, provide — but she never says thank you. Feel like a walking ATM.',
                },
                {
                  icon: '😰',
                  title: isID ? 'Tidak Percaya Diri' : 'Lack of Confidence',
                  desc: isID
                    ? 'Takut salah ngomong, takut bikin marah, takut melakukan kesalahan. Akhirnya jadi pasif dan tidak berani ambil keputusan.'
                    : 'Afraid to say wrong things, afraid to upset, afraid to make mistakes. End up passive and afraid to make decisions.',
                },
              ].map((pain, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500"
                >
                  <div className="text-4xl mb-3">{pain.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pain.title}</h3>
                  <p className="text-slate-600">{pain.desc}</p>
                </div>
              ))}
            </div>

            {/* Agitate */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-12">
              <h3 className="text-2xl font-bold text-red-900 mb-4">
                {isID ? '⚠️ Kalau Dibiarkan...' : '⚠️ If Left Unchecked...'}
              </h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💔</span>
                  <span>{isID ? 'Jarak makin jauh. Percakapan makin dangkal. Akhirnya hanya tinggal status "menikah" tapi tidak bahagia.' : 'Distance grows. Conversations shallow. Eventually just "married" status but no happiness.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">😞</span>
                  <span>{isID ? 'Pasangan makin tidak terbuka. Cerita ke teman atau keluarga, bukan ke kamu. Kamu merasa jadi orang luar di rumah sendiri.' : 'Partner becomes closed off. Shares with friends or family, not you. You feel like an outsider in your own home.'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🚨</span>
                  <span>{isID ? 'Rasa percaya hilang. Setiap kali ada masalah, langsung jadi konflik besar. Hubungan jadi toxic tanpa sadar.' : 'Trust disappears. Every issue becomes a big conflict. Relationship becomes toxic without realizing.'}</span>
                </li>
              </ul>
            </div>

            {/* Bridge to Solution */}
            <div className="text-center">
              <p className="text-xl text-slate-700 mb-6">
                {isID
                  ? '💡 Tapi ada kabar baik: Ini semua bisa diperbaiki. Dengan cara yang benar.'
                  : '💡 But there\'s good news: This can all be fixed. With the right approach.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                {isID ? 'Program Suami Sejati Ultimate' : 'Ultimate Husband Program'}
              </h2>
              <p className="text-xl text-slate-600">
                {isID
                  ? 'Panduan lengkap untuk memahami pasangan, membangun kedekatan emosional, dan menjadi suami yang lebih percaya diri dan dihargai.'
                  : 'Complete guide to understanding your partner, building emotional closeness, and becoming a more confident and appreciated husband.'}
              </p>
            </div>

            {/* Benefits (bukan fitur!) */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: '🤝',
                  title: isID ? 'Hubungan Lebih Dekat' : 'Closer Relationship',
                  desc: isID
                    ? 'Tidak lagi merasa jauh. Pasangan lebih terbuka, ngobrol jadi nyambung, waktu bersama terasa hangat seperti dulu lagi.'
                    : 'No longer feel distant. Partner more open, conversations connect, time together feels warm like before.',
                },
                {
                  icon: '💬',
                  title: isID ? 'Komunikasi Lebih Nyaman' : 'More Comfortable Communication',
                  desc: isID
                    ? 'Tidak lagi takut salah ngomong. Kamu paham cara bicara yang bikin dia nyaman, tidak defensif, dan lebih mendengarkan.'
                    : 'No longer afraid to say wrong things. You understand how to speak so she\'s comfortable, not defensive, and listens more.',
                },
                {
                  icon: '💪',
                  title: isID ? 'Lebih Percaya Diri' : 'More Confident',
                  desc: isID
                    ? 'Kamu jadi lebih paham peranmu. Tidak lagi ragu atau pasif. Keputusan lebih tegas, tapi tetap penuh pertimbangan.'
                    : 'You understand your role better. No longer hesitant or passive. Decisions more firm, yet considerate.',
                },
                {
                  icon: '❤️',
                  title: isID ? 'Pasangan Lebih Terbuka' : 'Partner More Open',
                  desc: isID
                    ? 'Dia lebih nyaman cerita ke kamu. Masalah dibahas bersama. Tidak lagi merasa jadi orang luar di rumah sendiri.'
                    : 'She\'s more comfortable sharing with you. Problems discussed together. No longer feel like an outsider in your own home.',
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Breakdown */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
              {isID ? 'Apa yang Kamu Dapatkan?' : 'What Do You Get?'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: isID ? '📖 Modul 1: Fondasi Keharmonisan' : '📖 Module 1: Foundation of Harmony',
                  items: isID
                    ? ['Memahami perbedaan cara pikir pria dan wanita', 'Kenapa pasangan "tidak logis" kadang-kadang', 'Cara membangun trust yang kuat']
                    : ['Understanding male-female thinking differences', 'Why partners seem "illogical" sometimes', 'How to build strong trust'],
                },
                {
                  title: isID ? '💬 Modul 2: Komunikasi Efektif' : '💬 Module 2: Effective Communication',
                  items: isID
                    ? ['Cara ngomong yang bikin dia nyaman', 'Listening skills yang benar', 'Menyelesaikan konflik tanpa bertengkar']
                    : ['How to speak so she\'s comfortable', 'Proper listening skills', 'Resolving conflicts without fighting'],
                },
                {
                  title: isID ? '❤️ Modul 3: Membangun Kedekatan' : '❤️ Module 3: Building Closeness',
                  items: isID
                    ? ['Quality time yang bermakna', 'Cara memahami kebutuhan emosional', 'Membangun chemistry tanpa canggung']
                    : ['Meaningful quality time', 'Understanding emotional needs', 'Building chemistry without awkwardness'],
                },
                {
                  title: isID ? '🧠 Modul 4: Mindset Suami Berkualitas' : '🧠 Module 4: Quality Husband Mindset',
                  items: isID
                    ? ['Cara pikir yang bikin dia bangga', 'Menjadi leader di rumah tangga', 'Balance antara tegas dan penuh kasih']
                    : ['Thinking that makes her proud', 'Being the household leader', 'Balance between firm and loving'],
                },
              ].map((module, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-700">
                        <span className="text-green-500 font-bold mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Stacking */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {isID ? '🎁 Bonus Eksklusif (Gratis!)' : '🎁 Exclusive Bonuses (Free!)'}
              </h2>
              <p className="text-xl text-slate-700">
                {isID
                  ? 'Dapatkan 3 panduan tambahan + 6 video eksklusif senilai Rp 237.000'
                  : 'Get 3 additional guides + 6 exclusive videos worth Rp 237,000'}
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {[
                {
                  title: isID ? '🎁 Bonus 1: Cara Komunikasi yang Disukai Pasangan' : '🎁 Bonus 1: Communication Your Partner Likes',
                  value: 'Rp 99.000',
                  desc: isID
                    ? 'Panduan lengkap memahami cara bicara yang bikin pasangan nyaman, tidak defensif, dan lebih mendengarkan.'
                    : 'Complete guide to understand how to speak so your partner is comfortable, not defensive, and listens more.',
                },
                {
                  title: isID ? '🎁 Bonus 2: Membangun Kedekatan Tanpa Canggung' : '🎁 Bonus 2: Building Closeness Without Awkwardness',
                  value: 'Rp 79.000',
                  desc: isID
                    ? 'Cara membangun chemistry dan kedekatan tanpa awkward, tanpa merasa dipaksakan.'
                    : 'How to build chemistry and closeness without awkwardness, without feeling forced.',
                },
                {
                  title: isID ? '🎁 Bonus 3: Mindset Suami yang Dihargai Pasangan' : '🎁 Bonus 3: Mindset of an Appreciated Husband',
                  value: 'Rp 59.000',
                  desc: isID
                    ? 'Mengubah cara pikir agar hubungan lebih sehat, tidak toxic, dan kamu lebih dihargai.'
                    : 'Changing mindset for a healthier relationship, not toxic, and more appreciated.',
                },
              ].map((bonus, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-400">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">{bonus.title}</h3>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-bold">{bonus.value}</span>
                  </div>
                  <p className="text-slate-600">{bonus.desc}</p>
                </div>
              ))}
            </div>

            {/* Video Bonuses */}
            <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-yellow-400">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                {isID ? '🎥 Bonus Eksklusif: 6 Video Panduan Keharmonisan Rumah Tangga' : '🎥 Exclusive Bonus: 6 Marital Harmony Video Guides'}
              </h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {(isID
                  ? [
                      'Cara meningkatkan kepercayaan diri sebagai pria',
                      'Cara menjaga energi & vitalitas dalam hubungan',
                      'Cara memahami kebutuhan pasangan secara lebih dalam',
                      'Cara membangun kedekatan tanpa canggung',
                      'Cara membuat hubungan lebih hangat dan tidak hambar',
                      'Cara menjadi pasangan yang lebih peka dan perhatian',
                    ]
                  : [
                      'How to increase confidence as a man',
                      'How to maintain energy & vitality in relationships',
                      'How to deeply understand partner\'s needs',
                      'How to build closeness without awkwardness',
                      'How to make relationships warmer and less bland',
                      'How to become a more perceptive and attentive partner',
                    ]
                ).map((video, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-yellow-500 text-xl">▶️</span>
                    <span>{video}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stacking + Offer */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {isID ? 'Total Nilai Paket Ini:' : 'Total Package Value:'}
            </h2>

            <div className="bg-slate-800 p-8 rounded-xl mb-8">
              <div className="space-y-3 text-lg mb-6">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span>{isID ? 'Program Suami Sejati Ultimate' : 'Ultimate Husband Program'}</span>
                  <span className="font-bold">Rp 199.000</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span>{isID ? 'Bonus 1: Komunikasi' : 'Bonus 1: Communication'}</span>
                  <span className="font-bold">Rp 99.000</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span>{isID ? 'Bonus 2: Kedekatan' : 'Bonus 2: Closeness'}</span>
                  <span className="font-bold">Rp 79.000</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span>{isID ? 'Bonus 3: Mindset' : 'Bonus 3: Mindset'}</span>
                  <span className="font-bold">Rp 59.000</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold text-yellow-400 pt-4">
                  <span>TOTAL</span>
                  <span>Rp 436.000</span>
                </div>
              </div>

              <div className="border-t-4 border-yellow-500 pt-6">
                <div className="text-sm text-slate-400 mb-2">{isID ? 'Harga Normal' : 'Normal Price'}</div>
                <div className="text-3xl font-bold text-slate-400 line-through mb-4">Rp 436.000</div>
                <div className="text-sm text-yellow-400 mb-2">{isID ? 'Harga Hari Ini Saja:' : 'Today\'s Price Only:'}</div>
                <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">Rp 99.000</div>
                <div className="text-sm text-slate-400">{isID ? 'Hemat 77%!' : 'Save 77%!'}</div>
              </div>
            </div>

            {/* Scarcity */}
            <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
              <p className="font-bold text-lg">
                {isID ? '⏰ Harga Rp 99.000 hanya hari ini!' : '⏰ Rp 99,000 price today only!'}
              </p>
              <p className="text-sm opacity-90">
                {isID ? 'Kuota terbatas 50 orang. Besok naik ke Rp 199.000.' : 'Limited to 50 people. Tomorrow increases to Rp 199,000.'}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleCTAClick('offer')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-xl rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 mb-6"
            >
              {isID ? '🔥 Ambil Sekarang — Rp 99.000' : '🔥 Get Now — Rp 99,000'}
            </button>

            <p className="text-sm text-slate-400">
              {isID ? '✅ Akses instan via email · 💯 Garansi 7 hari uang kembali · 🔒 Transaksi aman' : '✅ Instant access via email · 💯 7-day money-back guarantee · 🔒 Secure transaction'}
            </p>
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
              {isID ? 'Masih Ragu? Ini Jawaban yang Kamu Butuhkan' : 'Still Hesitant? Here Are the Answers You Need'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isID ? '❓ "Apa ini benar-benar berhasil?"' : '❓ "Will this really work?"',
                  a: isID
                    ? 'Program ini sudah membantu 500+ suami memperbaiki hubungan mereka. Hasilnya bervariasi tergantung komitmen, tapi prinsip dasarnya: kalau kamu paham cara komunikasi dan kebutuhan pasangan, hubungan pasti membaik.'
                    : 'This program has helped 500+ husbands improve their relationships. Results vary based on commitment, but the basic principle: if you understand communication and partner\'s needs, relationships will improve.',
                },
                {
                  q: isID ? '❓ "Apa ini cocok untuk hubungan saya?"' : '❓ "Is this suitable for my relationship?"',
                  a: isID
                    ? 'Program ini dirancang untuk suami yang ingin memperbaiki hubungan, membangun kedekatan, dan menjadi lebih percaya diri. Cocok untuk semua tahap pernikahan — baru menikah, sudah punya anak, atau yang sudah lama menikah tapi merasa ada yang kurang.'
                    : 'This program is designed for husbands who want to improve relationships, build closeness, and become more confident. Suitable for all marriage stages — newlyweds, parents, or long-married couples who feel something\'s missing.',
                },
                {
                  q: isID ? '❓ "Bagaimana jika tidak berhasil?"' : '❓ "What if it doesn\'t work?"',
                  a: isID
                    ? 'Ada garansi 7 hari uang kembali tanpa pertanyaan. Kalau kamu merasa tidak cocok, cukup email kami dan uang kembali 100%. Tidak ada risiko sama sekali.'
                    : 'There\'s a 7-day money-back guarantee, no questions asked. If you feel it\'s not right, just email us and get 100% refund. Zero risk.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {isID ? 'Hubungan yang Kamu Inginkan Sudah Menunggu' : 'The Relationship You Want Is Waiting'}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {isID
                ? 'Tidak ada hubungan yang sempurna. Tapi ada hubungan yang terus membaik — kalau kamu mau belajar dan berusaha. Ini kesempatanmu.'
                : 'No relationship is perfect. But there are relationships that keep improving — if you\'re willing to learn and try. This is your chance.'}
            </p>

            <button
              onClick={() => handleCTAClick('final')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-xl rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 mb-6"
            >
              {isID ? '🚀 Ya, Saya Siap Memperbaiki Hubungan Saya' : '🚀 Yes, I\'m Ready to Improve My Relationship'}
            </button>

            <p className="text-sm text-slate-400 mb-8">
              {isID ? '⏰ Harga Rp 99.000 berakhir hari ini · 50 kuota tersisa' : '⏰ Rp 99,000 price ends today · 50 slots remaining'}
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-slate-400">
              <span>🔒</span>
              <span>{isID ? 'Transaksi aman & terenkripsi · Privasi terjamin' : 'Secure & encrypted transaction · Privacy guaranteed'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-sm text-slate-600">
            <p className="mb-2">
              {isID
                ? '⚠️ Konten ini ditujukan untuk edukasi dalam hubungan suami istri dalam pernikahan yang sah. Hasil dapat berbeda pada setiap individu tergantung komitmen dan usaha yang dilakukan.'
                : '⚠️ This content is intended for education in legitimate marital relationships. Results may vary for each individual depending on commitment and effort.'}
            </p>
            <p className="text-slate-500">
              © 2026 BerkahKarya. {isID ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
