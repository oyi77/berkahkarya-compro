// ============================================
// TRACKING CONFIGURATION — EDIT IDS HERE
// ============================================

export const TRACKING = {
  // Google Analytics 4
  GA_ID: 'G-V9C14XZ9SG',

  // Meta (Facebook) Pixel
  META_PIXEL_ID: '771021905629860',

  // TikTok Pixel
  TIKTOK_PIXEL_ID: 'D6IA84RC77UCTB9KG9OG',

  // TikTok Events API (server-side)
  TIKTOK_EVENTS_API_TOKEN: '3f300357f016bcae0a2504645ef61a51fa20a998',

  // Meta Conversions API (server-side) — access token
  META_CAPI_TOKEN: 'EAAKA2OT1FroBRGYFy810vL4zMjM8IahTZC3Yvat4l1yqTQsZCjoZCiQGzpj594E87wxTRZCG1snxZBlw6iIXQN90lfcJWXsJJ7EKb0oxMqkPlakGr61LTZCyENHB4n4SOiRCCpo5eyej73V2srx8nKmzh5AmiqSr883we2p3J4F9DeG57swJZCuus2yzc7rkF60kZBZBwVrrFIq0a2gYace9r500FwlyvWaWe2XuI9hG0tQKGsLmvaeZCeVbyu3dUi685oaE1CjqVQvNhwYLhlvwZDZD',

  // Pinterest domain verification
  PINTEREST_VERIFICATION: '9212df9ddce352a5ada074e7d33a9e77',
} as const;

// ============================================
// USER SESSION & REFERRER TRACKING
// ============================================

interface UserSession {
  session_id: string;
  first_touch: {
    referrer: string;
    landing_page: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    timestamp: number;
  };
  last_touch: {
    referrer: string;
    page: string;
    timestamp: number;
  };
  page_views: number;
  events: string[];
}

/** Generate unique session ID */
function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

/** Get or create user session with referrer data */
export function getUserSession(): UserSession {
  if (typeof window === 'undefined') {
    return {
      session_id: 'server',
      first_touch: { referrer: '', landing_page: '', timestamp: 0 },
      last_touch: { referrer: '', page: '', timestamp: 0 },
      page_views: 0,
      events: [],
    };
  }

  const stored = localStorage.getItem('bk_user_session');
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer || 'direct';
  const currentPage = window.location.pathname;
  
  if (stored) {
    const session: UserSession = JSON.parse(stored);
    // Update last touch
    session.last_touch = {
      referrer: referrer,
      page: currentPage,
      timestamp: Date.now(),
    };
    session.page_views++;
    localStorage.setItem('bk_user_session', JSON.stringify(session));
    return session;
  }

  // New session
  const newSession: UserSession = {
    session_id: generateSessionId(),
    first_touch: {
      referrer: referrer,
      landing_page: currentPage,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      timestamp: Date.now(),
    },
    last_touch: {
      referrer: referrer,
      page: currentPage,
      timestamp: Date.now(),
    },
    page_views: 1,
    events: [],
  };

  localStorage.setItem('bk_user_session', JSON.stringify(newSession));
  return newSession;
}

/** Parse referrer to get source category */
export function getReferrerSource(referrer: string): string {
  if (!referrer || referrer === 'direct') return 'direct';
  
  const domain = new URL(referrer).hostname.toLowerCase();
  
  // Social Media
  if (domain.includes('facebook') || domain.includes('fb.com')) return 'facebook';
  if (domain.includes('instagram')) return 'instagram';
  if (domain.includes('tiktok')) return 'tiktok';
  if (domain.includes('twitter') || domain.includes('x.com')) return 'twitter';
  if (domain.includes('linkedin')) return 'linkedin';
  if (domain.includes('youtube')) return 'youtube';
  if (domain.includes('whatsapp') || domain.includes('wa.me')) return 'whatsapp';
  if (domain.includes('telegram') || domain.includes('t.me')) return 'telegram';
  
  // Search Engines
  if (domain.includes('google')) return 'google_organic';
  if (domain.includes('bing')) return 'bing_organic';
  if (domain.includes('yahoo')) return 'yahoo_organic';
  if (domain.includes('duckduckgo')) return 'duckduckgo';
  
  // E-commerce
  if (domain.includes('shopee')) return 'shopee';
  if (domain.includes('tokopedia')) return 'tokopedia';
  if (domain.includes('lazada')) return 'lazada';
  
  // Internal
  if (domain.includes('berkahkarya')) return 'internal';
  if (domain.includes('aitradepulse')) return 'saas_app';
  
  return 'referral_' + domain.split('.')[0];
}

