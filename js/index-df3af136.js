import{r as C,ae as mt,c as W,a as i,af as V,ag as re,f as Ve,ah as gt,ai as bt,d as Q,u as Ue,g as he,aj as yt,b as wt,h as z,t as xt,e as kt,ak as Me,Y as be,al as $t,i as we,j as _t,k as xe,l as S,V as St,m as zt,am as Ct,o as Rt,T as Ae,an as de,ao as ce,z as Be,ap as Tt,aq as It,ar as Vt,as as Mt,at as Bt,au as Dt,a0 as Pt,A as He,J as Nt,S as je,B as L,C as Z,I as o,P as r,U as f,D as l,N as ue,W as k,a9 as P,aa as N,R as Ut,_ as K,av as At,H as Ht,a6 as jt,aw as Et,K as q,$ as Ft,a1 as Ee,L as Ot,F as ke,Q as $e,ax as Lt,ay as Yt,az as ye,aA as Wt,aB as Kt}from"./index-85da7313.js";function De(n){return window.TouchEvent&&n instanceof window.TouchEvent}function Pe(){const n=C(new Map),a=v=>d=>{n.value.set(v,d)};return mt(()=>n.value.clear()),[n,a]}const Gt=W([i("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[V("reverse",[i("slider-handles",[i("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),i("slider-dots",[i("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),V("vertical",[i("slider-handles",[i("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),i("slider-marks",[i("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),i("slider-dots",[i("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),V("vertical",`
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[i("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[i("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),i("slider-rail",`
 height: 100%;
 `,[re("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),V("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),i("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[i("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),i("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[i("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),V("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[i("slider-handle",`
 cursor: not-allowed;
 `)]),V("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),W("&:hover",[i("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[re("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),i("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),V("active",[i("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[re("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),i("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),i("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[i("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),i("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[re("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),i("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[i("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[i("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[W("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),W("&:focus",[i("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[W("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),i("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[V("transition-disabled",[i("slider-dot","transition: none;")]),i("slider-dot",`
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
 `,[V("active","border: var(--n-dot-border-active);")])])]),i("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ve()]),i("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[V("top",`
 margin-bottom: 12px;
 `),V("right",`
 margin-left: 12px;
 `),V("bottom",`
 margin-top: 12px;
 `),V("left",`
 margin-right: 12px;
 `),Ve()]),gt(i("slider",[i("slider-dot","background-color: var(--n-dot-color-modal);")])),bt(i("slider",[i("slider-dot","background-color: var(--n-dot-color-popover);")]))]),Jt=0,Xt=Object.assign(Object.assign({},he.props),{to:xe.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ne=Q({name:"Slider",props:Xt,setup(n){const{mergedClsPrefixRef:a,namespaceRef:v,inlineThemeDisabled:d}=Ue(n),h=he("Slider","-slider",Gt,yt,n,a),c=C(null),[p,b]=Pe(),[y,w]=Pe(),$=C(new Set),Y=wt(n),{mergedDisabledRef:U}=Y,H=z(()=>{const{step:e}=n;if(e<=0||e==="mark")return 0;const t=e.toString();let s=0;return t.includes(".")&&(s=t.length-t.indexOf(".")-1),s}),E=C(n.defaultValue),G=xt(n,"value"),F=kt(G,E),M=z(()=>{const{value:e}=F;return(n.range?e:[e]).map(Ce)}),ee=z(()=>M.value.length>2),g=z(()=>n.placement===void 0?n.vertical?"right":"top":n.placement),_=z(()=>{const{marks:e}=n;return e?Object.keys(e).map(parseFloat):null}),m=C(-1),j=C(-1),D=C(-1),B=C(!1),te=C(!1),ve=z(()=>{const{vertical:e,reverse:t}=n;return e?t?"top":"bottom":t?"right":"left"}),Fe=z(()=>{if(ee.value)return;const e=M.value,t=ne(n.range?Math.min(...e):n.min),s=ne(n.range?Math.max(...e):e[0]),{value:u}=ve;return n.vertical?{[u]:`${t}%`,height:`${s-t}%`}:{[u]:`${t}%`,width:`${s-t}%`}}),Oe=z(()=>{const e=[],{marks:t}=n;if(t){const s=M.value.slice();s.sort((T,I)=>T-I);const{value:u}=ve,{value:x}=ee,{range:R}=n,A=x?()=>!1:T=>R?T>=s[0]&&T<=s[s.length-1]:T<=s[0];for(const T of Object.keys(t)){const I=Number(T);e.push({active:A(I),label:t[T],style:{[u]:`${ne(I)}%`}})}}return e});function Le(e,t){const s=ne(e),{value:u}=ve;return{[u]:`${s}%`,zIndex:t===m.value?1:0}}function _e(e){return n.showTooltip||D.value===e||m.value===e&&B.value}function Ye(e){return B.value?!(m.value===e&&j.value===e):!0}function We(e){var t;~e&&(m.value=e,(t=p.value.get(e))===null||t===void 0||t.focus())}function Ke(){y.value.forEach((e,t)=>{_e(t)&&e.syncPosition()})}function Se(e){const{"onUpdate:value":t,onUpdateValue:s}=n,{nTriggerFormInput:u,nTriggerFormChange:x}=Y;s&&Be(s,e),t&&Be(t,e),E.value=e,u(),x()}function ze(e){const{range:t}=n;if(t){if(Array.isArray(e)){const{value:s}=M;e.join()!==s.join()&&Se(e)}}else Array.isArray(e)||M.value[0]!==e&&Se(e)}function fe(e,t){if(n.range){const s=M.value.slice();s.splice(t,1,e),ze(s)}else ze(e)}function pe(e,t,s){const u=s!==void 0;s||(s=e-t>0?1:-1);const x=_.value||[],{step:R}=n;if(R==="mark"){const I=se(e,x.concat(t),u?s:void 0);return I?I.value:t}if(R<=0)return t;const{value:A}=H;let T;if(u){const I=Number((t/R).toFixed(A)),O=Math.floor(I),me=I>O?O:O-1,ge=I<O?O:O+1;T=se(t,[Number((me*R).toFixed(A)),Number((ge*R).toFixed(A)),...x],s)}else{const I=Je(e);T=se(e,[...x,I])}return T?Ce(T.value):t}function Ce(e){return Math.min(n.max,Math.max(n.min,e))}function ne(e){const{max:t,min:s}=n;return(e-s)/(t-s)*100}function Ge(e){const{max:t,min:s}=n;return s+(t-s)*e}function Je(e){const{step:t,min:s}=n;if(t<=0||t==="mark")return e;const u=Math.round((e-s)/t)*t+s;return Number(u.toFixed(H.value))}function se(e,t=_.value,s){if(!(t!=null&&t.length))return null;let u=null,x=-1;for(;++x<t.length;){const R=t[x]-e,A=Math.abs(R);(s===void 0||R*s>0)&&(u===null||A<u.distance)&&(u={index:x,distance:A,value:t[x]})}return u}function Re(e){const t=c.value;if(!t)return;const s=De(e)?e.touches[0]:e,u=t.getBoundingClientRect();let x;return n.vertical?x=(u.bottom-s.clientY)/u.height:x=(s.clientX-u.left)/u.width,n.reverse&&(x=1-x),Ge(x)}function Xe(e){if(U.value||!n.keyboard)return;const{vertical:t,reverse:s}=n;switch(e.key){case"ArrowUp":e.preventDefault(),oe(t&&s?-1:1);break;case"ArrowRight":e.preventDefault(),oe(!t&&s?-1:1);break;case"ArrowDown":e.preventDefault(),oe(t&&s?1:-1);break;case"ArrowLeft":e.preventDefault(),oe(!t&&s?1:-1);break}}function oe(e){const t=m.value;if(t===-1)return;const{step:s}=n,u=M.value[t],x=s<=0||s==="mark"?u:u+s*e;fe(pe(x,u,e>0?1:-1),t)}function qe(e){var t,s;if(U.value||!De(e)&&e.button!==Jt)return;const u=Re(e);if(u===void 0)return;const x=M.value.slice(),R=n.range?(s=(t=se(u,x))===null||t===void 0?void 0:t.index)!==null&&s!==void 0?s:-1:0;R!==-1&&(e.preventDefault(),We(R),Qe(),fe(pe(u,M.value[R]),R))}function Qe(){B.value||(B.value=!0,de("touchend",document,le),de("mouseup",document,le),de("touchmove",document,ie),de("mousemove",document,ie))}function ae(){B.value&&(B.value=!1,ce("touchend",document,le),ce("mouseup",document,le),ce("touchmove",document,ie),ce("mousemove",document,ie))}function ie(e){const{value:t}=m;if(!B.value||t===-1){ae();return}const s=Re(e);fe(pe(s,M.value[t]),t)}function le(){ae()}function Ze(e){m.value=e,U.value||(D.value=e)}function et(e){m.value===e&&(m.value=-1,ae()),D.value===e&&(D.value=-1)}function tt(e){D.value=e}function nt(e){D.value===e&&(D.value=-1)}Me(m,(e,t)=>void be(()=>j.value=t)),Me(F,()=>{if(n.marks){if(te.value)return;te.value=!0,be(()=>{te.value=!1})}be(Ke)}),$t(()=>{ae()});const Te=z(()=>{const{self:{markFontSize:e,railColor:t,railColorHover:s,fillColor:u,fillColorHover:x,handleColor:R,opacityDisabled:A,dotColor:T,dotColorModal:I,handleBoxShadow:O,handleBoxShadowHover:me,handleBoxShadowActive:ge,handleBoxShadowFocus:st,dotBorder:ot,dotBoxShadow:at,railHeight:it,railWidthVertical:lt,handleSize:rt,dotHeight:dt,dotWidth:ct,dotBorderRadius:ut,fontSize:ht,dotBorderActive:vt,dotColorPopover:ft},common:{cubicBezierEaseInOut:pt}}=h.value;return{"--n-bezier":pt,"--n-dot-border":ot,"--n-dot-border-active":vt,"--n-dot-border-radius":ut,"--n-dot-box-shadow":at,"--n-dot-color":T,"--n-dot-color-modal":I,"--n-dot-color-popover":ft,"--n-dot-height":dt,"--n-dot-width":ct,"--n-fill-color":u,"--n-fill-color-hover":x,"--n-font-size":ht,"--n-handle-box-shadow":O,"--n-handle-box-shadow-active":ge,"--n-handle-box-shadow-focus":st,"--n-handle-box-shadow-hover":me,"--n-handle-color":R,"--n-handle-size":rt,"--n-opacity-disabled":A,"--n-rail-color":t,"--n-rail-color-hover":s,"--n-rail-height":it,"--n-rail-width-vertical":lt,"--n-mark-font-size":e}}),J=d?we("slider",void 0,Te,n):void 0,Ie=z(()=>{const{self:{fontSize:e,indicatorColor:t,indicatorBoxShadow:s,indicatorTextColor:u,indicatorBorderRadius:x}}=h.value;return{"--n-font-size":e,"--n-indicator-border-radius":x,"--n-indicator-box-shadow":s,"--n-indicator-color":t,"--n-indicator-text-color":u}}),X=d?we("slider-indicator",void 0,Ie,n):void 0;return{mergedClsPrefix:a,namespace:v,uncontrolledValue:E,mergedValue:F,mergedDisabled:U,mergedPlacement:g,isMounted:_t(),adjustedTo:xe(n),dotTransitionDisabled:te,markInfos:Oe,isShowTooltip:_e,shouldKeepTooltipTransition:Ye,handleRailRef:c,setHandleRefs:b,setFollowerRefs:w,fillStyle:Fe,getHandleStyle:Le,activeIndex:m,arrifiedValues:M,followerEnabledIndexSet:$,handleRailMouseDown:qe,handleHandleFocus:Ze,handleHandleBlur:et,handleHandleMouseEnter:tt,handleHandleMouseLeave:nt,handleRailKeyDown:Xe,indicatorCssVars:d?void 0:Ie,indicatorThemeClass:X==null?void 0:X.themeClass,indicatorOnRender:X==null?void 0:X.onRender,cssVars:d?void 0:Te,themeClass:J==null?void 0:J.themeClass,onRender:J==null?void 0:J.onRender}},render(){var n;const{mergedClsPrefix:a,themeClass:v,formatTooltip:d}=this;return(n=this.onRender)===null||n===void 0||n.call(this),S("div",{class:[`${a}-slider`,v,{[`${a}-slider--disabled`]:this.mergedDisabled,[`${a}-slider--active`]:this.activeIndex!==-1,[`${a}-slider--with-mark`]:this.marks,[`${a}-slider--vertical`]:this.vertical,[`${a}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},S("div",{class:`${a}-slider-rail`},S("div",{class:`${a}-slider-rail__fill`,style:this.fillStyle}),this.marks?S("div",{class:[`${a}-slider-dots`,this.dotTransitionDisabled&&`${a}-slider-dots--transition-disabled`]},this.markInfos.map(h=>S("div",{key:h.label,class:[`${a}-slider-dot`,{[`${a}-slider-dot--active`]:h.active}],style:h.style}))):null,S("div",{ref:"handleRailRef",class:`${a}-slider-handles`},this.arrifiedValues.map((h,c)=>{const p=this.isShowTooltip(c);return S(St,null,{default:()=>[S(zt,null,{default:()=>S("div",{ref:this.setHandleRefs(c),class:`${a}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,style:this.getHandleStyle(h,c),onFocus:()=>this.handleHandleFocus(c),onBlur:()=>this.handleHandleBlur(c),onMouseenter:()=>this.handleHandleMouseEnter(c),onMouseleave:()=>this.handleHandleMouseLeave(c)},Ct(this.$slots.thumb,()=>[S("div",{class:`${a}-slider-handle`})]))}),this.tooltip&&S(Rt,{ref:this.setFollowerRefs(c),show:p,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(c),teleportDisabled:this.adjustedTo===xe.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>S(Ae,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(c),onEnter:()=>{this.followerEnabledIndexSet.add(c)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(c)}},{default:()=>{var b;return p?((b=this.indicatorOnRender)===null||b===void 0||b.call(this),S("div",{class:[`${a}-slider-handle-indicator`,this.indicatorThemeClass,`${a}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof d=="function"?d(h):h)):null}})})]})})),this.marks?S("div",{class:`${a}-slider-marks`},this.markInfos.map(h=>S("div",{key:h.label,class:`${a}-slider-mark`,style:h.style},h.label))):null))}}),qt=W([W("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),i("spin-container",{position:"relative"},[i("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[Tt()])]),i("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),i("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[V("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),i("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),i("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[V("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Qt={small:20,medium:18,large:16},Zt=Object.assign(Object.assign({},he.props),{description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0}}),en=Q({name:"Spin",props:Zt,setup(n){const{mergedClsPrefixRef:a,inlineThemeDisabled:v}=Ue(n),d=he("Spin","-spin",qt,It,n,a),h=z(()=>{const{size:p}=n,{common:{cubicBezierEaseInOut:b},self:y}=d.value,{opacitySpinning:w,color:$,textColor:Y}=y,U=typeof p=="number"?Vt(p):y[Mt("size",p)];return{"--n-bezier":b,"--n-opacity-spinning":w,"--n-size":U,"--n-color":$,"--n-text-color":Y}}),c=v?we("spin",z(()=>{const{size:p}=n;return typeof p=="number"?String(p):p[0]}),h,n):void 0;return{mergedClsPrefix:a,compitableShow:Bt(n,["spinning","show"]),mergedStrokeWidth:z(()=>{const{strokeWidth:p}=n;if(p!==void 0)return p;const{size:b}=n;return Qt[typeof b=="number"?"medium":b]}),cssVars:v?void 0:h,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var n,a;const{$slots:v,mergedClsPrefix:d,description:h}=this,c=v.icon&&this.rotate,p=(h||v.description)&&S("div",{class:`${d}-spin-description`},h||((n=v.description)===null||n===void 0?void 0:n.call(v))),b=v.icon?S("div",{class:[`${d}-spin-body`,this.themeClass]},S("div",{class:[`${d}-spin`,c&&`${d}-spin--rotate`],style:v.default?"":this.cssVars},v.icon()),p):S("div",{class:[`${d}-spin-body`,this.themeClass]},S(Dt,{clsPrefix:d,style:v.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${d}-spin`}),p);return(a=this.onRender)===null||a===void 0||a.call(this),v.default?S("div",{class:[`${d}-spin-container`,this.themeClass],style:this.cssVars},S("div",{class:[`${d}-spin-content`,this.compitableShow&&`${d}-spin-content--spinning`]},v),S(Ae,{name:"fade-in-transition"},{default:()=>this.compitableShow?b:null})):b}});function tn(){const n=new Date,a=n.getDate(),v=n.getMonth()+1;return`${n.getFullYear()}-${v}-${a}`}const nn={class:"p-4 space-y-5 min-h-[200px]"},sn={class:"space-y-6"},on={class:"flex items-center space-x-4"},an={class:"flex-shrink-0 w-[100px]"},ln={class:"flex-1"},rn={class:"flex items-center space-x-4"},dn={class:"flex-shrink-0 w-[100px]"},cn={class:"w-[200px]"},un={class:"flex items-center space-x-4"},hn={class:"flex-shrink-0 w-[100px]"},vn={class:"flex-1"},fn={class:"flex-shrink-0 w-[100px]"},pn={class:"flex flex-wrap items-center gap-4"},mn={class:"flex items-center space-x-4"},gn={class:"flex-shrink-0 w-[100px]"},bn={class:"flex flex-wrap items-center gap-4"},yn={class:"flex items-center space-x-4"},wn={class:"flex-shrink-0 w-[100px]"},xn={class:"flex flex-wrap items-center gap-4"},kn={class:"flex items-center space-x-4"},$n={class:"flex-shrink-0 w-[100px]"},_n=Q({__name:"General",setup(n){const a=Pt(),v=He(),{isMobile:d}=Nt(),h=je(),c=z(()=>a.theme),p=z(()=>v.userInfo),b=C(p.value.avatar??""),y=C(p.value.name??""),w=C(p.value.description??""),$=z({get(){return a.language},set(g){a.setLanguage(g)}}),Y=[{label:"Auto",key:"auto",icon:"ri:contrast-line"},{label:"Light",key:"light",icon:"ri:sun-foggy-line"},{label:"Dark",key:"dark",icon:"ri:moon-foggy-line"}],U=[{label:"简体中文",key:"zh-CN",value:"zh-CN"},{label:"繁體中文",key:"zh-TW",value:"zh-TW"},{label:"English",key:"en-US",value:"en-US"},{label:"한국어",key:"ko-KR",value:"ko-KR"},{label:"Русский язык",key:"ru-RU",value:"ru-RU"}];function H(g){v.updateUserInfo(g),h.success(q("common.success"))}function E(){v.resetUserInfo(),h.success(q("common.success")),window.location.reload()}function G(){const g=tn(),_=localStorage.getItem("chatStorage")||"{}",m=JSON.stringify(JSON.parse(_),null,2),j=new Blob([m],{type:"application/json"}),D=URL.createObjectURL(j),B=document.createElement("a");B.href=D,B.download=`chat-store_${g}.json`,document.body.appendChild(B),B.click(),document.body.removeChild(B)}function F(g){const _=g.target;if(!_||!_.files)return;const m=_.files[0];if(!m)return;const j=new FileReader;j.onload=()=>{try{const D=JSON.parse(j.result);localStorage.setItem("chatStorage",JSON.stringify(D)),h.success(q("common.success")),location.reload()}catch{h.error(q("common.invalidFileFormat"))}},j.readAsText(m)}function M(){localStorage.removeItem("chatStorage"),location.reload()}function ee(){const g=document.getElementById("fileInput");g&&g.click()}return(g,_)=>(L(),Z("div",nn,[o("div",sn,[o("div",on,[o("span",an,r(g.$t("setting.avatarLink")),1),o("div",ln,[f(l(ue),{value:b.value,"onUpdate:value":_[0]||(_[0]=m=>b.value=m),placeholder:""},null,8,["value"])]),f(l(N),{size:"tiny",text:"",type:"primary",onClick:_[1]||(_[1]=m=>H({avatar:b.value}))},{default:k(()=>[P(r(g.$t("common.save")),1)]),_:1})]),o("div",rn,[o("span",dn,r(g.$t("setting.name")),1),o("div",cn,[f(l(ue),{value:y.value,"onUpdate:value":_[2]||(_[2]=m=>y.value=m),placeholder:""},null,8,["value"])]),f(l(N),{size:"tiny",text:"",type:"primary",onClick:_[3]||(_[3]=m=>H({name:y.value}))},{default:k(()=>[P(r(g.$t("common.save")),1)]),_:1})]),o("div",un,[o("span",hn,r(g.$t("setting.description")),1),o("div",vn,[f(l(ue),{value:w.value,"onUpdate:value":_[4]||(_[4]=m=>w.value=m),placeholder:""},null,8,["value"])]),f(l(N),{size:"tiny",text:"",type:"primary",onClick:_[5]||(_[5]=m=>H({description:w.value}))},{default:k(()=>[P(r(g.$t("common.save")),1)]),_:1})]),o("div",{class:Ut(["flex items-center space-x-4",l(d)&&"items-start"])},[o("span",fn,r(g.$t("setting.chatHistory")),1),o("div",pn,[f(l(N),{size:"small",onClick:G},{icon:k(()=>[f(l(K),{icon:"ri:download-2-fill"})]),default:k(()=>[P(" "+r(g.$t("common.export")),1)]),_:1}),o("input",{id:"fileInput",type:"file",style:{display:"none"},onChange:F},null,32),f(l(N),{size:"small",onClick:ee},{icon:k(()=>[f(l(K),{icon:"ri:upload-2-fill"})]),default:k(()=>[P(" "+r(g.$t("common.import")),1)]),_:1}),f(l(At),{placement:"bottom",onPositiveClick:M},{trigger:k(()=>[f(l(N),{size:"small"},{icon:k(()=>[f(l(K),{icon:"ri:close-circle-line"})]),default:k(()=>[P(" "+r(g.$t("common.clear")),1)]),_:1})]),default:k(()=>[P(" "+r(g.$t("chat.clearHistoryConfirm")),1)]),_:1})])],2),o("div",mn,[o("span",gn,r(g.$t("setting.theme")),1),o("div",bn,[(L(),Z(Ht,null,jt(Y,m=>f(l(N),{key:m.key,size:"small",type:m.key===l(c)?"primary":void 0,onClick:j=>l(a).setTheme(m.key)},{icon:k(()=>[f(l(K),{icon:m.icon},null,8,["icon"])]),_:2},1032,["type","onClick"])),64))])]),o("div",yn,[o("span",wn,r(g.$t("setting.language")),1),o("div",xn,[f(l(Et),{style:{width:"140px"},value:l($),options:U,onUpdateValue:_[6]||(_[6]=m=>l(a).setLanguage(m))},null,8,["value"])])]),o("div",kn,[o("span",$n,r(g.$t("setting.resetUserInfo")),1),f(l(N),{size:"small",onClick:E},{default:k(()=>[P(r(g.$t("common.reset")),1)]),_:1})])])]))}}),Sn={class:"p-4 space-y-5 min-h-[200px]"},zn={class:"space-y-6"},Cn={class:"flex items-center space-x-4"},Rn={class:"flex-shrink-0 w-[120px]"},Tn={class:"flex-1"},In={class:"flex items-center space-x-4"},Vn={class:"flex-shrink-0 w-[120px]"},Mn={class:"flex-1"},Bn={class:"flex items-center space-x-4"},Dn={class:"flex-shrink-0 w-[120px]"},Pn={class:"flex-1"},Nn={class:"flex items-center space-x-4"},Un=o("span",{class:"flex-shrink-0 w-[120px]"}," ",-1),An=Q({__name:"Advanced",setup(n){const a=Ft(),v=je(),d=C(a.systemMessage??""),h=C(a.temperature??.5),c=C(a.top_p??1);function p(y){a.updateSetting(y),v.success(q("common.success"))}function b(){a.resetSetting(),v.success(q("common.success")),window.location.reload()}return(y,w)=>(L(),Z("div",Sn,[o("div",zn,[o("div",Cn,[o("span",Rn,r(y.$t("setting.role")),1),o("div",Tn,[f(l(ue),{value:d.value,"onUpdate:value":w[0]||(w[0]=$=>d.value=$),type:"textarea",autosize:{minRows:1,maxRows:4}},null,8,["value"])]),f(l(N),{size:"tiny",text:"",type:"primary",onClick:w[1]||(w[1]=$=>p({systemMessage:d.value}))},{default:k(()=>[P(r(y.$t("common.save")),1)]),_:1})]),o("div",In,[o("span",Vn,r(y.$t("setting.temperature")),1),o("div",Mn,[f(l(Ne),{value:h.value,"onUpdate:value":w[2]||(w[2]=$=>h.value=$),max:1,min:0,step:.1},null,8,["value","step"])]),o("span",null,r(h.value),1),f(l(N),{size:"tiny",text:"",type:"primary",onClick:w[3]||(w[3]=$=>p({temperature:h.value}))},{default:k(()=>[P(r(y.$t("common.save")),1)]),_:1})]),o("div",Bn,[o("span",Dn,r(y.$t("setting.top_p")),1),o("div",Pn,[f(l(Ne),{value:c.value,"onUpdate:value":w[4]||(w[4]=$=>c.value=$),max:1,min:0,step:.1},null,8,["value","step"])]),o("span",null,r(c.value),1),f(l(N),{size:"tiny",text:"",type:"primary",onClick:w[5]||(w[5]=$=>p({top_p:c.value}))},{default:k(()=>[P(r(y.$t("common.save")),1)]),_:1})]),o("div",Nn,[Un,f(l(N),{size:"small",onClick:b},{default:k(()=>[P(r(y.$t("common.reset")),1)]),_:1})])])]))}}),Hn="jasonYu-web",jn="2.11.0",En="JasonYu Web",Fn="JasonYu",On=["JasonYu"],Ln={dev:"vite",build:"run-p type-check build-only",preview:"vite preview","build-only":"vite build","type-check":"vue-tsc --noEmit",lint:"eslint .","lint:fix":"eslint . --fix",bootstrap:"pnpm install && pnpm run common:prepare","common:cleanup":"rimraf node_modules && rimraf pnpm-lock.yaml","common:prepare":"husky install",serve:"vite preview"},Yn={"@traptitech/markdown-it-katex":"^3.6.0","@vueuse/core":"^9.13.0","highlight.js":"^11.7.0",html2canvas:"^1.4.1",katex:"^0.16.4","markdown-it":"^13.0.1","naive-ui":"^2.34.3",pinia:"^2.0.33","rollup-plugin-terser":"^7.0.2",vue:"^3.2.47","vue-i18n":"^9.2.2","vue-router":"^4.1.6"},Wn={"@antfu/eslint-config":"^0.35.3","@commitlint/cli":"^17.4.4","@commitlint/config-conventional":"^17.4.4","@iconify/vue":"^4.1.0","@types/crypto-js":"^4.1.1","@types/katex":"^0.16.0","@types/markdown-it":"^12.2.3","@types/markdown-it-link-attributes":"^3.0.1","@types/node":"^18.14.6","@vitejs/plugin-vue":"^4.0.0",autoprefixer:"^10.4.13",axios:"^1.3.4","crypto-js":"^4.1.1",eslint:"^8.35.0",husky:"^8.0.3",less:"^4.1.3","lint-staged":"^13.1.2","markdown-it-link-attributes":"^4.0.1","npm-run-all":"^4.1.5",postcss:"^8.4.21",rimraf:"^4.2.0",tailwindcss:"^3.2.7",typescript:"~4.9.5",vite:"^4.2.0","vite-plugin-pwa":"^0.14.4","vue-tsc":"^1.2.0"},Kn={name:Hn,version:jn,private:!1,description:En,author:Fn,keywords:On,scripts:Ln,dependencies:Yn,devDependencies:Wn,"lint-staged":{"*.{ts,tsx,vue}":["pnpm lint:fix"]}},Gn={class:"p-4 space-y-4"},Jn={class:"text-xl font-bold"},Xn=o("div",{class:"p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700"},[o("p",null," 此项目开源于GitHub ，免费且基于 MIT 协议，没有任何形式的付费行为！ ")],-1),qn={key:0},Qn={key:1},Zn=Q({__name:"About",setup(n){const a=Ee(),v=C(!1),d=C(),h=z(()=>!!a.isChatGPTAPI),c=He(),p=z(()=>c.userInfo),b=C(p.value.name??""),y=z(()=>h.value&&b.value==="JasonYuMaster");async function w(){try{if(v.value=!0,y.value){const{data:$}=await Lt();d.value=$}}finally{v.value=!1}}return Ot(()=>{w()}),($,Y)=>(L(),ke(l(en),{show:v.value},{default:k(()=>{var U,H,E,G,F;return[o("div",Gn,[o("h2",Jn," Version - "+r(l(Kn).version),1),Xn,o("p",null,r($.$t("setting.api"))+"："+r(((U=d.value)==null?void 0:U.apiModel)??"-"),1),l(y)?(L(),Z("p",qn,r($.$t("setting.balance"))+"："+r(((H=d.value)==null?void 0:H.balance)??"-")+" ",1)):$e("",!0),l(h)?$e("",!0):(L(),Z("p",Qn,r($.$t("setting.reverseProxy"))+"：- ",1)),o("p",null,r($.$t("setting.timeout"))+"："+r(((E=d.value)==null?void 0:E.timeoutMs)??"-"),1),o("p",null,r($.$t("setting.socks"))+"："+r(((G=d.value)==null?void 0:G.socksProxy)??"-"),1),o("p",null,r($.$t("setting.httpsProxy"))+"："+r(((F=d.value)==null?void 0:F.httpsProxy)??"-"),1)])]}),_:1},8,["show"]))}}),es={class:"ml-2"},ts={class:"min-h-[100px]"},ns={class:"ml-2"},ss={class:"min-h-[100px]"},os={class:"ml-2"},is=Q({__name:"index",props:{visible:{type:Boolean}},emits:["update:visible"],setup(n,{emit:a}){const v=n,d=Ee(),h=z(()=>!!d.isChatGPTAPI),c=C("General"),p=z({get(){return v.visible},set(b){a("update:visible",b)}});return(b,y)=>(L(),ke(l(Kt),{show:l(p),"onUpdate:show":y[1]||(y[1]=w=>Wt(p)?p.value=w:null),"auto-focus":!1,preset:"card",style:{width:"95%","max-width":"640px"}},{default:k(()=>[o("div",null,[f(l(Yt),{value:c.value,"onUpdate:value":y[0]||(y[0]=w=>c.value=w),type:"line",animated:""},{default:k(()=>[f(l(ye),{name:"General",tab:"General"},{tab:k(()=>[f(l(K),{class:"text-lg",icon:"ri:file-user-line"}),o("span",es,r(b.$t("setting.general")),1)]),default:k(()=>[o("div",ts,[f(_n)])]),_:1}),l(h)?(L(),ke(l(ye),{key:0,name:"Advanced",tab:"Advanced"},{tab:k(()=>[f(l(K),{class:"text-lg",icon:"ri:equalizer-line"}),o("span",ns,r(b.$t("setting.advanced")),1)]),default:k(()=>[o("div",ss,[f(An)])]),_:1})):$e("",!0),f(l(ye),{name:"Config",tab:"Config"},{tab:k(()=>[f(l(K),{class:"text-lg",icon:"ri:list-settings-line"}),o("span",os,r(b.$t("setting.config")),1)]),default:k(()=>[f(Zn)]),_:1})]),_:1},8,["value"])])]),_:1},8,["show"]))}});export{is as default};
