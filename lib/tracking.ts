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
// META PIXEL HELPERS
// ============================================

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
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

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/** Track GA4 event */
export function trackGAEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
}

// ============================================
// UNIFIED CTA TRACKER
// ============================================

/** Track CTA click across ALL pixels + CAPI */
export function trackCTAClick(ctaName: string, destination: string) {
  // GA4
  trackGAEvent('cta_click', {
    cta_name: ctaName,
    destination: destination,
  });

  // Meta Pixel — Lead event
  trackMetaEvent('Lead', {
    content_name: ctaName,
    content_category: 'CTA',
  });

  // Meta CAPI — server-side
  sendMetaCAPI('Lead', {
    content_name: ctaName,
    content_category: 'CTA',
  });

  // TikTok Pixel (browser)
  trackTikTokEvent('ClickButton', {
    content_name: ctaName,
    content_type: 'cta',
  });

  // TikTok Events API (server-side)
  sendTikTokCAPI('ClickButton', { content_name: ctaName });
}

// ============================================
// TIKTOK PIXEL HELPERS
// ============================================

declare global {
  interface Window {
    ttq: {
      track: (event: string, data?: Record<string, unknown>) => void;
      page: () => void;
      identify: (data: Record<string, unknown>) => void;
    };
  }
}

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
// TIKTOK EVENTS API (SERVER-SIDE)
// ============================================

/** Send event via TikTok Events API (server-side, bypasses ad blockers) */
export function sendTikTokCAPI(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !TRACKING.TIKTOK_PIXEL_ID) return;

  const payload = {
    event_name: eventName,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
    custom_data: data,
  };

  fetch('/api/tiktok-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

// ============================================
// META CONVERSIONS API (SERVER-SIDE)
// ============================================

/** Send event via server-side Conversions API for better accuracy */
export function sendMetaCAPI(eventName: string, customData?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !TRACKING.META_PIXEL_ID) return;

  // Get Facebook click ID and browser ID cookies
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
  };

  const payload = {
    event_name: eventName,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
    custom_data: customData,
  };

  // Fire and forget — don't block UI
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {}); // Silently fail
}

/** Track page-level content view + CAPI + TikTok */
export function trackViewContent(pageName: string, pageType: string) {
  // GA4
  trackGAEvent('view_content', {
    page_name: pageName,
    page_type: pageType,
  });

  // Meta Pixel (browser)
  trackMetaEvent('ViewContent', {
    content_name: pageName,
    content_type: pageType,
  });

  // Meta CAPI (server-side)
  sendMetaCAPI('ViewContent', {
    content_name: pageName,
    content_type: pageType,
  });

  // TikTok Pixel (browser)
  trackTikTokEvent('ViewContent', {
    content_name: pageName,
    content_type: pageType,
  });

  // TikTok Events API (server-side)
  sendTikTokCAPI('ViewContent', { content_name: pageName, content_type: pageType });
}

/** Track product page view */
export function trackProductView(productName: string, price?: string) {
  // GA4
  trackGAEvent('view_item', {
    item_name: productName,
    price: price,
  });

  // Meta Pixel
  trackMetaEvent('ViewContent', {
    content_name: productName,
    content_type: 'product',
    value: price,
    currency: 'IDR',
  });

  // TikTok Pixel
  trackTikTokEvent('ViewContent', {
    content_name: productName,
    content_type: 'product',
  });
}
