/**
 * BerkahKarya — case-studies-data.js
 * 5 detailed case studies for portfolio/services pages
 */
(function () {
  'use strict';

  window.BerkahKarya = window.BerkahKarya || {};

  var CASE_STUDIES = [
    {
      id: 'tiktok-fashion',
      category: 'tiktok',
      icon: '🎬',
      title: { id: 'Viral TikTok Campaign — Brand Fashion Lokal', en: 'Viral TikTok Campaign — Local Fashion Brand' },
      client: 'Luna Fashion',
      duration: '3 bulan',
      challenge: [
        { id: 'Brand baru, 0 followers, tidak ada awareness di TikTok', en: 'Brand new, 0 followers, zero TikTok awareness' },
        { id: 'Budget terbatas — tidak bisa bersaing dengan brand besar lewat iklan', en: 'Limited budget — can\'t compete with big brands via ads' },
        { id: 'Produk fashion lokal susah menonjol di tengah persaingan ketat', en: 'Local fashion hard to stand out in fierce competition' },
      ],
      solution: [
        { id: 'Riset 200+ video viral fashion dalam 30 hari terakhir', en: 'Research of 200+ viral fashion videos in the last 30 days' },
        { id: 'Framework konten: 70% entertaining + 20% educating + 10% selling', en: 'Content framework: 70% entertaining + 20% educating + 10% selling' },
        { id: 'Hook formula khusus 3 detik pertama untuk stop scrolling', en: 'Custom 3-second hook formula to stop scrolling' },
        { id: 'Jadwal posting optimal: 3x/hari di jam peak audience aktif', en: 'Optimal posting schedule: 3x/day at peak audience hours' },
        { id: 'Kolaborasi micro-influencer 10-50K followers (biaya rendah, ROI tinggi)', en: 'Micro-influencer collaboration 10-50K followers (low cost, high ROI)' },
      ],
      timeline: [
        { phase: 1, label: { id: 'Bulan 1: Foundation', en: 'Month 1: Foundation' }, desc: { id: 'Setup profil, riset kompetitor, framework konten, 30 video uji coba', en: 'Profile setup, competitor research, content framework, 30 test videos' } },
        { phase: 2, label: { id: 'Bulan 2: Growth', en: 'Month 2: Growth' }, desc: { id: 'Scale konten viral, kolaborasi influencer, optimasi hashtag', en: 'Scale viral content, influencer collab, hashtag optimization' } },
        { phase: 3, label: { id: 'Bulan 3: Monetize', en: 'Month 3: Monetize' }, desc: { id: 'TikTok Shop integration, conversion funnel, retargeting', en: 'TikTok Shop integration, conversion funnel, retargeting' } },
      ],
      results: {
        before: { followers: 0, avgViews: 0, monthlySales: 0 },
        after: { followers: 125000, avgViews: 850000, monthlySales: 485000000 },
        growth: {
          followersGrowth: '+125.000 followers',
          totalReach: '2.1 juta tayangan',
          roi: '580% ROI',
          salesGrowth: 'Rp 0 → Rp 485 juta/bulan',
        },
      },
      testimonial: {
        text: { id: '"Dalam 3 bulan dari 0 jadi 125K followers! Sales dari TikTok sekarang 40% dari total revenue kami. BerkahKarya literally ubah bisnis kami."', en: '"In 3 months from 0 to 125K followers! TikTok sales are now 40% of our total revenue. BerkahKarya literally transformed our business."' },
        name: 'Sarah Wijaya',
        position: { id: 'Founder, Luna Fashion', en: 'Founder, Luna Fashion' },
        avatar: '👩',
      },
    },

    {
      id: 'ecommerce-shopify',
      category: 'ecommerce',
      icon: '🛒',
      title: { id: 'E-commerce Optimization — Shopify Store', en: 'E-commerce Optimization — Shopify Store' },
      client: 'NatureCare Indonesia',
      duration: '6 bulan',
      challenge: [
        { id: 'Conversion rate sangat rendah — 0.8% dari traffic yang ada', en: 'Very low conversion rate — 0.8% of existing traffic' },
        { id: 'Cart abandonment rate 78% — hampir semua pengunjung pergi tanpa beli', en: '78% cart abandonment rate — almost all visitors leave without buying' },
        { id: 'Revenue stagnan di Rp 85M/bulan selama 8 bulan', en: 'Revenue stagnant at Rp 85M/month for 8 months' },
      ],
      solution: [
        { id: 'Audit UX lengkap: heatmap, session recording, user journey analysis', en: 'Full UX audit: heatmap, session recording, user journey analysis' },
        { id: 'Redesign checkout flow — dari 5 langkah ke 2 langkah', en: 'Checkout flow redesign — from 5 steps to 2 steps' },
        { id: 'Trust signals: review badges, security icons, social proof counter', en: 'Trust signals: review badges, security icons, social proof counter' },
        { id: 'Product page optimization: video demo, FAQ section, comparison table', en: 'Product page optimization: video demo, FAQ section, comparison table' },
        { id: 'Email automation: cart recovery, welcome series, post-purchase', en: 'Email automation: cart recovery, welcome series, post-purchase' },
        { id: 'A/B testing continuous: CTA, pricing display, bundle offers', en: 'Continuous A/B testing: CTA, pricing display, bundle offers' },
      ],
      timeline: [
        { phase: 1, label: { id: 'Bulan 1-2: Audit & Research', en: 'Month 1-2: Audit & Research' }, desc: { id: 'Analisis data lengkap, identifikasi friction points, quick wins', en: 'Full data analysis, friction point identification, quick wins' } },
        { phase: 2, label: { id: 'Bulan 3-4: Implement', en: 'Month 3-4: Implement' }, desc: { id: 'UX redesign, checkout optimization, trust signal install', en: 'UX redesign, checkout optimization, trust signal installation' } },
        { phase: 3, label: { id: 'Bulan 5-6: Scale & Refine', en: 'Month 5-6: Scale & Refine' }, desc: { id: 'A/B testing, automation setup, retargeting campaign', en: 'A/B testing, automation setup, retargeting campaign' } },
      ],
      results: {
        before: { cvr: '0.8%', revenue: 85000000, cartAbandonment: '78%' },
        after: { cvr: '3.6%', revenue: 245000000, cartAbandonment: '41%' },
        growth: {
          cvrGrowth: '+350% conversion rate',
          revenueGrowth: 'Rp 85M → Rp 245M (+188%)',
          roi: '740% ROI',
          cartRecovery: 'Cart abandonment turun 47%',
        },
      },
      testimonial: {
        text: { id: '"Revenue kami naik hampir 3x lipat dalam 6 bulan! Yang paling mengejutkan adalah conversion rate dari 0.8% ke 3.6%. Tim BerkahKarya sangat detail dan data-driven."', en: '"Our revenue almost tripled in 6 months! Most surprising was conversion rate from 0.8% to 3.6%. The BerkahKarya team is extremely detail-oriented and data-driven."' },
        name: 'Budi Santoso',
        position: { id: 'CEO, NatureCare Indonesia', en: 'CEO, NatureCare Indonesia' },
        avatar: '👨‍💼',
      },
    },

    {
      id: 'seo-website',
      category: 'seo',
      icon: '🔍',
      title: { id: 'SEO Domination — B2B Services Website', en: 'SEO Domination — B2B Services Website' },
      client: 'ProConsult Solutions',
      duration: '12 bulan',
      challenge: [
        { id: 'Traffic organik sangat rendah — 2.500 visitor/bulan', en: 'Very low organic traffic — 2,500 visitors/month' },
        { id: 'Tidak ada keyword yang masuk halaman 1 Google', en: 'No keywords on Google page 1' },
        { id: 'Kompetitor sudah dominan di semua keyword target', en: 'Competitors already dominate all target keywords' },
      ],
      solution: [
        { id: 'Keyword research 500+ kata kunci relevan dengan intent mapping', en: '500+ relevant keyword research with intent mapping' },
        { id: 'Technical SEO audit: site speed, Core Web Vitals, schema markup', en: 'Technical SEO audit: site speed, Core Web Vitals, schema markup' },
        { id: 'Content strategy: 3 artikel per minggu, 1.500-4.000 words each', en: 'Content strategy: 3 articles per week, 1,500-4,000 words each' },
        { id: 'Link building: 120+ backlink berkualitas dari domain authority 30+', en: 'Link building: 120+ quality backlinks from domain authority 30+' },
        { id: 'Local SEO optimization untuk 5 kota besar Indonesia', en: 'Local SEO optimization for 5 major Indonesian cities' },
      ],
      timeline: [
        { phase: 1, label: { id: 'Bulan 1-3: Technical & Foundation', en: 'Month 1-3: Technical & Foundation' }, desc: { id: 'Technical SEO fix, on-page optimization, content calendar setup', en: 'Technical SEO fix, on-page optimization, content calendar setup' } },
        { phase: 2, label: { id: 'Bulan 4-8: Content & Authority', en: 'Month 4-8: Content & Authority' }, desc: { id: 'Produksi konten masif, link building campaign, social signals', en: 'Massive content production, link building campaign, social signals' } },
        { phase: 3, label: { id: 'Bulan 9-12: Domination', en: 'Month 9-12: Domination' }, desc: { id: 'Scale konten, featured snippet optimization, conversion rate', en: 'Scale content, featured snippet optimization, conversion rate' } },
      ],
      results: {
        before: { traffic: 2500, keywords: 0, revenue: 12000000 },
        after: { traffic: 42000, keywords: 87, revenue: 95000000 },
        growth: {
          trafficGrowth: '+1.580% organic traffic',
          keywordsPage1: '87 keywords halaman 1 Google',
          revenueGrowth: 'Rp 12M → Rp 95M (+692%)',
          roi: '1.240% ROI',
        },
      },
      testimonial: {
        text: { id: '"Kami tidak percaya SEO bisa secepat ini. Dalam 12 bulan traffic organik naik dari 2.500 ke 42.000 visitor. Revenue ikut naik 7x lipat. Pure organic, no paid ads."', en: '"We didn\'t believe SEO could work this fast. In 12 months organic traffic rose from 2,500 to 42,000 visitors. Revenue grew 7x. Pure organic, no paid ads."' },
        name: 'Dr. Hendra Kusuma',
        position: { id: 'Managing Director, ProConsult Solutions', en: 'Managing Director, ProConsult Solutions' },
        avatar: '👨‍🎓',
      },
    },

    {
      id: 'trading-bot',
      category: 'trading',
      icon: '📈',
      title: { id: 'Automated Trading Bot — XAUUSD Strategy', en: 'Automated Trading Bot — XAUUSD Strategy' },
      client: 'Private Trader (anonim)',
      duration: '12 bulan live trading',
      challenge: [
        { id: 'Trading manual — emosi sering mengacaukan keputusan', en: 'Manual trading — emotions often disrupt decisions' },
        { id: 'Tidak bisa monitor pasar 24/7 karena kesibukan', en: 'Can\'t monitor the market 24/7 due to busy schedule' },
        { id: 'Win rate tidak konsisten: 40-55% tergantung kondisi pasar', en: 'Inconsistent win rate: 40-55% depending on market conditions' },
      ],
      solution: [
        { id: 'Custom algorithm berdasarkan price action + volume analysis', en: 'Custom algorithm based on price action + volume analysis' },
        { id: 'Multi-timeframe confirmation: H4 trend + H1 entry + M15 timing', en: 'Multi-timeframe confirmation: H4 trend + H1 entry + M15 timing' },
        { id: 'Dynamic position sizing berdasarkan volatility (ATR-based)', en: 'Dynamic position sizing based on volatility (ATR-based)' },
        { id: 'Hard SL/TP + trailing stop untuk lock profit secara otomatis', en: 'Hard SL/TP + trailing stop to lock profit automatically' },
        { id: 'Backtesting 5 tahun data sebelum live — 3 bulan forward test', en: '5-year data backtesting before live — 3 months forward test' },
      ],
      timeline: [
        { phase: 1, label: { id: 'Bulan 1-2: Strategy Design', en: 'Month 1-2: Strategy Design' }, desc: { id: 'Backtest, parameter optimization, risk management setup', en: 'Backtest, parameter optimization, risk management setup' } },
        { phase: 2, label: { id: 'Bulan 3: Forward Test', en: 'Month 3: Forward Test' }, desc: { id: 'Demo account live test, adjustment minor, monitoring', en: 'Demo account live test, minor adjustments, monitoring' } },
        { phase: 3, label: { id: 'Bulan 4-12: Live Trading', en: 'Month 4-12: Live Trading' }, desc: { id: 'Live account, monthly review, parameter refinement', en: 'Live account, monthly review, parameter refinement' } },
      ],
      results: {
        before: { winRate: '47%', annualReturn: null, maxDrawdown: '-18%' },
        after: { winRate: '69.8%', annualReturn: '+87.5%', maxDrawdown: '-7.3%' },
        growth: {
          winRate: 'Win rate: 47% → 69.8%',
          annualReturn: '+87.5% return (12 bulan)',
          drawdown: 'Max drawdown: -18% → -7.3%',
          roi: 'Sharpe Ratio: 2.8',
        },
      },
      testimonial: {
        text: { id: '"Bot ini literally berjalan sendiri selagi saya tidur. Win rate 69.8% konsisten selama 12 bulan. Return 87.5% dengan drawdown hanya 7.3%. Luar biasa."', en: '"This bot literally runs itself while I sleep. 69.8% win rate consistent for 12 months. 87.5% return with only 7.3% drawdown. Incredible."' },
        name: 'Trader A.',
        position: { id: 'Professional Trader, Jakarta', en: 'Professional Trader, Jakarta' },
        avatar: '💹',
      },
    },

    {
      id: 'ai-agent',
      category: 'aiagent',
      icon: '🤖',
      title: { id: 'AI Agent Pro — E-commerce Customer Service', en: 'AI Agent Pro — E-commerce Customer Service' },
      client: 'FreshMart Online',
      duration: '4 bulan',
      challenge: [
        { id: 'Tim CS kewalahan — 500+ pesan/hari, respon rata-rata 2-3 jam', en: 'CS team overwhelmed — 500+ messages/day, avg response 2-3 hours' },
        { id: 'Conversion dari chat sangat rendah — 2.1% saja', en: 'Chat conversion very low — only 2.1%' },
        { id: 'Biaya CS membengkak: 4 orang CS + overtime cost', en: 'CS costs ballooning: 4 CS staff + overtime costs' },
      ],
      solution: [
        { id: 'Setup AI Agent dengan training data 2.000+ FAQ bisnis', en: 'AI Agent setup with training data of 2,000+ business FAQs' },
        { id: 'Integrasi WhatsApp Business API + katalog produk real-time', en: 'WhatsApp Business API + real-time product catalog integration' },
        { id: 'Smart escalation: AI handle 80%, human untuk case kompleks', en: 'Smart escalation: AI handles 80%, human for complex cases' },
        { id: 'Personalized recommendations berdasarkan riwayat pembelian', en: 'Personalized recommendations based on purchase history' },
        { id: 'Automated follow-up sequence untuk cart abandonment', en: 'Automated follow-up sequence for cart abandonment' },
      ],
      timeline: [
        { phase: 1, label: { id: 'Minggu 1-2: Setup & Training', en: 'Week 1-2: Setup & Training' }, desc: { id: 'AI training, knowledge base build, integration setup', en: 'AI training, knowledge base build, integration setup' } },
        { phase: 2, label: { id: 'Minggu 3-4: Soft Launch', en: 'Week 3-4: Soft Launch' }, desc: { id: 'Parallel run dengan CS manusia, fine-tuning responses', en: 'Parallel run with human CS, fine-tuning responses' } },
        { phase: 3, label: { id: 'Bulan 2-4: Full Deployment', en: 'Month 2-4: Full Deployment' }, desc: { id: 'Full handover, monitoring, continuous improvement', en: 'Full handover, monitoring, continuous improvement' } },
      ],
      results: {
        before: { responseTime: '2-3 jam', cvr: '2.1%', csCost: 28000000 },
        after: { responseTime: '<2 detik', cvr: '5.8%', csCost: 8000000 },
        growth: {
          responseTime: 'Response: 2-3 jam → <2 detik',
          cvrGrowth: 'Conversion: 2.1% → 5.8% (+176%)',
          costSaving: 'Biaya CS: -60% (Rp 28M → Rp 8M/bulan)',
          roi: '850% ROI dalam 4 bulan',
        },
      },
      testimonial: {
        text: { id: '"AI Agent-nya benar-benar menggantikan 3 dari 4 CS kami. Respon sekarang instan, conversion naik dari 2.1% ke 5.8%, dan biaya CS turun 60%. ROI-nya gila."', en: '"The AI Agent truly replaced 3 of our 4 CS staff. Response is now instant, conversion rose from 2.1% to 5.8%, and CS costs dropped 60%. The ROI is insane."' },
        name: 'Rina Hartati',
        position: { id: 'Operations Manager, FreshMart Online', en: 'Operations Manager, FreshMart Online' },
        avatar: '👩‍💻',
      },
    },
  ];

  window.BerkahKarya.CaseStudies = {
    data: CASE_STUDIES,
    getById: function (id) { return CASE_STUDIES.find(function (c) { return c.id === id; }); },
    getByCategory: function (cat) { return CASE_STUDIES.filter(function (c) { return c.category === cat; }); },
  };
})();
