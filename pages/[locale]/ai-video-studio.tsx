/**
 * AI Video Studio - Multi-LP Query Param Router
 * Routes based on ?lp=1|2|3|4|5|6
 * Default: LP1
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

type Locale = 'id' | 'en';

// Dynamic imports
const LP1 = dynamic(() => import('@/components/landing/LP1'));
const LP2 = dynamic(() => import('@/components/landing/LP2'));
const LP3 = dynamic(() => import('@/components/landing/LP3'));
const LP4 = dynamic(() => import('@/components/landing/LP4'));
const LP5 = dynamic(() => import('@/components/landing/LP5'));
const LP6 = dynamic(() => import('@/components/landing/LP6'));

const LP_MAP = {
  '1': LP1,
  '2': LP2,
  '3': LP3,
  '4': LP4,
  '5': LP5,
  '6': LP6,
} as const;

export default function AIVideoStudio() {
  const router = useRouter();
  const [lpVariant, setLpVariant] = useState<string>('1');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    // Get locale from router params
    const locale = router.query.locale as string || 'id';
    
    // Get LP variant from query param
    const lpParam = router.query.lp as string || '1';
    const variant = (lpParam && ['1', '2', '3', '4', '5', '6'].includes(lpParam)) ? lpParam : '1';
    
    setLpVariant(variant);
    setIsReady(true);

    // Track event
    if (typeof window !== 'undefined') {
      const event = {
        timestamp: new Date().toISOString(),
        event: 'lpViewed',
        lpVariant: parseInt(variant),
        locale,
        url: router.asPath,
      };
      
      console.log('[Analytics]', event);
      
      try {
        const events = JSON.parse(window.localStorage.getItem('berkahkarya_events') || '[]');
        events.push(event);
        window.localStorage.setItem('berkahkarya_events', JSON.stringify(events.slice(-100)));
      } catch (e) {
        console.error('[Analytics] Failed to save event', e);
      }
    }
  }, [router.isReady, router.query, router.asPath]);

  if (!isReady) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  // Get locale
  const locale = (router.query.locale as Locale) || 'id';

  // Get component based on variant
  const CurrentLP = LP_MAP[lpVariant as keyof typeof LP_MAP] || LP1;

  return <CurrentLP locale={locale} />;
}
