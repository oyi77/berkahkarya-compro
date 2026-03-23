import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { TRACKING } from '@/lib/tracking';
import { trackViewContent, trackMetaEvent, trackGAEvent } from '@/lib/tracking';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // GA4 page_view on route change
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', TRACKING.GA_ID, { page_path: url });
      }

      // Meta Pixel PageView on route change
      if (typeof window !== 'undefined' && window.fbq && TRACKING.META_PIXEL_ID) {
        window.fbq('track', 'PageView');
      }

      // TikTok Pixel — page view on route change
      if (typeof window !== 'undefined' && window.ttq && TRACKING.TIKTOK_PIXEL_ID) {
        window.ttq.page();
      }

      // Track ViewContent with page info
      const pageName = url.split('/').pop() || 'home';
      const pageType = url.includes('/id/') || url.includes('/en/') ? 'page' : 'home';
      trackViewContent(pageName, pageType);
    };

    // Track initial page load
    handleRouteChange(router.asPath);

    // Track subsequent route changes
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
