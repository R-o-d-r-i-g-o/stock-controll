if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>i(e,a),b={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>b[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-9d8003b8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"dda8a93f42b48fb348e742d2eb36f696"},{url:"/_next/static/O_T8wH8LFeTQzMjbWiq45/_buildManifest.js",revision:"ec26ecf59cec108082a10e881d1bfbf7"},{url:"/_next/static/O_T8wH8LFeTQzMjbWiq45/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1068-42a651df453f143f.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/1070-eba3734420f824fe.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/1208-799651b76704ad68.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/1517-110d66599bdb65ef.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/227-0c5cfdf38608c8a7.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/2651-624e42479f699fcc.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/2983-d918369fa4d95d8b.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/41ade5dc-2781a024529baf75.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/4bd1b696-edee00bd473bee82.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/6515-d3e5853c57cda9fb.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/7471-b3415f67a63f0911.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/7538-fcfe1d641745e29a.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/7853-861903f4c9395910.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/7869-0b5beec5b9d60364.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/9017-337d92f1d314b9c1.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/9907-1f10ccbc9741cde1.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/(home)/page-0b4bc249cef52afc.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/_not-found/page-cb43ddf17a49cf19.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/audits/route-5afb054b78699b22.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-12dd93b0b66aceda.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/items/%5Bitem_id%5D/route-524c2e6fac342aa1.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/items/debit/route-93d1921e5e65616e.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/items/route-4166f44a3087dc02.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/ping/route-8a1298b1a7c3e276.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/route-e4f7e6e044d1a556.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/shoes/route-31b5f91974aedbbb.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/users/%5Buser_id%5D/route-4a8cc02c2b9cca96.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/users/roles/route-399794b03a3c7638.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/api/users/route-e0879c506c14efb9.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/error-9b1fb06d65030e19.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/layout-801aa33a55c46442.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/login/page-d8389b794a614e33.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/not-found-bd23acbfb5b3f454.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/audits/page-3dd0990972ce1d7b.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/page-8d271afcb665445b.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/reports/page-0360fb7be398a211.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/%5Bitem_id%5D/page-23ce97c51c913b57.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/create/page-871b7ea4a67db080.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/sku/%5Bsku%5D/page-71cdca1da7899135.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/page-a4156ab3b3c800c4.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/create/page-9bcc3c05f566116d.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/debit/page-186f2dbd02149c3f.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/shoes/page-14e9d5913713af4f.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/template-74778726729c6d3d.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/users/%5Buser_id%5D/page-1594a7074cb64773.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/users/create/page-f605cf5153148369.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/app/panel/users/page-2123a895b474b327.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/main-1e1c9b13b58a0364.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/main-app-18c8346c85632539.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7eecb01de65ae1a7.js",revision:"O_T8wH8LFeTQzMjbWiq45"},{url:"/_next/static/css/f66c9ae3bbbf3824.css",revision:"f66c9ae3bbbf3824"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/icons/web-app-manifest-192x192.png",revision:"fdf790e4618bb5f4d716904294c74f56"},{url:"/icons/web-app-manifest-512x512.png",revision:"7d9d6b1b05e980360a02592e596b70a9"},{url:"/sounds/beep.mp3",revision:"7dee73cc5c35a6bb8e534f6e6548046d"},{url:"/workers/sw.js",revision:"6bcb9f0fdbf7c78364054f2d815084a1"},{url:"/workers/workbox-9d8003b8.js",revision:"0ae856656cd0ad4c235176cb05aed3c9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^\/api\//,new e.NetworkOnly,"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
