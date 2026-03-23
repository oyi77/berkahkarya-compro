// ============================================
// TRACKING CONFIGURATION — EDIT IDS HERE
// ============================================

export const TRACKING = {
  // Google Analytics 4
  GA_ID: 'G-V9C14XZ9SG',

  // Meta (Facebook) Pixel — FILL IN YOUR PIXEL ID
  META_PIXEL_ID: '',  // e.g., '123456789012345'

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

/** Track CTA click across all pixels */
export function trackCTAClick(ctaName: string, destination: string) {
  // GA4
  trackGAEvent('cta_click', {
    cta_name: ctaName,
    destination: destination,
  });

  // Meta Pixel — Lead event for CTA clicks
  trackMetaEvent('Lead', {
    content_name: ctaName,
    content_category: 'CTA',
  });
}

/** Track page-level content view */
export function trackViewContent(pageName: string, pageType: string) {
  // GA4
  trackGAEvent('view_content', {
    page_name: pageName,
    page_type: pageType,
  });

  // Meta Pixel
  trackMetaEvent('ViewContent', {
    content_name: pageName,
    content_type: pageType,
  });
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
}
