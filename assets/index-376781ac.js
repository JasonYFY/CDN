import{r as z,ad as gt,c as W,a as l,ae as B,af as ce,f as Ve,ag as bt,ah as yt,d as K,u as Ae,g as pe,ai as wt,b as xt,h as S,t as kt,e as $t,aj as Be,Y as xe,ak as _t,i as ke,j as St,k as $e,l as _,V as Ct,m as zt,al as Rt,o as Tt,T as je,am as ue,an as he,z as De,ao as It,ap as Mt,aq as Vt,ar as Bt,as as Dt,at as Nt,$ as Pt,A as _e,J as Ut,R as Ee,B as E,C as Z,I as a,Q as r,S as f,D as i,N as fe,W as g,a7 as A,a8 as j,P as At,_ as J,au as jt,H as Et,a4 as Ft,a9 as Ht,K as Q,av as Ot,aw as Fe,L as Lt,F as ee,U as te,ax as Yt,ay as Jt,az as ve,aA as Wt,aB as Kt}from"./index-6413d5d6.js";function Ne(n){return window.TouchEvent&&n instanceof window.TouchEvent}function Pe(){const n=z(new Map),o=v=>d=>{n.value.set(v,d)};return gt(()=>n.value.clear()),[n,o]}const Gt=W([l("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[B("reverse",[l("slider-handles",[l("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),l("slider-dots",[l("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),B("vertical",[l("slider-handles",[l("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),l("slider-marks",[l("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),l("slider-dots",[l("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),B("vertical",`
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[l("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[l("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),l("slider-rail",`
 height: 100%;
 `,[ce("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),B("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),l("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[l("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),l("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[l("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),B("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[l("slider-handle",`
 cursor: not-allowed;
 `)]),B("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),W("&:hover",[l("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[ce("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),l("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),B("active",[l("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[ce("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),l("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),l("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[l("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),l("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[ce("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),l("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[l("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[l("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[W("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),W("&:focus",[l("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[W("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),l("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[B("transition-disabled",[l("slider-dot","transition: none;")]),l("slider-dot",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[B("active","border: var(--n-dot-border-active);")])])]),l("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ve()]),l("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[B("top",`
 margin-bottom: 12px;
 `),B("right",`
 margin-left: 12px;
 `),B("bottom",`
 margin-top: 12px;
 `),B("left",`
 margin-right: 12px;
 `),Ve()]),bt(l("slider",[l("slider-dot","background-color: var(--n-dot-color-modal);")])),yt(l("slider",[l("slider-dot","background-color: var(--n-dot-color-popover);")]))]),Xt=0,qt=Object.assign(Object.assign({},pe.props),{to:$e.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ue=K({name:"Slider",props:qt,setup(n){const{mergedClsPrefixRef:o,namespaceRef:v,inlineThemeDisabled:d}=Ae(n),c=pe("Slider","-slider",Gt,wt,n,o),u=z(null),[p,k]=Pe(),[C,x]=Pe(),y=z(new Set),D=xt(n),{mergedDisabledRef:T}=D,N=S(()=>{const{step:e}=n;if(e<=0||e==="mark")return 0;const t=e.toString();let s=0;return t.includes(".")&&(s=t.length-t.indexOf(".")-1),s}),O=z(n.defaultValue),G=kt(n,"value"),L=$t(G,O),I=S(()=>{const{value:e}=L;return(n.range?e:[e]).map(Re)}),ne=S(()=>I.value.length>2),b=S(()=>n.placement===void 0?n.vertical?"right":"top":n.placement),$=S(()=>{const{marks:e}=n;return e?Object.keys(e).map(parseFloat):null}),m=z(-1),H=z(-1),U=z(-1),P=z(!1),se=z(!1),me=S(()=>{const{vertical:e,reverse:t}=n;return e?t?"top":"bottom":t?"right":"left"}),Oe=S(()=>{if(ne.value)return;const e=I.value,t=ae(n.range?Math.min(...e):n.min),s=ae(n.range?Math.max(...e):e[0]),{value:h}=me;return n.vertical?{[h]:`${t}%`,height:`${s-t}%`}:{[h]:`${t}%`,width:`${s-t}%`}}),Le=S(()=>{const e=[],{marks:t}=n;if(t){const s=I.value.slice();s.sort((M,V)=>M-V);const{value:h}=me,{value:w}=ne,{range:R}=n,F=w?()=>!1:M=>R?M>=s[0]&&M<=s[s.length-1]:M<=s[0];for(const M of Object.keys(t)){const V=Number(M);e.push({active:F(V),label:t[M],style:{[h]:`${ae(V)}%`}})}}return e});function Ye(e,t){const s=ae(e),{value:h}=me;return{[h]:`${s}%`,zIndex:t===m.value?1:0}}function Se(e){return n.showTooltip||U.value===e||m.value===e&&P.value}function Je(e){return P.value?!(m.value===e&&H.value===e):!0}function We(e){var t;~e&&(m.value=e,(t=p.value.get(e))===null||t===void 0||t.focus())}function Ke(){C.value.forEach((e,t)=>{Se(t)&&e.syncPosition()})}function Ce(e){const{"onUpdate:value":t,onUpdateValue:s}=n,{nTriggerFormInput:h,nTriggerFormChange:w}=D;s&&De(s,e),t&&De(t,e),O.value=e,h(),w()}function ze(e){const{range:t}=n;if(t){if(Array.isArray(e)){const{value:s}=I;e.join()!==s.join()&&Ce(e)}}else Array.isArray(e)||I.value[0]!==e&&Ce(e)}function ge(e,t){if(n.range){const s=I.value.slice();s.splice(t,1,e),ze(s)}else ze(e)}function be(e,t,s){const h=s!==void 0;s||(s=e-t>0?1:-1);const w=$.value||[],{step:R}=n;if(R==="mark"){const V=oe(e,w.concat(t),h?s:void 0);return V?V.value:t}if(R<=0)return t;const{value:F}=N;let M;if(h){const V=Number((t/R).toFixed(F)),Y=Math.floor(V),ye=V>Y?Y:Y-1,we=V<Y?Y:Y+1;M=oe(t,[Number((ye*R).toFixed(F)),Number((we*R).toFixed(F)),...w],s)}else{const V=Xe(e);M=oe(e,[...w,V])}return M?Re(M.value):t}function Re(e){return Math.min(n.max,Math.max(n.min,e))}function ae(e){const{max:t,min:s}=n;return(e-s)/(t-s)*100}function Ge(e){const{max:t,min:s}=n;return s+(t-s)*e}function Xe(e){const{step:t,min:s}=n;if(t<=0||t==="mark")return e;const h=Math.round((e-s)/t)*t+s;return Number(h.toFixed(N.value))}function oe(e,t=$.value,s){if(!(t!=null&&t.length))return null;let h=null,w=-1;for(;++w<t.length;){const R=t[w]-e,F=Math.abs(R);(s===void 0||R*s>0)&&(h===null||F<h.distance)&&(h={index:w,distance:F,value:t[w]})}return h}function Te(e){const t=u.value;if(!t)return;const s=Ne(e)?e.touches[0]:e,h=t.getBoundingClientRect();let w;return n.vertical?w=(h.bottom-s.clientY)/h.height:w=(s.clientX-h.left)/h.width,n.reverse&&(w=1-w),Ge(w)}function qe(e){if(T.value||!n.keyboard)return;const{vertical:t,reverse:s}=n;switch(e.key){case"ArrowUp":e.preventDefault(),ie(t&&s?-1:1);break;case"ArrowRight":e.preventDefault(),ie(!t&&s?-1:1);break;case"ArrowDown":e.preventDefault(),ie(t&&s?1:-1);break;case"ArrowLeft":e.preventDefault(),ie(!t&&s?1:-1);break}}function ie(e){const t=m.value;if(t===-1)return;const{step:s}=n,h=I.value[t],w=s<=0||s==="mark"?h:h+s*e;ge(be(w,h,e>0?1:-1),t)}function Qe(e){var t,s;if(T.value||!Ne(e)&&e.button!==Xt)return;const h=Te(e);if(h===void 0)return;const w=I.value.slice(),R=n.range?(s=(t=oe(h,w))===null||t===void 0?void 0:t.index)!==null&&s!==void 0?s:-1:0;R!==-1&&(e.preventDefault(),We(R),Ze(),ge(be(h,I.value[R]),R))}function Ze(){P.value||(P.value=!0,ue("touchend",document,de),ue("mouseup",document,de),ue("touchmove",document,re),ue("mousemove",document,re))}function le(){P.value&&(P.value=!1,he("touchend",document,de),he("mouseup",document,de),he("touchmove",document,re),he("mousemove",document,re))}function re(e){const{value:t}=m;if(!P.value||t===-1){le();return}const s=Te(e);ge(be(s,I.value[t]),t)}function de(){le()}function et(e){m.value=e,T.value||(U.value=e)}function tt(e){m.value===e&&(m.value=-1,le()),U.value===e&&(U.value=-1)}function nt(e){U.value=e}function st(e){U.value===e&&(U.value=-1)}Be(m,(e,t)=>void xe(()=>H.value=t)),Be(L,()=>{if(n.marks){if(se.value)return;se.value=!0,xe(()=>{se.value=!1})}xe(Ke)}),_t(()=>{le()});const Ie=S(()=>{const{self:{markFontSize:e,railColor:t,railColorHover:s,fillColor:h,fillColorHover:w,handleColor:R,opacityDisabled:F,dotColor:M,dotColorModal:V,handleBoxShadow:Y,handleBoxShadowHover:ye,handleBoxShadowActive:we,handleBoxShadowFocus:at,dotBorder:ot,dotBoxShadow:it,railHeight:lt,railWidthVertical:rt,handleSize:dt,dotHeight:ct,dotWidth:ut,dotBorderRadius:ht,fontSize:vt,dotBorderActive:ft,dotColorPopover:pt},common:{cubicBezierEaseInOut:mt}}=c.value;return{"--n-bezier":mt,"--n-dot-border":ot,"--n-dot-border-active":ft,"--n-dot-border-radius":ht,"--n-dot-box-shadow":it,"--n-dot-color":M,"--n-dot-color-modal":V,"--n-dot-color-popover":pt,"--n-dot-height":ct,"--n-dot-width":ut,"--n-fill-color":h,"--n-fill-color-hover":w,"--n-font-size":vt,"--n-handle-box-shadow":Y,"--n-handle-box-shadow-active":we,"--n-handle-box-shadow-focus":at,"--n-handle-box-shadow-hover":ye,"--n-handle-color":R,"--n-handle-size":dt,"--n-opacity-disabled":F,"--n-rail-color":t,"--n-rail-color-hover":s,"--n-rail-height":lt,"--n-rail-width-vertical":rt,"--n-mark-font-size":e}}),X=d?ke("slider",void 0,Ie,n):void 0,Me=S(()=>{const{self:{fontSize:e,indicatorColor:t,indicatorBoxShadow:s,indicatorTextColor:h,indicatorBorderRadius:w}}=c.value;return{"--n-font-size":e,"--n-indicator-border-radius":w,"--n-indicator-box-shadow":s,"--n-indicator-color":t,"--n-indicator-text-color":h}}),q=d?ke("slider-indicator",void 0,Me,n):void 0;return{mergedClsPrefix:o,namespace:v,uncontrolledValue:O,mergedValue:L,mergedDisabled:T,mergedPlacement:b,isMounted:St(),adjustedTo:$e(n),dotTransitionDisabled:se,markInfos:Le,isShowTooltip:Se,shouldKeepTooltipTransition:Je,handleRailRef:u,setHandleRefs:k,setFollowerRefs:x,fillStyle:Oe,getHandleStyle:Ye,activeIndex:m,arrifiedValues:I,followerEnabledIndexSet:y,handleRailMouseDown:Qe,handleHandleFocus:et,handleHandleBlur:tt,handleHandleMouseEnter:nt,handleHandleMouseLeave:st,handleRailKeyDown:qe,indicatorCssVars:d?void 0:Me,indicatorThemeClass:q==null?void 0:q.themeClass,indicatorOnRender:q==null?void 0:q.onRender,cssVars:d?void 0:Ie,themeClass:X==null?void 0:X.themeClass,onRender:X==null?void 0:X.onRender}},render(){var n;const{mergedClsPrefix:o,themeClass:v,formatTooltip:d}=this;return(n=this.onRender)===null||n===void 0||n.call(this),_("div",{class:[`${o}-slider`,v,{[`${o}-slider--disabled`]:this.mergedDisabled,[`${o}-slider--active`]:this.activeIndex!==-1,[`${o}-slider--with-mark`]:this.marks,[`${o}-slider--vertical`]:this.vertical,[`${o}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},_("div",{class:`${o}-slider-rail`},_("div",{class:`${o}-slider-rail__fill`,style:this.fillStyle}),this.marks?_("div",{class:[`${o}-slider-dots`,this.dotTransitionDisabled&&`${o}-slider-dots--transition-disabled`]},this.markInfos.map(c=>_("div",{key:c.label,class:[`${o}-slider-dot`,{[`${o}-slider-dot--active`]:c.active}],style:c.style}))):null,_("div",{ref:"handleRailRef",class:`${o}-slider-handles`},this.arrifiedValues.map((c,u)=>{const p=this.isShowTooltip(u);return _(Ct,null,{default:()=>[_(zt,null,{default:()=>_("div",{ref:this.setHandleRefs(u),class:`${o}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,style:this.getHandleStyle(c,u),onFocus:()=>this.handleHandleFocus(u),onBlur:()=>this.handleHandleBlur(u),onMouseenter:()=>this.handleHandleMouseEnter(u),onMouseleave:()=>this.handleHandleMouseLeave(u)},Rt(this.$slots.thumb,()=>[_("div",{class:`${o}-slider-handle`})]))}),this.tooltip&&_(Tt,{ref:this.setFollowerRefs(u),show:p,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(u),teleportDisabled:this.adjustedTo===$e.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>_(je,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(u),onEnter:()=>{this.followerEnabledIndexSet.add(u)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(u)}},{default:()=>{var k;return p?((k=this.indicatorOnRender)===null||k===void 0||k.call(this),_("div",{class:[`${o}-slider-handle-indicator`,this.indicatorThemeClass,`${o}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof d=="function"?d(c):c)):null}})})]})})),this.marks?_("div",{class:`${o}-slider-marks`},this.markInfos.map(c=>_("div",{key:c.label,class:`${o}-slider-mark`,style:c.style},c.label))):null))}}),Qt=W([W("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),l("spin-container",{position:"relative"},[l("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[It()])]),l("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),l("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[B("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),l("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),l("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[B("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Zt={small:20,medium:18,large:16},en=Object.assign(Object.assign({},pe.props),{description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0}}),He=K({name:"Spin",props:en,setup(n){const{mergedClsPrefixRef:o,inlineThemeDisabled:v}=Ae(n),d=pe("Spin","-spin",Qt,Mt,n,o),c=S(()=>{const{size:p}=n,{common:{cubicBezierEaseInOut:k},self:C}=d.value,{opacitySpinning:x,color:y,textColor:D}=C,T=typeof p=="number"?Vt(p):C[Bt("size",p)];return{"--n-bezier":k,"--n-opacity-spinning":x,"--n-size":T,"--n-color":y,"--n-text-color":D}}),u=v?ke("spin",S(()=>{const{size:p}=n;return typeof p=="number"?String(p):p[0]}),c,n):void 0;return{mergedClsPrefix:o,compitableShow:Dt(n,["spinning","show"]),mergedStrokeWidth:S(()=>{const{strokeWidth:p}=n;if(p!==void 0)return p;const{size:k}=n;return Zt[typeof k=="number"?"medium":k]}),cssVars:v?void 0:c,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){var n,o;const{$slots:v,mergedClsPrefix:d,description:c}=this,u=v.icon&&this.rotate,p=(c||v.description)&&_("div",{class:`${d}-spin-description`},c||((n=v.description)===null||n===void 0?void 0:n.call(v))),k=v.icon?_("div",{class:[`${d}-spin-body`,this.themeClass]},_("div",{class:[`${d}-spin`,u&&`${d}-spin--rotate`],style:v.default?"":this.cssVars},v.icon()),p):_("div",{class:[`${d}-spin-body`,this.themeClass]},_(Nt,{clsPrefix:d,style:v.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${d}-spin`}),p);return(o=this.onRender)===null||o===void 0||o.call(this),v.default?_("div",{class:[`${d}-spin-container`,this.themeClass],style:this.cssVars},_("div",{class:[`${d}-spin-content`,this.compitableShow&&`${d}-spin-content--spinning`]},v),_(je,{name:"fade-in-transition"},{default:()=>this.compitableShow?k:null})):k}});function tn(){const n=new Date,o=n.getDate(),v=n.getMonth()+1;return`${n.getFullYear()}-${v}-${o}`}const nn={class:"p-4 space-y-5 min-h-[200px]"},sn={class:"space-y-6"},an={class:"flex items-center space-x-4"},on={class:"flex-shrink-0 w-[100px]"},ln={class:"flex-1"},rn={class:"flex items-center space-x-4"},dn={class:"flex-shrink-0 w-[100px]"},cn={class:"w-[200px]"},un={class:"flex items-center space-x-4"},hn={class:"flex-shrink-0 w-[100px]"},vn={class:"flex-1"},fn={class:"flex-shrink-0 w-[100px]"},pn={class:"flex flex-wrap items-center gap-4"},mn={class:"flex items-center space-x-4"},gn={class:"flex-shrink-0 w-[100px]"},bn={class:"flex flex-wrap items-center gap-4"},yn={class:"flex items-center space-x-4"},wn={class:"flex-shrink-0 w-[100px]"},xn={class:"flex flex-wrap items-center gap-4"},kn={class:"flex items-center space-x-4"},$n={class:"flex-shrink-0 w-[100px]"},_n=K({__name:"General",setup(n){const o=Pt(),v=_e(),{isMobile:d}=Ut(),c=Ee(),u=S(()=>o.theme),p=S(()=>v.userInfo),k=z(p.value.avatar??""),C=z(p.value.name??""),x=z(p.value.description??""),y=S({get(){return o.language},set(b){o.setLanguage(b)}}),D=[{label:"Auto",key:"auto",icon:"ri:contrast-line"},{label:"Light",key:"light",icon:"ri:sun-foggy-line"},{label:"Dark",key:"dark",icon:"ri:moon-foggy-line"}],T=[{label:"简体中文",key:"zh-CN",value:"zh-CN"},{label:"繁體中文",key:"zh-TW",value:"zh-TW"},{label:"English",key:"en-US",value:"en-US"},{label:"한국어",key:"ko-KR",value:"ko-KR"},{label:"Русский язык",key:"ru-RU",value:"ru-RU"}];function N(b){v.updateUserInfo(b),c.success(Q("common.success"))}function O(){v.resetUserInfo(),c.success(Q("common.success")),window.location.reload()}function G(){const b=tn(),$=localStorage.getItem("chatStorage")||"{}",m=JSON.stringify(JSON.parse($),null,2),H=new Blob([m],{type:"application/json"}),U=URL.createObjectURL(H),P=document.createElement("a");P.href=U,P.download=`chat-store_${b}.json`,document.body.appendChild(P),P.click(),document.body.removeChild(P)}function L(b){const $=b.target;if(!$||!$.files)return;const m=$.files[0];if(!m)return;const H=new FileReader;H.onload=()=>{try{const U=JSON.parse(H.result);localStorage.setItem("chatStorage",JSON.stringify(U)),c.success(Q("common.success")),location.reload()}catch{c.error(Q("common.invalidFileFormat"))}},H.readAsText(m)}function I(){localStorage.removeItem("chatStorage"),location.reload()}function ne(){const b=document.getElementById("fileInput");b&&b.click()}return(b,$)=>(E(),Z("div",nn,[a("div",sn,[a("div",an,[a("span",on,r(b.$t("setting.avatarLink")),1),a("div",ln,[f(i(fe),{value:k.value,"onUpdate:value":$[0]||($[0]=m=>k.value=m),placeholder:""},null,8,["value"])]),f(i(j),{size:"tiny",text:"",type:"primary",onClick:$[1]||($[1]=m=>N({avatar:k.value}))},{default:g(()=>[A(r(b.$t("common.save")),1)]),_:1})]),a("div",rn,[a("span",dn,r(b.$t("setting.name")),1),a("div",cn,[f(i(fe),{value:C.value,"onUpdate:value":$[2]||($[2]=m=>C.value=m),placeholder:""},null,8,["value"])]),f(i(j),{size:"tiny",text:"",type:"primary",onClick:$[3]||($[3]=m=>N({name:C.value}))},{default:g(()=>[A(r(b.$t("common.save")),1)]),_:1})]),a("div",un,[a("span",hn,r(b.$t("setting.description")),1),a("div",vn,[f(i(fe),{value:x.value,"onUpdate:value":$[4]||($[4]=m=>x.value=m),placeholder:""},null,8,["value"])]),f(i(j),{size:"tiny",text:"",type:"primary",onClick:$[5]||($[5]=m=>N({description:x.value}))},{default:g(()=>[A(r(b.$t("common.save")),1)]),_:1})]),a("div",{class:At(["flex items-center space-x-4",i(d)&&"items-start"])},[a("span",fn,r(b.$t("setting.chatHistory")),1),a("div",pn,[f(i(j),{size:"small",onClick:G},{icon:g(()=>[f(i(J),{icon:"ri:download-2-fill"})]),default:g(()=>[A(" "+r(b.$t("common.export")),1)]),_:1}),a("input",{id:"fileInput",type:"file",style:{display:"none"},onChange:L},null,32),f(i(j),{size:"small",onClick:ne},{icon:g(()=>[f(i(J),{icon:"ri:upload-2-fill"})]),default:g(()=>[A(" "+r(b.$t("common.import")),1)]),_:1}),f(i(jt),{placement:"bottom",onPositiveClick:I},{trigger:g(()=>[f(i(j),{size:"small"},{icon:g(()=>[f(i(J),{icon:"ri:close-circle-line"})]),default:g(()=>[A(" "+r(b.$t("common.clear")),1)]),_:1})]),default:g(()=>[A(" "+r(b.$t("chat.clearHistoryConfirm")),1)]),_:1})])],2),a("div",mn,[a("span",gn,r(b.$t("setting.theme")),1),a("div",bn,[(E(),Z(Et,null,Ft(D,m=>f(i(j),{key:m.key,size:"small",type:m.key===i(u)?"primary":void 0,onClick:H=>i(o).setTheme(m.key)},{icon:g(()=>[f(i(J),{icon:m.icon},null,8,["icon"])]),_:2},1032,["type","onClick"])),64))])]),a("div",yn,[a("span",wn,r(b.$t("setting.language")),1),a("div",xn,[f(i(Ht),{style:{width:"140px"},value:i(y),options:T,onUpdateValue:$[6]||($[6]=m=>i(o).setLanguage(m))},null,8,["value"])])]),a("div",kn,[a("span",$n,r(b.$t("setting.resetUserInfo")),1),f(i(j),{size:"small",onClick:O},{default:g(()=>[A(r(b.$t("common.reset")),1)]),_:1})])])]))}}),Sn={class:"p-4 space-y-5 min-h-[200px]"},Cn={class:"space-y-6"},zn={class:"flex items-center space-x-4"},Rn={class:"flex-shrink-0 w-[120px]"},Tn={class:"flex-1"},In={class:"flex items-center space-x-4"},Mn={class:"flex-shrink-0 w-[120px]"},Vn={class:"flex-1"},Bn={class:"flex items-center space-x-4"},Dn={class:"flex-shrink-0 w-[120px]"},Nn={class:"flex-1"},Pn={class:"flex items-center space-x-4"},Un=a("span",{class:"flex-shrink-0 w-[120px]"}," ",-1),An=K({__name:"Advanced",setup(n){const o=Ot(),v=Ee(),d=z(o.systemMessage??""),c=z(o.temperature??.5),u=z(o.top_p??1);function p(C){o.updateSetting(C),v.success(Q("common.success"))}function k(){o.resetSetting(),v.success(Q("common.success")),window.location.reload()}return(C,x)=>(E(),Z("div",Sn,[a("div",Cn,[a("div",zn,[a("span",Rn,r(C.$t("setting.role")),1),a("div",Tn,[f(i(fe),{value:d.value,"onUpdate:value":x[0]||(x[0]=y=>d.value=y),type:"textarea",autosize:{minRows:1,maxRows:4}},null,8,["value"])]),f(i(j),{size:"tiny",text:"",type:"primary",onClick:x[1]||(x[1]=y=>p({systemMessage:d.value}))},{default:g(()=>[A(r(C.$t("common.save")),1)]),_:1})]),a("div",In,[a("span",Mn,r(C.$t("setting.temperature")),1),a("div",Vn,[f(i(Ue),{value:c.value,"onUpdate:value":x[2]||(x[2]=y=>c.value=y),max:2,min:0,step:.1},null,8,["value","step"])]),a("span",null,r(c.value),1),f(i(j),{size:"tiny",text:"",type:"primary",onClick:x[3]||(x[3]=y=>p({temperature:c.value}))},{default:g(()=>[A(r(C.$t("common.save")),1)]),_:1})]),a("div",Bn,[a("span",Dn,r(C.$t("setting.top_p")),1),a("div",Nn,[f(i(Ue),{value:u.value,"onUpdate:value":x[4]||(x[4]=y=>u.value=y),max:1,min:0,step:.1},null,8,["value","step"])]),a("span",null,r(u.value),1),f(i(j),{size:"tiny",text:"",type:"primary",onClick:x[5]||(x[5]=y=>p({top_p:u.value}))},{default:g(()=>[A(r(C.$t("common.save")),1)]),_:1})]),a("div",Pn,[Un,f(i(j),{size:"small",onClick:k},{default:g(()=>[A(r(C.$t("common.reset")),1)]),_:1})])])]))}}),jn="jasonYu-web",En="2.11.0",Fn="JasonYu Web",Hn="JasonYu",On=["JasonYu"],Ln={dev:"vite",build:"run-p type-check build-only",preview:"vite preview","build-only":"vite build","type-check":"vue-tsc --noEmit",lint:"eslint .","lint:fix":"eslint . --fix",bootstrap:"pnpm install && pnpm run common:prepare","common:cleanup":"rimraf node_modules && rimraf pnpm-lock.yaml","common:prepare":"husky install",serve:"vite preview"},Yn={"@traptitech/markdown-it-katex":"^3.6.0","@vueuse/core":"^9.13.0","highlight.js":"^11.7.0",html2canvas:"^1.4.1",katex:"^0.16.4","markdown-it":"^13.0.1","naive-ui":"^2.34.3",pinia:"^2.0.33",vue:"^3.2.47","vue-i18n":"^9.2.2","vue-router":"^4.1.6"},Jn={"@antfu/eslint-config":"^0.35.3","@commitlint/cli":"^17.4.4","@commitlint/config-conventional":"^17.4.4","@iconify/vue":"^4.1.0","@types/crypto-js":"^4.1.1","@types/katex":"^0.16.0","@types/markdown-it":"^12.2.3","@types/markdown-it-link-attributes":"^3.0.1","@types/node":"^18.14.6","@vitejs/plugin-vue":"^4.0.0",autoprefixer:"^10.4.13",axios:"^1.3.4","crypto-js":"^4.1.1",eslint:"^8.35.0",husky:"^8.0.3",less:"^4.1.3","lint-staged":"^13.1.2","markdown-it-link-attributes":"^4.0.1","npm-run-all":"^4.1.5",postcss:"^8.4.21",rimraf:"^4.3.0",tailwindcss:"^3.2.7",typescript:"~4.9.5",vite:"^4.2.0","vite-plugin-cdn-import":"^0.3.5","vite-plugin-pwa":"^0.14.4","vue-tsc":"^1.2.0"},Wn={name:jn,version:En,private:!1,description:Fn,author:Hn,keywords:On,scripts:Ln,dependencies:Yn,devDependencies:Jn,"lint-staged":{"*.{ts,tsx,vue}":["pnpm lint:fix"]}},Kn={class:"p-4 space-y-4"},Gn={class:"text-xl font-bold"},Xn=a("div",{class:"p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700"},[a("p",null," 此项目开源于GitHub ，免费且基于 MIT 协议，没有任何形式的付费行为！ ")],-1),qn={key:0},Qn={key:1},Zn={key:2},es=K({__name:"About",setup(n){const o=Fe(),v=z(!1),d=z(),c=S(()=>!!o.isChatGPTAPI),u=_e(),p=S(()=>u.userInfo),k=z(p.value.name??""),C=S(()=>k.value==="JasonYuMaster");async function x(){try{if(v.value=!0,C.value){const{data:y}=await Yt();d.value=y}}finally{v.value=!1}}return Lt(()=>{x()}),(y,D)=>(E(),ee(i(He),{show:v.value},{default:g(()=>{var T,N,O,G,L,I;return[a("div",Kn,[a("h2",Gn," Version - "+r(i(Wn).version),1),Xn,a("p",null,r(y.$t("setting.api"))+"："+r(((T=d.value)==null?void 0:T.apiModel)??"-"),1),i(c)?(E(),Z("p",qn,r(y.$t("setting.balance"))+"："+r(((N=d.value)==null?void 0:N.balance)??"-")+" ",1)):te("",!0),i(c)?te("",!0):(E(),Z("p",Qn,r(y.$t("setting.reverseProxy"))+"：- ",1)),i(c)?te("",!0):(E(),Z("p",Zn,r(y.$t("setting.accessTokenExpirationTime"))+"："+r(((O=d.value)==null?void 0:O.accessTokenExpirationTime)??"-"),1)),a("p",null,r(y.$t("setting.timeout"))+"："+r(((G=d.value)==null?void 0:G.timeoutMs)??"-"),1),a("p",null,r(y.$t("setting.socks"))+"："+r(((L=d.value)==null?void 0:L.socksProxy)??"-"),1),a("p",null,r(y.$t("setting.httpsProxy"))+"："+r(((I=d.value)==null?void 0:I.httpsProxy)??"-"),1)])]}),_:1},8,["show"]))}}),ts=a("div",{class:"p-4 space-y-4"},[a("div",{class:"p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700"},[a("p",null," 如果你觉得这个网站对你有帮助，并且情况允许的话，可以给我一点点支持，总之非常感谢支持～ "),a("p",null,[a("img",{style:{height:"270px"},src:"https://cdn.jsdelivr.net/gh/JasonYFY/CDN/images/wechatReceipt.jpg"})])])],-1),ns=K({__name:"donate",setup(n){const o=z(!1);return(v,d)=>(E(),ee(i(He),{show:o.value},{default:g(()=>[ts]),_:1},8,["show"]))}}),ss={class:"ml-2"},as={class:"min-h-[100px]"},os={class:"ml-2"},is={class:"min-h-[100px]"},ls={class:"ml-2"},rs={class:"ml-2"},cs=K({__name:"index",props:{visible:{type:Boolean}},emits:["update:visible"],setup(n,{emit:o}){const v=n,d=Fe(),c=S(()=>!!d.isChatGPTAPI),u=z("General"),p=S({get(){return v.visible},set(D){o("update:visible",D)}}),k=_e(),C=S(()=>k.userInfo),x=z(C.value.name??""),y=S(()=>x.value==="JasonYuMaster");return(D,T)=>(E(),ee(i(Kt),{show:i(p),"onUpdate:show":T[1]||(T[1]=N=>Wt(p)?p.value=N:null),"auto-focus":!1,preset:"card",style:{width:"95%","max-width":"640px"}},{default:g(()=>[a("div",null,[f(i(Jt),{value:u.value,"onUpdate:value":T[0]||(T[0]=N=>u.value=N),type:"line",animated:""},{default:g(()=>[f(i(ve),{name:"General",tab:"General"},{tab:g(()=>[f(i(J),{class:"text-lg",icon:"ri:file-user-line"}),a("span",ss,r(D.$t("setting.general")),1)]),default:g(()=>[a("div",as,[f(_n)])]),_:1}),i(c)?(E(),ee(i(ve),{key:0,name:"Advanced",tab:"Advanced"},{tab:g(()=>[f(i(J),{class:"text-lg",icon:"ri:equalizer-line"}),a("span",os,r(D.$t("setting.advanced")),1)]),default:g(()=>[a("div",is,[f(An)])]),_:1})):te("",!0),i(y)?(E(),ee(i(ve),{key:1,name:"Config",tab:"Config"},{tab:g(()=>[f(i(J),{class:"text-lg",icon:"ri:list-settings-line"}),a("span",ls,r(D.$t("setting.config")),1)]),default:g(()=>[f(es)]),_:1})):te("",!0),f(i(ve),{name:"donate",tab:"donate"},{tab:g(()=>[f(i(J),{class:"text-lg",icon:"ri:hand-heart-line"}),a("span",rs,r(D.$t("setting.donate")),1)]),default:g(()=>[f(ns)]),_:1})]),_:1},8,["value"])])]),_:1},8,["show"]))}});export{cs as default};
