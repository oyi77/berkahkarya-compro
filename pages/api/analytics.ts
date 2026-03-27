/**
 * Analytics API Endpoint
 * 
 * Receives analytics events from frontend and logs them
 * Future: Send to Segment, Posthog, Google Analytics, or custom data warehouse
 */

import { NextApiRequest, NextApiResponse } from 'next';

interface AnalyticsEvent {
  timestamp: string;
  event: string;
  lpVariant?: number;
  locale?: string;
  url?: string;
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event: AnalyticsEvent = req.body;

    // Validate event
    if (!event.event || !event.timestamp) {
      return res.status(400).json({ error: 'Missing required fields: event, timestamp' });
    }

    // Log event
    console.log('[Analytics] Event received', {
      event: event.event,
      lpVariant: event.lpVariant,
      locale: event.locale,
    });

    // TODO: Send to external analytics service
    // - Segment: segment.track(...)
    // - Posthog: posthog.track(...)
    // - Google Analytics: gtag('event', ...)
    // - Custom: POST to data warehouse

    // For now, just acknowledge receipt
    res.status(200).json({
      success: true,
      message: 'Event logged',
      event: event.event,
    });
  } catch (error) {
    console.error('[Analytics] Error processing event', error);
    res.status(500).json({ error: 'Failed to process analytics event' });
  }
}
