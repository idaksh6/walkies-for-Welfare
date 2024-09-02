window.CookieNotice={widget:null,config:{},listeners:[],widgetIsVisible:!1,boot(t,i){var e;this.widget=t,this.config=i,this.initListeners(),this.initPreferences(),this.widget.querySelector("[data-save-preferences]").addEventListener("click",this.savePreferences.bind(this)),(e=document.querySelector("[data-show-cookie-notice-widget]"))==null||e.addEventListener("click",this.showWidget.bind(this))},hideWidget(){this.widgetIsVisible=!1,this.widget.style.display="none"},showWidget(){this.widgetIsVisible=!0,this.widget.style.display="block"},initListeners(){this.on("accepted",t=>{document.querySelectorAll(`[data-consent-group="${t}"]`).forEach(i=>{let e=i.innerHTML;i.remove();let s=document.createElement("script");s.innerHTML=e,s.setAttribute("data-consent-group",t),document.head.appendChild(s)})}),this.on("declined",t=>{document.querySelectorAll(`[data-consent-group="${t}"]`).forEach(i=>{i.setAttribute("type","text/plain")})})},initPreferences(){let t=this.cookieExists(this.config.cookie_name)?JSON.parse(this.getCookie(this.config.cookie_name)):null;t&&t.revision===this.config.revision?(this.hideWidget(),this.config.consent_groups.forEach(i=>{let e=t.consent.find(s=>s.handle===i.handle);e&&(this.widget.querySelector(`[name="group-${i.handle}"]`).checked=e.value,e.value?this.dispatchEvent("accepted",i.handle):this.dispatchEvent("declined",i.handle))})):this.config.consent_groups.filter(i=>i.enable_by_default).forEach(i=>this.widget.querySelector(`[name="group-${i.handle}"]`).checked=!0)},savePreferences(){let t=this.cookieExists(this.config.cookie_name)?JSON.parse(this.getCookie(this.config.cookie_name)).consent:this.config.consent_groups.map(e=>({handle:e.handle,value:!1})),i={revision:this.config.revision,consent:this.config.consent_groups.map(e=>({handle:e.handle,value:!!this.widget.querySelector(`[name="group-${e.handle}"]`).checked}))};this.dispatchEvent("preferences_updated",i),i.consent.forEach(e=>{let s=t.find(n=>n.handle===e.handle);s||(s={handle:e.handle,value:!1}),s.value!==e.value&&(e.value===!0&&this.dispatchEvent("accepted",e.handle),e.value===!1&&this.dispatchEvent("declined",e.handle))}),this.setCookie(this.config.cookie_name,JSON.stringify(i),this.config.cookie_expiry),this.hideWidget()},on(t,i){this.listeners.push({event:t,callback:i})},dispatchEvent(t,i){this.listeners.filter(e=>e.event===t).forEach(e=>e.callback(i))},cookieExists(t){return document.cookie.indexOf(t+"=")!==-1},getCookie(t){const e=`; ${document.cookie}`.split(`; ${t}=`);if(e.length===2)return e.pop().split(";").shift()},setCookie(t,i,e){const s=new Date;s.setTime(s.getTime()+e*24*60*60*1e3),document.cookie=t+"="+i+";expires="+s.toUTCString()+`;domain=${this.config.session.domain};path=/`+(this.config.session.secure?";secure":"")+(this.config.session.same_site?`;samesite=${this.config.session.same_site}`:"")}};