/** Add event to user journey */
export function addEventToJourney(eventName: string) {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem('bk_user_session');
  if (stored) {
    const session: UserSession = JSON.parse(stored);
    session.events.push(`${eventName}:${Date.now()}`);
    localStorage.setItem('bk_user_session', JSON.stringify(session));
  }
}

// ============================================
// META PIXEL HELPERS
// ============================================

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    gtag: (...args: unknown[]) => void;
    ttq: {
      track: (event: string, data?: Record<string, unknown>) => void;
      page: () => void;
      identify: (data: Record<string, unknown>) => void;
    };
    pintrk: (...args: unknown[]) => void;
  }
}

/** Track Meta Pixel standard event */
export function trackMetaEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('track', event, data);
    } else {
      window.fbq('track', event);
    }
  }
}

/** Track Meta Pixel custom event */
export function trackMetaCustomEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    if (data) {
      window.fbq('trackCustom', event, data);
    } else {
      window.fbq('trackCustom', event);
    }
  }
}

// ============================================
// GA4 HELPERS
// ============================================

/** Track GA4 event */
export function trackGAEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

// ============================================
// TIKTOK PIXEL HELPERS
// ============================================

/** Track TikTok Pixel event */
export function trackTikTokEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.ttq) {
    if (data) {
      window.ttq.track(event, data);
    } else {
      window.ttq.track(event);
    }
  }
}

// ============================================
// SERVER-SIDE APIS (CAPI)
// ============================================

/** Send event via TikTok Events API (server-side) */
export function sendTikTokCAPI(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !TRACKING.TIKTOK_PIXEL_ID) return;

  const session = getUserSession();
  const payload = {
    event_name: eventName,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
    custom_data: {
      ...data,
      session_id: session.session_id,
      referrer_source: getReferrerSource(session.first_touch.referrer),
      utm_source: session.first_touch.utm_source,
      utm_campaign: session.first_touch.utm_campaign,
    },
  };

  fetch('/api/tiktok-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

/** Send event via Meta Conversions API (server-side) */
export function sendMetaCAPI(eventName: string, customData?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !TRACKING.META_PIXEL_ID) return;

  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
  };

  const session = getUserSession();
  const payload = {
    event_name: eventName,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
    custom_data: {
      ...customData,
      session_id: session.session_id,
      referrer_source: getReferrerSource(session.first_touch.referrer),
      utm_source: session.first_touch.utm_source,
      utm_medium: session.first_touch.utm_medium,
      utm_campaign: session.first_touch.utm_campaign,
      landing_page: session.first_touch.landing_page,
      page_views: session.page_views,
    },
  };

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

// ============================================
// ADD TO CART — External CTA Clicks (WhatsApp, SaaS, etc)
// ============================================

/** 
 * Track AddToCart event for external CTA clicks
 * Use this for: WhatsApp links, SaaS redirects, external checkouts
 */
