sap.ui.define(['exports'], (function (exports) { 'use strict';

	const e$a=new Map,s$g=(t,r)=>{e$a.set(t,r);},n$f=t=>e$a.get(t);

	var c$e={},e$9=c$e.hasOwnProperty,a$a=c$e.toString,o$c=e$9.toString,l$c=o$c.call(Object),i$g=function(r){var t,n;return !r||a$a.call(r)!=="[object Object]"?false:(t=Object.getPrototypeOf(r),t?(n=e$9.call(t,"constructor")&&t.constructor,typeof n=="function"&&o$c.call(n)===l$c):true)};

	var c$d=Object.create(null),u$c=function(p,m,A,d){var n,t,e,a,o,i,r=arguments[2]||{},f=3,l=arguments.length,s=arguments[0]||false,y=arguments[1]?void 0:c$d;for(typeof r!="object"&&typeof r!="function"&&(r={});f<l;f++)if((o=arguments[f])!=null)for(a in o)n=r[a],e=o[a],!(a==="__proto__"||r===e)&&(s&&e&&(i$g(e)||(t=Array.isArray(e)))?(t?(t=false,i=n&&Array.isArray(n)?n:[]):i=n&&i$g(n)?n:{},r[a]=u$c(s,arguments[1],i,e)):e!==y&&(r[a]=e));return r};

	const e$8=function(n,t){return u$c(true,false,...arguments)};

	const _$1={themes:{default:"sap_horizon",all:["sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw"]},languages:{default:"en"},locales:{default:"en",all:["ar","ar_EG","ar_SA","bg","ca","cnr","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","mk","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"]}},e$7=_$1.themes.default,s$f=_$1.themes.all,a$9=_$1.languages.default,r$e=_$1.locales.default,l$b=_$1.locales.all;

	const o$b=typeof document>"u",n$e={search(){return o$b?"":window.location.search}},i$f=()=>o$b?"":window.location.hostname,c$c=()=>o$b?"":window.location.port,a$8=()=>o$b?"":window.location.protocol,s$e=()=>o$b?"":window.location.href,u$b=()=>n$e.search();

	const o$a=e=>{const t=document.querySelector(`META[name="${e}"]`);return t&&t.getAttribute("content")},s$d=e=>{const t=o$a("sap-allowedThemeOrigins");return t&&t.split(",").some(n=>n==="*"||e===n.trim())},a$7=(e,t)=>{const n=new URL(e).pathname;return new URL(n,t).toString()},g$9=e=>{let t;try{if(e.startsWith(".")||e.startsWith("/"))t=new URL(e,s$e()).toString();else {const n=new URL(e),r=n.origin;r&&s$d(r)?t=n.toString():t=a$7(n.toString(),s$e());}return t.endsWith("/")||(t=`${t}/`),`${t}UI5/`}catch{}};

	var u$a=(l=>(l.Full="full",l.Basic="basic",l.Minimal="minimal",l.None="none",l))(u$a||{});

	let i$e = class i{constructor(){this._eventRegistry=new Map;}attachEvent(t,r){const n=this._eventRegistry,e=n.get(t);if(!Array.isArray(e)){n.set(t,[r]);return}e.includes(r)||e.push(r);}detachEvent(t,r){const n=this._eventRegistry,e=n.get(t);if(!e)return;const s=e.indexOf(r);s!==-1&&e.splice(s,1),e.length===0&&n.delete(t);}fireEvent(t,r){const e=this._eventRegistry.get(t);return e?e.map(s=>s.call(this,r)):[]}fireEventAsync(t,r){return Promise.all(this.fireEvent(t,r))}isHandlerAttached(t,r){const e=this._eventRegistry.get(t);return e?e.includes(r):false}hasListeners(t){return !!this._eventRegistry.get(t)}};

	const e$6=new i$e,t$f="configurationReset",i$d=n=>{e$6.attachEvent(t$f,n);};

	let p$5=false,t$e={animationMode:u$a.Full,theme:e$7,themeRoot:void 0,rtl:void 0,language:void 0,timezone:void 0,calendarType:void 0,secondaryCalendarType:void 0,noConflict:false,formatSettings:{},fetchDefaultLanguage:false,defaultFontLoading:true,enableDefaultTooltips:true};const C$1=()=>(o$9(),t$e.animationMode),T$3=()=>(o$9(),t$e.theme),S$2=()=>(o$9(),t$e.themeRoot),L$2=()=>(o$9(),t$e.language),F=()=>(o$9(),t$e.fetchDefaultLanguage),U$2=()=>(o$9(),t$e.noConflict),b$3=()=>(o$9(),t$e.defaultFontLoading),D=()=>(o$9(),t$e.enableDefaultTooltips),I$4=()=>(o$9(),t$e.calendarType),M$1=()=>(o$9(),t$e.formatSettings),i$c=new Map;i$c.set("true",true),i$c.set("false",false);const z=()=>{const n=document.querySelector("[data-ui5-config]")||document.querySelector("[data-id='sap-ui-config']");let e;if(n){try{e=JSON.parse(n.innerHTML);}catch{console.warn("Incorrect data-sap-ui-config format. Please use JSON");}e&&(t$e=e$8(t$e,e));}},E$1=()=>{const n=new URLSearchParams(u$b());n.forEach((e,a)=>{const r=a.split("sap-").length;r===0||r===a.split("sap-ui-").length||u$9(a,e,"sap");}),n.forEach((e,a)=>{a.startsWith("sap-ui")&&u$9(a,e,"sap-ui");});},P$5=n=>{const e=n.split("@")[1];return g$9(e)},w$6=(n,e)=>n==="theme"&&e.includes("@")?e.split("@")[0]:e,u$9=(n,e,a)=>{const r=e.toLowerCase(),s=n.split(`${a}-`)[1];i$c.has(e)&&(e=i$c.get(r)),s==="theme"?(t$e.theme=w$6(s,e),e&&e.includes("@")&&(t$e.themeRoot=P$5(e))):t$e[s]=e;},j=()=>{const n=n$f("OpenUI5Support");if(!n||!n.isOpenUI5Detected())return;const e=n.getConfigurationSettingsObject();t$e=e$8(t$e,e);},o$9=()=>{typeof document>"u"||p$5||(g$8(),p$5=true);},g$8=n=>{z(),E$1(),j();};

	let l$a = class l{constructor(){this.list=[],this.lookup=new Set;}add(t){this.lookup.has(t)||(this.list.push(t),this.lookup.add(t));}remove(t){this.lookup.has(t)&&(this.list=this.list.filter(e=>e!==t),this.lookup.delete(t));}shift(){const t=this.list.shift();if(t)return this.lookup.delete(t),t}isEmpty(){return this.list.length===0}isAdded(t){return this.lookup.has(t)}process(t){let e;const s=new Map;for(e=this.shift();e;){const i=s.get(e)||0;if(i>10)throw new Error("Web component processed too many times this task, max allowed is: 10");t(e),s.set(e,i+1),e=this.shift();}}};

	const o$8=(t,n=document.body,r)=>{let e=document.querySelector(t);return e||(e=r?r():document.createElement(t),n.insertBefore(e,n.firstChild))};

	const u$8=()=>{const t=document.createElement("meta");return t.setAttribute("name","ui5-shared-resources"),t.setAttribute("content",""),t},l$9=()=>typeof document>"u"?null:o$8('meta[name="ui5-shared-resources"]',document.head,u$8),m$9=(t,o)=>{const r=t.split(".");let e=l$9();if(!e)return o;for(let n=0;n<r.length;n++){const s=r[n],c=n===r.length-1;Object.prototype.hasOwnProperty.call(e,s)||(e[s]=c?o:{}),e=e[s];}return e};

	const e$5={version:"2.10.0-rc.2",major:2,minor:10,patch:0,suffix:"-rc.2",isNext:false,buildTime:1745482198};

	let s$c,t$d={include:[/^ui5-/],exclude:[]};const o$7=new Map,l$8=e=>{if(!e.match(/^[a-zA-Z0-9_-]+$/))throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");R$1()&&console.warn("Setting the scoping suffix must be done before importing any components. For proper usage, read the scoping section: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/06-scoping.md."),s$c=e;},c$b=()=>s$c,p$4=e=>{if(!e||!e.include)throw new Error('"rules" must be an object with at least an "include" property');if(!Array.isArray(e.include)||e.include.some(n=>!(n instanceof RegExp)))throw new Error('"rules.include" must be an array of regular expressions');if(e.exclude&&(!Array.isArray(e.exclude)||e.exclude.some(n=>!(n instanceof RegExp))))throw new Error('"rules.exclude" must be an array of regular expressions');e.exclude=e.exclude||[],t$d=e,o$7.clear();},m$8=()=>t$d,i$b=e=>{if(!o$7.has(e)){const n=t$d.include.some(r=>e.match(r))&&!t$d.exclude.some(r=>e.match(r));o$7.set(e,n);}return o$7.get(e)},g$7=e=>{if(i$b(e))return c$b()},d$a=e=>{const n=`v${e$5.version.replaceAll(".","-")}`,r=/(--_?ui5)([^,:)\s]+)/g;return e.replaceAll(r,`$1-${n}$2`)};

	let i$a,s$b="";const u$7=new Map,r$d=m$9("Runtimes",[]),x=()=>{if(i$a===void 0){i$a=r$d.length;const e=e$5;r$d.push({...e,get scopingSuffix(){return c$b()},get registeredTags(){return T$2()},get scopingRules(){return m$8()},alias:s$b,description:`Runtime ${i$a} - ver ${e.version}${""}`});}},I$3=()=>i$a,b$2=(e,m)=>{const o=`${e},${m}`;if(u$7.has(o))return u$7.get(o);const t=r$d[e],n=r$d[m];if(!t||!n)throw new Error("Invalid runtime index supplied");if(t.isNext||n.isNext)return t.buildTime-n.buildTime;const c=t.major-n.major;if(c)return c;const a=t.minor-n.minor;if(a)return a;const f=t.patch-n.patch;if(f)return f;const l=new Intl.Collator(void 0,{numeric:true,sensitivity:"base"}).compare(t.suffix,n.suffix);return u$7.set(o,l),l},$$2=()=>r$d;

	const g$6=m$9("Tags",new Map),d$9=new Set;let s$a=new Map,c$a;const m$7=-1,h$5=e=>{d$9.add(e),g$6.set(e,I$3());},w$5=e=>d$9.has(e),R$1=()=>d$9.size>0,T$2=()=>[...d$9.values()],$$1=e=>{let n=g$6.get(e);n===void 0&&(n=m$7),s$a.has(n)||s$a.set(n,new Set),s$a.get(n).add(e),c$a||(c$a=setTimeout(()=>{y$3(),s$a=new Map,c$a=void 0;},1e3));},y$3=()=>{const e=$$2(),n=I$3(),l=e[n];let t="Multiple UI5 Web Components instances detected.";e.length>1&&(t=`${t}
Loading order (versions before 1.1.0 not listed): ${e.map(i=>`
${i.description}`).join("")}`),[...s$a.keys()].forEach(i=>{let o,r;i===m$7?(o=1,r={description:"Older unknown runtime"}):(o=b$2(n,i),r=e[i]);let a;o>0?a="an older":o<0?a="a newer":a="the same",t=`${t}

"${l.description}" failed to define ${s$a.get(i).size} tag(s) as they were defined by a runtime of ${a} version "${r.description}": ${[...s$a.get(i)].sort().join(", ")}.`,o>0?t=`${t}
WARNING! If your code uses features of the above web components, unavailable in ${r.description}, it might not work as expected!`:t=`${t}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;}),t=`${t}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/06-scoping.md.`,console.warn(t);};

	const t$c=new Set,n$d=e=>{t$c.add(e);},r$c=e=>t$c.has(e);

	const s$9=new Set,d$8=new i$e,n$c=new l$a;let t$b,a$6,m$6,i$9;const l$7=async e=>{n$c.add(e),await P$4();},c$9=e=>{d$8.fireEvent("beforeComponentRender",e),s$9.add(e),e._render();},h$4=e=>{n$c.remove(e),s$9.delete(e);},P$4=async()=>{i$9||(i$9=new Promise(e=>{window.requestAnimationFrame(()=>{n$c.process(c$9),i$9=null,e(),m$6||(m$6=setTimeout(()=>{m$6=void 0,n$c.isEmpty()&&U$1();},200));});})),await i$9;},y$2=()=>t$b||(t$b=new Promise(e=>{a$6=e,window.requestAnimationFrame(()=>{n$c.isEmpty()&&(t$b=void 0,e());});}),t$b),I$2=()=>{const e=T$2().map(r=>customElements.whenDefined(r));return Promise.all(e)},f$6=async()=>{await I$2(),await y$2();},U$1=()=>{n$c.isEmpty()&&a$6&&(a$6(),a$6=void 0,t$b=void 0);},C=async e=>{s$9.forEach(r=>{const o=r.constructor,u=o.getMetadata().getTag(),w=r$c(o),p=o.getMetadata().isLanguageAware(),E=o.getMetadata().isThemeAware();(!e||e.tag===u||e.rtlAware&&w||e.languageAware&&p||e.themeAware&&E)&&l$7(r);}),await f$6();};

	const g$5=typeof document>"u",i$8=(e,t)=>t?`${e}|${t}`:e,l$6=e=>e===void 0?true:b$2(I$3(),parseInt(e))===1,c$8=(e,t,r="",s)=>{const d=I$3(),n=new CSSStyleSheet;n.replaceSync(e),n._ui5StyleId=i$8(t,r),s&&(n._ui5RuntimeIndex=d,n._ui5Theme=s),document.adoptedStyleSheets=[...document.adoptedStyleSheets,n];},y$1=(e,t,r="",s)=>{const d=I$3(),n=document.adoptedStyleSheets.find(o=>o._ui5StyleId===i$8(t,r));if(n)if(!s)n.replaceSync(e||"");else {const o=n._ui5RuntimeIndex;(n._ui5Theme!==s||l$6(o))&&(n.replaceSync(e||""),n._ui5RuntimeIndex=String(d),n._ui5Theme=s);}},S$1=(e,t="")=>g$5?true:!!document.adoptedStyleSheets.find(r=>r._ui5StyleId===i$8(e,t)),f$5=(e,t="")=>{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(r=>r._ui5StyleId!==i$8(e,t));},R=(e,t,r="",s)=>{S$1(t,r)?y$1(e,t,r,s):c$8(e,t,r,s);},m$5=(e,t)=>e===void 0?t:t===void 0?e:`${e} ${t}`;

	const t$a=new i$e,r$b="themeRegistered",n$b=e=>{t$a.attachEvent(r$b,e);},s$8=e=>t$a.fireEvent(r$b,e);

	const l$5=new Map,h$3=new Map,u$6=new Map,T$1=new Set,i$7=new Set,p$3=(e,r,t)=>{h$3.set(`${e}/${r}`,t),T$1.add(e),i$7.add(r),s$8(r);},m$4=async(e,r,t)=>{const g=`${e}_${r}_${t||""}`,s=l$5.get(g);if(s!==void 0)return s;if(!i$7.has(r)){const $=[...i$7.values()].join(", ");return console.warn(`You have requested a non-registered theme ${r} - falling back to ${e$7}. Registered themes are: ${$}`),a$5(e,e$7)}const[n,d]=await Promise.all([a$5(e,r),t?a$5(e,t,true):void 0]),o=m$5(n,d);return o&&l$5.set(g,o),o},a$5=async(e,r,t=false)=>{const s=(t?u$6:h$3).get(`${e}/${r}`);if(!s){t||console.error(`Theme [${r}] not registered for package [${e}]`);return}let n;try{n=await s(r);}catch(d){console.error(e,d.message);return}return n},w$4=()=>T$1,P$3=e=>i$7.has(e);

	const r$a=new Set,s$7=()=>{let e=document.querySelector(".sapThemeMetaData-Base-baseLib")||document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");if(e)return getComputedStyle(e).backgroundImage;e=document.createElement("span"),e.style.display="none",e.classList.add("sapThemeMetaData-Base-baseLib"),document.body.appendChild(e);let t=getComputedStyle(e).backgroundImage;return t==="none"&&(e.classList.add("sapThemeMetaData-UI5-sap-ui-core"),t=getComputedStyle(e).backgroundImage),document.body.removeChild(e),t},o$6=e=>{const t=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(e);if(t&&t.length>=2){let a=t[1];if(a=a.replace(/\\"/g,'"'),a.charAt(0)!=="{"&&a.charAt(a.length-1)!=="}")try{a=decodeURIComponent(a);}catch{r$a.has("decode")||(console.warn("Malformed theme metadata string, unable to decodeURIComponent"),r$a.add("decode"));return}try{return JSON.parse(a)}catch{r$a.has("parse")||(console.warn("Malformed theme metadata string, unable to parse JSON"),r$a.add("parse"));}}},d$7=e=>{let t,a;try{const n=e.Path.split(".");t=n.length===4?n[2]:getComputedStyle(document.body).getPropertyValue("--sapSapThemeId"),a=e.Extends[0];}catch{r$a.has("object")||(console.warn("Malformed theme metadata Object",e),r$a.add("object"));return}return {themeName:t,baseThemeName:a}},m$3=()=>{const e=s$7();if(!e||e==="none")return;const t=o$6(e);if(t)return d$7(t)};

	const t$9=new i$e,d$6="themeLoaded",o$5=e=>{t$9.attachEvent(d$6,e);},n$a=e=>{t$9.detachEvent(d$6,e);},r$9=e=>t$9.fireEvent(d$6,e);

	const d$5=(r,n)=>{const e=document.createElement("link");return e.type="text/css",e.rel="stylesheet",n&&Object.entries(n).forEach(t=>e.setAttribute(...t)),e.href=r,document.head.appendChild(e),new Promise(t=>{e.addEventListener("load",t),e.addEventListener("error",t);})};

	let t$8;i$d(()=>{t$8=void 0;});const n$9=()=>(t$8===void 0&&(t$8=S$2()),t$8),u$5=e=>`${n$9()}Base/baseLib/${e}/css_variables.css`,i$6=async e=>{const o=document.querySelector(`[sap-ui-webcomponents-theme="${e}"]`);o&&document.head.removeChild(o),await d$5(u$5(e),{"sap-ui-webcomponents-theme":e});};

	const s$6="@ui5/webcomponents-theming",S=()=>w$4().has(s$6),P$2=async e=>{if(!S())return;const t=await m$4(s$6,e);t&&R(t,"data-ui5-theme-properties",s$6,e);},E=()=>{f$5("data-ui5-theme-properties",s$6);},U=async(e,t)=>{const o=[...w$4()].map(async a=>{if(a===s$6)return;const i=await m$4(a,e,t);i&&R(i,`data-ui5-component-properties-${I$3()}`,a);});return Promise.all(o)},w$3=async e=>{const t=m$3();if(t)return t;const r=n$f("OpenUI5Support");if(r&&r.isOpenUI5Detected()){if(r.cssVariablesLoaded())return {themeName:r.getConfigurationSettingsObject()?.theme,baseThemeName:""}}else if(n$9())return await i$6(e),m$3()},I$1=async e=>{const t=await w$3(e);!t||e!==t.themeName?await P$2(e):E();const r=P$3(e)?e:t&&t.baseThemeName;await U(r||e$7,t&&t.themeName===e?e:void 0),r$9(e);};

	const d$4=()=>new Promise(e=>{document.body?e():document.addEventListener("DOMContentLoaded",()=>{e();});});

	var a$4 = `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`;

	var n$8 = "@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}";

	let o$4;i$d(()=>{o$4=void 0;});const a$3=()=>(o$4===void 0&&(o$4=b$3()),o$4);

	const i$5=()=>{const t=n$f("OpenUI5Support");(!t||!t.isOpenUI5Detected())&&p$2(),c$7();},p$2=()=>{const t=document.querySelector("head>style[data-ui5-font-face]");!a$3()||t||S$1("data-ui5-font-face")||c$8(a$4,"data-ui5-font-face");},c$7=()=>{S$1("data-ui5-font-face-override")||c$8(n$8,"data-ui5-font-face-override");};

	var a$2 = ":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}";

	const e$4=()=>{S$1("data-ui5-system-css-vars")||c$8(a$2,"data-ui5-system-css-vars");};

	const t$7=typeof document>"u",e$3={get userAgent(){return t$7?"":navigator.userAgent},get touch(){return t$7?false:"ontouchstart"in window||navigator.maxTouchPoints>0},get chrome(){return t$7?false:/(Chrome|CriOS)/.test(e$3.userAgent)},get firefox(){return t$7?false:/Firefox/.test(e$3.userAgent)},get safari(){return t$7?false:!e$3.chrome&&/(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(e$3.userAgent)},get webkit(){return t$7?false:/webkit/.test(e$3.userAgent)},get windows(){return t$7?false:navigator.platform.indexOf("Win")!==-1},get macOS(){return t$7?false:!!navigator.userAgent.match(/Macintosh|Mac OS X/i)},get iOS(){return t$7?false:!!navigator.platform.match(/iPhone|iPad|iPod/)||!!(e$3.userAgent.match(/Mac/)&&"ontouchend"in document)},get android(){return t$7?false:!e$3.windows&&/Android/.test(e$3.userAgent)},get androidPhone(){return t$7?false:e$3.android&&/(?=android)(?=.*mobile)/i.test(e$3.userAgent)},get ipad(){return t$7?false:/ipad/i.test(e$3.userAgent)||/Macintosh/i.test(e$3.userAgent)&&"ontouchend"in document},_isPhone(){return u$4(),e$3.touch&&!r$8}};let o$3,i$4,r$8;const s$5=()=>{if(t$7||!e$3.windows)return  false;if(o$3===void 0){const n=e$3.userAgent.match(/Windows NT (\d+).(\d)/);o$3=n?parseFloat(n[1]):0;}return o$3>=8},c$6=()=>{if(t$7||!e$3.webkit)return  false;if(i$4===void 0){const n=e$3.userAgent.match(/(webkit)[ /]([\w.]+)/);i$4=n?parseFloat(n[1]):0;}return i$4>=537.1},u$4=()=>{if(t$7)return  false;if(r$8===void 0){if(e$3.ipad){r$8=true;return}if(e$3.touch){if(s$5()){r$8=true;return}if(e$3.chrome&&e$3.android){r$8=!/Mobile Safari\/[.0-9]+/.test(e$3.userAgent);return}let n=window.devicePixelRatio?window.devicePixelRatio:1;e$3.android&&c$6()&&(n=1),r$8=Math.min(window.screen.width/n,window.screen.height/n)>=600;return}r$8=e$3.userAgent.indexOf("Touch")!==-1||e$3.android&&!e$3.androidPhone;}},l$4=()=>e$3.touch,h$2=()=>e$3.safari,g$4=()=>e$3.chrome,b$1=()=>e$3.firefox,a$1=()=>(u$4(),(e$3.touch||s$5())&&r$8),d$3=()=>e$3._isPhone(),f$4=()=>t$7?false:!a$1()&&!d$3()||s$5(),m$2=()=>a$1()&&f$4(),w$2=()=>e$3.iOS,P$1=()=>e$3.android||e$3.androidPhone;

	let t$6=false;const i$3=()=>{h$2()&&w$2()&&!t$6&&(document.body.addEventListener("touchstart",()=>{}),t$6=true);};

	let o$2=false,r$7;const p$1=new i$e,h$1=()=>o$2,P=e=>{if(!o$2){p$1.attachEvent("boot",e);return}e();},l$3=async()=>{if(r$7!==void 0)return r$7;const e=async n=>{if(x(),typeof document>"u"){n();return}n$b(b);const t=n$f("OpenUI5Support"),f=t?t.isOpenUI5Detected():false,s=n$f("F6Navigation");t&&await t.init(),s&&!f&&s.init(),await d$4(),await I$1(r$6()),t&&t.attachListeners(),i$5(),e$4(),i$3(),n(),o$2=true,p$1.fireEvent("boot");};return r$7=new Promise(e),r$7},b=e=>{o$2&&e===r$6()&&I$1(r$6());};

	let t$5;i$d(()=>{t$5=void 0;});const r$6=()=>(t$5===void 0&&(t$5=T$3()),t$5),u$3=async e=>{t$5!==e&&(t$5=e,h$1()&&(await I$1(t$5),await C({themeAware:true})));},g$3=()=>e$7,n$7=()=>{const e=r$6();return l$2(e)?!e.startsWith("sap_horizon"):!m$3()?.baseThemeName?.startsWith("sap_horizon")},l$2=e=>s$f.includes(e);

	const t$4=new Map,e$2=(n,o)=>{t$4.set(n,o);},c$5=n=>t$4.get(n);

	var t$3=(o=>(o.SAPIconsV4="SAP-icons-v4",o.SAPIconsV5="SAP-icons-v5",o.SAPIconsTNTV2="tnt-v2",o.SAPIconsTNTV3="tnt-v3",o.SAPBSIconsV1="business-suite-v1",o.SAPBSIconsV2="business-suite-v2",o))(t$3||{});const s$4=new Map;s$4.set("SAP-icons",{legacy:"SAP-icons-v4",sap_horizon:"SAP-icons-v5"}),s$4.set("tnt",{legacy:"tnt-v2",sap_horizon:"tnt-v3"}),s$4.set("business-suite",{legacy:"business-suite-v1",sap_horizon:"business-suite-v2"});const c$4=(n,e)=>{if(s$4.has(n)){s$4.set(n,{...e,...s$4.get(n)});return}s$4.set(n,e);},r$5=n=>{const e=n$7()?"legacy":"sap_horizon";return s$4.has(n)?s$4.get(n)[e]:n};

	var t$2=(s=>(s["SAP-icons"]="SAP-icons-v4",s.horizon="SAP-icons-v5",s["SAP-icons-TNT"]="tnt",s.BusinessSuiteInAppSymbols="business-suite",s))(t$2||{});const n$6=e=>t$2[e]?t$2[e]:e;

	const i$2=o=>{const t=c$5(r$6());return !o&&t?n$6(t):o?r$5(o):r$5("SAP-icons")};

	const e$1=new i$e,n$5="languageChange",t$1=a=>{e$1.attachEvent(n$5,a);},r$4=a=>{e$1.detachEvent(n$5,a);},o$1=a=>e$1.fireEventAsync(n$5,a);

	let e,n$4;i$d(()=>{e=void 0,n$4=void 0;});const d$2=()=>(e===void 0&&(e=L$2()),e),s$3=async t=>{e!==t&&(e=t,await o$1(t),h$1()&&await C({languageAware:true}));},m$1=()=>a$9,L$1=t=>{n$4=t;},c$3=()=>(n$4===void 0&&(n$4=F()),n$4);

	const t=typeof document>"u",o=()=>{if(t)return a$9;const a=navigator.languages,n=()=>navigator.language;return a&&a[0]||n()||a$9};

	const n$3=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;let r$3 = class r{constructor(s){const t=n$3.exec(s.replace(/_/g,"-"));if(t===null)throw new Error(`The given language ${s} does not adhere to BCP-47.`);this.sLocaleId=s,this.sLanguage=t[1]||a$9,this.sScript=t[2]||"",this.sRegion=t[3]||"",this.sVariant=t[4]&&t[4].slice(1)||null,this.sExtension=t[5]&&t[5].slice(1)||null,this.sPrivateUse=t[6]||null,this.sLanguage&&(this.sLanguage=this.sLanguage.toLowerCase()),this.sScript&&(this.sScript=this.sScript.toLowerCase().replace(/^[a-z]/,i=>i.toUpperCase())),this.sRegion&&(this.sRegion=this.sRegion.toUpperCase());}getLanguage(){return this.sLanguage}getScript(){return this.sScript}getRegion(){return this.sRegion}getVariant(){return this.sVariant}getVariantSubtags(){return this.sVariant?this.sVariant.split("-"):[]}getExtension(){return this.sExtension}getExtensionSubtags(){return this.sExtension?this.sExtension.slice(2).split("-"):[]}getPrivateUse(){return this.sPrivateUse}getPrivateUseSubtags(){return this.sPrivateUse?this.sPrivateUse.slice(2).split("-"):[]}hasPrivateUseSubtag(s){return this.getPrivateUseSubtags().indexOf(s)>=0}toString(){const s=[this.sLanguage];return this.sScript&&s.push(this.sScript),this.sRegion&&s.push(this.sRegion),this.sVariant&&s.push(this.sVariant),this.sExtension&&s.push(this.sExtension),this.sPrivateUse&&s.push(this.sPrivateUse),s.join("-")}};

	const r$2=new Map,n$2=t=>(r$2.has(t)||r$2.set(t,new r$3(t)),r$2.get(t)),c$2=t=>{try{if(t&&typeof t=="string")return n$2(t)}catch{}return new r$3(r$e)},s$2=t=>{const e=d$2();return e?n$2(e):c$2(o())};

	const _=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i,c$1=/(?:^|-)(saptrc|sappsd)(?:-|$)/i,f$3={he:"iw",yi:"ji",nb:"no",sr:"sh"},p=i=>{let e;if(!i)return r$e;if(typeof i=="string"&&(e=_.exec(i.replace(/_/g,"-")))){let t=e[1].toLowerCase(),n=e[3]?e[3].toUpperCase():void 0;const s=e[2]?e[2].toLowerCase():void 0,r=e[4]?e[4].slice(1):void 0,o=e[6];return t=f$3[t]||t,o&&(e=c$1.exec(o))||r&&(e=c$1.exec(r))?`en_US_${e[1].toLowerCase()}`:(t==="zh"&&!n&&(s==="hans"?n="CN":s==="hant"&&(n="TW")),t+(n?"_"+n+(r?"_"+r.replace("-","_"):""):""))}return r$e};

	const r$1={zh_HK:"zh_TW",in:"id"},n$1=t=>{if(!t)return r$e;if(r$1[t])return r$1[t];const L=t.lastIndexOf("_");return L>=0?t.slice(0,L):t!==r$e?r$e:""};

	const d$1=new Set,m=new Set,g$2=new Map,l$1=new Map,u$2=new Map,$=(n,t,e)=>{const r=`${n}/${t}`;u$2.set(r,e);},f$2=(n,t)=>{g$2.set(n,t);},A$1=n=>g$2.get(n),h=(n,t)=>{const e=`${n}/${t}`;return u$2.has(e)},B=(n,t)=>{const e=`${n}/${t}`,r=u$2.get(e);return r&&!l$1.get(e)&&l$1.set(e,r(t)),l$1.get(e)},M=n=>{d$1.has(n)||(console.warn(`[${n}]: Message bundle assets are not configured. Falling back to English texts.`,` Add \`import "${n}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`),d$1.add(n));},L=(n,t)=>t!==a$9&&!h(n,t),w$1=async n=>{const t=s$2().getLanguage(),e=s$2().getRegion(),r=s$2().getVariant();let s=t+(e?`-${e}`:"")+(r?`-${r}`:"");if(L(n,s))for(s=p(s);L(n,s);)s=n$1(s);const I=c$3();if(s===a$9&&!I){f$2(n,null);return}if(!h(n,s)){M(n);return}try{const o=await B(n,s);f$2(n,o);}catch(o){const a=o;m.has(a.message)||(m.add(a.message),console.error(a.message));}};t$1(n=>{const t=[...g$2.keys()];return Promise.all(t.map(w$1))});

	const g$1=/('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g,i$1=(n,t)=>(t=t||[],n.replace(g$1,(p,s,e,r,o)=>{if(s)return "'";if(e)return e.replace(/''/g,"'");if(r){const a=typeof r=="string"?parseInt(r):r;return String(t[a])}throw new Error(`[i18n]: pattern syntax error at pos ${o}`)}));

	const r=new Map;let s$1;let u$1 = class u{constructor(e){this.packageName=e;}getText(e,...i){if(typeof e=="string"&&(e={key:e,defaultText:e}),!e||!e.key)return "";const t=A$1(this.packageName);t&&!t[e.key]&&console.warn(`Key ${e.key} not found in the i18n bundle, the default text will be used`);const l=t&&t[e.key]?t[e.key]:e.defaultText||e.key;return i$1(l,i)}};const a=n=>{if(r.has(n))return r.get(n);const e=new u$1(n);return r.set(n,e),e},f$1=async n=>s$1?s$1(n):(await w$1(n),a(n)),y=n=>{s$1=n;};

	const w="legacy",c=new Map,s=m$9("SVGIcons.registry",new Map),i=m$9("SVGIcons.promises",new Map),l="ICON_NOT_FOUND",T=(e,t)=>{c.set(e,t);},N=async e=>{if(!i.has(e)){if(!c.has(e))throw new Error(`No loader registered for the ${e} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);const t=c.get(e);i.set(e,t(e));}return i.get(e)},I=e=>{Object.keys(e.data).forEach(t=>{const o=e.data[t];f(t,{pathData:o.path||o.paths,ltr:o.ltr,accData:o.acc,collection:e.collection,packageName:e.packageName});});},f=(e,t)=>{const o=`${t.collection}/${e}`;s.set(o,{pathData:t.pathData,ltr:t.ltr,accData:t.accData,packageName:t.packageName,customTemplate:t.customTemplate,viewBox:t.viewBox,collection:t.collection});},d=e=>{e.startsWith("sap-icon://")&&(e=e.replace("sap-icon://",""));let t;return [e,t]=e.split("/").reverse(),e=e.replace("icon-",""),t&&(t=n$6(t)),{name:e,collection:t}},u=e=>{const{name:t,collection:o}=d(e);return g(o,t)},n=async e=>{const{name:t,collection:o}=d(e);let r=l;try{r=await N(i$2(o));}catch(a){console.error(a.message);}if(r===l)return r;const p=g(o,t);return p||(Array.isArray(r)?r.forEach(a=>{I(a),c$4(o,{[a.themeFamily||w]:a.collection});}):I(r),g(o,t))},g=(e,t)=>{const o=`${i$2(e)}/${t}`;return s.get(o)},A=async e=>{if(!e)return;let t=u(e);if(t||(t=await n(e)),t&&t!==l&&t.accData)return (await f$1(t.packageName)).getText(t.accData)};

	exports.$ = $$1;
	exports.$$1 = $;
	exports.A = A;
	exports.C = C$1;
	exports.C$1 = C;
	exports.D = D;
	exports.I = I$4;
	exports.L = L$1;
	exports.M = M$1;
	exports.P = P;
	exports.P$1 = P$1;
	exports.S = S$1;
	exports.T = T;
	exports.U = U$2;
	exports.a = a$8;
	exports.a$1 = a$1;
	exports.b = b$1;
	exports.c = c$c;
	exports.c$1 = c$9;
	exports.c$2 = c$b;
	exports.c$3 = c$5;
	exports.c$4 = c$3;
	exports.c$5 = c$8;
	exports.d = d$a;
	exports.d$1 = d$3;
	exports.d$2 = d$2;
	exports.e = e$8;
	exports.e$1 = e$2;
	exports.f = f;
	exports.f$1 = f$4;
	exports.f$2 = f$1;
	exports.f$3 = f$6;
	exports.g = g$7;
	exports.g$1 = g$3;
	exports.g$2 = g$4;
	exports.h = h$2;
	exports.h$1 = h$4;
	exports.h$2 = h$5;
	exports.i = i$f;
	exports.i$1 = i$d;
	exports.i$2 = i$e;
	exports.i$3 = i$b;
	exports.i$4 = i$2;
	exports.l = l$b;
	exports.l$1 = l$3;
	exports.l$2 = l$7;
	exports.l$3 = l$4;
	exports.l$4 = l$8;
	exports.m = m$9;
	exports.m$1 = m$8;
	exports.m$2 = m$1;
	exports.m$3 = m$2;
	exports.n = n;
	exports.n$1 = n$f;
	exports.n$2 = n$d;
	exports.n$3 = n$a;
	exports.o = o$5;
	exports.p = p$3;
	exports.p$1 = p$4;
	exports.r = r$e;
	exports.r$1 = r$4;
	exports.r$2 = r$6;
	exports.s = s$g;
	exports.s$1 = s$2;
	exports.s$2 = s$3;
	exports.t = t$1;
	exports.t$1 = t$3;
	exports.u = u;
	exports.u$1 = u$a;
	exports.u$2 = u$3;
	exports.u$3 = u$1;
	exports.w = w$5;
	exports.w$1 = w$2;
	exports.y = y;

}));
