/**
 * AI Video Studio - Main Landing Page Router
 * Routes to LP1-LP6 based on query param
 * Accessible via: /id/ai-video-studio?lp=1 or /id/ai-video-studio/lp1 (via middleware)
 */

import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

type Locale = 'id' | 'en';

// Dynamically import LP components
const LP1 = dynamic(() => import('@/components/landing/LP1'));
const LP2 = dynamic(() => import('@/components/landing/LP2'));
const LP3 = dynamic(() => import('@/components/landing/LP3'));
const LP4 = dynamic(() => import('@/components/landing/LP4'));
const LP5 = dynamic(() => import('@/components/landing/LP5'));
const LP6 = dynamic(() => import('@/components/landing/LP6'));

const LP_MAP = { 1: LP1, 2: LP2, 3: LP3, 4: LP4, 5: LP5, 6: LP6 } as const;

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

export default function AIVideoStudio({ locale }: Props) {
  // For now, default to LP1. In a full implementation, 
  // use router.query.lp to determine which LP to show
  const CurrentLP = LP1;

  return <CurrentLP locale={locale} />;
}