export function trackAddToCart(params: {
  content_name: string;       // e.g., "AI Video Studio", "Growth Plan"
  content_id?: string;        // e.g., "lp1", "growth-plan"
  content_type?: string;      // e.g., "product", "service", "subscription"
  value?: number;             // e.g., 149000
  currency?: string;          // e.g., "IDR"
  destination: string;        // e.g., "whatsapp", "saas.aitradepulse.com"
  destination_url: string;    // full URL
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);
  
  const eventData = {
    content_name: params.content_name,
    content_ids: [params.content_id || params.content_name],
    content_type: params.content_type || 'product',
    value: params.value || 0,
    currency: params.currency || 'IDR',
    // Custom attribution data
    destination: params.destination,
    destination_url: params.destination_url,
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
    utm_medium: session.first_touch.utm_medium,
    utm_campaign: session.first_touch.utm_campaign,
    landing_page: session.first_touch.landing_page,
    page_views_before_atc: session.page_views,
  };

  addEventToJourney('AddToCart');

  // GA4 — add_to_cart
  trackGAEvent('add_to_cart', {
    currency: params.currency || 'IDR',
    value: params.value || 0,
    items: [{
      item_name: params.content_name,
      item_id: params.content_id,
      price: params.value,
    }],
    // Custom dimensions
    traffic_source: referrerSource,
    utm_source: session.first_touch.utm_source,
    utm_campaign: session.first_touch.utm_campaign,
    destination_type: params.destination,
  });

  // Meta Pixel — AddToCart
  trackMetaEvent('AddToCart', eventData);

  // Meta CAPI — server-side AddToCart
  sendMetaCAPI('AddToCart', eventData);

  // TikTok Pixel — AddToCart
  trackTikTokEvent('AddToCart', eventData);

  // TikTok CAPI — server-side
  sendTikTokCAPI('AddToCart', eventData);

  // Pinterest (if available)
  if (typeof window !== 'undefined' && window.pintrk) {
    window.pintrk('track', 'addtocart', {
      product_name: params.content_name,
      value: params.value,
      currency: params.currency || 'IDR',
    });
  }

  console.log('[Tracking] AddToCart:', eventData);
}

// ============================================
// INITIATE CHECKOUT — Before redirect to payment/WA
// ============================================

export function trackInitiateCheckout(params: {
  content_name: string;
  content_id?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: params.content_name,
    content_ids: [params.content_id || params.content_name],
    value: params.value || 0,
    currency: params.currency || 'IDR',
    num_items: params.num_items || 1,
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
    utm_campaign: session.first_touch.utm_campaign,
  };

  addEventToJourney('InitiateCheckout');

  // GA4
  trackGAEvent('begin_checkout', {
    currency: params.currency || 'IDR',
    value: params.value || 0,
    items: [{ item_name: params.content_name, item_id: params.content_id, price: params.value }],
    traffic_source: referrerSource,
  });

  // Meta Pixel
  trackMetaEvent('InitiateCheckout', eventData);
  sendMetaCAPI('InitiateCheckout', eventData);

  // TikTok
  trackTikTokEvent('InitiateCheckout', eventData);
  sendTikTokCAPI('InitiateCheckout', eventData);

  console.log('[Tracking] InitiateCheckout:', eventData);
}

// ============================================
// PURCHASE — Call when payment confirmed
// ============================================

export function trackPurchase(params: {
  content_name: string;
  content_id?: string;
  value: number;
  currency?: string;
  transaction_id?: string;
  num_items?: number;
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: params.content_name,
    content_ids: [params.content_id || params.content_name],
    value: params.value,
    currency: params.currency || 'IDR',
    transaction_id: params.transaction_id,
    num_items: params.num_items || 1,
    // Full attribution
    session_id: session.session_id,
    referrer_source: referrerSource,
    first_touch_referrer: session.first_touch.referrer,
    utm_source: session.first_touch.utm_source,
    utm_medium: session.first_touch.utm_medium,
    utm_campaign: session.first_touch.utm_campaign,
    utm_content: session.first_touch.utm_content,
    landing_page: session.first_touch.landing_page,
    page_views_total: session.page_views,
    customer_journey: session.events.join(' > '),
  };

  addEventToJourney('Purchase');

  // GA4
  trackGAEvent('purchase', {
    transaction_id: params.transaction_id,
    currency: params.currency || 'IDR',
    value: params.value,
    items: [{ item_name: params.content_name, item_id: params.content_id, price: params.value }],
    traffic_source: referrerSource,
    utm_source: session.first_touch.utm_source,
  });

  // Meta Pixel
  trackMetaEvent('Purchase', eventData);
  sendMetaCAPI('Purchase', eventData);

  // TikTok
  trackTikTokEvent('CompletePayment', eventData);
  sendTikTokCAPI('CompletePayment', eventData);

  // Pinterest
  if (typeof window !== 'undefined' && window.pintrk) {
    window.pintrk('track', 'checkout', {
      value: params.value,
      currency: params.currency || 'IDR',
      order_id: params.transaction_id,
    });
  }

  console.log('[Tracking] Purchase:', eventData);
}

