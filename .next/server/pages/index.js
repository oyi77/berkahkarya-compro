(()=>{var t={};t.id=5405,t.ids=[5405,2888,660],t.modules={1323:(t,e)=>{"use strict";Object.defineProperty(e,"l",{enumerable:!0,get:function(){return function t(e,n){return n in e?e[n]:"then"in e&&"function"==typeof e.then?e.then(e=>t(e,n)):"function"==typeof e&&"default"===n?e:void 0}}})},5810:(t,e,n)=>{"use strict";n.r(e),n.d(e,{config:()=>f,default:()=>d,getServerSideProps:()=>g,getStaticPaths:()=>p,getStaticProps:()=>m,reportWebVitals:()=>_,routeModule:()=>v,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>S,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>w,unstable_getStaticProps:()=>h});var s={};n.r(s),n.d(s,{default:()=>l,getServerSideProps:()=>u});var a=n(7093),r=n(5244),i=n(1323),o=n(7645),c=n(6814);let u=async()=>({redirect:{destination:"/id",permanent:!1}});function l(){return null}let d=(0,i.l)(s,"default"),m=(0,i.l)(s,"getStaticProps"),p=(0,i.l)(s,"getStaticPaths"),g=(0,i.l)(s,"getServerSideProps"),f=(0,i.l)(s,"config"),_=(0,i.l)(s,"reportWebVitals"),h=(0,i.l)(s,"unstable_getStaticProps"),w=(0,i.l)(s,"unstable_getStaticPaths"),b=(0,i.l)(s,"unstable_getStaticParams"),y=(0,i.l)(s,"unstable_getServerProps"),S=(0,i.l)(s,"unstable_getServerSideProps"),v=new a.PagesRouteModule({definition:{kind:r.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:c.default,Document:o.default},userland:s})},6814:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>r});var s=n(997);n(6689);var a=n(1163);function r({Component:t,pageProps:e}){return(0,a.useRouter)(),s.jsx(t,{...e})}n(6764),n(1393)},7645:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>i});var s=n(997),a=n(6859),r=n(1393);function i(){return(0,s.jsxs)(a.Html,{lang:"id",children:[(0,s.jsxs)(a.Head,{children:[s.jsx("script",{dangerouslySetInnerHTML:{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MXPQQRT');`}}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWWH8B3T');`}}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
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
            `}}),s.jsx("meta",{name:"p:domain_verify",content:r.g9.PINTEREST_VERIFICATION}),s.jsx("script",{async:!0,src:`https://www.googletagmanager.com/gtag/js?id=${r.g9.GA_ID}`}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${r.g9.GA_ID}', {
                page_path: window.location.pathname,
              });
            `}}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${r.g9.META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}}),s.jsx("noscript",{children:s.jsx("img",{height:"1",width:"1",style:{display:"none"},src:`https://www.facebook.com/tr?id=${r.g9.META_PIXEL_ID}&ev=PageView&noscript=1`,alt:""})}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${r.g9.TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `}}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', 'YOUR_PINTEREST_TAG_ID', {em: '<user_email_address>'});
              pintrk('page');
            `}})]}),(0,s.jsxs)("body",{children:[s.jsx("noscript",{children:s.jsx("iframe",{src:"https://www.googletagmanager.com/ns.html?id=GTM-5MXPQQRT",height:"0",width:"0",style:{display:"none",visibility:"hidden"}})}),s.jsx("noscript",{children:s.jsx("iframe",{src:"https://www.googletagmanager.com/ns.html?id=GTM-TWWH8B3T",height:"0",width:"0",style:{display:"none",visibility:"hidden"}})}),s.jsx(a.Main,{}),s.jsx(a.NextScript,{})]})]})}},6764:()=>{},5244:(t,e)=>{"use strict";var n;Object.defineProperty(e,"x",{enumerable:!0,get:function(){return n}}),function(t){t.PAGES="PAGES",t.PAGES_API="PAGES_API",t.APP_PAGE="APP_PAGE",t.APP_ROUTE="APP_ROUTE"}(n||(n={}))},2785:t=>{"use strict";t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:t=>{"use strict";t.exports=require("react")},6405:t=>{"use strict";t.exports=require("react-dom")},997:t=>{"use strict";t.exports=require("react/jsx-runtime")},2048:t=>{"use strict";t.exports=require("fs")},5315:t=>{"use strict";t.exports=require("path")},6162:t=>{"use strict";t.exports=require("stream")},1568:t=>{"use strict";t.exports=require("zlib")}};var e=require("../webpack-runtime.js");e.C(t);var n=t=>e(e.s=t),s=e.X(0,[4567,1163,2198,1393],()=>n(5810));module.exports=s})();