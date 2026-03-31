(()=>{var e={};e.id=4820,e.ids=[4820,2888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},6968:(e,t,n)=>{"use strict";n.r(t),n.d(t,{config:()=>m,default:()=>c,getServerSideProps:()=>p,getStaticPaths:()=>u,getStaticProps:()=>d,reportWebVitals:()=>f,routeModule:()=>w,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>b,unstable_getStaticParams:()=>_,unstable_getStaticPaths:()=>h,unstable_getStaticProps:()=>g});var r=n(7093),a=n(5244),s=n(1323),o=n(7645),i=n(6814),l=n(6971);let c=(0,s.l)(l,"default"),d=(0,s.l)(l,"getStaticProps"),u=(0,s.l)(l,"getStaticPaths"),p=(0,s.l)(l,"getServerSideProps"),m=(0,s.l)(l,"config"),f=(0,s.l)(l,"reportWebVitals"),g=(0,s.l)(l,"unstable_getStaticProps"),h=(0,s.l)(l,"unstable_getStaticPaths"),_=(0,s.l)(l,"unstable_getStaticParams"),y=(0,s.l)(l,"unstable_getServerProps"),b=(0,s.l)(l,"unstable_getServerSideProps"),w=new r.PagesRouteModule({definition:{kind:a.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:i.default,Document:o.default},userland:l})},6971:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let r=n(167),a=n(997),s=r._(n(6689)),o=r._(n(7828)),i={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function l(e){let{res:t,err:n}=e;return{statusCode:t&&t.statusCode?t.statusCode:n?n.statusCode:404}}let c={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends s.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,n=this.props.title||i[e]||"An unexpected error has occurred";return(0,a.jsxs)("div",{style:c.error,children:[(0,a.jsx)(o.default,{children:(0,a.jsx)("title",{children:e?e+": "+n:"Application error: a client-side exception has occurred"})}),(0,a.jsxs)("div",{style:c.desc,children:[(0,a.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,a.jsx)("h1",{className:"next-error-h1",style:c.h1,children:e}):null,(0,a.jsx)("div",{style:c.wrap,children:(0,a.jsxs)("h2",{style:c.h2,children:[this.props.title||e?n:(0,a.jsx)(a.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=l,d.origGetInitialProps=l,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5495:(e,t)=>{"use strict";function n(e){let{ampFirst:t=!1,hybrid:n=!1,hasQuery:r=!1}=void 0===e?{}:e;return t||n&&r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return n}})},7828:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return g},defaultHead:function(){return u}});let r=n(167),a=n(8760),s=n(997),o=a._(n(6689)),i=r._(n(7215)),l=n(8039),c=n(1988),d=n(5495);function u(e){void 0===e&&(e=!1);let t=[(0,s.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}n(1997);let m=["name","httpEquiv","charSet","itemProp"];function f(e,t){let{inAmpMode:n}=t;return e.reduce(p,[]).reverse().concat(u(n).reverse()).filter(function(){let e=new Set,t=new Set,n=new Set,r={};return a=>{let s=!0,o=!1;if(a.key&&"number"!=typeof a.key&&a.key.indexOf("$")>0){o=!0;let t=a.key.slice(a.key.indexOf("$")+1);e.has(t)?s=!1:e.add(t)}switch(a.type){case"title":case"base":t.has(a.type)?s=!1:t.add(a.type);break;case"meta":for(let e=0,t=m.length;e<t;e++){let t=m[e];if(a.props.hasOwnProperty(t)){if("charSet"===t)n.has(t)?s=!1:n.add(t);else{let e=a.props[t],n=r[t]||new Set;("name"!==t||!o)&&n.has(e)?s=!1:(n.add(e),r[t]=n)}}}}return s}}()).reverse().map((e,t)=>{let r=e.key||t;if(!n&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,o.default.cloneElement(e,t)}return o.default.cloneElement(e,{key:r})})}let g=function(e){let{children:t}=e,n=(0,o.useContext)(l.AmpStateContext),r=(0,o.useContext)(c.HeadManagerContext);return(0,s.jsx)(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:(0,d.isInAmpMode)(n),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7215:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let r=n(6689),a=()=>{},s=()=>{};function o(e){var t;let{headManager:n,reduceComponentsToState:o}=e;function i(){if(n&&n.mountedInstances){let t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(o(t,e))}}return null==n||null==(t=n.mountedInstances)||t.add(e.children),i(),a(()=>{var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),()=>{var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),a(()=>(n&&(n._pendingUpdate=i),()=>{n&&(n._pendingUpdate=i)})),s(()=>(n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),()=>{n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)})),null}},1997:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},6814:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});var r=n(997);n(6689);var a=n(1163);function s({Component:e,pageProps:t}){return(0,a.useRouter)(),r.jsx(e,{...t})}n(6764),n(1393)},7645:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var r=n(997),a=n(6859),s=n(1393);function o(){return(0,r.jsxs)(a.Html,{lang:"id",children:[(0,r.jsxs)(a.Head,{children:[r.jsx("script",{dangerouslySetInnerHTML:{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MXPQQRT');`}}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWWH8B3T');`}}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
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
            `}}),r.jsx("meta",{name:"p:domain_verify",content:s.g9.PINTEREST_VERIFICATION}),r.jsx("script",{async:!0,src:`https://www.googletagmanager.com/gtag/js?id=${s.g9.GA_ID}`}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${s.g9.GA_ID}', {
                page_path: window.location.pathname,
              });
            `}}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${s.g9.META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}}),r.jsx("noscript",{children:r.jsx("img",{height:"1",width:"1",style:{display:"none"},src:`https://www.facebook.com/tr?id=${s.g9.META_PIXEL_ID}&ev=PageView&noscript=1`,alt:""})}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${s.g9.TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `}}),r.jsx("script",{dangerouslySetInnerHTML:{__html:`
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', 'YOUR_PINTEREST_TAG_ID', {em: '<user_email_address>'});
              pintrk('page');
            `}})]}),(0,r.jsxs)("body",{children:[r.jsx("noscript",{children:r.jsx("iframe",{src:"https://www.googletagmanager.com/ns.html?id=GTM-5MXPQQRT",height:"0",width:"0",style:{display:"none",visibility:"hidden"}})}),r.jsx("noscript",{children:r.jsx("iframe",{src:"https://www.googletagmanager.com/ns.html?id=GTM-TWWH8B3T",height:"0",width:"0",style:{display:"none",visibility:"hidden"}})}),r.jsx(a.Main,{}),r.jsx(a.NextScript,{})]})]})}},6764:()=>{},5244:(e,t)=>{"use strict";var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},8039:(e,t,n)=>{"use strict";e.exports=n(7093).vendored.contexts.AmpContext},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},2048:e=>{"use strict";e.exports=require("fs")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},1568:e=>{"use strict";e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[4567,1163,2198,1393],()=>n(6968));module.exports=r})();