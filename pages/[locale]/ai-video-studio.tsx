/**
 * AI Video Studio - Multi-LP Query Param Router (Server-Side Rendered)
 * Routes based on ?lp=1|2|3|4|5|6
 * Default: LP1
 */

import React from 'react';
import { GetServerSideProps } from 'next';

// Static imports (no dynamic/lazy loading)
import LP1 from '@/components/landing/LP1';
import LP2 from '@/components/landing/LP2';
import LP3 from '@/components/landing/LP3';
import LP4 from '@/components/landing/LP4';
import LP5 from '@/components/landing/LP5';
import LP6 from '@/components/landing/LP6';

type Locale = 'id' | 'en';

const LP_MAP = {
  '1': LP1,
  '2': LP2,
  '3': LP3,
  '4': LP4,
  '5': LP5,
  '6': LP6,
} as const;

type Props = {
  locale: Locale;
  lpVariant: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, query }) => {
  const locale = (params?.locale as Locale) || 'id';
  const lpParam = query.lp as string || '1';
  const lpVariant = (lpParam && ['1', '2', '3', '4', '5', '6'].includes(lpParam)) ? lpParam : '1';

  console.log('[AI Video Studio] Query:', { lpParam, lpVariant, locale });

  return {
    props: {
      locale,
      lpVariant,
    },
  };
};

export default function AIVideoStudio({ locale, lpVariant }: Props) {
  // Get component based on variant
  const CurrentLP = LP_MAP[lpVariant as keyof typeof LP_MAP] || LP1;

  return <CurrentLP locale={locale} />;
}