// ============================================
// CTA CLICK — General CTA tracking (uses AddToCart for external)
// ============================================

/** 
 * Track CTA click — automatically uses AddToCart for external links
 */
export function trackCTAClick(ctaName: string, destination: string) {
  const isExternal = destination.startsWith('http') && !destination.includes('berkahkarya.org');
  const isWhatsApp = destination.includes('wa.me') || destination.includes('whatsapp');
  const isTelegram = destination.includes('t.me') || destination.includes('telegram');
  
  if (isExternal || isWhatsApp || isTelegram) {
    // External CTA → Track as AddToCart
    let destinationType = 'external';
    if (isWhatsApp) destinationType = 'whatsapp';
    else if (isTelegram) destinationType = 'telegram';
    else if (destination.includes('aitradepulse')) destinationType = 'saas_app';
    
    trackAddToCart({
      content_name: ctaName,
      content_id: ctaName.toLowerCase().replace(/\s+/g, '-'),
      content_type: 'cta_conversion',
      destination: destinationType,
      destination_url: destination,
    });
  } else {
    // Internal navigation → Track as Lead
    const session = getUserSession();
    
    trackGAEvent('cta_click', {
      cta_name: ctaName,
      destination: destination,
    });

    trackMetaEvent('Lead', {
      content_name: ctaName,
      content_category: 'CTA',
      session_id: session.session_id,
    });

    sendMetaCAPI('Lead', {
      content_name: ctaName,
      content_category: 'CTA',
    });

    trackTikTokEvent('ClickButton', {
      content_name: ctaName,
      content_type: 'cta',
    });

    sendTikTokCAPI('ClickButton', { content_name: ctaName });
  }
}

// ============================================
// VIEW CONTENT — Page views with attribution
// ============================================

export function trackViewContent(pageName: string, pageType: string) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: pageName,
    content_type: pageType,
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
    utm_campaign: session.first_touch.utm_campaign,
    page_view_number: session.page_views,
  };

  addEventToJourney(`ViewContent:${pageName}`);

  // GA4
  trackGAEvent('view_content', eventData);

  // Meta Pixel
  trackMetaEvent('ViewContent', eventData);
  sendMetaCAPI('ViewContent', eventData);

  // TikTok
  trackTikTokEvent('ViewContent', eventData);
  sendTikTokCAPI('ViewContent', eventData);
}

// ============================================
// PRODUCT VIEW — Specific product page view
// ============================================

export function trackProductView(productName: string, price?: string, productId?: string) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: productName,
    content_ids: [productId || productName],
    content_type: 'product',
    value: price ? parseFloat(price.replace(/\D/g, '')) : 0,
    currency: 'IDR',
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
  };

  addEventToJourney(`ProductView:${productName}`);

  // GA4
  trackGAEvent('view_item', {
    item_name: productName,
    item_id: productId,
    price: price,
    traffic_source: referrerSource,
  });

  // Meta Pixel
  trackMetaEvent('ViewContent', eventData);
  sendMetaCAPI('ViewContent', eventData);

  // TikTok
  trackTikTokEvent('ViewContent', eventData);
  sendTikTokCAPI('ViewContent', eventData);
}

// ============================================
// LTV TRACKING — Customer Lifetime Value
// ============================================

interface CustomerLTV {
  customer_id: string;
  first_purchase_date: number;
  total_purchases: number;
  total_value: number;
  purchases: Array<{
    date: number;
    value: number;
    product: string;
    source: string;
  }>;
}

/** Get or create customer LTV record */
export function getCustomerLTV(customerId?: string): CustomerLTV {
  if (typeof window === 'undefined') {
    return { customer_id: '', first_purchase_date: 0, total_purchases: 0, total_value: 0, purchases: [] };
  }

  const stored = localStorage.getItem('bk_customer_ltv');
  if (stored) {
    return JSON.parse(stored);
  }

  const session = getUserSession();
  const newLTV: CustomerLTV = {
    customer_id: customerId || session.session_id,
    first_purchase_date: 0,
    total_purchases: 0,
    total_value: 0,
    purchases: [],
  };

  localStorage.setItem('bk_customer_ltv', JSON.stringify(newLTV));
  return newLTV;
}

