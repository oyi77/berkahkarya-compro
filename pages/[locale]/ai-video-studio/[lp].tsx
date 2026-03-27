/**
 * AI Video Studio - Dynamic LP Routes
 * Handles: /id/ai-video-studio/lp1, /id/ai-video-studio/lp2, etc.
 */

import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

type Locale = 'id' | 'en';

// Dynamically import LP components
const LP1 = dynamic(() => import('@/components/landing/LP1'));
const LP2 = dynamic(() => import('@/components/landing/LP2'));
const LP3 = dynamic(() => import('@/components/landing/LP3'));
const LP4 = dynamic(() => import('@/components/landing/LP4'));
const LP5 = dynamic(() => import('@/components/landing/LP5'));
const LP6 = dynamic(() => import('@/components/landing/LP6'));

const LP_MAP = { 
  lp1: LP1, 
  lp2: LP2, 
  lp3: LP3, 
  lp4: LP4, 
  lp5: LP5, 
  lp6: LP6,
} as const;

const LP_NAMES = {
  lp1: 'Konten Ini Bikin Laku',
  lp2: 'Serius Sesimpel Ini?',
  lp3: 'Masih Edit Manual?',
  lp4: 'Tinggal Upload Doang',
  lp5: 'Ini Cara Baru',
  lp6: 'Hasil Nyata Seller',
} as const;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { locale: 'id', lp: 'lp1' } },
    { params: { locale: 'id', lp: 'lp2' } },
    { params: { locale: 'id', lp: 'lp3' } },
    { params: { locale: 'id', lp: 'lp4' } },
    { params: { locale: 'id', lp: 'lp5' } },
    { params: { locale: 'id', lp: 'lp6' } },
    { params: { locale: 'en', lp: 'lp1' } },
    { params: { locale: 'en', lp: 'lp2' } },
    { params: { locale: 'en', lp: 'lp3' } },
    { params: { locale: 'en', lp: 'lp4' } },
    { params: { locale: 'en', lp: 'lp5' } },
    { params: { locale: 'en', lp: 'lp6' } },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    locale: (params?.locale as Locale) || 'id',
    lp: params?.lp as string,
  },
  revalidate: 3600, // ISR
});

type Props = {
  locale: Locale;
  lp: string;
};

export default function LandingPageRouter({ locale, lp }: Props) {
  const router = useRouter();
  
  // Get component based on lp param
  const lpKey = lp as keyof typeof LP_MAP;
  const CurrentLP = LP_MAP[lpKey] || LP1;
  const lpVariant = parseInt(lpKey.replace('lp', '')) || 1;

  // Event tracking
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = {
        timestamp: new Date().toISOString(),
        event: 'lpViewed',
        lpVariant,
        lpName: LP_NAMES[lpKey as keyof typeof LP_NAMES],
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
  }, [lpVariant, locale, router.asPath, lpKey]);

  return <CurrentLP locale={locale} />;
}
