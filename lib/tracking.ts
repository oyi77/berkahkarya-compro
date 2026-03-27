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
