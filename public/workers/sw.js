if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const c=e=>t(e,a),b={module:{uri:a},exports:n,require:c};s[a]=Promise.all(i.map((e=>b[e]||c(e)))).then((e=>(r(...e),n)))}}define(["./workbox-9d8003b8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"88bfd5a70c7526cd8e2f22f9e01e4716"},{url:"/_next/static/chunks/1068-42a651df453f143f.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/1517-dd915db5303c1571.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/2433-143364b909be13ed.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/2651-624e42479f699fcc.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/2983-8abab0d9ecf9ac9e.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/3197-ec620e1a80448c34.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/41ade5dc-2781a024529baf75.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/4839-8ac453ddf3e7aa43.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/4bd1b696-edee00bd473bee82.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/5590-32e0484e4f193476.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/6316-c5f14fe5e6da8b01.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/6651-d4dde90e7bcab589.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/7471-16c6b4409bc39df9.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/7538-4fa5c9137afab883.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/7970-1a721cf89fbbd5a0.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/8154-51c0f03c5d7c9081.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/8446-3c63182abe270da3.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/9017-b59a06410e4d3fda.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/9907-1f10ccbc9741cde1.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/(home)/page-cd995d504cc526ca.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/_not-found/page-f8801d2c8575e675.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/audits/route-a6d44aafdb36a157.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-ce0411857e024767.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/items/%5Bitem_id%5D/route-05a61505f113765d.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/items/route-8f9f87a9c0795141.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/items/scan/route-ef844bb67537f965.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/ping/route-0329c1ba2c3003e9.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/reports/route-a549cd000b786da9.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/route-dbf67209e685e719.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/route-71ba68fe8e3c37e1.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/shoes/%5Bshoe_id%5D/tags/route-5dc910dc358fae30.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/shoes/route-9ebb95b1fa815ef1.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/users/%5Buser_id%5D/route-78740941084f5f7e.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/users/roles/route-86651c264248b6ef.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/api/users/route-7ac997d6f3caec99.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/error-1f16454f08df19cd.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/layout-73d945f22cdd166d.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/login/page-f3e9a7f560279e39.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/not-found-f1e994f38d325060.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/audits/page-67d892a7f7341951.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/page-e8fed5cd5ce88435.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/reports/page-13455054905b3949.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/%5Bitem_id%5D/page-3c15ea51b651f31e.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/create/page-5730c66e62417cfe.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/items/sku/%5Bsku%5D/page-464459b0fadac900.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/page-3394012e9e5d9eec.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/%5Btag_id%5D/page-8880a723fbfc50e8.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/create/page-bc18ce3347333154.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/%5Bshoe_id%5D/tags/page-f8d6b91665137b24.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/create/page-eb58f9323590a205.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/page-148a44e2f9ee0233.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/shoes/scan/page-f682e58c64e47f59.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/template-e659c68e8186dc99.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/users/%5Buser_id%5D/page-2cc80ec7057d1f80.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/users/create/page-6fb422482bbba388.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/app/panel/users/page-a893d5ea84e1cf26.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/main-1e1c9b13b58a0364.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/main-app-18c8346c85632539.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7eecb01de65ae1a7.js",revision:"rIEbNQ2TV4d9kWtg5w_Db"},{url:"/_next/static/css/8152f388f6fa1e40.css",revision:"8152f388f6fa1e40"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/rIEbNQ2TV4d9kWtg5w_Db/_buildManifest.js",revision:"559391163304843dcd5075283bbb26cf"},{url:"/_next/static/rIEbNQ2TV4d9kWtg5w_Db/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/fonts/GeistMonoVF.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/fonts/GeistVF.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/icons/logo_shoe.png",revision:"e76f1c6de977e3bf2ab66978e040cc58"},{url:"/icons/web-app-manifest-192x192.png",revision:"11d5fdd3ca2b02f766c2021666f006f4"},{url:"/icons/web-app-manifest-512x512.png",revision:"7d04212b5a7ed87c473ae87e6bca5d2c"},{url:"/sounds/beep.mp3",revision:"7dee73cc5c35a6bb8e534f6e6548046d"},{url:"/workers/sw.js",revision:"692153edcace9e1bea52e63ead6680fb"},{url:"/workers/workbox-9d8003b8.js",revision:"0ae856656cd0ad4c235176cb05aed3c9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^\/api\//,new e.NetworkOnly,"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
