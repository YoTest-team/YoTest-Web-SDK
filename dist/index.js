parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZBnv":[function(require,module,exports) {
function o(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}module.exports=o,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"NoOd":[function(require,module,exports) {
function e(e,o){for(var r=0;r<o.length;r++){var t=o[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function o(o,r,t){return r&&e(o.prototype,r),t&&e(o,t),o}module.exports=o,module.exports.default=module.exports,module.exports.__esModule=!0;
},{}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("@babel/runtime/helpers/classCallCheck")),t=n(require("@babel/runtime/helpers/createClass"));function n(e){return e&&e.__esModule?e:{default:e}}var o=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB,r=window.Promise&&window.fetch&&window.Request&&window.caches&&caches.open&&caches.match,s=window.Promise&&!!o,a=navigator.userAgent.match(/msie\s+(\d+?).\d/i),c=!1;if(null!=a){var i=parseInt(a[1]);i<10&&(c=!0)}function l(e,t,n){var o=new Request(e),r=[];return caches.match(o).then(function(e){return null==e?fetch(o).then(function(e){return r.push(e),e.clone()}):(r.push(e),e.clone())}).then(function(e){return r.push(e),caches.open("__YOTEST_ASSETS__")}).then(function(e){return e.put(o,r[0])}).then(function(){return r[1].text()}).then(function(e){Function(e).call(window),n(YoTest)}).catch(function(){return t()})}function u(e,t,n){var r=null,s=null,a=null,c=null,i=null;return new Promise(function(e,t){var n=o.open("__YOTEST_ASSETS__",1);n.onsuccess=function(){return e(n.result)},n.onerror=function(e){return t(e)},n.onupgradeneeded=function(){n.result.createObjectStore("AssetsStore",{keyPath:"id",autoIncrement:!0}).createIndex("URLIndex",["url"])}}).then(function(t){return s=(r=t).transaction("AssetsStore","readwrite"),a=s.objectStore("AssetsStore"),c=a.index("URLIndex"),new Promise(function(t,n){var o=c.get([e]);o.onsuccess=function(){return t(o.result)},o.onerror=function(e){return n(e)}})}).then(function(t){if(i=t,null==t)return new Promise(function(t,n){var o=new XMLHttpRequest;o.open("get",e),o.onload=function(){return t(o.response||o.responseText)},o.onerror=function(){return n(new Error(o.status||o.readyState))},o.send(null)})}).then(function(t){return null==i?(s=r.transaction("AssetsStore","readwrite"),(a=s.objectStore("AssetsStore")).put({url:e,text:t}),t):i.text}).then(function(e){Function(e).call(window),n(YoTest)}).catch(function(){return t()}).then(function(){return r&&r.close()})}function d(e){var t=new(c?XDomainRequest:XMLHttpRequest);t.open("get","".concat(location.protocol,"//api.fastyotest.com/api/init")),t.onload=function(){var n=t.response||t.responseText;try{n=JSON.parse(n)}catch(o){}finally{"function"==typeof e&&e(null,n)}},t.onerror=function(){e(t.status||t.readyState)},t.send(null)}function h(e,t){var n=function(){var n=document.createElement("script");n.onload=n.error=function(){document.body.removeChild(n),n=null,t(YoTest)},n.src=e,document.body.appendChild(n)};r?l(e,n,t):s?u(e,n,t):n()}var f=function(){function n(t){var o=t.platform,r=t.accessId,s=t.product,a=t.area,c=t.bgColor,i=t.enforced,l=void 0!==i&&i;(0,e.default)(this,n),this.captcha=null,this.platform=o,this.accessId=r,this.product=s,this.area=a,this.bgColor=c,this.enforced=l,this.onready=null,this.onsuccess=null,this.onerror=null,this.onclose=null,"bind"===s&&this.appendTo("#"+Date.now())}return(0,t.default)(n,[{key:"appendTo",value:function(e){var t=this;return"bind"!==this.product&&this.attachLoading(e),d(function(n,o){if(null==n){var r=o.code,s=o.data;200===r&&h(s.lib,function(n){null!=n&&n({accessId:t.accessId,platform:t.platform||"web",product:t.product,area:t.area,bgColor:t.bgColor,enforced:t.enforced},s,function(n){t.captcha=n,t.captcha.onReady(t.onready),t.captcha.onSuccess(t.onsuccess),t.captcha.onError(t.onerror),t.captcha.onClose(t.onclose),t.captcha.appendTo(e)})})}}),this}},{key:"getValidate",value:function(){return this.captcha?this.captcha.getValidate():this}},{key:"reset",value:function(){return this.captcha&&this.captcha.reset(),this}},{key:"verify",value:function(){return this.captcha&&this.captcha.verify(),this}},{key:"onReady",value:function(e){return this.onready=e,this.captcha&&this.captcha.onReady(e),this}},{key:"onSuccess",value:function(e){return this.onsuccess=e,this.captcha&&this.captcha.onSuccess(e),this}},{key:"onError",value:function(e){return this.onerror=e,this.captcha&&this.captcha.onError(e),this}},{key:"onClose",value:function(e){return this.onclose=e,this.captcha&&this.captcha.onClose(e),this}},{key:"destroy",value:function(){return this.captcha&&this.captcha.destroy(),this}},{key:"attachLoading",value:function(e){var t=document.querySelector(e);if(null==t)throw new Error("can't find element with ".concat(e));var n=t.getBoundingClientRect().width/300*16,o=document.createElement("div");o.style.width="100%",o.style.height="100%",o.style.cursor="default",o.style.position="relative",o.style.webkitTextSizeAdjust="none",o.style.webkitFontSmoothing="antialiased",o.style.fontFamily="-apple-system, BlinkMacSystemFont, Droid Sans, PingFang SC, Helvetica, sans-serif",n<12&&(o.style.webkitTransform="scale("+n/12+")",o.style.msTransform="scale("+n/12+")",o.style.mozTransform="scale("+n/12+")",o.style.transform="scale("+n/12+")");var r=document.createElement("div");r.style.width=18.625*n+"px",r.style.height=2.375*n+"px",r.style.position="absolute",r.style.top="50%",r.style.left="50%",r.style.webkitTransform="translate(-50%, -50%)",r.style.mozTransform="translate(-50%, -50%)",r.style.msTransform="translate(-50%, -50%)",r.style.transform="translate(-50%, -50%)",r.style.background="white",r.style.backgroundImage="linear-gradient(to bottom, #ffffff, #f2f2f2)",r.style.borderTop="1px solid #eff0f3",r.style.borderLeft="1px solid #eaebf0",r.style.borderBottom="1px solid #d8d9de",r.style.borderRight="1px solid #d1d2d7",r.style.borderRadius="4px",r.style.boxSizing="border-box",r.style.display="flex",r.style.justifyContent="center",r.style.alignItems="center";var s=document.createElement("p");s.style.width="100%",s.style.height="100%",s.style.lineHeight=r.style.height,s.style.padding=0,s.style.margin=0,s.style.textAlign="center",s.style.color="#828386",s.style.fontSize="16px",s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.innerHTML="友验组件初始化中",t.innerHTML="",r.appendChild(s),o.appendChild(r),t.appendChild(o)}}]),n}(),p=function(e,t){var n=e.platform,o=void 0===n?"web":n,r=e.accessId,s=e.product,a=void 0===s?"float":s,c=e.area,i=e.bgColor,l=e.enforced,u=new f({platform:o,accessId:r,product:a,area:c,bgColor:i,enforced:l});return"function"==typeof t&&t(u),u};exports.default=p;
},{"@babel/runtime/helpers/classCallCheck":"ZBnv","@babel/runtime/helpers/createClass":"NoOd"}]},{},["Focm"], "initYoTest")