/**
 * A/B Test Status API
 * 
 * Returns current A/B test configuration and analytics summary
 * Accessible via: /api/ab-test-status
 */

import { NextApiRequest, NextApiResponse } from 'next';

interface ABTestConfig {
  testName: string;
  startDate: string;
  variants: Array<{
    id: number;
    name: string;
    description: string;
    url: string;
  }>;
  primaryMetric: string;
  successCriteria: string;
}

const AB_TEST_CONFIG: ABTestConfig = {
  testName: 'AI Video Studio Landing Page A/B Test',
  startDate: '2026-03-27',
  variants: [
    {
      id: 1,
      name: 'LP1: Konten Ini Bikin Laku',
      description: 'Focus on content creation value prop',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=1',
    },
    {
      id: 2,
      name: 'LP2: Serius Sesimpel Ini?',
      description: 'Emphasize ease of use / simplicity',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=2',
    },
    {
      id: 3,
      name: 'LP3: Masih Edit Manual?',
      description: 'Pain point: manual editing → automation solution',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=3',
    },
    {
      id: 4,
      name: 'LP4: Tinggal Upload Doang',
      description: 'Ultra-simple UX: upload → done',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=4',
    },
    {
      id: 5,
      name: 'LP5: Ini Cara Baru',
      description: 'Novelty / innovation angle',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=5',
    },
    {
      id: 6,
      name: 'LP6: Hasil Nyata Seller',
      description: 'Social proof / results-driven messaging',
      url: 'https://berkahkarya.org/id/ai-video-studio?lp=6',
    },
  ],
  primaryMetric: 'Click-through rate (CTR) to saas.aitradepulse.com',
  successCriteria: 'Variant with highest CTR wins (min 100 clicks to declare)',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(200).json({
    success: true,
    ...AB_TEST_CONFIG,
    trackingMethod: 'Client-side localStorage + API events',
    analyticsProviders: [
      {
        name: 'LocalStorage (Dev)',
        status: 'ACTIVE',
        storage: 'window.localStorage[berkahkarya_events]',
      },
      {
        name: 'API Endpoint',
        status: 'READY',
        endpoint: '/api/analytics',
      },
      {
        name: 'UTM Params',
        status: 'ACTIVE',
        format: 'utm_source=berkahkarya.org&utm_medium=landing_page&utm_campaign=lp{N}_aiVideoStudio',
      },
    ],
    nextSteps: [
      '1. Send traffic to variants (equal split or directional)',
      '2. Monitor CTR per variant (via localStorage console or API logs)',
      '3. After 100+ clicks per variant, declare winner',
      '4. Scale winning variant to 100% traffic',
    ],
  });
}
