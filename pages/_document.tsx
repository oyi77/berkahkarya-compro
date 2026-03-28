import { Html, Head, Main, NextScript } from 'next/document';
import { TRACKING } from '@/lib/tracking';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MXPQQRT');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* UTM Parameter & Attribution Capture (Full Funnel Tracking) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Helper: Get cookie value
                function getCookie(name) {
                  const value = \`; \${document.cookie}\`;
                  const parts = value.split(\`; \${name}=\`);
                  if (parts.length === 2) return parts.pop().split(';').shift();
                  return '';
                }
                
                // Helper: Set cookie
                function setCookie(name, value, days = 7) {
                  const date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  const expires = \`expires=\${date.toUTCString()}\`;
                  document.cookie = \`\${name}=\${value};\${expires};path=/\`;
                }
                
                // Capture UTM parameters on page load
                const params = new URLSearchParams(window.location.search);
                const utmSource = params.get('utm_source') || 'berkahkarya.org';
                const utmMedium = params.get('utm_medium') || 'organic';
                const utmCampaign = params.get('utm_campaign') || '';
                const utmContent = params.get('utm_content') || '';
                const lpVariant = params.get('lpVariant') || params.get('lp') || 'default';
                
                // Meta & TikTok attribution IDs
                const fbc = params.get('fbc') || getCookie('_fbc');
                const fbp = params.get('fbp') || getCookie('_fbp');
                const ttclid = params.get('ttclid') || getCookie('_tt_enable_cookie');
                
                // Store in sessionStorage (survives navigation within same domain)
                sessionStorage.setItem('utm_source', utmSource);
                sessionStorage.setItem('utm_medium', utmMedium);
                sessionStorage.setItem('utm_campaign', utmCampaign);
                sessionStorage.setItem('utm_content', utmContent);
                sessionStorage.setItem('lp_variant', lpVariant);
                sessionStorage.setItem('fbc', fbc);
                sessionStorage.setItem('fbp', fbp);
                sessionStorage.setItem('ttclid', ttclid);
                
                // Also set first-party cookies (7 days)
                setCookie('_utm_source', utmSource, 7);
                setCookie('_utm_campaign', utmCampaign, 7);
                setCookie('_lp_variant', lpVariant, 7);
                
                // Log for debugging
                console.log('UTM Tracking Captured:', {
                  utm_source: utmSource,
                  utm_campaign: utmCampaign,
                  lp_variant: lpVariant,
                  has_fbc: !!fbc,
                  has_fbp: !!fbp,
                  has_ttclid: !!ttclid
                });
              })();
            `,
          }}
        />

        {/* Pinterest Domain Verification */}
        <meta name="p:domain_verify" content={TRACKING.PINTEREST_VERIFICATION} />

        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${TRACKING.GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Meta (Facebook) Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${TRACKING.META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${TRACKING.META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* TikTok Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${TRACKING.TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />

        {/* Pinterest Tag (optional - for conversion tracking) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', 'YOUR_PINTEREST_TAG_ID', {em: '<user_email_address>'});
              pintrk('page');
            `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MXPQQRT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