/** Record purchase for LTV tracking */
export function recordPurchaseForLTV(value: number, productName: string) {
  if (typeof window === 'undefined') return;

  const session = getUserSession();
  const ltv = getCustomerLTV();
  
  ltv.purchases.push({
    date: Date.now(),
    value: value,
    product: productName,
    source: getReferrerSource(session.first_touch.referrer),
  });
  
  ltv.total_purchases++;
  ltv.total_value += value;
  
  if (!ltv.first_purchase_date) {
    ltv.first_purchase_date = Date.now();
  }

  localStorage.setItem('bk_customer_ltv', JSON.stringify(ltv));

  // Send LTV data to analytics
  trackGAEvent('ltv_update', {
    customer_id: ltv.customer_id,
    total_ltv: ltv.total_value,
    purchase_count: ltv.total_purchases,
    avg_order_value: Math.round(ltv.total_value / ltv.total_purchases),
    first_purchase_source: ltv.purchases[0]?.source,
  });

  console.log('[Tracking] LTV Updated:', ltv);
}

// ============================================
// ANALYTICS REPORT — Get full attribution data
// ============================================

export function getAttributionReport() {
  if (typeof window === 'undefined') return null;

  const session = getUserSession();
  const ltv = getCustomerLTV();

  return {
    session: {
      id: session.session_id,
      first_touch: session.first_touch,
      last_touch: session.last_touch,
      page_views: session.page_views,
      events: session.events,
      referrer_source: getReferrerSource(session.first_touch.referrer),
    },
    ltv: {
      customer_id: ltv.customer_id,
      total_purchases: ltv.total_purchases,
      total_value: ltv.total_value,
      avg_order_value: ltv.total_purchases > 0 ? Math.round(ltv.total_value / ltv.total_purchases) : 0,
      first_purchase_date: ltv.first_purchase_date ? new Date(ltv.first_purchase_date).toISOString() : null,
      purchases: ltv.purchases,
    },
    journey: session.events.map(e => {
      const [event, timestamp] = e.split(':');
      return { event, timestamp: new Date(parseInt(timestamp)).toISOString() };
    }),
  };
}

// ============================================
// WHATSAPP TRACKING — Specific WA link tracking
// ============================================

/**
 * Track WhatsApp click with full attribution
 * Use: trackWhatsAppClick('Sales Inquiry', '6281234567890', 'Halo, saya mau tanya...')
 */
export function trackWhatsAppClick(params: {
  intent: string;           // e.g., "Sales Inquiry", "Support", "Order"
  phone_number: string;     // e.g., "6281234567890"
  message?: string;         // Pre-filled message
  product_name?: string;    // e.g., "AI Video Studio Growth"
  product_value?: number;   // e.g., 149000
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);
  
  const waUrl = `https://wa.me/${params.phone_number}${params.message ? '?text=' + encodeURIComponent(params.message) : ''}`;
  
  const eventData = {
    content_name: params.intent,
    content_type: 'whatsapp_inquiry',
    content_ids: [params.product_name || params.intent],
    value: params.product_value || 0,
    currency: 'IDR',
    // Attribution
    destination: 'whatsapp',
    destination_url: waUrl,
    phone_number: params.phone_number,
    intent_type: params.intent,
    product_name: params.product_name,
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
    utm_campaign: session.first_touch.utm_campaign,
    landing_page: session.first_touch.landing_page,
    page_views_before: session.page_views,
  };

  addEventToJourney(`WhatsApp:${params.intent}`);

  // GA4
  trackGAEvent('contact', {
    method: 'whatsapp',
    intent: params.intent,
    product: params.product_name,
    value: params.product_value,
    traffic_source: referrerSource,
  });

  // Also track as AddToCart for funnel
  trackMetaEvent('AddToCart', eventData);
  sendMetaCAPI('AddToCart', eventData);

  // Lead event for WhatsApp
  trackMetaEvent('Lead', {
    content_name: `WA: ${params.intent}`,
    content_category: 'WhatsApp',
    value: params.product_value,
  });
  sendMetaCAPI('Lead', {
    content_name: `WA: ${params.intent}`,
    content_category: 'WhatsApp',
  });

  // TikTok
  trackTikTokEvent('Contact', eventData);
  sendTikTokCAPI('Contact', eventData);

  console.log('[Tracking] WhatsApp Click:', eventData);
}

