(()=>{"use strict";var e=function(e,t,n,i){return new(n||(n=Promise))((function(o,f){function a(e){try{r(i.next(e))}catch(e){f(e)}}function l(e){try{r(i.throw(e))}catch(e){f(e)}}function r(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}r((i=i.apply(e,t||[])).next())}))};figma.showUI(__html__,{width:480,height:240});let t=new Object;function n(e,t,n){e.visible=!1;let i=(o=e.name,f=t,n.find((function(e){return e.name===f&&e.region===o})));var o,f;return e.characters=i.text,e.fontName={family:i.fontFamily,style:i.fontStyle},e}figma.ui.onmessage=f=>e(void 0,void 0,void 0,(function*(){if("export"===f)!function(){e(this,void 0,void 0,(function*(){let n=[];const f=t=>e(this,void 0,void 0,(function*(){for(let e of figma.currentPage.children)if("預覽"===e.name){let o=figma.getNodeById(e.id);for(let e of o.children)i=e.name,yield e.exportAsync(undefined).then((e=>{n.push({lang:t,name:i,buffer:e})}))}}));for(const[e,n]of Object.entries(t)){let t=o().filter((t=>t.name===e));t.forEach((e=>{e.visible=!0})),yield f(e).then((()=>console.log("store: ",e,"buffer"))),t.forEach((e=>{e.visible=!1}))}figma.ui.postMessage(n)}))}();else{let e=function(e){let t=[];for(let n of e){const e=JSON.stringify(n),i=JSON.parse(e);switch(i.Name){case"主標":case"小標":t.unshift({name:i.Name,region:i.Region,text:i.Text,fontFamily:i.FontFamily,fontStyle:i.FontStyle})}}return t}(f);!function(e){for(let n of e)null==t[n.region]&&(t[n.region]=[]),t[n.region].push(n.name)}(e);for(let t of e)null!=t.fontFamily&&(yield figma.loadFontAsync({family:t.fontFamily,style:t.fontStyle}));for(let e of o()){let t=e.fontName;void 0!==t&&(yield figma.loadFontAsync({family:t.family,style:t.style}))}for(let t of e)void 0!==t.text&&figma.currentPage.selection.forEach((i=>{t.name==i.name&&figma.getNodeById(i.id).children.forEach((i=>{i.name==t.region&&n(i,t.name,e)}))}));figma.ui.postMessage("success")}}));let i="";function o(){const e=figma.currentPage.selection;let t=[];return e.forEach((e=>{"主標"!==e.name&&"小標"!==e.name||figma.getNodeById(e.id).children.forEach((e=>{t.unshift(e)}))})),t}})();