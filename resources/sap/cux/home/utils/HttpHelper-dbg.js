/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/ui/base/Object","./Constants"],function(e,t,n){"use strict";const s=n["REPO_BASE_URL"];class r extends t{constructor(){super()}static fetchCSRFToken(){return fetch(s,{method:"HEAD",headers:{"X-CSRF-Token":"Fetch"}}).then(e=>{const t=e.headers.get("X-CSRF-Token");if(e.ok&&t){return t}throw new Error("Cannot fetch X-CSRF-Token.")}).catch(t=>{e.error(t.message)})}static Post(t,n){return r.fetchCSRFToken().then(e=>fetch(t,{method:"POST",headers:{"X-CSRF-Token":e,"content-type":"application/json"},body:JSON.stringify(n)})).then(e=>e.json()).catch(t=>{e.error(t.message)})}static GetJSON(t){return fetch(t).then(e=>e.json()).catch(t=>{e.error(t.message)})}}return r});
//# sourceMappingURL=HttpHelper-dbg.js.map