// ============================================
// PRICING PAGE TRACKING
// ============================================

/**
 * Track pricing page view
 */
export function trackPricingView(pricingTier?: string) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: 'Pricing Page',
    content_type: 'pricing',
    content_category: pricingTier || 'all_tiers',
    session_id: session.session_id,
    referrer_source: referrerSource,
    utm_source: session.first_touch.utm_source,
  };

  addEventToJourney('PricingView');

  // GA4
  trackGAEvent('view_pricing', {
    tier: pricingTier,
    traffic_source: referrerSource,
  });

  // Meta
  trackMetaEvent('ViewContent', {
    ...eventData,
    content_type: 'pricing_page',
  });

  console.log('[Tracking] Pricing View:', eventData);
}

/**
 * Track pricing tier selection (hover/click)
 */
export function trackPricingSelect(params: {
  tier_name: string;        // e.g., "Starter", "Growth", "Kingdom"
  price: number;            // e.g., 49000, 149000, 499000
  currency?: string;
  action: 'hover' | 'click' | 'select';
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  const eventData = {
    content_name: params.tier_name,
    content_type: 'pricing_tier',
    value: params.price,
    currency: params.currency || 'IDR',
    action: params.action,
    session_id: session.session_id,
    referrer_source: referrerSource,
  };

  if (params.action === 'click' || params.action === 'select') {
    addEventToJourney(`PricingSelect:${params.tier_name}`);

    // Track as AddToCart when they click a tier
    trackAddToCart({
      content_name: `Plan: ${params.tier_name}`,
      content_id: params.tier_name.toLowerCase(),
      content_type: 'subscription',
      value: params.price,
      currency: params.currency || 'IDR',
      destination: 'pricing_select',
      destination_url: window.location.href,
    });
  }

  // GA4
  trackGAEvent('select_pricing', {
    tier: params.tier_name,
    price: params.price,
    action: params.action,
    traffic_source: referrerSource,
  });

  console.log('[Tracking] Pricing Select:', eventData);
}

// ============================================
// SCROLL DEPTH TRACKING
// ============================================

let scrollMilestones: number[] = [];

/**
 * Initialize scroll depth tracking
 * Call this in useEffect on page mount
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') return;

  scrollMilestones = [];
  const thresholds = [25, 50, 75, 90, 100];

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !scrollMilestones.includes(threshold)) {
        scrollMilestones.push(threshold);
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
}

function trackScrollDepth(percent: number) {
  const session = getUserSession();
  const pageName = window.location.pathname;

  addEventToJourney(`Scroll:${percent}%`);

  // GA4
  trackGAEvent('scroll_depth', {
    percent: percent,
    page: pageName,
    session_id: session.session_id,
  });

  // Meta custom event (only at key milestones)
  if (percent >= 75) {
    trackMetaCustomEvent('HighEngagement', {
      scroll_depth: percent,
      page: pageName,
    });
  }

  console.log(`[Tracking] Scroll Depth: ${percent}%`);
}

// ============================================
// TIME ON PAGE TRACKING
// ============================================

let pageLoadTime: number = 0;
let timeTrackingInterval: NodeJS.Timeout | null = null;

/**
 * Initialize time on page tracking
 */
export function initTimeTracking() {
  if (typeof window === 'undefined') return;

  pageLoadTime = Date.now();
  const milestones = [30, 60, 120, 300]; // seconds
  let trackedMilestones: number[] = [];

  timeTrackingInterval = setInterval(() => {
    const secondsOnPage = Math.floor((Date.now() - pageLoadTime) / 1000);
    
    milestones.forEach(milestone => {
      if (secondsOnPage >= milestone && !trackedMilestones.includes(milestone)) {
        trackedMilestones.push(milestone);
        trackTimeOnPage(milestone);
      }
    });
  }, 5000);

  // Track on page unload
  const handleUnload = () => {
    const totalSeconds = Math.floor((Date.now() - pageLoadTime) / 1000);
    trackTimeOnPage(totalSeconds, true);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    if (timeTrackingInterval) clearInterval(timeTrackingInterval);
    window.removeEventListener('beforeunload', handleUnload);
  };
}

function trackTimeOnPage(seconds: number, isFinal = false) {
  const session = getUserSession();
  const pageName = window.location.pathname;

  // GA4
  trackGAEvent('time_on_page', {
    seconds: seconds,
    page: pageName,
    is_final: isFinal,
    session_id: session.session_id,
  });

  // High engagement (2+ minutes)
  if (seconds >= 120 && !isFinal) {
    trackMetaCustomEvent('HighEngagement', {
      engagement_type: 'time',
      seconds: seconds,
      page: pageName,
    });
    addEventToJourney(`TimeEngaged:${seconds}s`);
  }

  console.log(`[Tracking] Time on Page: ${seconds}s${isFinal ? ' (final)' : ''}`);
}

// ============================================
// VIDEO TRACKING
// ============================================

/**
 * Track video play events
 */
export function trackVideoPlay(params: {
  video_title: string;
  video_id?: string;
  video_duration?: number;
  video_position?: number;  // percentage
}) {
  const session = getUserSession();

  addEventToJourney(`VideoPlay:${params.video_title}`);

  // GA4
  trackGAEvent('video_start', {
    video_title: params.video_title,
    video_id: params.video_id,
  });

  // Meta
  trackMetaCustomEvent('VideoPlay', {
    content_name: params.video_title,
    content_id: params.video_id,
  });

  // TikTok
  trackTikTokEvent('ViewContent', {
    content_type: 'video',
    content_name: params.video_title,
  });

  console.log('[Tracking] Video Play:', params);
}

/**
 * Track video completion
 */
export function trackVideoComplete(params: {
  video_title: string;
  video_id?: string;
  watch_time_seconds: number;
}) {
  const session = getUserSession();

  addEventToJourney(`VideoComplete:${params.video_title}`);

  // GA4
  trackGAEvent('video_complete', {
    video_title: params.video_title,
    video_id: params.video_id,
    watch_time: params.watch_time_seconds,
  });

  // Meta - high intent signal
  trackMetaEvent('Lead', {
    content_name: `Video Completed: ${params.video_title}`,
    content_category: 'video_engagement',
  });

  console.log('[Tracking] Video Complete:', params);
}

// ============================================
// FORM TRACKING
// ============================================

/**
 * Track form interactions
 */
export function trackFormStart(formName: string) {
  const session = getUserSession();

  addEventToJourney(`FormStart:${formName}`);

  trackGAEvent('form_start', {
    form_name: formName,
    session_id: session.session_id,
  });

  console.log('[Tracking] Form Start:', formName);
}

export function trackFormSubmit(params: {
  form_name: string;
  form_type: 'contact' | 'signup' | 'inquiry' | 'order' | 'other';
  email?: string;  // Will be hashed
  phone?: string;  // Will be hashed
  value?: number;
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  addEventToJourney(`FormSubmit:${params.form_name}`);

  // GA4
  trackGAEvent('form_submit', {
    form_name: params.form_name,
    form_type: params.form_type,
    traffic_source: referrerSource,
  });

  // Meta - Lead event
  trackMetaEvent('Lead', {
    content_name: params.form_name,
    content_category: params.form_type,
    value: params.value,
    currency: 'IDR',
  });

  sendMetaCAPI('Lead', {
    content_name: params.form_name,
    content_category: params.form_type,
    // Note: email/phone should be hashed on server-side for CAPI
  });

  // TikTok
  trackTikTokEvent('SubmitForm', {
    content_name: params.form_name,
    content_type: params.form_type,
  });

  sendTikTokCAPI('SubmitForm', {
    content_name: params.form_name,
  });

  console.log('[Tracking] Form Submit:', params);
}

// ============================================
// SOCIAL SHARE TRACKING
// ============================================

export function trackSocialShare(params: {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'copy_link' | 'other';
  content_name: string;
  content_url?: string;
}) {
  const session = getUserSession();

  addEventToJourney(`Share:${params.platform}`);

  // GA4
  trackGAEvent('share', {
    method: params.platform,
    content_type: 'page',
    content_id: params.content_name,
  });

  // Meta
  trackMetaCustomEvent('Share', {
    platform: params.platform,
    content_name: params.content_name,
  });

  console.log('[Tracking] Social Share:', params);
}

// ============================================
// DOWNLOAD TRACKING
// ============================================

export function trackDownload(params: {
  file_name: string;
  file_type: string;      // e.g., "pdf", "video", "image"
  file_category?: string; // e.g., "ebook", "guide", "template"
}) {
  const session = getUserSession();
  const referrerSource = getReferrerSource(session.first_touch.referrer);

  addEventToJourney(`Download:${params.file_name}`);

  // GA4
  trackGAEvent('file_download', {
    file_name: params.file_name,
    file_extension: params.file_type,
    file_category: params.file_category,
    traffic_source: referrerSource,
  });

  // Meta - Lead for lead magnet downloads
  if (params.file_category === 'ebook' || params.file_category === 'guide') {
    trackMetaEvent('Lead', {
      content_name: params.file_name,
      content_category: 'download',
    });
  }

  console.log('[Tracking] Download:', params);
}

// ============================================
// SEARCH TRACKING
// ============================================

export function trackSearch(params: {
  search_term: string;
  results_count?: number;
  search_type?: 'product' | 'content' | 'global';
}) {
  const session = getUserSession();

  addEventToJourney(`Search:${params.search_term}`);

  // GA4
  trackGAEvent('search', {
    search_term: params.search_term,
    results_count: params.results_count,
  });

  // Meta
  trackMetaEvent('Search', {
    search_string: params.search_term,
    content_type: params.search_type,
  });

  // TikTok
  trackTikTokEvent('Search', {
    query: params.search_term,
  });

  console.log('[Tracking] Search:', params);
}

// ============================================
// ERROR TRACKING
// ============================================

export function trackError(params: {
  error_type: 'page_not_found' | 'api_error' | 'payment_failed' | 'form_error' | 'other';
  error_message: string;
  error_page?: string;
}) {
  const session = getUserSession();

  addEventToJourney(`Error:${params.error_type}`);

  // GA4
  trackGAEvent('error', {
    error_type: params.error_type,
    error_message: params.error_message,
    page: params.error_page || window.location.pathname,
    session_id: session.session_id,
  });

  console.log('[Tracking] Error:', params);
}

// ============================================
// ENGAGEMENT SCORE — Calculate user engagement
// ============================================

export function calculateEngagementScore(): number {
  const session = getUserSession();
  let score = 0;

  // Page views (max 20 points)
  score += Math.min(session.page_views * 2, 20);

  // Events (max 40 points)
  const eventTypes = new Set(session.events.map(e => e.split(':')[0]));
  
  if (eventTypes.has('AddToCart')) score += 15;
  if (eventTypes.has('InitiateCheckout')) score += 10;
  if (eventTypes.has('WhatsApp')) score += 10;
  if (eventTypes.has('FormSubmit')) score += 10;
  if (eventTypes.has('VideoComplete')) score += 5;
  if (eventTypes.has('Scroll')) score += 5;
  if (eventTypes.has('TimeEngaged')) score += 5;
  if (eventTypes.has('PricingSelect')) score += 10;
  if (eventTypes.has('Download')) score += 5;

  // Time since first touch (recency bonus, max 20 points)
  const hoursSinceFirst = (Date.now() - session.first_touch.timestamp) / (1000 * 60 * 60);
  if (hoursSinceFirst < 1) score += 20;
  else if (hoursSinceFirst < 24) score += 15;
  else if (hoursSinceFirst < 72) score += 10;
  else if (hoursSinceFirst < 168) score += 5;

  return Math.min(score, 100);
}

/**
 * Get engagement tier based on score
 */
export function getEngagementTier(): 'cold' | 'warm' | 'hot' | 'burning' {
  const score = calculateEngagementScore();
  if (score >= 80) return 'burning';
  if (score >= 50) return 'hot';
  if (score >= 25) return 'warm';
  return 'cold';
}
