if(!self.define){let e,s={};const c=(c,i)=>(c=new URL(c+".js",i).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const o=e=>c(e,a),r={module:{uri:a},exports:n,require:o};s[a]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(t(...e),n)))}}define(["./workbox-9d8003b8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"8441c987ea38a28c8bcaedda214203bc"},{url:"/_next/static/chunks/1068-f277c91d184bf6f2.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/1431-8f2f8f341785688d.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/1517-f33140f8f8e799f5.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/2645-5b45b6470a91a68a.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/2651-624e42479f699fcc.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/41ade5dc-2781a024529baf75.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/4723-5179129605c27498.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/4839-cf55c0141a2468a7.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/4bd1b696-aa5f278bdef18c94.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/5425-6990dbaec8452d8c.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/5590-7a057e10b6c73581.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/6316-5b00be71aa7d44c7.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/6651-fa7c9d0b6e35ce10.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/6772-d38a5eb546715152.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/6808-26c2ad6d939e4cbd.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/7542-981d0665439c5bf8.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/770-86d6123c14d8bf53.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/7970-daf434abf5b7fa44.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/8154-f6e2f0a0212da56f.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/9963-ca1a4d3b2991cd51.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/(home)/page-c3269b86d8883d6c.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/_not-found/page-f8801d2c8575e675.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/audits/route-ef10d52078ef8848.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-84eca218a6550284.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/items/%5Bitem_id%5D/route-73cd8ce8b3c64a8c.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/items/route-f6632ebbb02c7f42.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/items/scan/route-15b368ac27f9d339.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/ping/route-25dc98b0085b4919.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/reports/route-cbf05bbcda1b8edb.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/route-d1e2226998c6facc.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/route-f085a37512b37f2c.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/tags/route-19e2bf481a61fa37.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/shoes/route-f19f72293ff1a4f8.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/users/%5Buser_id%5D/route-32cc2366a5265b03.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/users/roles/route-0a81a80e4c734a78.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/api/users/route-206f8db124200ebc.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/error-b0f266f7bb41cdec.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/layout-28935867188014c1.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/login/page-7f4a6c5284279717.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/not-found-3fdb8156bb23e609.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/audits/page-464ab32024c12aa3.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/page-e8fed5cd5ce88435.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/reports/page-f71c77a0d59a73ec.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/%5Bitem_id%5D/page-1473f1d9621e8a95.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/create/page-e72f724133983a88.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/sku/%5Bsku%5D/page-7bc37d13d821c511.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/page-430ae72c900940d3.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/page-6b6f882f868a6c7b.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/create/page-9d65bc5324c1a30d.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/page-12239771a80ff45a.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/create/page-f52d13d05d994a8e.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/page-cecb4fa069b77090.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/shoes/scan/page-f575bce8d6d57579.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/template-926fdcc71e63b7c1.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/users/%5Buser_id%5D/page-e0746d436a40d062.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/users/create/page-be6f9c6ed2ab33bd.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/app/panel/users/page-5a1bb4e0eb5a8490.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/main-1e1c9b13b58a0364.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/main-app-18c8346c85632539.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7eecb01de65ae1a7.js",revision:"yoBCcBQeQhm6-Bkee5wRV"},{url:"/_next/static/css/edcc2e3724293aeb.css",revision:"edcc2e3724293aeb"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/yoBCcBQeQhm6-Bkee5wRV/_buildManifest.js",revision:"559391163304843dcd5075283bbb26cf"},{url:"/_next/static/yoBCcBQeQhm6-Bkee5wRV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/icons/logo_shoe.png",revision:"e76f1c6de977e3bf2ab66978e040cc58"},{url:"/icons/web-app-manifest-192x192.png",revision:"11d5fdd3ca2b02f766c2021666f006f4"},{url:"/icons/web-app-manifest-512x512.png",revision:"7d04212b5a7ed87c473ae87e6bca5d2c"},{url:"/sounds/beep.mp3",revision:"7dee73cc5c35a6bb8e534f6e6548046d"},{url:"/workers/sw.js",revision:"1cf29fd0f00b1f9b3f48cf4b24ba197d"},{url:"/workers/workbox-9d8003b8.js",revision:"0ae856656cd0ad4c235176cb05aed3c9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^\/api\//,new e.NetworkOnly,"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
