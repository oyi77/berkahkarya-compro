/**
 * AI Video Studio - Multi-LP A/B Testing Router
 * Routes to LP1-LP6 based on query param: ?lp=1|2|3|4|5|6
 * Default: LP1
 * 
 * Usage:
 * - https://berkahkarya.org/id/ai-video-studio (→ LP1)
 * - https://berkahkarya.org/id/ai-video-studio?lp=2 (→ LP2)
 * - https://berkahkarya.org/en/ai-video-studio?lp=3 (→ LP3 English)
 * 
 * Analytics:
 * - Tracks LP variant viewed (lpViewed)
 * - Tracks CTA clicks (ctaClicked)
 * - Tracks time spent (timeSpent)
 * - Automatic UTM param forwarding to saas.aitradepulse.com
 */

import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

type Locale = 'id' | 'en';

// Dynamically import LP components
const LP1 = dynamic(() => import('@/components/landing/LP1'));
const LP2 = dynamic(() => import('@/components/landing/LP2'));
const LP3 = dynamic(() => import('@/components/landing/LP3'));
const LP4 = dynamic(() => import('@/components/landing/LP4'));
const LP5 = dynamic(() => import('@/components/landing/LP5'));
const LP6 = dynamic(() => import('@/components/landing/LP6'));

const LP_MAP = { 
  1: LP1, 2: LP2, 3: LP3, 4: LP4, 5: LP5, 6: LP6 
} as const;

const LP_NAMES = {
  1: 'Konten Ini Bikin Laku',
  2: 'Serius Sesimpel Ini?',
  3: 'Masih Edit Manual?',
  4: 'Tinggal Upload Doang',
  5: 'Ini Cara Baru',
  6: 'Hasil Nyata Seller',
} as const;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { locale: 'id' } },
    { params: { locale: 'en' } },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
  revalidate: 3600, // ISR: revalidate every hour
});

type Props = {
  locale: Locale;
};

/**
 * Analytics helper - logs events to Segment/Posthog + browser console
 */
function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  const eventData = {
    timestamp: new Date().toISOString(),
    event: eventName,
    ...properties,
  };

  // Log to console for debugging
  console.log('[Analytics]', eventData);

  // Send to analytics service (future: Segment, Posthog, GA4)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const events = JSON.parse(window.localStorage.getItem('berkahkarya_events') || '[]');
      events.push(eventData);
      window.localStorage.setItem('berkahkarya_events', JSON.stringify(events.slice(-100))); // Keep last 100
    } catch (e) {
      console.error('[Analytics] Failed to save event', e);
    }
  }

  // Future: Send to external analytics endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) })
}

/**
 * Build CTA URL with UTM params + test variant tracking
 */
function buildCtaUrl(lpVariant: number): string {
  const baseUrl = 'https://saas.aitradepulse.com/';
  const params = new URLSearchParams({
    utm_source: 'berkahkarya.org',
    utm_medium: 'landing_page',
    utm_campaign: `lp${lpVariant}_aiVideoStudio`,
    utm_content: `lp${lpVariant}_${LP_NAMES[lpVariant as keyof typeof LP_NAMES] || 'default'}`,
    lpVariant: String(lpVariant),
  });
  return `${baseUrl}?${params.toString()}`;
}

export default function AIVideoStudio({ locale }: Props) {
  const router = useRouter();
  const [lpVariant, setLpVariant] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isReady, setIsReady] = useState(false);
  const timeStartRef = useRef<number>(Date.now());

  // Handle client-side routing & analytics
  useEffect(() => {
    if (!router.isReady) return;

    // Parse LP variant from query param (default 1)
    const lpParam = router.query.lp as string | undefined;
    const variant = (lpParam && parseInt(lpParam) >= 1 && parseInt(lpParam) <= 6 
      ? parseInt(lpParam) 
      : 1) as 1 | 2 | 3 | 4 | 5 | 6;

    setLpVariant(variant);
    setIsReady(true);

    // Track page view
    trackEvent('lpViewed', {
      lpVariant: variant,
      lpName: LP_NAMES[variant],
      locale,
      url: router.asPath,
    });

    // Log time spent on page when leaving
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - timeStartRef.current) / 1000; // seconds
      trackEvent('lpTimeSpent', {
        lpVariant: variant,
        timeSpent: Math.round(timeSpent),
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router.isReady, router.query, locale]);

  // Get current LP component
  const CurrentLP = LP_MAP[lpVariant] || LP1;

  // Inject CTA URL builder as prop to LP component
  const enhancedProps = {
    locale,
    ctaUrl: buildCtaUrl(lpVariant),
    lpVariant,
    onCtaClick: () => {
      trackEvent('ctaClicked', {
        lpVariant,
        lpName: LP_NAMES[lpVariant],
        destination: buildCtaUrl(lpVariant),
      });
    },
  };

  if (!isReady) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
      </div>
    </div>;
  }

  return <CurrentLP {...enhancedProps} />;
}
