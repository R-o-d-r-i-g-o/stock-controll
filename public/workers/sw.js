if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let n={};const r=e=>c(e,i),f={module:{uri:i},exports:n,require:r};s[i]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(t(...e),n)))}}define(["./workbox-9d8003b8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"8ee0ec32292a30631a640154a5d991e9"},{url:"/_next/static/ZfNyTpzcfNc280aqKOVP5/_buildManifest.js",revision:"559391163304843dcd5075283bbb26cf"},{url:"/_next/static/ZfNyTpzcfNc280aqKOVP5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1068-f277c91d184bf6f2.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/1431-8f2f8f341785688d.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/1517-f33140f8f8e799f5.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/2645-5b45b6470a91a68a.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/2651-624e42479f699fcc.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/41ade5dc-2781a024529baf75.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/4723-5179129605c27498.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/4839-cf55c0141a2468a7.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/4bd1b696-aa5f278bdef18c94.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/5425-6990dbaec8452d8c.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/5590-7a057e10b6c73581.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/6316-5b00be71aa7d44c7.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/6651-fa7c9d0b6e35ce10.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/6772-d38a5eb546715152.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/6808-26c2ad6d939e4cbd.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/7542-981d0665439c5bf8.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/770-86d6123c14d8bf53.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/7970-daf434abf5b7fa44.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/8154-f6e2f0a0212da56f.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/9963-ca1a4d3b2991cd51.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/(home)/page-bd110e2605d2122a.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/_not-found/page-e0a28a9d9a8d7ec5.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/audits/route-040f61d90dd8d8ba.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/auth/%5B...nextauth%5D/route-a773485840e5296c.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/items/%5Bitem_id%5D/route-94f26f0b72c03732.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/items/route-06ebbbef9b81e79b.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/items/scan/route-b960ec211b3049db.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/ping/route-d708cd666951bc84.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/reports/route-fe5256fe56655f6d.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/shoes/%5Bshoe_id%5D/route-6ab33dbacded8868.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/route-e665a63b7fdc12a1.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/shoes/%5Bshoe_id%5D/tags/route-7d7081d348d88bcf.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/shoes/route-20650e74694e23b7.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/users/%5Buser_id%5D/route-6e1242d5510c0c8e.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/users/roles/route-57af1886daa487e5.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/api/(routes)/users/route-9abe727f082a5666.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/error-b0f266f7bb41cdec.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/layout-28935867188014c1.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/login/page-7f4a6c5284279717.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/not-found-3fdb8156bb23e609.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/audits/page-464ab32024c12aa3.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/page-70c6ace7585b4d72.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/reports/page-f71c77a0d59a73ec.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/%5Bitem_id%5D/page-1473f1d9621e8a95.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/create/page-e72f724133983a88.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/sku/%5Bsku%5D/page-7bc37d13d821c511.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/page-430ae72c900940d3.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/page-6b6f882f868a6c7b.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/create/page-9d65bc5324c1a30d.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/page-12239771a80ff45a.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/create/page-f52d13d05d994a8e.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/page-cecb4fa069b77090.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/shoes/scan/page-f575bce8d6d57579.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/template-926fdcc71e63b7c1.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/users/%5Buser_id%5D/page-e0746d436a40d062.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/users/create/page-be6f9c6ed2ab33bd.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/app/panel/users/page-5a1bb4e0eb5a8490.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/main-1e1c9b13b58a0364.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/main-app-18c8346c85632539.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7eecb01de65ae1a7.js",revision:"ZfNyTpzcfNc280aqKOVP5"},{url:"/_next/static/css/edcc2e3724293aeb.css",revision:"edcc2e3724293aeb"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/icons/logo_shoe.png",revision:"e76f1c6de977e3bf2ab66978e040cc58"},{url:"/icons/web-app-manifest-192x192.png",revision:"11d5fdd3ca2b02f766c2021666f006f4"},{url:"/icons/web-app-manifest-512x512.png",revision:"7d04212b5a7ed87c473ae87e6bca5d2c"},{url:"/sounds/beep.mp3",revision:"7dee73cc5c35a6bb8e534f6e6548046d"},{url:"/workers/sw.js",revision:"e92dbc8f247d155f59e2e99b2e692c00"},{url:"/workers/workbox-9d8003b8.js",revision:"0ae856656cd0ad4c235176cb05aed3c9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^\/api\//,new e.NetworkOnly,"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
