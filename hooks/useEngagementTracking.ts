'use client';

import { useEffect } from 'react';
import { initScrollTracking, initTimeTracking, trackProductView } from '@/lib/tracking';

/**
 * Hook to initialize engagement tracking (scroll depth + time on page)
 * 
 * Usage:
 * function MyPage() {
 *   useEngagementTracking('Product Page', '149000', 'ai-video-studio');
 *   return <div>...</div>;
 * }
 */
export function useEngagementTracking(
  productName?: string,
  price?: string,
  productId?: string
) {
  useEffect(() => {
    // Track product view if provided
    if (productName) {
      trackProductView(productName, price, productId);
    }

    // Initialize scroll tracking
    const cleanupScroll = initScrollTracking();

    // Initialize time tracking
    const cleanupTime = initTimeTracking();

    // Cleanup on unmount
    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupTime) cleanupTime();
    };
  }, [productName, price, productId]);
}

export default useEngagementTracking;
