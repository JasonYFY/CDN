/*! For license information please see cib.bundle.js.LICENSE.txt */
  ${OnceDirective_once((O=>O.fateLink),html`
  <a
    h="${O=>O.h}"
    href="${O=>O.link}"
    title="${O=>O.title}"
    target="_blank"
    @click=${(O,B)=>O.handleLinkClick(B.event)}
    >${O=>O.sourceCaption}</a
  >
`)}
`;html`
   <cib-message-attributions :vm=${O=>O}></cib-message-attributions>
`;let cC=class extends MessageViewModelBase{constructor(O,B,U,G,q,j,W,Y,K,Q,Z,X,J){super(B,U,K,Z,J),this.cards=O,this.conversation=G,this.hoverCard=q,this.turnCounter=j,this.feedbackDialog=W,this.vmFactory=Y,this.katex=Q,this.perfTracker=X,this.turnIndex=this.conversation.turnCount,rC.set(this,null),nC.set(this,null),oC.set(this,null),this._inlineAdsViewModel=null,this._fateOverrideTemplate=null,this._adaptiveCardTemplate=null,this._displayMode=Ty.Text,this._attributions=[],this._fateLink=null,this.subdomainToRemove=["www","ww2","mobile","m"],this.messageId=CoreUtils.uuid(),this.citationGroupLinks=new Map,this.loadingAdModels=new Set,this.groupAdModels=new Map,this.handleKatexMessageCopy=O=>!this.config.features.enableKatexCopy||this.katex.handleCopyEvent(O),this.handleLinkClick=O=>{let B;if(!(O.currentTarget instanceof HTMLAnchorElement))throw new Error("Link click event target is not an HTMLAnchorElement");return B=O.currentTarget,this.telemetry.trackInteractionEvent(O),this.telemetry.trackEvent("ClientInst","LinkClicked",{link:B.href}),!0},this.handleDocumentLinkClick=O=>{var B;const U=O.target,G=U.dataset.info;return!!G&&(null===(B=window.sj_evt)||void 0===B||B.fire("Discover.Chat.SydneyClickPageCitation",U,G),!0)},this.handleFateLinkClick=O=>(this.telemetry.trackInteractionEvent(O),this.telemetry.trackEvent("ClientInst","FATELinkClicked"),!0)}get feedback(){var O;return __classPrivateFieldSet(this,rC,null!==(O=__classPrivateFieldGet(this,rC,"f"))&&void 0!==O?O:this.vmFactory.createFeedback(this.model,this.shouldRenderCopyOutside?void 0:this.copy,this.config.features.enableMessageExport?this.export:void 0),"f"),this.config.features.enableShareWholeThreadMockUp&&(__classPrivateFieldGet(this,rC,"f").setWholeThreadConversationId(this.conversation.id),__classPrivateFieldGet(this,rC,"f").enableShareWholeThread(!0),__classPrivateFieldGet(this,rC,"f").enableStandaloneShare(!0)),__classPrivateFieldGet(this,rC,"f")}get shouldRenderCopyOutside(){return!!this.config.features.enableOneClickCopy}get copy(){var O;return __classPrivateFieldSet(this,nC,null!==(O=__classPrivateFieldGet(this,nC,"f"))&&void 0!==O?O:this.vmFactory.createCopy(this.model),"f"),__classPrivateFieldGet(this,nC,"f")}get export(){var O;return __classPrivateFieldSet(this,oC,null!==(O=__classPrivateFieldGet(this,oC,"f"))&&void 0!==O?O:this.vmFactory.createExport([this.model]),"f"),__classPrivateFieldGet(this,oC,"f")}get shouldRenderFeedback(){return this.model.author===Yi.Bot&&this.reportable&&this.model.isFinalized}get inlineAds(){return this._inlineAdsViewModel}get text(){return this.model.text}get learnMoreText(){return this.config.strings.messageLearnMore}get fateOverrideTemplate(){return this._fateOverrideTemplate}get adaptiveCardTemplate(){return this._adaptiveCardTemplate}get displayMode(){return this._displayMode}get attributions(){return this._attributions}get feedbackPrompt(){return this.model.feedbackPrompt}get reportable(){return this.model.reportable}get modelMessageId(){return this.model.messageId}get modelRequestId(){return this.model.requestId}async openFeedbackForm(){return this.feedbackDialog.openFeedbackDialog()}onModelPropertyChanged(O){super.onModelPropertyChanged(O);let B;switch(O){case null:this.mapAttributionsFromModel(),this.isModelFinalized=this.model.isFinalized;case"text":this.updateDisplayMode(),null==B||B.trace(this,this.onModelPropertyChanged,`${null!=O?O:"init"}: '${this.model.text.slice(0,60)}'`).write();break;case"sourceAttributions":this.mapAttributionsFromModel(),this.isModelFinalized&&pt.notify(this,"isModelFinalized"),null==B||B.trace(this,this.onModelPropertyChanged,`${O}:`,this.model[O]).write();break;case"isFinalized":this.isModelFinalized=this.model.isFinalized,this.mapAttributionsFromModel(),null==B||B.trace(this,this.onModelPropertyChanged,`${O}: '${this.model[O]}'`).write();break;case"inlineAdsModel":null===this._inlineAdsViewModel&&this.model.inlineAdsModel&&(this._inlineAdsViewModel=this.vmFactory.createMessage(this.model.inlineAdsModel)),this.mapAttributionsFromModel(),null==B||B.trace(this,this.onModelPropertyChanged,`${O}:`,this.model[O]).write();break;case"contentOrigin":null==B||B.trace(this,this.onModelPropertyChanged,`${O}: '${this.model[O]}'`).write()}}get enableLongDocument(){return!!this.config.features.enableLongDocument}updateDisplayMode(){this._displayMode=this.getDisplayMode()}getDisplayMode(){let O=Ty.Text;return this.author===Yi.Bot&&(this.checkBotFatePolicy()?O=Ty.FateOverride:this.checkBotAdaptiveCards()&&(O=Ty.AdaptiveCard)),O}checkBotFatePolicy(){let O=!1;return this._fateOverrideTemplate=this.getFatePolicyCheckResult(),this._fateOverrideTemplate&&(O=!0),O}checkBotAdaptiveCards(){let O=!1;return this.model.adaptiveCards.length>0&&(this._adaptiveCardTemplate=this.renderAdaptiveCardToTemplate(),this._adaptiveCardTemplate&&(O=!0)),O}createAdaptiveCardViewTemplate(O){var B;let U;if(this.attributions.length>0){const G=O.lastElementChild;if((null==G?void 0:G.matches(".ac-textBlock"))&&(null===(B=G.previousElementSibling)||void 0===B?void 0:B.matches(".ac-horizontal-separator")))if(G.remove(),this.config.features.enableLearnMore){G.innerHTML=sC;U=createTemplate(O.outerHTML.split(sC),[])}else G.previousElementSibling.remove(),G.remove()}return null!=U||(U=new ViewTemplate(O.outerHTML,[])),U}checkAdSlugsEnabled(){return this.serp.isMobile?!0===this.config.features.enableAdSlugsMobile:!0===this.config.features.enableAdSlugsDesktop}renderAdaptiveCardToTemplate(){const O=this.cards.create(this.model.adaptiveCards[0]);if(!O)return null;O.removeAttribute("style");const B=this.telemetry.externalLinkId,{tooltip:U,citation:G}=this.classNames;return O.classList.contains("ac-container")&&O.removeAttribute("tabindex"),O.querySelectorAll("*").forEach(((O,q)=>{var j,W,Y;if("A"===O.nodeName){if("SUP"===(null===(j=O.firstChild)||void 0===j?void 0:j.nodeName)){if(!this.config.features.enableCitations)return void O.remove();if(O.firstChild.textContent){const j=O,K=`${this.messageId}-${q}`;if(this.citationGroupLinks.set(K,[j.href]),j.classList.add(G),j.setAttribute("data-citationid",K),j.setAttribute("aria-label",j.title),j.removeAttribute("title"),this.config.features.enableLongDocument&&-1!==j.href.indexOf("#sjevt")&&(j.removeAttribute("target"),j.setAttribute("target","_self")),"A"!==(null===(W=O.nextSibling)||void 0===W?void 0:W.nodeName)){const G=O;let j=G;const W=[j];let K=j.previousSibling;const Q=[G.href],Z=`${this.messageId}-${q}-group`;for(this.citationGroupLinks.set(Z,Q);"A"===(null==K?void 0:K.nodeName);){j=K,K=j.previousSibling;const O=j;Q.unshift(O.href),W.unshift(j)}if(this.checkAdSlugsEnabled()&&(null===(Y=this.groupAdModels.get(Z))||void 0===Y?void 0:Y.isContentLoaded)){const O=document.createElement("sup");O.textContent="Ad",O.setAttribute("style","margin: 0px 2px; padding: 0px 3px;"),Q[0]===this.firstAttributionLink?(O.setAttribute("class","ad-first"),W.unshift(O)):!0===this.config.features.enableAdSlugsAtEndOfGroup&&(O.setAttribute("class","ad-last"),W.push(O))}for(;!this.isCitationContextStart(K);)j=K,K=j.previousSibling,W.unshift(j);const X=document.createElement("a");if(this.config.features.enableCitations&&(X.classList.add(U),X.setAttribute("data-citationid",Z),!this.serp.isMobile&&Q.length&&B&&X.setAttribute("h",B)),(null==K?void 0:K.nodeType)===Node.TEXT_NODE&&K.textContent){const O=K.textContent.match(/([\.!?] )/);if(O){const B=O[0],U=K.textContent.split(B);if(U&&Array.isArray(U))for(;U.length>0;){const O=U.pop();if(O.trim()){X.appendChild(document.createTextNode(O));break}}K.textContent=U.length?`${U.join(B)}${B}`:`${U.join(B)}`}}for(const O of W)O===G&&O.replaceWith(X),X.appendChild(O)}}}B&&O.setAttribute("h",B)}"CODE"!==O.tagName&&O.removeAttribute("style"),this.config.features.enableShareInlineAdsIframe&&this.isShared||"IMG"!==O.nodeName||O.remove()})),this.createAdaptiveCardViewTemplate(O)}isCitationContextStart(O){return!O||(["A","P","DIV","SPAN"].includes(O.nodeName)||O.nodeType===Node.TEXT_NODE&&/[\.!?] /.test(O.textContent))}mapAttributionsFromModel(){if(!this.model.feedbackPrompt){this._attributions=[];for(let O=0;O<this.model.sourceAttributions.length;O++){const B=this.model.sourceAttributions[O];let U;B.seeMoreUrl?U=this.createUrlAttributionLink(B,O):this.config.features.enableLongDocument&&B.highlightText&&(U=this.createDocumentAttributionLink(B,O)),U&&this._attributions.push(U)}this.enableHoverCitations()}}createUrlAttributionLink(O,B){const U=new URL(O.seeMoreUrl),G=`${B+1}`,q=`${G}. ${this.getDisplayDomain(U)}`,j=this.createAttributionLink(O,G,O.providerDisplayName,q,U.href);return 0===B&&(this.firstAttributionLink=j.link),j}createDocumentAttributionLink(O,B){const U=`${B+1}`;let G=`${U}`;"pdf"===O.pageType&&(G=`${U}. Page ${O.pageIndex} - Line ${O.lineIndex}`);const q=this.truncateWithEllipsis(O.providerDisplayName,23),j=this.createAttributionLink(O,U,q,G);return j.handleLinkClick=this.handleDocumentLinkClick,j}createAttributionLink(O,B,U,G,q=""){return{id:CoreUtils.uuid(),handleLinkClick:this.handleLinkClick,number:B,title:U,sourceCaption:G,link:q,searchQuery:O.searchQuery,description:O.snippets,favIcon:O.imageFavicon||"",imageHeight:isNaN(Number(O.imageHeight))?0:parseInt(O.imageHeight),imageWidth:isNaN(Number(O.imageWidth))?0:parseInt(O.imageWidth),imageLink:O.imageLink||"",h:this.telemetry.externalLinkId,pageIndex:O.pageIndex,highlightText:O.highlightText,relatedPageUrl:O.relatedPageUrl}}enableHoverCitations(){var O,B;if(this.config.features.enableCitations&&this.isModelFinalized){null===(O=this.log)||void 0===O||O.trace(this,this.enableHoverCitations,null).write();for(const O of this.citationGroupLinks.keys()){const U=[];if(null===(B=this.citationGroupLinks.get(O))||void 0===B||B.forEach((O=>{const B=this.attributions.find((B=>B.link===O));B&&U.push(B)})),U.length){const B=this.createCitationGroup(O,U);if(this.hoverCard.registerCitationGroup(B),this.checkAdSlugsEnabled()&&B.advertModel&&(this.groupAdModels.set(O,B.advertModel),!this.loadingAdModels.has(B.advertModel))){this.loadingAdModels.add(B.advertModel);const O=B.advertModel.onContentLoaded((()=>{O.dispose(),this.updateDisplayMode()}))}}}}}createCitationGroup(O,B){var U;const G=B;G.uuid=O;let q=!0;return this.config.features.enableAds?this.isShared&&!this.config.features.enableSharedAds?q=!1:O.endsWith(aC)||(q=!1):q=!1,q&&(G.useAdClickout=B[0]===this.attributions[0],G.advertQuery=null!==(U=B[0].searchQuery)&&void 0!==U?U:null),G}getDisplayDomain(O){return this.subdomainToRemove.reduce(((O,B)=>(B+=".",O.startsWith(B)?O.replace(B,""):O)),O.hostname)}get fateLink(){var O;return null!==(O=this._fateLink)&&void 0!==O||(this._fateLink={id:"",number:"-1",handleLinkClick:this.handleFateLinkClick,title:"Bing",sourceCaption:"Bing",link:this.config.bing.baseUrl}),this._fateLink}getFatePolicyCheckResult(){const O="@failover_hyperlink";let B=null;if(this.model.text.includes(O)){const U=this.model.text.replace(O,"`-1#5#9#5#1-`");B=createTemplate(this.cards.renderMarkdownToHtml(U).split(sC),[lC])}return B}truncateWithEllipsis(O,B){return O.length>B?O.slice(0,B-"...".length)+"...":O}};var dC;rC=new WeakMap,nC=new WeakMap,oC=new WeakMap,__decorate([observable,__metadata("design:type",Object)],cC.prototype,"_inlineAdsViewModel",void 0),__decorate([observable,__metadata("design:type",Object)],cC.prototype,"_fateOverrideTemplate",void 0),__decorate([observable,__metadata("design:type",Object)],cC.prototype,"_adaptiveCardTemplate",void 0),__decorate([observable,__metadata("design:type",Number)],cC.prototype,"_displayMode",void 0),__decorate([observable,__metadata("design:type",Array)],cC.prototype,"_attributions",void 0),cC=__decorate([__param(0,Dm),__param(1,ql),__param(2,qy),__param(3,Dc),__param(4,Wy),__param(5,tC),__param(6,aS),__param(7,Vt),__param(8,gh),__param(9,Dh),__param(10,$c),__param(11,qc),__param(12,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object])],cC);let pC=class extends MessageViewModelBase{constructor(O,B,U,G,q,j){super(O,B,G,q,j),this.vmFactory=U,dC.set(this,null),this._htmlString=""}get feedback(){var O;return __classPrivateFieldSet(this,dC,null!==(O=__classPrivateFieldGet(this,dC,"f"))&&void 0!==O?O:this.vmFactory.create(Iy),"f"),__classPrivateFieldGet(this,dC,"f").initialize(this.model),__classPrivateFieldGet(this,dC,"f")}get htmlString(){return this._htmlString}onModelPropertyChanged(O){switch(super.onModelPropertyChanged(O),O){case null:case"text":this._htmlString=this.model.text}}};var uC;dC=new WeakMap,__decorate([observable,__metadata("design:type",String)],pC.prototype,"_htmlString",void 0),pC=__decorate([__param(0,ql),__param(1,qy),__param(2,Vt),__param(3,gh),__param(4,$c),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],pC);let hC=class extends MessageViewModelBase{constructor(O,B,U,G,q,j){super(O,B,G,q,j),this.vmFactory=U,uC.set(this,null),this._htmlString=""}get feedback(){var O;return __classPrivateFieldSet(this,uC,null!==(O=__classPrivateFieldGet(this,uC,"f"))&&void 0!==O?O:this.vmFactory.create(Iy),"f"),__classPrivateFieldGet(this,uC,"f").initialize(this.model),__classPrivateFieldGet(this,uC,"f")}get htmlString(){return this._htmlString}onModelPropertyChanged(O){switch(super.onModelPropertyChanged(O),O){case null:case"text":this._htmlString=this.model.text}}};var mC;uC=new WeakMap,__decorate([observable,__metadata("design:type",String)],hC.prototype,"_htmlString",void 0),hC=__decorate([__param(0,ql),__param(1,qy),__param(2,Vt),__param(3,gh),__param(4,$c),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],hC);let gC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W,Y,K){super(O,B,U,K),this.conversation=G,this.manager=q,this.config=j,this.errorState=W,this.eventBus=Y,this.strings={description:this.config.strings.toneSelectorDescription,preview:this.config.strings.preview,notificationResetConversationCta:this.config.strings.notificationResetConversationCta},mC.set(this,this._register(new Emitter)),this._toneOptions=[],this.handleSystemCommand=O=>{if(this.config.features.enableThreads&&O.type===Hh.SetResponseTone)O.data&&(this.tone=O.data)},this.eventBus.onSystemCommand(this.handleSystemCommand)}get isToneButtonDisabled(){return this.config.bingAtWork.isEnabled||!this.isVisible}get isEnabled(){return!0===this.config.features.enableResponseToneSelector&&void 0!==this.config.sydney.responseToneOptions&&this.config.sydney.responseToneOptions.length>1}get isDisabled(){return this.errorState.chatErrorState===Gc.MuidUserConsentNotGiven}get isVisible(){const{turnCount:O}=this.conversation;return!this.isDisabled&&(this.config.features.enablePersistentResponseToneSelector||O<2)}get isPreviewEnabled(){return!this.config.features.enableThreads}get tone(){return this._tone}set tone(O){var B;this._tone!==O&&(this._tone=O,null===(B=this.log)||void 0===B||B.trace(this,this.tone,`ResponseTone set to: ${this._tone}`).write(),this.conversation.turnCount>0&&!this.config.partner.disableToneConversationReset&&this.manager.resetConversation(O),this.config.features.enableResponseToneColorThemes&&this.isEnabled&&(db.responseMode=O),this.config.features.enableTonePerf&&this.eventBus.sendSystemEvent(Xd.ResponseToneChanged,this._tone),__classPrivateFieldGet(this,mC,"f").fire(this._tone))}get toneOptions(){if(0===this._toneOptions.length){const O=this.config.sydney.responseToneOptions;if(O&&O.length>0)for(let B=0;B<O.length;B++){const U=O[B],{label:G,labelModifier:q,tooltip:j}=this.getToneStrings(U);this._toneOptions.push({tone:U,label:G,labelModifier:q,tooltip:j})}}return this._toneOptions}getToneStrings(O){let B="",U="",G="";switch(O){case sr.Balanced:B=this.config.strings.toneSelectorBalanced,U=this.config.strings.toneSelectorBalancedModifier,G=this.config.strings.toneSelectorBalancedTooltip;break;case sr.Creative:B=this.config.strings.toneSelectorCreative,U=this.config.strings.toneSelectorCreativeModifier,G=this.config.strings.toneSelectorCreativeTooltip;break;case sr.Precise:B=this.config.strings.toneSelectorPrecise,U=this.config.strings.toneSelectorPreciseModifier,G=this.config.strings.toneSelectorPreciseTooltip}return{label:B,labelModifier:U,tooltip:G}}get onToneChanged(){return __classPrivateFieldGet(this,mC,"f").event}};var fC,yC,_C;mC=new WeakMap,__decorate([observable,__metadata("design:type",String)],gC.prototype,"_tone",void 0),__decorate([observable,__metadata("design:type",Array)],gC.prototype,"_toneOptions",void 0),gC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,Yy),__param(4,uh),__param(5,ql),__param(6,Uc),__param(7,Zd),__param(8,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object,Object,Object])],gC);let vC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W){super(O,B,U,W),this.config=G,this.eventBus=q,this.factory=j,fC.set(this,null),yC.set(this,void 0),_C.set(this,void 0),this.handleSystemEvent=O=>{if(O.type===Xd.InvalidSessionRecovered)this.isCurrent&&(this.notificationText=this.config.strings.notificationInvalidSessionRecovered)},__classPrivateFieldSet(this,yC,this.createMessageGroup(Yi.User),"f"),__classPrivateFieldSet(this,_C,this.createMessageGroup(Yi.Bot),"f"),this.eventBus.onSystemEvent(this.handleSystemEvent)}get bot(){return __classPrivateFieldGet(this,_C,"f")}get user(){return __classPrivateFieldGet(this,yC,"f")}get isExpanded(){return this.bot.isExpanded||this.user.isExpanded}get conversation(){if(null===__classPrivateFieldGet(this,fC,"f"))throw new Error("TurnViewModel has not been initialized.");return __classPrivateFieldGet(this,fC,"f")}get isCurrent(){return this.conversation.current===this}addTurnMessage(O){var B;switch(null===(B=this.log)||void 0===B||B.trace(this,this.addTurnMessage,"turn add message:",O.messageId).write(),O.author){case Yi.Bot:this.bot.addGroupMessage(O);break;case Yi.User:this.user.addGroupMessage(O);break;default:throw new Error(`Unsupported author: '${O.author}'`)}}get lastMessage(){let O=null;return this.user.messages.length>0&&(O=this.user.messages[this.user.messages.length-1]),this.bot.messages.length>0&&(O=this.bot.messages[this.bot.messages.length-1]),O}initialize(O){__classPrivateFieldSet(this,fC,O,"f")}resetMessages(O){switch(O){case Yi.Bot:__classPrivateFieldGet(this,_C,"f").resetMessages();break;case Yi.User:__classPrivateFieldGet(this,yC,"f").resetMessages();break;default:throw new Error(`Unsupported author: '${O}'`)}}createMessageGroup(O){const B=this.factory.create(Jb);return B.initialize(this,O),B}};fC=new WeakMap,yC=new WeakMap,_C=new WeakMap,__decorate([observable,__metadata("design:type",String)],vC.prototype,"notificationText",void 0),vC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,Zd),__param(5,Vt),__param(6,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object])],vC);let bC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W){var Y;super(O,B,U,W),this.config=G,this.model=q,this.conversation=j,this.strings={of:this.config.strings.of},this.currentTurnIndex=this.model.messages[0].author===Yi.Bot?this.conversation.turnCount-1:this.conversation.turnCount,this.maxTurnLength=null!==(Y=this.config.messaging.maxTurnsPerConversation)&&void 0!==Y?Y:void 0}getTurnCounterState(){return this.maxTurnLength?this.currentTurnIndex===this.maxTurnLength?iC.Red:this.currentTurnIndex>this.maxTurnLength/2?iC.Amber:iC.Green:iC.Green}resetCurrentTurnIndex(){this.currentTurnIndex=0}};__decorate([observable,__metadata("design:type",Object)],bC.prototype,"strings",void 0),bC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,Dc),__param(5,Yy),__param(6,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object])],bC);let SC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W,Y){var K;super(O,B,U,Y),this.config=G,this.chat=q,this.speech=j,this.conversation=W,this.strings={stopStreamingAriaLabel:this.config.strings.typingIndicatorStopStreamingAriaLabel,stopRespondingAriaLabel:this.config.strings.typingIndicatorStopRespondingAriaLabel,stop:this.config.strings.stop,canceling:this.config.strings.canceling},this.enableStreamStop=null===(K=!!this.config.features.enableStopButton)||void 0===K||K,this.isEnabled=!0,this.handlePendingRequestStateChanged=O=>{var B;null===(B=this.log)||void 0===B||B.trace(this,this.handlePendingRequestStateChanged,"isRequestPending:",O).write(),O&&(this.isEnabled=!0)},this._register(this.chat.onPendingRequestStateChanged(this.handlePendingRequestStateChanged))}get text(){return this.isEnabled?this.strings.stopRespondingAriaLabel:this.strings.canceling}get isVisible(){return this.chat.isRequestPending}cancelPendingRequest(){var O;null===(O=this.log)||void 0===O||O.trace(this,this.cancelPendingRequest,"Cancelling requests from both text and speech.").write(),this.chat.cancelPendingRequest(),this.speech.cancelPendingRequest(),this.isEnabled=!1}};var CC;__decorate([observable,__metadata("design:type",Object)],SC.prototype,"strings",void 0),__decorate([observable,__metadata("design:type",Boolean)],SC.prototype,"enableStreamStop",void 0),__decorate([observable,__metadata("design:type",Boolean)],SC.prototype,"isEnabled",void 0),SC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,Mc),__param(5,Fc),__param(6,Yy),__param(7,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object,Object])],SC);let EC=class extends ViewModelBase{constructor(O,B,U,G,q,j){super(G,U,j),this.config=O,this.feedbackForm=B,this.errorState=q,CC.set(this,this._register(new Emitter)),this._showWelcomeScreen=void 0===this.config.partner.disableWelcomeContainer?!!this.config.features.enableWelcomeScreen:!this.config.partner.disableWelcomeContainer,this.config.features.enableCodexMuidConsent&&!this.config.sydney.muidUserConsentGiven&&this.errorState.setChatErrorState(Gc.MuidUserConsentNotGiven)}get onConsentGivenInvoked(){return __classPrivateFieldGet(this,CC,"f").event}get learnSegment1(){return this.config.strings.welcomeLearnSegment1}get learnSegment2(){return this.config.strings.welcomeLearnSegment3}get termsAndCondSeg1(){return this.config.strings.muidUsersTermsCond1.replace("{0}",this.config.strings.muidUserGetStartedText)}get termsAndCondSeg2(){return this.config.strings.muidUsersTermsCond2}get getStartedText(){return this.config.strings.muidUserGetStartedText}get learnSegment3(){return this.config.strings.welcomeLearnSegment2}get bingAtWorkEnabled(){return this.config.bingAtWork.isEnabled}get messageItems(){return[{header:this.config.strings.welcomeMessageItemTitle1,body:this.config.strings.welcomeMessageItemContent1,isClickable:!0},{header:this.config.strings.welcomeMessageItemTitle2,body:this.config.strings.welcomeMessageItemContent2,isClickable:!0},{header:this.config.bingAtWork.isEnabled?this.config.strings.welcomeMessageItemTitle3:this.config.strings.discoverMessageItemTitle,body:this.config.bingAtWork.isEnabled?this.config.strings.welcomeMessageItemContent3:this.config.strings.discoverMessageItemContent,isClickable:!!this.config.bingAtWork.isEnabled}]}openFeedbackForm(){this.feedbackForm.openFeedbackForm()}get privacyStatementLink(){return{title:this.config.strings.welcomeContainerPrivacyStatement,url:this.config.links.privacyStatement}}get showWelcomeScreen(){return this._showWelcomeScreen}get subTitleText(){return this.config.strings.welcomeSubtitleText}get titleText(){return this.config.strings.warmWelcomeTitle}get tertiaryTitleText(){return this.config.strings.welcomeTertiaryTitleText}get termsOfUseLink(){return{title:this.config.strings.welcomeContainerUseTerms,url:this.config.links.termsOfUse}}getSuggestions(){return[{contentOrigin:Ki.DeepLeo,messageType:tr.Suggestion,offense:nr.Unknown,text:this.config.strings.welcomeMobSugg1,messageId:"",hiddenText:void 0},{contentOrigin:Ki.DeepLeo,messageType:tr.Suggestion,offense:nr.Unknown,text:this.config.strings.welcomeMobSugg2,messageId:"",hiddenText:void 0},{contentOrigin:Ki.DeepLeo,messageType:tr.Suggestion,offense:nr.Unknown,text:this.config.strings.welcomeMobSugg3,messageId:"",hiddenText:void 0}]}toggleWelcomeScreen(O){return this._showWelcomeScreen=O,this._showWelcomeScreen}provideConsent(){this.errorState.setChatErrorState(),__classPrivateFieldGet(this,CC,"f").fire()}get isMuidConsentUngranted(){return this.errorState.chatErrorState===Gc.MuidUserConsentNotGiven}};var xC;CC=new WeakMap,__decorate([observable,__metadata("design:type",Boolean)],EC.prototype,"_showWelcomeScreen",void 0),EC=__decorate([__param(0,ql),__param(1,lh),__param(2,gh),__param(3,qy),__param(4,Uc),__param(5,$c),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],EC);let TC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W,Y){super(O,B,U,Y),this.conversation=G,this.manager=q,this.config=j,this.toneSelector=W,this.strings={description:this.config.strings.workToggleDescription,label:this.config.strings.workToggleLabel},xC.set(this,this._register(new Emitter)),this._isWorkIncluded=!0}get isEnabled(){return!0===this.config.bingAtWork.isWorkToggleEnabled}get isVisible(){return this.toneSelector.isVisible}get isWorkIncluded(){return this._isWorkIncluded}set isWorkIncluded(O){var B;this._isWorkIncluded!==O&&(this._isWorkIncluded=O,null===(B=this.log)||void 0===B||B.trace(this,"set isWorkIncluded",`isWorkIncluded set to: ${this._isWorkIncluded}`).write(),this.conversation.turnCount>0&&this.manager.resetConversation(),__classPrivateFieldGet(this,xC,"f").fire(this._isWorkIncluded))}get onWorkToggleChanged(){return __classPrivateFieldGet(this,xC,"f").event}};xC=new WeakMap,__decorate([observable,__metadata("design:type",Boolean)],TC.prototype,"_isWorkIncluded",void 0),TC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,Yy),__param(4,uh),__param(5,ql),__param(6,vb),__param(7,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object,Object])],TC);let wC=class extends ViewModelBase{constructor(O,B,U,G,q,j){super(O,B,U,j),this.config=G,this.captchaService=q,this.isVisible=!1,this.isInputValid=!0,this.userInput="",this.captchaImgSrc="",this.userInputRegex=/^[0-9a-zA-Z]{4,}$/,this.strings={captchaTitle:this.config.strings.captchaTitle,captchaDescription:this.config.strings.captchaDescription,captchaPlaceholder:this.config.strings.captchaPlaceholder,captchaPlaceholderError:this.config.strings.captchaPlaceholderError,captchaImgAlt:this.config.strings.captchaImgAlt,captchaRefreshBtnAriaLabel:this.config.strings.captchaRefreshBtnAriaLabel,next:this.config.strings.next,cancel:this.config.strings.cancel},this.handleCaptchaChallengeRequested=O=>{this.telemetry.trackEvent("SystemEvent","CaptchaCreated"),this.captchaImgSrc=O,this.isVisible=!0},this.captchaService.onCaptchaChallengeRequested(this.handleCaptchaChallengeRequested)}async refreshCaptchaAsync(){var O;try{this.isInputValid=!0,""!==this.userInput&&(this.userInput=""),await this.captchaService.startCaptchaChallengeAsync(),this.telemetry.trackEvent("SystemEvent","CaptchaRefreshedSuccess")}catch(B){null===(O=this.log)||void 0===O||O.error(this,this.refreshCaptchaAsync,B instanceof Error?B.message:"undefined").write(),this.telemetry.trackEvent("SystemEvent","CaptchaRefreshedFailure",{CustomData:JSON.stringify({err:B instanceof Error?B.message.slice(0,128):"undefined"})})}}async submitCaptchaAsync(O){var B;try{if(!O.match(this.userInputRegex))return this.isInputValid=!1,void(this.userInput="");const B=await this.captchaService.submitCaptchaAsync(this.userInput);this.userInput="",B?(this.isVisible=!1,this.telemetry.trackEvent("SystemEvent","CaptchaSolved")):(this.telemetry.trackEvent("SystemEvent","CaptchaUnsolved"),await this.refreshCaptchaAsync())}catch(O){null===(B=this.log)||void 0===B||B.error(this,this.submitCaptchaAsync,O instanceof Error?O.message:"undefined").write(),this.telemetry.trackEvent("SystemEvent","CaptchaSubmitError",{CustomData:JSON.stringify({err:O instanceof Error?O.message.slice(0,128):"undefined"})})}}cancelCaptcha(){this.telemetry.trackEvent("InteractionEvent","CaptchaCancelled"),this.serp.changeMode(Hy.getDefault()),this.captchaService.cancelCaptchaChallenge()}};__decorate([observable,__metadata("design:type",Boolean)],wC.prototype,"isVisible",void 0),__decorate([observable,__metadata("design:type",Boolean)],wC.prototype,"isInputValid",void 0),__decorate([observable,__metadata("design:type",String)],wC.prototype,"userInput",void 0),__decorate([observable,__metadata("design:type",String)],wC.prototype,"captchaImgSrc",void 0),wC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,ei),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],wC);const kC=kt.createInterface("IDeleteConversationViewModel");var AC;(function(O){O[O.Idle=0]="Idle",O[O.Deleting=1]="Deleting",O[O.DeleteFailed=2]="DeleteFailed",O[O.Deleted=3]="Deleted"})(AC||(AC={}));const RC=kt.createInterface("IEditThreadViewModel");var IC,PC,NC,OC;(function(O){O[O.Idle=0]="Idle",O[O.Editing=1]="Editing",O[O.EditSuccess=2]="EditSuccess",O[O.Error=3]="Error"})(IC||(IC={}));let MC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W,Y,K,Q,Z,X,J){super(O,B,U,J),this.config=G,this.manager=q,this.factory=j,this.chat=W,this.notification=Y,this.edit=K,this.deleteConversation=Q,this.eventBus=Z,this.conversation=X,this.name="",this.isActive=!1,this.strings={edit:this.config.strings.threadsEdit,delete:this.config.strings.threadsDelete,confirm:this.config.strings.threadsConfirm,cancel:this.config.strings.threadsCancel,more:this.config.strings.more,load:this.config.strings.threadsLoad},this.model=null,PC.set(this,void 0),NC.set(this,void 0),OC.set(this,void 0),this._onThreadLoadedEmitter=this._register(new Emitter),this.defaultThreadID="defaultThread"}get isEditing(){return this.edit.isEditing}get isContextMenuEnabled(){return!!this.config.features.enableThreadContextMenu}initialize(O){var B,U;this.model=O,this.name=null!==(B=O.threadData.chatName)&&void 0!==B?B:"",__classPrivateFieldSet(this,PC,null!==(U=__classPrivateFieldGet(this,PC,"f"))&&void 0!==U?U:this.factory.createThreadContextMenu(this.model),"f"),this.config.features.enableThreadShareLandingPage&&O.threadData instanceof SharedThreadData&&this.sendSharedTip()}get contextMenuVm(){return __classPrivateFieldGet(this,PC,"f")}set contextMenuVm(O){__classPrivateFieldSet(this,PC,O,"f")}get historyConversationVm(){return __classPrivateFieldGet(this,OC,"f")}set historyConversationVm(O){__classPrivateFieldSet(this,OC,O,"f"),this.contextMenuVm&&(this.contextMenuVm.historyConversationVm=O)}get sidePanelVm(){return __classPrivateFieldGet(this,NC,"f")}set sidePanelVm(O){__classPrivateFieldSet(this,NC,O,"f"),this.contextMenuVm&&(this.contextMenuVm.sidePanelVm=O)}get displayTime(){var O;let B=this.getDisplayTime();return(null===(O=this.model)||void 0===O?void 0:O.threadData)instanceof SharedThreadData&&(B=this.config.strings.threadsSharedOnDate.replace("{0}",B)),B}async deleteConversationAsync(){var O,B,U;const G=null===(O=this.model)||void 0===O?void 0:O.id;G?(await this.deleteConversation.deleteConversationAsync([G]),null===(B=this.model)||void 0===B||B.remove()):null===(U=this.log)||void 0===U||U.error(this,this.deleteConversationAsync,`ConversationId is required to perform a delete operation ConvId: ${G}`).write()}async deleteSingleConversationAsync(){var O,B,U,G,q;(null===(O=this.model)||void 0===O?void 0:O.id)&&(null===(B=this.model)||void 0===B?void 0:B.threadData)?(await this.deleteConversation.deleteSingleConversationAsync(this.model.threadData),null===(U=this.model)||void 0===U||U.remove()):null===(G=this.log)||void 0===G||G.error(this,this.deleteSingleConversationAsync,`ConversationId is required to perform a delete operation ConvId: ${null===(q=this.model)||void 0===q?void 0:q.id}`).write()}beginEdit(){this.edit.edit(this.name)}cancelEdit(){this.name=this.edit.cancel()}async confirmEditAsync(O){var B,U,G;(null===(B=this.model)||void 0===B?void 0:B.threadData)?(await this.edit.saveAsync(this.model.threadData,O),this.name=O,(null===(G=this.model)||void 0===G?void 0:G.threadData.chatName)&&(this.model.threadData.chatName=O)):null===(U=this.log)||void 0===U||U.error(this,this.confirmEditAsync,"Thread data is not available").write()}async loadThreadAsync(){var O,B,U,G,q,j;this.isEditing||this.conversation.id===(null===(O=this.model)||void 0===O?void 0:O.id)||(null===(B=this.model)||void 0===B?void 0:B.id)===this.defaultThreadID||(null===(U=this.model)||void 0===U?void 0:U.id)&&(this.manager.fireConversationLoadStart(),sr[this.model.threadData.tone]&&this.eventBus.sendSystemCommand(Hh.SetResponseTone,sr[this.model.threadData.tone]),this.manager.resetConversation(void 0,!1),this.conversation.updateId(this.model.id,new Date(this.model.threadData.expiryTimeUtc),void 0,this.model.threadData.conversationSignature),this._onThreadLoadedEmitter.fire(),this.model.threadData instanceof SharedThreadData?(await this.chat.loadSharedMessagesAsync(null===(G=this.model)||void 0===G?void 0:G.id),this.sendSharedTip()):await this.chat.loadConversationAsync(null===(q=this.model)||void 0===q?void 0:q.id),this.manager.fireConversationLoadEnd(),this.telemetry.trackEvent("InteractionEvent","LoadThread",{Namespace:"Thread",CustomData:JSON.stringify({convId:null===(j=this.model)||void 0===j?void 0:j.id})}))}onThreadLoad(O){return this._onThreadLoadedEmitter.event(O)}sendSharedTip(){this.notification.sendBottomBarNotification({type:this.serp.isMobile?vh.StackedInline:vh.Inline,icon:this.serp.isMobile?bh.Information:void 0,innerHTML:this.config.strings.notificationSharedTip.replace("{0}",this.name).replace("{1}",this.getDisplayTime()).replace("&lt;strong&gt;","<strong>").replace("&lt;/strong&gt;","</strong>")})}getDisplayTime(){var O;if(!(null===(O=this.model)||void 0===O?void 0:O.threadData.createTimeUtc))return"";const B=864e5,U=new Date(this.model.threadData.createTimeUtc),G=new Date;G.setHours(0),G.setMinutes(0),G.setSeconds(0),G.setMilliseconds(0);const q=G.getTime()-U.getTime();if(q<0)return U.toLocaleTimeString("default",{hour:"numeric",minute:"2-digit",hour12:!0});if(q<B)return this.config.strings.threadsYesterday;if(q<5*B){const O=Math.ceil(q/B);return this.config.strings.threadsDaysAgo.replace("{0}",O.toString())}return U.toLocaleDateString("default",{month:"short",day:"numeric",year:"numeric"})}};PC=new WeakMap,NC=new WeakMap,OC=new WeakMap,__decorate([observable,__metadata("design:type",String)],MC.prototype,"name",void 0),__decorate([observable,__metadata("design:type",Boolean)],MC.prototype,"isActive",void 0),MC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,uh),__param(5,Vt),__param(6,Mc),__param(7,_h),__param(8,RC),__param(9,kC),__param(10,Zd),__param(11,Dc),__param(12,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object,Object])],MC);let DC=class extends ViewModelBase{constructor(O,B,U,G){super(O,B,U),this.config=G,this.plugins=[],this.initializePlugins()}addOptionSet(O){this.config.sydney.request.optionsSets.includes(O)||this.config.sydney.request.optionsSets.push(O)}removeOptionSet(O){const B=this.config.sydney.request.optionsSets.indexOf(O);B>-1&&this.config.sydney.request.optionsSets.splice(B,1)}initializePlugins(){this.plugins.push({name:"OpenTable",iconUrl:"https://bing.com/th?id=OSK.6D0626EFCDF6674FFC03047CDAA44120",label:"OpenTable",enabled:!0,isToggleVisible:!0,isToggleDisabled:!1,optionSet:"opentable"}),this.plugins.push({name:"WolframAlpha",iconUrl:"https://bing.com/th?id=OSK.A35F4E5E62E5141616F86714414C41EE",label:"Wolfram Alpha",enabled:!0,isToggleVisible:!0,isToggleDisabled:!1,optionSet:"calcwolfram"}),this.plugins.push({name:"MathSolver",iconUrl:"https://bing.com/th?id=OSK.E1D5F4A8008F66C59A05675A278AE410",label:"Math Solver",enabled:!1,isToggleVisible:!0,isToggleDisabled:!0,optionSet:"mathsolver"}),this.plugins.forEach((O=>{this.config.features.enableFlux3P&&this.config.sydney.request.optionsSets.includes("flux")&&O.enabled&&!this.config.sydney.request.optionsSets.includes(O.optionSet)&&this.config.sydney.request.optionsSets.push(O.optionSet)}))}};DC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__metadata("design:paramtypes",[Object,Object,Object,Object])],DC);let LC=class extends ViewModelBase{constructor(O,B,U,G,q,j){super(O,B,U,j),this.config=G,this.service=q,this._editState=IC.Idle,this.delay=1e3,this._name="",this._previousName=""}get editState(){return this._editState}get isEditing(){return this._editState===IC.Editing}get name(){return this._name}get previousName(){return this._previousName}edit(O){this.instrumentThreadStartEdit(),this._editState=IC.Editing,this._previousName=O}cancel(){return this.instrumentThreadCancelEdit(),this._editState=IC.Idle,this._previousName}async saveAsync(O,B){var U;try{const U={...O,chatName:B};await this.service.saveEdits(U),this.instrumentThreadSave(),this._editState=IC.EditSuccess}catch(O){this.instrumentThreadSaveError(),null===(U=this.log)||void 0===U||U.error(this,this.saveAsync,`Error saving edits: ${O}`).write(),this._editState=IC.Error}finally{this.resetWithDelay()}}instrumentThreadSave(){this.telemetry.trackEvent("InteractionEvent","RenameChatSuccess",{Namespace:"Thread"})}instrumentThreadSaveError(){this.telemetry.trackEvent("InteractionEvent","FailedToSaveRenameChat",{Namespace:"Thread"})}instrumentThreadStartEdit(){this.telemetry.trackEvent("InteractionEvent","ThreadStartEdit",{Namespace:"Thread"})}instrumentThreadCancelEdit(){this.telemetry.trackEvent("InteractionEvent","ThreadCancelEdit",{Namespace:"Thread"})}resetWithDelay(){setTimeout((()=>{this._editState=IC.Idle}),this.delay)}};__decorate([observable,__metadata("design:type",Number)],LC.prototype,"_editState",void 0),LC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,Sh),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],LC);let BC=class extends ViewModelBase{constructor(O,B,U,G,q,j,W){super(O,B,j,W),this.config=U,this.service=G,this.conversationModel=q,this._getChatsState=HS.Idle,this.delay=1e3}async getChats(){var O;try{if(this._getChatsState===HS.Idle){this._getChatsState=HS.InProgress;const O=await this.service.getChats();if(this.instrumentGetChatsSuccess(),this.isGetChatsResponse(O))return this._getChatsState=HS.Succeeded,this.conversationModel.setClientId(O.clientId),O.chats;throw this._getChatsState=HS.Failed,new Error("Error fetching chats")}throw this._getChatsState=HS.Failed,new Error("Error fetching chats - Task to fetch chats is already in progress.")}catch(B){throw null===(O=this.log)||void 0===O||O.error(this,this.getChats,`Error fetching chats: ${B}`).write(),this.instrumentGetChatsFailed(),this._getChatsState=HS.Failed,new Error("Error fetching chats")}finally{this.resetWithDelay()}}isGetChatsResponse(O){return!(!O||!(null==O?void 0:O.chats))}resetWithDelay(){setTimeout((()=>this._getChatsState=HS.Idle),this.delay)}instrumentGetChatsSuccess(){this.telemetry.trackEvent("InteractionEvent","GetChatsSuccess",{Namespace:"Thread",CustomData:JSON.stringify({userId:this.conversationModel.clientId})})}instrumentGetChatsFailed(){this.telemetry.trackEvent("InteractionEvent","GetChatsFailed",{Namespace:"Thread",CustomData:JSON.stringify({userId:this.conversationModel.clientId})})}};__decorate([observable,__metadata("design:type",Number)],BC.prototype,"_getChatsState",void 0),BC=__decorate([__param(0,qy),__param(1,gh),__param(2,ql),__param(3,Th),__param(4,Dc),__param(5,$c),__param(6,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object,Object])],BC);let FC=class extends ViewModelBase{constructor(O,B,U,G,q,j){super(O,B,U,j),this.config=G,this.service=q,this._deleteState=AC.Idle,this.delay=1e3}get deleteState(){return this._deleteState}async deleteConversationAsync(O){return this.deleteAsync(O)}deleteSingleConversationAsync(O){return this.deleteSingleAsync(O)}async deleteSingleAsync(O){var B,U,G,q;if(this.deleteState===AC.Idle){this._deleteState=AC.Deleting;try{null===(U=this.log)||void 0===U||U.trace(this,this.deleteConversationAsync,"Requesting to delete a conversation").write(),await this.service.deleteSingleConversationAsync(O),this.instrumentSingleDeleteConversationSuccess(O.conversationId),null===(G=this.log)||void 0===G||G.trace(this,this.deleteConversationAsync,"Delete succeeded."),this._deleteState=AC.Deleted,this.resetWithDelay()}catch(B){this.instrumentSingleDeleteConversationFailure(O.conversationId),this._deleteState=AC.DeleteFailed,this.resetWithDelay(),null===(q=this.log)||void 0===q||q.error(this,this.deleteConversationAsync,`Error deleting conversation: ${B}`).write()}}else null===(B=this.log)||void 0===B||B.error(this,this.deleteAsync,"Error deleting conversation: Delete is already in progress.").write()}async deleteAsync(O){var B,U,G,q;if(this.deleteState===AC.Idle){this._deleteState=AC.Deleting;try{null===(U=this.log)||void 0===U||U.trace(this,this.deleteConversationAsync,"Requesting to delete a conversation").write(),await this.service.deleteConversation(O),this.instrumentDeleteConversationSuccess(O),null===(G=this.log)||void 0===G||G.trace(this,this.deleteConversationAsync,"Delete succeeded."),this._deleteState=AC.Deleted,this.resetWithDelay()}catch(B){this.instrumentDeleteConversationFailure(O),this._deleteState=AC.DeleteFailed,this.resetWithDelay(),null===(q=this.log)||void 0===q||q.error(this,this.deleteConversationAsync,`Error deleting conversation: ${B}`).write()}}else null===(B=this.log)||void 0===B||B.error(this,this.deleteAsync,"Error deleting conversation: Delete is already in progress.").write()}resetWithDelay(){setTimeout((()=>this._deleteState=AC.Idle),this.delay)}instrumentDeleteConversationSuccess(O){this.telemetry.trackEvent("InteractionEvent","DeleteConversationSuccess",{Namespace:"Thread",CustomData:JSON.stringify({convId:O})})}instrumentDeleteConversationFailure(O){this.telemetry.trackEvent("InteractionEvent","DeleteConversationFailed",{Namespace:"Thread",CustomData:JSON.stringify({convId:O})})}instrumentSingleDeleteConversationSuccess(O){this.telemetry.trackEvent("InteractionEvent","DeleteConversationSuccess",{Namespace:"Thread",CustomData:JSON.stringify({isSingleDelete:!0,convId:O})})}instrumentSingleDeleteConversationFailure(O){this.telemetry.trackEvent("InteractionEvent","DeleteConversationFailed",{Namespace:"Thread",CustomData:JSON.stringify({isSingleDelete:!0,convId:O})})}};var zC,$C,UC,VC;__decorate([observable,__metadata("design:type",Number)],FC.prototype,"_deleteState",void 0),FC=__decorate([__param(0,qy),__param(1,gh),__param(2,$c),__param(3,ql),__param(4,Eh),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],FC);let GC=class extends lifecycle_Disposable{constructor(O,B,U,G,q,j){super(),this.telemetry=O,this.config=B,this.layout=U,this.factory=G,this.conversation=q,this.log=j,this.threadName="",this.strings={shareButtonAriaLabel:this.config.strings.feedbackShareButtonAriaLabel,tooltipShare:this.config.strings.tooltipShare},this.model=null,zC.set(this,void 0),$C.set(this,void 0),UC.set(this,void 0),VC.set(this,void 0)}initialize(O){var B;this.model=O,this.threadName=null!==(B=O.threadData.chatName)&&void 0!==B?B:""}get feedbackVm(){var O,B,U;return __classPrivateFieldSet(this,zC,null!==(O=__classPrivateFieldGet(this,zC,"f"))&&void 0!==O?O:this.factory.createFeedback({},void 0,this.exportVm),"f"),__classPrivateFieldGet(this,zC,"f").setWholeThreadConversationId((null===(B=this.model)||void 0===B?void 0:B.id)||null),__classPrivateFieldGet(this,zC,"f").enableShareWholeThread(!0),__classPrivateFieldGet(this,zC,"f").enableStandaloneShare(!0),__classPrivateFieldGet(this,zC,"f").setConverstaionType((null===(U=this.model)||void 0===U?void 0:U.threadData)instanceof SharedThreadData?Bc.Shared:Bc.Default),__classPrivateFieldGet(this,zC,"f").historyConversationVm=this.historyConversationVm,__classPrivateFieldGet(this,zC,"f")}get exportVm(){var O;return __classPrivateFieldSet(this,$C,null!==(O=__classPrivateFieldGet(this,$C,"f"))&&void 0!==O?O:this.factory.createExport([...this.conversation.messages]),"f"),__classPrivateFieldGet(this,$C,"f")}get historyConversationVm(){return __classPrivateFieldGet(this,UC,"f")}set historyConversationVm(O){__classPrivateFieldSet(this,UC,O,"f")}get sidePanelVm(){return __classPrivateFieldGet(this,VC,"f")}set sidePanelVm(O){__classPrivateFieldSet(this,VC,O,"f")}async handleExport(O,B){var U;O.preventDefault(),O.stopPropagation(),await(null===(U=this.feedbackVm)||void 0===U?void 0:U.exportWholeThreadAsync(B))}};function registerViewModels(O){O.addSingleton(Vt,zy),O.addSingleton(pS,US),O.addAlias(pS,qy),O.addSingleton($y,Zy),O.addSingleton(Xy,ub),O.addSingleton(dS,wC),O.addSingleton(Yy,xb),O.addSingleton(Pb,Ob),O.addSingleton(Nb,Db),O.addSingleton(rS,_S),O.addSingleton(SS,KS),O.addSingleton(vb,gC),O.addSingleton(pb,TC),O.addSingleton(gb,WS),O.addSingleton(qS,DC),O.addSingleton(Wy,Kb),O.addSingleton(Zb,Xb),O.addSingleton(Ky,SC),O.addSingleton(mb,EC),O.addSingleton(lS,VS),O.addSingleton(sS,vS),O.addSingleton(cS,YS),O.addSingleton(yb,_b),O.addTransient(Oy,kb),O.addTransient(By,Ib),O.addTransient(hb,vC),O.addTransient(tC,bC),O.addTransient(Iy,Wb),O.addTransient(Jb,tS),O.addTransient(ky,Rb),O.addTransient(xy,cC),O.addTransient(Ey,iS),O.addTransient(Sy,Vb),O.addTransient(My,MC),O.addTransient(Tb,wb),O.addTransient(RC,LC),O.addTransient(kC,FC),O.addTransient(by,pC),O.addTransient(Fy,GC),O.addTransient(wy,hC),O.addTransient(GS,BC),function(O){O.addTransient(aS,uS),O.addTransient(hS,mS),gS.set(nS.FeedbackDialog,aS),gS.set(nS.TestDialog,hS)}(O)}function collectStyles(O,B){const U=[];let G="";const q=[];for(let j=0,W=O.length-1;j<W;++j){G+=O[j];let W=B[j];if(W instanceof css_directive_CSSDirective){const O=W.createBehavior();W=W.createCSS(),O&&q.push(O)}W instanceof element_styles_ElementStyles||W instanceof CSSStyleSheet?(""!==G.trim()&&(U.push(G),G=""),U.push(W)):G+=W}return G+=O[O.length-1],""!==G.trim()&&U.push(G),{styles:U,behaviors:q}}function css(O,...B){const{styles:U,behaviors:G}=collectStyles(O,B),q=element_styles_ElementStyles.create(U);return G.length&&q.withBehaviors(...G),q}zC=new WeakMap,$C=new WeakMap,UC=new WeakMap,VC=new WeakMap,__decorate([observable,__metadata("design:type",String)],GC.prototype,"threadName",void 0),__decorate([observable,__metadata("design:type",Object)],GC.prototype,"strings",void 0),GC=__decorate([__param(0,$c),__param(1,ql),__param(2,gh),__param(3,Vt),__param(4,Dc),__param(5,Nt(Pi)),__metadata("design:paramtypes",[Object,Object,Object,Object,Object,Object])],GC);const HC=css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  :host([mobile]) {
    width: 100%;
    justify-content: flex-end;
  }

  /* CONTAINER */

  .feedbackform-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 360px;
    z-index: 10;
    box-sizing: border-box;
    padding: 20px;
    gap: 10px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCardAlt};
    border-radius: 12px;
  }

  :host([mobile]) .feedbackform-container {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }

  :host([mobile]) .feedbackform-container.notification {
    align-items: center;
  }

  /* CONTENT */

  .feedbackform-container > form {
    width: 100%;
  }

  .feedbackform-title {
    font-weight: 700;
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
    color: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
  }

  .feedbackform-category {
    margin-bottom: 8px;
  }

  .feedbackform-textarea {
    height: 60px;
    width: 100%;
    resize: none;
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackground};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    border-radius: 2px;
    font-family: ${tb.platform.typography.fonts.text};
    font-weight: 400;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .feedbackform-textarea:focus,
  .feedbackform-textarea:focus-visible {
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackground};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
  }

  .feedbackform-legal {
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  .feedbackform-legal > a {
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
  }

  .feedbackform-notification {
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  /* BUTTONS */

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .feedbackform-btn {
    flex-grow: 1;
    max-width: 50%;
    margin-top: 18px;
    height: 36px;
    padding: 7px 16px;
    border-radius: 20px;
    border: none;
  }

  .primary-btn:disabled,
  .primary-btn[disabled] {
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundSolid};
    color: ${tb.theme.neutralColors.background.colorNeutralInputBackground};
    cursor: not-allowed;
  }

  .primary-btn {
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }
  .primary-btn:not([disabled]):hover {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundHover};
  }
  .primary-btn:not([disabled]):active {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundPressed};
  }

  .secondary-btn {
    color: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackground};
    border: 2px solid ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
  }
  .secondary-btn:hover {
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackgroundHover};
  }
  .secondary-btn:active {
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackgroundPressed};
  }
`;class RefBehavior{constructor(O,B){this.target=O,this.propertyName=B}bind(O){O[this.propertyName]=this.target}unbind(){}}function ref(O){return new AttachedBehaviorHTMLDirective("fast-ref",RefBehavior,O)}function newSplice(O,B,U){return{index:O,removed:B,addedCount:U}}function calcSplices(O,B,U,G,q,j){let W=0,Y=0;const K=Math.min(U-B,j-q);if(0===B&&0===q&&(W=function(O,B,U){for(let G=0;G<U;++G)if(O[G]!==B[G])return G;return U}(O,G,K)),U===O.length&&j===G.length&&(Y=function(O,B,U){let G=O.length,q=B.length,j=0;for(;j<U&&O[--G]===B[--q];)j++;return j}(O,G,K-W)),q+=W,j-=Y,(U-=Y)-(B+=W)==0&&j-q==0)return rt;if(B===U){const O=newSplice(B,[],0);for(;q<j;)O.removed.push(G[q++]);return[O]}if(q===j)return[newSplice(B,[],U-B)];const Q=function(O){let B=O.length-1,U=O[0].length-1,G=O[B][U];const q=[];for(;B>0||U>0;){if(0===B){q.push(2),U--;continue}if(0===U){q.push(3),B--;continue}const j=O[B-1][U-1],W=O[B-1][U],Y=O[B][U-1];let K;K=W<Y?W<j?W:j:Y<j?Y:j,K===j?(j===G?q.push(0):(q.push(1),G=j),B--,U--):K===W?(q.push(3),B--,G=W):(q.push(2),U--,G=Y)}return q.reverse(),q}(function(O,B,U,G,q,j){const W=j-q+1,Y=U-B+1,K=new Array(W);let Q,Z;for(let O=0;O<W;++O)K[O]=new Array(Y),K[O][0]=O;for(let O=0;O<Y;++O)K[0][O]=O;for(let U=1;U<W;++U)for(let j=1;j<Y;++j)O[B+j-1]===G[q+U-1]?K[U][j]=K[U-1][j-1]:(Q=K[U-1][j]+1,Z=K[U][j-1]+1,K[U][j]=Q<Z?Q:Z);return K}(O,B,U,G,q,j)),Z=[];let X,J=B,ee=q;for(let O=0;O<Q.length;++O)switch(Q[O]){case 0:void 0!==X&&(Z.push(X),X=void 0),J++,ee++;break;case 1:void 0===X&&(X=newSplice(J,[],0)),X.addedCount++,J++,X.removed.push(G[ee]),ee++;break;case 2:void 0===X&&(X=newSplice(J,[],0)),X.addedCount++,J++;break;case 3:void 0===X&&(X=newSplice(J,[],0)),X.removed.push(G[ee]),ee++}return void 0!==X&&Z.push(X),Z}const qC=Array.prototype.push;function mergeSplice(O,B,U,G){const q=newSplice(B,U,G);let j=!1,W=0;for(let B=0;B<O.length;B++){const U=O[B];if(U.index+=W,j)continue;const G=(Y=q.index,K=q.index+q.removed.length,Q=U.index,Z=U.index+U.addedCount,K<Q||Z<Y?-1:K===Q||Z===Y?0:Y<Q?K<Z?K-Q:Z-Q:Z<K?Z-Y:K-Y);if(G>=0){O.splice(B,1),B--,W-=U.addedCount-U.removed.length,q.addedCount+=U.addedCount-G;const Y=q.removed.length+U.removed.length-G;if(q.addedCount||Y){let O=U.removed;if(q.index<U.index){const B=q.removed.slice(0,U.index-q.index);qC.apply(B,O),O=B}if(q.index+q.removed.length>U.index+U.addedCount){const B=q.removed.slice(U.index+U.addedCount-q.index);qC.apply(O,B)}q.removed=O,U.index<q.index&&(q.index=U.index)}else j=!0}else if(q.index<U.index){j=!0,O.splice(B,0,q),B++;const G=q.addedCount-q.removed.length;U.index+=G,W+=G}}var Y,K,Q,Z;j||O.push(q)}function projectArraySplices(O,B){let U=[];const G=function(O){const B=[];for(let U=0,G=O.length;U<G;U++){const G=O[U];mergeSplice(B,G.index,G.removed,G.addedCount)}return B}(B);for(let B=0,q=G.length;B<q;++B){const q=G[B];1!==q.addedCount||1!==q.removed.length?U=U.concat(calcSplices(O,q.index,q.index+q.addedCount,q.removed,0,q.removed.length)):q.removed[0]!==O[q.index]&&U.push(q)}return U}let jC=!1;function adjustIndex(O,B){let U=O.index;const G=B.length;return U>G?U=G-O.addedCount:U<0&&(U=G+O.removed.length+U-O.addedCount),U<0&&(U=0),O.index=U,O}class ArrayObserver extends SubscriberSet{constructor(O){super(O),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(O,"$fastController",{value:this,enumerable:!1})}subscribe(O){this.flush(),super.subscribe(O)}addSplice(O){void 0===this.splices?this.splices=[O]:this.splices.push(O),this.needsQueue&&(this.needsQueue=!1,dt.queueUpdate(this))}reset(O){this.oldCollection=O,this.needsQueue&&(this.needsQueue=!1,dt.queueUpdate(this))}flush(){const O=this.splices,B=this.oldCollection;if(void 0===O&&void 0===B)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const U=void 0===B?projectArraySplices(this.source,O):calcSplices(this.source,0,this.source.length,B,0,B.length);this.notify(U)}}const WC=Object.freeze({positioning:!1,recycle:!0});function bindWithoutPositioning(O,B,U,G){O.bind(B[U],G)}function bindWithPositioning(O,B,U,G){const q=Object.create(G);q.index=U,q.length=B.length,O.bind(B[U],q)}class RepeatBehavior{constructor(O,B,U,G,q,j){this.location=O,this.itemsBinding=B,this.templateBinding=G,this.options=j,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=bindWithoutPositioning,this.itemsBindingObserver=pt.binding(B,this,U),this.templateBindingObserver=pt.binding(G,this,q),j.positioning&&(this.bindView=bindWithPositioning)}bind(O,B){this.source=O,this.originalContext=B,this.childContext=Object.create(B),this.childContext.parent=O,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(O,this.originalContext),this.template=this.templateBindingObserver.observe(O,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,null!==this.itemsObserver&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(O,B){O===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):O===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(B)}observeItems(O=!1){if(!this.items)return void(this.items=rt);const B=this.itemsObserver,U=this.itemsObserver=pt.getNotifier(this.items),G=B!==U;G&&null!==B&&B.unsubscribe(this),(G||O)&&U.subscribe(this)}updateViews(O){const B=this.childContext,U=this.views,G=this.bindView,q=this.items,j=this.template,W=this.options.recycle,Y=[];let K=0,Q=0;for(let Z=0,X=O.length;Z<X;++Z){const X=O[Z],J=X.removed;let ee=0,te=X.index;const ie=te+X.addedCount,re=U.splice(X.index,J.length);for(Q=Y.length+re.length;te<ie;++te){const O=U[te],Z=O?O.firstChild:this.location;let X;W&&Q>0?(ee<=Q&&re.length>0?(X=re[ee],ee++):(X=Y[K],K++),Q--):X=j.create(),U.splice(te,0,X),G(X,q,te,B),X.insertBefore(Z)}re[ee]&&Y.push(...re.slice(ee))}for(let O=K,B=Y.length;O<B;++O)Y[O].dispose();if(this.options.positioning)for(let O=0,B=U.length;O<B;++O){const G=U[O].context;G.length=B,G.index=O}}refreshAllViews(O=!1){const B=this.items,U=this.childContext,G=this.template,q=this.location,j=this.bindView;let W=B.length,Y=this.views,K=Y.length;if(0!==W&&!O&&this.options.recycle||(HTMLView.disposeContiguousBatch(Y),K=0),0===K){this.views=Y=new Array(W);for(let O=0;O<W;++O){const W=G.create();j(W,B,O,U),Y[O]=W,W.insertBefore(q)}}else{let O=0;for(;O<W;++O)if(O<K){j(Y[O],B,O,U)}else{const W=G.create();j(W,B,O,U),Y.push(W),W.insertBefore(q)}const Q=Y.splice(O,K-O);for(O=0,W=Q.length;O<W;++O)Q[O].dispose()}}unbindAllViews(){const O=this.views;for(let B=0,U=O.length;B<U;++B)O[B].unbind()}}class RepeatDirective extends HTMLDirective{constructor(O,B,U){super(),this.itemsBinding=O,this.templateBinding=B,this.options=U,this.createPlaceholder=dt.createBlockPlaceholder,function(){if(jC)return;jC=!0,pt.setArrayObserverFactory((O=>new ArrayObserver(O)));const O=Array.prototype;if(O.$fastPatch)return;Reflect.defineProperty(O,"$fastPatch",{value:1,enumerable:!1});const B=O.pop,U=O.push,G=O.reverse,q=O.shift,j=O.sort,W=O.splice,Y=O.unshift;O.pop=function(){const O=this.length>0,U=B.apply(this,arguments),G=this.$fastController;return void 0!==G&&O&&G.addSplice(newSplice(this.length,[U],0)),U},O.push=function(){const O=U.apply(this,arguments),B=this.$fastController;return void 0!==B&&B.addSplice(adjustIndex(newSplice(this.length-arguments.length,[],arguments.length),this)),O},O.reverse=function(){let O;const B=this.$fastController;void 0!==B&&(B.flush(),O=this.slice());const U=G.apply(this,arguments);return void 0!==B&&B.reset(O),U},O.shift=function(){const O=this.length>0,B=q.apply(this,arguments),U=this.$fastController;return void 0!==U&&O&&U.addSplice(newSplice(0,[B],0)),B},O.sort=function(){let O;const B=this.$fastController;void 0!==B&&(B.flush(),O=this.slice());const U=j.apply(this,arguments);return void 0!==B&&B.reset(O),U},O.splice=function(){const O=W.apply(this,arguments),B=this.$fastController;return void 0!==B&&B.addSplice(adjustIndex(newSplice(+arguments[0],O,arguments.length>2?arguments.length-2:0),this)),O},O.unshift=function(){const O=Y.apply(this,arguments),B=this.$fastController;return void 0!==B&&B.addSplice(adjustIndex(newSplice(0,[],arguments.length),this)),O}}(),this.isItemsBindingVolatile=pt.isVolatileBinding(O),this.isTemplateBindingVolatile=pt.isVolatileBinding(B)}createBehavior(O){return new RepeatBehavior(O,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function repeat(O,B,U=WC){return new RepeatDirective(O,"function"==typeof B?B:()=>B,Object.assign(Object.assign({},WC),U))}function when(O,B){const U="function"==typeof B?B:()=>B;return(B,G)=>O(B,G)?U(B,G):null}const YC=html`
  <div class="feedbackform-container notification">
    <div class="feedbackform-title">${O=>O.vm.strings.notificationTitleText}</div>
    <div class="feedbackform-notification">${O=>O.vm.strings.notificationText}</div>
    <div class="btn-group">
      <input
        id="close-btn"
        type="submit"
        class="feedbackform-btn primary-btn"
        value=${O=>O.vm.strings.closeButtonText}
        @click=${O=>O.close()}
      />
    </div>
  </div>
`,KC=html`
  <template ?mobile=${O=>O.layout.isMobile}
    >${when((O=>O.vm.showForm),html`
  <div class="feedbackform-container">
    <div class="feedbackform-title">${O=>O.vm.strings.formTitleText}</div>
    <form id="feedbackform" tabindex="-1">
      <div id="feedbackform-categories" ${ref("categories")}>
        ${repeat((O=>O.vm.categories),html`
            <div class="feedbackform-category">
              <input
                type="radio"
                id=${O=>O}
                name="category"
                value=${O=>O}
                @change=${(O,B)=>B.parent.handleRadioChange(B.event)}
              />
              <label for=${O=>O}>${O=>O}</label>
            </div>
          `)}
      </div>
      <textarea
        id="feedbackform-textarea"
        type="text"
        class="feedbackform-textarea"
        placeholder=${O=>O.vm.strings.formInputDefaultText}
        :value=${O=>O.userInput}
        @input=${(O,B)=>O.handleInputTextChanged(B.event)}
      ></textarea>
      <div class="feedbackform-legal">
        ${O=>O.vm.strings.formLegalText}
        <a
          class="feedbackform-link"
          target="_blank"
          href=${O=>O.vm.strings.reportConcernLink}
          type="button"
          @mouseup=${O=>O.handleReportConcern()}
        >
          ${O=>O.vm.strings.formReportAConcern}
        </a>
      </div>
      <div class="btn-group">
        <input
          type="submit"
          id="submit-btn"
          class="feedbackform-btn primary-btn"
          disabled="true"
          value=${O=>O.vm.strings.submitButtonText}
          ${ref("submitButton")}
          @click=${O=>O.submitForm()}
        />
        <input
          type="button"
          class="feedbackform-btn secondary-btn"
          id="cancel-btn"
          value=${O=>O.vm.strings.cancelButtonText}
          @click=${O=>O.close()}
        />
      </div>
    </form>
  </div>
`)} ${when((O=>O.vm.showNotification),YC)}
  </template>
`;let QC=class extends St{constructor(){super(...arguments),this.userInput="",this.checkedRadio=null}handleRadioChange(O){var B;O.target&&(this.checkedRadio=O.target,this.checkedRadio.value&&(this.updateSubmitButton(),null===(B=this.vm.log)||void 0===B||B.trace(this,this.handleRadioChange,`checked radio value: ${this.checkedRadio.value}`).write()))}handleInputTextChanged(O){var B;const{value:U}=O.target,G=null===(B=this.categories)||void 0===B?void 0:B.querySelector("#Other");lodash_es_isEmpty(U)||this.checkedRadio||!G||(this.checkedRadio=G,this.checkedRadio.checked=!0),this.userInput=U,this.updateSubmitButton()}handleReportConcern(){var O;this.vm.displayNotification(),null===(O=this.vm.log)||void 0===O||O.trace(this,this.handleReportConcern,"report concern click").write()}async submitForm(){var O,B;await this.vm.submitForm(null===(O=this.checkedRadio)||void 0===O?void 0:O.value,this.userInput),null===(B=this.vm.log)||void 0===B||B.trace(this,this.submitForm,"submit form click").write(),this.resetForm()}close(){this.resetForm(),this.vm.closeFeedbackDialog()}resetForm(){var O;this.checkedRadio&&(this.checkedRadio.checked=!1,this.checkedRadio=null),this.userInput="",this.updateSubmitButton(),null===(O=this.vm.log)||void 0===O||O.trace(this,this.resetForm,"form reset").write()}updateSubmitButton(){var O;this.submitButton&&(this.submitButton.disabled=!this.checkedRadio||this.checkedRadio.value===oS.Other&&lodash_es_isEmpty(this.userInput),null===(O=this.vm.log)||void 0===O||O.trace(this,this.updateSubmitButton,`submit button disabled: ${this.submitButton.disabled}`).write())}};__decorate([observable,__metadata("design:type",Object)],QC.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",String)],QC.prototype,"userInput",void 0),QC=__decorate([customElement({name:"feedback-dialog",template:KC,styles:HC})],QC);const ZC=css`
  :host {
    display: block;
    width: 380px;
    height: 240px;
    padding: 20px;
  }

  :host > div {
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: space-between;
  }
`,XC=html`
  <div>
    <a href="https://newbing.jasonyu.v6.navy/chat" target="_blank">Link</a>
    <button @click=${O=>O.handleButtonClick()}>Dismiss</button>
  </div>
`;let JC=class extends St{constructor(){super(...arguments),this.handleButtonClick=()=>{this.vm.serp.modal.dismiss()}}};__decorate([observable,__metadata("design:type",Object)],JC.prototype,"vm",void 0),JC=__decorate([customElement({name:hS.friendlyName,template:XC,styles:ZC})],JC);const eE=css`
  :host {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-overflow-scrolling: auto;
    -webkit-tap-highlight-color: transparent;
    font-family: ${tb.platform.typography.fonts.text};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    position: relative;
    max-width: 1200px;
    height: unset;
  }

  :host([serp-slot=${jy.Creator}]) .action-bar,
  :host([serp-slot=${jy.Pole}]) .action-bar,
  :host([serp-slot=${jy.RightRail}]) .action-bar {
    bottom: 20px;
    position: fixed;
    z-index: -1;
    align-items: flex-end;
    transform: translate3d(0, 0, 0);
    max-width: unset;
    min-width: unset;
  }

  /* SERP SLOT */

  :host([side-panel]) {
    --side-panel-width: 376px;
  }

  :host(:not([mobile])[side-panel][serp-slot=${jy.None}]) cib-action-bar {
    width: calc(100% - var(--side-panel-width));
  }

  /* ALIGNMENT */

  :host(:not([mobile])[alignment=${Gy.Left}]) {
    align-items: flex-start;
  }

  :host([serp-slot=${jy.Creator}]) {
    align-items: unset;
  }

  /* SLOTTED MESSAGE CONTENT */

  .slotted-message {
    max-width: 1120px;
  }

  ::slotted([slot="slotted-message-slot"]) {
    display: contents;
  }

  /* MOBILE */

  :host([mobile][mode=${Hy.OffStage}]) {
    pointer-events: none;
  }

  /* MOBILE BACKGROUND */

  .mobile-background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    touch-action: none;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .mobile-background-fullscreen {
    position: absolute;
    height: 100%;
    width: 100%;
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
  }

  :host([mode=${Hy.OffStage}]) .mobile-background {
    opacity: 0;
    pointer-events: none;
  }

  /* SERP FEEDBACK CONTROL */

  :host(:not([mobile])[mode=${Hy.Search}][serp-slot=${jy.None}]) cib-serp-feedback,
  :host(:not([mobile])[mode=${Hy.OffStage}][serp-slot=${jy.None}]) cib-serp-feedback,
  :host(:not([mobile])[mode=${Hy.Home}][serp-slot=${jy.None}]) cib-serp-feedback {
    display: none;
  }

  /* PRODUCT TYPE */

  :host([product=${Mb.Shoreline}]) cib-header-bar {
    display: none;
  }

  /* MEDIA QUERIES */

  @media (max-width: 1274px) {
    :host(:not([mobile])[side-panel]) {
      --side-panel-width: 280px;
    }

    :host(:not([mobile], [dev])) cib-side-panel {
      margin-top: 50px;
    }
  }

  @media (max-width: 767px) {
    :host(:not([mobile])[side-panel]) {
      --side-panel-width: 0px;
    }

    :host(:not([mobile], [product=${Mb.Shoreline}])) cib-side-panel {
      display: none;
    }

    :host([product=${Mb.Shoreline}]) cib-side-panel {
      position: fixed;
      height: calc(100vh - 64px);
      width: 100vw;
      top: 0;
      left: 0;
      background-color: ${tb.theme.neutralColors.background.colorNeutralAppBackgroundAlt};
    }

    :host([product=${Mb.Shoreline}][side-panel]) cib-action-bar {
      visibility: hidden;
      pointer-events: none;
    }

    :host([product=${Mb.Shoreline}]) cib-header-bar {
      display: flex;
    }
  }
`;function node_observation_elements(O){return O?function(B,U,G){return 1===B.nodeType&&B.matches(O)}:function(O,B,U){return 1===O.nodeType}}class NodeObservationBehavior{constructor(O,B){this.target=O,this.options=B,this.source=null}bind(O){const B=this.options.property;this.shouldUpdate=pt.getAccessors(O).some((O=>O.name===B)),this.source=O,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(rt),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let O=this.getNodes();return void 0!==this.options.filter&&(O=O.filter(this.options.filter)),O}updateTarget(O){this.source[this.options.property]=O}}class ChildrenBehavior extends NodeObservationBehavior{constructor(O,B){super(O,B),this.observer=null,B.childList=!0}observe(){null===this.observer&&(this.observer=new MutationObserver(this.handleEvent.bind(this))),this.observer.observe(this.target,this.options)}disconnect(){this.observer.disconnect()}getNodes(){return"subtree"in this.options?Array.from(this.target.querySelectorAll(this.options.selector)):Array.from(this.target.childNodes)}}function children(O){return"string"==typeof O&&(O={property:O}),new AttachedBehaviorHTMLDirective("fast-children",ChildrenBehavior,O)}class MatchMediaBehavior{constructor(O){this.listenerCache=new WeakMap,this.query=O}bind(O){const{query:B}=this,U=this.constructListener(O);U.bind(B)(),B.addListener(U),this.listenerCache.set(O,U)}unbind(O){const B=this.listenerCache.get(O);B&&(this.query.removeListener(B),this.listenerCache.delete(O))}}class MatchMediaStyleSheetBehavior extends MatchMediaBehavior{constructor(O,B){super(O),this.styles=B}static with(O){return B=>new MatchMediaStyleSheetBehavior(O,B)}constructListener(O){let B=!1;const U=this.styles;return function(){const{matches:G}=this;G&&!B?(O.$fastController.addStyles(U),B=G):!G&&B&&(O.$fastController.removeStyles(U),B=G)}}unbind(O){super.unbind(O),O.$fastController.removeStyles(this.styles)}}const tE=MatchMediaStyleSheetBehavior.with(window.matchMedia("(forced-colors)"));MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: dark)")),MatchMediaStyleSheetBehavior.with(window.matchMedia("(prefers-color-scheme: light)"));var iE;(function(O){O.Canvas="Canvas",O.CanvasText="CanvasText",O.LinkText="LinkText",O.VisitedText="VisitedText",O.ActiveText="ActiveText",O.ButtonFace="ButtonFace",O.ButtonText="ButtonText",O.Field="Field",O.FieldText="FieldText",O.Highlight="Highlight",O.HighlightText="HighlightText",O.GrayText="GrayText"})(iE||(iE={}));const rE=css`
  ${nE="flex",`:host([hidden]){display:none}:host{display:${nE}}`}

  :host {
    position: absolute;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 90px;
    bottom: 16px;
    box-sizing: border-box;
    padding: 0px 32px;
    z-index: 1;
    transition-property: transform, max-width, min-width;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
    --button-compose-collapsed-width: 48px;
    --button-compose-expanded-width: 48px;
  }

  :host([loading]),
  :host([loading]) .root {
    transition: none !important;
  }

  /* This was previously :host */
  .root {
    position: relative;
    display: flex;
    gap: 12px;
    width: 100%;
    height: auto;
    max-width: 1120px;
    min-height: 90px;
    transition-property: width, max-width;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  /* CONTAINERS */

  .main-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 48px;
    box-sizing: border-box;
    padding-block: 13px 11px;
    padding-inline: 48px;
    z-index: 1;
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackground};
    border-radius: 24px;
    outline: 1px solid transparent;
    cursor: text;
    transition-property: min-height, height, width, transform, border-radius, box-shadow;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
    box-shadow: ${tb.theme.shadows.defaults.card};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  :host([disabled]) .main-container {
    opacity: 0.4;
    pointer-events: none;
    max-height: 48px !important;
    min-height: 48px !important;
  }

  :host(:not([mobile])[disabled]) .main-container {
    border-radius: 24px !important;
  }

  :host([disabled]) .main-container * {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([mobile][disabled]) .root.suspended {
    opacity: 0.8;
  }

  :host(:not([product-type=${Mb.Shoreline}])[transition]) .main-container {
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .outside-left-container {
    position: relative;
    align-self: flex-end;
    height: 48px;
    bottom: 42px;
    margin: 0px;
    padding: 0px;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.slow};
    transition-delay: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .outside-left-container .button-compose-wrapper {
    transition-property: opacity, transform;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .button-compose[disabled] {
    opacity: 0.5;
  }

  /* TEXT INPUT */

  form {
    display: contents;
  }

  .input-container {
    display: flex;
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .text-input {
    position: relative;
    display: inline-grid;
    width: 100%;
  }

  .text-input:after,
  .text-input:before {
    visibility: hidden;
    white-space: pre-wrap;
  }

  .text-input:after {
    content: attr(data-input) " ";
  }

  .text-input:before {
    content: attr(data-suggestion) " ";
  }

  .text-input:after,
  .text-input:before,
  .text-input .text-area {
    grid-area: 1/1;
    resize: none;
    border: none;
    outline: none;
    padding: 0px;
    margin: 0px;
    background: transparent;
    word-break: break-word;
    font-family: inherit;
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .text-input .text-area {
    position: relative;
    overflow: hidden;
    white-space: inherit;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .text-input .text-area::placeholder {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  .text-input .autosuggest {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    position: absolute;
    display: inline;
    word-break: break-word;
    cursor: text;
    font-size: 0px;
    line-height: 0px;
  }

  .text-input .autosuggest {
    color: #757575;
    position: absolute;
    display: inline;
    word-break: break-word;
    cursor: text;
  }

  .text-input .autosuggest-text {
    display: inline;
    white-space: pre-wrap;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .text-input .autosuggest-text.prepend {
    color: transparent;
    visibility: hidden;
  }

  .text-input .autosuggest .autosuggest-button {
    position: relative;
    display: inline-block;
    background: transparent;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    border: solid 1px ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    border-radius: 4px;
    padding: 1px 6px;
    margin: 0 0 1px 4px;
    text-transform: capitalize;
    vertical-align: bottom;
    pointer-events: auto;
    z-index: 1;
    cursor: pointer;
    outline: none;
    opacity: 1;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.caption1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1Stronger.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.caption1Stronger.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1Stronger.fontVariationSettings};
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .text-input .autosuggest[hidden],
  .text-input .autosuggest[hidden] .autosuggest-button,
  :host([mobile]) .main-container:not([focus]) .text-input .autosuggest,
  :host([mobile]) .main-container:not([focus]) .text-input .autosuggest .autosuggest-button {
    display: none;
    opacity: 0;
    pointer-events: none;
    transition: unset;
  }

  /* BUTTONS */

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }

  .button:not([disabled]) {
    pointer-events: auto;
    cursor: pointer;
  }

  .button.primary {
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  /* BUTTON COMPOSE */

  .button-compose {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 48px;
    width: var(--button-compose-expanded-width);
    border-radius: 24px;
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: transparent;
    border: none;
    outline: 1px solid transparent;
    margin: 0;
    padding: 0;
    overflow: hidden;
    transition-property: width;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .button-compose:not([disabled]) {
    pointer-events: auto;
    cursor: pointer;
  }

  .button-compose::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
    transition-property: transform;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .button-compose.hover::before {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundHover};
  }

  .button-compose.active::before {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundPressed};
  }

  .button-compose[collapsed] {
    width: var(--button-compose-collapsed-width);
  }

  .button-compose-content {
    position: relative;
    display: grid;
    grid-template-columns: 48px auto;
    align-items: center;
    height: 48px;
  }

  .button-compose-icon {
    justify-self: center;
  }

  .button-compose-text {
    min-width: max-content;
    margin-inline-end: 20px;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .button-compose-hint {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 26px;
    width: max-content;
    left: -10px;
    top: -32px;
    padding: 0 8px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    text-align: center;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    font-size: ${tb.platform.typography.typeRamp.caption1Strong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1Strong.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.caption1Strong.fontWeight};
    font-weight: 600;
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1Strong.fontVariationSettings};
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  @media (hover: hover) {
    :host(:not([disabled]):not([mobile])) .button-compose:hover {
      width: var(--button-compose-expanded-width);
      transition-delay: ${tb.static.motion.duration.fast};
    }

    .button-compose[collapsed] .button-compose-text {
      opacity: 0;
    }

    .button-compose:hover .button-compose-text {
      opacity: 1;
    }

    .button-compose:hover + .button-compose-hint {
      opacity: 1;
    }
  }

  .button-compose:focus {
    width: var(--button-compose-expanded-width);
  }

  .button-compose:focus-visible {
    width: var(--button-compose-expanded-width);
    outline: 2px solid #000;
  }

  :host(:not([mobile])) .button-compose:focus .button-compose-text,
  .button-compose:focus + .button-compose-hint,
  .button-compose:focus-visible + .button-compose-hint {
    opacity: 1;
  }

  .button-compose:active::before {
    transform: scale3d(0.971, 0.9583, 1);
  }

  /* NEW CHAT BUTTON */

  .button-new-chat-wrapper {
    flex: 1;
    grid-area: 2/2;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  :host([mobile]) .button-new-chat-wrapper {
    min-height: 88px;
    align-items: center;
  }

  .button-new-chat {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    border-radius: 24px;
    padding: 12px 16px;
    border: none;
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.gradientColors.core};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
  }

  .button-new-chat-text {
    margin-inline-start: 7px;
  }

  .button-new-chat-icon {
    transform: translateY(-1px);
  }

  :host(:not([mobile])) .button-new-chat-wrapper .button-new-chat {
    padding-inline-end: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .button-new-chat-wrapper.mobile .button-new-chat {
    font-size: 17px;
    font-weight: 500;
  }

  /* CONTROL GROUPS */

  .controls-left {
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 6px 8px;
  }

  .controls-left .chat,
  .controls-left .keyboard {
    position: absolute;
    transition-property: transform;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .controls-left .chat {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  .controls-left .keyboard {
    position: absolute;
    bottom: 48px;
    opacity: 0.01;
    pointer-events: none;
  }

  .controls-left .keyboard button {
    pointer-events: none;
  }

  .controls-right {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 8px;
  }

  .controls-right .cancel,
  .controls-right .clear,
  .controls-right .submit {
    display: none;
  }

  .control {
    display: flex;
    flex-direction: row;
  }

  :host(:not([mobile])) .control.cancel {
    display: none;
    position: absolute;
    right: 20px;
    bottom: 28px;
  }

  /* BOTTOM BAR */

  .bottom-bar {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    bottom: 4px;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 0px 8px 0 16px;
    opacity: 0;
    pointer-events: none;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .bottom-bar-controls {
    display: flex;
    flex-direction: row;
  }

  .bottom-bar-control-group {
    display: flex;
    flex-direction: row;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity, transform;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .letter-counter {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  /* QUERY BUILDER */

  .query-builder {
    display: none;
    height: 0;
    opacity: 0;
    transition-property: opacity, height;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .query-builder-buttons {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    gap: 8px;
    box-sizing: border-box;
    padding: 16px 20px 0px;
    height: 48px;
    overflow: hidden;
  }

  /* TOOLTIP */

  .root cib-tooltip {
    bottom: 108px;
  }

  /* SPEECH MODE */

  .speech-output {
    display: none;
    max-height: 312px;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    padding: 0 24px;
    margin: 32px 0 96px;
    overflow: auto;
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.subtitle1.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.subtitle1.fontVariationSettings};
  }

  .controls-audio {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    width: 72px;
    bottom: 9px;
    z-index: 1;
    right: calc(50% - 36px);
    opacity: 0;
    pointer-events: none;
    transition-property: margin-inline-end, transform, right, opacity;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  .root[speech-enabled] .controls-audio {
    opacity: 1;
    pointer-events: unset;
    cursor: pointer;
  }

  .root[speech-enabled] .outside-left-container .button-compose-wrapper {
    transform: translateY(21px);
  }

  .root[speech-enabled] .main-container {
    min-height: 90px;
    border-radius: 12px;
    cursor: unset;
  }

  .root[speech-enabled] .main-container .controls-left .control.chat {
    transform: translate(20px, 20px);
    opacity: 0;
  }

  .root[speech-enabled] .main-container .controls-left .control.keyboard {
    transform: translate(20px, 20px) !important;
    opacity: 1;
  }

  .root[speech-enabled] .main-container .controls-left .control.keyboard button {
    pointer-events: auto;
  }

  .root[speech-enabled][speech-state=${"listening"}] .main-container {
    transition-duration: ${tb.static.motion.duration.normal};
    box-shadow: ${tb.theme.shadows.elevations.elevation16};
  }

  .root[speech-enabled] .main-container .bottom-bar,
  .root[speech-enabled] .main-container:hover .bottom-bar {
    opacity: 0 !important;
    transition-property: none !important;
    pointer-events: none;
  }

  .root[speech-enabled] .main-container .text-input {
    display: none;
  }

  /* SPEECH OUTPUT TEXT, CAN BE RECOGNIZED TEXT OR ERROR MESSAGES */

  .root[speech-enabled][speech-state=${"blocked"}] .speech-output,
  .root[speech-enabled][speech-state=${"errored"}] .speech-output,
  .root[speech-enabled][speech-state=${"listening"}] .speech-output {
    display: block;
  }

  /* INPUT IN ACTION */

  .root[has-text] .main-container,
  :host(:not([mobile]):not([disabled])) .main-container:hover,
  :host(:focus) .main-container {
    min-height: 90px;
    border-radius: 12px;
  }

  .root[has-text] .main-container .controls-left .control.keyboard,
  .main-container:hover .controls-left .control.keyboard,
  :host(:focus) .main-container .controls-left .control.keyboard {
    transform: translateY(0);
  }

  .root[has-text] .main-container {
    padding-bottom: 32px;
  }

  .root[has-text] .controls-right .microphone {
    display: none;
  }

  :host(:not([cancelable])) .root[has-text] .controls-right .clear,
  :host(:not([cancelable])) .root[has-text] .controls-right .submit {
    display: flex;
  }

  .root[has-text]:not([to-submit]) .bottom-bar,
  .root:not([to-submit]) .main-container:hover .bottom-bar,
  :host(:focus) .root:not([to-submit]) .bottom-bar {
    opacity: 1;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host(:not([mobile])[mode=${Hy.Home}]) .root[had-suggestions]:not([to-submit]) .query-builder,
  :host(:not([mobile]):where([mode=${Hy.Home}],[mode=${Hy.Search}])) .root[had-suggestions]:hover:not([to-submit]) .query-builder,
  :host(:not([mobile]):where([mode=${Hy.Home}],[mode=${Hy.Search}])):host(:focus) .root[had-suggestions]:not([to-submit]) .query-builder {
    display: block;
    opacity: 1;
    height: 42px;
    transition-delay: ${tb.static.motion.duration.fast};
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* EDIT MODE */

  .root[edit-mode] .main-container {
    min-height: 264px !important;
    border-radius: 12px;
  }

  .root[edit-mode] .bottom-bar {
    opacity: 1;
  }

  /* PAGE MODES */

  :host(:not([mobile])[mode=${Hy.Home}]) .root,
  :host(:not([mobile])[mode=${Hy.Search}]) .root {
    max-width: 704px;
  }

  :host(:not([mobile])[mode=${Hy.Home}]) {
    align-items: flex-start;
    transform: translate3d(0px, calc(-50vh + 56px), 0px);
  }

  :host(:not([mobile])[mode=${Hy.Home}]) .root {
    max-width: 650px;
    height: unset;
    min-height: unset;
  }

  :host(:not([mobile])[mode=${Hy.Search}]),
  :host(:not([mobile])[mode=${Hy.OffStage}]) {
    align-items: flex-start;
    transform: translate3d(30px, calc(-100vh + 124px), 0px);
    min-width: 1032px !important;
  }

  :host(:not([mobile])[alignment=${Gy.Left}][mode=${Hy.OffStage}]),
  :host(:not([mobile])[alignment=${Gy.Left}][mode=${Hy.Search}]) {
    transform: translate3d(0, calc(-100vh + 124px), 0px);
    max-width: 1032px !important;
  }

  :host(:not([mobile])[mode=${Hy.Search}]) .root,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .root {
    max-width: 710px;
  }

  :host(:not([mobile])[mode=${Hy.Search}]) .outside-left-container,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .outside-left-container {
    pointer-events: none;
    opacity: 0;
  }

  :host(:not([mobile])[mode=${Hy.Search}]) .main-container,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .main-container {
    transform: translateX(-60px);
  }

  :host(:not([mobile])[mode=${Hy.Search}]) .button-compose,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .button-compose {
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  /* LEFT ALIGNED */

  :host(:not([mobile])[alignment=${Gy.Left}]) {
    max-width: 1440px;
    min-width: 0px;
  }

  /* WINDOW RESIZING */
  :host([no-transition]) {
    transition: none;
  }

  /* MEDIA QUERIES */

  @media (max-width: 600px) {
    :host(:not([mobile])) {
      height: unset;
    }

    :host(:not([mobile])) .root {
      align-items: flex-end;
      justify-content: flex-end;
      min-height: unset;
    }

    :host(:not([mobile])) .outside-left-container {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    :host(:not([mobile])) .button-compose {
      width: 48px !important;
    }

    :host(:not([mobile])) .button-compose-hint {
      display: flex;
    }

    :host(:not([mobile])) .main-container {
      width: calc(100% - 60px);
      padding-inline-start: 18px;
    }

    :host(:focus:not([mobile])) .main-container {
      min-height: 48px;
      border-radius: 24px;
    }

    :host(:not([mobile])) .root[has-text] .main-container,
    :host(:not([mobile])) .main-container:focus,
    :host(:not([mobile])) .main-container[focus] {
      width: 100%;
      min-height: 90px;
      border-radius: 12px;
    }

    :host(:not([mobile]):not([disabled])) .main-container:hover {
      width: 100%;
      transition-delay: 167ms;
    }

    :host(:not([mobile])) .root[has-text]:not([to-submit]) .bottom-bar,
    :host(:not([mobile])) .root:not([to-submit]) .main-container:hover .bottom-bar {
      transition-delay: 167ms;
    }

    :host(:focus:not([mobile])) .root:not([to-submit]) .bottom-bar {
      opacity: 0;
      transition-delay: none;
    }

    :host(:not([mobile])) .main-container:focus .bottom-bar,
    :host(:not([mobile])) .main-container[focus] .bottom-bar {
      opacity: 1 !important;
      transition-delay: 167ms;
    }

    :host(:not([mobile])) .controls-left .chat {
      display: none;
    }
  }

  @media (max-width: 767px) {
    :host {
      padding: 0px 14px;
    }
  }

  @media (max-width: 600px) {
    .button-compose {
      width: 48px;
    }

    .button-compose-text {
      opacity: 0;
    }
  }

  /* PRODUCT TYPE */

  :host([product-type=${Mb.Shoreline}]) {
    position: relative;
    bottom: 0px;
    margin-bottom: 16px;
    margin-top: 16px;
    flex-shrink: 0;
    height: unset;
  }

  :host([product-type=${Mb.Shoreline}]) .main-container {
    transition-delay: 167ms;
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackgroundAlt};
  }

  :host([product-type=${Mb.Shoreline}]) .root cib-tooltip {
    bottom: 64px;
    margin-inline-start: 1px;
  }

  /* MOBILE */

  :host([mobile]) {
    position: relative;
    height: auto;
    bottom: 0px;
    padding: 0px;
  }

  :host([mobile]) .root {
    display: grid;
    grid-gap: 0;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto minmax(50px, auto);
    box-sizing: border-box;
    padding: 19px 16px;
    min-height: 88px;
    max-width: unset;
  }

  :host([mobile]) .main-container {
    align-self: flex-end;
    grid-area: 2 / 1 / auto / 4;
    justify-self: flex-end;
    height: fit-content;
    min-height: 48px;
    width: calc(100% - 56px);
    border-radius: 12px;
    padding: 12px;
    padding-inline-end: 40px;
    bottom: 1px;
    box-shadow: unset;
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackgroundAlt};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralPrimaryStroke};
    transition-property: width, transform, opacity;
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  :host(:not([disabled])[mobile]) .main-container[focus] {
    width: 100%;
  }

  :host([mobile][transition]) .main-container {
    transition-duration: ${tb.static.motion.duration.fast};
  }

  :host([mobile]) .root[speech-enabled] .main-container {
    opacity: 0;
    box-shadow: unset;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host([mobile]) .main-container,
  :host([mobile]) .main-container .text-area {
    touch-action: none !important;
  }

  :host([mobile]) .root[speech-enabled] .main-container,
  :host([mobile]) .root[speech-enabled] .text-area {
    pointer-events: none;
  }

  :host([mobile]) .speech-output {
    grid-area: 1 / 1 / auto / 4;
    margin-bottom: 48px;
    font-size: ${tb.platform.typography.typeRamp.message.fontSize};
    line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
  }

  :host([mobile]) .outside-left-container {
    grid-area: 2/1;
    align-self: flex-end;
    height: 40px;
    bottom: 5px;
  }

  :host([mobile]) .root[speech-enabled] .outside-left-container .button-compose-wrapper {
    transform: translateY(0);
  }

  :host([mobile]) .button-compose {
    width: 40px;
    height: 40px;
  }

  :host([mobile]) .button-compose-content {
    grid-template-columns: 40px auto;
    height: 40px;
  }

  :host([mobile]) .root cib-tooltip {
    bottom: 80px;
    margin-inline-start: 20px;
  }

  :host([mobile]) .controls-right {
    grid-area: 2/3;
    align-self: flex-end;
    position: relative;
    margin-inline-end: 2px;
    padding: 0;
    z-index: 2;
    bottom: 1px;
    top: unset;
  }

  :host([mobile]) .controls-left button,
  :host([mobile]) .controls-right button {
    height: 48px;
    width: 48px;
    position: relative;
  }

  :host([mobile]) .controls-left button {
    pointer-events: none;
  }

  :host([mobile]) .controls-right .control.keyboard {
    bottom: 6px;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host([mobile]) .root:not([speech-enabled]) .controls-right .control.keyboard {
    right: 4px;
    transition-duration: ${tb.static.motion.duration.fast};
  }

  :host([mobile]) .root[speech-enabled] .controls-right .control.keyboard {
    right: 14px;
    opacity: 1;
    pointer-events: auto;
    transition-duration: ${tb.static.motion.duration.slow};
  }

  :host([mobile]) .controls-right .microphone svg-icon {
    opacity: 0;
  }

  :host([mobile]) .controls-audio {
    justify-self: flex-end;
    margin-inline-end: 6px;
    right: unset;
    bottom: 8px;
    opacity: 1;
  }

  :host([mobile]) .root[has-text] .controls-audio {
    display: none;
  }

  :host([mobile]) .root[speech-enabled] .controls-audio {
    margin-inline-end: calc(50% - 36px);
  }

  :host([mobile]) .root[speech-enabled] .controls-left {
    opacity: 1;
    pointer-events: auto;
    padding: 6px 2px;
  }

  :host([mobile]) .root[speech-enabled] .controls-left button {
    pointer-events: auto;
  }

  :host([mobile]) .root[speech-enabled] .controls-right {
    margin: 0px -2px 0px 0px;
  }

  /* REQUEST PENDING (bot typing response) */
  :host([cancelable]) .controls-right .submit {
    display: none;
  }

  .root[speech-enabled][speech-state=${"speaking"}] .control.cancel {
    display: flex;
  }
`.withBehaviors(tE(css`
    .button-compose:hover,
    .button-compose:focus-visible {
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
    }

    .button-compose:hover .button-compose-text,
    .button-compose:focus-visible .button-compose-text {
      forced-color-adjust: none;
    }

    .text-input .text-area::placeholder {
      color: currentColor;
    }

    .text-input .autosuggest {
      color: ${iE.Highlight};
    }
  `));var nE;const oE=css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    height: 24px;
    color: #202124;
    background: #f1f3f4;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 4px;
    padding: 0px 6px;
    cursor: pointer;
  }

  .text {
    color: #202124;
    margin-bottom: 2px;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .text span {
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }
`,aE=css`
  :host {
    --icon-color: inherit;
    --icon-size: 24px;
    display: inline-block;
    height: var(--icon-size);
    width: var(--icon-size);
    min-height: var(--icon-size);
    min-width: var(--icon-size);
    color: var(--icon-color);
    fill: var(--icon-color);
    user-select: none;
    backface-visibility: hidden;
    transform: translateZ(0);
  }

  svg {
    fill: inherit !important;
  }
`.withBehaviors(tE(css`
    :host svg {
      fill: currentColor !important;
    }
  `)),sE=html` ${O=>html`${O.svg}`} `;var lE;(function(O){O.AddBold="add-bold",O.AddChat="add-chat",O.ArrowDownload="arrow-download",O.ArrowLeft="arrow-left",O.BackToWindow="back-to-window",O.Brush="brush",O.Chat="chat",O.ChatDismissFill="ChatDismissFill",O.ChatHelp="chat-help",O.CheckMark="check-mark",O.ChevronDownMed="chevron-down-med",O.ChevronLeftMed="chevron-left-med",O.ChevronRightMed="chevron-right-med",O.ChevronUpMed="chevron-up-med",O.Close="close",O.Clear12="clear-12",O.Compose="compose",O.Copy="copy",O.Delete="delete",O.Edit="edit",O.Feedback="feedback",O.Flag="flag",O.FlagFill="flag-fill",O.FullScreen="full-screen",O.Globe="globe",O.History="history",O.HugFill="hug-fill",O.Keyboard="keyboard",O.LeaveChat="leave-chat",O.LockClosed="lock-closed",O.MessageFill="MessageFill",O.Microphone="microphone",O.More="more",O.Offensive="offensive",O.PauseSolid="pause-solid",O.PhoneArrowRight="phone-arrow-right",O.Pin="pin",O.PinSolid="pin-solid",O.PlaySolid="play-solid",O.Refresh="refresh",O.RotatingLoader="rotating-loader",O.Search="search",O.SendFill="send-fill",O.Share="share",O.SignIn="sign-in",O.Stop="stop",O.Success="success",O.ThumbDislike="thumb-dislike",O.ThumbDislikeFill="thumb-dislike-fill",O.ThumbLike="thumb-like",O.ThumbLikeFill="thumb-like-fill",O.Wand="wand",O.Warning="warning"})(lE||(lE={}));let cE=class extends St{constructor(){super(),this.type=lE.Chat,this.svg="",this.updateIconSvg()}connectedCallback(){super.connectedCallback(),this.updateIconProperties(),this.updateIconSvg()}updateIconProperties(){void 0!==this.size&&this.style.setProperty("--icon-size",`${this.size}px`),void 0!==this.color&&this.style.setProperty("--icon-color",`${this.color}`)}updateIconSvg(){switch(this.type){case lE.AddBold:this.svg=dE;break;case lE.AddChat:this.svg=pE;break;case lE.ArrowDownload:this.svg=uE;break;case lE.ArrowLeft:this.svg=hE;break;case lE.Brush:this.svg=mE;break;case lE.Chat:this.svg=gE;break;case lE.ChatDismissFill:this.svg=fE;break;case lE.ChatHelp:this.svg=yE;break;case lE.CheckMark:this.svg=_E;break;case lE.ChevronDownMed:this.svg=vE;break;case lE.ChevronLeftMed:this.svg=bE;break;case lE.ChevronRightMed:this.svg=SE;break;case lE.Close:this.svg=CE;break;case lE.Clear12:this.svg=xE;break;case lE.Copy:this.svg=EE;break;case lE.Delete:this.svg=TE;break;case lE.Edit:this.svg=wE;break;case lE.Flag:this.svg=AE;break;case lE.FlagFill:this.svg=RE;break;case lE.Globe:this.svg=IE;break;case lE.History:this.svg=PE;break;case lE.HugFill:this.svg=NE;break;case lE.Keyboard:this.svg=OE;break;case lE.LeaveChat:this.svg=ME;break;case lE.LockClosed:this.svg=DE;break;case lE.MessageFill:this.svg=LE;break;case lE.Microphone:this.svg=BE;break;case lE.More:this.svg=FE;break;case lE.Offensive:this.svg=zE;break;case lE.PhoneArrowRight:this.svg=$E;break;case lE.Pin:this.svg=VE;break;case lE.PinSolid:this.svg=UE;break;case lE.RotatingLoader:this.svg=GE;break;case lE.SignIn:this.svg=WE;break;case lE.Search:this.svg=HE;break;case lE.SendFill:this.svg=qE;break;case lE.Share:this.svg=jE;break;case lE.Feedback:this.svg=kE;break;case lE.Stop:this.svg=YE;break;case lE.Success:this.svg=KE;break;case lE.ThumbDislike:this.svg=QE;break;case lE.ThumbLike:this.svg=ZE;break;case lE.Wand:this.svg=XE;break;case lE.Warning:this.svg=JE}}};__decorate([attr,__metadata("design:type",String)],cE.prototype,"type",void 0),__decorate([attr,__metadata("design:type",Number)],cE.prototype,"size",void 0),__decorate([attr,__metadata("design:type",String)],cE.prototype,"color",void 0),__decorate([observable,__metadata("design:type",String)],cE.prototype,"svg",void 0),cE=__decorate([customElement({name:"svg-icon",template:sE,styles:aE}),__metadata("design:paramtypes",[])],cE);const dE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M896 1152H256q-27 0-50-10t-41-27-27-40-10-51q0-27 10-50t27-40 41-28 50-10h640V256q0-27 10-50t27-40 41-28 50-10q26 0 49 10t41 27 28 41 10 50v640h640q26 0 49 10t41 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10h-640v640q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-41-27-27-40-10-51v-640z" />\n  </svg>',pE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 12.2628 21.9899 12.5232 21.97 12.7809C21.5319 12.3658 21.0361 12.0111 20.4958 11.73C20.3532 7.16054 16.6041 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.04305 20.0852 10.3592 20.4531 11.73 20.4958C12.0111 21.0361 12.3658 21.5319 12.7809 21.97C12.5232 21.9899 12.2628 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM23 17.5C23 14.4624 20.5376 12 17.5 12C14.4624 12 12 14.4624 12 17.5C12 20.5376 14.4624 23 17.5 23C20.5376 23 23 20.5376 23 17.5ZM18.0006 18L18.0011 20.5035C18.0011 20.7797 17.7773 21.0035 17.5011 21.0035C17.225 21.0035 17.0011 20.7797 17.0011 20.5035L17.0006 18H14.4956C14.2197 18 13.9961 17.7762 13.9961 17.5C13.9961 17.2239 14.2197 17 14.4956 17H17.0005L17 14.4993C17 14.2231 17.2239 13.9993 17.5 13.9993C17.7761 13.9993 18 14.2231 18 14.4993L18.0005 17H20.4966C20.7725 17 20.9961 17.2239 20.9961 17.5C20.9961 17.7762 20.7725 18 20.4966 18H18.0006Z"/>\n    </svg>',uE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M18.2498 20.5009C18.664 20.5008 19 20.8365 19 21.2507C19 21.6649 18.6644 22.0008 18.2502 22.0009L5.25022 22.0047C4.836 22.0048 4.5 21.6691 4.5 21.2549C4.5 20.8407 4.83557 20.5048 5.24978 20.5047L18.2498 20.5009ZM11.6482 2.01271L11.75 2.00586C12.1297 2.00586 12.4435 2.28801 12.4932 2.65409L12.5 2.75586L12.499 16.4409L16.2208 12.7205C16.4871 12.4543 16.9038 12.4301 17.1974 12.648L17.2815 12.7206C17.5477 12.9869 17.5719 13.4036 17.354 13.6972L17.2814 13.7813L12.2837 18.7779C12.0176 19.044 11.6012 19.0683 11.3076 18.8507L11.2235 18.7782L6.22003 13.7816C5.92694 13.4889 5.92661 13.014 6.21931 12.7209C6.48539 12.4545 6.90204 12.43 7.1958 12.6477L7.27997 12.7202L10.999 16.4339L11 2.75586C11 2.37616 11.2822 2.06237 11.6482 2.01271L11.75 2.00586L11.6482 2.01271Z" />\n  </svg>',hE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10.7327 19.7905C11.0326 20.0762 11.5074 20.0646 11.7931 19.7647C12.0788 19.4648 12.0672 18.99 11.7673 18.7043L5.51587 12.7497L20.25 12.7497C20.6642 12.7497 21 12.4139 21 11.9997C21 11.5855 20.6642 11.2497 20.25 11.2497L5.51577 11.2497L11.7673 5.29502C12.0672 5.00933 12.0787 4.5346 11.7931 4.23467C11.5074 3.93475 11.0326 3.9232 10.7327 4.20889L3.31379 11.2756C3.14486 11.4365 3.04491 11.6417 3.01393 11.8551C3.00479 11.9019 3 11.9503 3 11.9997C3 12.0493 3.00481 12.0977 3.01398 12.1446C3.04502 12.3579 3.14496 12.563 3.31379 12.7238L10.7327 19.7905Z"/>\n  </svg>',mE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7024 2.07782C20.3937 1.9095 20.0071 2.02326 19.8387 2.33191L14.7415 11.679C14.1315 11.2867 12.5639 10.42 11.3923 11.0061C10.3929 11.5061 10.1645 11.9182 9.7972 12.5811L9.75982 12.6485L17.4519 16.3461C17.8157 15.5976 18.0392 14.7269 17.7579 13.977C17.4612 13.1858 16.5737 12.5962 15.8846 12.2419L20.9565 2.94145C21.1248 2.6328 21.011 2.24614 20.7024 2.07782ZM9.05827 13.7646L9.08017 13.7343L16.7805 17.4359C16.6758 17.5743 16.5752 17.6958 16.4848 17.7962L12.9912 21.8721C12.7862 22.1113 12.4811 22.2405 12.1701 22.1901C11.4069 22.0663 9.9278 21.7116 8.93156 20.7456C8.80688 20.6246 8.85936 20.4169 9.00607 20.324C9.86774 19.7781 10.625 18.4374 10.625 18.4374C10.625 18.4374 9.05827 19.4999 7.0625 19.4374C5.52782 19.3893 3.64397 17.9429 2.85543 17.2771C2.6979 17.144 2.76842 16.8923 2.96968 16.8476C4.24898 16.5636 7.68904 15.6473 9.05827 13.7646Z"/>\n    <path d="M8.60974 9.02978C8.52129 8.8234 8.22871 8.82341 8.14026 9.02978L7.77833 9.87431C7.70052 10.0559 7.55586 10.2005 7.37431 10.2783L6.52978 10.6403C6.3234 10.7287 6.32341 11.0213 6.52978 11.1097L7.37431 11.4717C7.55586 11.5495 7.70052 11.6941 7.77833 11.8757L8.14026 12.7202C8.22871 12.9266 8.52129 12.9266 8.60974 12.7202L8.97167 11.8757C9.04948 11.6941 9.19414 11.5495 9.37569 11.4717L10.2202 11.1097C10.4266 11.0213 10.4266 10.7287 10.2202 10.6403L9.37569 10.2783C9.19414 10.2005 9.04948 10.0559 8.97167 9.87431L8.60974 9.02978Z"/>\n    <path d="M14.0511 5.99109C13.9847 5.8363 13.7653 5.8363 13.6989 5.99109L13.4275 6.62448C13.3691 6.76064 13.2606 6.86914 13.1245 6.92749L12.4911 7.19895C12.3363 7.26528 12.3363 7.48472 12.4911 7.55105L13.1245 7.82251C13.2606 7.88086 13.3691 7.98936 13.4275 8.12552L13.6989 8.75891C13.7653 8.9137 13.9847 8.9137 14.0511 8.75891L14.3225 8.12552C14.3809 7.98936 14.4894 7.88086 14.6255 7.82251L15.2589 7.55105C15.4137 7.48472 15.4137 7.26528 15.2589 7.19895L14.6255 6.92749C14.4894 6.86914 14.3809 6.76064 14.3225 6.62448L14.0511 5.99109Z"/>\n  </svg>',gE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M0 1984q0-26 8-54t15-53q23-95 48-188t48-188q-59-110-89-230T0 1026q0-141 36-272t103-246 160-207 208-161T752 37t272-37q141 0 271 36t245 104 207 160 161 207 103 244 37 272q0 140-36 270t-103 245-159 208-206 161-244 104-271 37q-124 0-244-28t-230-86L79 2046q-10 2-15 2-27 0-45-18t-19-46zm1020-64q124 0 239-32t215-90 182-139 141-182 91-215 32-239q0-124-32-238t-90-214-141-181-182-140-214-90-238-32q-123 0-237 32t-214 90-181 139-140 181-91 213-32 238q0 65 8 120t23 107 36 105 48 109q8 16 8 31 0 11-6 41t-16 69-21 84-23 86-20 74-13 50q68-16 134-32t135-33q34-8 71-19t72-11q8 0 15 2t15 6q54 25 104 45t102 35 105 22 115 8zM704 896q-26 0-45-19t-19-45q0-26 19-45t45-19h640q26 0 45 19t19 45q0 26-19 45t-45 19H704zm0 384q-26 0-45-19t-19-45q0-26 19-45t45-19h384q26 0 45 19t19 45q0 26-19 45t-45 19H704z" />\n  </svg>',fE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.6203 2.38637 15.186 3.11461 16.5922L2.04695 20.4151C1.98549 20.6349 1.98546 20.8676 2.04691 21.0876C2.23258 21.7525 2.92212 22.141 3.58704 21.9553L7.41286 20.888C8.81782 21.6146 10.3817 22 12 22C17.5228 22 22 17.5228 22 12ZM9.28033 8.21967L12 10.9393L14.7197 8.21967C15.0126 7.92678 15.4874 7.92678 15.7803 8.21967C16.0732 8.51256 16.0732 8.98744 15.7803 9.28033L13.0607 12L15.7803 14.7197C16.0732 15.0126 16.0732 15.4874 15.7803 15.7803C15.4874 16.0732 15.0126 16.0732 14.7197 15.7803L12 13.0607L9.28033 15.7803C8.98744 16.0732 8.51256 16.0732 8.21967 15.7803C7.92678 15.4874 7.92678 15.0126 8.21967 14.7197L10.9393 12L8.21967 9.28033C7.92678 8.98744 7.92678 8.51256 8.21967 8.21967C8.51256 7.92678 8.98744 7.92678 9.28033 8.21967Z" />\n  </svg>',yE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.12006 20.1281 10.5322 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM12 15.5C12.5523 15.5 13 15.9477 13 16.5C13 17.0523 12.5523 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5C11 15.9477 11.4477 15.5 12 15.5ZM12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5C14.75 10.5108 14.4525 11.074 13.6989 11.8586L13.5303 12.0303C12.9084 12.6522 12.75 12.9163 12.75 13.5C12.75 13.9142 12.4142 14.25 12 14.25C11.5858 14.25 11.25 13.9142 11.25 13.5C11.25 12.4892 11.5475 11.926 12.3011 11.1414L12.4697 10.9697C13.0916 10.3478 13.25 10.0837 13.25 9.5C13.25 8.80964 12.6904 8.25 12 8.25C11.3528 8.25 10.8205 8.74187 10.7565 9.37219L10.75 9.5C10.75 9.91421 10.4142 10.25 10 10.25C9.58579 10.25 9.25 9.91421 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75Z" />\n  </svg>',_E='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M256 1088q0-26 19-45t45-19q26 0 45 19l403 402 915-914q19-19 45-19t45 19 19 45q0 26-19 45l-960 960q-19 19-45 19t-45-19l-448-448q-19-19-19-45z" />\n  </svg>',vE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M341 768q0-18 7-33t18-27 27-19 34-7q19 0 33 6t27 20l537 537 537-537q26-26 60-26 18 0 33 7t27 18 19 27 7 34q0 35-25 60l-598 598q-25 25-60 25t-60-25L366 828q-25-25-25-60z" />\n  </svg>',bE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M597 1024q0-35 25-60l598-598q25-25 60-25 18 0 33 7t27 18 19 27 7 34q0 34-26 60l-537 537 537 537q13 13 19 27t7 33q0 18-7 33t-18 27-27 19-34 7q-35 0-60-25l-598-598q-25-25-25-60z" />\n  </svg>',SE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M683 1621q0-35 25-60l537-537-537-537q-25-25-25-60t24-60 61-26q35 0 60 25l598 598q25 25 25 60t-25 60l-598 598q-25 25-60 25-36 0-60-25t-25-61z" />\n  </svg>',CE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.39705 4.55379L4.46967 4.46967C4.73594 4.2034 5.1526 4.1792 5.44621 4.39705L5.53033 4.46967L12 10.939L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.061 12L19.5303 18.4697C19.7966 18.7359 19.8208 19.1526 19.6029 19.4462L19.5303 19.5303C19.2641 19.7966 18.8474 19.8208 18.5538 19.6029L18.4697 19.5303L12 13.061L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.939 12L4.46967 5.53033C4.2034 5.26406 4.1792 4.8474 4.39705 4.55379L4.46967 4.46967L4.39705 4.55379Z" />\n  </svg>',EE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M5.5028 4.62704L5.5 6.75V17.2542C5.5 19.0491 6.95507 20.5042 8.75 20.5042L17.3663 20.5045C17.0573 21.3782 16.224 22.0042 15.2444 22.0042H8.75C6.12665 22.0042 4 19.8776 4 17.2542V6.75C4 5.76929 4.62745 4.93512 5.5028 4.62704ZM17.75 2C18.9926 2 20 3.00736 20 4.25V17.25C20 18.4926 18.9926 19.5 17.75 19.5H8.75C7.50736 19.5 6.5 18.4926 6.5 17.25V4.25C6.5 3.00736 7.50736 2 8.75 2H17.75ZM17.75 3.5H8.75C8.33579 3.5 8 3.83579 8 4.25V17.25C8 17.6642 8.33579 18 8.75 18H17.75C18.1642 18 18.5 17.6642 18.5 17.25V4.25C18.5 3.83579 18.1642 3.5 17.75 3.5Z" />\n  </svg>',xE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M1024 1145l-537 537q-25 25-60 25-36 0-61-25t-25-61q0-35 25-60l537-537-537-537q-25-25-25-61 0-18 7-33t18-27 27-18 34-7q35 0 60 25l537 537 537-537q25-25 60-25 36 0 61 25t25 61q0 35-25 60l-537 537 537 537q25 25 25 61 0 18-7 33t-18 27-27 18-34 7q-35 0-60-25l-537-537z" />\n  </svg>',TE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10 5H14C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5ZM8.5 5C8.5 3.067 10.067 1.5 12 1.5C13.933 1.5 15.5 3.067 15.5 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H19.9309L18.7589 18.6112C18.5729 20.5334 16.9575 22 15.0263 22H8.97369C7.04254 22 5.42715 20.5334 5.24113 18.6112L4.06908 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H8.5ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75V17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25V9.75ZM14.25 9C14.6642 9 15 9.33579 15 9.75V17.25C15 17.6642 14.6642 18 14.25 18C13.8358 18 13.5 17.6642 13.5 17.25V9.75C13.5 9.33579 13.8358 9 14.25 9ZM6.73416 18.4667C6.84577 19.62 7.815 20.5 8.97369 20.5H15.0263C16.185 20.5 17.1542 19.62 17.2658 18.4667L18.4239 6.5H5.57608L6.73416 18.4667Z" />\n  </svg>',wE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M20.9519 3.0481C19.5543 1.65058 17.2885 1.65064 15.8911 3.04825L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L20.952 8.10861C22.3493 6.71112 22.3493 4.4455 20.9519 3.0481ZM16.9518 4.10884C17.7634 3.29709 19.0795 3.29705 19.8912 4.10876C20.7028 4.9204 20.7029 6.23632 19.8913 7.04801L19 7.93946L16.0606 5.00012L16.9518 4.10884ZM15 6.06084L17.9394 9.00018L7.94119 18.9995C7.73104 19.2097 7.46668 19.3574 7.17755 19.4263L3.76191 20.2395L4.57521 16.8237C4.64402 16.5346 4.79168 16.2704 5.00175 16.0603L15 6.06084Z" />\n  </svg>',kE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M1152 757q-29-10-52-28t-41-42-26-52-9-59V192q0-39 15-74t41-61 62-42 74-15h640q39 0 74 15t61 41 42 62 15 74v384q0 39-15 74t-41 61-62 42-74 15h-358l-182 183q-28 28-68 28-18 0-37-8-28-11-43-35t-16-53V757zm128 48l165-165h411q26 0 45-19t19-45V192q0-26-19-45t-45-19h-640q-26 0-45 19t-19 45v384q0 22 8 35t22 19 30 9 34 2h17q8 0 17-1v165zM256 768v-8q0-78 31-146t84-120 122-80 147-30q80 0 150 30t122 82 82 122 30 150q0 80-30 150t-82 122-122 82-150 30q-80 0-150-30t-122-82-82-122-30-150zm640 0v-5q0-52-21-97t-56-80-81-54-98-20q-53 0-99 20t-81 55-55 82-21 99q0 53 20 99t55 81 81 55 100 21q52 0 99-20t81-55 55-81 21-100zM0 1504q0-41 14-81t40-72 62-51 81-20h886q44 0 80 19t63 51 40 72 14 82q0 155-69 273t-205 193q-84 46-178 62t-188 16q-84 0-168-14t-161-46-140-86-106-133q-32-62-48-129T0 1504zm1152 0q0-14-4-31t-13-31-22-24-30-10H197q-17 0-30 9t-21 24-13 32-5 31q0 114 42 193t112 129 163 72 195 22q102 0 194-22t163-71 113-129 42-194z" />\n  </svg>',AE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M3 3.74805C3 3.33383 3.33579 2.99805 3.75 2.99805H20.2541C20.8722 2.99805 21.225 3.70369 20.8541 4.19811L16.6898 9.74927L20.8541 15.3004C21.225 15.7948 20.8722 16.5005 20.2541 16.5005L4.5 16.5V21.2499C4.5 21.6296 4.21785 21.9434 3.85177 21.993L3.75 21.9999C3.3703 21.9999 3.05651 21.7177 3.00685 21.3517L3 21.2499V3.74805ZM18.7539 4.49805H4.5V15.0005H18.7539L15.1522 10.1993C14.9522 9.93264 14.9522 9.5659 15.1522 9.29921L18.7539 4.49805Z"  />\n</svg>',RE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M3 3.74805C3 3.33383 3.33579 2.99805 3.75 2.99805H20.2541C20.8722 2.99805 21.225 3.70369 20.8541 4.19811L16.6898 9.74927L20.8541 15.3004C21.225 15.7948 20.8722 16.5005 20.2541 16.5005L4.5 16.5V21.2499C4.5 21.6296 4.21785 21.9434 3.85177 21.993L3.75 21.9999C3.3703 21.9999 3.05651 21.7177 3.00685 21.3517L3 21.2499V3.74805Z" />\n  </svg>',IE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0001 1.99805C17.5238 1.99805 22.0016 6.47589 22.0016 11.9996C22.0016 17.5233 17.5238 22.0011 12.0001 22.0011C6.47638 22.0011 1.99854 17.5233 1.99854 11.9996C1.99854 6.47589 6.47638 1.99805 12.0001 1.99805ZM14.939 16.4993H9.06118C9.71322 18.9135 10.8466 20.5011 12.0001 20.5011C13.1536 20.5011 14.2869 18.9135 14.939 16.4993ZM7.5084 16.4999L4.78591 16.4998C5.74425 18.0328 7.1777 19.2384 8.88008 19.9104C8.3578 19.0906 7.92681 18.0643 7.60981 16.8949L7.5084 16.4999ZM19.2143 16.4998L16.4918 16.4999C16.168 17.8337 15.7004 18.9995 15.119 19.9104C16.716 19.2804 18.0757 18.1814 19.0291 16.7833L19.2143 16.4998ZM7.09351 9.99895H3.7359L3.73115 10.0162C3.57906 10.6525 3.49854 11.3166 3.49854 11.9996C3.49854 13.0558 3.69112 14.0669 4.0431 14.9999L7.21626 14.9995C7.07396 14.0504 6.99854 13.0422 6.99854 11.9996C6.99854 11.3156 7.031 10.6464 7.09351 9.99895ZM15.397 9.99901H8.60316C8.53514 10.6393 8.49853 11.309 8.49853 11.9996C8.49853 13.0591 8.58468 14.0694 8.73827 14.9997H15.2619C15.4155 14.0694 15.5016 13.0591 15.5016 11.9996C15.5016 11.309 15.465 10.6393 15.397 9.99901ZM20.2647 9.99811L16.9067 9.99897C16.9692 10.6464 17.0016 11.3156 17.0016 11.9996C17.0016 13.0422 16.9262 14.0504 16.7839 14.9995L19.9571 14.9999C20.309 14.0669 20.5016 13.0558 20.5016 11.9996C20.5016 11.3102 20.4196 10.64 20.2647 9.99811ZM8.88114 4.08875L8.85823 4.09747C6.81092 4.91218 5.1549 6.49949 4.25023 8.49935L7.29835 8.49972C7.61171 6.74693 8.15855 5.221 8.88114 4.08875ZM12.0001 3.49805L11.8844 3.50335C10.619 3.6191 9.39651 5.62107 8.8288 8.4993H15.1714C14.6052 5.62914 13.388 3.63033 12.1264 3.50436L12.0001 3.49805ZM15.1201 4.08881L15.2269 4.2629C15.8961 5.37537 16.4043 6.83525 16.7018 8.49972L19.7499 8.49935C18.8853 6.58795 17.3343 5.05341 15.4113 4.21008L15.1201 4.08881Z" /></svg>',PE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C10.0309 4.5 8.23907 5.25883 6.90093 6.5H8.25C8.66421 6.5 9 6.83579 9 7.25C9 7.66421 8.66421 8 8.25 8H5.25C4.83579 8 4.5 7.66421 4.5 7.25V4.25C4.5 3.83579 4.83579 3.5 5.25 3.5C5.66421 3.5 6 3.83579 6 4.25V5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 11.5317 3.03576 11.0718 3.10471 10.6228C3.161 10.2562 3.48623 10 3.85708 10C4.31609 10 4.64845 10.4382 4.58123 10.8923C4.52772 11.2538 4.5 11.6236 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12ZM12.5 7.75C12.5 7.33579 12.1642 7 11.75 7C11.3358 7 11 7.33579 11 7.75V12.25C11 12.6642 11.3358 13 11.75 13H14.25C14.6642 13 15 12.6642 15 12.25C15 11.8358 14.6642 11.5 14.25 11.5H12.5V7.75Z" />\n</svg>',NE='<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 21 17" yu,i>\n  <path d="M10 4C10 6.20914 8.20914 8 6 8C3.79086 8 2 6.20914 2 4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4ZM18 5C18 6.65685 16.6569 8 15 8C13.3431 8 12 6.65685 12 5C12 3.34315 13.3431 2 15 2C16.6569 2 18 3.34315 18 5ZM0 12.25C0 11.0074 1.00736 10 2.25 10H9.75C10.1201 10 10.4694 10.0894 10.7774 10.2477L8.51256 12.5125C7.82915 13.196 7.82915 14.304 8.51256 14.9874L9.69939 16.1742C8.83326 16.6634 7.64105 17 6 17C0 17 0 12.5 0 12.5V12.25ZM18.2809 10.7202C17.988 10.4273 17.5131 10.4273 17.2202 10.7202C16.9273 11.013 16.9273 11.4879 17.2202 11.7808L18.4394 13H11.5607L12.7798 11.7809C13.0727 11.488 13.0727 11.0131 12.7798 10.7202C12.4869 10.4273 12.012 10.4273 11.7191 10.7202L9.21967 13.2197C8.92678 13.5125 8.92678 13.9874 9.21967 14.2803L11.7191 16.7798C12.012 17.0726 12.4869 17.0726 12.7798 16.7798C13.0727 16.4869 13.0727 16.012 12.7798 15.7191L11.5607 14.5H18.4393L17.2202 15.7191C16.9273 16.012 16.9273 16.4869 17.2202 16.7798C17.5131 17.0726 17.988 17.0726 18.2809 16.7798L20.7803 14.2803C21.0732 13.9874 21.0732 13.5126 20.7803 13.2197L18.2809 10.7202Z"/>\n  </svg>',OE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M19.7454 5C20.988 5 21.9954 6.00736 21.9954 7.25V16.7546C21.9954 17.9972 20.988 19.0046 19.7454 19.0046H4.25C3.00736 19.0046 2 17.9972 2 16.7546V7.25C2 6.00736 3.00736 5 4.25 5H19.7454ZM19.7454 6.5H4.25C3.83579 6.5 3.5 6.83579 3.5 7.25V16.7546C3.5 17.1688 3.83579 17.5046 4.25 17.5046H19.7454C20.1596 17.5046 20.4954 17.1688 20.4954 16.7546V7.25C20.4954 6.83579 20.1596 6.5 19.7454 6.5ZM6.75 14.5H17.25C17.6642 14.5 18 14.8358 18 15.25C18 15.6297 17.7178 15.9435 17.3518 15.9932L17.25 16H6.75C6.33579 16 6 15.6642 6 15.25C6 14.8703 6.28215 14.5565 6.64823 14.5068L6.75 14.5H17.25H6.75ZM16.5 11C17.0523 11 17.5 11.4477 17.5 12C17.5 12.5523 17.0523 13 16.5 13C15.9477 13 15.5 12.5523 15.5 12C15.5 11.4477 15.9477 11 16.5 11ZM10.5049 11C11.0572 11 11.5049 11.4477 11.5049 12C11.5049 12.5523 11.0572 13 10.5049 13C9.95259 13 9.50488 12.5523 9.50488 12C9.50488 11.4477 9.95259 11 10.5049 11ZM7.50488 11C8.05716 11 8.50488 11.4477 8.50488 12C8.50488 12.5523 8.05716 13 7.50488 13C6.95259 13 6.50488 12.5523 6.50488 12C6.50488 11.4477 6.95259 11 7.50488 11ZM13.5049 11C14.0572 11 14.5049 11.4477 14.5049 12C14.5049 12.5523 14.0572 13 13.5049 13C12.9526 13 12.5049 12.5523 12.5049 12C12.5049 11.4477 12.9526 11 13.5049 11ZM6 8C6.55228 8 7 8.44772 7 9C7 9.55228 6.55228 10 6 10C5.44772 10 5 9.55228 5 9C5 8.44772 5.44772 8 6 8ZM8.99512 8C9.54741 8 9.99512 8.44772 9.99512 9C9.99512 9.55228 9.54741 10 8.99512 10C8.44284 10 7.99512 9.55228 7.99512 9C7.99512 8.44772 8.44284 8 8.99512 8ZM11.9951 8C12.5474 8 12.9951 8.44772 12.9951 9C12.9951 9.55228 12.5474 10 11.9951 10C11.4428 10 10.9951 9.55228 10.9951 9C10.9951 8.44772 11.4428 8 11.9951 8ZM14.9951 8C15.5474 8 15.9951 8.44772 15.9951 9C15.9951 9.55228 15.5474 10 14.9951 10C14.4428 10 13.9951 9.55228 13.9951 9C13.9951 8.44772 14.4428 8 14.9951 8ZM17.9951 8C18.5474 8 18.9951 8.44772 18.9951 9C18.9951 9.55228 18.5474 10 17.9951 10C17.4428 10 16.9951 9.55228 16.9951 9C16.9951 8.44772 17.4428 8 17.9951 8Z" />\n  </svg>',ME='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M555 1934L79 2046q-10 2-15 2-27 0-45-18t-19-46q0-13 3-29t7-34 9-34 8-29q23-90 45-178t46-178q-59-111-88-232T0 1024q0-142 36-273t103-244 160-207 207-160T751 37t273-37q140 0 270 36t244 102 206 158 161 205 104 243 39 270q-59-77-140-135-27-162-106-300t-198-238-266-156-314-57q-124 0-238 32t-214 90-181 140-140 181-91 214-32 239q0 62 8 117t23 109 36 105 47 107q4 8 6 16t3 17q0 6-3 21t-7 31-8 32-5 21q-18 75-37 149t-39 149q14-3 47-11t76-19 90-22 88-21 71-16 39-6q17 0 31 7 70 32 139 58t146 40q58 81 135 140-121-2-236-30t-223-84zm341-462q0-119 45-224t124-183 183-123 224-46q79 0 152 20t138 58 117 91 90 117 58 137 21 153q0 119-45 224t-124 183-183 123-224 46q-120 0-225-45t-183-123-123-183-45-225zm576 328q30 0 51-21t21-51q0-30-21-51l-141-141h346q26 0 45-19t19-45q0-26-19-45t-45-19h-346l141-141q21-21 21-51t-21-51-51-21q-30 0-51 21l-256 256q-21 21-21 51t21 51l256 256q21 21 51 21z" />\n  </svg>',DE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M12 2C14.2091 2 16 3.79086 16 6V8H17.75C18.9926 8 20 9.00736 20 10.25V19.75C20 20.9926 18.9926 22 17.75 22H6.25C5.00736 22 4 20.9926 4 19.75V10.25C4 9.00736 5.00736 8 6.25 8H8V6C8 3.79086 9.79086 2 12 2ZM17.75 9.5H6.25C5.83579 9.5 5.5 9.83579 5.5 10.25V19.75C5.5 20.1642 5.83579 20.5 6.25 20.5H17.75C18.1642 20.5 18.5 20.1642 18.5 19.75V10.25C18.5 9.83579 18.1642 9.5 17.75 9.5ZM12.0001 13.5C12.8286 13.5 13.5001 14.1716 13.5001 15C13.5001 15.8284 12.8286 16.5 12.0001 16.5C11.1717 16.5 10.5001 15.8284 10.5001 15C10.5001 14.1716 11.1717 13.5 12.0001 13.5ZM12 3.5C10.6193 3.5 9.5 4.61929 9.5 6V8H14.5V6C14.5 4.61929 13.3807 3.5 12 3.5Z" />\n</svg>',LE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M2048 128v1408H731l-475 475v-475H0V128h2048z" />\n  </svg>',BE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M640 376q0-78 31-146t83-120 123-80 147-30q77 0 147 29t122 81 84 119 31 147v656q0 75-30 143t-82 120-120 82-144 31q-79 0-150-28t-125-79-85-119-32-150V376zm379 904q52 0 99-19t84-53 57-80 21-99V384q0-51-20-97t-54-82-79-56-98-21q-52 0-99 19t-84 53-57 80-21 99v645q0 51 20 97t54 82 79 56 98 21zm69 445v259q0 26-19 45t-45 19q-26 0-45-19t-19-45v-259q-136-13-253-72t-203-154-135-216-49-259q0-26 19-45t45-19q26 0 45 19t19 45q0 76 19 149t58 140q39 66 93 119t118 91 138 57 150 20q77 0 150-20t137-57 118-90 93-120q39-66 58-139t20-150q0-26 19-45t45-19q26 0 45 19t19 45q0 91-22 176t-63 160-99 138-129 111-154 78-173 38z" />\n  </svg>',FE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M7.75 12C7.75 12.9665 6.9665 13.75 6 13.75C5.0335 13.75 4.25 12.9665 4.25 12C4.25 11.0335 5.0335 10.25 6 10.25C6.9665 10.25 7.75 11.0335 7.75 12ZM13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12ZM18 13.75C18.9665 13.75 19.75 12.9665 19.75 12C19.75 11.0335 18.9665 10.25 18 10.25C17.0335 10.25 16.25 11.0335 16.25 12C16.25 12.9665 17.0335 13.75 18 13.75Z" />\n  </svg>\n  ',zE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M3 3.74805C3 3.33383 3.33579 2.99805 3.75 2.99805H20.2541C20.8722 2.99805 21.225 3.70369 20.8541 4.19811L16.6898 9.74927L20.8541 15.3004C21.225 15.7948 20.8722 16.5005 20.2541 16.5005L4.5 16.5V21.2499C4.5 21.6296 4.21785 21.9434 3.85177 21.993L3.75 21.9999C3.3703 21.9999 3.05651 21.7177 3.00685 21.3517L3 21.2499V3.74805Z" />\n  </svg>\n  ',$E='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M13.75 2C14.9926 2 16 3.00736 16 4.25L16.0007 10.0189C15.4812 10.0584 14.9788 10.1589 14.5006 10.3133L14.5 4.25C14.5 3.83579 14.1642 3.5 13.75 3.5H6.25C5.83579 3.5 5.5 3.83579 5.5 4.25V19.75C5.5 20.1642 5.83579 20.5 6.25 20.5L11.3768 20.5009C11.8385 21.0912 12.4 21.5998 13.036 22.0011L6.25 22C5.00736 22 4 20.9926 4 19.75V4.25C4 3.00736 5.00736 2 6.25 2H13.75ZM16.5 11C19.5376 11 22 13.4624 22 16.5C22 19.5376 19.5376 22 16.5 22C13.4624 22 11 19.5376 11 16.5C11 13.4624 13.4624 11 16.5 11ZM16.7157 13.5886L16.6464 13.6464L16.5886 13.7157C16.4705 13.8862 16.4705 14.1138 16.5886 14.2843L16.6464 14.3536L18.2917 15.999L13.4937 16L13.4038 16.0081C13.1997 16.0451 13.0388 16.206 13.0018 16.4101L12.9937 16.5L13.0018 16.5899C13.0388 16.794 13.1997 16.9549 13.4038 16.9919L13.4937 17L18.2937 16.999L16.6464 18.6464L16.5886 18.7157C16.4536 18.9106 16.4729 19.18 16.6464 19.3536C16.82 19.5271 17.0894 19.5464 17.2843 19.4114L17.3536 19.3536L19.8832 16.8212L19.9202 16.7711L19.9622 16.691L19.9882 16.6083L19.9981 16.5444V16.4557L19.9883 16.392L19.9624 16.3094L19.9205 16.2293L19.8832 16.1788L17.3536 13.6464L17.2843 13.5886C17.1382 13.4873 16.9501 13.4729 16.7919 13.5452L16.7157 13.5886ZM10.0767 17.5019C10.1576 18.0246 10.3008 18.5268 10.4984 19.0006L8.75113 19.0038C8.33692 19.0044 8.00062 18.6691 8 18.2549C7.99938 17.8407 8.33466 17.5044 8.74887 17.5038L10.0767 17.5019Z" />\n</svg>',UE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M21.0682 7.75765L16.2425 2.93189C14.9152 1.60462 12.6777 1.96772 11.8382 3.6466L9.40281 8.51748C9.31512 8.69287 9.16223 8.82694 8.97688 8.89096L4.81061 10.3302C3.93791 10.6317 3.682 11.7427 4.33487 12.3956L7.43936 15.5001L3.00008 19.9394L3 21.0001H4.06074L8.50002 16.5607L11.6045 19.6653C12.2574 20.3181 13.3684 20.0622 13.6699 19.1895L15.1092 15.0232C15.1732 14.8379 15.3073 14.685 15.4826 14.5973L20.3535 12.1619C22.0324 11.3224 22.3955 9.08491 21.0682 7.75765Z"  />\n</svg>',VE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M16.2425 2.93189L21.0682 7.75765C22.3955 9.08491 22.0324 11.3224 20.3535 12.1619L15.4826 14.5973C15.3073 14.685 15.1732 14.8379 15.1092 15.0232L13.6699 19.1895C13.3684 20.0622 12.2574 20.3181 11.6045 19.6653L8.50002 16.5607L4.06074 21.0001H3L3.00008 19.9394L7.43936 15.5001L4.33487 12.3956C3.682 11.7427 3.93791 10.6317 4.81061 10.3302L8.97688 8.89096C9.16223 8.82694 9.31512 8.69287 9.40281 8.51748L11.8382 3.6466C12.6777 1.96772 14.9152 1.60462 16.2425 2.93189ZM20.0076 8.81831L15.1818 3.99255C14.5785 3.38924 13.5614 3.55429 13.1799 4.31742L10.7445 9.18829C10.4814 9.71446 10.0227 10.1167 9.46666 10.3087L5.67812 11.6175L12.3826 18.322L13.6914 14.5335C13.8835 13.9774 14.2857 13.5188 14.8118 13.2557L19.6827 10.8202C20.4458 10.4387 20.6109 9.42161 20.0076 8.81831Z" />\n  </svg>',GE='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9.25" class="progress-background" stroke-width="1.5"/> <mask id="path-2-inside-1_533_10314" fill="white"> <path d="M20 10C20 11.3132 19.7413 12.6136 19.2388 13.8268C18.7362 15.0401 17.9997 16.1425 17.0711 17.0711C16.1425 17.9997 15.0401 18.7363 13.8268 19.2388C12.6136 19.7413 11.3132 20 9.99999 20L9.99999 18.4971C11.1158 18.4971 12.2208 18.2773 13.2517 17.8503C14.2826 17.4233 15.2193 16.7974 16.0083 16.0083C16.7974 15.2193 17.4232 14.2826 17.8503 13.2517C18.2773 12.2208 18.4971 11.1159 18.4971 10H20Z"/> </mask> <path d="M20 10C20 11.3132 19.7413 12.6136 19.2388 13.8268C18.7362 15.0401 17.9997 16.1425 17.0711 17.0711C16.1425 17.9997 15.0401 18.7363 13.8268 19.2388C12.6136 19.7413 11.3132 20 9.99999 20L9.99999 18.4971C11.1158 18.4971 12.2208 18.2773 13.2517 17.8503C14.2826 17.4233 15.2193 16.7974 16.0083 16.0083C16.7974 15.2193 17.4232 14.2826 17.8503 13.2517C18.2773 12.2208 18.4971 11.1159 18.4971 10H20Z" class="progress-indicator" stroke-width="3" mask="url(#path-2-inside-1_533_10314)"/> <style> .progress-background { fill: transparent; stroke: var(--cib-color-brand-background-inverted); } .progress-indicator { stroke: var(--cib-color-brand-foreground-inverted); } svg > path { transform-origin: 50%; animation: rotation 2s infinite ease-in-out; } @keyframes rotation { from {transform: rotate(0deg);} to {transform: rotate(360deg);} } </style> </svg>',HE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n    <path d="M1920 1856q0 26-19 45t-45 19q-26 0-45-19l-529-529q-94 79-210 121t-240 43q-97 0-187-25t-168-71-142-110-111-143-71-168-25-187q0-97 25-187t71-168 110-142 143-111 168-71 187-25q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 123-42 239t-122 211l529 529q19 19 19 45zM1408 832q0-79-20-152t-58-138-91-117-117-90-137-58-153-21q-119 0-224 45T425 425 302 608t-46 224q0 120 45 225t123 183 183 123 225 45q119 0 224-45t183-124 123-183 46-224z" />\n  </svg>',qE='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n  <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z" />\n  </svg>',jE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n   <path d="M6.7467 4.00003H10.2109C10.6251 4.00003 10.9609 4.33582 10.9609 4.75003C10.9609 5.12972 10.6788 5.44352 10.3127 5.49318L10.2109 5.50003H6.7467C5.55584 5.50003 4.58106 6.42519 4.50189 7.59598L4.4967 7.75003V17.25C4.4967 18.4409 5.42187 19.4157 6.59266 19.4948L6.7467 19.5H16.2474C17.4383 19.5 18.4131 18.5749 18.4922 17.4041L18.4974 17.25V16.7522C18.4974 16.338 18.8332 16.0022 19.2474 16.0022C19.6271 16.0022 19.9409 16.2844 19.9906 16.6505L19.9974 16.7522V17.25C19.9974 19.2543 18.4251 20.8913 16.4466 20.9948L16.2474 21H6.7467C4.74244 21 3.10543 19.4277 3.0019 17.4492L2.9967 17.25V7.75003C2.9967 5.74577 4.56907 4.10876 6.54755 4.00523L6.7467 4.00003H10.2109H6.7467ZM14.5007 6.51988V3.75003C14.5007 3.12606 15.2075 2.78998 15.6877 3.13983L15.7699 3.20877L21.7645 8.95877C22.0442 9.22712 22.0697 9.65814 21.8408 9.9561L21.7646 10.0412L15.77 15.7931C15.3197 16.2251 14.5878 15.9477 14.5078 15.3589L14.5007 15.2519V12.5266L14.1572 12.5567C11.7575 12.807 9.45748 13.8879 7.24265 15.8174C6.72354 16.2696 5.92041 15.842 6.00579 15.1589C6.67058 9.83933 9.45245 6.90733 14.2013 6.53953L14.5007 6.51988V3.75003V6.51988ZM16.0007 5.50867V7.25003C16.0007 7.66424 15.6649 8.00003 15.2507 8.00003C11.3773 8.00003 8.97667 9.67616 7.93943 13.1572L7.86037 13.4358L8.21256 13.199C10.449 11.7372 12.7985 11 15.2507 11C15.6304 11 15.9442 11.2822 15.9939 11.6483L16.0007 11.75V13.4928L20.1619 9.50012L16.0007 5.50867Z"/>\n  </svg>',WE='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n<path d="M7.99995 17.4C7.66858 17.4 7.39995 17.1313 7.39995 16.8C7.39995 16.4687 7.66858 16.2 7.99995 16.2H15.8C17.1255 16.2 18.2 15.1255 18.2 13.8V4.19998C18.2 2.87449 17.1255 1.79998 15.8 1.79998H7.99995C7.66858 1.79998 7.39995 1.53134 7.39995 1.19998C7.39995 0.868608 7.66858 0.599976 7.99995 0.599976H15.8C17.7882 0.599976 19.4 2.21176 19.4 4.19998V13.8C19.4 15.7883 17.7882 17.4 15.8 17.4H7.99995ZM8.17569 4.37572C8.41 4.14139 8.7899 4.14139 9.02421 4.37572L13.2243 8.57572C13.4585 8.81003 13.4585 9.18993 13.2243 9.42429L9.02421 13.6243C8.7899 13.8585 8.41 13.8585 8.17569 13.6243C7.94137 13.3899 7.94137 13.01 8.17569 12.7757L11.3514 9.59998H0.799951C0.468583 9.59998 0.199951 9.3313 0.199951 8.99998C0.199951 8.66861 0.468583 8.39998 0.799951 8.39998H11.3514L8.17569 5.22424C7.94137 4.98992 7.94137 4.61003 8.17569 4.37572Z"/>\n</svg>',YE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M4.75 3C3.7835 3 3 3.7835 3 4.75V19.25C3 20.2165 3.7835 21 4.75 21H19.25C20.2165 21 21 20.2165 21 19.25V4.75C21 3.7835 20.2165 3 19.25 3H4.75Z"  />\n  </svg>',KE='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM8.75 11.4393L13.2197 6.96967C13.5126 6.67678 13.9874 6.67678 14.2803 6.96967C14.5466 7.23594 14.5708 7.6526 14.3529 7.94621L14.2803 8.03033L9.28033 13.0303C9.01406 13.2966 8.5974 13.3208 8.30379 13.1029L8.21967 13.0303L5.71967 10.5303C5.42678 10.2374 5.42678 9.76256 5.71967 9.46967C5.98594 9.2034 6.4026 9.1792 6.69621 9.39705L6.78033 9.46967L8.75 11.4393L13.2197 6.96967L8.75 11.4393Z" />\n  </svg>',QE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n   <path d="M16.4996 17.9849C16.4996 20.4269 15.3595 22.1836 13.4932 22.1836C12.5183 22.1836 12.1518 21.6409 11.8021 20.3878L11.596 19.6159C11.495 19.2572 11.3192 18.6464 11.069 17.7849C11.0623 17.7618 11.0524 17.7401 11.0396 17.72L8.17281 13.2344C7.49476 12.1734 6.49429 11.3579 5.31841 10.9077L4.84513 10.7265C3.5984 10.2492 2.87457 8.94538 3.1287 7.63481L3.53319 5.54873C3.77462 4.30364 4.71828 3.31273 5.9501 3.01082L13.5778 1.14129C16.109 0.520894 18.6674 2.05583 19.3113 4.58116L20.7262 10.1303C21.1697 11.8696 20.1192 13.6391 18.3799 14.0825C18.1175 14.1494 17.8478 14.1833 17.5769 14.1833H15.7536C16.2497 15.8162 16.4996 17.076 16.4996 17.9849ZM4.60127 7.92034C4.48576 8.51606 4.81477 9.10868 5.38147 9.32565L5.85475 9.50686C7.33036 10.0718 8.58585 11.0952 9.43674 12.4266L12.3035 16.9123C12.3935 17.0531 12.4629 17.2062 12.5095 17.3668L13.0614 19.287L13.2731 20.0784C13.4125 20.5664 13.4827 20.6836 13.4932 20.6836C14.3609 20.6836 14.9996 19.6995 14.9996 17.9849C14.9996 17.1004 14.6738 15.6495 14.0158 13.6698C13.8544 13.1843 14.2158 12.6833 14.7275 12.6833H17.5769C17.7228 12.6833 17.868 12.6651 18.0093 12.629C18.9459 12.3902 19.5115 11.4375 19.2727 10.5009L17.8578 4.95176C17.4172 3.2239 15.6668 2.17369 13.9349 2.59816L6.30718 4.46769C5.64389 4.63026 5.13577 5.16383 5.00577 5.83426L4.60127 7.92034Z"/>\n  </svg>',ZE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M16.4996 5.20235C16.4996 2.76041 15.3595 1.00366 13.4932 1.00366C12.467 1.00366 12.1149 1.60503 11.747 3.00324C11.6719 3.29209 11.635 3.43272 11.596 3.57133C11.495 3.93007 11.3192 4.54082 11.069 5.40234C11.0623 5.42542 11.0524 5.44717 11.0396 5.46724L8.17281 9.95291C7.49476 11.0139 6.49429 11.8294 5.31841 12.2796L4.84513 12.4608C3.5984 12.9381 2.87457 14.2419 3.1287 15.5525L3.53319 17.6385C3.77462 18.8836 4.71828 19.8745 5.9501 20.1764L13.5778 22.046C16.109 22.6664 18.6674 21.1314 19.3113 18.6061L20.7262 13.057C21.1697 11.3177 20.1192 9.5482 18.3799 9.10473C18.1175 9.03782 17.8478 9.00398 17.5769 9.00398H15.7536C16.2497 7.37109 16.4996 6.1113 16.4996 5.20235ZM4.60127 15.2669C4.48576 14.6712 4.81477 14.0786 5.38147 13.8616L5.85475 13.6804C7.33036 13.1154 8.58585 12.0921 9.43674 10.7607L12.3035 6.27501C12.3935 6.13412 12.4629 5.98107 12.5095 5.8205C12.7608 4.95549 12.9375 4.3415 13.0399 3.97761C13.083 3.82436 13.1239 3.66891 13.1976 3.38494C13.3875 2.66324 13.4809 2.50366 13.4932 2.50366C14.3609 2.50366 14.9996 3.48773 14.9996 5.20235C14.9996 6.08683 14.6738 7.53779 14.0158 9.51741C13.8544 10.0029 14.2158 10.504 14.7275 10.504H17.5769C17.7228 10.504 17.868 10.5222 18.0093 10.5582C18.9459 10.797 19.5115 11.7498 19.2727 12.6863L17.8578 18.2355C17.4172 19.9634 15.6668 21.0136 13.9349 20.5891L6.30718 18.7196C5.64389 18.557 5.13577 18.0234 5.00577 17.353L4.60127 15.2669Z"/>\n  </svg>',XE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M11.4048 9.46478L2.69814 18.1785C1.81212 19.0652 1.81262 20.5022 2.69924 21.3883C3.58585 22.2743 5.02284 22.2738 5.90895 21.3871L14.6148 12.6748L11.4048 9.46478ZM16.8518 15.0068L16.75 15C16.3703 15 16.0565 15.2822 16.0068 15.6482L16 15.75V16.5H15.25C14.8703 16.5 14.5565 16.7822 14.5068 17.1482L14.5 17.25C14.5 17.6297 14.7822 17.9435 15.1482 17.9932L15.25 18H16V18.75C16 19.1297 16.2822 19.4435 16.6482 19.4932L16.75 19.5C17.1297 19.5 17.4435 19.2178 17.4932 18.8518L17.5 18.75V18H18.25C18.6297 18 18.9435 17.7178 18.9932 17.3518L19 17.25C19 16.8703 18.7178 16.5565 18.3518 16.5068L18.25 16.5H17.5V15.75C17.5 15.3703 17.2178 15.0565 16.8518 15.0068L16.75 15L16.8518 15.0068ZM13.3136 7.56538L13.1775 7.69092L12.4658 8.40378L15.6758 11.6138L16.3879 10.9003C17.2654 10.0213 17.2651 8.59738 16.3868 7.71848L16.2304 7.5715C15.3931 6.85388 14.1533 6.85191 13.3136 7.56538ZM6.85177 5.00685L6.75 5C6.3703 5 6.05651 5.28215 6.00685 5.64823L6 5.75V6.5H5.25C4.8703 6.5 4.55651 6.78215 4.50685 7.14823L4.5 7.25C4.5 7.6297 4.78215 7.94349 5.14823 7.99315L5.25 8H6V8.75C6 9.1297 6.28215 9.44349 6.64823 9.49315L6.75 9.5C7.1297 9.5 7.44349 9.21785 7.49315 8.85177L7.5 8.75V8H8.25C8.6297 8 8.94349 7.71785 8.99315 7.35177L9 7.25C9 6.8703 8.71785 6.55651 8.35177 6.50685L8.25 6.5H7.5V5.75C7.5 5.3703 7.21785 5.05651 6.85177 5.00685L6.75 5L6.85177 5.00685ZM18.8518 3.00685L18.75 3C18.3703 3 18.0565 3.28215 18.0068 3.64823L18 3.75V4.5H17.25C16.8703 4.5 16.5565 4.78215 16.5068 5.14823L16.5 5.25C16.5 5.6297 16.7822 5.94349 17.1482 5.99315L17.25 6H18V6.75C18 7.1297 18.2822 7.44349 18.6482 7.49315L18.75 7.5C19.1297 7.5 19.4435 7.21785 19.4932 6.85177L19.5 6.75V6H20.25C20.6297 6 20.9435 5.71785 20.9932 5.35177L21 5.25C21 4.8703 20.7178 4.55651 20.3518 4.50685L20.25 4.5H19.5V3.75C19.5 3.3703 19.2178 3.05651 18.8518 3.00685L18.75 3L18.8518 3.00685Z"  />\n  </svg>',JE='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M12.9993 17C12.9993 16.4484 12.5522 16.0013 12.0006 16.0013C11.4491 16.0013 11.002 16.4484 11.002 17C11.002 17.5515 11.4491 17.9986 12.0006 17.9986C12.5522 17.9986 12.9993 17.5515 12.9993 17ZM12.7401 9.1467C12.6901 8.78066 12.3761 8.49876 11.9964 8.49906C11.5822 8.49939 11.2467 8.83545 11.247 9.24966L11.2506 13.7513L11.2575 13.853C11.3075 14.2191 11.6215 14.501 12.0012 14.5007C12.4154 14.5003 12.7509 14.1643 12.7506 13.7501L12.747 9.24846L12.7401 9.1467ZM13.9693 3.65888C13.113 2.11108 10.8878 2.1111 10.0316 3.65893L2.28634 17.6604C1.45678 19.16 2.5414 20.9995 4.25518 20.9995H19.7462C21.46 20.9995 22.5446 19.16 21.715 17.6603L13.9693 3.65888ZM11.3442 4.38501C11.6296 3.86907 12.3713 3.86906 12.6567 4.38499L20.4025 18.3865C20.679 18.8863 20.3175 19.4995 19.7462 19.4995H4.25518C3.68392 19.4995 3.32238 18.8863 3.5989 18.3865L11.3442 4.38501Z" />\n  </svg>',ex=html`
  ${when((O=>O.icon),html` <svg-icon type=${lE.AddBold} size="14" color="#3d6cdc"></svg-icon> `)}
  <div class="text">${O=>O.getHighlightedSuggestion()}</div>
`;let tx=class extends St{constructor(){super(...arguments),this.query="",this.suggestion="",this.icon=null,this.getHighlightedSuggestion=()=>{const O=this.query.trim();return html`
      ${this.suggestion.split(new RegExp(`(${O})`,"gi")).map((B=>B.toLowerCase()===O.toLowerCase()?`<span>${B}</span>`:B)).join("")}
    `}}};__decorate([attr,__metadata("design:type",String)],tx.prototype,"query",void 0),__decorate([attr,__metadata("design:type",String)],tx.prototype,"suggestion",void 0),__decorate([attr({mode:"boolean"}),__metadata("design:type",Object)],tx.prototype,"icon",void 0),tx=__decorate([customElement({name:"cib-query-suggestion",template:ex,styles:oE})],tx);const ix=css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 72px;
    width: 72px;
    user-select: none;
  }

  .icon {
    display: block;
    position: absolute;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    border: none;
    background: transparent;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .icon:not([disabled]) {
    pointer-events: auto;
    cursor: pointer;
  }

  /* ANIMATION */

  .css-animation-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    pointer-events: none;
  }

  .animation {
    position: absolute;
    width: 56px;
    height: 56px;
    opacity: 0;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.slow};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  /* LISTENING ANIMATION */

  .animation.listening {
  }

  :host([state="listening"]) .animation.listening {
    opacity: 1;
  }

  .animation.listening::before,
  .animation.listening::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    opacity: 0.3;
    animation: listening 1s infinite alternate;
  }

  .animation.listening::before {
    animation: listening-large-glow 500ms ease-out infinite alternate;
  }

  .animation.listening::after {
    animation: listening-small-glow 500ms ease-out 200ms infinite alternate;
  }

  @keyframes listening-large-glow {
    from {
      box-shadow: 0 0 0 0 #1abeec;
    }
    to {
      box-shadow: 0 0 0 8px #1abeec;
    }
  }

  @keyframes listening-small-glow {
    from {
      box-shadow: 0 0 0 0 #2a7aec;
    }
    to {
      box-shadow: 0 0 0 4px #2a7aec;
    }
  }

  /* TTS LOADING ANIMATION */

  .animation.loading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 52px;
  }

  :host([state="loading"]) .animation.loading {
    opacity: 1;
    transition-delay: ${tb.static.motion.duration.slow};
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: loading-dot 1000ms infinite;
  }

  .dot.one,
  .dot.five {
    background: #1dbded;
  }

  .dot.two,
  .dot.four {
    background: #2c7aeb;
  }

  .dot.three {
    background: #3398eb;
  }

  .dot.two {
    animation-delay: 200ms;
  }

  .dot.three {
    animation-delay: 400ms;
  }

  .dot.four {
    animation-delay: 600ms;
  }

  .dot.five {
    animation-delay: 800ms;
  }

  @keyframes loading-dot {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-12px);
      animation-timing-function: cubic-bezier(0.75, 0, 0.25, 1);
    }
    30% {
      transform: translateY(-12px);
    }
    55% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0.75, 0, 0.25, 1);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* SPEAKING ANIMATION */

  .animation.speaking {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([state="speaking"]) .animation.speaking {
    opacity: 1;
    transition-delay: ${tb.static.motion.duration.fast};
  }

  .bars {
    position: absolute;
    animation: 400ms ease-in-out infinite alternate;
  }

  .bars.outer {
    width: calc(100% - 4px);
    animation-name: speaking-outer-bars;
  }

  .bars.middle {
    width: calc(100% - 28px);
    animation-name: speaking-middle-bars;
    animation-delay: 53ms;
  }

  .bars.center {
    width: 4px;
    animation-name: speaking-center-bar;
    animation-delay: 250ms;
  }

  .bars::before,
  .bars::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 100%;
    border-radius: 2px;
  }

  .bars.outer::before,
  .bars.outer::after {
    background: #1dbded;
  }

  .bars.middle::before,
  .bars.middle::after {
    background: #2c7aeb;
  }

  .bars.center::before,
  .bars.center::after {
    background: #3398eb;
  }

  .bars.outer::before,
  .bars.middle::before,
  .bars.center::before {
    left: 0;
  }

  .bars.middle::after,
  .bars.outer::after {
    right: 0;
  }

  .bars.center::after {
    content: none;
  }

  @keyframes speaking-outer-bars {
    from {
      height: 4px;
    }
    to {
      height: 10px;
    }
  }

  @keyframes speaking-middle-bars {
    from {
      height: 8px;
    }
    to {
      height: 22px;
    }
  }

  @keyframes speaking-center-bar {
    from {
      height: 15px;
    }
    to {
      height: 44px;
    }
  }
`;var rx=U(6569);const nx=css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
  }
`,ox=html`
  <lottie-player ${ref("player")} autoplay></lottie-player>
`;let ax=class extends St{constructor(){super(),this.isPlaying=!1,this.data=null,this.visible=!0,this.nextStates=[],this.handlePlayerRendered=()=>{this.renderState()},this.handlePlayerPlay=()=>{this.isPlaying=!0},this.handlePlayerLoop=()=>{var O;this.nextStates.length>0&&(null===(O=this.player)||void 0===O||O.setLooping(!1))},this.handlePlayerComplete=()=>{this.isPlaying=!1,this.nextStates&&this.nextStates.length>0&&this.renderState()},this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.player&&(this.disposer.register(addDisposableListener(this.player,rx.Bc.Rendered,this.handlePlayerRendered)),this.disposer.register(addDisposableListener(this.player,rx.Bc.Play,this.handlePlayerPlay)),this.disposer.register(addDisposableListener(this.player,rx.Bc.Loop,this.handlePlayerLoop)),this.disposer.register(addDisposableListener(this.player,rx.Bc.Complete,this.handlePlayerComplete)))}disconnectedCallback(){super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose()}statesToQueueChanged(){this.statesToQueue&&this.statesToQueue.length>0&&(this.nextStates.push(...this.statesToQueue),this.renderState())}visibleChanged(O,B){O!==B&&!1===B&&this.player&&(this.player.getLottie().currentFrame=this.player.getLottie().totalFrames-1,this.isPlaying=!1,this.nextStates.length>0&&(this.nextStates=[this.nextStates[this.nextStates.length-1]],this.renderState()))}dataChanged(){this.renderState()}renderState(){var O,B;if(this.$fastController.isConnected&&null!==this.data&&this.nextStates.length>0&&!this.isPlaying){const U=this.nextStates.shift();null===(O=this.player)||void 0===O||O.setLooping(U.toLowerCase().endsWith("loop")&&0===this.nextStates.length),null===(B=this.player)||void 0===B||B.load(this.data[U]).catch(null)}}};__decorate([attr({attribute:"playing",mode:"boolean"}),__metadata("design:type",Boolean)],ax.prototype,"isPlaying",void 0),__decorate([observable,__metadata("design:type",Object)],ax.prototype,"data",void 0),__decorate([observable,__metadata("design:type",Array)],ax.prototype,"statesToQueue",void 0),__decorate([observable,__metadata("design:type",Boolean)],ax.prototype,"visible",void 0),ax=__decorate([customElement({name:"animated-icon",template:ox,styles:nx}),__metadata("design:paramtypes",[])],ax);const sx=html`
  <template ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}>
    <button
      type="button"
      class="icon"
      aria-label=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.ariaLabelText}}
      aria-live="polite"
      ?disabled=${O=>!O.isEnabled}
    >
      <animated-icon
        :data=${O=>O.iconData}
        :statesToQueue=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.iconNextStates}}
        :visible=${O=>O.isEnabled}
      ></animated-icon>
      <div class="css-animation-container">
        <div class="animation listening"></div>
        <div class="animation loading">
          <div class="dot one"></div>
          <div class="dot two"></div>
          <div class="dot three"></div>
          <div class="dot four"></div>
          <div class="dot five"></div>
        </div>
        <div class="animation speaking">
          <div class="bars outer"></div>
          <div class="bars middle"></div>
          <div class="bars center"></div>
        </div>
      </div>
    </button>
  </template>
`,lx=JSON.parse('{"_":{"nothing":{"v":"5.10.0","fr":60,"ip":0,"op":60,"w":288,"h":288,"nm":"nothing_Light_01","ddd":0,"assets":[],"layers":[],"markers":[]},"micDisabledToMicListening":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micDisabledToMicListening_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":4,"td":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[100]},{"t":20.666015625,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[144]},{"t":20,"s":[168]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":8,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[88]},{"t":20,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[132]},{"t":40,"s":[144]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":40,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[1.858,3.788],"ti":[-1.858,-3.788]},{"t":40,"s":[-23.855,29.481]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[-3.809,-4.618],"ti":[3.809,4.618]},{"t":40,"s":[7.144,-34.456]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-29],"to":[0,2.833],"ti":[0,-2.833]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":40,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[0.62,-4.874],"ti":[-0.62,4.874]},{"t":40,"s":[-31.279,-22.491]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[0.139,5.223],"ti":[-0.139,-5.223]},{"t":40,"s":[30.832,24.588]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-29],"to":[0,2.833],"ti":[0,-2.833]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[-45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[50.3]},{"t":20,"s":[17.4]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":1,"y":0},"t":17.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,67.438],[0,67.5]],"c":false}]},{"t":18,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,67.438],[-161.5,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[216,216]},{"t":40,"s":[188,188]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[4]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[216,216]},{"t":40,"s":[190,190]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micDisabledToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micDisabledToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":4,"td":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[100]},{"t":15.5,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":15,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[144]},{"t":15,"s":[168]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":8,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[88]},{"t":15,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[132]},{"t":30,"s":[144]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":15,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":0,"k":[-35,6.8],"ix":5},"e":{"a":0,"k":[30,-6.8],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-29],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":15,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[40,25.8],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]},{"t":15,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micDisabled":{"v":"5.10.0","fr":60,"ip":0,"op":15,"w":288,"h":288,"nm":"micDisabled_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":3,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":132,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-29],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micListeningToMicDisabled":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micListeningToMicDisabled_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":4,"td":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":20.666015625,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":40,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[168]},{"t":40,"s":[144]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":8,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[0]},{"t":40,"s":[88]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[144]},{"t":40,"s":[132]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":20,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-27.813,31.198],"to":[-1.198,-4.066],"ti":[1.198,4.066]},{"t":40,"s":[-35,6.8]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[15.633,-38.258],"to":[2.394,5.243],"ti":[-2.394,-5.243]},{"t":40,"s":[30,-6.8]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2.833],"ti":[0,2.833]},{"t":40,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[45]},{"t":40,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":20,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-18.974,-34.917],"to":[-2.671,6.953],"ti":[2.671,-6.953]},{"t":40,"s":[-35,6.8]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[34.725,18.311],"to":[-0.788,-4.185],"ti":[0.788,4.185]},{"t":40,"s":[30,-6.8]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2.833],"ti":[0,2.833]},{"t":40,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-45]},{"t":40,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[50.3]},{"t":40,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":22,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,67.438],[-161.5,67.5]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":22.666,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,67.438],[0,67.5]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":20,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":20,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[188,188]},{"t":40,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[4]},{"t":40,"s":[0]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[190,190]},{"t":40,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micListeningToMicLoading":{"v":"5.10.0","fr":60,"ip":0,"op":60,"w":288,"h":288,"nm":"micListeningToMicLoading_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[96,96],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":-90,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[100]},{"t":0.666015625,"s":[1]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[99]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":0.666,"s":[0]},{"t":60,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":-90,"s":[-90]},{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[270]},{"t":60,"s":[630]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.999,0.999],"y":[1,1]},"o":{"x":[1,1],"y":[0,0]},"t":6.666,"s":[8,96]},{"t":26.666015625,"s":[8,8]}],"ix":2},"p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":6.666,"s":[0,0],"to":[0,-7.333],"ti":[0,7.333]},{"t":26.666015625,"s":[0,-44]}],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":26.666,"s":[100]},{"t":27.333984375,"s":[0]}],"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-23.855,29.481],"ix":5},"e":{"a":0,"k":[7.144,-34.456],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.999,0.999],"y":[1,1]},"o":{"x":[1,1],"y":[0,0]},"t":0,"s":[8,96]},{"t":20,"s":[8,8]}],"ix":2},"p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[0,0],"to":[0,7.333],"ti":[0,-7.333]},{"t":20,"s":[0,44]}],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[100]},{"t":20.666015625,"s":[0]}],"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-31.279,-22.491],"ix":5},"e":{"a":0,"k":[30.832,24.588],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[188,188]},{"t":26.666015625,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[4]},{"t":26.666015625,"s":[0]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[190,190]},{"t":26.666015625,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micListeningToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micListeningToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":30,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-27.813,31.198],"to":[-1.198,-4.066],"ti":[1.198,4.066]},{"t":30,"s":[-35,6.8]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[15.633,-38.258],"to":[2.394,5.243],"ti":[-2.394,-5.243]},{"t":30,"s":[30,-6.8]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2.833],"ti":[0,2.833]},{"t":30,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[45]},{"t":30,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":30,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-18.974,-34.917],"to":[-2.671,6.953],"ti":[2.671,-6.953]},{"t":30,"s":[-35,6.8]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[34.725,18.311],"to":[-0.788,-4.185],"ti":[0.788,4.185]},{"t":30,"s":[30,-6.8]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2.833],"ti":[0,2.833]},{"t":30,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-45]},{"t":30,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":15,"s":[50.3]},{"t":30,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":16.5,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,67.438],[-161.5,67.5]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":17,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,67.438],[0,67.5]],"c":false}]},{"t":30,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[188,188]},{"t":30,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[4]},{"t":30,"s":[0]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[190,190]},{"t":30,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micListeningToMicTextbox":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micListeningToMicTextbox_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[32,56]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-31.279,-22.491],"to":[-0.62,4.874],"ti":[0.62,-4.874]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30.832,24.588],"to":[-0.139,-5.223],"ti":[0.139,5.223]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2],"ti":[0,2]},{"t":40,"s":[0,-24]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-45]},{"t":40,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[32,56]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-23.855,29.481],"to":[-1.858,-3.788],"ti":[1.858,3.788]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[7.144,-34.456],"to":[3.809,4.618],"ti":[-3.809,-4.618]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,-2],"ti":[0,2]},{"t":40,"s":[0,-24]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[45]},{"t":40,"s":[0]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[72,134]},{"t":40,"s":[50,93.056]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[17.4]},{"t":40,"s":[50.3]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":19.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,60.719],[-161.5,60.782]],"c":false}]},{"i":{"x":0.25,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,60.217],[0,60.28]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.375],[-0.25,48]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[8]},{"t":40,"s":[6]}],"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":2,"ix":10},"g":{"p":2,"k":{"a":0,"k":[0,1,1,1,1,0,0,0],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[100,0],"ix":5},"t":1,"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-43.5],"to":[0,1.708],"ti":[0,-1.708]},{"t":40,"s":[0,-33.25]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":5,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":40,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[100]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-90]},{"t":40,"s":[270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":40,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[188,188],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[10]},{"t":20,"s":[0]}],"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[190,190],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micListeningToTtsLoading":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micListeningToTtsLoading_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[0,0]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.128,0.2,0.596,0.922,0.502,0.2,0.596,0.922,0.875,0.2,0.596,0.922,0.876,0.2,0.596,0.922,0.877,0.2,0.596,0.922]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-31.279,-22.491],"to":[-0.62,4.874],"ti":[0.62,-4.874]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30.832,24.588],"to":[-0.139,-5.223],"ti":[0.139,5.223]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[8,96]},{"t":40,"s":[0,0]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.128,0.2,0.596,0.922,0.502,0.2,0.596,0.922,0.875,0.2,0.596,0.922,0.876,0.2,0.596,0.922,0.877,0.2,0.596,0.922]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-23.855,29.481],"to":[-1.858,-3.788],"ti":[1.858,3.788]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[7.144,-34.456],"to":[3.809,4.618],"ti":[-3.809,-4.618]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":40,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[100]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-90]},{"t":40,"s":[270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":40,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[188,188],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[10]},{"t":20,"s":[0]}],"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[190,190],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micLoadingToMicDisabled":{"v":"5.10.0","fr":60,"ip":0,"op":113,"w":288,"h":288,"nm":"micLoadingToMicDisabled_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":3,"td":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":83,"s":[0]},{"t":84,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":83,"op":1439,"st":-54,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":83,"s":[0]},{"t":113,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":83,"s":[168]},{"t":113,"s":[144]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":8,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":83,"s":[0]},{"t":113,"s":[88]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":83,"op":1439,"st":-54,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":83,"s":[144]},{"t":113,"s":[132]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":83,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":113,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":83,"s":[0,-162],"to":[0,22.167],"ti":[0,-22.167]},{"t":113,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":83,"s":[0]},{"t":113,"s":[100]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":83,"s":[17.4]},{"t":113,"s":[50.3]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0},"t":86,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-156,66.375],[-155,67]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":87,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1,66.875],[0,67.5]],"c":false}]},{"t":113,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":83,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":113,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":83,"op":1439,"st":-54,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.833,0.833],"y":[0.833,0.833]},"o":{"x":[0.167,0.167],"y":[0.167,0.167]},"t":58.334,"s":[96,96]},{"t":83.333984375,"s":[72,72]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":75,"s":[100]},{"t":75.833984375,"s":[1]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":75,"s":[99]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":75.834,"s":[0]},{"t":150,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[-90]},{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":75,"s":[270]},{"t":150,"s":[630]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":84,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":83.334,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":108.333984375,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micLoadingToMicListening":{"v":"5.10.0","fr":60,"ip":0,"op":67,"w":288,"h":288,"nm":"micLoadingToMicListening_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":22,"s":[100]},{"t":37,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[96,96],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":60,"s":[100]}],"ix":1},"e":{"a":0,"k":99,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[-90]},{"t":60,"s":[270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":61,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":37,"s":[8,8]},{"t":67,"s":[8,96]}],"ix":2},"p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":37,"s":[0,44],"to":[0,-7.333],"ti":[0,7.333]},{"t":67,"s":[0,0]}],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":37,"s":[0]},{"t":38,"s":[100]}],"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-23.855,29.481],"ix":5},"e":{"a":0,"k":[7.144,-34.456],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":27,"s":[8,8]},{"t":57,"s":[8,96]}],"ix":2},"p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":27,"s":[0,-44],"to":[0,7.333],"ti":[0,-7.333]},{"t":57,"s":[0,0]}],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":26,"s":[0]},{"t":27,"s":[100]}],"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-31.279,-22.491],"ix":5},"e":{"a":0,"k":[30.832,24.588],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":-45,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":27,"s":[216,216]},{"t":67,"s":[188,188]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":27,"s":[0]},{"t":67,"s":[4]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":27,"s":[216,216]},{"t":67,"s":[190,190]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micLoadingToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":87,"w":288,"h":288,"nm":"micLoadingToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#mic","ln":"mic","tt":1,"tp":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":67,"s":[0,-162],"to":[0,22.167],"ti":[0,-22.167]},{"t":87,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":67,"s":[17.4]},{"t":87,"s":[50.3]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0},"t":69,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-156,66.375],[-155,67]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":69.666,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1,66.875],[0,67.5]],"c":false}]},{"t":87,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":67,"op":1423,"st":-70,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.833,0.833],"y":[0.833,0.833]},"o":{"x":[0.167,0.167],"y":[0.167,0.167]},"t":46.668,"s":[96,96]},{"t":66.66796875,"s":[72,72]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":60,"s":[100]},{"t":60.66796875,"s":[1]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":60,"s":[99]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":60.668,"s":[0]},{"t":120,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[-90]},{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":60,"s":[270]},{"t":120,"s":[630]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":68,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circleAlpha","ln":"circleAlpha","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0,0,0],"y":[1,1,1]},"o":{"x":[0.001,0.001,0.001],"y":[0,0,0]},"t":0,"s":[25,25,100]},{"t":30,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":90,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micLoadingLoop":{"v":"5.10.0","fr":60,"ip":0,"op":150,"w":288,"h":288,"nm":"micLoading_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[96,96],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":75,"s":[100]},{"t":75.83203125,"s":[1]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":75,"s":[99]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":75.832,"s":[0]},{"t":150,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[-90]},{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":75,"s":[270]},{"t":150,"s":[630]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToMicDisabled":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micRestToMicDisabled_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#disabledAlpha","ln":"disabledAlpha","parent":4,"td":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":15.5,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":0,"ix":3},"y":{"a":0,"k":-12,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,72],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#disabled","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"disabled"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#disabled","ln":"disabled","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":30,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":15,"s":[168]},{"t":30,"s":[144]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[20,-20],[-19,19]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":8,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":15,"s":[0]},{"t":30,"s":[88]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Line","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[52,52],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.600000023842,0.600000023842,0.600000023842,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[25,18],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Circle","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#mic","ln":"mic","tt":2,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[144]},{"t":30,"s":[132]}],"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":15,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":9}},"s":{"a":0,"k":[-35,6.8],"ix":5},"e":{"a":0,"k":[30,-6.8],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-29],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":15,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[40,25.8],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":15,"s":[0,0.6,0.6,0.6,0.25,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.75,0.6,0.6,0.6,1,0.6,0.6,0.6]}],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToMicListening":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micRestToMicListening_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":30,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":30,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[1.858,3.788],"ti":[-1.858,-3.788]},{"t":30,"s":[-23.855,29.481]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[-3.809,-4.618],"ti":[3.809,4.618]},{"t":30,"s":[7.144,-34.456]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-29],"to":[0,2.833],"ti":[0,-2.833]},{"t":30,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":30,"s":[45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":30,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":30,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[0.62,-4.874],"ti":[-0.62,4.874]},{"t":30,"s":[-31.279,-22.491]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[0.139,5.223],"ti":[-0.139,-5.223]},{"t":30,"s":[30.832,24.588]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-29],"to":[0,2.833],"ti":[0,-2.833]},{"t":30,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":30,"s":[-45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[50.3]},{"t":15,"s":[17.4]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":1,"y":0},"t":13,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,67.438],[0,67.5]],"c":false}]},{"t":13.5,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,67.438],[-161.5,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[216,216]},{"t":30,"s":[188,188]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":0,"k":10,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":30,"s":[4]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[216,216]},{"t":30,"s":[190,190]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToMicLoading":{"v":"5.10.0","fr":60,"ip":0,"op":106,"w":288,"h":288,"nm":"micRestToMicLoading_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#loading","ln":"loading","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-43.5,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.833,0.833],"y":[0.833,0.833]},"o":{"x":[0.167,0.167],"y":[0.167,0.167]},"t":30.223,"s":[72,72]},{"t":50.888671875,"s":[96,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":48,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":-18,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":44,"s":[100]},{"t":44.689453125,"s":[1]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":44,"s":[99]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.75],"y":[0]},"t":44.689,"s":[0]},{"t":106,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":-18,"s":[-90]},{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":44,"s":[270]},{"t":106,"s":[630]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":30,"op":140,"st":-177,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","tt":1,"tp":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[0,-29],"to":[0,-22.167],"ti":[0,22.167]},{"t":30,"s":[0,-162]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[17.4]},{"t":30,"s":[50.3]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":3,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"i":{"x":0.833,"y":1},"o":{"x":1,"y":0},"t":29,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1,66.875],[0,67.5]],"c":false}]},{"t":30,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-156,66.375],[-155,67]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":30,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circleAlpha","ln":"circleAlpha","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":90,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToMicTextbox":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micRestToMicTextbox_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":40,"s":[32,56]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":0.25},"o":{"x":0.75,"y":0.75},"t":0,"s":[-35,6.75],"to":[0,0],"ti":[0,0]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":0.25},"o":{"x":0.75,"y":0.75},"t":0,"s":[30,-6.75],"to":[0,0],"ti":[0,0]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-29],"to":[0,0.833],"ti":[0,-0.833]},{"t":40,"s":[0,-24]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[72,134]},{"t":40,"s":[50,93.056]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.375],[-0.25,48]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[8]},{"t":40,"s":[6]}],"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":2,"ix":10},"g":{"p":2,"k":{"a":0,"k":[0,1,1,1,1,0,0,0],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[100,0],"ix":5},"t":1,"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-43.5],"to":[0,1.708],"ti":[0,-1.708]},{"t":40,"s":[0,-33.25]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":5,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":40,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[100]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-90]},{"t":40,"s":[270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20.33984375,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToNothing":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micRestToNothing_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#mic","ln":"mic","tt":1,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[0,-29],"to":[0,18.333],"ti":[0,-18.333]},{"t":30,"s":[0,81]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[17.4]},{"t":30,"s":[50.3]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":15,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"t":30,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1,66.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#circleAlpha","ln":"circleAlpha","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.999,0.999,0.999],"y":[1,1,1]},"o":{"x":[1,1,1],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"t":30,"s":[25,25,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":90,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":1,"k":[{"i":{"x":[0.999,0.999],"y":[1,1]},"o":{"x":[1,1],"y":[0,0]},"t":0,"s":[216,216]},{"t":30,"s":[54,54]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[100]},{"t":30,"s":[0]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[90]},{"t":30,"s":[-180]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":15,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToTtsActive":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micRestToTtsActive_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":40,"s":[16,0]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]}],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-17],"to":[0,2.833],"ti":[0,-2.833]},{"t":40,"s":[0,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[17.4]},{"t":20,"s":[50.3]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":1,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,67.65],[0,67.5]],"c":false}]},{"t":20.666015625,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.75,67.375],[-161.25,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[100]},{"t":40,"s":[0]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[90]},{"t":40,"s":[-270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[100,100]},{"t":40,"s":[25,25]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRestToTtsLoading":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micRestToTtsLoading_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[46,78]},{"t":40,"s":[0,0]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]},{"t":40,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]}],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-17],"to":[0,1.417],"ti":[0,-1.416]},{"t":40,"s":[0,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[48,0],"to":[0,-7.65],"ti":[0,7.65]},{"t":40,"s":[48,-45.9]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":16.666,"s":[96,0],"to":[0,-7.65],"ti":[0,7.65]},{"t":36.666015625,"s":[96,-45.9]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[17.4]},{"t":20,"s":[50.3]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":1,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,67.65],[0,67.5]],"c":false}]},{"t":20.666015625,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.75,67.375],[-161.25,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[100]},{"t":40,"s":[0]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[90]},{"t":40,"s":[-270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[100]},{"t":20,"s":[0]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[100,100]},{"t":40,"s":[25,25]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micRest":{"v":"5.10.0","fr":60,"ip":0,"op":15,"w":288,"h":288,"nm":"micRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-29],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micTextboxToMicListening":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micTextboxToMicListening_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[32,56]},{"t":40,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[0.62,-4.874],"ti":[-0.62,4.874]},{"t":40,"s":[-31.279,-22.491]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[0.139,5.223],"ti":[-0.139,-5.223]},{"t":40,"s":[30.832,24.588]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-24],"to":[0,2],"ti":[0,-2]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[-45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[32,56]},{"t":40,"s":[8,96]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[-35,6.75],"to":[1.858,3.788],"ti":[-1.858,-3.788]},{"t":40,"s":[-23.855,29.481]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[30,-6.75],"to":[-3.809,-4.618],"ti":[3.809,4.618]},{"t":40,"s":[7.144,-34.456]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-24],"to":[0,2],"ti":[0,-2]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[50,93.056]},{"t":40,"s":[72,134]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[17.4]},{"t":20,"s":[50.3]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.375],[-0.25,48]],"c":false}]},{"i":{"x":0.833,"y":0.833},"o":{"x":1,"y":0},"t":17.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,60.217],[0,60.28]],"c":false}]},{"t":18,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.5,60.719],[-161.5,60.782]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[6]},{"t":40,"s":[8]}],"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":2,"ix":10},"g":{"p":2,"k":{"a":0,"k":[0,1,1,1,1,0,0,0],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[100,0],"ix":5},"t":1,"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-33.25],"to":[0,-1.708],"ti":[0,1.708]},{"t":40,"s":[0,-43.5]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":5,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[25,25,100]},{"t":40,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-270]},{"t":40,"s":[-90]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[25,25,100]},{"t":40,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[188,188],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":40,"s":[10]}],"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[190,190],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":40,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micTextboxToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"micTextboxToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[32,56]},{"t":40,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.875,0.106,0.29,0.937,0.876,0.106,0.29,0.937,0.877,0.106,0.29,0.937]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.25,"y":0.25},"o":{"x":0.75,"y":0.75},"t":0,"s":[-35,6.75],"to":[0,0],"ti":[0,0]},{"t":40,"s":[-35,6.75]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.25,"y":0.25},"o":{"x":0.75,"y":0.75},"t":0,"s":[30,-6.75],"to":[0,0],"ti":[0,0]},{"t":40,"s":[30,-6.75]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-24],"to":[0,-0.833],"ti":[0,0.833]},{"t":40,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[50,93.056]},{"t":40,"s":[72,134]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.375],[-0.25,48]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[6]},{"t":40,"s":[8]}],"ix":10},"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":2,"ix":10},"g":{"p":2,"k":{"a":0,"k":[0,1,1,1,1,0,0,0],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[100,0],"ix":5},"t":1,"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-33.25],"to":[0,-1.708],"ti":[0,1.708]},{"t":40,"s":[0,-43.5]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":5,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25,0.25],"y":[1,1,1]},"o":{"x":[0.75,0.75,0.75],"y":[0,0,0]},"t":0,"s":[25,25,100]},{"t":40,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[0]},{"t":40,"s":[100]}],"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[-270]},{"t":40,"s":[-90]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20.34,"s":[0]},{"t":40,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"micTextboxToTtsActive":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"micTextboxToTtsActive_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[32,56]},{"t":30,"s":[16,0]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]},{"t":30,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]}],"ix":9}},"s":{"a":0,"k":[-43.5,29],"ix":5},"e":{"a":0,"k":[41.05,25.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,-12],"to":[0,2],"ti":[0,-2]},{"t":30,"s":[0,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[50,93.1],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.999],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[50.3]},{"t":15,"s":[17.4]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.325],[-0.25,47.95]],"c":false}]},{"i":{"x":0.833,"y":1},"o":{"x":1,"y":0},"t":15,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,48.325],[-0.25,47.95]],"c":false}]},{"t":15.5,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-153,48.15],[-153.25,47.775]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":6,"ix":10},"g":{"p":3,"k":{"a":0,"k":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.905,0.106,0.29,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-33.2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0}],"markers":[]},"micTextbox":{"v":"5.10.0","fr":60,"ip":0,"op":15,"w":288,"h":288,"nm":"micTextbox_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[32,56],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0.128,0.157,0.439,0.918,0.502,0.131,0.365,0.927,0.877,0.106,0.29,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-24],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[50,93.056],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.375],[-0.25,48]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":6,"ix":10},"g":{"p":3,"k":{"a":0,"k":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.905,0.106,0.29,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-33.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0}],"markers":[]},"nothingToMicListening":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"nothingToMicListening_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#cancel","ln":"cancel","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0,0,0],"y":[1,1,1]},"o":{"x":[0.001,0.001,0.001],"y":[0,0,0]},"t":0,"s":[0,0,100]},{"t":30,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[31.5,62.875],[-31,0.5]],"c":false},"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-31,62.5],[31.25,0.25]],"c":false},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-48.25,6.5],"ix":4},"e":{"a":0,"k":[37.55,-9],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":0,"s":[54,54]},{"t":30,"s":[188,188]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0,0,0,1],"ix":3},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":30,"s":[10]}],"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":0,"s":[54,54]},{"t":30,"s":[190,190]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":30,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#outerRing","ln":"outerRing","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":0,"s":[54,54]},{"t":30,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":0,"s":[100]},{"t":30,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":0,"s":[360]},{"t":30,"s":[90]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"nothingToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":30,"w":288,"h":288,"nm":"nothingToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"#mic","ln":"mic","tt":1,"tp":3,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[46,78],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":98,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":0,"s":[0,81],"to":[0,-18.333],"ti":[0,18.333]},{"t":30,"s":[0,-29]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#bulb","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"bulb"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":17.4,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[17.4]},{"t":30,"s":[50.3]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":15,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-1,66.875],[0,67.5]],"c":false}]},{"t":30,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"#circleAlpha","ln":"circleAlpha","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0,0,0],"y":[1,1,1]},"o":{"x":[0.001,0.001,0.001],"y":[0,0,0]},"t":0,"s":[25,25,100]},{"t":30,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":90,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":1,"k":[{"i":{"x":[0,0],"y":[1,1]},"o":{"x":[0.001,0.001],"y":[0,0]},"t":0,"s":[54,54]},{"t":30,"s":[216,216]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":0,"s":[100]},{"t":30,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":0,"s":[360]},{"t":30,"s":[90]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":15,"s":[0]},{"t":30,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"ttsActiveToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"ttsActiveToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[16,0]},{"t":40,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0],"to":[0,-2.833],"ti":[0,2.833]},{"t":40,"s":[0,-17]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[50.3]},{"t":40,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":19.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.75,67.375],[-161.25,67.5]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,67.65],[0,67.5]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[100]},{"t":40,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[90]},{"t":40,"s":[-270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":40,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[25,25]},{"t":40,"s":[100,100]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"ttsActiveToMicTextbox":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"ttsActiveToMicTextbox_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[16,0]},{"t":40,"s":[32,56]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]},{"t":40,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]}],"ix":9}},"s":{"a":0,"k":[-43.5,29],"ix":5},"e":{"a":0,"k":[41.05,25.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0],"to":[0,-2],"ti":[0,2]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[50,93.1],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[50.3]},{"t":40,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0},"t":19.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-153,48.15],[-153.25,47.775]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,48.325],[-0.25,47.95]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.325],[-0.25,47.95]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":6,"ix":10},"g":{"p":3,"k":{"a":0,"k":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.905,0.106,0.29,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-33.2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0}],"markers":[]},"ttsLoadingToMicRest":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"ttsLoadingToMicRest_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[0,0]},{"t":40,"s":[46,78]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]},{"t":40,"s":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937]}],"ix":9}},"s":{"a":0,"k":[-35,6.75],"ix":5},"e":{"a":0,"k":[30,-6.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0],"to":[0,-2.833],"ti":[0,2.833]},{"t":40,"s":[0,-17]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":3.334,"s":[48,-45.9],"to":[0,7.65],"ti":[0,-7.65]},{"t":23.333984375,"s":[48,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[96,-45.9],"to":[0,7.65],"ti":[0,-7.65]},{"t":20,"s":[96,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[72,134],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[50.3]},{"t":40,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":19.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-161.75,67.375],[-161.25,67.5]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,67.65],[0,67.5]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.5,83.875],[0,67.5]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-43.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"#circle","ln":"circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":3,"s":{"a":0,"k":[216,216],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":320,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[100]},{"t":40,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.75],"y":[0]},"t":0,"s":[90]},{"t":40,"s":[-270]}],"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":8,"ix":10},"g":{"p":5,"k":{"a":0,"k":[0,0.094,0.757,0.929,0.25,0.149,0.671,0.924,0.5,0.204,0.584,0.918,0.75,0.167,0.482,0.927,1,0.129,0.38,0.937],"ix":8}},"s":{"a":0,"k":[-72,88],"ix":4},"e":{"a":0,"k":[72,-88],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 1","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411768913,0.941176474094,0.976470589638,1],"ix":4},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"t":40,"s":[100]}],"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[25,25]},{"t":40,"s":[100,100]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Bubble","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":1509,"st":0,"ct":1,"bm":0}],"markers":[]},"ttsLoadingToMicTextbox":{"v":"5.10.0","fr":60,"ip":0,"op":40,"w":288,"h":288,"nm":"ttsLoadingToMicTextbox_Light_01","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":3,"ty":4,"nm":"#ttsFeeedbackStart","ln":"ttsFeeedbackStart","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[144,144,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-96,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farLeft","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"farLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-48,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midLeft","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false,"ln":"midLeft"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.75,0.75],"y":[0,0]},"t":0,"s":[0,0]},{"t":40,"s":[32,56]}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":34,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0.2,0.596,0.922,0.25,0.2,0.596,0.922,0.5,0.2,0.596,0.922,0.75,0.2,0.596,0.922,1,0.2,0.596,0.922]},{"t":40,"s":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.903,0.106,0.29,0.937,0.904,0.106,0.29,0.937,0.905,0.106,0.29,0.937]}],"ix":9}},"s":{"a":0,"k":[-43.5,29],"ix":5},"e":{"a":0,"k":[41.05,25.75],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.75,"y":0},"t":0,"s":[0,0],"to":[0,-2],"ti":[0,2]},{"t":40,"s":[0,-12]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#middle","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false,"ln":"middle"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.172549024224,0.478431373835,0.921568632126,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":3.334,"s":[48,-45.9],"to":[0,7.65],"ti":[0,-7.65]},{"t":23.333984375,"s":[48,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#midRight","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false,"ln":"midRight"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[16,0],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":8,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"fl","c":{"a":0,"k":[0.113725490868,0.741176486015,0.929411768913,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.999,"y":1},"o":{"x":1,"y":0},"t":0,"s":[96,-45.9],"to":[0,7.65],"ti":[0,-7.65]},{"t":20,"s":[96,0]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#farRight","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false,"ln":"farRight"}],"ip":0,"op":5420,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"#mic","ln":"mic","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":144,"ix":3},"y":{"a":0,"k":144,"ix":4}},"a":{"a":0,"k":[0,-12,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[50,93.1],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":92,"ix":4},"nm":"Bowl","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0],"y":[1]},"o":{"x":[0.001],"y":[0]},"t":20,"s":[50.3]},{"t":40,"s":[17.4]}],"ix":1},"e":{"a":0,"k":50.3,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0},"t":19.334,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-153,48.15],[-153.25,47.775]],"c":false}]},{"i":{"x":0,"y":1},"o":{"x":0.001,"y":0},"t":20,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,48.325],[-0.25,47.95]],"c":false}]},{"t":40,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,59.325],[-0.25,47.95]],"c":false}]}],"ix":2},"nm":"Tail","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gs","o":{"a":0,"k":100,"ix":9},"w":{"a":0,"k":6,"ix":10},"g":{"p":3,"k":{"a":0,"k":[0.115,0.157,0.439,0.918,0.51,0.131,0.365,0.927,0.905,0.106,0.29,0.937],"ix":8}},"s":{"a":0,"k":[-43.5,29],"ix":4},"e":{"a":0,"k":[41.05,25.75],"ix":5},"t":1,"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":13},"bm":0,"nm":"Gradient Stroke 2","mn":"ADBE Vector Graphic - G-Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,-33.2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"#stand","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false,"ln":"stand"}],"ip":0,"op":1356,"st":-137,"ct":1,"bm":0}],"markers":[]},"ttsLoadingToTtsActive":{"v":"5.10.0","fr":60,"ip":0,"op":15,"w":288,"h":288,"nm":"ttsLoadingToTtsActive_Light_01","ddd":0,"assets":[],"layers":[],"markers":[]}}}');let cx=class extends St{constructor(){super(...arguments),this.isEnabled=!1,this.iconData=lx._}vmChanged(O,B){var U;void 0===O&&void 0!==B&&(null===(U=this.vm)||void 0===U||U.queueIconNextStates(void 0,this.state))}stateChanged(O,B){var U;null===(U=this.vm)||void 0===U||U.queueIconNextStates(O,B)}};__decorate([attr,__metadata("design:type",String)],cx.prototype,"state",void 0),__decorate([observable,__metadata("design:type",Object)],cx.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],cx.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],cx.prototype,"isEnabled",void 0),__decorate([observable,__metadata("design:type",Object)],cx.prototype,"iconData",void 0),cx=__decorate([customElement({name:"cib-speech-icon",template:sx,styles:ix})],cx);const dx=css`
  :host {
    position: absolute;
    max-width: 310px;
    box-sizing: border-box;
    padding: 16px;
    inset-inline-start: -12px;
    bottom: calc(100% + 18px);
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    border-radius: 6px;
    box-shadow: ${tb.theme.shadows.elevations.elevation28};
    opacity: 0;
    background-color: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
    will-change: transform;
  }

  :host([persistent]) {
    padding-inline-end: 24px;
    animation-name: tooltip-enter;
    animation-fill-mode: both;
    animation-delay: 2s;
    animation-duration: ${tb.static.motion.duration.normal};
    animation-timing-function: ${tb.static.motion.easingFunction.motionIn};
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  :host([visible]) {
    transition-delay: ${tb.static.motion.duration.normal};
  }

  :host([persistent]),
  :host([visible]) {
    opacity: 1;
  }

  :host::before {
    content: "";
    position: absolute;
    top: 100%;
    inset-inline-start: var(--arrow-start-offset);
    border: 10px solid transparent;
    border-bottom: none;
    border-top-color: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    filter: drop-shadow(0 1px 0 ${tb.theme.neutralColors.stroke.colorNeutralStroke});
    transition-property: inset-inline-start;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host button {
    position: absolute;
    top: 4px;
    inset-inline-end: 4px;
    height: 20px;
    width: 20px;
    border: none;
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackground};
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  :host button:hover {
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackgroundHover};
  }

  :host button:active {
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackgroundPressed};
  }

  :host button:focus-visible {
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
  }

  @keyframes tooltip-enter {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`,px=html`
  <template role=${O=>O.persistent?"dialog":"tooltip"}>
    <slot></slot>
    ${when((O=>O.persistent),html` <button
        aria-label=${O=>O.closeBtnAriaLabel}
        @click=${(O,B)=>O.handleTooltipCloseClick(B.event)}
      >
        <svg-icon type=${lE.Clear12} size="12"></svg-icon>
      </button>`)}
  </template>
`;let ux=class extends St{constructor(){super(),this.anchorId="",this.persistent=!1,this.arrowOffset=24,this.visible=!1,this.closeBtnAriaLabel="",this.anchorElement=null,this.handleTooltipCloseClick=O=>{O.preventDefault(),O.stopPropagation(),this.$emit("close")},this.handleAnchorMouseOver=()=>{this.showTooltip()},this.handleAnchorMouseOut=()=>{this.hideTooltip()},this.handleAnchorFocusIn=()=>{this.showTooltip()},this.handleAnchorFocusOut=()=>{this.hideTooltip()},this.showTooltip=()=>{this.visible||(this.visible=!0)},this.hideTooltip=()=>{this.visible&&(this.visible=!1)},this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.persistent||""===this.anchorId||(this.anchorElement=this.getAnchorElement(this.anchorId),this.anchorElement&&(this.disposer.register(addDisposableListener(this.anchorElement,"mouseover",this.handleAnchorMouseOver)),this.disposer.register(addDisposableListener(this.anchorElement,"mouseout",this.handleAnchorMouseOut)),this.disposer.register(addDisposableListener(this.anchorElement,"focusin",this.handleAnchorFocusIn)),this.disposer.register(addDisposableListener(this.anchorElement,"focusout",this.handleAnchorFocusOut))))}disconnectedCallback(){super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose()}arrowOffsetChanged(O,B){this.style.setProperty("--arrow-start-offset",`${B}px`)}getAnchorElement(O=""){const B=this.getRootNode();return B instanceof ShadowRoot?B.getElementById(O):document.getElementById(O)}};__decorate([attr({attribute:"anchor-id"}),__metadata("design:type",String)],ux.prototype,"anchorId",void 0),__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],ux.prototype,"persistent",void 0),__decorate([attr({attribute:"arrow-offset"}),__metadata("design:type",Number)],ux.prototype,"arrowOffset",void 0),__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],ux.prototype,"visible",void 0),__decorate([observable,__metadata("design:type",String)],ux.prototype,"closeBtnAriaLabel",void 0),ux=__decorate([customElement({name:"cib-tooltip",template:px,styles:dx}),__metadata("design:paramtypes",[])],ux);const hx=css`
  @keyframes typing-indicator-dot {
    0% {
      transform: scale(0.75);
    }
    33% {
      transform: scale(1);
    }
    66% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.75);
    }
  }

  /* HOST */

  :host {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: calc(100% + 20px);
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transform: translateY(24px);
    transition-property: opacity, transform;
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host([mobile][serp-slot=${jy.None}]) {
    bottom: 90px;
  }

  :host([cancelable]) {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    transition-delay: ${tb.static.motion.duration.normal};
    transition-duration: ${tb.static.motion.duration.normal};
  }

  :host([disabled]) {
    cursor: wait;
  }

  /* TYPING CONTROL ITEM */

  .typing-control-item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundSolid};
    border-radius: 8px;
    height: 40px;
    box-sizing: border-box;
    padding: 0 8px;
    line-height: 28px;
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    border: 1px solid ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: 15px;
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  .typing-control-item svg-icon {
    display: flex;
  }

  /* TYPING CONTROL - STOP BUTTON */

  .typing-control-item.stop {
    gap: 6px;
    padding: 0 12px;
  }

  /* TYPING CONTROL - DOT INDICATOR */

  .typing-control-item.indicator {
    display: none;
    gap: 0;
    padding: 0;
    width: 56px;
  }

  .typing-control-item:not(.indicator) {
    cursor: pointer;
  }

  .typing-control-item.indicator .indicator-dot {
    height: 8px;
    width: 8px;
    border-radius: 4px;
    margin: 2px;
    animation: typing-indicator-dot 1.5s infinite;
    background: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  .typing-control-item.indicator .indicator-dot:nth-child(2) {
    animation-delay: 0.25s;
  }

  .typing-control-item.indicator .indicator-dot:nth-child(3) {
    animation-delay: 0.5s;
  }

  .typing-control-item[disabled] {
    opacity: 0.7;
    pointer-events: none;
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    bottom: 0;
    top: 0;
    transform: none;
    justify-content: flex-start;
    position: relative;
    width: unset;
  }

  :host([serp-slot=${jy.Creator}]) {
    justify-content: flex-end;
    margin-right: 20px;
  }

  :host([serp-slot=${jy.Creator}]) .typing-control-item,
  :host([serp-slot=${jy.Pole}]) .typing-control-item,
  :host([serp-slot=${jy.RightRail}]) .typing-control-item {
    height: 36px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    border: none;
  }

  :host([serp-slot=${jy.Creator}]) .typing-control-item::after,
  :host([serp-slot=${jy.Pole}]) .typing-control-item::after,
  :host([serp-slot=${jy.RightRail}]) .typing-control-item::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 8px;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    pointer-events: none;
  }

  /* MOBILE */
  /* PRODUCT TYPE */

  :host([mobile]) .typing-control-item,
  :host([product-type=${Mb.Shoreline}]) .typing-control-item {
    height: 36px;
    margin: 3px 0;
    padding: 0 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
  }
`.withBehaviors(tE(css`
    .typing-control-item.indicator .indicator-dot {
      background: ${iE.CanvasText};
    }

    .typing-control-item:not(.indicator) {
      color: ${iE.ButtonText};
      outline: ${iE.ButtonText};
    }

    .typing-control-item:not(.indicator):hover,
    .typing-control-item:not(.indicator):focus-visible {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
      border-color: ${iE.Highlight};
      outline: ${iE.Highlight};
    }

    .button-compose:hover,
    .button-compose:focus-visible {
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
    }

    .button-compose:hover .button-compose-text,
    .button-compose:focus-visible .button-compose-text {
      forced-color-adjust: none;
    }

    .text-input .user-text::placeholder {
      color: currentColor;
    }

    .text-input .autosuggest-text {
      color: ${iE.Highlight};
    }
  `)),mx=html`
  <template
    serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}
    product-type=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.productType}}
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    ?cancelable=${O=>O.vm.isVisible}
    ?disabled=${O=>!O.vm.isEnabled}
  >
    ${when((O=>O.vm.enableStreamStop),html`
        <button
          id="stop-responding-button"
          class="typing-control-item stop"
          type="button"
          aria-label=${O=>O.vm.strings.stopRespondingAriaLabel}
          @click=${(O,B)=>O.handleCancelClick(B.event)}
          ?disabled=${O=>!O.vm.isEnabled}
        >
          ${when((O=>O.vm.isEnabled),html`<svg-icon type=${lE.Stop} size="24"></svg-icon>`)}
          <div>${O=>O.vm.text}</div>
        </button>
      `)}
  </template>
`;let gx=class extends St{constructor(){super(...arguments),this.handleCancelClick=O=>(O.stopPropagation(),this.vm.cancelPendingRequest(),!0)}};__decorate([observable,__metadata("design:type",Object)],gx.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],gx.prototype,"layout",void 0),gx=__decorate([customElement({name:"cib-typing-indicator",template:mx,styles:hx})],gx);const fx=html`
  <form id="searchboxform" autocomplete="off">
    <label
      class="text-input"
      data-input=${O=>O.vm.inputText}
      data-suggestion=${O=>O.vm.isInputFocused?O.vm.autoSuggestText+" "+(O.layout.isMobile?O.vm.strings.autoSuggestTap:O.vm.strings.autoSuggestTab):O.vm.inputText}
    >
      <div class="autosuggest" ?hidden=${O=>0===O.vm.autoSuggestText.length}>
        <span class="autosuggest-text prepend">${O=>O.vm.autoSuggestPrependedText}</span>
        <span class="autosuggest-text append">${O=>O.vm.autoSuggestAppendedText}</span>
        <span
          class="autosuggest-button"
          ${ref("autoSuggestTapButtonRef")}
          @click=${O=>O.handleAutoSuggestButtonClick()}
          >${O=>O.layout.isMobile?O.vm.strings.autoSuggestTap:O.vm.strings.autoSuggestTab}</span
        >
      </div>
      <textarea
        ${ref("textAreaRef")}
        class="text-area"
        id="searchbox"
        name="searchbox"
        type="text"
        aria-label=${O=>O.vm.strings.textInputAriaLabel}
        rows="1"
        enterkeyhint="send"
        maxlength="2000"
        dir=""
        autofocus
        autocapitalize="off"
        autocorrect=${O=>O.layout.isMobile?"on":"off"}
        autocomplete="off"
        aria-autocomplete="both"
        spellcheck="false"
        maxlength=${O=>O.maxLength}
        @change=${(O,B)=>O.handleInputTextChanged(B.event)}
        @input=${(O,B)=>O.handleInputTextChanged(B.event)}
        @keyup=${(O,B)=>O.handleInputTextKey(B.event)}
        @keydown=${(O,B)=>O.handleInputTextKey(B.event)}
        @paste=${(O,B)=>(O.handlePaste(B.event),!0)}
        @compositionstart=${O=>O.handleComposingStart()}
        @compositionend=${O=>O.handleComposingEnd()}
        @focus=${(O,B)=>O.onInputFocus()}
        @blur=${(O,B)=>O.onInputBlur()}
        placeholder=${O=>O.vm.strings.placeholder}
        :value=${O=>O.vm.inputText}
        ?disabled=${O=>O.vm.isSpeechModeEnabled}
      ></textarea>
    </label>
  </form>
`,yx=html`
  <form id="searchboxform" autocomplete="off" disabled>
    <label
      class="text-input"
      data-input=${O=>O.vm.inputText}
      data-suggestion=${O=>O.vm.isInputFocused?O.vm.autoSuggestText+" "+(O.layout.isMobile?O.vm.strings.autoSuggestTap:O.vm.strings.autoSuggestTab):O.vm.inputText}
    >
      <textarea
        ${ref("textAreaRef")}
        class="text-area"
        id="searchbox"
        name="searchbox"
        type="text"
        aria-label=${O=>O.vm.isSuspended?O.vm.strings.suspendedConvPlaceholder:O.vm.strings.textInputAriaLabel}
        rows="1"
        dir=""
        placeholder=${O=>O.vm.strings.placeholder}
        :value=${O=>O.vm.inputText}
        disabled
      ></textarea>
    </label>
  </form>
`,_x=html`
  ${when((O=>O.vm.enableSpeechInput),html`
      <div class="controls-audio">
        <cib-speech-icon
          id="cib-speech-icon"
          class="speech-icon"
          state=${O=>O.vm.speechIconState}
          :vm=${O=>O.vm.serp.speechIcon}
          :layout=${O=>O.layout}
          :isEnabled=${O=>O.vm.isSpeechModeEnabled}
          @click=${(O,B)=>O.handleSpeechMicClick(B.event)}
          ${ref("audioControlsRef")}
        ></cib-speech-icon>
      </div>
    `)}
`,vx=html`
  <div class="button-compose-wrapper">
    <button
      class="button-compose"
      type="button"
      aria-label=${O=>O.vm.strings.composeButton}
      ?disabled=${O=>O.vm.isNewTopicDisabled}
      ?collapsed=${O=>O.vm.isComposeButtonCollapsed&&!O.vm.isNewTopicDisabled}
      @click=${(O,B)=>O.handleResetClick(B.event)}
    >
      <div class="button-compose-content" ${ref("composeButtonContentRef")}>
        <svg-icon class="button-compose-icon" type=${lE.Brush} size="32"></svg-icon>
        <div class="button-compose-text">${O=>O.vm.strings.composeButton}</div>
      </div>
    </button>
    <div class="button-compose-hint">${O=>O.vm.strings.composeButton}</div>
  </div>
`,bx=html`
  <div class="controls-left">
    <div class="control chat">
      <svg-icon type=${lE.Chat} size="20"></svg-icon>
    </div>
    <div class="control keyboard">
      <button
        class="button"
        type="button"
        aria-label=${O=>O.vm.strings.textInputModeButtonAriaLabel}
        ?disabled=${O=>!O.vm.isSpeechModeEnabled}
        @click=${(O,B)=>!O.vm.isDisabled&&O.handleKeyboardClick(B.event)}
      >
        <svg-icon type=${lE.Keyboard} size="24"></svg-icon>
      </button>
    </div>
  </div>
`,Sx=html`
  <cib-tooltip
    persistent
    arrow-offset=${O=>O.layout.isMobile?18:24}
    :closeBtnAriaLabel=${O=>O.vm.strings.close}
    @close=${O=>O.handleTooltipClose()}
    >${O=>O.vm.strings.composeButtonTooltip}</cib-tooltip
  >
`,Cx=html`
  ${when((O=>!O.vm.isSpeechModeEnabled),html`
      <div class="controls-right">
        ${when((O=>O.vm.enableSpeechInput),html`
            <div class="control microphone">
              <button
                class="button primary"
                type="button"
                aria-label=${O=>O.vm.strings.speechInputModeButtonAriaLabel}
                @click=${(O,B)=>!O.vm.isDisabled&&O.handleSpeechMicClick(B.event)}
                ?disabled=${O=>O.vm.isDisabled}
              >
                <svg-icon type=${lE.Microphone} size="20"></svg-icon>
              </button>
            </div>
          `)}
        <div class="control submit">
          <button
            class="button primary"
            type="button"
            aria-label=${O=>O.vm.strings.submitButtonAriaLabel}
            @click=${(O,B)=>!O.vm.isDisabled&&O.handleSubmitButtonClick(B.event)}
            ?disabled=${O=>O.vm.isDisabled}
          >
            <svg-icon type=${lE.SendFill} size="20"></svg-icon>
          </button>
        </div>
      </div>
    `)}
  ${when((O=>O.vm.isSpeechModeEnabled),html`
      <div class="control cancel">
        <button
          class="button"
          type="button"
          aria-label=${O=>O.vm.strings.cancelSpeechInputButtonAriaLabel}
          @click=${(O,B)=>!O.vm.isDisabled&&O.handleSpeechCancelClick(B.event)}
          ?disabled=${O=>O.vm.isDisabled}
        >
          <svg-icon type=${lE.Clear12} size="24"></svg-icon>
        </button>
      </div>
    `)}
`,Ex=html`
  <div
    class="root"
    ?edit-mode=${O=>O.vm.isEditModeEnabled}
    ?speech-enabled=${O=>O.vm.isSpeechModeEnabled}
    speech-state=${O=>O.vm.speechIconState}
    ?has-text=${O=>O.vm.inputText.length>0}
    ?to-submit=${O=>O.vm.isPendingSubmit}
  >
    <cib-typing-indicator :layout=${O=>O.layout} :vm=${O=>O.vm.typingIndicator}></cib-typing-indicator>
    <div class="outside-left-container">${vx}</div>
    <div class="main-container" ?focus=${O=>O.vm.isInputFocused} @click=${O=>O.handleMainContainerClick()}>
      <div class="speech-output" aria-live=${O=>O.vm.enableSpeechAriaLabel?"polite":"off"}>
        ${O=>O.vm.speechOutputText}
      </div>
      <div class="input-container">
        ${fx} ${bx} ${_x} ${Cx}
        ${html`
  <div class="bottom-bar">
    <div class="letter-counter"><span>${O=>O.vm.inputText.length}</span>/${O=>O.maxLength}</div>
    <div class="bottom-bar-controls">
      <button
        class="button"
        type="button"
        aria-label=${O=>O.vm.strings.editModeButtonAriaLabel}
        aria-expanded=${O=>O.vm.isEditModeEnabled}
        aria-live="polite"
        ?disabled=${O=>O.vm.isSpeechModeEnabled}
        @click=${(O,B)=>O.handleToggleEditModeClick(B.event)}
      >
        ${when((O=>O.vm.isEditModeEnabled),html`<svg-icon type=${lE.PinSolid} size="20"></svg-icon>`)}
        ${when((O=>!O.vm.isEditModeEnabled),html`<svg-icon type=${lE.Pin} size="20"></svg-icon>`)}
      </button>
    </div>
  </div>
`}
      </div>
    </div>
    ${when((O=>O.renderNewTopicTooltip&&O.vm.serp.inMode(Hy.Conversation)),html`${Sx}`)}
  </div>
`,xx=html`
  <div class="root">
    ${vx}
    <div class="main-container">
      <div class="input-container">${yx} ${bx} ${Cx}</div>
    </div>
  </div>
`,Tx=html`
  <div class="button-new-chat-wrapper">
    <button
      class="button-new-chat"
      type="button"
      aria-label=${O=>O.layout.isMobile?O.vm.strings.newChatButtonMobile:O.vm.strings.newChatButtonDesktop}
      @click=${(O,B)=>O.handleResetClick(B.event)}
    >
      <svg-icon class="button-new-chat-icon" type=${lE.AddChat} size="21"></svg-icon>
      <span class="button-new-chat-text">
        ${O=>O.layout.isMobile?O.vm.strings.newChatButtonMobile:O.vm.strings.newChatButtonDesktop}
      </span>
    </button>
  </div>
`,wx=html`
  <div
    class="root"
    ?has-text=${O=>O.vm.inputText.length>0}
    ?speech-enabled=${O=>O.vm.isSpeechModeEnabled}
    speech-state=${O=>O.vm.speechIconState}
  >
    <cib-typing-indicator :layout=${O=>O.layout} :vm=${O=>O.vm.typingIndicator}></cib-typing-indicator>
    <div
      id="speech-recognized-text"
      class="speech-output"
      aria-live=${O=>O.vm.enableSpeechAriaLabel?"polite":"off"}
    >
      ${O=>O.vm.speechOutputText}
    </div>
    <div class="outside-left-container">${vx}</div>
    <div class="main-container" ?focus=${O=>O.vm.isInputFocused}>
      <div class="input-container">${fx}</div>
    </div>
    ${_x} ${html`
  <div class="controls-right">
    <div class="control keyboard">
      <button
        id="keyboard-button"
        class="button"
        type="button"
        aria-label=${O=>O.vm.strings.textInputModeButtonAriaLabel}
        @click=${(O,B)=>!O.vm.isDisabled&&O.handleKeyboardClick(B.event)}
        ?disabled=${O=>O.vm.isDisabled||!O.vm.isSpeechModeEnabled}
      >
        <svg-icon type=${lE.Keyboard} size="28"></svg-icon>
      </button>
    </div>
    ${when((O=>!O.vm.isSpeechModeEnabled),html`
        ${when((O=>O.vm.enableSpeechInput),html`
            <div class="control microphone">
              <button
                id="mic-button"
                class="button primary"
                type="button"
                aria-label=${O=>O.vm.strings.speechInputModeButtonAriaLabel}
                @click=${(O,B)=>!O.vm.isDisabled&&O.handleSpeechMicClick(B.event)}
                ?disabled=${O=>O.vm.isDisabled}
              >
                <svg-icon type=${lE.Microphone} size="24"></svg-icon>
              </button>
            </div>
          `)}
        <div class="control submit">
          <button
            id="send-button"
            class="button primary"
            type="button"
            aria-label=${O=>O.vm.strings.submitButtonAriaLabel}
            @click=${(O,B)=>O.handleSubmitButtonClick(B.event)}
          >
            <svg-icon type=${lE.SendFill} size="20"></svg-icon>
          </button>
        </div>
      `)}
  </div>
`}
    ${when((O=>O.renderNewTopicTooltip&&O.vm.serp.inMode(Hy.Conversation)),html`${Sx}`)}
  </div>
`,kx=html`
  <div class="root ${O=>O.vm.isSuspended&&!O.vm.isAppStateError?"suspended":""}">
    <div class="outside-left-container">${vx}</div>
    <div class="main-container" ?focus=${O=>O.vm.isInputFocused}>
      <div class="input-container">${fx}</div>
    </div>
  </div>
`,Ax=html`
  <template
    id="cib-action-bar-main"
    ?mobile=${O=>O.layout.isMobile}
    serp-slot=${O=>O.layout.serpSlot}
    product-type=${O=>O.layout.productType}
    mode=${O=>O.vm.serp.mode}
    alignment=${O=>O.layout.alignment}
    ?cancelable=${O=>O.vm.isCancelEnabled}
    ?loading=${O=>O.isLoading}
    @click=${(O,B)=>!O.vm.isDisabled&&O.handleMobileActionBarClick(B.event)}
    ?disabled=${O=>O.vm.isDisabled}
  >
    ${O=>O.layout.isSharedConversation&&O.layout.serpSlot===jy.None&&O.vm.serp.mode===Hy.Conversation?Tx:O.layout.isMobile?O.vm.isDisabled?kx:wx:O.vm.isDisabled?xx:Ex}
  </template>
`;let Rx=class extends St{constructor(){super(...arguments),this.hasTransition=!1,this.isLoading=!0,this.renderNewTopicTooltip=!0,this.maxLength=2e3,this.handleToggleEditModeClick=O=>(O.stopPropagation(),this.vm.toggleEditMode(),this.vm.isEditModeEnabled&&setTimeout((()=>{var O;null===(O=this.textAreaRef)||void 0===O||O.focus()}),200),!0),this.handleCancelClick=O=>(O.stopPropagation(),this.vm.cancelPendingRequest(),!0),this.handleResetClick=O=>{var B;return this.renderNewTopicTooltip=!1,O.preventDefault(),O.stopPropagation(),null===(B=this.textAreaRef)||void 0===B||B.focus(),this.vm.resetConversation(),this.vm.closeRAISuggestions(),!0},this.handleKeyboardClick=O=>{var B;return O.stopPropagation(),this.layout.isMobile||null===(B=this.textAreaRef)||void 0===B||B.focus(),this.vm.inputMethod=Ji.Keyboard,!0},this.handleSpeechMicClick=O=>{var B,U,G;return O.stopPropagation(),this.vm.inputMethod===Ji.Keyboard&&(null===(G=null===(U=null===(B=this.audioControlsRef)||void 0===B?void 0:B.shadowRoot)||void 0===U?void 0:U.querySelector("button"))||void 0===G||G.focus()),this.vm.inputMethod=Ji.Speech,this.vm.handleSpeechChangeAsync(Vy.Mic),!0},this.handleTooltipClose=()=>{this.renderNewTopicTooltip=!1},this.handleSpeechIconKeyDown=O=>"Enter"!==O.key&&"Space"!==O.key||(this.vm.handleSpeechChangeAsync(Vy.Orb),!1),this.handleSpeechCancelClick=O=>(O.stopPropagation(),this.vm.cancelSpeechInteraction(),!0),this.handleMobileActionBarClick=O=>{var B;return this.layout.isMobile&&(O.stopPropagation(),null===(B=this.textAreaRef)||void 0===B||B.focus()),!0}}connectedCallback(){super.connectedCallback(),this.renderNewTopicTooltip=this.vm.isFirstTime,this.layout.serpSlot===jy.None&&(this.vm.forceOngoingConversationPlaceholderText=this.layout.isMobile),this.addEventListener("transitionend",this.onTransitionEnd),this.hasTransition=!1,setTimeout((()=>{var O,B;this.style.setProperty("--button-compose-collapsed-width","48px"),this.style.setProperty("--button-compose-expanded-width",`${null!==(B=null===(O=this.composeButtonContentRef)||void 0===O?void 0:O.offsetWidth)&&void 0!==B?B:48}px`)}),333),this.onLoad()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("transitionend",this.onTransitionEnd)}attributeChangedCallback(O,B,U){"mode"===O&&U!==B&&this.onTransitionStart()}onTransitionStart(){this.hasTransition=!0}onTransitionEnd(){this.hasTransition=!1}handleInputTextKey(O){var B;return this.vm.enableIMEFix&&"keydown"!==O.type||"Enter"!==O.key||O.shiftKey||O.isComposing?"Tab"!==O.key||!this.vm.autoSuggestText||("keyup"===O.type&&(this.vm.telemetry.trackEvent("InteractionEvent","TextGhostingAccept",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot),CustomData:JSON.stringify({enteredTextLength:this.vm.inputText.length,acceptedTextLength:this.vm.autoSuggestText.length,acceptMethod:"pressTab"})}),this.handleAcceptAutoSuggestText()),!1):(this.handleSubmitButtonClick(),this.vm.telemetry.trackInteractionEvent(O),!1)}handleInputTextChanged(O){var B;if(this.vm.isDisabled)return;const{value:U}=O.target;null===(B=this.vm.log)||void 0===B||B.trace(this,this.handleInputTextChanged,`value: '${U}'`).write(),this.vm.inputText=U}handleComposingStart(){this.vm.handleInputComposingStart()}handleComposingEnd(){this.vm.handleInputComposingEnd()}handleClearButtonClick(){var O;null===(O=this.vm.log)||void 0===O||O.trace(this,this.handleClearButtonClick,"value: ''").write(),this.vm.inputText="",this.textAreaRef.value=""}handleMainContainerClick(){var O;this.vm.closeRAISuggestions(),null===(O=this.textAreaRef)||void 0===O||O.focus()}onInputFocus(){this.vm.handleInputFocus()}onInputBlur(){this.vm.handleInputBlur()}handleSuggestionChipClick(O){this.vm.inputText=O}handleSubmitButtonClick(O){var B;O&&O.stopPropagation(),this.vm.submitInputText(),this.layout.isMobile&&(this.handleClearButtonClick(),null===(B=this.textAreaRef)||void 0===B||B.blur())}handleAutoSuggestButtonClick(){var O,B;return this.vm.telemetry.trackEvent("InteractionEvent","TextGhostingAccept",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot),CustomData:JSON.stringify({enteredTextLength:this.vm.inputText.length,acceptedTextLength:this.vm.autoSuggestText.length,acceptMethod:"pressTap"})}),this.vm.acceptAutoSuggestText(),null===(B=this.textAreaRef)||void 0===B||B.focus(),!1}handlePaste(O){if(this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste"),this.vm.config.features.enableFeedbackInstrumentation&&O.clipboardData&&O.clipboardData.types&&this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste_Transfer",{CustomData:JSON.stringify({mimeTypes:O.clipboardData.types})}),!this.vm.config.features.enableRichTextPaste)return;O.preventDefault();const hasContentType=(O,B)=>B in O&&O[B].length>0,B=[],U=(O=>{const U={};if(O&&O.types)for(let G=0;G<O.types.length;G++){const q=O.types[G];try{U[q]=O.getData(q)}catch(O){U[q]="",B.push(q)}}return U})(O.clipboardData);B.length>0&&this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste_Transfer_Failed",{CustomData:JSON.stringify({failedMimeTypes:B})});let G="";if(hasContentType(U,"text/html")){this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste_TextHtml");try{G=this.vm.paste.pasteHtmlAsText(U["text/html"])}catch(O){if(this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste_TextHtml_Failed"),!hasContentType(U,"text/plain"))throw O;G=U["text/plain"]}}else hasContentType(U,"text/plain")&&(this.vm.telemetry.trackEvent("ClientInst","Clipboard_Paste_TextPlain"),G=U["text/plain"]);if(this.textAreaRef){const O=this.textAreaRef.selectionStart||0;this.textAreaRef.value=this.textAreaRef.value.substring(0,O)+G+this.textAreaRef.value.substring(this.textAreaRef.selectionEnd),this.textAreaRef.selectionStart=O+G.length,this.textAreaRef.selectionEnd=O+G.length,this.textAreaRef.focus(),this.vm.inputText=this.textAreaRef.value}}handleAcceptAutoSuggestText(){this.vm.acceptAutoSuggestText()}onLoad(){setTimeout((()=>{jd((()=>{this.isLoading=!1}))}),20)}};__decorate([attr,__metadata("design:type",String)],Rx.prototype,"mode",void 0),__decorate([attr({attribute:"transition",mode:"boolean"}),__metadata("design:type",Boolean)],Rx.prototype,"hasTransition",void 0),__decorate([observable,__metadata("design:type",Object)],Rx.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],Rx.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],Rx.prototype,"isLoading",void 0),__decorate([observable,__metadata("design:type",Boolean)],Rx.prototype,"renderNewTopicTooltip",void 0),Rx=__decorate([customElement({name:"cib-action-bar",template:Ax,styles:rE})],Rx);const Ix=css`
  :host {
    position: fixed;
    height: 100vh;
    width: 100vw;
    inset: 0;
    background-color: ${tb.theme.brandColors.background.colorBrandAppBackground};
    pointer-events: none;
  }

  :host([product=${Mb.Shoreline}]) {
    background-color: ${tb.theme.neutralColors.background.colorNeutralAppBackgroundAlt};
  }

  :host(:not([product=${Mb.Shoreline}])) .image {
    position: absolute;
    inset: 0;
    background-size: 300% 200%;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  /* MEDIA QUERIES */

  @media only print {
    :host {
      height: 100%;
      width: 100%;
    }
  }

  .plain {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition-property: opacity;
    background-color: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .plain[visible] {
    opacity: 1;
  }
`.withBehaviors(tE(css`
    .image {
      background: transparent !important;
    }
  `)),Px=html`<div
    class="image"
    style=${O=>`background-image: url(${O.backroundImageUrl}); background-position: ${O.imageBottomLayerPosition}`}
  ></div>
  <div
    class="image"
    style=${O=>{var B;return`background-image: url(${O.backroundImageUrl}); background-position: ${O.imageTopLayerPosition}; opacity: ${null===(B=O.vm)||void 0===B?void 0:B.imageTopLayerOpacity}`}}
  ></div>
  <div class="plain" ?visible=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.isPlain}}></div>`,Nx=html`
  <template mode=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.serp.mode}} product=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.serp.productType}}>
    ${when((O=>{var B;return!(null===(B=O.vm)||void 0===B?void 0:B.serp.isMobile)}),Px)}
  </template>
`;let Ox=class extends St{get backroundImageUrl(){var O;return(null===(O=this.vm)||void 0===O?void 0:O.serp.isDevMode)?"images/assets/background/cib-background-sprite.png":"https://newbing.jasonyu.v6.navy/cdx/bg-sprite.png"}get imageBottomLayerPosition(){var O,B;return`${null===(O=this.vm)||void 0===O?void 0:O.imageBottomLayerPositionX} ${null===(B=this.vm)||void 0===B?void 0:B.imageBottomLayerPositionY}`}get imageTopLayerPosition(){var O,B;return`${null===(O=this.vm)||void 0===O?void 0:O.imageTopLayerPositionX} ${null===(B=this.vm)||void 0===B?void 0:B.imageTopLayerPositionY}`}};__decorate([observable,__metadata("design:type",Object)],Ox.prototype,"vm",void 0),Ox=__decorate([customElement({name:"cib-background",template:Nx,styles:Ix})],Ox);const Mx=css`
  :host {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .overlay-background {
    height: 100%;
    width: 100%;
    position: fixed;
    opacity: 0.2;
    background-color: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
    z-index: 2;
  }

  .captcha-container {
    position: absolute;
    max-width: 480px;
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin: 20px;
    gap: 20px;
    border: 0.5px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    box-shadow: ${tb.theme.shadows.defaults.dialog};
    border-radius: 12px;
    z-index: 3;
  }

  .captcha-title {
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  .c-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .c-form-content {
    display: flex;
    gap: 9px;
  }

  :host([mobile]) .c-form-content {
    flex-direction: column;
  }

  .captcha-form-l {
    height: 128px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    border-radius: 6px;
  }

  .captcha-img {
    flex-basis: 96px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .c-form input {
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    font-variation-settings: inherit;
  }

  .captcha-input {
    color: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
    background-color: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackground};
    flex-basis: 32px;
    padding: 0 12px;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .refresh-btn {
    display: flex;
    align-items: center;
    padding: 6px;
    --icon-color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackground};
    border: none;
    border-radius: 15px;
  }

  .refresh-btn:hover {
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  .refresh-btn:active {
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundPressed};
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .captcha-btn {
    padding: 7px 16px;
    gap: 6px;
    width: 96px;
    height: 36px;
    border-radius: 20px;
    border: none;
  }

  .submit-btn {
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  .submit-btn:hover {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundHover};
  }

  .submit-btn:active {
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackgroundPressed};
  }

  .cancel-btn {
    color: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackground};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .cancel-btn:hover {
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackgroundHover};
  }

  .cancel-btn:active {
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackgroundPressed};
  }

  /* PLACEHOLDER COLOR */

  .cap-error::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
  }

  .cap-error:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
    opacity: 1;
  }

  .cap-error::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
    opacity: 1;
  }

  .cap-error:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
  }

  .cap-error::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
  }

  .cap-error::placeholder {
    /* Most modern browsers support this now. */
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
  }
`,Dx=html` <template ?mobile=${O=>O.layout.isMobile}>
  <div class="overlay-background"></div>
  <div class="captcha-container">
    <div class="captcha-title">${O=>O.vm.strings.captchaTitle}</div>
    <p>${O=>O.vm.strings.captchaDescription}</p>
    <form class="c-form">
      <div class="c-form-content">
        <div class="captcha-form-l">
          <img class="captcha-img" src=${O=>O.vm.captchaImgSrc} alt=${O=>O.vm.strings.captchaImgAlt} />
          <input
            class="captcha-input ${O=>O.vm.isInputValid?"":"cap-error"}"
            type="text"
            aria-label=${O=>O.vm.strings.captchaPlaceholder}
            placeholder=${O=>O.vm.isInputValid?O.vm.strings.captchaPlaceholder:O.vm.strings.captchaPlaceholderError}
            :value=${O=>O.vm.userInput}
            @change=${(O,B)=>O.handleInputTextChanged(B.event)}
          />
        </div>
        <div class="captcha-form-r">
          <button
            type="button"
            class="refresh-btn"
            aria-label=${O=>O.vm.strings.captchaRefreshBtnAriaLabel}
            @click=${O=>O.vm.refreshCaptchaAsync()}
          >
            <svg-icon type=${lE.Refresh} size="18"></svg-icon>
          </button>
        </div>
      </div>
      <div class="btn-group">
        <input
          type="submit"
          class="captcha-btn submit-btn"
          value=${O=>O.vm.strings.next}
          @click=${O=>O.vm.submitCaptchaAsync(O.vm.userInput)}
        />
        <input
          type="button"
          class="captcha-btn cancel-btn"
          value=${O=>O.vm.strings.cancel}
          @click=${O=>O.vm.cancelCaptcha()}
        />
      </div>
    </form>
  </div>
</template>`;let Lx=class extends St{handleInputTextChanged(O){var B;const{value:U}=O.target;null===(B=this.vm.log)||void 0===B||B.trace(this,this.handleInputTextChanged,`value: '${U}'`).write(),this.vm.userInput=U}};__decorate([observable,__metadata("design:type",Object)],Lx.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],Lx.prototype,"layout",void 0),Lx=__decorate([customElement({name:"cib-captcha",template:Dx,styles:Mx})],Lx);const lodash_es_now=function(){return te.Date.now()};var Bx=/\s/;const _trimmedEndIndex=function(O){for(var B=O.length;B--&&Bx.test(O.charAt(B)););return B};var Fx=/^\s+/;const _baseTrim=function(O){return O?O.slice(0,_trimmedEndIndex(O)+1).replace(Fx,""):O};const lodash_es_isSymbol=function(O){return"symbol"==typeof O||lodash_es_isObjectLike(O)&&"[object Symbol]"==_baseGetTag(O)};var zx=/^[-+]0x[0-9a-f]+$/i,$x=/^0b[01]+$/i,Ux=/^0o[0-7]+$/i,Vx=parseInt;const lodash_es_toNumber=function(O){if("number"==typeof O)return O;if(lodash_es_isSymbol(O))return NaN;if(lodash_es_isObject(O)){var B="function"==typeof O.valueOf?O.valueOf():O;O=lodash_es_isObject(B)?B+"":B}if("string"!=typeof O)return 0===O?O:+O;O=_baseTrim(O);var U=$x.test(O);return U||Ux.test(O)?Vx(O.slice(2),U?2:8):zx.test(O)?NaN:+O};var Gx=Math.max,Hx=Math.min;const lodash_es_debounce=function(O,B,U){var G,q,j,W,Y,K,Q=0,Z=!1,X=!1,J=!0;if("function"!=typeof O)throw new TypeError("Expected a function");function invokeFunc(B){var U=G,j=q;return G=q=void 0,Q=B,W=O.apply(j,U)}function leadingEdge(O){return Q=O,Y=setTimeout(timerExpired,B),Z?invokeFunc(O):W}function shouldInvoke(O){var U=O-K;return void 0===K||U>=B||U<0||X&&O-Q>=j}function timerExpired(){var O=lodash_es_now();if(shouldInvoke(O))return trailingEdge(O);Y=setTimeout(timerExpired,function(O){var U=B-(O-K);return X?Hx(U,j-(O-Q)):U}(O))}function trailingEdge(O){return Y=void 0,J&&G?invokeFunc(O):(G=q=void 0,W)}function debounced(){var O=lodash_es_now(),U=shouldInvoke(O);if(G=arguments,q=this,K=O,U){if(void 0===Y)return leadingEdge(K);if(X)return clearTimeout(Y),Y=setTimeout(timerExpired,B),invokeFunc(K)}return void 0===Y&&(Y=setTimeout(timerExpired,B)),W}return B=lodash_es_toNumber(B)||0,lodash_es_isObject(U)&&(Z=!!U.leading,j=(X="maxWait"in U)?Gx(lodash_es_toNumber(U.maxWait)||0,B):j,J="trailing"in U?!!U.trailing:J),debounced.cancel=function(){void 0!==Y&&clearTimeout(Y),Q=0,G=K=q=Y=void 0},debounced.flush=function(){return void 0===Y?W:trailingEdge(lodash_es_now())},debounced};const lodash_es_throttle=function(O,B,U){var G=!0,q=!0;if("function"!=typeof O)throw new TypeError("Expected a function");return lodash_es_isObject(U)&&(G="leading"in U?!!U.leading:G,q="trailing"in U?!!U.trailing:q),lodash_es_debounce(O,B,{leading:G,maxWait:B,trailing:q})},qx=css`
  :host {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
    opacity: 1;
    transition: transform ${tb.static.motion.duration.slowest}
        ${tb.static.motion.easingFunction.motionTransition},
      opacity ${tb.static.motion.duration.normal} ${tb.static.motion.easingFunction.linear};
  }

  /* SCROLLER */

  .scroller {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1;
  }

  :host(:not([mobile])) .scroller {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .scroller-enabled {
    overflow-y: auto;
  }

  /* SCROLLER POSITIONER */

  .scroller-positioner {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
  }

  .scroller-enabled .scroller-positioner {
    justify-content: unset;
  }

  /* SCROLLER CONTENT */

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    max-width: 1184px;
    box-sizing: border-box;
    padding: 32px 0 106px;
    z-index: -1;
    pointer-events: auto;
    transition-property: transform;
    transition-timing-function: ${tb.static.motion.easingFunction.motionDirect};
  }

  /* SIDE PANEL */

  .side-panel {
    display: flex;
    position: sticky;
    top: 0;
    flex-shrink: 0;
  }

  :host([loading]) .content {
    transition: none !important;
  }

  /* DIVIDER LINE */

  :host .divider {
    position: absolute;
    width: 100%;
    bottom: -1px;
    opacity: 0;
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  /* BACKGROUND FADE */

  .fade {
    display: none;
    position: fixed;
    height: 104px;
    width: calc(100% - 20px);
    z-index: -1;
    overflow: hidden;
    clip-path: inset(0px);
    pointer-events: none;
  }

  .fade.bottom {
    display: block;
    bottom: 0px;
  }

  .fade .background {
    transition-property: transform;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .fade.top {
    transition-property: transform;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  :host([has-top-fade]) .fade.top {
    display: block;
    height: 96px;
    top: 0px;
    -webkit-mask-image: linear-gradient(black 72px, transparent 96px);
    mask-image: linear-gradient(black 72px, transparent 96px);
  }

  :host([has-top-fade]) .content {
    padding-top: 108px;
  }

  :host([has-bottom-fade]) .fade.bottom {
    height: 140px;
    -webkit-mask-image: linear-gradient(transparent calc(100% - 140px), black calc(100% - 118px));
    mask-image: linear-gradient(transparent calc(100% - 140px), black calc(100% - 118px));
  }

  /* SUGGESTION BAR */

  .suggestion-bar.hidden {
    visibility: hidden;
  }

  /* PAGE MODES & ALIGNMENTS */

  :host(:not([mobile])[mode=${Hy.Home}]),
  :host(:not([mobile])[mode=${Hy.Search}]),
  :host(:not([mobile])[mode=${Hy.OffStage}]) {
    opacity: 0;
    transform: translate3d(0, -100vh, 0);
  }

  :host(:not([mobile])[mode=${Hy.Search}]) {
    clip-path: unset;
  }

  :host(:not([mobile])[mode=${Hy.Home}]) .scroller .fade.bottom .background,
  :host(:not([mobile])[mode=${Hy.Search}]) .scroller .fade.bottom .background,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .scroller .fade.bottom .background {
    transform: translate3d(0, 100vh, 0);
  }

  :host(:not([mobile])[mode=${Hy.Home}]) .scroller .fade.top,
  :host(:not([mobile])[mode=${Hy.Search}]) .scroller .fade.top,
  :host(:not([mobile])[mode=${Hy.OffStage}]) .scroller .fade.top {
    transform: translate3d(0, 100vh, 0);
  }

  :host(:not([mobile])[alignment=${Gy.Left}]) .scroller-positioner,
  :host(:not([mobile])[alignment=${Gy.Left}]) .footer {
    max-width: 1440px;
  }

  /* MAIN */

  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 32px;
  }

  .main cib-chat-turn {
    margin-top: 24px;
  }

  .container-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 28px;
  }

  /* FOOTER */

  .footer {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    bottom: 126px;
    box-sizing: border-box;
    padding: 0 32px;
    pointer-events: none;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 1120px;
  }

  /* WELCOME MESSAGE */

  .welcome-message {
    position: relative;
    text-align: center;
    top: 4px;
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    position: relative;
  }

  :host([serp-slot=${jy.Creator}]) .content,
  :host([serp-slot=${jy.Pole}]) .content,
  :host([serp-slot=${jy.RightRail}]) .content {
    padding: 0 !important;
    max-width: unset;
    min-height: 100%;
  }

  :host([serp-slot=${jy.Creator}]) .main,
  :host([serp-slot=${jy.Pole}]) .main,
  :host([serp-slot=${jy.RightRail}]) .main {
    padding: 0 20px;
    min-height: 100%;
    flex-grow: 1;
    justify-content: flex-start;
  }

  :host([serp-slot=${jy.Pole}]) .main {
    padding: 0 24px;
  }

  :host([serp-slot=${jy.Creator}][mode=${Hy.OffStage}]),
  :host([serp-slot=${jy.Pole}][mode=${Hy.OffStage}]),
  :host([serp-slot=${jy.RightRail}][mode=${Hy.OffStage}]),
  :host([serp-slot=${jy.Creator}][mode=${Hy.Search}]),
  :host([serp-slot=${jy.Pole}][mode=${Hy.Search}]),
  :host([serp-slot=${jy.RightRail}][mode=${Hy.Search}]) {
    opacity: 1;
    transform: unset;
  }

  /* PRODUCT TYPE */

  :host([product-type=${Mb.Shoreline}]) {
    position: relative;
    min-height: 0;
  }

  :host([product-type=${Mb.Shoreline}]) .content {
    padding-bottom: 0px !important;
  }

  :host([product-type=${Mb.Shoreline}]) .fade {
    display: none !important;
  }

  :host([product-type=${Mb.Shoreline}][has-bottom-fade]) .divider {
    opacity: 1;
  }

  /* SIDE PANEL DOCKED */

  :host(:not([mobile])[serp-slot=${jy.None}][side-panel][side-panel-docked]) .scroller,
  :host([product-type=${Mb.Shoreline}]) .scroller {
    width: calc(100% - var(--side-panel-width));
  }

  :host(:not([mobile])[side-panel][side-panel-docked]) .side-panel,
  :host([product-type=${Mb.Shoreline}]) .side-panel {
    position: fixed;
    inset-inline-end: 0;
    top: 0;
    bottom: 0;
  }

  :host(:not([mobile])[side-panel][side-panel-docked]) .fade {
    width: calc(100% - 20px - var(--side-panel-width));
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    .main,
    .footer {
      padding: 0 16px;
    }

    .main cib-chat-turn {
      margin-top: 18px;
    }

    :host([has-top-fade]) .content {
      padding-top: 32px;
    }

    .container-control {
      flex-direction: column;
    }
  }

  @media (max-width: 600px) {
    :host([serp-slot=${jy.Pole}]) .main,
    :host([serp-slot=${jy.RightRail}]) .main {
      padding: 0 16px;
    }
  }

  /* MOBILE */

  :host([mobile]) {
    position: relative;
    display: flex;
    min-height: 0;
    flex-direction: column;
    flex-grow: 1;
  }

  :host([mobile]) ::-webkit-scrollbar {
    display: none;
  }

  :host([mobile]) .content {
    padding: 8px 0 0;
  }

  :host([mobile]) .main {
    padding: 0px 16px 20px;
  }

  :host([mobile][has-bottom-fade]) .divider {
    opacity: 1;
  }

  :host([mobile]) .suggestion-bar {
    padding: 0px 16px;
    margin: 0;
  }

  .collapsed {
    height: 0px;
    overflow: hidden;
    opacity: 0;
  }

  :host([empty]) .content,
  :host([empty]) .main {
    padding: 0px !important;
  }
`,jx=css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  :host([expanded]) {
    /* 
     * The values subtracted from the vertical height of the page appear in the
     * formula from left to right in the top-down order they are encountered on the
     * page.
     * 
     * content div top padding: 32px
     * content div item gap: 24px
     * suggestions bar height: 40px
     * content div bottom padding: 146px
     */
    height: calc(100vh - 32px - 24px - 40px - 146px);
  }

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    display: contents;
  }

  .notifications {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 80px;
    opacity: 1;
    z-index: 10;
    background: none;
    box-shadow: none;
    outline: none;
    margin: 0;
    width: 100%;
    max-width: 1120px;
  }

  .notification-container {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1120px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .notification-container::before,
  .notification-container::after {
    content: "";
    flex: 1;
    margin-top: 4px;
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .notification-container::before {
    margin-inline-end: 1vw;
  }

  .notification-container::after {
    margin-inline-start: 1vw;
  }

  .notification-container .notification-content {
    max-width: 80%;
    padding: 0 10px;
    display: flex;
    gap: 4px;
  }

  .notification-container svg-icon {
    display: inline
    position: relative;
    margin-right: 4px;
    fill: var(--cib-color-brand-secondary-foreground); 
    top: 6px;
  }


  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    :host {
      gap: 18px;
    }
  }
`;class SlottedBehavior extends NodeObservationBehavior{constructor(O,B){super(O,B)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function slotted(O){return"string"==typeof O&&(O={property:O}),new AttachedBehaviorHTMLDirective("fast-slotted",SlottedBehavior,O)}const Wx=css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  :host([source=${Yi.User}]) {
    align-items: flex-end;
  }

  :host([expanded]) {
    flex-grow: 1;
  }

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    display: contents;
  }

  .frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-self: flex-start;
    border-radius: 12px;
    box-shadow: ${tb.theme.shadows.defaults.layer};
  }
`,Yx=html` ${when((O=>!O.cancelRender),html`
    <iframe
      ${ref("frame")}
      style="width:${O=>O.frameWidth};height:${O=>O.frameHeight};"
      class="frame ${O=>O.isContentLoaded?"inline":""}"
      src=${O=>O.contentUrl}
    >
    </iframe>
  `)}`;class RemoteContentHostViewHelper extends lifecycle_Disposable{constructor(O){super(),this.remoteContentHostView=null,this.bindingTarget=O}get view(){return this.remoteContentHostView}createView(){this.remoteContentHostView=this._register(Yx.create(this.bindingTarget))}bindView(O){var B;null===(B=this.remoteContentHostView)||void 0===B||B.bind(O,ht)}insertBefore(O){var B;null===(B=this.remoteContentHostView)||void 0===B||B.insertBefore(O)}appendTo(O){var B;null===(B=this.remoteContentHostView)||void 0===B||B.appendTo(O)}dispose(){super.dispose(),this.remoteContentHostView=null,delete this.bindingTarget}}const Kx=css`
  ${css`
  /*!
  Theme: Default
  Description: Original highlight.js style
  Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
  Maintainer: @highlightjs/core-team
  Website: https://highlightjs.org/
  License: see project LICENSE
  Touched: 2021
*/
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  .hljs {
    background: #fff;
    color: #000;
  }
  .hljs-comment,
  .hljs-quote,
  .hljs-variable {
    color: green;
  }
  .hljs-built_in,
  .hljs-keyword,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-tag {
    color: #00f;
  }
  .hljs-addition,
  .hljs-attribute,
  .hljs-literal,
  .hljs-section,
  .hljs-string,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-title,
  .hljs-type {
    color: #a31515;
  }
  .hljs-deletion,
  .hljs-meta,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #2b91af;
  }
  .hljs-doctag {
    color: grey;
  }
  .hljs-attr {
    color: red;
  }
  .hljs-bullet,
  .hljs-link,
  .hljs-symbol {
    color: #00b0e8;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }
`}

  @keyframes message-enter {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes message-enter-bot {
    0% {
      opacity: 0;
      transform: scale(0.9);
      max-height: 85px;
      overflow: hidden;
    }
    24% {
      max-height: 85px;
      overflow: hidden;
    }
    25% {
      max-height: unset;
      overflow: unset;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes tooltip-enter {
    0% {
      opacity: 0;
      transform: translateY(8px);
      pointer-events: none;
    }
    33% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      pointer-events: unset;
    }
  }

  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 768px;
    margin-right: 80px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    border-radius: 12px;
    opacity: 1;
    z-index: 10;
    box-shadow: ${tb.theme.shadows.defaults.card};
    outline: 1px solid transparent;
  }

  :host([animate]) {
    opacity: 0;
    animation-name: message-enter;
    animation-fill-mode: both;
    animation-delay: ${tb.static.motion.duration.normal};
    animation-duration: ${tb.static.motion.duration.normal};
    animation-timing-function: ${tb.static.motion.easingFunction.motionIn};
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  :host([isempty]) {
    box-shadow: none;
  }

  /* USER */

  :host([source=${Yi.User}]) {
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    align-self: flex-end;
    margin-right: unset;
    margin-left: 80px;
    background: ${tb.theme.gradientColors.core};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
  }

  /* BOT */

  :host([source=${Yi.Bot}]) {
    min-width: 220px;
  }

  :host([source=${Yi.Bot}][type=${vp.Text}]) {
    animation-name: message-enter-bot;
  }

  /* sidebar */
  :host .sidebar {
    display: none;
  }

  :host([source=${Yi.Bot}][type=${vp.Text}]) .sidebar {
    display: flex;
    position: absolute;
    inset-inline-end: -48px;
  }

  /* CONTENT */

  .content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px 16px;
    user-select: text;
    -webkit-user-select: text;
    word-break: break-word;
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .content.header {
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
  }

  .content.footer {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0;
  }

  :host([serp-slot=${jy.None}]) .content.footer {
    border-top: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  :host([serp-slot=${jy.None}]) cib-message-attributions {
    display: none;
  }

  :host([attributions]) cib-message-attributions {
    display: flex;
  }

  :host([attributions]) .content.footer {
    justify-content: space-between;
  }

  :host cib-turn-counter {
    margin: 9px 14px;
  }

  :host([attributions][mobile]) cib-turn-counter {
    position: absolute;
    inset-inline-end: 0;
  }

  .hidden {
    top: 0;
    left: -2px;
    width: 1px;
    height: 1px;
    position: absolute;
    overflow: hidden;
  }

  :host cib-feedback {
    visibility: visible;
  }

  :host(:not(:hover, :focus, :active, :focus-visible, :focus-within)) cib-feedback {
    visibility: hidden;
  }

  /* Hide feedback when the sidebar focused */
  :host(:is(:hover, :focus, :active, :focus-visible, :focus-within))
    .sidebar:is(:hover, :focus, :active, :focus-visible, :focus-within)
    ~ cib-feedback {
    visibility: hidden;
  }

  .content span {
    font-variation-settings: ${tb.platform.typography.typeRamp.subtitle1.fontVariationSettings};
  }

  /* TEXT TYPE */

  :host([type=${vp.Text}]:focus-visible) {
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
  }

  /* META TYPE */

  :host([type=${vp.Meta}]), :host([type=${vp.Context}]) {
    background: none;
    box-shadow: none;
    outline: none;
    margin: 0;
  }

  :host([type=${vp.Context}]) {
    width: 100%;
    max-width: 1120px;
  }

  .context-message-container {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1120px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .context-message-container::before,
  .context-message-container::after {
    content: "";
    flex: 1;
    margin-top: 4px;
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .context-message-container::before {
    margin-inline-end: 1vw;
  }

  .context-message-container::after {
    margin-inline-start: 1vw;
  }

  .context-message-container .context-container {
    max-width: 80%;
    padding: 0 10px;
    display: flex;
    gap: 4px;
  }

  .context-message-container .context-container .context-link {
    text-decoration: none;
  }

  :host([type=${vp.Meta}]) .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    padding: 0;
  }

  :host([type=${vp.Meta}]) .content .meta-text,
  :host([type=${vp.Meta}]) .content .meta-text p ,
  :host([type=${vp.Meta}]) .content .meta-text code {
    user-select: text;
    -webkit-user-select: text;
    word-break: break-word;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  :host([type=${vp.Meta}]) .content .meta-text span,
  :host([type=${vp.Meta}]) .content .meta-text code {
    font-family: ${tb.platform.typography.fonts.text};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 600;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  :host([type=${vp.Meta}]) .content .meta-text p {
    margin: 0;
  }

  :host([type=${vp.Meta}]) .content .meta-text blockquote {
    display: none;
  }

  /* FullBleed TYPE */
  :host([type=${vp.FullBleed}]) {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 768px;
    margin-right: 80px;
    width: 100%;
    outline: 1px solid transparent;
    border-radius: 0;
    max-width: none;
  }

  /* CARD TYPE */

  :host(([type=${vp.Host}][content=${bp.SemSerp}])) {
    max-width: unset;
    flex-grow: 1;
    width: 100%;
  }

  :host([type=${vp.Host}][content=${bp.Answer}]) {
    max-width: unset;
    flex-grow: 1;
    display: contents;
  }

  .card {
    position: relative;
    overflow: auto;
    border-radius: unset;
  }

  .card-frame {
    position: absolute;
    overflow: auto;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .captcha-frame {
    min-width: 316px;
    max-height: 84px;
  }

  :host([mobile]) .captcha-frame {
    max-height: 110px;
  }

  .frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-self: flex-start;
    border-radius: 12px;
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  .inline {
    margin: 4px 0px;
    border-radius: 8px;
    box-shadow: unset;
  }

  :host([mobile]) .frame:not(.inline):not(.captcha-frame) {
    min-width: max(288px, 100% - 80px);
    max-width: calc(100% - 80px);
  }

  /* INDICATOR */

  .sub {
    display: inline-block;
    position: absolute;
    color: #660000;
    margin: -6px 0px 0px 0px;
    scale: 0.5;
  }

  /* ADAPTIVE CARDS */

  .content .ac-container {
    display: flex;
    flex-direction: column;
  }

  .content .ac-container > * {
    margin-top: 10px !important;
  }

  .content .ac-container > *:first-child {
    margin-top: 0 !important;
  }

  .content .ac-container .ac-textBlock {
    display: flex;
    flex-direction: column;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .content .ac-container .ac-textBlock > * {
    margin-top: 10px !important;
  }

  .content .ac-container .ac-textBlock > *:first-child {
    margin-top: 0 !important;
  }

  .content .ac-container,
  .content .ac-container p,
  .content .ac-container h1,
  .content .ac-container h2,
  .content .ac-container h3,
  .content .ac-container h4 {
    padding: 0;
    margin: 0;
    user-select: text;
    -webkit-user-select: text;
    word-break: break-word;
  }

  .content .ac-container,
  .content .ac-container p {
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .content .ac-container h1 {
    font-size: ${tb.platform.typography.typeRamp.title2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.title2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.title2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.title2.fontVariationSettings};
  }

  .content .ac-container h2 {
    font-size: ${tb.platform.typography.typeRamp.title3.fontSize};
    line-height: ${tb.platform.typography.typeRamp.title3.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.title3.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.title3.fontVariationSettings};
  }

  .content .ac-container h3 {
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.subtitle1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.subtitle1.fontVariationSettings};
  }

  .content .ac-container h4 {
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.subtitle2.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.subtitle2.fontVariationSettings};
  }

  .content .ac-container a {
    position: relative;
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
    text-decoration: none;
  }

  .content .ac-container a:hover {
    text-decoration: underline;
  }

  .content .ac-container a:focus-visible {
    outline: none;
  }

  .content .ac-container a:focus-visible sup::after {
    content: "";
    position: absolute;
    width: 130%;
    height: 130%;
    top: -2px;
    border-radius: 3px;
    border: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
    outline: 2px solid ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    box-sizing: border-box;
  }

  .content .ac-container sup {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    vertical-align: top;
    top: -1px;
    margin: 0px 2px;
    min-width: 14px;
    height: 14px;
    border-radius: 3px;
    text-decoration-color: transparent;
    color: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
    outline: 1px solid transparent;
  }

  .content .ac-container .ac-textBlock img {
    display: block;
    max-width: 100%;
  }

  .content .ac-container .ac-textBlock pre {
    margin: 0;
    margin-bottom: 4px;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 8px;
    padding: 6px 10px;
    box-sizing: border-box;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .content .ac-container .ac-textBlock code {
    white-space: pre-wrap;
    font-size: 14px;
  }

  .content .ac-container .ac-textBlock :not(pre) code {
    margin: 0px 2px;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 1px 4px;
    box-sizing: border-box;
    font-weight: 500;
  }

  .content .ac-container .ac-textBlock blockquote {
    margin: 0;
    font-style: italic;
  }

  .content .ac-container .ac-textBlock ol,
  .content .ac-container .ac-textBlock ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding-left: 24px;
  }

  .content .ac-container .ac-textBlock p p + ol,
  .content .ac-container .ac-textBlock p p + ul {
    margin-top: 10px;
  }

  .content .ac-container .ac-textBlock li > ol {
    margin: 0;
  }

  .content .ac-container .ac-textBlock table {
    border-radius: 6px;
    overflow: hidden;
    border-spacing: 0px;
    margin: 8px 0;
    padding: 0 12px;
    width: 100%;
    table-layout: fixed;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .content .ac-container .ac-textBlock tr {
    padding: 0 4px;
  }

  .content .ac-container .ac-textBlock th,
  .content .ac-container .ac-textBlock td {
    text-align: left;
    vertical-align: baseline;
    word-break: initial;
    padding: 8px 4px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .content .ac-container .ac-textBlock th {
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Strong.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 600;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  .content .ac-container .ac-textBlock td {
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .content .ac-container .ac-textBlock table a,
  .content .ac-container .ac-textBlock th a,
  .content .ac-container .ac-textBlock td a {
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
  }

  .content .ac-container .ac-textBlock th:first-child,
  .content .ac-container .ac-textBlock td:first-child {
    padding-left: 0;
  }

  .content .ac-container .ac-horizontal-separator {
    background: ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    height: 1px;
    margin: 10px -16px 0;
  }

  .content .ac-container .ac-horizontal-separator:last-child {
    display: none;
  }

  .content .ac-container .ac-horizontal-separator + .ac-textBlock:last-child p {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    line-height: 24px;
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 600;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  .content .ac-container .ac-horizontal-separator + .ac-textBlock:last-child p a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 8px;
    font-weight: 500;
    color: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
  }

  .content .ac-container .ac-horizontal-separator + .ac-textBlock:last-child p a:hover {
    text-decoration: underline;
  }

  /* MATH EQUATIONS */

  .content .ac-container .katex {
    position: relative;
  }

  .content .ac-container .katex-block {
    margin-top: 16px !important;
    margin-bottom: 12px !important;
  }

  .content .ac-container .katex mtable {
    border-spacing: 0 12px;
  }

  .content .ac-container .katex-html {
    transform: scale(0);
    position: absolute;
  }

  /* TOOLTIP */

  .ac-container a.tooltip-target,
  .ac-container span.tooltip-target {
    position: relative;
    color: inherit;
    text-underline-offset: 3px;
    border-bottom: 2px solid transparent;
    text-decoration-style: dotted;
    text-decoration-color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    text-underline-offset: 3px;
  }

  .ac-container a.tooltip-target:hover,
  .ac-container a.tooltip-target:focus,
  .ac-container a.tooltip-target:active,
  .ac-container span.tooltip-target:hover,
  .ac-container span.tooltip-target:focus,
  .ac-container span.tooltip-target:active {
    text-decoration-style: dotted;
    text-decoration-color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
  }

  .ac-container a.tooltip-target.hover,
  .ac-container span.tooltip-target.hover {
    cursor: pointer;
    background: ${tb.theme.brandColors.background.colorBrandTextHighlightBackground};
    color: ${tb.theme.stealthColors.foreground.colorStealthPrimaryForegroundHover};
    text-decoration-color: ${tb.theme.stealthColors.foreground.colorStealthPrimaryForegroundHover};
    border-radius: 2px;
  }

  :host(:hover) .ac-container a.tooltip-target,
  :host(:focus) .ac-container a.tooltip-target,
  :host(:hover) .ac-container span.tooltip-target,
  :host(:focus) .ac-container span.tooltip-target {
    text-decoration-line: underline;
  }

  .content .ac-container a.tooltip-target:focus-visible,
  .content .ac-container span.tooltip-target:focus-visible {
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
    outline-offset: 3px;
  }

  .ac-container a.tooltip-target a,
  .ac-container a.tooltip-target:hover a,
  .ac-container a.tooltip-target:focus a,
  .ac-container a.tooltip-target:active a,
  .ac-container span.tooltip-target a,
  .ac-container span.tooltip-target:hover a,
  .ac-container span.tooltip-target:focus a,
  .ac-container span.tooltip-target:active a {
    text-decoration-color: transparent !important;
  }

  .ac-container a.tooltip-target strong,
  .ac-container span.tooltip-target strong {
    /** fixes issue that causes hover class not to be applied when moving from citation to tooltip */
    pointer-events: none;
  }

  /* FP */

  .fp-horizontal-separator {
    background: ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    height: 1px;
  }

  .fp-container {
    display: flex;
    margin: 10px;
    align-items: center;
  }

  .fp-button {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 8px;
    font-weight: 500;
    border: none;
    height: 20px;
    cursor: pointer;
    color: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  .fp-button:hover {
    text-decoration: underline;
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    position: relative;
    background: transparent;
    max-width: unset;
    width: 100%;
    margin: 0;
    opacity: 1;
    animation-name: unset;
    box-shadow: none;
    outline: none;
  }

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Creator}]) .content,
  :host([serp-slot=${jy.Creator}]) .content .ac-container,
  :host([serp-slot=${jy.Creator}]) .content .ac-container > .ac-textBlock,
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.Pole}]) .content,
  :host([serp-slot=${jy.Pole}]) .content .ac-container,
  :host([serp-slot=${jy.Pole}]) .content .ac-container > .ac-textBlock,
  :host([serp-slot=${jy.RightRail}]),
  :host([serp-slot=${jy.RightRail}]) .content,
  :host([serp-slot=${jy.RightRail}]) .content .ac-container,
  :host([serp-slot=${jy.RightRail}]) .content .ac-container > .ac-textBlock {
    flex-grow: 1;
  }

  :host([serp-slot=${jy.Creator}][type=${vp.Meta}]),
  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]),
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) {
    align-items: center;
  }

  :host([serp-slot=${jy.Creator}][type=${vp.Meta}]) .content {
    margin-bottom: 12px;
  }

  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content {
    position: relative;
    margin: 0;
    margin-top: -48px;
  }

  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content .meta-text,
  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content .meta-text p ,
  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content .meta-text code,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content .meta-text,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content .meta-text p ,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content .meta-text code {
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content .meta-text span,
  :host([serp-slot=${jy.Pole}][type=${vp.Meta}]) .content .meta-text code,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content .meta-text span,
  :host([serp-slot=${jy.RightRail}][type=${vp.Meta}]) .content .meta-text code {
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
  }

  :host([serp-slot=${jy.Creator}]) .content,
  :host([serp-slot=${jy.Pole}]) .content,
  :host([serp-slot=${jy.RightRail}]) .content {
    padding: 0;
  }

  :host([serp-slot=${jy.Pole}]) .content,
  :host([serp-slot=${jy.RightRail}]) .content {
    min-height: 100%;
  }

  :host([serp-slot=${jy.Creator}]) .content.footer,
  :host([serp-slot=${jy.Pole}]) .content.footer,
  :host([serp-slot=${jy.RightRail}]) .content.footer {
    flex-grow: 0;
    padding-top: 20px;
  }

  :host([serp-slot=${jy.Creator}]) .content .ac-container,
  :host([serp-slot=${jy.Pole}]) .content .ac-container,
  :host([serp-slot=${jy.RightRail}]) .content .ac-container {
    width: 100%;
  }

  :host([cached][serp-slot=${jy.Creator}]) .content .ac-container .ac-textBlock:first-child,
  :host([cached][serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock:first-child,
  :host([cached][serp-slot=${jy.RightRail}]) .content .ac-container .ac-textBlock:first-child {
    align-self: center;
    max-width: 100%;
  }

  :host([serp-slot=${jy.Creator}]) .content .ac-container .ac-horizontal-separator,
  :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-horizontal-separator,
  :host([serp-slot=${jy.RightRail}]) .content .ac-container .ac-horizontal-separator {
    margin: 0 !important;
    visibility: hidden;
  }

  :host([serp-slot=${jy.Creator}]) .content .ac-container .ac-horizontal-separator + .ac-textBlock,
  :host([serp-slot=${jy.RightRail}]) .content .ac-container .ac-horizontal-separator + .ac-textBlock {
    margin-top: 16px !important;
    flex-grow: unset;
  }

  :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-horizontal-separator + .ac-textBlock {
    margin-top: 24px !important;
    margin-bottom: 8px;
    flex-grow: unset;
  }

  :host([serp-slot=${jy.Creator}]) cib-reactions,
  :host([serp-slot=${jy.Pole}]) cib-reactions,
  :host([serp-slot=${jy.RightRail}]) cib-reactions {
    display: none;
  }

  /* MOBILE */

  :host([mobile]) .content .ac-container .tooltip-target > a,
  :host([mobile]) .content .ac-container sup {
    pointer-events: none;
  }

  :host([mobile]) .content .ac-container sup::before {
    content: "";
    position: absolute;
    inset: -6px;
  }

  :host([mobile][type=${vp.Host}][content=${bp.ImageContentCreator}]) .frame:not(.inline) {
    max-width: unset;
  }

  :host([serp-slot=${jy.None}][feedback]) {
    margin-bottom: 18px !important;
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    :host {
      margin-right: 48px;
    }

    :host([source=${Yi.User}]) {
      margin-left: 48px;
    }

    :host([mobile]) .frame:not(.inline):not(.captcha-frame) {
      min-width: max(288px, 100% - 48px);
      max-width: calc(100% - 48px);
    }
  }

  /* For Chat in Discover */
  @media (max-width: 576px) {
    :host {
      margin-right: 32px;
    }

    :host([source=${Yi.User}]) {
      margin-left: 32px;
    }

    :host([mobile]) .frame:not(.inline) {
      min-width: max(288px, 100% - 32px);
      max-width: calc(100% - 32px);
    }
  }

  @media (min-width: 601px) {
    :host([serp-slot=${jy.Pole}]) .content,
    :host([serp-slot=${jy.Pole}]) .content .ac-container,
    :host([serp-slot=${jy.Pole}]) .content .ac-container p {
      font-size: ${tb.platform.typography.typeRamp.message.fontSize};
      line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
      font-weight: ${tb.platform.typography.typeRamp.message.fontWeight};
      font-variation-settings: ${tb.platform.typography.typeRamp.message.fontVariationSettings};
    }

    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock {
      gap: 8px;
    }

    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock th {
      font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
      line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
      font-weight: ${tb.platform.typography.typeRamp.subtitle2.fontWeight};
      font-weight: 600;
      font-variation-settings: ${tb.platform.typography.typeRamp.subtitle2.fontVariationSettings};
    }

    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock td {
      font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
      line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
      font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
      font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
    }

    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock pre {
      padding: 8px 12px;
    }

    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-textBlock code {
      font-size: 15px;
    }
  }

  @media (max-width: 600px) {
    :host([serp-slot=${jy.Pole}]) .content .ac-container .ac-horizontal-separator + .ac-textBlock,
    :host([serp-slot=${jy.RightRail}]) .content .ac-container .ac-horizontal-separator + .ac-textBlock {
      margin: 16px 0 4px !important;
    }

    :host([attributions]) cib-turn-counter {
      position: absolute;
      inset-inline-end: 0;
    }
  }

  /* FAILED */

  :host([fail]),
  :host([fail][type="host"][content="answer"]) {
    display: none;
  }
`.withBehaviors(tE(css`
    :host([source=${Yi.User}]) {
      forced-color-adjust: none;
      background: ${iE.Highlight};
      color: ${iE.HighlightText};
      outline-color: ${iE.HighlightText};
    }

    :host([type=${vp.Text}]:focus-visible) {
      background: ${iE.CanvasText};
      outline-color: ${iE.Highlight};
    }

    .content .ac-container a:focus-visible sup {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
      outline-color: ${iE.Highlight};
    }

    .content .ac-container a:focus-visible sup::after {
      border: none;
      outline: none;
    }

    .tooltip-target.hover {
      background: ${iE.Highlight};
      color: ${iE.HighlightText};
    }
  `));var Qx,Zx,Xx;(function(O){O.HostedContentDimensionUpdate="HostedContentDimensionUpdate"})(Qx||(Qx={})),function(O){O.Pole="POLE",O.Top="TOP",O.Ads="ADS",O.Unknown="UNKNOWN",O.NoAnswer="NOANS"}(Zx||(Zx={})),function(O){function isHostedContentMessageData(O){const B=O;return"object"==typeof O&&null!==O&&"string"==typeof B.type&&"boolean"==typeof B.hasCarousel&&"number"==typeof B.height&&"number"==typeof B.width}function isAnswerCardMessageType(O){return function(O,B){return function(O){return null!=O}(B)&&function(O){return Object.values(O).filter((O=>"function"!=typeof O))}(O).includes(B)}(Qx,O)}O.isMessageData=function(O){const B=O;return"object"==typeof O&&null!==O&&"string"==typeof B.type&&isAnswerCardMessageType(B.type)&&isHostedContentMessageData(B.data)},O.isHostedContentMessageData=isHostedContentMessageData,O.isAnswerCardMessageType=isAnswerCardMessageType;const B={type:Zx.Top,hasCarousel:!1,height:620,width:648},U={type:Zx.Pole,hasCarousel:!0,height:240,width:1204};O.queueDimensionUpdateMessage=function(O){let G;if(O.includes("weather"))G=B;else{if(!O.includes("movies"))return;G=U}const q={type:Qx.HostedContentDimensionUpdate,data:G};setTimeout((()=>window.postMessage(q,"*")),4e3)}}(Xx||(Xx={}));const Jx=css`
  :host {
    position: relative;
    min-height: 160px;
    width: 100%;
    overflow: auto;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.6);
    transition-property: height, width;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  .frame {
    position: absolute;
    overflow: auto;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
`,eT=html`
  <iframe class="frame" ${ref("frame")} src=${O=>O.vm.contentUrl}></iframe>
`;let tT=class extends St{constructor(){super(...arguments),this.disposer=new Disposer,this.handleWindowMessage=O=>{var B;const U=O.data;if(Xx.isMessageData(U)&&U.type===Qx.HostedContentDimensionUpdate){const{type:O,hasCarousel:G,height:q,width:j}=U.data;null===(B=this.vm.log)||void 0===B||B.debug(this,this.handleWindowMessage,`message: ${U.type}; card: ${O}; carousel: ${G}; height: ${q}; width: ${j}`).write()}}}connectedCallback(){var O;super.connectedCallback(),null===(O=this.vm.log)||void 0===O||O.trace(this,this.connectedCallback,null).write(),this.configureHostedContentMessaging()}disconnectedCallback(){var O;null===(O=this.vm.log)||void 0===O||O.trace(this,this.disconnectedCallback,null).write(),this.disposer.isDisposed||this.disposer.dispose(),super.disconnectedCallback()}configureHostedContentMessaging(){window.addEventListener("message",this.handleWindowMessage),this.disposer.register((()=>window.removeEventListener("message",this.handleWindowMessage)))}};__decorate([observable,__metadata("design:type",Object)],tT.prototype,"vm",void 0),tT=__decorate([customElement({name:"cib-content-host",template:eT,styles:Jx})],tT);const iT=css`
  :host {
    position: relative;
    min-height: 320px;
    width: 100%;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    transition-property: height, width;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }
`,rT=html`<slot></slot>`;let nT=class extends St{};nT=__decorate([customElement({name:"cib-card",template:rT,styles:iT})],nT);const oT=css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  :host {
    position: absolute;
    top: -36px;
    right: 0;
    z-index: 1001;
    display: flex;
    flex-direction: row;
    will-change: transform;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
    outline: 1px solid transparent;
  }

  /* CONTAINER */

  .container {
    display: flex;
    flex-direction: row;
  }

  /* BUTTONS */

  button {
    position: relative;
    outline: none;
    border: none;
    background: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackground};
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-family: ${tb.platform.typography.fonts.text};
    border-radius: 6px;
  }

  button:before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 6px;
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackgroundHover};
    opacity: 0;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  button svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  :host([serp-slot=${jy.Creator}]) button svg-icon,
  :host([serp-slot=${jy.Pole}]) button svg-icon,
  :host([serp-slot=${jy.RightRail}]) button svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
  }

  @media (hover: hover) {
    button:hover:before,
    button:hover cib-button-descriptor {
      opacity: 1;
    }

    button:hover svg-icon {
      fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground} !important;
    }
  }

  button:active:before,
  button:active cib-button-descriptor,
  button:focus-visible cib-button-descriptor {
    opacity: 1;
  }

  button:active svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground} !important;
  }

  button:focus-visible:before {
    opacity: 1;
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus} !important;
  }

  button.positive[aria-pressed="true"]:after,
  button.negative[aria-pressed="true"]:after {
    content: "";
    pointer-events: none;
    position: absolute;
    width: 18px;
    height: 1px;
    bottom: 2px;
    border-radius: 2px;
    border: 1px solid transparent;
    background-color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  button.more {
    padding-left: 1px;
  }

  button.more:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  /* ICONS */

  svg-icon[type="flag-fill"] {
    fill: rgba(200, 0, 0, 1);
  }

  /* OVERFLOW MENU */

  .overflow-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: calc(100% + 2px);
    left: calc(100% - 36px);
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
    outline: 1px solid transparent;
  }

  .overflow-menu button {
    justify-content: flex-start;
    width: unset;
  }

  .overflow-menu-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  .overflow-menu-text {
    padding-right: 10px;
    white-space: nowrap;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .overflow-menu .copy-success,
  .overflow-menu .copy-success .overflow-menu-icon {
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  /* HISTORY CONVERSATON */
  .history-conversation-screenshot {
    display: block;
    position: fixed;
    left: -10000px;
    top: -500px;
    width: 965px;
    height: 500px;
    overflow: hidden;
    background-color: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundSolid};
  }

  :host([mobile]) .history-conversation-screenshot {
    top: -300px;
    width: 486px;
    height: 300px;
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    box-shadow: none;
    visibility: visible !important;
  }

  :host([serp-slot=${jy.Creator}]) {
    top: -44px;
  }

  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    top: -66px;
    right: -8px;
  }

  :host([serp-slot=${jy.Creator}]) .container:after,
  :host([serp-slot=${jy.Pole}]) .container:after,
  :host([serp-slot=${jy.RightRail}]) .container:after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 8px;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    pointer-events: none;
  }

  :host([serp-slot=${jy.Creator}]) cib-button-descriptor,
  :host([serp-slot=${jy.Pole}]) cib-button-descriptor,
  :host([serp-slot=${jy.RightRail}]) cib-button-descriptor {
    top: unset;
    bottom: -32px;
  }

  :host([serp-slot=${jy.Creator}]) .overflow-menu,
  :host([serp-slot=${jy.Pole}]) .overflow-menu,
  :host([serp-slot=${jy.RightRail}]) .overflow-menu {
    left: unset;
    right: 0;
  }

  :host([serp-slot=${jy.Creator}][overflow]) button.more cib-button-descriptor,
  :host([serp-slot=${jy.Pole}][overflow]) button.more cib-button-descriptor,
  :host([serp-slot=${jy.RightRail}][overflow]) button.more cib-button-descriptor {
    opacity: 0;
  }

  /* DROPDOWN FOR EXPORT */
  .export-dropdown {
    inset-inline-start: 108px;
    top: calc(100% + 4px);
    border: 0.5px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
  }

  .export-dropdown button {
    padding-inline-start: 14px;
    width: 176px;
    font-size: 13px;
    line-height: 15px;
    color: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForeground};
  }

  .export-dropdown button:hover {
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
    opacity: 1;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
    color: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForegroundPressed};
  }

  .export-dropdown button:nth-of-type(1):hover {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .export-dropdown button:nth-last-of-type(1):hover {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .button-divider {
    width: 1px;
    height: 36px;
    background: ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  /* FOR TOOLBAR WITHOUT MORE MENU BUTTON */
  :host([toolbar-without-more-menu-button="true"]) {
    top: -28px;
  }

  :host([toolbar-without-more-menu-button="true"]) {
    border: 0.5px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }
  
  :host([toolbar-without-more-menu-button="true"]) button {
    border-radius: 0px;
  }

  :host([toolbar-without-more-menu-button="true"]) .container button:hover,
  :host([toolbar-without-more-menu-button="true"]) .export-button[aria-expanded="true"] {
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackgroundHover};
    opacity: 1;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host([toolbar-without-more-menu-button="true"]) .container button:nth-of-type(1):hover {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  :host([toolbar-without-more-menu-button="true"]) .container button:nth-last-of-type(1):hover {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  :host([toolbar-without-more-menu-button="true"]) button:before {
    background: none;
  }

  :host([toolbar-without-more-menu-button="true"]) button svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForeground};
  }

  @media (hover: hover) {
    :host([toolbar-without-more-menu-button="true"]) button:hover svg-icon {
      fill: ${tb.theme.neutralColors.foreground.colorNeutralPrimaryForegroundHover} !important;
    }
  }

  :host([toolbar-without-more-menu-button="true"]) .overflow-menu {
    border: 0.5px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
  }
`.withBehaviors(tE(css`
    :host button {
      color: ${iE.ButtonText};
    }

    :host button:hover,
    :host button:focus-visible,
    :host button:hover .overflow-menu-icon,
    :host button:focus-visible .overflow-menu-icon {
      color: ${iE.Highlight};
    }

    :host button:hover:after,
    :host button:focus-visible:after {
      border: 2px solid ${iE.Highlight};
      outline: none;
    }

    button.divider {
      border-right-color: ${iE.CanvasText};
    }
  `)),aT=css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 24px;
    width: max-content;
    top: -28px;
    padding: 0 8px;
    border-radius: 4px;
    background-color: ${tb.theme.neutralColors.background.colorNeutralLayerCardInverted};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundInverted};
    text-align: center;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    font-size: ${tb.platform.typography.typeRamp.caption1Strong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1Strong.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.caption1Strong.fontWeight};
    font-weight: 600;
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1Strong.fontVariationSettings};
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }
`.withBehaviors(tE(css`
    :host {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background-color: ${iE.Highlight};
    }
  `)),sT=html`${O=>O.description}`;let lT=class extends St{constructor(){super(...arguments),this.description=""}};__decorate([attr,__metadata("design:type",String)],lT.prototype,"description",void 0),lT=__decorate([customElement({name:"cib-button-descriptor",template:sT,styles:aT})],lT);const cT=css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    left: -10000px;
    top: -476px;
    width: 873px;
    height: 476px;
    overflow: hidden;
    background-color: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundSolid};
    padding: 24px 48px 0 48px;
  }

  :host([mobile]) {
    top: -276px;
    width: 390px;
    height: 276px;
  }

  cib-message {
    transition: none;
    animation-delay: 0s;
    animation-duration: 0s;
    margin-bottom: 24px;
  }

  .bottom-cover {
    position: absolute;
    height: 25%;
    width: 100%;
    bottom: -3px;
    inset-inline-start: 0;
    background: linear-gradient(
      0deg,
      ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundSolid} 30%,
      ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundTransparent} 100%
    );
    z-index: 10;
  }
`,dT=html`
  <template ?mobile=${O=>O.layout.isMobile}>
    ${repeat((O=>{var B;return null===(B=null==O?void 0:O.vm)||void 0===B?void 0:B.messages}),html`<cib-message :vm=${O=>O} :layout=${(O,B)=>B.parent.layout}></cib-message>`,{recycle:!1})}
    <div class="bottom-cover"></div>
  </template>
`;let pT=class extends St{constructor(){super(),this.contentSizeObserver=null,this.onContentResize=O=>{this.vm.setMessagesReadyTokenReady(!0)},this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.contentSizeObserver=new ResizeObserver(this.onContentResize),this.contentSizeObserver.observe(this)}disconnectedCallback(){var O;super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose(),null===(O=this.contentSizeObserver)||void 0===O||O.unobserve(this)}};__decorate([observable,__metadata("design:type",Object)],pT.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Object)],pT.prototype,"vm",void 0),pT=__decorate([customElement({name:"cib-history-conversation",template:dT,styles:cT}),__metadata("design:paramtypes",[])],pT);const uT=html`
  ${when((O=>O.vm.enableFlatActionBar),html`<div class="button-divider"></div>`)}
`,hT=html`
  <button
    class="positive"
    type="button"
    aria-label=${O=>O.vm.strings.likeButtonAriaLabel}
    aria-pressed=${O=>O.vm.hasSubmittedPositiveFeedback}
    @click=${O=>O.handlePositiveClick()}
  >
    <svg-icon type=${lE.ThumbLike} size="22"></svg-icon>
    <cib-button-descriptor description=${O=>O.vm.strings.tooltipPositive}></cib-button-descriptor>
  </button>
  ${uT}
  <button
    class="negative"
    type="button"
    aria-label=${O=>O.vm.strings.dislikeButtonAriaLabel}
    aria-pressed=${O=>O.vm.hasSubmittedNegativeFeedback}
    @click=${O=>O.handleNegativeClick()}
  >
    <svg-icon type=${lE.ThumbDislike} size="22"></svg-icon>
    <cib-button-descriptor description=${O=>O.vm.strings.tooltipNegative}></cib-button-descriptor>
  </button>
`,mT=html` ${when((O=>O.vm.shareWholeThread),html`
    <div class="history-conversation-screenshot" ${ref("historyConversation")}>
      ${when((O=>O.vm.enableShowHistoryConversation),html` <cib-history-conversation
          :layout=${O=>O.layout}
          :vm=${O=>O.vm.historyConversationVm}
        >
        </cib-history-conversation>`)}
    </div>
  `)}`,gT=html`
  ${when((O=>O.shouldShowShare()),html`
      <button
        ${ref("shareButton")}
        type="button"
        aria-label=${O=>O.vm.strings.shareButtonAriaLabel}
        aria-haspopup="true"
        @hover=${(O,B)=>O.handleShareHover(B.event)}
        @click=${O=>O.vm.isHostMessageShareEnable()&&O.handleShareClick()}
      >
        <svg-icon type=${lE.Share} size="22"></svg-icon>
        <cib-button-descriptor description=${O=>O.vm.strings.tooltipShare}></cib-button-descriptor>
      </button>
      ${mT}
    `)}
`,fT=html`
  <button
    class="${O=>{var B;return(null===(B=O.vm.copyVm)||void 0===B?void 0:B.copyState)===Py.Copied?"copy-success":""}}"
    type="button"
    role="menuitem"
    aria-label=${O=>{var B;return null===(B=O.vm.copyVm)||void 0===B?void 0:B.strings.copyButtonAriaLabel}}
    ${ref("copyButton")}
    @click=${O=>O.handleCopyClick()}
  >
    <div class="overflow-menu-icon">
      <svg-icon type=${lE.Copy} size="22"></svg-icon>
    </div>
    ${O=>O.vm.shouldShowToolTipStyleOfMoreMenuItem||O.vm.enableFlatActionBar?html`<cib-button-descriptor description=${O=>O.getCopyText()}></cib-button-descriptor>`:html`<div class="overflow-menu-text">${O=>O.getCopyText()}</div>`}
  </button>
`,yT=html`
  ${when((O=>O.vm.enableMessageExport),html`
      <button
        type="button"
        class="export-button"
        aria-expanded=${O=>O.showExportDropdown}
        role="menuitem"
        aria-label=${O=>O.vm.exportVm.strings.exportButtonAriaLabel}
        ${ref("exportButton")}
        @click=${O=>O.handleExportClick()}
      >
        <div class="overflow-menu-icon">
          <svg-icon type=${lE.ArrowDownload} size="22"></svg-icon>
        </div>
        ${when((O=>O.vm.enableFlatActionBar),html`<cib-button-descriptor
            description=${O=>O.vm.exportVm.strings.tooltipExport}
          ></cib-button-descriptor>`)}
      </button>
    `)}
`,_T=html`
  <button
    type="button"
    role="menuitem"
    aria-label=${O=>O.vm.strings.offensiveButtonAriaLabel}
    aria-checked=${O=>O.vm.hasSubmittedOffensiveFeedback}
    @click=${O=>O.handleOffensiveClick()}
  >
    <div class="overflow-menu-icon">
      ${when((O=>O.vm.hasSubmittedOffensiveFeedback),html`<svg-icon type=${lE.FlagFill} size="22"></svg-icon> `)}
      ${when((O=>!O.vm.hasSubmittedOffensiveFeedback),html`<svg-icon type=${lE.Flag} size="22"></svg-icon> `)}
    </div>
    ${O=>O.vm.shouldShowToolTipStyleOfMoreMenuItem||O.vm.enableFlatActionBar?html`<cib-button-descriptor description=${O.vm.strings.messageActionsReport}></cib-button-descriptor>`:html`<div class="overflow-menu-text">${O.vm.strings.messageActionsReport}</div>`}
  </button>
`,vT=html`
  ${when((O=>O.vm.copyVm),fT)} ${when((O=>O.vm.enableOffensiveFeedback),_T)}
`,bT=html` ${O=>!O.vm.enableFeedbackMenuOverflow||O.vm.moreMenuNumber>1?html`
        <button
          class="more"
          type="button"
          aria-label="See More Options"
          aria-haspopup="true"
          aria-expanded=${O=>O.showMore}
          @click=${O=>O.handleMoreClick()}
          @keydown=${(O,B)=>O.handleMoreKeydown(B.event)}
          ${ref("moreButton")}
        >
          <svg-icon type=${lE.More} size="22"></svg-icon>
          <cib-button-descriptor description=${O=>O.vm.strings.tooltipMore}></cib-button-descriptor>
        </button>
      `:vT}`,ST=html`
  ${when((O=>O.showMore),html`
      <div
        class="overflow-menu"
        role="menu"
        @keydown=${(O,B)=>O.handleMenuKeydown(B.event)}
        ${children({property:"moreMenuItems",filter:node_observation_elements()})}
      >
        ${vT}
      </div>
    `)}
`,CT=html`
  ${when((O=>O.showExportDropdown),html`
      <div class="overflow-menu export-dropdown" role="menu">
        <button
          type="button"
          role="menuitem"
          aria-label="PDF"
          @click=${O=>O.handleExportByFileType(up.Pdf)}
        >
          <span class="overflow-menu-text">PDF</span>
        </button>
        <button
          type="button"
          role="menuitem"
          aria-label="Text"
          @click=${O=>O.handleExportByFileType(up.Txt)}
        >
          <span class="overflow-menu-text">Text</span>
        </button>

        <button
          type="button"
          role="menuitem"
          aria-label="Word"
          @click=${O=>O.handleExportByFileType(up.Docx)}
        >
          <span class="overflow-menu-text">Word</span>
        </button>
      </div>
    `)}
`,ET=html`
  ${hT} ${gT} ${when((O=>O.vm.shouldShowMoreMenuButton),bT)}
`,xT=html`
  ${hT} ${uT} ${fT}${uT} ${yT}${uT}
  ${gT} ${when((O=>O.vm.enableOffensiveFeedback),html`${uT} ${_T}`)}
`,TT=html`<div class="container">
    ${O=>O.vm.enableFlatActionBar?xT:ET}
  </div>
  ${ST} ${CT}`,wT=html`
  <template
    serp-slot=${O=>{var B,U;return null!==(U=null===(B=O.layout)||void 0===B?void 0:B.serpSlot)&&void 0!==U?U:jy.None}}
    ?overflow=${O=>O.showMore}
    @mouseenter=${O=>O.handleHostMouseEnter()}
    @mouseleave=${O=>O.handleHostMouseLeave()}
    ?data-html2canvas-ignore=${O=>!!O.vm.enableIgnoreHtml2canvas||void 0}
    toolbar-without-more-menu-button=${O=>O.vm.enableFlatActionBar}
    ?mobile=${O=>O.layout.isMobile}
  >
    ${when((O=>!O.vm.enableStandaloneUtility),html`
        <div class="container">
          ${O=>O.vm.enableFlatActionBar?xT:ET}
        </div>
        ${ST} ${CT}
      `)}
    ${when((O=>O.vm.enableStandaloneUtility),html`
        ${O=>!0==(O.vm.utilityType===Ry.Share)?gT:TT}
      `)}
  </template>
`;let kT=class extends St{constructor(){super(),this.showMore=!1,this.isShareClicked=!1,this.showExportDropdown=!1,this.hostMouseOverTimerId=null,this.focusedMenuItemIndex=0,this.shareButtonIntersectionObserver=null,this.handleMoreKeydown=O=>{if(O&&!O.defaultPrevented)switch(O.key){case"Enter":case"Space":this.toggleShowMore(),!0===this.showMore&&dt.queueUpdate((()=>{this.moreMenuItems[0].focus()}));break;default:return!0}},this.handleMenuKeydown=O=>{var B,U;if(O&&!O.defaultPrevented)switch(O.key){case"ArrowDown":O.preventDefault(),this.focusMenuItem(this.focusedMenuItemIndex+1,1);break;case"ArrowUp":O.preventDefault(),this.focusMenuItem(this.focusedMenuItemIndex-1,-1);break;case"End":return O.preventDefault(),void this.focusMenuItem(this.moreMenuItems.length-1,-1);case"Home":return O.preventDefault(),void this.focusMenuItem(0,1);case"Escape":O.preventDefault(),this.hideShowMore(),null===(B=this.moreButton)||void 0===B||B.focus();break;case"Tab":case O.shiftKey&&"Tab":O.preventDefault(),this.hideShowMore(),null===(U=this.moreButton)||void 0===U||U.focus();break;default:return!0}},this.disposer=new Disposer}connectedCallback(){var O,B,U;if(super.connectedCallback(),this.vm.telemetry.trackEvent("InteractionEvent","CibFeedbackRender",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}),!this.vm.isHostMessageShareEnable()&&this.shareButton){if(this.vm.isFeedbackInstrumentationEnabled()){const O={threshold:.5};this.shareButtonIntersectionObserver=new IntersectionObserver(this.handleShareShow.bind(this),O),this.shareButtonIntersectionObserver.observe(this.shareButton)}this.disposer.register(addDisposableListener(this.shareButton,"click",this.handleShareClick.bind(this)))}this.vm.enableMessageExport&&this.exportButton&&this.vm.isFeedbackInstrumentationEnabled()&&this.vm.telemetry.trackEvent("InteractionEvent","CibFeedbackExportRender",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)}),this.copyButton&&this.vm.isFeedbackInstrumentationEnabled()&&this.vm.telemetry.trackEvent("InteractionEvent","CibFeedbackCopyRender",{Namespace:jy.toTelemetryNamespace(null===(U=this.layout)||void 0===U?void 0:U.serpSlot)})}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.shareButtonIntersectionObserver)||void 0===O||O.disconnect(),this.disposer.isDisposed||this.disposer.dispose()}handleHostMouseEnter(){this.hostMouseOverTimerId&&(window.clearTimeout(this.hostMouseOverTimerId),this.hostMouseOverTimerId=null)}handleHostMouseLeave(){this.hostMouseOverTimerId=window.setTimeout((()=>{this.hideShowMore(),this.hideShowExportDropdown()}),1e3)}async handlePositiveClick(){var O;return this.hideShowMore(),this.hideShowExportDropdown(),this.vm.sendFeedbackAsync("Positive",!this.vm.hasSubmittedPositiveFeedback,null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}async handleNegativeClick(){var O;return this.hideShowMore(),this.hideShowExportDropdown(),this.vm.sendFeedbackAsync("Negative",!this.vm.hasSubmittedNegativeFeedback,null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}async handleOffensiveClick(){var O;return this.hideShowMore(),this.hideShowExportDropdown(),this.vm.sendFeedbackAsync("Offensive",!this.vm.hasSubmittedOffensiveFeedback,null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}toggleShowMore(){this.showMore=!this.showMore}hideShowMore(){!1!==this.showMore&&(this.resetMenuItems(),this.showMore=!1)}handleMoreClick(){this.toggleShowMore()}resetMenuItems(){if(!this.moreMenuItems)return;this.moreMenuItems[this.focusedMenuItemIndex].setAttribute("tabindex","-1"),this.moreMenuItems[0].setAttribute("tabindex","0"),this.focusedMenuItemIndex=0}focusMenuItem(O,B){if(void 0!==this.moreMenuItems)for(;O>=0&&O<this.moreMenuItems.length;){const U=this.moreMenuItems[O];if("menuitem"===U.getAttribute("role")){this.focusedMenuItemIndex>-1&&this.moreMenuItems.length>=this.focusedMenuItemIndex-1&&this.moreMenuItems[this.focusedMenuItemIndex].setAttribute("tabindex","-1"),this.focusedMenuItemIndex=O,U.setAttribute("tabindex","0"),U.focus();break}O+=B}}shouldShowShare(){var O;return this.vm.isShareEligibleSlot(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)&&this.vm.shouldShowMessageShare}handleShareShow(){var O;this.vm.telemetry.trackEvent("Show","CibFeedbackHandleShareShow",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)})}async handleShareClick(O){var B,U,G,q;if(this.vm.isFeedbackInstrumentationEnabled()&&this.vm.telemetry.trackEvent("Click","CibFeedbackHandleShareClick",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)}),this.hideShowMore(),this.hideShowExportDropdown(),this.vm.shareWholeThread&&(this.messageEl=this.historyConversation),this.messageEl){if(this.shareButton)return null===(q=this.vm.log)||void 0===q||q.trace(this,this.handleShareClick,"Opening share control",{serpSlot:this.layout.serpSlot,messageEl:this.messageEl}).write(),setTimeout((()=>{this.isShareClicked=!0}),167),this.vm.share(this.layout.serpSlot,this.messageEl,this.shareButton,this.layout.hoverVm);null===(G=this.vm.log)||void 0===G||G.error(this,this.handleShareClick,"ShareButton undefined, ending share early").write()}else null===(U=this.vm.log)||void 0===U||U.error(this,this.handleShareClick,"Screenshot target undefined, ending share early").write()}async handleShareHover(O){var B,U,G;if(this.isShareClicked)if(this.vm.shareWholeThread&&(this.messageEl=this.historyConversation),this.hideShowMore(),this.hideShowExportDropdown(),this.messageEl){if(this.shareButton)return null===(G=this.vm.log)||void 0===G||G.trace(this,this.handleShareHover,"Opening share control",{serpSlot:this.layout.serpSlot,messageEl:this.messageEl}).write(),this.vm.share(this.layout.serpSlot,this.messageEl,this.shareButton,this.layout.hoverVm);null===(U=this.vm.log)||void 0===U||U.error(this,this.handleShareHover,"ShareButton undefined, ending share early").write()}else null===(B=this.vm.log)||void 0===B||B.error(this,this.handleShareHover,"Screenshot target undefined, ending share early").write()}handleCopyClick(){var O;return this.hideShowExportDropdown(),this.vm.copyVm?null===(O=this.vm.copyVm)||void 0===O?void 0:O.copyToClipboard():Promise.reject()}getCopyText(){var O;return null===(O=this.vm.copyVm)||void 0===O?void 0:O.getButtonText()}handleExportClick(){this.showExportDropdown=!this.showExportDropdown}handleExportByFileType(O){var B;return this.hideShowMore(),null===(B=this.vm.exportVm)||void 0===B?void 0:B.exportToFile(O,void 0,{filename:"Answer"})}hideShowExportDropdown(){!1!==this.showExportDropdown&&(this.showExportDropdown=!1)}};__decorate([observable,__metadata("design:type",Boolean)],kT.prototype,"showMore",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"messageEl",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"shareButton",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"moreButton",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"moreMenuItems",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"exportButton",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"copyButton",void 0),__decorate([observable,__metadata("design:type",Object)],kT.prototype,"historyConversation",void 0),__decorate([observable,__metadata("design:type",Boolean)],kT.prototype,"isShareClicked",void 0),__decorate([observable,__metadata("design:type",Boolean)],kT.prototype,"showExportDropdown",void 0),kT=__decorate([customElement({name:"cib-feedback",template:wT,styles:oT}),__metadata("design:paramtypes",[])],kT);const AT=css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: start;
    flex-grow: 1;
    min-height: 24px;
    max-height: 24px;
    padding: 0px 16px;
    margin: 9px 0px;
    overflow: hidden;
  }

  /* EXPANDED */

  :host([expanded]) {
    height: unset !important;
    max-height: unset !important;
  }

  /* CONTAINERS */

  .root {
    display: flex;
    flex-direction: row;
    row-gap: 6px;
  }

  .attribution-container {
    display: flex;
    flex-direction: row;
    row-gap: 6px;
  }

  .attribution-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 6px;
  }

  /* ATTRIBUTION-ITEMS */

  .attribution-item {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: max-content;
    height: 24px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 8px;
    margin-inline-end: 6px;
    font-weight: 500;
    line-height: 24px;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    color: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
  }

  @media (hover: hover) {
    .attribution-item:hover {
      text-decoration: underline;
    }
  }

  .attribution-item.wrapped {
    block-size: 24px;
    inline-size: 0;
    min-width: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* LEARN */

  .learn-more {
    position: relative;
    min-width: fit-content;
    height: 24px;
    left: 1px;
    margin-right: 6px;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: 24px;
    font-weight: 600;
  }

  /* EXPAND BUTTON */

  .expand-button {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 8px;
    right: 12px;
    height: 24px;
    margin: 0;
    border: none;
    cursor: pointer;
    bottom: 8px;
    text-decoration: none !important;
    min-width: max-content;
    text-transform: lowercase;
    font-weight: 500;
    line-height: 24px;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    color: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
  }

  /* SERP SLOT & MOBILE*/

  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    margin: 0;
    padding: 0;
  }

  :host([mobile]),
  :host([serp-slot=${jy.RightRail}]) {
    min-height: 24px;
    max-height: 84px;
  }

  :host([mobile]) .root,
  :host([serp-slot=${jy.RightRail}]) .root {
    flex-wrap: wrap;
  }

  :host([mobile]) .learn-more {
    width: 100%;
  }

  /* MEDIA QUERIES */

  @media (max-width: 600px) {
    :host {
      min-height: 24px;
      max-height: 84px;
    }

    :host .root {
      flex-wrap: wrap;
    }

    :host .learn-more {
      width: 100%;
    }
  }
`.withBehaviors(tE(css`
    .expand-button {
      color: ${iE.ButtonText};
    }
  `)),RT=html`
  <a
    class="attribution-item"
    h="${O=>O.h}"
    href="${O=>O.link}"
    title="${O=>O.title}"
    target="_blank"
    role="listitem"
    data-citationid="${O=>O.id}"
    @click=${(O,B)=>O.handleLinkClick(B.event)}
    >${O=>O.sourceCaption}</a
  >
`,IT=html`
  <a
    class="attribution-item"
    h="${O=>O.h}"
    title="${O=>O.title}"
    target="_self"
    role="listitem"
    data-info="${O=>JSON.stringify(O)}"
    @click=${(O,B)=>O.handleLinkClick(B.event)}
  >
    ${O=>O.sourceCaption}
  </a>
`,PT=html`
  ${(O,B)=>{switch(!0){case!!O.link:return RT;case!!O.highlightText:return IT;default:return html``}}}
`,NT=html`
  <template
    ?expanded=${O=>O.isExpanded}
    serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
  >
    <div class="root" role="list" aria-label=${O=>O.vm.learnMoreText}>
      <div class="learn-more">${O=>O.vm.learnMoreText}</div>
      <div class="attribution-container">
        <div class="attribution-items" ${ref("linksDiv")}>
          ${repeat((O=>O.vm.attributions),PT)}
          ${when((O=>O.wrappedCount>0),html`
              <button
                class="expand-button"
                type="button"
                aria-label=${O=>O.isExpanded?O.vm.config.strings.seeLess:O.vm.config.strings.seeMore}
                ${ref("expandButton")}
                @click=${O=>O.handleExpandClick()}
              >
                ${when((O=>O.isExpanded&&O.wrappedCount>0),html`&mdash; ${O=>O.vm.config.strings.seeLess}`)}
                ${when((O=>!O.isExpanded&&O.wrappedCount>0),html`+${O=>O.wrappedCount} ${O=>O.vm.config.strings.more}`)}
              </button>
            `)}
        </div>
      </div>
    </div>
  </template>
`;let OT=class extends St{constructor(){super(...arguments),this.wrappedCount=0,this.isExpanded=!1,this.resizeObserver=null,this.handleExpandClick=()=>{var O,B;if(this.isExpanded)this.isExpanded=!1,this.handleResize();else{this.isExpanded=!0,null===(O=this.linksDiv.querySelector(".wrapped"))||void 0===O||O.focus();for(let O=1;O<(null===(B=this.linksDiv)||void 0===B?void 0:B.children.length);O++){const B=this.linksDiv.children.item(O);B.classList.toggle("wrapped",!1),"a"===B.nodeName.toLowerCase()&&(B.tabIndex=0)}}},this.handleResize=()=>{this.assignRows()},this.assignRows=()=>{var O,B,U;if(!this.isExpanded){let G=0,q=0,j=null;this.vm.config.features.enableLongDocument&&this.vm.attributions.some((O=>O.highlightText))&&(this.wrappedCount=0);for(let W=0;W<this.linksDiv.children.length;W++){const Y=null===(O=this.linksDiv)||void 0===O?void 0:O.children[W];if(Y.classList.toggle("wrapped",!1),"a"===Y.nodeName.toLowerCase()){Y.tabIndex=0;const O=Y.previousElementSibling;(!O||Y.offsetLeft<=O.offsetLeft)&&G++;G>((null===(B=this.layout)||void 0===B?void 0:B.isMobile)||(null===(U=this.layout)||void 0===U?void 0:U.serpSlot)===jy.RightRail||window.innerWidth<=600?2:1)?(Y.classList.toggle("wrapped",!0),Y.tabIndex=-1,q++,this.wrappedCount=q):j=Y}}jd((()=>{var O;const B=null===(O=this.linksDiv)||void 0===O?void 0:O.children[this.linksDiv.children.length-1];void 0!==B&&"button"===B.nodeName.toLowerCase()&&j&&B.offsetLeft<=j.offsetLeft&&(j.classList.toggle("wrapped",!0),q++,this.wrappedCount=q)}))}}}attributionCountChanged(){queueMicrotask((()=>this.assignRows()))}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(this.handleResize),this.resizeObserver.observe(this),this.assignRows()}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.resizeObserver)||void 0===O||O.unobserve(this)}};__decorate([attr,__metadata("design:type",Boolean)],OT.prototype,"expanded",void 0),__decorate([observable,__metadata("design:type",Object)],OT.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],OT.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Number)],OT.prototype,"wrappedCount",void 0),__decorate([observable,__metadata("design:type",Boolean)],OT.prototype,"isExpanded",void 0),__decorate([observable,__metadata("design:type",Number)],OT.prototype,"attributionCount",void 0),OT=__decorate([customElement({name:"cib-message-attributions",template:NT,styles:AT})],OT);class RefParentBehavior{constructor(O,B){this.target=O,this.parentPropertyName=B}bind(O,B){B.parent[this.parentPropertyName]=this.target}unbind(){}}const MT=css`
  :host {
    background: unset;
    padding: unset;
    border-radius: unset;
  }

  /* DEFAULTS */

  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  :host .label {
    display: none;
  }

  /* SHARED */

  :host([shared]) {
    padding: 8px 12px 12px;
    margin: 12px;
    border-radius: 8px;
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
  }

  :host([shared][serp-slot=${jy.Creator}]),
  :host([shared][serp-slot=${jy.Pole}]),
  :host([shared][serp-slot=${jy.RightRail}]) {
    margin: 0;
  }

  :host([shared]) .label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    margin: 10px 4px 14px;
    line-height: 22px;
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  :host([shared]) .message {
    background: ${tb.theme.neutralColors.background.colorNeutralPrimaryBackground};
    border-radius: 8px;
    padding: 12px;
    box-shadow: ${tb.theme.shadows.defaults.card};
  }
`,DT=html`
  <template serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}>
    <div class="label">
      <svg-icon type=${lE.HugFill} size="18"></svg-icon>
      ${O=>O.vm.config.strings.messageSharedContent}
    </div>
    <div class="message">
      <slot></slot>
    </div>
  </template>
`;let LT=class extends St{constructor(){super(...arguments),this.shared=!1}};__decorate([observable,__metadata("design:type",Object)],LT.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],LT.prototype,"layout",void 0),__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],LT.prototype,"shared",void 0),LT=__decorate([customElement({name:"cib-shared",template:DT,styles:MT})],LT);const BT=css`
  :host {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 6px;
    bottom: -14px;
    right: 16px;
  }

  /* PILLS */

  .pill {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    width: 34px;
    border-radius: 12px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    border: 0.5px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
  }

  .pill.offense {
    color: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandAlertForeground};
    background: ${tb.theme.brandColors.background.colorBrandAlertBackground};
    border-color: ${tb.theme.brandColors.stroke.colorBrandAlertStroke};
  }

  .pill .icon {
    --size: 20px;
    display: inline-block;
    height: var(--size);
    width: var(--size);
    min-height: var(--size);
    min-width: var(--size);
    user-select: none;
    backface-visibility: hidden;
    transform: translateZ(0);
    background-size: contain;
  }
`,FT=html`
  <template ?offensiveFirst=${O=>O.vm.feedback.shouldOffensiveBeFirst}>
    ${html`
  ${when((O=>O.vm.feedback.hasSelectedFeedback&&O.vm.feedback.hasSubmittedOffensiveFeedback),html`
      <div class="pill offense">
        <svg-icon type=${lE.Offensive} size="18"></svg-icon>
      </div>
    `)}
`} ${html`
  ${when((O=>O.vm.feedback.hasSubmittedPositiveFeedback||O.vm.feedback.hasSubmittedNegativeFeedback),html`
      <div class="pill">
        ${when((O=>O.vm.feedback.hasSubmittedPositiveFeedback),html`<div class="icon" style="background-image: url(${O=>O.positiveIconUrl})"></div>`)}
        ${when((O=>O.vm.feedback.hasSubmittedNegativeFeedback),html`<div class="icon" style="background-image: url(${O=>O.negativeIconUrl})"></div>`)}
      </div>
    `)}
`}
  </template>
`;let zT=class extends St{get positiveIconUrl(){return this.vm.serp.isDevMode?"images/assets/icons/thumbs-up.svg":"https://newbing.jasonyu.v6.navy/cdx/tup.svg"}get negativeIconUrl(){return this.vm.serp.isDevMode?"images/assets/icons/thumbs-down.svg":"https://newbing.jasonyu.v6.navy/cdx/tdwn.svg"}};__decorate([observable,__metadata("design:type",Object)],zT.prototype,"vm",void 0),zT=__decorate([customElement({name:"cib-reactions",template:FT,styles:BT})],zT);const $T=css`
  /* HOST */

  :host {
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    margin-left: 12px;
  }

  .text {
    display: flex;
    gap: 3px;
    font-weight: 600;
    line-height: 24px;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }

  :host([color-state=${iC.Green}]) .indicator {
    background: #2c8247;
  }

  :host([color-state=${iC.Amber}]) .indicator {
    background: #ee8f00;
  }

  :host([color-state=${iC.Red}]) .indicator {
    background: #c80000;
  }
`,UT=html`
  <template
    serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}
    product-type=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.productType}}
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    color-state=${O=>O.vm.getTurnCounterState()}
  >
    <div class="text">
      <span>${O=>O.vm.currentTurnIndex}</span>
      <span> ${O=>O.vm.strings.of} </span>
      <span>${O=>O.vm.maxTurnLength}</span>
    </div>
    <div class="indicator"></div>
  </template>
`;let VT=class extends St{};__decorate([observable,__metadata("design:type",Object)],VT.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],VT.prototype,"layout",void 0),VT=__decorate([customElement({name:"cib-turn-counter",template:UT,styles:$T})],VT);const GT=css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
    padding: 12px 12px 0px 12px;
  }

  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    padding: 0px 0px 16px 0px;
  }

  .icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 28px;
    min-width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-inline-start: 8px;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }
`,HT=html`
  <template serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}>
    <slot class="icon" name="icon"></slot>
    <slot class="label"></slot>
  </template>
`;let qT=class extends St{};__decorate([observable,__metadata("design:type",Object)],qT.prototype,"layout",void 0),qT=__decorate([customElement({name:"cib-message-header",template:HT,styles:GT})],qT);const jT=css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  :host {
    display: flex;
    flex-direction: row;
    will-change: transform;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    outline: 1px solid transparent;
  }

  :host([location=${Ny.Sidebar}]) {
    background: none;
  }

  :host([location=${Ny.FeedbackMenu}]) button {
    justify-content: flex-start;
    width: 100%;
  }

  :host([location=${Ny.FeedbackMenu}]) .overflow-menu-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  :host([location=${Ny.FeedbackMenu}]) .overflow-menu-text {
    padding-right: 10px;
    white-space: nowrap;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  :host([location=${Ny.FeedbackMenu}]) .copy-success,
  :host([location=${Ny.FeedbackMenu}]) .copy-success .overflow-menu-icon {
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  /* BUTTONS */

  button {
    position: relative;
    outline: none;
    border: none;
    background: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackground};
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-family: ${tb.platform.typography.fonts.text};
    border-radius: 6px;
  }

  button:before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 6px;
    background: ${tb.theme.stealthColors.background.colorStealthSecondaryBackgroundHover};
    opacity: 0;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  button svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  :host([serp-slot=${jy.Creator}]) button svg-icon,
  :host([serp-slot=${jy.Pole}]) button svg-icon,
  :host([serp-slot=${jy.RightRail}]) button svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
  }

  @media (hover: hover) {
    button:hover:before,
    button:hover cib-button-descriptor {
      opacity: 1;
    }

    button:hover svg-icon {
      fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground} !important;
    }
  }

  button:active:before,
  button:active cib-button-descriptor,
  button:focus-visible cib-button-descriptor {
    opacity: 1;
  }

  button:active svg-icon {
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground} !important;
  }

  button:focus-visible:before {
    opacity: 1;
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus} !important;
  }

  button.more {
    padding-left: 1px;
  }

  button.more:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-left: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  button cib-button-descriptor {
    opacity: 1;
  }
`.withBehaviors(tE(css`
    :host button {
      color: ${iE.ButtonText};
    }

    :host button:hover,
    :host button:focus-visible,
    :host button:hover .overflow-menu-icon,
    :host button:focus-visible .overflow-menu-icon {
      color: ${iE.Highlight};
    }

    :host button:hover:after,
    :host button:focus-visible:after {
      border: 2px solid ${iE.Highlight};
      outline: none;
    }

    button.divider {
      border-right-color: ${iE.CanvasText};
    }
  `)),WT=html`
  <template location=${O=>O.location}>
    ${when((O=>O.shouldShowCopy),html`<button
        class="${O=>O.vm.copyState===Py.Copied?"copy-success":""}"
        type="button"
        role="menuitem"
        aria-label=${O=>O.vm.strings.copyButtonAriaLabel}
        ${ref("copyButton")}
        @click=${(O,B)=>O.handleCopyClick(B.event)}
      >
        <div class="overflow-menu-icon">
          <svg-icon type=${lE.Copy} size="22"></svg-icon>
        </div>
        ${when((O=>O.vm.shouldRenderString),html` <div class="overflow-menu-text">${O=>O.vm.getButtonText()}</div> `)}
        ${when((O=>O.vm.shouldShowCopiedToolTip(O.location)),html`<cib-button-descriptor
            description=${O=>O.vm.strings.messageActionsCopied}
          ></cib-button-descriptor>`)}
      </button>`)}
  </template>
`;let YT=class extends St{constructor(){super(),this.copyButtonIntersectionObserver=null,this.isLogged=!1}get shouldShowCopy(){return!!this.vm&&this.vm.shouldShowCopy}connectedCallback(){var O;if(super.connectedCallback(),this.copyButton&&this.vm.isInstrumentationEnabled){this.vm.telemetry.trackEvent("InteractionEvent","CibCopyRender",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot),CustomData:this.location});const B={threshold:.5};this.copyButtonIntersectionObserver=new IntersectionObserver(this.handleCopyShow.bind(this),B),this.copyButtonIntersectionObserver.observe(this.copyButton)}}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.copyButtonIntersectionObserver)||void 0===O||O.disconnect()}async handleCopyClick(O){return await this.vm.copyToClipboard(),!0}getCopyText(){switch(this.vm.copyState){case Py.Idle:return this.vm.strings.messageActionsCopy;case Py.Copying:return this.vm.strings.messageActionsCopying;case Py.Copied:return this.vm.strings.messageActionsCopied;case Py.Error:return this.vm.strings.messageActionsCopyError;default:return this.vm.strings.messageActionsCopy}}handleCopyShow(){var O;this.isLogged||(this.isLogged=!0,this.vm.telemetry.trackEvent("Show","CibCopyShow",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot),CustomData:this.location}))}};__decorate([observable,__metadata("design:type",HTMLButtonElement)],YT.prototype,"copyButton",void 0),__decorate([observable,__metadata("design:type",Object)],YT.prototype,"layout",void 0),YT=__decorate([customElement({name:"cib-copy",template:WT,styles:jT}),__metadata("design:paramtypes",[])],YT);const KT=html`
  ${when(((O,B)=>{var U;return(null===(U=B.parent.layout)||void 0===U?void 0:U.serpSlot)===jy.None}),html`<div
      class="hidden"
      aria-live="polite"
      aria-hidden="${(O,B)=>""===B.parent.getAriaLiveText(O.text)||B.parent.focused}"
    >
      <div
        role="${O=>O.author===Yi.User?"heading":null}"
        aria-level="${O=>O.author===Yi.User?2:null}"
      >
        ${(O,B)=>`${O.author===Yi.User?O.config.strings.messageSentAriaLabelPrefix:O.config.strings.messageReceivedAriaLabelPrefix}. ${B.parent.getAriaLiveText(O.text)}`}
      </div>
    </div>`)}
`,QT=html`
  <div class="hidden" aria-live="polite">${O=>html`${O.metaTextHtml}`}</div>
`,ZT=html`<div></div>`,XT=html`
  <cib-shared ?shared="${O=>O.isShared}" :vm=${O=>O} ">
    <div class="content externalHtml">${O=>html`${O.htmlString}`}</div>
  </cib-shared>

  ${KT}
`,JT=html`
  <cib-shared ?shared="${O=>O.isShared}" :vm=${O=>O} ">
    <div class="content fullBleed">${O=>html`${O.htmlString}`}</div>
  </cib-shared>

  ${KT}
`,ew=html`
  <div class="content">${O=>O.fateOverrideTemplate}</div>
  ${KT}
`,tw=html`
  <cib-shared
    ?shared=${(O,B)=>{var U,G;return!((null===(U=B.parent.layout)||void 0===U?void 0:U.isSharedConversation)&&(null===(G=B.parent.layout)||void 0===G?void 0:G.serpSlot)===jy.None&&O.serp.mode===Hy.Conversation)&&O.isShared}}
    :vm=${O=>O}
    :layout=${(O,B)=>B.parent.layout}
    @copy=${(O,B)=>O.handleKatexMessageCopy(B.event)}
  >
    <div
      class="content"
      ${iw="contentDiv",new AttachedBehaviorHTMLDirective("cib-ref-parent",RefParentBehavior,iw)}
      aria-hidden="true"
      tabindex="0"
      @pointerover="${(O,B)=>{B.event.target&&B.parent.tryTargetHoverCard(B.event.target)}}"
    >
      ${O=>O.adaptiveCardTemplate}
    </div>
  </cib-shared>
  ${KT}
`;var iw;const rw=html`
  <cib-shared
    ?shared=${(O,B)=>{var U,G;return!((null===(U=B.parent.layout)||void 0===U?void 0:U.isSharedConversation)&&(null===(G=B.parent.layout)||void 0===G?void 0:G.serpSlot)===jy.None&&O.serp.mode===Hy.Conversation)&&O.isShared}}
    :vm=${O=>O}
    :layout=${(O,B)=>B.parent.layout}
  >
    <div class="content text-message-content" aria-hidden="true" tabindex="0">${O=>O.text}</div>
    ${KT}
    <slot name="footer"></slot>
    ${when((O=>O.feedbackPrompt),html`
  <div class="fp-horizontal-separator"></div>
  <div class="fp-container">
    <button
      class="fp-button"
      aria-label=${O=>O.config.strings.feedbackPromptGiveFeedbackAriaLabel}
      @click=${(O,B)=>B.parent.handleGiveFeedbackClick(B.event)}
    >
      ${O=>O.config.strings.feedbackPromptGiveFeedback}
    </button>
  </div>
`)}
  </cib-shared>
`,nw=html`
  <div class="content">
    ${when((O=>O.icon===Cy.CheckMark),html`<svg-icon
        type=${lE.CheckMark}
        size="28"
        color="#13A10E"
      ></svg-icon>`)}
    ${when((O=>O.icon===Cy.LockClosed),html`<svg-icon
        type=${lE.LockClosed}
        size="24"
        color="${O=>tb.theme.neutralColors.foreground.colorNeutralForeground}"
      ></svg-icon>`)}
    <div class="meta-text">${O=>html`${O.metaTextHtml}`}</div>
    ${QT}
  </div>
`,ow=html`
  <div class="content">
    <div class="meta-text">${O=>html`${O.metaTextHtml}`}</div>
    ${QT}
  </div>
`,aw=html`
  <cib-card class="card">
    <iframe class="card-frame" src=${O=>O.contentUrl}></iframe>
  </cib-card>
`,sw=html`
  <iframe class="frame captcha-frame" src=${O=>O.contentUrl}></iframe>
`,lw=html` ${when((O=>!O.cancelRender),html`
    <cib-shared
      ?shared=${(O,B)=>{var U,G;return!((null===(U=B.parent.layout)||void 0===U?void 0:U.isSharedConversation)&&(null===(G=B.parent.layout)||void 0===G?void 0:G.serpSlot)===jy.None&&O.serp.mode===Hy.Conversation)&&O.isShared}}
      :vm=${O=>O}
      :layout=${(O,B)=>B.parent.layout}
    >
      <iframe
        ${ref("hostIframeRef")}
        style="width:${O=>O.frameWidth};height:${O=>O.frameHeight};"
        class="frame"
        src=${O=>O.contentUrl}
        role="presentation"
      >
      </iframe>
    </cib-shared>
  `)}`,cw=html` ${when((O=>!O.cancelRender),html`
    <iframe
      style="width:${O=>O.frameWidth};height:${O=>O.frameHeight};"
      class="frame"
      src=${O=>O.contentUrl}
      sandbox="allow-scripts allow-same-origin allow-popups"
      csp=${O=>O.iFrameCSPAttribute}
      role="presentation"
    >
    </iframe>
  `)}`,dw=html` <div
  class="context-message-container"
>
  <div class="context-container">
    <span class="context-prefix">${O=>O.config.strings.webPageContextPrefix}</span>
    <a target="_blank" class="context-link" title=${O=>O.sourceName} href=${O=>O.sourceUrl}>
      ${O=>{var B;return null!==(B=O.sourceName)&&void 0!==B?B:O.sourceUrl}}
    </a>
  </div>
</div>`,pw=html`<slot></slot>`,uw=html`
  <template
    class="cib-message-main"
    ?animate=${O=>O.shouldAnimate}
    ?attributions=${O=>O.areAttributionsPresent()}
    ?fail=${O=>O.vm.cancelRender}
    ?feedback=${O=>O.shouldRenderFeedback&&O.isTextMessageViewModel(O.vm)&&O.vm.feedback.hasSelectedFeedback}
    type=${O=>O.vm.type}
    source=${O=>O.vm.author}
    content=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.contentType}}
    serp-slot=${O=>{var B,U;return null!==(U=null===(B=O.layout)||void 0===B?void 0:B.serpSlot)&&void 0!==U?U:jy.None}}
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    ?cached=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isCachedResponse}}
    ?see-more-covering=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isSeeMoreCovering}}
    ?see-more-expanded=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isSeeMoreExpanded}}
    ?isempty=${O=>O.isEmptyMessage}
    @focusin=${(O,B)=>O.handleFocusIn()}
    @focusout=${(O,B)=>O.handleFocusOut()}
    @mouseenter=${O=>O.handleMouseEnter()}
    ${ref("textScreenshotTarget")}
  >
    ${when((O=>!O.isEmptyMessage&&O.shouldRenderPrivacyHeader),html`<div class="content header">
        <cib-message-header :layout=${O=>O.layout}>
          <svg-icon slot="icon" type=${lE.LockClosed} size="20" color="#FFFFFF"></svg-icon>
          <span aria-label=${O=>O.vm.config.strings.messagePrivacyLabel}>
            ${O=>O.vm.config.strings.messagePrivacyLabel}
          </span>
        </cib-message-header>
      </div>`)}
    ${OnceDirective_once((O=>O.vm),(O=>O.getViewTemplate(O.vm)))}
    ${when((O=>{var B,U;return((null===(B=O.layout)||void 0===B?void 0:B.serpSlot)!==jy.None||!O.vm.config.features.enableMaxTurnsPerConversation||!O.vm.config.messaging.maxTurnsPerConversation)&&O.vm.type===vp.Text&&O.vm.author===Yi.Bot&&(null===(U=O.vm.attributions)||void 0===U?void 0:U.length)}),html`<div class="content footer">
        <cib-message-attributions
          :vm=${O=>O.vm}
          :layout=${O=>O.layout}
          :attributionCount=${O=>O.vm.attributions.length}
        ></cib-message-attributions>
      </div>`)}
    ${when((O=>{var B,U;return(null===(B=O.layout)||void 0===B?void 0:B.serpSlot)===jy.None&&!O.isEmptyMessage&&O.vm.config.features.enableMaxTurnsPerConversation&&O.vm.config.messaging.maxTurnsPerConversation&&O.vm.type===vp.Text&&O.vm.author===Yi.Bot&&((null===(U=O.vm.attributions)||void 0===U?void 0:U.length)||O.vm.turnCounter.currentTurnIndex>0)}),html`<div class="content footer">
        <cib-message-attributions
          :vm=${O=>O.vm}
          :layout=${O=>O.layout}
          :attributionCount=${O=>O.vm.attributions.length}
        ></cib-message-attributions>
        ${when((O=>{var B;return(null===(B=O.layout)||void 0===B?void 0:B.serpSlot)===jy.None&&!O.isEmptyMessage&&O.vm.turnCounter.currentTurnIndex<=O.vm.config.messaging.maxTurnsPerConversation&&O.vm.turnCounter.currentTurnIndex>0}),html`<cib-turn-counter :vm=${O=>O.vm.turnCounter}></cib-turn-counter>`)}
      </div>`)}
    ${when((O=>O.vm.shouldRenderCopyOutside&&O.vm.shouldRenderFeedback),html`
        <div class="sidebar" role="group">
          <cib-copy
            :vm=${O=>O.isTextMessageViewModel(O.vm)?O.vm.copy:null}
            :location=${O=>Ny.Sidebar}
          ></cib-copy>
        </div>
      `)}
    ${when((O=>O.shouldRenderFeedback),html`
        <cib-feedback
          :layout=${O=>O.layout}
          :vm=${O=>O.vm.type!==vp.Meta&&O.vm.type!==vp.Context?O.vm.feedback:null}
          :messageEl=${O=>O.messageEl}
        ></cib-feedback>
      `)}
    ${when((O=>O.shouldRenderFeedback&&O.isTextMessageViewModel(O.vm)&&O.vm.feedback.hasSelectedFeedback),html` <cib-reactions :vm=${O=>O.vm}></cib-reactions> `)}
  </template>
`;let hw=class extends St{constructor(){super(...arguments),this.shouldAnimate=!0,this.focused=!1,this.isEmptyMessage=!1,this.handleMouseEnter=()=>{var O;this.vm.config.features.enableFeedbackInstrumentation&&this.shouldRenderFeedback&&this.vm.telemetry.trackEvent("InteractionEvent","CibMessageHandleMouseEnter",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)})},this.handleFocusIn=()=>{var O;this.vm.config.features.enableFeedbackInstrumentation&&this.shouldRenderFeedback&&this.vm.telemetry.trackEvent("InteractionEvent","CibMessageHandleFocusIn",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}),this.focused=!0},this.handleFocusOut=()=>{this.focused=!1},this.handleGiveFeedbackClick=O=>{var B,U;this.vm.type===vp.Text?(null===(U=this.vm.telemetry)||void 0===U||U.trackInteractionEvent(O),this.vm.openFeedbackForm()):null===(B=this.vm.log)||void 0===B||B.warn(this,this.handleGiveFeedbackClick,"Message type not text but has been clicked").write()},this.handleReportConcernClick=O=>{var B;null===(B=this.vm.telemetry)||void 0===B||B.trackInteractionEvent(O)},this.handleAnchorMouseDown=O=>{O.stopPropagation(),this.vm.type===vp.Text&&this.vm.telemetry.trackInteractionEvent(O)}}get messageEl(){return this.textScreenshotTarget}get shouldRenderFeedback(){return this.vm.config.features.enableFeedbackOnFinalized?this.vm.shouldRenderFeedback:this.vm.author===Yi.Bot&&this.vm.type!==vp.Meta&&this.vm.type===vp.Text&&this.vm.reportable}get shouldRenderPrivacyHeader(){return this.vm.config.bingAtWork.isEnabled&&this.vm.author===Yi.Bot&&this.vm.type===vp.Text}get screenshotTarget(){return this.contentDiv||this.textScreenshotTarget}connectedCallback(){var O;super.connectedCallback(),null===(O=this.vm.log)||void 0===O||O.trace(this,this.connectedCallback,"connected").write(),this.shouldAnimate=!0,this.disposer=new Disposer,this.disposer.register(addDisposableListener(this,"animationend",this.onAnimationEnd)),this.vm.isModelFinalized?this.finalizeRendering():this.subscribeToViewModelChanges()}disconnectedCallback(){var O,B;!1===(null===(O=this.disposer)||void 0===O?void 0:O.isDisposed)&&(this.disposer.dispose(),delete this.disposer),super.disconnectedCallback(),null===(B=this.vm.log)||void 0===B||B.trace(this,this.disconnectedCallback,"disconnected").write()}areAttributionsPresent(){return!(this.vm.type!==vp.Text||this.vm.author!==Yi.Bot||!this.vm.attributions.length)}getViewTemplate(O){var B,U,G;null===(B=O.log)||void 0===B||B.trace(this,this.getViewTemplate,`type: '${O.type}'; serp-slot: '${null!==(G=null===(U=this.layout)||void 0===U?void 0:U.serpSlot)&&void 0!==G?G:"none"}'`).write();let q=pw;if(this.shouldShowEmptyViewTemplate(O))return this.isEmptyMessage=!0,ZT;switch(O.type){case vp.Text:"$$$>SLOTTED<$$$"!==O.text&&(q=this.getTextMessageTemplate(O));break;case vp.Host:q=this.getHostMessageTemplate(O);break;case vp.Meta:q=this.getMetaMessageTemplate(O);break;case vp.Context:q=this.getContextMessageTemplate(O);break;case vp.ExternalHTML:q=XT;break;case vp.FullBleed:q=JT}return q}tryTargetHoverCard(O){var B;this.vm.isModelFinalized&&this.isHoverCardTarget(O)&&(null===(B=this.vm.hoverCard)||void 0===B||B.setTarget(O))}getAriaLiveText(O){return this.vm.isModelFinalized?O.replace(/\[\^\d+\^\]/g,""):""}isTextMessageViewModel(O){return this.vm.type===vp.Text}onAnimationEnd(){this.shouldAnimate=!1}shouldShowEmptyViewTemplate(O){if((null==O?void 0:O.author)!==Yi.Bot)return!1;switch(O.type){case vp.Text:const B=O;return""===(null==B?void 0:B.text)&&B.displayMode!==Ty.AdaptiveCard;case vp.Host:return!1;case vp.Meta:const U=O;return""===(null==U?void 0:U.metaTextHtml);case vp.ExternalHTML:const G=O;return""===(null==G?void 0:G.htmlString);case vp.FullBleed:const q=O;return""===(null==q?void 0:q.htmlString);default:return!1}}getContextMessageTemplate(O){var B;if(null===(B=O.log)||void 0===B||B.trace(this,this.getContextMessageTemplate,`context message content: ${O.contextType}`).write(),O.contextType===Zi.WebPage)return dw}getTextMessageTemplate(O){var B;switch(null===(B=O.log)||void 0===B||B.trace(this,this.getTextMessageTemplate,`text content: ${Ty[O.displayMode]}`).write(),O.displayMode){case Ty.FateOverride:return ew;case Ty.AdaptiveCard:return tw;case Ty.Text:return rw}}getMetaMessageTemplate(O){return O.disableIcon?ow:nw}getHostMessageTemplate(O){var B;switch(null===(B=O.log)||void 0===B||B.trace(this,this.getHostMessageTemplate,`hosted content: ${O.contentType}`).write(),O.contentType){case bp.Ads:case bp.ImageContentCreator:case bp.Answer:return O.isSandboxedIframe?cw:lw;case bp.SemSerp:return aw;case bp.Captcha:return sw}}subscribeToViewModelChanges(){var O,B,U;this.subscriberDisposer=new Disposer,null===(O=this.disposer)||void 0===O||O.register((()=>this.disposeSubscriber()));const G={handleChange:(O,B)=>{O===this.vm&&"isModelFinalized"===B&&this.vm.isModelFinalized&&this.handleViewModelFinalized()}};this.finalizedNotifier=pt.getNotifier(this.vm),this.finalizedNotifier.subscribe(G),null===(B=this.subscriberDisposer)||void 0===B||B.register((()=>this.finalizedNotifier.unsubscribe(G))),null===(U=this.vm.log)||void 0===U||U.trace(this,this.subscribeToViewModelChanges,"subscribed").write()}handleViewModelFinalized(){var O;null===(O=this.vm.log)||void 0===O||O.trace(this,this.handleViewModelFinalized,"isModelFinalized:",this.vm.isModelFinalized).write(),this.finalizeRendering(),queueMicrotask((()=>this.disposeSubscriber()))}disposeSubscriber(){var O,B;!1===(null===(O=this.subscriberDisposer)||void 0===O?void 0:O.isDisposed)&&(this.subscriberDisposer.dispose(),delete this.subscriberDisposer,null===(B=this.vm.log)||void 0===B||B.trace(this,this.disposeSubscriber,"DISPOSED: isModelFinalized subscriber").write())}finalizeRendering(){this.instrumentAdaptiveCardLinks(),this.fireMessageTelemetry(),this.tryRenderInlineAds(),this.vm.config.features.enableUpdateInternalLinksToOpenOnEdge&&this.updateInternalLinksToOpenOnEdge(),this.instrumentCodeMessage()}instrumentCodeMessage(){var O,B,U,G,q;(null===(B=null===(O=this.contentDiv)||void 0===O?void 0:O.querySelectorAll("code"))||void 0===B?void 0:B.length)&&(null===(G=null===(U=this.contentDiv)||void 0===U?void 0:U.querySelectorAll("code"))||void 0===G?void 0:G.length)>0&&this.vm.telemetry.trackEvent("MessageEvent","CodeResponseShow",{Namespace:jy.toTelemetryNamespace(null===(q=this.layout)||void 0===q?void 0:q.serpSlot)})}updateInternalLinksToOpenOnEdge(){var O,B;null===(B=null===(O=this.contentDiv)||void 0===O?void 0:O.querySelectorAll("a[h]"))||void 0===B||B.forEach((O=>{if("A"===O.nodeName&&O.hasAttribute("h")){const B=O;(B.href.startsWith("https://aka.ms")||B.href.startsWith("https://dev.azure.com"))&&(B.href="microsoft-edge://"+B.href.substring("https://".length))}}))}instrumentAdaptiveCardLinks(){var O,B,U;null===(O=this.vm.log)||void 0===O||O.trace(this,this.instrumentAdaptiveCardLinks,"contentDiv:",this.contentDiv).write(),this.vm.telemetry.externalLinkId&&(null===(U=null===(B=this.contentDiv)||void 0===B?void 0:B.querySelectorAll("*"))||void 0===U||U.forEach((O=>{if("A"===O.nodeName&&O.hasAttribute("h")){const B=O;this.addDisposableMouseDownListener(B)}})))}addDisposableMouseDownListener(O){var B;null===(B=this.disposer)||void 0===B||B.register(addDisposableListener(O,"mousedown",this.handleAnchorMouseDown))}fireMessageTelemetry(){var O,B;(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)===jy.None&&this.vm.serp.inMode(Hy.OffStage)||this.vm.author!==Yi.Bot||this.vm.type!==vp.Text||(this.vm.telemetry.trackEvent("MessageEvent","BotResponseRender",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot),CustomData:JSON.stringify({length:this.vm.text.length,learnMoreCnt:this.vm.attributions.length,convId:this.vm.conversation.id,mid:this.vm.modelMessageId,turnId:this.vm.conversation.turnCount})}),this.vm.conversation.id&&this.vm.perfTracker.markEvent("LastTokenRender"))}tryRenderInlineAds(){window.setTimeout((()=>{var O;if(this.vm.type===vp.Text&&null!==this.vm.inlineAds&&this.contentDiv){const B=new RemoteContentHostViewHelper(this);B.createView(),B.bindView(this.vm.inlineAds);const U=this.contentDiv.querySelectorAll(".ac-horizontal-separator");if(U.length){const O=U.item(U.length-1);B.insertBefore(O)}null===(O=this.disposer)||void 0===O||O.register(B)}}),100)}isHoverCardTarget(O){const{tooltip:B,citation:U}=this.vm.classNames;return function(O){return function(O){return null!==O}(O)&&void 0!==O.nodeType}(G=O)&&"A"===G.nodeName&&(O.classList.contains(B)||O.classList.contains(U));var G}};__decorate([observable,__metadata("design:type",Object)],hw.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],hw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],hw.prototype,"contentDiv",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],hw.prototype,"textScreenshotTarget",void 0),__decorate([observable,__metadata("design:type",Boolean)],hw.prototype,"shouldAnimate",void 0),__decorate([observable,__metadata("design:type",Boolean)],hw.prototype,"focused",void 0),__decorate([observable,__metadata("design:type",Boolean)],hw.prototype,"isEmptyMessage",void 0),hw=__decorate([customElement({name:"cib-message",template:uw,styles:Kx})],hw);const mw=html`
  ${when((O=>{var B;return null===(B=O.shoppingPdpRenderData)||void 0===B?void 0:B.groundingTextVm}),html`
      <cib-message :vm=${O=>O.shoppingPdpRenderData.groundingTextVm} :layout=${O=>O.layout}></cib-message>
    `)}
  <cib-message :vm=${O=>O.shoppingPdpRenderData.emptyVm} :layout=${O=>O.layout} type="host" content="answer">
    ${OnceDirective_once((O=>O.shoppingPdpRenderData.contentHostData),Yx)}
  </cib-message>
`,gw=html`
  ${when((O=>O.type===vp.Host&&O.contentType===bp.Answer&&O.mmStaticMessage&&O.config.features.enableMMStaticMessage),html`
  <cib-message :vm=${O=>O.mmStaticMessage.mmStaticMessageVm} :layout=${O=>O.layout}></cib-message>
`)}
  <cib-message :vm=${O=>O} :layout=${(O,B)=>B.parent.layout}></cib-message>
  ${when((O=>O.type===vp.Host&&O.contentType===bp.Answer&&O.shoppingPdpRenderData),mw)}
`,fw=html`
  ${when((O=>O.vm.showSerpSlotMetaMessage),html`${OnceDirective_once((O=>O.vm.serpSlotLastMetaMessage),gw)}`)}
  ${when((O=>O.vm.serpSlotFirstTextMessage),html`${OnceDirective_once((O=>O.vm.serpSlotFirstTextMessage),gw)}`)}
`,yw=html`
  ${repeat((O=>O.vm.messages),gw,{recycle:!1})}
`,_w=html`
  <template
    ?expanded=${O=>O.vm.isExpanded}
    source=${O=>O.vm.source}
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    serp-slot=${O=>{var B;return null!==(B=O.layout.serpSlot)&&void 0!==B?B:jy.None}}
  >
    ${when((O=>{var B;return 0===(null===(B=O.slotContents)||void 0===B?void 0:B.length)}),html`
        ${when((O=>O.layout.serpSlot!==jy.None),fw)}
        ${when((O=>O.layout.serpSlot===jy.None),yw)}
      `)}
    <slot ${slotted("slotContents")}> </slot>
  </template>
`;let vw=class extends St{constructor(){super(...arguments),this.expanded=!1,this.source=Yi.User}};__decorate([observable,__metadata("design:type",Object)],vw.prototype,"vm",void 0),__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],vw.prototype,"expanded",void 0),__decorate([attr,__metadata("design:type",String)],vw.prototype,"source",void 0),__decorate([observable,__metadata("design:type",Object)],vw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Array)],vw.prototype,"slotContents",void 0),vw=__decorate([customElement({name:"cib-message-group",template:_w,styles:Wx})],vw);const bw=html`
  <template ?expanded=${O=>O.vm.isExpanded} serp-slot=${O=>{var B;return null!==(B=O.layout.serpSlot)&&void 0!==B?B:jy.None}}>
    ${when((O=>{var B;return 0===(null===(B=O.slotContents)||void 0===B?void 0:B.length)}),html`
        ${when((O=>O.vm.notificationText),html`
  <div class="notifications">
    <div class="notification-container">
      <div class="notification-content">
        <svg-icon type=${lE.Warning}></svg-icon> ${O=>O.vm.notificationText}
      </div>
    </div>
  </div>
`)}
        ${when((O=>O.vm.user.messageCount>0),html`<cib-message-group :vm=${O=>O.vm.user} :layout=${O=>O.layout}></cib-message-group>`)}
        ${when((O=>O.vm.bot.messageCount>0),html`<cib-message-group
            class="response-message-group"
            :vm=${O=>O.vm.bot}
            :layout=${O=>O.layout}
          ></cib-message-group>`)}
      `)}
    <slot ${slotted("slotContents")}> </slot>
  </template>
`;let Sw=class extends St{};__decorate([observable,__metadata("design:type",Object)],Sw.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],Sw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Array)],Sw.prototype,"slotContents",void 0),Sw=__decorate([customElement({name:"cib-chat-turn",template:bw,styles:jx})],Sw);const Cw=css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    row-gap: 100%;
    height: 32px;
    min-height: 32px;
    padding: 24px 32px 16px;
    margin-bottom: 8px;
  }

  .suggestion-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex-flow: wrap;
    column-gap: 8px;
    row-gap: 100%;
    order: 1;
    height: 34px;
    padding-left: 2px;
    overflow-y: hidden;
  }

  :host(:not([serp-slot=${jy.RightRail}])) .suggestion-item.wrapped {
    display: none;
  }

  /* RAI BUTTON */
  .rai-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .rai-button svg-icon {
    width: 26px;
    height: 26px;
    fill: ${tb.theme.brandColors.foreground.colorBrandTertiaryForeground};
  }

  .rai-button:hover {
    box-shadow: none;
  }

  /* CHAT BUTTON */

  .chat-button {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 6px;
    order: 1;
    height: 34px;
    min-width: fit-content;
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    border-radius: 20px;
    border: none;
    outline: 1px solid transparent;
    margin: 0px;
    padding: 7px 16px 7px 12px;
    cursor: pointer;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  .chat-button:focus-visible {
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]),
  :host([serp-slot=${jy.RightRail}]) {
    margin-top: 26px;
    border-top: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    padding: 16px 16px 8px;
  }

  :host([serp-slot=${jy.Creator}]),
  :host([serp-slot=${jy.Pole}]) {
    justify-content: center;
  }

  :host([serp-slot=${jy.RightRail}]) {
    height: unset;
    overflow: visible;
    flex-flow: wrap;
    justify-content: flex-start;
    gap: 8px;
  }

  :host([serp-slot=${jy.RightRail}])::-webkit-scrollbar {
    display: none;
  }

  :host([serp-slot=${jy.RightRail}]) .suggestion-items {
    display: contents;
  }

  :host([serp-slot=${jy.Creator}]) .chat-button,
  :host([serp-slot=${jy.Pole}]) .chat-button,
  :host([serp-slot=${jy.RightRail}]) .chat-button {
    display: flex;
  }

  /* VISIBILITY */

  :host([serp-slot=${jy.Creator}][visible="false"]),
  :host([serp-slot=${jy.Pole}][visible="false"]),
  :host([serp-slot=${jy.RightRail}][visible="false"]) {
    margin: 0;
    padding: 0;
    height: 24px;
    min-height: 0px;
    opacity: 0;
    pointer-events: none;
  }

  :host([serp-slot=${jy.Creator}]:not([divider])),
  :host([serp-slot=${jy.Pole}]:not([divider])),
  :host([serp-slot=${jy.RightRail}]:not([divider])) {
    margin-top: 0;
    border: none;
  }

  /* MOBILE */

  :host([mobile]) {
    flex-flow: unset;
    justify-content: flex-start;
    overflow-y: hidden;
    overflow-x: overlay;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    height: 44px;
  }

  :host([mobile])::-webkit-scrollbar {
    display: none;
  }

  /* HOVER */

  @media (hover: hover) {
    button:hover {
      box-shadow: ${tb.theme.shadows.defaults.cardRaised};
    }
  }

  button:active {
    box-shadow: unset;
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    :host {
      padding-left: 16px;
      padding-right: 16px;
      flex-flow: wrap;
      gap: 8px;
      height: unset;
    }

    :host .suggestion-items {
      display: contents;
    }
  }

  @media (max-width: 600px) {
    :host([serp-slot=${jy.Pole}]) {
      justify-content: flex-start;
    }
  }

  /* PRODUCT TYPE */

  :host([product-type=${Mb.Shoreline}]) {
    margin-bottom: 0;
    padding-bottom: 8px;
  }
`.withBehaviors(tE(css`
    .chat-button {
      forced-color-adjust: none;
      color: ${iE.ButtonFace};
      background: ${iE.ButtonText};
    }

    .chat-button:focus-visible {
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
      outline: 2px solid ${iE.Highlight};
    }
  `)),Ew=css`
  :host {
    order: 1;
    max-width: -webkit-fill-available;
  }

  :host([mobile]) {
    min-width: max-content;
    max-width: unset;
  }

  .container {
    height: 30px;
    min-width: max-content;
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackground};
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 12px;
    margin: 1px;
    cursor: pointer;
    line-height: 28px;
    border: 1px solid ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  .container[primary] {
    height: 40px;
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
    border: none;
  }

  .container[highlight] {
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.gradientColors.core};
  }
  
  .container:hover,
  .container:focus {
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundHover};
    border-color: ${tb.theme.brandColors.stroke.colorBrandSecondaryStrokeHover};
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForegroundHover};
  }

  .container:active,
  .container.touch-active {
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackgroundPressed};
    border-color: ${tb.theme.brandColors.stroke.colorBrandSecondaryStrokePressed};
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForegroundPressed};
  }

  .container:not([mobile]) {
    width: min-content;
    min-width: unset;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  @media (max-width: 767px) {
    .container {
      width: fit-content;
    }
  }
`.withBehaviors(tE(css`
    .container {
      color: ${iE.ButtonText};
      outline-color: ${iE.ButtonText};
    }

    .container:hover,
    .container:focus-visible {
      forced-color-adjust: none;
      background: ${iE.Highlight};
      color: ${iE.HighlightText};
      border-color: ${iE.Highlight};
      outline-color: ${iE.Highlight};
    }
  `)),xw=html`
  <button class="container" type="button" serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}} ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}} ?highlight=${O=>{var B,U;return(null===(U=null===(B=O.suggestion)||void 0===B?void 0:B.action)||void 0===U?void 0:U.toLocaleLowerCase())==="Highlight".toLocaleLowerCase()}}>
    <slot></slot>
    ${O=>{var B;return null===(B=O.suggestion)||void 0===B?void 0:B.text}}
  </button>
`;let Tw=class extends St{constructor(){super(...arguments),this.isPrimary=!1,this.highlight=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("touchstart",this.onTouchStart),this.addEventListener("touchend",this.onTouchEnd),this.addEventListener("touchmove",this.onTouchMove)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("touchstart",this.onTouchStart),this.removeEventListener("touchend",this.onTouchEnd),this.removeEventListener("touchmove",this.onTouchMove)}onTouchStart(){this.classList.toggle("touch-active",!0)}onTouchMove(){this.classList.toggle("touch-active",!1)}onTouchEnd(){this.classList.toggle("touch-active",!1)}};__decorate([attr({attribute:"primary",mode:"boolean"}),__metadata("design:type",Boolean)],Tw.prototype,"isPrimary",void 0),__decorate([observable,__metadata("design:type",Object)],Tw.prototype,"suggestion",void 0),__decorate([observable,__metadata("design:type",Object)],Tw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],Tw.prototype,"highlight",void 0),Tw=__decorate([customElement({name:"cib-suggestion-item",template:xw,styles:Ew})],Tw);const ww=html`
  <cib-suggestion-item
    class="suggestion-item"
    @click=${(O,B)=>B.parent.handleSuggestionClick(B.event)}
    :suggestion=${O=>O}
    ?highlight=${O=>{var B;return(null===(B=O.action)||void 0===B?void 0:B.toLocaleLowerCase())==="Highlight".toLocaleLowerCase()}}
    :layout=${(O,B)=>B.parent.layout}
    ?mobile=${(O,B)=>{var U;return null===(U=B.parent.layout)||void 0===U?void 0:U.isMobile}}
  >
  </cib-suggestion-item>
`,kw=html`
  <button
    @click=${(O,B)=>O.handleQuestionClick(B.event)}
    class="rai-button"
    type="button"
    aria-label=${O=>O.vm.strings.raiSuggestionsButtonAriaLabel}
  >
    ${when((O=>!O.vm.shouldShowRAISuggestions),html`<svg-icon type=${lE.ChatHelp} size="24"></svg-icon>`)}
    ${when((O=>O.vm.shouldShowRAISuggestions),html`<svg-icon type=${lE.ChatDismissFill} size="24"></svg-icon>`)}
  </button>
`,Aw=html`
  ${repeat((O=>O.freSuggestions),ww,{recycle:!1})}
`,Rw=html`
  <div class="suggestion-items" ${ref("suggestionItemsRef")}>
    ${when((O=>O.shouldShowRaiIcon),kw)}
    ${when((O=>!O.vm.shouldShowRAISuggestions),Aw)}
    ${repeat((O=>O.suggestions),ww,{recycle:!1})}
  </div>
`,Iw=html`
  <button
    @click=${O=>O.handleChatButtonClick()}
    class="chat-button"
    type="button"
    aria-label=${O=>O.vm.strings.letsChatButton}
  >
    <svg-icon type=${lE.Chat} size="20"></svg-icon>
    <span>${O=>O.vm.strings.letsChatButton}</span>
  </button>
`,Pw=html`
  <template
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    serp-slot=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.serpSlot}}
    product-type=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.productType}}
    ?see-more-covering=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isSeeMoreCovering}}
    ?see-more-expanded=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isSeeMoreExpanded}}
    ?divider=${O=>O.suggestions.length>0}
  >
    ${when((O=>O.suggestions.length>0),Rw)}
    ${when((O=>O.visible),Iw)}
  </template>
`;let Nw=class extends St{constructor(){super(...arguments),this.visible=!0,this.shouldShowRaiIcon=!0,this.suggestionArray=[],this.resizeObserver=null,this._renderedSuggestions=null,this.onResize=()=>{this.assignRows()},this.assignRows=()=>{if(this.suggestionItemsRef){let O=0;for(let B=0;B<this.suggestionItemsRef.children.length;B++){const U=this.suggestionItemsRef.children[B];U.classList.toggle("wrapped",!1);const G=U.previousElementSibling;(!G||U.offsetLeft<G.offsetLeft)&&O++,U.classList.toggle("wrapped",O>1)}}},this.handleSuggestionClick=O=>{var B;const U=O.target;return this.vm.closeRAISuggestions(),this.vm.clearFreSuggesitons(),this.vm.telemetry.trackEvent("InteractionEvent","SuggestionChipClick",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot),CustomData:JSON.stringify({text:this.vm.telemetry.getComplianceSafeMessage(U.suggestion.text),position:this.vm.suggestions.indexOf(U.suggestion),convId:this.vm.convId,rid:this.vm.suggestionRequestId,mid:this.vm.suggestionMessageId,turnId:this.vm.turnCount})}),this.vm.telemetry.trackInteractionEvent(O),this.vm.serp.invokeSuggestion(U.suggestion),!0},this.handleChatButtonClick=()=>{this.vm.serp.invokeSuggestion(null)}}connectedCallback(){super.connectedCallback(),this.suggestionItemsRef&&(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.observe(this.suggestionItemsRef)),this.assignRows()}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.resizeObserver)||void 0===O||O.unobserve(this.suggestionItemsRef)}get suggestions(){var O,B;if(this.shouldShowRaiIcon=!0,this.vm.shouldShowRAISuggestions)return this.vm.raiSuggestions;if(this.$fastController.isConnected){if(this._serpSlotSuggestions&&this.layout&&this.layout.serpSlot!==jy.None)return this._serpSlotSuggestions;if(this.visible=!1,!this.vm.isRequestPending){if(this.visible=!0,this.vm.suggestions.length>0)return this._serpSlotSuggestions||(this._serpSlotSuggestions=this.vm.suggestions.slice()),this._renderedSuggestions===this.vm.suggestions||(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)===jy.None&&this.vm.serp.inMode(Hy.OffStage)||(this.vm.telemetry.trackEvent("SystemEvent","SuggestionChipRender",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot),CustomData:JSON.stringify({chips:this.vm.telemetry.getComplianceSafeMessage(this.vm.suggestions.map((O=>O.text))),convId:this.vm.convId,rid:this.vm.suggestionRequestId,mid:this.vm.suggestionMessageId,turnId:this.vm.turnCount})}),this._renderedSuggestions=this.vm.suggestions),this.vm.suggestions;if(!this.vm.shouldShowRAISuggestions)return this.shouldShowRaiIcon=!1,this.vm.raiSuggestions}}return this.suggestionArray}async handleQuestionClick(O){this.vm.telemetry.trackEvent("InteractionEvent","QuestionClick"),this.vm.telemetry.trackInteractionEvent(O),this.vm.shouldShowRAISuggestions?this.vm.closeRAISuggestions():this.vm.openRAISuggestions()}get freSuggestions(){return this.vm.freSuggestions}};__decorate([attr,__metadata("design:type",Boolean)],Nw.prototype,"visible",void 0),__decorate([observable,__metadata("design:type",Object)],Nw.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],Nw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],Nw.prototype,"shouldShowRaiIcon",void 0),__decorate([observable_volatile,__metadata("design:type",Array),__metadata("design:paramtypes",[])],Nw.prototype,"suggestions",null),__decorate([observable_volatile,__metadata("design:type",Array),__metadata("design:paramtypes",[])],Nw.prototype,"freSuggestions",null),Nw=__decorate([customElement({name:"cib-suggestion-bar",template:Pw,styles:Cw})],Nw);const Ow=css`
  :host {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    padding: 24px 0;
  }

  .learn-tog-item {
    font-style: normal;
    font-weight: 400;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    text-align: center;
    padding: 50px 50px 0;
    max-width: 70vw;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.message.fontSize};
    line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
  }

  .feedback-form {
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
    cursor: pointer;
  }

  .feedback-form:hover,
  .feedback-form:focus {
    text-decoration: underline;
  }

  .container-logo {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }

  .container-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .container-title {
    font-weight: 600;
    text-align: center;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    margin-bottom: 8px;
    font-size: 36px;
    font-family: ${tb.platform.typography.fonts.text};
  }

  .container-subTitle {
    font-weight: 400;
    margin-bottom: 4vh;
    font-size: ${tb.platform.typography.typeRamp.message.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle1.lineHeight};
    text-align: center;
    font-family: ${tb.platform.typography.fonts.text};
  }

  .privacy-statement {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .privacy-statement a {
    padding: 2px 8px;
    font-style: normal;
    text-decoration: none;
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1.fontVariationSettings};
    font-size: ${tb.platform.typography.typeRamp.caption1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1.lineHeight};
  }

  .privacy-statement a:hover,
  .privacy-statement a:active {
    text-decoration: underline;
  }

  .privacy-statement .privacy {
    border-inline-start: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .privacy-statement-muid {
    font-style: normal;
    font-weight: 400;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    text-align: center;
    padding: 30px 50px 0;
    max-width: 70vw;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.message.fontSize};
    line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
  }

  .get-started-button-wrapper {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  :host([product=${Mb.Shoreline}]) .get-started-button-wrapper {
    margin: 0 auto 0 auto;
  }

  .get-started-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 16px;
    gap: 6px;
    position: relative;
    height: 36px;
    width: 103px;
    border-radius: 20px;
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    fill: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
    border: none;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1Stronger.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
    cursor: pointer;
  }

  .mobile-container .get-started-button {
    font-family: unset;
  }

  /* PRODUCT TYPE */

  :host([product=${Mb.Shoreline}][bing-at-work]) .container-title {
    margin-bottom: 2px;
  }

  :host([product=${Mb.Shoreline}]) .container-title {
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.title2.lineHeight};
    font-weight: 500;
  }

  :host([product=${Mb.Shoreline}]) .container-subTitle {
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
  }

  :host([product=${Mb.Shoreline}]) {
    align-items: flex-start;
    justify-content: left;
    margin-bottom: 5vh;
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    .container-item {
      flex-direction: column;
    }

    .container-title {
      font-size: ${tb.platform.typography.typeRamp.title1.fontSize};
      line-height: ${tb.platform.typography.typeRamp.title1.lineHeight};
    }

    .welcome-container-subTitle {
      font-weight: 500;
      margin-bottom: 5vh;
      font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
      line-height: ${tb.platform.typography.typeRamp.subtitle1.lineHeight};
      text-align: center;
    }
  }

  /* PRODUCT TYPE */

  :host([product=${Mb.Shoreline}]) .container-title {
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.title2.lineHeight};
    font-weight: 500;
  }

  :host([product=${Mb.Shoreline}]) .container-subTitle {
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
  }

  :host([product=${Mb.Shoreline}]) {
    align-items: flex-start;
    justify-content: left;
    margin-bottom: 5vh;
  }

  .welcome-suggestion {
    flex-direction: column;
    display: flex;
    align-items: center;
    row-gap: 8px;
  }

  /* MOBILE */

  .mobile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .mobile-container .container-logo {
    margin-bottom: 0;
  }

  .mobile-title {
    font-size: ${tb.platform.typography.typeRamp.subtitle1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
    font-weight: 600;
    margin: 4vh 0;
  }

  .mobile-subTitle,
  .mobile-container .privacy-statement-muid {
    font-weight: 400;
    margin: 0 4vw 4px;
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .mobile-container .welcome-body {
    display: flex;
    flex-direction: column;
  }

  .mobile-container .privacy-statement {
    margin: 0 0 4vh;
    align-self: center;
  }

  .mobile-container .get-started-button-wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`,Mw=css`
  :host {
    flex-grow: 1;
    flex-basis: 0;
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 8px;
    background: transparent;
    border: none;
    font-family: ${tb.platform.typography.fonts.text};
  }

  :host([product=${Mb.Shoreline}]) .container {
    align-items: flex-start;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    border: 1.5px solid transparent;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
    width: 100%;
  }

  :host([product=${Mb.Shoreline}]) .item-content,
  :host([product=${Mb.Shoreline}]) .item-content::before {
    background: none;
  }

  :host([product=${Mb.Shoreline}][isclickable="true"]) .container:hover {
    border: 1.5px solid ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
  }

  :host([product=${Mb.Shoreline}][isclickable="true"]) .item-body {
    color: ${tb.theme.stealthColors.foreground.colorStealthPrimaryForeground};
  }

  .container:focus,
  .container:focus-visible,
  :host([product=${Mb.Shoreline}]) .container:focus-visible .item-content {
    border: none;
    outline: none;
  }

  :host([product=${Mb.Shoreline}]) .container:focus-visible,
  .container:focus-visible .item-content {
    outline: 2px solid ${tb.theme.neutralColors.stroke.colorNeutralStrokeFocus};
  }

  .item-title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    min-height: 52px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.message.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle1.lineHeight};
    font-family: ${tb.platform.typography.fonts.text};
  }

  :host([product=${Mb.Shoreline}]) .item-title {
    padding-left: 20px;
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: 4px;
    position: relative;
    height: 100%;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    border-radius: 6px;
    text-align: start;
    outline: 1px solid transparent;
    box-sizing: border-box;
    padding: 20px;
  }

  :host([product=${Mb.Shoreline}][bing-at-work]) .item-content {
    place-items: start;
  }

  :host([product=${Mb.Shoreline}]) .item-content {
    flex-direction: column;
  }

  :host([product=${Mb.Shoreline}]) .container {
    align-items: flex-start;
    border: 1.5px solid transparent;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
    width: 100%;
  }

  :host([isclickable="true"]) .item-content {
    cursor: pointer;
  }

  .item-content::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    border-radius: 6px;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  .item-body {
    font-weight: 400;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    align-items: center;
    display: flex;
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.message.lineHeight};
    font-family: ${tb.platform.typography.fonts.text};
  }

  .item-button {
    height: 24px;
    width: 24px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .container:hover .item-button,
  .container:focus .item-button,
  .container:focus-visible .item-button {
    color: "#174AE4";
    fill: "#174AE4";
  }

  :host([isclickable="true"]) .item-content:hover::before,
  :host([isclickable="true"]) .container:focus-visible .item-content::before {
    opacity: 1;
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    :host {
      width: 100%;
    }

    .container {
      gap: 4px;
    }

    .item-title {
      min-height: 44px;
      font-weight: 500;
      font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
      line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
    }

    :host([product=${Mb.Shoreline}]) .item-title {
      padding-left: 16px;
    }

    .item-body {
      font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
      line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    }

    .item-content {
      justify-content: center;
      width: 100%;
      padding: 16px;
      min-height: 4vh;
    }
  }

  :host([product=${Mb.Shoreline}]) .item-content {
    padding-top: 0;
  }
`.withBehaviors(tE(css`
    :host .container[disabled],
    :host .container[disabled] .item-title,
    :host .container[disabled] .item-body {
      color: ${iE.CanvasText};
    }

    :host([isclickable="true"]) .item-content:hover,
    :host([isclickable="true"]) .container:focus-visible .item-content {
      background: ${iE.Highlight};
      outline-color: ${iE.Highlight};
    }

    :host([isclickable="true"]) .item-content:hover .item-body,
    :host([isclickable="true"]) .container:focus-visible .item-body {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
    }
  `)),Dw=html`
  <button class="container" type="button">
    <div class="item-title">${O=>O.header}</div>
    <div class="item-content">${html`
  <div class="item-body">
    ${when((O=>O.isClickable),html`"${O=>O.body}"`)}
    ${when((O=>!O.isClickable),html`${O=>O.body}`)}
  </div>
`}</div>
  </button>
`;let Lw=class extends St{constructor(){super(...arguments),this.isClickable=!0}};var Bw;__decorate([observable,__metadata("design:type",String)],Lw.prototype,"header",void 0),__decorate([observable,__metadata("design:type",String)],Lw.prototype,"body",void 0),__decorate([attr,__metadata("design:type",String)],Lw.prototype,"product",void 0),__decorate([attr,__metadata("design:type",Boolean)],Lw.prototype,"isClickable",void 0),Lw=__decorate([customElement({name:"cib-welcome-item",template:Dw,styles:Mw})],Lw),function(O){O.CibLogo12="cib-logo-12",O.CibLogo16="cib-logo-16",O.CibLogo20="cib-logo-20",O.CibLogo24="cib-logo-24",O.CibLogo32="cib-logo-32",O.CibLogo36="cib-logo-36",O.CibLogo40="cib-logo-40",O.CibLogo48="cib-logo-48",O.CibLogo56="cib-logo-56",O.CibLogoWithBubble12="cib-logo-with-bubble-12",O.CibLogoWithBubble16="cib-logo-with-bubble-16",O.CibLogoWithBubble20="cib-logo-with-bubble-20",O.CibLogoWithBubble24="cib-logo-with-bubble-24",O.CibLogoWithBubble32="cib-logo-with-bubble-32",O.CibLogoWithBubble36="cib-logo-with-bubble-36",O.CibLogoWithBubble40="cib-logo-with-bubble-40",O.CibLogoWithBubble48="cib-logo-with-bubble-48",O.CibLogoWithBubble56="cib-logo-with-bubble-56"}(Bw||(Bw={}));const Fw=css`
  :host {
    --icon-size: 32px;
    display: flex;
    align-items: center;
    justify-items: center;
    position: relative;
    height: var(--icon-size);
    width: var(--icon-size);
  }

  .icon {
    display: flex;
  }
`,zw=html` ${O=>html` <div class="icon">${O.svg}</div>`} `;class CibLogoIcons{constructor(){}}CibLogoIcons.CibLogo12='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2231)">\n\t<path d="M9.99959 7.71144C9.99959 7.82833 9.99326 7.94455 9.98059 8.05909C9.90526 8.75774 9.60393 9.3895 9.15026 9.87812C9.20743 9.81441 9.25893 9.74602 9.3041 9.67278C9.33893 9.61709 9.36993 9.55907 9.3961 9.49853C9.4056 9.47863 9.41426 9.4579 9.42143 9.43733C9.4301 9.41743 9.43726 9.3967 9.4436 9.37613C9.45076 9.35706 9.4571 9.33716 9.4626 9.31726C9.4681 9.29653 9.47376 9.27596 9.47843 9.25523C9.47926 9.25289 9.4801 9.25038 9.48076 9.24803C9.4856 9.2273 9.48943 9.20673 9.49343 9.186C9.49743 9.16459 9.50143 9.14302 9.5046 9.12162C9.5046 9.12078 9.5046 9.12078 9.5046 9.12011C9.50776 9.10021 9.5101 9.08031 9.51176 9.05958C9.5166 9.01259 9.51893 8.96577 9.51893 8.91794C9.51893 8.64905 9.4451 8.39671 9.31593 8.182C9.2866 8.13183 9.2541 8.08418 9.21843 8.03886C9.17643 7.98468 9.13126 7.93385 9.0821 7.88686C8.95993 7.7683 8.81727 7.67114 8.65943 7.60275C8.59127 7.57248 8.51993 7.5479 8.44694 7.5295C8.4461 7.5295 8.4446 7.52867 8.44377 7.52867L8.41844 7.51997L8.04894 7.39272V7.39188L7.08228 7.05844C7.07911 7.05761 7.07511 7.05761 7.07278 7.05694L7.01244 7.0347C6.81811 6.95828 6.65711 6.81514 6.55645 6.63286L6.20361 5.7297L5.79912 4.69528L5.72145 4.49561L5.70162 4.45498C5.67945 4.4008 5.66745 4.34194 5.66745 4.28073C5.66745 4.26485 5.66745 4.24896 5.66912 4.23458C5.69212 4.00699 5.88478 3.82874 6.11795 3.82874C6.17978 3.82874 6.23928 3.84144 6.29328 3.86452L8.0946 4.79126L8.44994 4.97353C8.63793 5.08574 8.8131 5.21784 8.97327 5.36667C9.55376 5.90144 9.93443 6.65092 9.99159 7.48887C9.99643 7.56278 9.99959 7.63669 9.99959 7.71144Z" fill="url(#paint0_linear_36_2231)"/>\n\t<path d="M9.51822 8.9177C9.51822 9.01 9.50955 9.09913 9.49355 9.18592C9.48872 9.209 9.48405 9.23207 9.47855 9.25515C9.46822 9.29645 9.45722 9.33625 9.44372 9.37605C9.43655 9.39679 9.42939 9.41735 9.42155 9.43725C9.41355 9.45799 9.40489 9.47789 9.39622 9.49846C9.37005 9.55899 9.33905 9.61702 9.30422 9.6727C9.25905 9.74594 9.20739 9.81434 9.15039 9.87805C8.88789 10.1693 7.99639 10.6887 7.66789 10.8998L6.93857 11.3469C6.40423 11.6773 5.8989 11.9111 5.26207 11.927C5.23191 11.9278 5.20257 11.9287 5.17324 11.9287C5.13208 11.9287 5.09158 11.9278 5.05108 11.9263C3.97258 11.885 3.03192 11.3041 2.48959 10.4456C2.24142 10.0533 2.07726 9.60297 2.02176 9.1192C2.13826 9.78039 2.71259 10.2817 3.40492 10.2817C3.64758 10.2817 3.87525 10.2205 4.07425 10.1122C4.07575 10.1113 4.07741 10.1105 4.07908 10.1098L4.15041 10.0668L4.44075 9.89494L4.81024 9.67538V9.66501L4.85791 9.63641L8.16423 7.67107L8.41872 7.5199L8.44406 7.52859C8.44489 7.52859 8.44639 7.52943 8.44722 7.52943C8.52022 7.54766 8.59156 7.57241 8.65972 7.60267C8.81755 7.67107 8.96022 7.76822 9.08239 7.88678C9.13155 7.93377 9.17672 7.9846 9.21872 8.03878C9.25439 8.0841 9.28689 8.13193 9.31622 8.18193C9.44439 8.39647 9.51822 8.64881 9.51822 8.9177Z" fill="url(#paint1_linear_36_2231)"/>\n\t<path d="M4.81109 2.35883L4.80992 9.67508L4.44042 9.89481L4.14992 10.0665L4.07842 10.11C4.07726 10.11 4.07509 10.1112 4.07409 10.1122C3.87476 10.2199 3.64709 10.2819 3.40426 10.2819C2.71177 10.2819 2.13844 9.7806 2.02127 9.11941C2.01577 9.08897 2.0116 9.05737 2.00827 9.02694C2.00394 8.96924 2.00077 8.91272 1.9996 8.85503V0.621068C1.9996 0.361206 2.20994 0.14917 2.46993 0.14917C2.56743 0.14917 2.65843 0.179604 2.73327 0.229603L4.17142 1.1724C4.17909 1.17892 4.18759 1.18444 4.19642 1.18979C4.56825 1.4443 4.81109 1.87272 4.81109 2.35883Z" fill="url(#paint2_linear_36_2231)"/>\n\t<path opacity="0.15" d="M9.51822 8.9177C9.51822 9.01 9.50955 9.09913 9.49355 9.18592C9.48872 9.209 9.48405 9.23207 9.47855 9.25515C9.46822 9.29645 9.45722 9.33625 9.44372 9.37605C9.43655 9.39679 9.42939 9.41735 9.42155 9.43725C9.41355 9.45799 9.40489 9.47789 9.39622 9.49846C9.37005 9.55899 9.33905 9.61702 9.30422 9.6727C9.25905 9.74594 9.20755 9.81434 9.15039 9.87805C8.88789 10.1693 7.99639 10.6887 7.66789 10.8998L6.93857 11.3469C6.40423 11.6773 5.8989 11.9111 5.26207 11.927C5.23191 11.9278 5.20257 11.9287 5.17324 11.9287C5.13208 11.9287 5.09158 11.9278 5.05108 11.9263C3.97258 11.885 3.03192 11.3041 2.48959 10.4456C2.24142 10.0533 2.07726 9.60297 2.02176 9.1192C2.13826 9.78039 2.71259 10.2817 3.40492 10.2817C3.64758 10.2817 3.87525 10.2205 4.07425 10.1122C4.07575 10.1113 4.07741 10.1105 4.07908 10.1098L4.15041 10.0668L4.44075 9.89494L4.81024 9.67538V9.66501L4.85791 9.63641L8.16423 7.67107L8.41872 7.5199L8.44406 7.52859C8.44489 7.52859 8.44639 7.52943 8.44722 7.52943C8.52022 7.54766 8.59156 7.57241 8.65972 7.60267C8.81755 7.67107 8.96022 7.76822 9.08239 7.88678C9.13155 7.93377 9.17672 7.9846 9.21872 8.03878C9.25439 8.0841 9.28689 8.13193 9.31622 8.18193C9.44439 8.39647 9.51822 8.64881 9.51822 8.9177Z" fill="url(#paint3_linear_36_2231)"/>\n\t<path opacity="0.1" d="M4.81109 2.35883L4.80992 9.67508L4.44042 9.89481L4.14992 10.0665L4.07842 10.11C4.07726 10.11 4.07509 10.1112 4.07409 10.1122C3.87476 10.2199 3.64709 10.2819 3.40426 10.2819C2.71177 10.2819 2.13844 9.7806 2.02127 9.11941C2.01577 9.08897 2.0116 9.05737 2.00827 9.02694C2.00394 8.96924 2.00077 8.91272 1.9996 8.85503V0.621068C1.9996 0.361206 2.20994 0.14917 2.46993 0.14917C2.56743 0.14917 2.65843 0.179604 2.73327 0.229603L4.17142 1.1724C4.17909 1.17892 4.18759 1.18444 4.19642 1.18979C4.56825 1.4443 4.81109 1.87272 4.81109 2.35883Z" fill="url(#paint4_linear_36_2231)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2231" x1="5.0402" y1="5.24784" x2="10.1999" y2="8.21689" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2231" x1="2.02143" y1="9.72414" x2="9.51817" y2="9.72414" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2231" x1="3.40533" y1="10.3854" x2="3.40533" y2="0.327611" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2231" x1="3.51153" y1="11.5805" x2="8.15328" y2="6.95414" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2231" x1="3.40533" y1="0.14917" x2="3.40533" y2="10.2818" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2231">\n\t<rect width="8" height="12" fill="white" transform="translate(2)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo16='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2232)">\n\t<path d="M12.9995 10.2819C12.9995 10.4378 12.9916 10.5927 12.9758 10.7455C12.8816 11.677 12.5049 12.5193 11.9379 13.1708C12.0093 13.0859 12.0737 12.9947 12.1302 12.897C12.1737 12.8228 12.2125 12.7454 12.2452 12.6647C12.257 12.6382 12.2679 12.6105 12.2768 12.5831C12.2877 12.5566 12.2966 12.5289 12.3045 12.5015C12.3135 12.4761 12.3214 12.4496 12.3283 12.423C12.3352 12.3954 12.3422 12.3679 12.3481 12.3403C12.3491 12.3372 12.3502 12.3338 12.351 12.3307C12.357 12.3031 12.3618 12.2756 12.3668 12.248C12.3718 12.2195 12.3768 12.1907 12.3808 12.1622C12.3808 12.161 12.3808 12.161 12.3808 12.1601C12.3847 12.1336 12.3877 12.1071 12.3897 12.0794C12.3958 12.0168 12.3987 11.9544 12.3987 11.8906C12.3987 11.5321 12.3064 11.1956 12.145 10.9093C12.1083 10.8424 12.0677 10.7789 12.0231 10.7185C11.9706 10.6462 11.9141 10.5785 11.8527 10.5158C11.7 10.3577 11.5216 10.2282 11.3243 10.137C11.2391 10.0966 11.15 10.0639 11.0587 10.0393C11.0577 10.0393 11.0558 10.0382 11.0547 10.0382L11.0231 10.0266L10.5612 9.85696V9.85584L9.35288 9.41126C9.34892 9.41014 9.34392 9.41014 9.34101 9.40925L9.26559 9.3796C9.02268 9.2777 8.82143 9.08685 8.69559 8.84382L8.25456 7.63961L7.74893 6.26037L7.65185 5.99415L7.62706 5.93997C7.59935 5.86773 7.58435 5.78925 7.58435 5.70765C7.58435 5.68646 7.58435 5.66528 7.58643 5.64611C7.61518 5.34266 7.85602 5.10498 8.14747 5.10498C8.22476 5.10498 8.29914 5.12193 8.36664 5.15269L10.6183 6.38835L11.0625 6.63137C11.2975 6.78098 11.5164 6.95712 11.7166 7.15556C12.4422 7.86859 12.9181 8.8679 12.9895 9.98516C12.9956 10.0837 12.9995 10.1823 12.9995 10.2819Z" fill="url(#paint0_linear_36_2232)"/>\n\t<path d="M12.3978 11.8905C12.3978 12.0135 12.3869 12.1324 12.3669 12.2481C12.3609 12.2789 12.3551 12.3096 12.3482 12.3404C12.3353 12.3955 12.3215 12.4485 12.3046 12.5016C12.2957 12.5293 12.2867 12.5567 12.2769 12.5832C12.2669 12.6109 12.2561 12.6374 12.2453 12.6648C12.2126 12.7455 12.1738 12.8229 12.1303 12.8971C12.0738 12.9948 12.0092 13.086 11.938 13.1709C11.6099 13.5593 10.4955 14.2519 10.0849 14.5332L9.1732 15.1294C8.50529 15.57 7.87362 15.8817 7.07759 15.9029C7.03988 15.904 7.00321 15.9051 6.96654 15.9051C6.91509 15.9051 6.86446 15.904 6.81384 15.902C5.46572 15.8469 4.28989 15.0723 3.61198 13.9277C3.30177 13.4046 3.09657 12.8042 3.02719 12.1591C3.17282 13.0407 3.89073 13.7092 4.75614 13.7092C5.05947 13.7092 5.34405 13.6276 5.5928 13.4831C5.59468 13.482 5.59676 13.4809 5.59884 13.48L5.68801 13.4227L6.05092 13.1935L6.5128 12.9007V12.8869L6.57238 12.8488L10.7053 10.2283L11.0234 10.0267L11.0551 10.0383C11.0561 10.0383 11.058 10.0394 11.059 10.0394C11.1503 10.0637 11.2394 10.0967 11.3246 10.1371C11.5219 10.2283 11.7003 10.3578 11.853 10.5159C11.9144 10.5786 11.9709 10.6463 12.0234 10.7186C12.068 10.779 12.1086 10.8428 12.1453 10.9094C12.3055 11.1955 12.3978 11.5319 12.3978 11.8905Z" fill="url(#paint1_linear_36_2232)"/>\n\t<path d="M6.51387 3.14519L6.51241 12.9002L6.05054 13.1932L5.68741 13.4221L5.59804 13.4801C5.59658 13.4801 5.59387 13.4817 5.59262 13.483C5.34346 13.6266 5.05887 13.7093 4.75533 13.7093C3.88971 13.7093 3.17305 13.0409 3.02659 12.1593C3.01972 12.1187 3.01451 12.0766 3.01034 12.036C3.00493 11.9591 3.00097 11.8837 2.99951 11.8068V0.828172C2.99951 0.48169 3.26243 0.198975 3.58742 0.198975C3.7093 0.198975 3.82305 0.239554 3.91659 0.306219L5.71429 1.56328C5.72387 1.57197 5.7345 1.57933 5.74554 1.58646C6.21033 1.92581 6.51387 2.49704 6.51387 3.14519Z" fill="url(#paint2_linear_36_2232)"/>\n\t<path opacity="0.15" d="M12.3978 11.8905C12.3978 12.0135 12.3869 12.1324 12.3669 12.2481C12.3609 12.2789 12.3551 12.3096 12.3482 12.3404C12.3353 12.3955 12.3215 12.4485 12.3046 12.5016C12.2957 12.5293 12.2867 12.5567 12.2769 12.5832C12.2669 12.6109 12.2561 12.6374 12.2453 12.6648C12.2126 12.7455 12.1738 12.8229 12.1303 12.8971C12.0738 12.9948 12.0094 13.086 11.938 13.1709C11.6099 13.5593 10.4955 14.2519 10.0849 14.5332L9.1732 15.1294C8.50529 15.57 7.87362 15.8817 7.07759 15.9029C7.03988 15.904 7.00321 15.9051 6.96654 15.9051C6.91509 15.9051 6.86446 15.904 6.81384 15.902C5.46572 15.8469 4.28989 15.0723 3.61198 13.9277C3.30177 13.4046 3.09657 12.8042 3.02719 12.1591C3.17282 13.0407 3.89073 13.7092 4.75614 13.7092C5.05947 13.7092 5.34405 13.6276 5.5928 13.4831C5.59468 13.482 5.59676 13.4809 5.59884 13.48L5.68801 13.4227L6.05092 13.1935L6.5128 12.9007V12.8869L6.57238 12.8488L10.7053 10.2283L11.0234 10.0267L11.0551 10.0383C11.0561 10.0383 11.058 10.0394 11.059 10.0394C11.1503 10.0637 11.2394 10.0967 11.3246 10.1371C11.5219 10.2283 11.7003 10.3578 11.853 10.5159C11.9144 10.5786 11.9709 10.6463 12.0234 10.7186C12.068 10.779 12.1086 10.8428 12.1453 10.9094C12.3055 11.1955 12.3978 11.5319 12.3978 11.8905Z" fill="url(#paint3_linear_36_2232)"/>\n\t<path opacity="0.1" d="M6.51387 3.14519L6.51241 12.9002L6.05054 13.1932L5.68741 13.4221L5.59804 13.4801C5.59658 13.4801 5.59387 13.4817 5.59262 13.483C5.34346 13.6266 5.05887 13.7093 4.75533 13.7093C3.88971 13.7093 3.17305 13.0409 3.02659 12.1593C3.01972 12.1187 3.01451 12.0766 3.01034 12.036C3.00493 11.9591 3.00097 11.8837 2.99951 11.8068V0.828172C2.99951 0.48169 3.26243 0.198975 3.58742 0.198975C3.7093 0.198975 3.82305 0.239554 3.91659 0.306219L5.71429 1.56328C5.72387 1.57197 5.7345 1.57933 5.74554 1.58646C6.21033 1.92581 6.51387 2.49704 6.51387 3.14519Z" fill="url(#paint4_linear_36_2232)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2232" x1="6.80029" y1="6.99712" x2="13.4502" y2="10.5845" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2232" x1="3.02677" y1="12.9657" x2="12.3977" y2="12.9657" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2232" x1="4.75667" y1="13.8472" x2="4.75667" y2="0.436896" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2232" x1="4.88941" y1="15.4408" x2="11.0642" y2="9.67118" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2232" x1="4.75667" y1="0.198975" x2="4.75667" y2="13.7092" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2232">\n\t<rect width="10" height="16" fill="white" transform="translate(3)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo20='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2233)">\n\t<path d="M16.9994 12.8524C16.9994 13.0472 16.9891 13.2409 16.9685 13.4318C16.8461 14.5962 16.3564 15.6492 15.6192 16.4635C15.7121 16.3574 15.7958 16.2434 15.8692 16.1213C15.9258 16.0285 15.9762 15.9318 16.0187 15.8309C16.0341 15.7977 16.0482 15.7632 16.0598 15.7289C16.0739 15.6957 16.0856 15.6612 16.0959 15.6269C16.1075 15.5951 16.1178 15.5619 16.1267 15.5288C16.1357 15.4942 16.1449 15.4599 16.1525 15.4254C16.1538 15.4215 16.1552 15.4173 16.1563 15.4134C16.1641 15.3788 16.1703 15.3446 16.1768 15.31C16.1833 15.2743 16.1898 15.2384 16.195 15.2027C16.195 15.2013 16.195 15.2013 16.195 15.2002C16.2001 15.167 16.2039 15.1339 16.2066 15.0993C16.2145 15.021 16.2183 14.9429 16.2183 14.8632C16.2183 14.4151 16.0983 13.9945 15.8884 13.6367C15.8407 13.5531 15.7879 13.4736 15.73 13.3981C15.6617 13.3078 15.5883 13.2231 15.5084 13.1448C15.3099 12.9472 15.0781 12.7852 14.8216 12.6712C14.7108 12.6208 14.5949 12.5798 14.4763 12.5492C14.4749 12.5492 14.4725 12.5478 14.4711 12.5478L14.43 12.5333L13.8295 12.3212V12.3198L12.2587 11.7641C12.2536 11.7627 12.2471 11.7627 12.2433 11.7616L12.1452 11.7245C11.8294 11.5971 11.5678 11.3586 11.4042 11.0548L10.8309 9.54951L10.1736 7.82546L10.0474 7.49269L10.0151 7.42496C9.97913 7.33466 9.95963 7.23656 9.95963 7.13456C9.95963 7.10808 9.95963 7.0816 9.96233 7.05763C9.99971 6.67832 10.3128 6.38123 10.6917 6.38123C10.7922 6.38123 10.8888 6.40241 10.9766 6.44087L13.9037 7.98543L14.4812 8.28922C14.7867 8.47623 15.0713 8.6964 15.3316 8.94445C16.2749 9.83573 16.8935 11.0849 16.9864 12.4814C16.9942 12.6046 16.9994 12.7278 16.9994 12.8524Z" fill="url(#paint0_linear_36_2233)"/>\n\t<path d="M16.2171 14.863C16.2171 15.0168 16.203 15.1654 16.177 15.31C16.1691 15.3485 16.1616 15.387 16.1526 15.4254C16.1358 15.4943 16.118 15.5606 16.096 15.6269C16.0844 15.6615 16.0727 15.6958 16.06 15.7289C16.047 15.7635 16.0329 15.7966 16.0188 15.8309C15.9763 15.9318 15.9259 16.0285 15.8693 16.1213C15.7959 16.2434 15.712 16.3574 15.6194 16.4636C15.1928 16.9491 13.7441 17.8147 13.2103 18.1664L12.0251 18.9117C11.1569 19.4624 10.3357 19.852 9.30085 19.8785C9.25183 19.8799 9.20416 19.8813 9.1565 19.8813C9.0896 19.8813 9.02379 19.8799 8.95798 19.8774C7.20543 19.8086 5.67685 18.8403 4.79556 17.4095C4.3923 16.7557 4.12553 16.0051 4.03534 15.1988C4.22465 16.3008 5.15794 17.1364 6.28297 17.1364C6.6773 17.1364 7.04726 17.0344 7.37063 16.8538C7.37307 16.8524 7.37578 16.851 7.37849 16.8499L7.4944 16.7782L7.96619 16.4917L8.56663 16.1258V16.1085L8.64408 16.0609L14.0168 12.7853L14.4304 12.5333L14.4716 12.5478C14.4729 12.5478 14.4754 12.5492 14.4767 12.5492C14.5953 12.5796 14.7113 12.6208 14.822 12.6713C15.0785 12.7853 15.3103 12.9472 15.5089 13.1448C15.5888 13.2231 15.6621 13.3078 15.7304 13.3981C15.7884 13.4737 15.8412 13.5534 15.8888 13.6367C16.0971 13.9943 16.2171 14.4148 16.2171 14.863Z" fill="url(#paint1_linear_36_2233)"/>\n\t<path d="M8.56802 3.93142L8.56612 16.1252L7.96569 16.4914L7.49363 16.7776L7.37744 16.8501C7.37555 16.8501 7.37203 16.852 7.3704 16.8537C7.04649 17.0332 6.67653 17.1366 6.28193 17.1366C5.15662 17.1366 4.22496 16.301 4.03457 15.1991C4.02563 15.1483 4.01886 15.0957 4.01344 15.0449C4.0064 14.9488 4.00125 14.8546 3.99936 14.7584V1.03515C3.99936 0.602051 4.34115 0.248657 4.76365 0.248657C4.92208 0.248657 5.06996 0.299381 5.19156 0.382713L7.52857 1.95403C7.54103 1.9649 7.55484 1.9741 7.56919 1.98302C8.17342 2.4072 8.56802 3.12124 8.56802 3.93142Z" fill="url(#paint2_linear_36_2233)"/>\n\t<path opacity="0.15" d="M16.2171 14.863C16.2171 15.0168 16.203 15.1654 16.177 15.31C16.1691 15.3485 16.1616 15.387 16.1526 15.4254C16.1358 15.4943 16.118 15.5606 16.096 15.6269C16.0844 15.6615 16.0727 15.6958 16.06 15.7289C16.047 15.7635 16.0329 15.7966 16.0188 15.8309C15.9763 15.9318 15.9259 16.0285 15.8693 16.1213C15.7959 16.2434 15.7123 16.3574 15.6194 16.4636C15.1928 16.9491 13.7441 17.8147 13.2103 18.1664L12.0251 18.9117C11.1569 19.4624 10.3357 19.852 9.30085 19.8785C9.25183 19.8799 9.20416 19.8813 9.1565 19.8813C9.0896 19.8813 9.02379 19.8799 8.95798 19.8774C7.20543 19.8086 5.67685 18.8403 4.79556 17.4095C4.3923 16.7557 4.12553 16.0051 4.03534 15.1988C4.22465 16.3008 5.15794 17.1364 6.28297 17.1364C6.6773 17.1364 7.04726 17.0344 7.37063 16.8538C7.37307 16.8524 7.37578 16.851 7.37849 16.8499L7.4944 16.7782L7.96619 16.4917L8.56663 16.1258V16.1085L8.64408 16.0609L14.0168 12.7853L14.4304 12.5333L14.4716 12.5478C14.4729 12.5478 14.4754 12.5492 14.4767 12.5492C14.5953 12.5796 14.7113 12.6208 14.822 12.6713C15.0785 12.7853 15.3103 12.9472 15.5089 13.1448C15.5888 13.2231 15.6621 13.3078 15.7304 13.3981C15.7884 13.4737 15.8412 13.5534 15.8888 13.6367C16.0971 13.9943 16.2171 14.4148 16.2171 14.863Z" fill="url(#paint3_linear_36_2233)"/>\n\t<path opacity="0.1" d="M8.56802 3.93142L8.56612 16.1252L7.96569 16.4914L7.49363 16.7776L7.37744 16.8501C7.37555 16.8501 7.37203 16.852 7.3704 16.8537C7.04649 17.0332 6.67653 17.1366 6.28193 17.1366C5.15662 17.1366 4.22496 16.301 4.03457 15.1991C4.02563 15.1483 4.01886 15.0957 4.01344 15.0449C4.0064 14.9488 4.00125 14.8546 3.99936 14.7584V1.03515C3.99936 0.602051 4.34115 0.248657 4.76365 0.248657C4.92208 0.248657 5.06996 0.299381 5.19156 0.382713L7.52857 1.95403C7.54103 1.9649 7.55484 1.9741 7.56919 1.98302C8.17342 2.4072 8.56802 3.12124 8.56802 3.93142Z" fill="url(#paint4_linear_36_2233)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2233" x1="8.94035" y1="8.7464" x2="17.4291" y2="13.509" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2233" x1="4.0348" y1="16.2071" x2="16.217" y2="16.2071" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2233" x1="6.28366" y1="17.309" x2="6.28366" y2="0.546059" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2233" x1="6.45622" y1="19.301" x2="14.1893" y2="11.7862" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2233" x1="6.28366" y1="0.248657" x2="6.28366" y2="17.1364" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2233">\n\t<rect width="13" height="20" fill="white" transform="translate(4)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo24='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2234)">\n\t<path d="M19.9992 15.4229C19.9992 15.6567 19.9866 15.8891 19.9612 16.1182C19.8106 17.5155 19.2079 18.779 18.3006 19.7562C18.4149 19.6288 18.5179 19.492 18.6082 19.3456C18.6779 19.2342 18.7399 19.1181 18.7922 18.9971C18.8112 18.9573 18.8286 18.9158 18.8429 18.8747C18.8602 18.8349 18.8746 18.7934 18.8872 18.7523C18.9016 18.7141 18.9142 18.6743 18.9252 18.6345C18.9362 18.5931 18.9476 18.5519 18.9569 18.5105C18.9586 18.5058 18.9602 18.5008 18.9616 18.4961C18.9712 18.4546 18.9789 18.4135 18.9869 18.372C18.9949 18.3292 19.0029 18.286 19.0092 18.2432C19.0092 18.2416 19.0092 18.2416 19.0092 18.2402C19.0156 18.2004 19.0202 18.1606 19.0236 18.1192C19.0332 18.0252 19.0379 17.9315 19.0379 17.8359C19.0379 17.2981 18.8902 16.7934 18.6319 16.364C18.5732 16.2637 18.5082 16.1684 18.4369 16.0777C18.3529 15.9694 18.2626 15.8677 18.1642 15.7737C17.9199 15.5366 17.6346 15.3423 17.3189 15.2055C17.1826 15.145 17.0399 15.0958 16.8939 15.059C16.8922 15.059 16.8892 15.0573 16.8876 15.0573L16.8369 15.0399L16.0979 14.7854V14.7838L14.1646 14.1169C14.1582 14.1152 14.1502 14.1152 14.1456 14.1139L14.0249 14.0694C13.6363 13.9166 13.3143 13.6303 13.1129 13.2657L12.4073 11.4594L11.5983 9.39055L11.4429 8.99123L11.4033 8.90996C11.3589 8.8016 11.3349 8.68387 11.3349 8.56147C11.3349 8.5297 11.3349 8.49792 11.3383 8.46916C11.3843 8.01399 11.7696 7.65747 12.2359 7.65747C12.3596 7.65747 12.4786 7.68289 12.5866 7.72904L16.1892 9.58252L16.8999 9.94706C17.2759 10.1715 17.6262 10.4357 17.9466 10.7333C19.1076 11.8029 19.8689 13.3018 19.9832 14.9777C19.9929 15.1256 19.9992 15.2734 19.9992 15.4229Z" fill="url(#paint0_linear_36_2234)"/>\n\t<path d="M19.0364 17.8356C19.0364 18.0203 19.0191 18.1985 18.9871 18.3721C18.9774 18.4182 18.9681 18.4644 18.9571 18.5105C18.9364 18.5932 18.9144 18.6727 18.8874 18.7523C18.8731 18.7938 18.8588 18.835 18.8431 18.8748C18.8271 18.9162 18.8098 18.956 18.7924 18.9972C18.7401 19.1182 18.6781 19.2343 18.6084 19.3456C18.5181 19.4921 18.4148 19.6289 18.3008 19.7563C17.7758 20.3389 15.9928 21.3777 15.3358 21.7998L13.8771 22.6941C12.8085 23.3549 11.7978 23.8225 10.5241 23.8543C10.4638 23.8559 10.4051 23.8576 10.3465 23.8576C10.2642 23.8576 10.1832 23.8559 10.1022 23.8529C7.94516 23.7703 6.06384 22.6085 4.97918 20.8914C4.48285 20.1068 4.15452 19.2062 4.04352 18.2386C4.27652 19.561 5.42518 20.5637 6.80984 20.5637C7.29517 20.5637 7.7505 20.4413 8.1485 20.2246C8.1515 20.2229 8.15483 20.2212 8.15816 20.2199L8.30083 20.1339L8.88149 19.7901L9.62049 19.351V19.3303L9.71582 19.2731L16.3285 15.3424L16.8374 15.04L16.8881 15.0574C16.8898 15.0574 16.8928 15.0591 16.8944 15.0591C17.0404 15.0956 17.1831 15.1451 17.3194 15.2056C17.6351 15.3424 17.9204 15.5367 18.1648 15.7738C18.2631 15.8678 18.3534 15.9695 18.4374 16.0778C18.5088 16.1684 18.5738 16.2641 18.6324 16.3641C18.8888 16.7932 19.0364 17.2979 19.0364 17.8356Z" fill="url(#paint1_linear_36_2234)"/>\n\t<path d="M9.62217 4.71778L9.61984 19.3503L8.88084 19.7897L8.29985 20.1332L8.15685 20.2202C8.15451 20.2202 8.15018 20.2225 8.14818 20.2245C7.74952 20.4399 7.29419 20.564 6.80852 20.564C5.42353 20.564 4.27687 19.5613 4.04254 18.2389C4.03154 18.1781 4.02321 18.1149 4.01654 18.054C4.00787 17.9386 4.00154 17.8256 3.99921 17.7102V1.24226C3.99921 0.722535 4.41987 0.298462 4.93987 0.298462C5.13487 0.298462 5.31687 0.35933 5.46653 0.459329L8.34285 2.34491C8.35818 2.35796 8.37518 2.36899 8.39285 2.3797C9.13651 2.88872 9.62217 3.74556 9.62217 4.71778Z" fill="url(#paint2_linear_36_2234)"/>\n\t<path opacity="0.15" d="M19.0364 17.8356C19.0364 18.0203 19.0191 18.1985 18.9871 18.3721C18.9774 18.4182 18.9681 18.4644 18.9571 18.5105C18.9364 18.5932 18.9144 18.6727 18.8874 18.7523C18.8731 18.7938 18.8588 18.835 18.8431 18.8748C18.8271 18.9162 18.8098 18.956 18.7924 18.9972C18.7401 19.1182 18.6781 19.2343 18.6084 19.3456C18.5181 19.4921 18.4151 19.6289 18.3008 19.7563C17.7758 20.3389 15.9928 21.3777 15.3358 21.7998L13.8771 22.6941C12.8085 23.3549 11.7978 23.8225 10.5241 23.8543C10.4638 23.8559 10.4051 23.8576 10.3465 23.8576C10.2642 23.8576 10.1832 23.8559 10.1022 23.8529C7.94516 23.7703 6.06384 22.6085 4.97918 20.8914C4.48285 20.1068 4.15452 19.2062 4.04352 18.2386C4.27652 19.561 5.42518 20.5637 6.80984 20.5637C7.29517 20.5637 7.7505 20.4413 8.1485 20.2246C8.1515 20.2229 8.15483 20.2212 8.15816 20.2199L8.30083 20.1339L8.88149 19.7901L9.62049 19.351V19.3303L9.71582 19.2731L16.3285 15.3424L16.8374 15.04L16.8881 15.0574C16.8898 15.0574 16.8928 15.0591 16.8944 15.0591C17.0404 15.0956 17.1831 15.1451 17.3194 15.2056C17.6351 15.3424 17.9204 15.5367 18.1648 15.7738C18.2631 15.8678 18.3534 15.9695 18.4374 16.0778C18.5088 16.1684 18.5738 16.2641 18.6324 16.3641C18.8888 16.7932 19.0364 17.2979 19.0364 17.8356Z" fill="url(#paint3_linear_36_2234)"/>\n\t<path opacity="0.1" d="M9.62217 4.71778L9.61984 19.3503L8.88084 19.7897L8.29985 20.1332L8.15685 20.2202C8.15451 20.2202 8.15018 20.2225 8.14818 20.2245C7.74952 20.4399 7.29419 20.564 6.80852 20.564C5.42353 20.564 4.27687 19.5613 4.04254 18.2389C4.03154 18.1781 4.02321 18.1149 4.01654 18.054C4.00787 17.9386 4.00154 17.8256 3.99921 17.7102V1.24226C3.99921 0.722535 4.41987 0.298462 4.93987 0.298462C5.13487 0.298462 5.31687 0.35933 5.46653 0.459329L8.34285 2.34491C8.35818 2.35796 8.37518 2.36899 8.39285 2.3797C9.13651 2.88872 9.62217 3.74556 9.62217 4.71778Z" fill="url(#paint4_linear_36_2234)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2234" x1="10.0804" y1="10.4957" x2="20.3998" y2="16.4338" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2234" x1="4.04285" y1="19.4485" x2="19.0363" y2="19.4485" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2234" x1="6.81066" y1="20.7708" x2="6.81066" y2="0.655344" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2234" x1="7.02307" y1="23.1612" x2="16.3066" y2="13.9085" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2234" x1="6.81066" y1="0.298462" x2="6.81066" y2="20.5638" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2234">\n\t<rect width="16" height="24" fill="white" transform="translate(4)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n   ',CibLogoIcons.CibLogo32='<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2235)">\n\t<path d="M26.999 20.564C26.999 20.8757 26.9824 21.1856 26.9491 21.491C26.7514 23.3541 25.9604 25.0388 24.7695 26.3418C24.9196 26.1719 25.0547 25.9895 25.1733 25.7942C25.2647 25.6457 25.3461 25.491 25.4148 25.3295C25.4397 25.2765 25.4625 25.2212 25.4813 25.1663C25.5041 25.1133 25.5229 25.058 25.5395 25.0031C25.5583 24.9523 25.5749 24.8992 25.5894 24.8462C25.6038 24.7909 25.6187 24.736 25.6309 24.6807C25.6331 24.6745 25.6353 24.6678 25.6371 24.6615C25.6497 24.6063 25.6598 24.5514 25.6703 24.4961C25.6808 24.439 25.6913 24.3815 25.6996 24.3244C25.6996 24.3222 25.6996 24.3222 25.6996 24.3204C25.7079 24.2674 25.7141 24.2143 25.7184 24.159C25.7311 24.0337 25.7372 23.9088 25.7372 23.7813C25.7372 23.0643 25.5434 22.3914 25.2044 21.8188C25.1274 21.685 25.0421 21.5579 24.9484 21.4371C24.8382 21.2926 24.7196 21.157 24.5906 21.0317C24.2699 20.7156 23.8954 20.4565 23.4811 20.2741C23.3021 20.1934 23.1149 20.1279 22.9233 20.0788C22.9211 20.0788 22.9171 20.0766 22.9149 20.0766L22.8484 20.0534L21.8785 19.714V19.7118L19.341 18.8226C19.3327 18.8204 19.3222 18.8204 19.3161 18.8186L19.1577 18.7593C18.6476 18.5555 18.225 18.1738 17.9607 17.6878L17.0345 15.2793L15.9727 12.5209L15.7689 11.9884L15.7168 11.8801C15.6586 11.7356 15.6271 11.5786 15.6271 11.4154C15.6271 11.3731 15.6271 11.3307 15.6315 11.2923C15.6919 10.6854 16.1976 10.2101 16.8097 10.2101C16.972 10.2101 17.1282 10.244 17.2699 10.3055L21.9984 12.7768L22.9311 13.2629C23.4246 13.5621 23.8844 13.9144 24.3049 14.3112C25.8287 15.7373 26.8279 17.7359 26.978 19.9704C26.9907 20.1675 26.999 20.3646 26.999 20.564Z" fill="url(#paint0_linear_36_2235)"/>\n\t<path d="M25.7353 23.7808C25.7353 24.027 25.7126 24.2646 25.6706 24.4961C25.6579 24.5576 25.6456 24.6191 25.6312 24.6807C25.6041 24.7908 25.5752 24.897 25.5397 25.0031C25.5209 25.0584 25.5021 25.1132 25.4816 25.1663C25.4606 25.2216 25.4378 25.2747 25.4151 25.3295C25.3464 25.4909 25.265 25.6457 25.1736 25.7942C25.055 25.9895 24.9194 26.1718 24.7697 26.3417C24.0807 27.1185 21.7405 28.5036 20.8782 29.0663L18.9637 30.2587C17.5611 31.1399 16.2346 31.7633 14.5629 31.8056C14.4837 31.8079 14.4067 31.8101 14.3297 31.8101C14.2217 31.8101 14.1154 31.8079 14.0091 31.8039C11.178 31.6937 8.70877 30.1446 7.28515 27.8552C6.63372 26.8091 6.20279 25.6082 6.0571 24.3181C6.36291 26.0813 7.87053 27.4182 9.68789 27.4182C10.3249 27.4182 10.9225 27.255 11.4449 26.966C11.4488 26.9638 11.4532 26.9616 11.4576 26.9598L11.6448 26.8452L12.4069 26.3868L13.3769 25.8013V25.7736L13.502 25.6974L22.1811 20.4565L22.8491 20.0533L22.9156 20.0765C22.9178 20.0765 22.9218 20.0788 22.9239 20.0788C23.1156 20.1274 23.3028 20.1934 23.4818 20.2741C23.8961 20.4565 24.2706 20.7155 24.5912 21.0317C24.7203 21.157 24.8389 21.2926 24.9491 21.437C25.0427 21.5579 25.1281 21.6854 25.2051 21.8188C25.5415 22.3909 25.7353 23.0638 25.7353 23.7808Z" fill="url(#paint1_linear_36_2235)"/>\n\t<path d="M13.3791 6.29037L13.376 25.8004L12.4061 26.3863L11.6436 26.8443L11.4559 26.9602C11.4528 26.9602 11.4471 26.9634 11.4445 26.966C10.9212 27.2532 10.3236 27.4186 9.68619 27.4186C7.86839 27.4186 6.3634 26.0818 6.05584 24.3186C6.0414 24.2374 6.03046 24.1532 6.02171 24.072C6.01034 23.9181 6.00202 23.7674 5.99896 23.6136V1.65634C5.99896 0.963379 6.55108 0.397949 7.23358 0.397949C7.48952 0.397949 7.72839 0.479107 7.92483 0.612438L11.7 3.12655C11.7201 3.14394 11.7424 3.15866 11.7656 3.17293C12.7417 3.85162 13.3791 4.99408 13.3791 6.29037Z" fill="url(#paint2_linear_36_2235)"/>\n\t<path opacity="0.15" d="M25.7353 23.7808C25.7353 24.027 25.7126 24.2646 25.6706 24.4961C25.6579 24.5576 25.6456 24.6191 25.6312 24.6807C25.6041 24.7908 25.5752 24.897 25.5397 25.0031C25.5209 25.0584 25.5021 25.1132 25.4816 25.1663C25.4606 25.2216 25.4378 25.2747 25.4151 25.3295C25.3464 25.4909 25.265 25.6457 25.1736 25.7942C25.055 25.9895 24.9198 26.1718 24.7697 26.3417C24.0807 27.1185 21.7405 28.5036 20.8782 29.0663L18.9637 30.2587C17.5611 31.1399 16.2346 31.7633 14.5629 31.8056C14.4837 31.8079 14.4067 31.8101 14.3297 31.8101C14.2217 31.8101 14.1154 31.8079 14.0091 31.8039C11.178 31.6937 8.70877 30.1446 7.28515 27.8552C6.63372 26.8091 6.20279 25.6082 6.0571 24.3181C6.36291 26.0813 7.87053 27.4182 9.68789 27.4182C10.3249 27.4182 10.9225 27.255 11.4449 26.966C11.4488 26.9638 11.4532 26.9616 11.4576 26.9598L11.6448 26.8452L12.4069 26.3868L13.3769 25.8013V25.7736L13.502 25.6974L22.1811 20.4565L22.8491 20.0533L22.9156 20.0765C22.9178 20.0765 22.9218 20.0788 22.9239 20.0788C23.1156 20.1274 23.3028 20.1934 23.4818 20.2741C23.8961 20.4565 24.2706 20.7155 24.5912 21.0317C24.7203 21.157 24.8389 21.2926 24.9491 21.437C25.0427 21.5579 25.1281 21.6854 25.2051 21.8188C25.5415 22.3909 25.7353 23.0638 25.7353 23.7808Z" fill="url(#paint3_linear_36_2235)"/>\n\t<path opacity="0.1" d="M13.3791 6.29037L13.376 25.8004L12.4061 26.3863L11.6436 26.8443L11.4559 26.9602C11.4528 26.9602 11.4471 26.9634 11.4445 26.966C10.9212 27.2532 10.3236 27.4186 9.68619 27.4186C7.86839 27.4186 6.3634 26.0818 6.05584 24.3186C6.0414 24.2374 6.03046 24.1532 6.02171 24.072C6.01034 23.9181 6.00202 23.7674 5.99896 23.6136V1.65634C5.99896 0.963379 6.55108 0.397949 7.23358 0.397949C7.48952 0.397949 7.72839 0.479107 7.92483 0.612438L11.7 3.12655C11.7201 3.14394 11.7424 3.15866 11.7656 3.17293C12.7417 3.85162 13.3791 4.99408 13.3791 6.29037Z" fill="url(#paint4_linear_36_2235)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2235" x1="13.9806" y1="13.9944" x2="27.63" y2="21.726" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2235" x1="6.05622" y1="25.9313" x2="25.7352" y2="25.9313" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2235" x1="9.68899" y1="27.6944" x2="9.68899" y2="0.873793" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2235" x1="9.96776" y1="30.8816" x2="22.3436" y2="18.7396" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2235" x1="9.68899" y1="0.397949" x2="9.68899" y2="27.4184" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2235">\n\t<rect width="21" height="32" fill="white" transform="translate(6)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo36='<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2236)">\n\t<path d="M29.9989 23.1343C29.9989 23.485 29.9807 23.8336 29.9443 24.1773C29.7277 26.2732 28.8614 28.1685 27.5571 29.6344C27.7214 29.4432 27.8695 29.2381 27.9993 29.0183C28.0995 28.8513 28.1886 28.6772 28.2638 28.4956C28.2911 28.4359 28.3161 28.3737 28.3367 28.312C28.3616 28.2523 28.3822 28.1901 28.4004 28.1284C28.421 28.0712 28.4392 28.0115 28.455 27.9518C28.4708 27.8896 28.4871 27.8279 28.5005 27.7657C28.5029 27.7587 28.5053 27.7511 28.5073 27.7441C28.5211 27.6819 28.5322 27.6202 28.5437 27.558C28.5552 27.4938 28.5667 27.4291 28.5758 27.3648C28.5758 27.3623 28.5758 27.3623 28.5758 27.3603C28.5849 27.3006 28.5916 27.2409 28.5964 27.1787C28.6103 27.0378 28.617 26.8973 28.617 26.7538C28.617 25.9471 28.4047 25.1901 28.0334 24.546C27.949 24.3955 27.8556 24.2525 27.753 24.1166C27.6323 23.954 27.5024 23.8015 27.3611 23.6606C27.0099 23.3049 26.5997 23.0134 26.1459 22.8082C25.95 22.7174 25.7449 22.6437 25.535 22.5885C25.5326 22.5885 25.5283 22.586 25.5259 22.586L25.4531 22.5599L24.3908 22.1782V22.1756L21.6116 21.1753C21.6025 21.1728 21.591 21.1728 21.5843 21.1708L21.4108 21.1041C20.8521 20.8748 20.3893 20.4454 20.0998 19.8986L19.0854 17.1891L17.9225 14.0858L17.6992 13.4868L17.6422 13.3649C17.5785 13.2024 17.544 13.0258 17.544 12.8422C17.544 12.7945 17.544 12.7469 17.5488 12.7037C17.6149 12.021 18.1688 11.4862 18.8392 11.4862C19.0169 11.4862 19.188 11.5243 19.3432 11.5936L24.522 14.3738L25.5436 14.9206C26.0841 15.2572 26.5877 15.6535 27.0482 16.1C28.7171 17.7043 29.8115 19.9528 29.9759 22.4666C29.9898 22.6883 29.9989 22.9101 29.9989 23.1343Z" fill="url(#paint0_linear_36_2236)"/>\n\t<path d="M28.6149 26.7533C28.6149 27.0303 28.59 27.2976 28.544 27.558C28.5301 27.6272 28.5167 27.6965 28.5008 27.7657C28.4711 27.8896 28.4395 28.009 28.4007 28.1284C28.3801 28.1906 28.3595 28.2523 28.337 28.312C28.314 28.3742 28.289 28.4339 28.2641 28.4956C28.1889 28.6772 28.0998 28.8513 27.9996 29.0183C27.8698 29.2381 27.7212 29.4433 27.5574 29.6344C26.8027 30.5083 24.2396 32.0665 23.2952 32.6996L21.1984 34.041C19.6622 35.0323 18.2094 35.7336 16.3785 35.7813C16.2917 35.7838 16.2074 35.7863 16.1231 35.7863C16.0047 35.7863 15.8883 35.7838 15.7718 35.7793C12.6712 35.6553 9.96677 33.9126 8.40757 31.337C7.6941 30.1601 7.22212 28.8092 7.06256 27.3578C7.3975 29.3414 9.0487 30.8454 11.0391 30.8454C11.7368 30.8454 12.3913 30.6618 12.9635 30.3367C12.9678 30.3342 12.9726 30.3317 12.9774 30.3297L13.1824 30.2008L14.0171 29.6851L15.0795 29.0264V28.9953L15.2165 28.9095L24.7222 23.0134L25.4538 22.5599L25.5267 22.586C25.5291 22.586 25.5334 22.5885 25.5358 22.5885C25.7456 22.6432 25.9507 22.7175 26.1467 22.8083C26.6005 23.0134 27.0106 23.3049 27.3619 23.6606C27.5032 23.8016 27.6331 23.9541 27.7538 24.1166C27.8564 24.2525 27.9498 24.396 28.0341 24.546C28.4026 25.1897 28.6149 25.9467 28.6149 26.7533Z" fill="url(#paint1_linear_36_2236)"/>\n\t<path d="M15.0819 7.07661L15.0785 29.0254L14.0162 29.6846L13.181 30.1998L12.9755 30.3302C12.9721 30.3302 12.9659 30.3337 12.963 30.3367C12.3899 30.6598 11.7354 30.8459 11.0373 30.8459C9.04634 30.8459 7.39801 29.3419 7.06116 27.3584C7.04535 27.267 7.03337 27.1722 7.02379 27.0809C7.01133 26.9079 7.00222 26.7383 6.99887 26.5652V1.86333C6.99887 1.08374 7.60358 0.447632 8.35107 0.447632C8.63138 0.447632 8.89301 0.538935 9.10815 0.688932L13.2429 3.51731C13.2649 3.53687 13.2893 3.55343 13.3147 3.56948C14.3837 4.33301 15.0819 5.61827 15.0819 7.07661Z" fill="url(#paint2_linear_36_2236)"/>\n\t<path opacity="0.15" d="M28.6149 26.7533C28.6149 27.0303 28.59 27.2976 28.544 27.558C28.5301 27.6272 28.5167 27.6965 28.5008 27.7657C28.4711 27.8896 28.4395 28.009 28.4007 28.1284C28.3801 28.1906 28.3595 28.2523 28.337 28.312C28.314 28.3742 28.289 28.4339 28.2641 28.4956C28.1889 28.6772 28.0998 28.8513 27.9996 29.0183C27.8698 29.2381 27.7217 29.4433 27.5574 29.6344C26.8027 30.5083 24.2396 32.0665 23.2952 32.6996L21.1984 34.041C19.6622 35.0323 18.2094 35.7336 16.3785 35.7813C16.2917 35.7838 16.2074 35.7863 16.1231 35.7863C16.0047 35.7863 15.8883 35.7838 15.7718 35.7793C12.6712 35.6553 9.96677 33.9126 8.40757 31.337C7.6941 30.1601 7.22212 28.8092 7.06256 27.3578C7.3975 29.3414 9.0487 30.8454 11.0391 30.8454C11.7368 30.8454 12.3913 30.6618 12.9635 30.3367C12.9678 30.3342 12.9726 30.3317 12.9774 30.3297L13.1824 30.2008L14.0171 29.6851L15.0795 29.0264V28.9953L15.2165 28.9095L24.7222 23.0134L25.4538 22.5599L25.5267 22.586C25.5291 22.586 25.5334 22.5885 25.5358 22.5885C25.7456 22.6432 25.9507 22.7175 26.1467 22.8083C26.6005 23.0134 27.0106 23.3049 27.3619 23.6606C27.5032 23.8016 27.6331 23.9541 27.7538 24.1166C27.8564 24.2525 27.9498 24.396 28.0341 24.546C28.4026 25.1897 28.6149 25.9467 28.6149 26.7533Z" fill="url(#paint3_linear_36_2236)"/>\n\t<path opacity="0.1" d="M15.0819 7.07661L15.0785 29.0254L14.0162 29.6846L13.181 30.1998L12.9755 30.3302C12.9721 30.3302 12.9659 30.3337 12.963 30.3367C12.3899 30.6598 11.7354 30.8459 11.0373 30.8459C9.04634 30.8459 7.39801 29.3419 7.06116 27.3584C7.04535 27.267 7.03337 27.1722 7.02379 27.0809C7.01133 26.9079 7.00222 26.7383 6.99887 26.5652V1.86333C6.99887 1.08374 7.60358 0.447632 8.35107 0.447632C8.63138 0.447632 8.89301 0.538935 9.10815 0.688932L13.2429 3.51731C13.2649 3.53687 13.2893 3.55343 13.3147 3.56948C14.3837 4.33301 15.0819 5.61827 15.0819 7.07661Z" fill="url(#paint4_linear_36_2236)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2236" x1="15.7406" y1="15.7435" x2="30.882" y2="24.0933" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2236" x1="7.0616" y1="29.1727" x2="28.6147" y2="29.1727" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2236" x1="11.0403" y1="31.1562" x2="11.0403" y2="0.982956" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2236" x1="11.3457" y1="34.7417" x2="25.2563" y2="21.4549" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2236" x1="11.0403" y1="0.447632" x2="11.0403" y2="30.8456" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2236">\n\t<rect width="23" height="36" fill="white" transform="translate(7)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo40='<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2237)">\n\t<path d="M32.9987 25.7049C32.9987 26.0946 32.9781 26.4819 32.937 26.8638C32.6921 29.1926 31.7128 31.2985 30.2384 32.9272C30.4242 32.7148 30.5916 32.4869 30.7384 32.2427C30.8516 32.0571 30.9523 31.8637 31.0374 31.6619C31.0682 31.5956 31.0964 31.5264 31.1197 31.4579C31.1479 31.3916 31.1711 31.3224 31.1917 31.2539C31.215 31.1903 31.2356 31.124 31.2535 31.0577C31.2714 30.9886 31.2898 30.92 31.3049 30.8509C31.3076 30.8431 31.3104 30.8347 31.3125 30.8269C31.3282 30.7578 31.3407 30.6892 31.3537 30.6201C31.3667 30.5488 31.3797 30.4769 31.39 30.4055C31.39 30.4027 31.39 30.4027 31.39 30.4005C31.4003 30.3342 31.4079 30.2678 31.4133 30.1987C31.429 30.0421 31.4366 29.886 31.4366 29.7266C31.4366 28.8303 31.1966 27.9892 30.7768 27.2735C30.6815 27.1062 30.5759 26.9474 30.4599 26.7963C30.3234 26.6157 30.1766 26.4463 30.0169 26.2896C29.6198 25.8944 29.1562 25.5706 28.6432 25.3426C28.4217 25.2417 28.1898 25.1598 27.9526 25.0985C27.9499 25.0985 27.945 25.0957 27.9423 25.0957L27.86 25.0667L26.6591 24.6425V24.6397L23.5174 23.5283C23.5071 23.5255 23.4941 23.5255 23.4866 23.5232L23.2905 23.4491C22.6589 23.1944 22.1356 22.7172 21.8085 22.1097L20.6618 19.0991L19.3472 15.651L19.0947 14.9855L19.0303 14.85C18.9583 14.6695 18.9193 14.4732 18.9193 14.2692C18.9193 14.2163 18.9193 14.1633 18.9247 14.1154C18.9994 13.3568 19.6256 12.7626 20.3834 12.7626C20.5843 12.7626 20.7777 12.8049 20.9532 12.8819L26.8075 15.971L27.9623 16.5786C28.5733 16.9526 29.1426 17.3929 29.6632 17.889C31.5498 19.6716 32.7869 22.1699 32.9727 24.963C32.9884 25.2094 32.9987 25.4558 32.9987 25.7049Z" fill="url(#paint0_linear_36_2237)"/>\n\t<path d="M31.4342 29.726C31.4342 30.0337 31.406 30.3308 31.354 30.6201C31.3383 30.697 31.3232 30.7739 31.3053 30.8508C31.2717 30.9885 31.236 31.1212 31.1921 31.2538C31.1688 31.3229 31.1455 31.3915 31.12 31.4578C31.094 31.527 31.0659 31.5933 31.0377 31.6618C30.9527 31.8636 30.8519 32.057 30.7387 32.2427C30.5919 32.4868 30.424 32.7148 30.2387 32.9272C29.3856 33.8981 26.4883 35.6294 25.4206 36.3329L23.0503 37.8234C21.3138 38.9248 19.6714 39.7041 17.6017 39.757C17.5037 39.7598 17.4084 39.7626 17.313 39.7626C17.1792 39.7626 17.0476 39.7598 16.916 39.7548C13.4109 39.6171 10.3537 37.6807 8.59116 34.819C7.78462 33.5113 7.25108 32.0102 7.07071 30.3977C7.44933 32.6016 9.31591 34.2727 11.566 34.2727C12.3546 34.2727 13.0946 34.0687 13.7413 33.7075C13.7462 33.7047 13.7516 33.7019 13.757 33.6997L13.9888 33.5565L14.9324 32.9834L16.1333 32.2516V32.217L16.2882 32.1217L27.0337 25.5705L27.8608 25.0667L27.9432 25.0956C27.9459 25.0956 27.9508 25.0984 27.9535 25.0984C28.1907 25.1592 28.4225 25.2417 28.6441 25.3426C29.157 25.5705 29.6207 25.8944 30.0177 26.2896C30.1775 26.4462 30.3243 26.6157 30.4608 26.7963C30.5767 26.9473 30.6824 27.1067 30.7777 27.2734C31.1942 27.9886 31.4342 28.8297 31.4342 29.726Z" fill="url(#paint1_linear_36_2237)"/>\n\t<path d="M16.136 7.86297L16.1322 32.2505L14.9314 32.9829L13.9873 33.5554L13.7549 33.7003C13.7511 33.7003 13.7441 33.7042 13.7408 33.7075C13.093 34.0665 12.3531 34.2733 11.5639 34.2733C9.31325 34.2733 7.44992 32.6022 7.06913 30.3982C7.05126 30.2968 7.03772 30.1914 7.02688 30.09C7.0128 29.8977 7.00251 29.7093 6.99872 29.517V2.07043C6.99872 1.20422 7.6823 0.497437 8.52729 0.497437C8.84417 0.497437 9.13991 0.598884 9.38312 0.765548L14.0571 3.90819C14.0821 3.92993 14.1097 3.94832 14.1384 3.96616C15.3468 4.81453 16.136 6.24259 16.136 7.86297Z" fill="url(#paint2_linear_36_2237)"/>\n\t<path opacity="0.15" d="M31.4342 29.726C31.4342 30.0337 31.406 30.3308 31.354 30.6201C31.3383 30.697 31.3232 30.7739 31.3053 30.8508C31.2717 30.9885 31.236 31.1212 31.1921 31.2538C31.1688 31.3229 31.1455 31.3915 31.12 31.4578C31.094 31.527 31.0659 31.5933 31.0377 31.6618C30.9527 31.8636 30.8519 32.057 30.7387 32.2427C30.5919 32.4868 30.4245 32.7148 30.2387 32.9272C29.3856 33.8981 26.4883 35.6294 25.4206 36.3329L23.0503 37.8234C21.3138 38.9248 19.6714 39.7041 17.6017 39.757C17.5037 39.7598 17.4084 39.7626 17.313 39.7626C17.1792 39.7626 17.0476 39.7598 16.916 39.7548C13.4109 39.6171 10.3537 37.6807 8.59116 34.819C7.78462 33.5113 7.25108 32.0102 7.07071 30.3977C7.44933 32.6016 9.31591 34.2727 11.566 34.2727C12.3546 34.2727 13.0946 34.0687 13.7413 33.7075C13.7462 33.7047 13.7516 33.7019 13.757 33.6997L13.9888 33.5565L14.9324 32.9834L16.1333 32.2516V32.217L16.2882 32.1217L27.0337 25.5705L27.8608 25.0667L27.9432 25.0956C27.9459 25.0956 27.9508 25.0984 27.9535 25.0984C28.1907 25.1592 28.4225 25.2417 28.6441 25.3426C29.157 25.5705 29.6207 25.8944 30.0177 26.2896C30.1775 26.4462 30.3243 26.6157 30.4608 26.7963C30.5767 26.9473 30.6824 27.1067 30.7777 27.2734C31.1942 27.9886 31.4342 28.8297 31.4342 29.726Z" fill="url(#paint3_linear_36_2237)"/>\n\t<path opacity="0.1" d="M16.136 7.86297L16.1322 32.2505L14.9314 32.9829L13.9873 33.5554L13.7549 33.7003C13.7511 33.7003 13.7441 33.7042 13.7408 33.7075C13.093 34.0665 12.3531 34.2733 11.5639 34.2733C9.31325 34.2733 7.44992 32.6022 7.06913 30.3982C7.05126 30.2968 7.03772 30.1914 7.02688 30.09C7.0128 29.8977 7.00251 29.7093 6.99872 29.517V2.07043C6.99872 1.20422 7.6823 0.497437 8.52729 0.497437C8.84417 0.497437 9.13991 0.598884 9.38312 0.765548L14.0571 3.90819C14.0821 3.92993 14.1097 3.94832 14.1384 3.96616C15.3468 4.81453 16.136 6.24259 16.136 7.86297Z" fill="url(#paint4_linear_36_2237)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2237" x1="16.8807" y1="17.4929" x2="33.8581" y2="27.0181" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2237" x1="7.06963" y1="32.4141" x2="31.434" y2="32.4141" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2237" x1="11.5673" y1="34.6181" x2="11.5673" y2="1.09224" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2237" x1="11.9125" y1="38.6019" x2="27.3787" y2="23.5724" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2237" x1="11.5673" y1="0.497437" x2="11.5673" y2="34.273" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2237">\n\t<rect width="26" height="40" fill="white" transform="translate(7)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo48='<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2238)">\n\t<path d="M39.9984 30.8459C39.9984 31.3134 39.9731 31.7783 39.9224 32.2365C39.6211 35.0311 38.4158 37.5581 36.6011 39.5126C36.8298 39.2578 37.0358 38.9842 37.2165 38.6912C37.3558 38.4685 37.4798 38.2364 37.5845 37.9943C37.6224 37.9147 37.6571 37.8317 37.6858 37.7494C37.7204 37.6698 37.7491 37.5869 37.7744 37.5046C37.8031 37.4284 37.8284 37.3488 37.8504 37.2692C37.8724 37.1862 37.8951 37.104 37.9138 37.021C37.9171 37.0117 37.9204 37.0016 37.9231 36.9923C37.9424 36.9093 37.9578 36.8271 37.9738 36.7441C37.9898 36.6585 38.0058 36.5722 38.0184 36.4866C38.0184 36.4832 38.0184 36.4832 38.0184 36.4806C38.0311 36.401 38.0404 36.3214 38.0471 36.2384C38.0664 36.0505 38.0758 35.8632 38.0758 35.6719C38.0758 34.5963 37.7804 33.587 37.2638 32.7281C37.1465 32.5275 37.0165 32.3368 36.8738 32.1556C36.7058 31.9388 36.5251 31.7355 36.3285 31.5475C35.8398 31.0733 35.2691 30.6847 34.6378 30.4111C34.3651 30.29 34.0798 30.1917 33.7878 30.1181C33.7845 30.1181 33.7785 30.1148 33.7751 30.1148L33.6738 30.08L32.1958 29.571V29.5676L28.3292 28.2339C28.3165 28.2305 28.3005 28.2305 28.2912 28.2279L28.0498 28.1389C27.2725 27.8332 26.6285 27.2607 26.2258 26.5316L24.8145 22.9189L23.1965 18.7812L22.8859 17.9826L22.8065 17.82C22.7179 17.6033 22.6699 17.3679 22.6699 17.1231C22.6699 17.0595 22.6699 16.996 22.6765 16.9384C22.7685 16.0281 23.5392 15.3151 24.4719 15.3151C24.7192 15.3151 24.9572 15.3659 25.1732 15.4582L32.3785 19.1652L33.7998 19.8942C34.5518 20.3431 35.2525 20.8715 35.8931 21.4668C38.2151 23.6059 39.7378 26.6038 39.9664 29.9556C39.9858 30.2512 39.9984 30.5469 39.9984 30.8459Z" fill="url(#paint0_linear_36_2238)"/>\n\t<path d="M38.0729 35.6713C38.0729 36.0405 38.0382 36.397 37.9742 36.7442C37.9549 36.8365 37.9362 36.9288 37.9142 37.0211C37.8729 37.1863 37.8289 37.3455 37.7749 37.5047C37.7462 37.5876 37.7175 37.6699 37.6862 37.7495C37.6542 37.8324 37.6195 37.912 37.5849 37.9943C37.4802 38.2365 37.3562 38.4686 37.2169 38.6913C37.0362 38.9843 36.8295 39.2578 36.6015 39.5127C35.5516 40.6779 31.9856 42.7554 30.6716 43.5996L27.7543 45.3882C25.6169 46.7099 23.5956 47.645 21.0483 47.7085C20.9276 47.7119 20.8103 47.7152 20.693 47.7152C20.5283 47.7152 20.3663 47.7119 20.2043 47.7058C15.8903 47.5406 12.1277 45.2169 9.95836 41.7829C8.9657 40.2137 8.30903 38.4124 8.08704 36.4773C8.55303 39.1221 10.8504 41.1274 13.6197 41.1274C14.5903 41.1274 15.501 40.8826 16.297 40.4491C16.303 40.4458 16.3097 40.4424 16.3163 40.4398L16.6017 40.2678L17.763 39.5802L19.241 38.702V38.6605L19.4316 38.5461L32.6569 30.6847L33.6749 30.0801L33.7762 30.1149C33.7796 30.1149 33.7856 30.1182 33.7889 30.1182C34.0809 30.1911 34.3662 30.2901 34.6389 30.4112C35.2702 30.6848 35.8409 31.0734 36.3295 31.5476C36.5262 31.7356 36.7069 31.9389 36.8749 32.1556C37.0175 32.3369 37.1475 32.5282 37.2649 32.7282C37.7775 33.5864 38.0729 34.5957 38.0729 35.6713Z" fill="url(#paint1_linear_36_2238)"/>\n\t<path d="M19.2443 9.43556L19.2397 38.7006L17.7617 39.5795L16.5997 40.2664L16.3137 40.4403C16.309 40.4403 16.3004 40.445 16.2964 40.449C15.499 40.8798 14.5884 41.128 13.617 41.128C10.8471 41.128 8.55374 39.1227 8.08508 36.4779C8.06308 36.3561 8.04641 36.2297 8.03308 36.108C8.01575 35.8772 8.00308 35.6511 7.99841 35.4204V2.48452C7.99841 1.44507 8.83974 0.596924 9.87974 0.596924C10.2697 0.596924 10.6337 0.718661 10.9331 0.918657L16.6857 4.68983C16.7164 4.71591 16.7504 4.73799 16.7857 4.75939C18.273 5.77743 19.2443 7.49111 19.2443 9.43556Z" fill="url(#paint2_linear_36_2238)"/>\n\t<path opacity="0.15" d="M38.0729 35.6713C38.0729 36.0405 38.0382 36.397 37.9742 36.7442C37.9549 36.8365 37.9362 36.9288 37.9142 37.0211C37.8729 37.1863 37.8289 37.3455 37.7749 37.5047C37.7462 37.5876 37.7175 37.6699 37.6862 37.7495C37.6542 37.8324 37.6195 37.912 37.5849 37.9943C37.4802 38.2365 37.3562 38.4686 37.2169 38.6913C37.0362 38.9843 36.8302 39.2578 36.6015 39.5127C35.5516 40.6779 31.9856 42.7554 30.6716 43.5996L27.7543 45.3882C25.6169 46.7099 23.5956 47.645 21.0483 47.7085C20.9276 47.7119 20.8103 47.7152 20.693 47.7152C20.5283 47.7152 20.3663 47.7119 20.2043 47.7058C15.8903 47.5406 12.1277 45.2169 9.95836 41.7829C8.9657 40.2137 8.30903 38.4124 8.08704 36.4773C8.55303 39.1221 10.8504 41.1274 13.6197 41.1274C14.5903 41.1274 15.501 40.8826 16.297 40.4491C16.303 40.4458 16.3097 40.4424 16.3163 40.4398L16.6017 40.2678L17.763 39.5802L19.241 38.702V38.6605L19.4316 38.5461L32.6569 30.6847L33.6749 30.0801L33.7762 30.1149C33.7796 30.1149 33.7856 30.1182 33.7889 30.1182C34.0809 30.1911 34.3662 30.2901 34.6389 30.4112C35.2702 30.6848 35.8409 31.0734 36.3295 31.5476C36.5262 31.7356 36.7069 31.9389 36.8749 32.1556C37.0175 32.3369 37.1475 32.5282 37.2649 32.7282C37.7775 33.5864 38.0729 34.5957 38.0729 35.6713Z" fill="url(#paint3_linear_36_2238)"/>\n\t<path opacity="0.1" d="M19.2443 9.43556L19.2397 38.7006L17.7617 39.5795L16.5997 40.2664L16.3137 40.4403C16.309 40.4403 16.3004 40.445 16.2964 40.449C15.499 40.8798 14.5884 41.128 13.617 41.128C10.8471 41.128 8.55374 39.1227 8.08508 36.4779C8.06308 36.3561 8.04641 36.2297 8.03308 36.108C8.01575 35.8772 8.00308 35.6511 7.99841 35.4204V2.48452C7.99841 1.44507 8.83974 0.596924 9.87974 0.596924C10.2697 0.596924 10.6337 0.718661 10.9331 0.918657L16.6857 4.68983C16.7164 4.71591 16.7504 4.73799 16.7857 4.75939C18.273 5.77743 19.2443 7.49111 19.2443 9.43556Z" fill="url(#paint4_linear_36_2238)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2238" x1="20.1609" y1="20.9915" x2="40.7995" y2="32.8677" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2238" x1="8.0857" y1="38.897" x2="38.0727" y2="38.897" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2238" x1="13.6213" y1="41.5417" x2="13.6213" y2="1.31069" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2238" x1="14.0461" y1="46.3224" x2="32.6131" y2="27.8171" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2238" x1="13.6213" y1="0.596924" x2="13.6213" y2="41.1276" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2238">\n\t<rect width="32" height="48" fill="white" transform="translate(8)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogo56='<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g clip-path="url(#clip0_36_2239)">\n\t<path d="M46.9982 35.9868C46.9982 36.5323 46.9689 37.0747 46.9103 37.6092C46.5619 40.8696 45.1683 43.8178 43.0701 46.098C43.3344 45.8007 43.5726 45.4815 43.7815 45.1397C43.9426 44.8799 44.086 44.6091 44.207 44.3266C44.251 44.2337 44.291 44.137 44.3242 44.041C44.3643 43.9481 44.3974 43.8514 44.4267 43.7554C44.4599 43.6664 44.4892 43.5736 44.5146 43.4807C44.54 43.3839 44.5662 43.2879 44.5878 43.1912C44.5917 43.1803 44.5955 43.1685 44.5986 43.1576C44.621 43.0609 44.6387 42.9649 44.6572 42.8681C44.6757 42.7682 44.6942 42.6675 44.7088 42.5677C44.7088 42.5638 44.7088 42.5638 44.7088 42.5606C44.7235 42.4678 44.7343 42.3749 44.742 42.2781C44.7643 42.0589 44.7751 41.8404 44.7751 41.6172C44.7751 40.3624 44.4336 39.1848 43.8363 38.1828C43.7006 37.9487 43.5503 37.7263 43.3853 37.5148C43.1911 37.262 42.9822 37.0247 42.7548 36.8054C42.1898 36.2522 41.5299 35.7988 40.8 35.4796C40.4847 35.3384 40.1548 35.2236 39.8172 35.1378C39.8133 35.1378 39.8064 35.1339 39.8025 35.1339L39.6853 35.0933L37.9764 34.4995V34.4956L33.5056 32.9395C33.491 32.9356 33.4725 32.9356 33.4617 32.9325L33.1826 32.8287C32.2838 32.4721 31.5392 31.8041 31.0736 30.9535L29.4418 26.7387L27.571 21.9114L27.2118 20.9796L27.1201 20.79C27.0175 20.5372 26.962 20.2625 26.962 19.9769C26.962 19.9027 26.962 19.8286 26.9697 19.7615C27.0761 18.6994 27.9672 17.8676 29.0456 17.8676C29.3316 17.8676 29.6068 17.9269 29.8565 18.0346L38.1876 22.3593L39.831 23.2099C40.7005 23.7336 41.5107 24.35 42.2514 25.0446C44.9362 27.5402 46.6968 31.0378 46.9612 34.9482C46.9836 35.2931 46.9982 35.638 46.9982 35.9868Z" fill="url(#paint0_linear_36_2239)"/>\n\t<path d="M44.7717 41.6165C44.7717 42.0472 44.7316 42.4631 44.6576 42.8682C44.6353 42.9758 44.6137 43.0835 44.5883 43.1912C44.5405 43.384 44.4896 43.5697 44.4272 43.7554C44.394 43.8522 44.3609 43.9482 44.3246 44.041C44.2876 44.1378 44.2475 44.2307 44.2075 44.3267C44.0864 44.6092 43.9431 44.8799 43.782 45.1398C43.5731 45.4816 43.3341 45.8008 43.0705 46.0981C41.8564 47.4575 37.7333 49.8813 36.214 50.8661L32.8408 52.9528C30.3695 54.4948 28.0324 55.5858 25.087 55.6599C24.9475 55.6638 24.8119 55.6677 24.6762 55.6677C24.4858 55.6677 24.2985 55.6638 24.1112 55.6568C19.1231 55.464 14.7726 52.753 12.2643 48.7466C11.1165 46.9159 10.3573 44.8144 10.1006 42.5568C10.6394 45.6424 13.2957 47.9819 16.4977 47.9819C17.62 47.9819 18.673 47.6963 19.5933 47.1906C19.6003 47.1867 19.608 47.1828 19.6157 47.1797L19.9456 46.9791L21.2884 46.1769L22.9973 45.1523V45.1039L23.2178 44.9705L38.5095 35.7988L39.6866 35.0934L39.8037 35.134C39.8076 35.134 39.8145 35.1379 39.8184 35.1379C40.156 35.2229 40.4859 35.3384 40.8012 35.4797C41.5311 35.7988 42.191 36.2522 42.756 36.8055C42.9834 37.0248 43.1923 37.262 43.3865 37.5149C43.5515 37.7263 43.7018 37.9495 43.8375 38.1828C44.4302 39.1841 44.7717 40.3616 44.7717 41.6165Z" fill="url(#paint1_linear_36_2239)"/>\n\t<path d="M23.0013 11.0082L22.9959 45.1507L21.287 46.1761L19.9434 46.9775L19.6127 47.1804C19.6073 47.1804 19.5973 47.1859 19.5927 47.1906C18.6708 47.6931 17.6178 47.9826 16.4947 47.9826C13.2919 47.9826 10.6403 45.6431 10.0984 42.5575C10.0729 42.4155 10.0537 42.268 10.0383 42.126C10.0182 41.8568 10.0036 41.593 9.99817 41.3238V2.8986C9.99817 1.68591 10.971 0.696411 12.1734 0.696411C12.6244 0.696411 13.0453 0.838438 13.3914 1.07177L20.0428 5.47146C20.0783 5.5019 20.1176 5.52765 20.1585 5.55262C21.8782 6.74034 23.0013 8.73963 23.0013 11.0082Z" fill="url(#paint2_linear_36_2239)"/>\n\t<path opacity="0.15" d="M44.7717 41.6165C44.7717 42.0472 44.7316 42.4631 44.6576 42.8682C44.6353 42.9758 44.6137 43.0835 44.5883 43.1912C44.5405 43.384 44.4896 43.5697 44.4272 43.7554C44.394 43.8522 44.3609 43.9482 44.3246 44.041C44.2876 44.1378 44.2475 44.2307 44.2075 44.3267C44.0864 44.6092 43.9431 44.8799 43.782 45.1398C43.5731 45.4816 43.3349 45.8008 43.0705 46.0981C41.8564 47.4575 37.7333 49.8813 36.214 50.8661L32.8408 52.9528C30.3695 54.4948 28.0324 55.5858 25.087 55.6599C24.9475 55.6638 24.8119 55.6677 24.6762 55.6677C24.4858 55.6677 24.2985 55.6638 24.1112 55.6568C19.1231 55.464 14.7726 52.753 12.2643 48.7466C11.1165 46.9159 10.3573 44.8144 10.1006 42.5568C10.6394 45.6424 13.2957 47.9819 16.4977 47.9819C17.62 47.9819 18.673 47.6963 19.5933 47.1906C19.6003 47.1867 19.608 47.1828 19.6157 47.1797L19.9456 46.9791L21.2884 46.1769L22.9973 45.1523V45.1039L23.2178 44.9705L38.5095 35.7988L39.6866 35.0934L39.8037 35.134C39.8076 35.134 39.8145 35.1379 39.8184 35.1379C40.156 35.2229 40.4859 35.3384 40.8012 35.4797C41.5311 35.7988 42.191 36.2522 42.756 36.8055C42.9834 37.0248 43.1923 37.262 43.3865 37.5149C43.5515 37.7263 43.7018 37.9495 43.8375 38.1828C44.4302 39.1841 44.7717 40.3616 44.7717 41.6165Z" fill="url(#paint3_linear_36_2239)"/>\n\t<path opacity="0.1" d="M23.0013 11.0082L22.9959 45.1507L21.287 46.1761L19.9434 46.9775L19.6127 47.1804C19.6073 47.1804 19.5973 47.1859 19.5927 47.1906C18.6708 47.6931 17.6178 47.9826 16.4947 47.9826C13.2919 47.9826 10.6403 45.6431 10.0984 42.5575C10.0729 42.4155 10.0537 42.268 10.0383 42.126C10.0182 41.8568 10.0036 41.593 9.99817 41.3238V2.8986C9.99817 1.68591 10.971 0.696411 12.1734 0.696411C12.6244 0.696411 13.0453 0.838438 13.3914 1.07177L20.0428 5.47146C20.0783 5.5019 20.1176 5.52765 20.1585 5.55262C21.8782 6.74034 23.0013 8.73963 23.0013 11.0082Z" fill="url(#paint4_linear_36_2239)"/>\n\t</g>\n\t<defs>\n\t<linearGradient id="paint0_linear_36_2239" x1="24.061" y1="24.49" x2="48.0304" y2="38.1597" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_36_2239" x1="10.099" y1="45.3798" x2="44.7715" y2="45.3798" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint2_linear_36_2239" x1="16.4996" y1="48.4653" x2="16.4996" y2="1.52914" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint3_linear_36_2239" x1="16.9908" y1="54.0427" x2="38.6508" y2="32.6475" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint4_linear_36_2239" x1="16.4996" y1="0.696411" x2="16.4996" y2="47.9822" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_36_2239">\n\t<rect width="37" height="56" fill="white" transform="translate(10)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogoWithBubble12='<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20275)">\n\t<path d="M8 1C11.3137 1 14 3.68589 14 6.99911C14 10.3123 11.3137 12.9982 8 12.9982C7.33301 12.9982 6.68145 12.8891 6.06567 12.6795C5.5001 12.4871 4.89307 12.3967 4.31492 12.5472L2.63923 12.9834C2.36666 13.0544 2.08814 12.891 2.01715 12.6185C1.99519 12.5342 1.99519 12.4458 2.01713 12.3615L2.45268 10.6886C2.6034 10.1097 2.51262 9.5019 2.31959 8.93572C2.10944 8.3193 2 7.66695 2 6.99911C2 3.68589 4.68629 1 8 1Z" fill="url(#paint0_linear_1360_20275)"/>\n\t<path d="M2.51314 12.4996L2.51327 12.4995L4.18896 12.0633C4.89676 11.8791 5.61009 11.9963 6.22675 12.2062C6.79062 12.3981 7.38777 12.4982 8 12.4982C11.0376 12.4982 13.5 10.0361 13.5 6.99911C13.5 3.9621 11.0376 1.5 8 1.5C4.96236 1.5 2.5 3.9621 2.5 6.99911C2.5 7.61211 2.60041 8.20995 2.79284 8.77437C3.00329 9.39164 3.12106 10.1059 2.93655 10.8146L2.501 12.4874L2.51314 12.4996ZM2.51314 12.4996C2.51092 12.5001 2.50993 12.5 2.5094 12.4999C2.50851 12.4998 2.50714 12.4994 2.5056 12.4985C2.50406 12.4976 2.50304 12.4966 2.5025 12.4959C2.50217 12.4955 2.50158 12.4946 2.501 12.4924L2.50098 12.4924M2.51314 12.4996L2.50098 12.4924M2.50098 12.4924C2.50059 12.4908 2.50056 12.4891 2.501 12.4874L2.50098 12.4924Z" stroke="url(#paint1_linear_1360_20275)"/>\n\t<path d="M2.51314 12.4996L2.51327 12.4995L4.18896 12.0633C4.89676 11.8791 5.61009 11.9963 6.22675 12.2062C6.79062 12.3981 7.38777 12.4982 8 12.4982C11.0376 12.4982 13.5 10.0361 13.5 6.99911C13.5 3.9621 11.0376 1.5 8 1.5C4.96236 1.5 2.5 3.9621 2.5 6.99911C2.5 7.61211 2.60041 8.20995 2.79284 8.77437C3.00329 9.39164 3.12106 10.1059 2.93655 10.8146L2.501 12.4874L2.51314 12.4996ZM2.51314 12.4996C2.51092 12.5001 2.50993 12.5 2.5094 12.4999C2.50851 12.4998 2.50714 12.4994 2.5056 12.4985C2.50406 12.4976 2.50304 12.4966 2.5025 12.4959C2.50217 12.4955 2.50158 12.4946 2.501 12.4924L2.50098 12.4924M2.51314 12.4996L2.50098 12.4924M2.50098 12.4924C2.50059 12.4908 2.50056 12.4891 2.501 12.4874L2.50098 12.4924Z" stroke="url(#paint2_radial_1360_20275)" stroke-opacity="0.6"/>\n\t<path d="M2.51314 12.4996L2.51327 12.4995L4.18896 12.0633C4.89676 11.8791 5.61009 11.9963 6.22675 12.2062C6.79062 12.3981 7.38777 12.4982 8 12.4982C11.0376 12.4982 13.5 10.0361 13.5 6.99911C13.5 3.9621 11.0376 1.5 8 1.5C4.96236 1.5 2.5 3.9621 2.5 6.99911C2.5 7.61211 2.60041 8.20995 2.79284 8.77437C3.00329 9.39164 3.12106 10.1059 2.93655 10.8146L2.501 12.4874L2.51314 12.4996ZM2.51314 12.4996C2.51092 12.5001 2.50993 12.5 2.5094 12.4999C2.50851 12.4998 2.50714 12.4994 2.5056 12.4985C2.50406 12.4976 2.50304 12.4966 2.5025 12.4959C2.50217 12.4955 2.50158 12.4946 2.501 12.4924L2.50098 12.4924M2.51314 12.4996L2.50098 12.4924M2.50098 12.4924C2.50059 12.4908 2.50056 12.4891 2.501 12.4874L2.50098 12.4924Z" stroke="url(#paint3_radial_1360_20275)" stroke-opacity="0.8"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20275)" filter="url(#filter1_i_1360_20275)">\n\t<g clip-path="url(#clip1_1360_20275)">\n\t<path d="M10.6998 8.02689C10.6998 8.09702 10.696 8.16675 10.6884 8.23548C10.6432 8.65467 10.4624 9.03373 10.1902 9.3269C10.2245 9.28867 10.2554 9.24764 10.2825 9.20369C10.3034 9.17028 10.322 9.13546 10.3377 9.09914C10.3434 9.0872 10.3486 9.07476 10.3529 9.06242C10.3581 9.05048 10.3624 9.03804 10.3662 9.0257C10.3705 9.01426 10.3743 9.00232 10.3776 8.99038C10.3809 8.97794 10.3843 8.9656 10.3871 8.95316C10.3876 8.95176 10.3881 8.95025 10.3885 8.94885C10.3914 8.9364 10.3937 8.92406 10.3961 8.91162C10.3985 8.89878 10.4009 8.88584 10.4028 8.87299C10.4028 8.87249 10.4028 8.87249 10.4028 8.87209C10.4047 8.86015 10.4061 8.84821 10.4071 8.83577C10.41 8.80758 10.4114 8.77948 10.4114 8.75079C10.4114 8.58945 10.3671 8.43805 10.2896 8.30922C10.272 8.27913 10.2525 8.25053 10.2311 8.22334C10.2059 8.19083 10.1788 8.16033 10.1493 8.13214C10.076 8.061 9.99045 8.00271 9.89575 7.96167C9.85485 7.94351 9.81205 7.92876 9.76825 7.91773C9.76775 7.91773 9.76685 7.91723 9.76635 7.91723L9.75115 7.91201L9.52945 7.83566V7.83515L8.94945 7.63509C8.94755 7.63459 8.94515 7.63459 8.94375 7.63419L8.90755 7.62084C8.79095 7.57499 8.69435 7.48911 8.63395 7.37974L8.42225 6.83785L8.17956 6.21719L8.13296 6.09739L8.12106 6.07301C8.10776 6.0405 8.10056 6.00519 8.10056 5.96846C8.10056 5.95893 8.10056 5.9494 8.10156 5.94077C8.11536 5.80422 8.23095 5.69727 8.37085 5.69727C8.40795 5.69727 8.44365 5.70489 8.47605 5.71874L9.55685 6.27478L9.77005 6.38414C9.88285 6.45147 9.98795 6.53073 10.084 6.62002C10.4323 6.94089 10.6607 7.39058 10.695 7.89335C10.6979 7.93769 10.6998 7.98204 10.6998 8.02689Z" fill="url(#paint4_linear_1360_20275)"/>\n\t<path d="M10.411 8.75067C10.411 8.80605 10.4058 8.85953 10.3962 8.9116C10.3933 8.92545 10.3905 8.93929 10.3872 8.95314C10.381 8.97792 10.3744 9.0018 10.3663 9.02568C10.362 9.03812 10.3577 9.05046 10.353 9.0624C10.3482 9.07484 10.343 9.08678 10.3378 9.09912C10.3221 9.13544 10.3035 9.17026 10.2826 9.20367C10.2555 9.24762 10.2245 9.28865 10.1903 9.32688C10.0328 9.50166 9.4979 9.81329 9.3008 9.93991L8.8632 10.2082C8.5426 10.4065 8.2394 10.5467 7.85731 10.5563C7.83921 10.5568 7.82161 10.5573 7.80401 10.5573C7.77931 10.5573 7.75501 10.5568 7.73071 10.5559C7.08361 10.5311 6.51921 10.1825 6.19381 9.66741C6.04492 9.43203 5.94642 9.16183 5.91312 8.87157C5.98302 9.26828 6.32761 9.56908 6.74301 9.56908C6.88861 9.56908 7.02521 9.53236 7.14461 9.46734C7.14551 9.46684 7.14651 9.46634 7.14751 9.46594L7.19031 9.44015L7.36451 9.33701L7.58621 9.20527V9.19905L7.61481 9.1819L9.5986 8.00269L9.7513 7.91199L9.7665 7.9172C9.767 7.9172 9.7679 7.91771 9.7684 7.91771C9.8122 7.92864 9.85499 7.94349 9.89589 7.96165C9.99059 8.00269 10.0762 8.06098 10.1495 8.13212C10.179 8.16031 10.2061 8.19081 10.2313 8.22332C10.2527 8.25051 10.2722 8.2792 10.2898 8.3092C10.3667 8.43793 10.411 8.58933 10.411 8.75067Z" fill="url(#paint5_linear_1360_20275)"/>\n\t<path d="M7.5867 4.8153L7.586 9.20505L7.3643 9.33689L7.19 9.43993L7.1471 9.46602C7.1464 9.46602 7.1451 9.46672 7.1445 9.46732C7.0249 9.53193 6.88831 9.56916 6.74261 9.56916C6.32711 9.56916 5.98311 9.26836 5.91281 8.87165C5.90951 8.85338 5.90701 8.83442 5.90501 8.81616C5.90241 8.78155 5.90051 8.74763 5.89981 8.71302V3.77264C5.89981 3.61672 6.02601 3.4895 6.18201 3.4895C6.24051 3.4895 6.29511 3.50776 6.34001 3.53776L7.2029 4.10344C7.2075 4.10735 7.2126 4.11066 7.2179 4.11387C7.441 4.26658 7.5867 4.52363 7.5867 4.8153Z" fill="url(#paint6_linear_1360_20275)"/>\n\t<path opacity="0.15" d="M10.411 8.75067C10.411 8.80605 10.4058 8.85953 10.3962 8.9116C10.3933 8.92545 10.3905 8.93929 10.3872 8.95314C10.381 8.97792 10.3744 9.0018 10.3663 9.02568C10.362 9.03812 10.3577 9.05046 10.353 9.0624C10.3482 9.07484 10.343 9.08678 10.3378 9.09912C10.3221 9.13544 10.3035 9.17026 10.2826 9.20367C10.2555 9.24762 10.2246 9.28865 10.1903 9.32688C10.0328 9.50166 9.4979 9.81329 9.3008 9.93991L8.8632 10.2082C8.5426 10.4065 8.2394 10.5467 7.85731 10.5563C7.83921 10.5568 7.82161 10.5573 7.80401 10.5573C7.77931 10.5573 7.75501 10.5568 7.73071 10.5559C7.08361 10.5311 6.51921 10.1825 6.19381 9.66741C6.04492 9.43203 5.94642 9.16183 5.91312 8.87157C5.98302 9.26828 6.32761 9.56908 6.74301 9.56908C6.88861 9.56908 7.02521 9.53236 7.14461 9.46734C7.14551 9.46684 7.14651 9.46634 7.14751 9.46594L7.19031 9.44015L7.36451 9.33701L7.58621 9.20527V9.19905L7.61481 9.1819L9.5986 8.00269L9.7513 7.91199L9.7665 7.9172C9.767 7.9172 9.7679 7.91771 9.7684 7.91771C9.8122 7.92864 9.85499 7.94349 9.89589 7.96165C9.99059 8.00269 10.0762 8.06098 10.1495 8.13212C10.179 8.16031 10.2061 8.19081 10.2313 8.22332C10.2527 8.25051 10.2722 8.2792 10.2898 8.3092C10.3667 8.43793 10.411 8.58933 10.411 8.75067Z" fill="url(#paint7_linear_1360_20275)"/>\n\t<path opacity="0.1" d="M7.5867 4.8153L7.586 9.20505L7.3643 9.33689L7.19 9.43993L7.1471 9.46602C7.1464 9.46602 7.1451 9.46672 7.1445 9.46732C7.0249 9.53193 6.88831 9.56916 6.74261 9.56916C6.32711 9.56916 5.98311 9.26836 5.91281 8.87165C5.90951 8.85338 5.90701 8.83442 5.90501 8.81616C5.90241 8.78155 5.90051 8.74763 5.89981 8.71302V3.77264C5.89981 3.61672 6.02601 3.4895 6.18201 3.4895C6.24051 3.4895 6.29511 3.50776 6.34001 3.53776L7.2029 4.10344C7.2075 4.10735 7.2126 4.11066 7.2179 4.11387C7.441 4.26658 7.5867 4.52363 7.5867 4.8153Z" fill="url(#paint8_linear_1360_20275)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20275" x="0.8" y="0.4" width="14.4" height="14.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.3"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20275"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="0.6"/>\n\t<feGaussianBlur stdDeviation="0.6"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20275" result="effect2_dropShadow_1360_20275"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20275" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20275" x="4.40002" y="3.40002" width="7.20001" height="8.09995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="0.9"/>\n\t<feGaussianBlur stdDeviation="1.4625"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20275"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20275" x1="8" y1="1" x2="8" y2="13" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20275" x1="2.0458" y1="15.25" x2="15.5215" y2="13.2641" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20275" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.10714 11.7143) rotate(14.0362) scale(10.6023)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20275" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.07143 5.28571) rotate(-140.774) scale(6.77716)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20275" x1="7.72421" y1="6.54873" x2="10.82" y2="8.33016" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20275" x1="5.91292" y1="9.23453" x2="10.411" y2="9.23453" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20275" x1="6.74325" y1="9.63121" x2="6.74325" y2="3.59657" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20275" x1="6.80698" y1="10.3483" x2="9.59203" y2="7.57253" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20275" x1="6.74325" y1="3.4895" x2="6.74325" y2="9.5691" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20275">\n\t<rect width="7.2" height="7.2" fill="white" transform="translate(4.40002 3.40002)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20275">\n\t<rect width="4.8" height="7.2" fill="white" transform="translate(5.90002 3.40002)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>\n\t',CibLogoIcons.CibLogoWithBubble16='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20276)">\n\t<path d="M10 1C14.4182 1 18 4.58119 18 8.99881C18 13.4164 14.4182 16.9976 10 16.9976C9.11068 16.9976 8.24193 16.8521 7.42089 16.5727C6.6668 16.3161 5.85743 16.1956 5.08656 16.3963L2.8523 16.9779C2.48888 17.0726 2.11752 16.8547 2.02286 16.4913C1.99359 16.379 1.99358 16.261 2.02284 16.1486L2.60357 13.9181C2.80453 13.1463 2.68349 12.3359 2.42612 11.581C2.14592 10.7591 2 9.88926 2 8.99881C2 4.58119 5.58172 1 10 1Z" fill="url(#paint0_linear_1360_20276)"/>\n\t<path d="M2.72635 16.494L2.72622 16.494C2.63005 16.5191 2.53177 16.4614 2.50672 16.3653L2.5067 16.3652C2.49898 16.3356 2.49896 16.3044 2.50671 16.2746L3.08744 14.0441C3.3222 13.1424 3.17416 12.2256 2.89937 11.4196C2.63689 10.6497 2.5 9.83442 2.5 8.99881C2.5 4.8574 5.85779 1.5 10 1.5C14.1422 1.5 17.5 4.8574 17.5 8.99881C17.5 13.1402 14.1422 16.4976 10 16.4976C9.16544 16.4976 8.3511 16.3611 7.58197 16.0994C6.77679 15.8254 5.86112 15.678 4.9606 15.9124L2.72635 16.494Z" stroke="url(#paint1_linear_1360_20276)"/>\n\t<path d="M2.72635 16.494L2.72622 16.494C2.63005 16.5191 2.53177 16.4614 2.50672 16.3653L2.5067 16.3652C2.49898 16.3356 2.49896 16.3044 2.50671 16.2746L3.08744 14.0441C3.3222 13.1424 3.17416 12.2256 2.89937 11.4196C2.63689 10.6497 2.5 9.83442 2.5 8.99881C2.5 4.8574 5.85779 1.5 10 1.5C14.1422 1.5 17.5 4.8574 17.5 8.99881C17.5 13.1402 14.1422 16.4976 10 16.4976C9.16544 16.4976 8.3511 16.3611 7.58197 16.0994C6.77679 15.8254 5.86112 15.678 4.9606 15.9124L2.72635 16.494Z" stroke="url(#paint2_radial_1360_20276)" stroke-opacity="0.6"/>\n\t<path d="M2.72635 16.494L2.72622 16.494C2.63005 16.5191 2.53177 16.4614 2.50672 16.3653L2.5067 16.3652C2.49898 16.3356 2.49896 16.3044 2.50671 16.2746L3.08744 14.0441C3.3222 13.1424 3.17416 12.2256 2.89937 11.4196C2.63689 10.6497 2.5 9.83442 2.5 8.99881C2.5 4.8574 5.85779 1.5 10 1.5C14.1422 1.5 17.5 4.8574 17.5 8.99881C17.5 13.1402 14.1422 16.4976 10 16.4976C9.16544 16.4976 8.3511 16.3611 7.58197 16.0994C6.77679 15.8254 5.86112 15.678 4.9606 15.9124L2.72635 16.494Z" stroke="url(#paint3_radial_1360_20276)" stroke-opacity="0.8"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20276)" filter="url(#filter1_i_1360_20276)">\n\t<g clip-path="url(#clip1_1360_20276)">\n\t<path d="M13.5996 10.3691C13.5996 10.4626 13.5946 10.5556 13.5844 10.6472C13.5242 11.2061 13.2831 11.7116 12.9202 12.1025C12.9659 12.0515 13.0071 11.9968 13.0432 11.9382C13.0711 11.8936 13.0959 11.8472 13.1168 11.7988C13.1244 11.7829 13.1314 11.7663 13.1371 11.7498C13.144 11.7339 13.1498 11.7173 13.1548 11.7009C13.1606 11.6856 13.1656 11.6697 13.17 11.6538C13.1744 11.6372 13.179 11.6207 13.1827 11.6041C13.1834 11.6023 13.184 11.6003 13.1846 11.5984C13.1884 11.5818 13.1915 11.5653 13.1947 11.5487C13.1979 11.5316 13.2011 11.5144 13.2036 11.4972C13.2036 11.4966 13.2036 11.4966 13.2036 11.496C13.2062 11.4801 13.208 11.4642 13.2094 11.4476C13.2132 11.41 13.2151 11.3726 13.2151 11.3343C13.2151 11.1192 13.156 10.9173 13.0527 10.7456C13.0292 10.7054 13.0032 10.6673 12.9747 10.631C12.9411 10.5877 12.905 10.547 12.8656 10.5094C12.7679 10.4146 12.6538 10.3369 12.5275 10.2821C12.473 10.2579 12.4159 10.2383 12.3575 10.2236C12.3568 10.2236 12.3556 10.2229 12.355 10.2229L12.3347 10.2159L12.0391 10.1141V10.1135L11.2658 9.84671C11.2632 9.84604 11.26 9.84604 11.2582 9.8455L11.2099 9.82771C11.0544 9.76657 10.9256 9.65206 10.8451 9.50624L10.5628 8.78371L10.2392 7.95617L10.1771 7.79644L10.1612 7.76393C10.1435 7.72059 10.1339 7.6735 10.1339 7.62454C10.1339 7.61183 10.1339 7.59912 10.1352 7.58762C10.1536 7.40555 10.3078 7.26294 10.4943 7.26294C10.5438 7.26294 10.5914 7.27311 10.6346 7.29157L12.0756 8.03296L12.3599 8.17878C12.5103 8.26854 12.6504 8.37422 12.7786 8.49329C13.243 8.9211 13.5475 9.52069 13.5932 10.191C13.5971 10.2502 13.5996 10.3093 13.5996 10.3691Z" fill="url(#paint4_linear_1360_20276)"/>\n\t<path d="M13.2145 11.3342C13.2145 11.408 13.2076 11.4793 13.1948 11.5488C13.1909 11.5672 13.1872 11.5857 13.1828 11.6041C13.1745 11.6372 13.1657 11.669 13.1549 11.7009C13.1492 11.7175 13.1434 11.7339 13.1372 11.7498C13.1308 11.7664 13.1238 11.7823 13.1169 11.7988C13.096 11.8472 13.0712 11.8936 13.0433 11.9382C13.0072 11.9968 12.9658 12.0515 12.9202 12.1025C12.7102 12.3355 11.9971 12.751 11.7343 12.9198L11.1508 13.2776C10.7233 13.5419 10.3191 13.7289 9.8096 13.7416C9.78547 13.7423 9.762 13.743 9.73853 13.743C9.7056 13.743 9.6732 13.7423 9.6408 13.7411C8.778 13.7081 8.02548 13.2433 7.59161 12.5565C7.39308 12.2427 7.26175 11.8824 7.21735 11.4954C7.31055 12.0243 7.77001 12.4254 8.32387 12.4254C8.51801 12.4254 8.70014 12.3764 8.85934 12.2898C8.86054 12.2891 8.86187 12.2884 8.8632 12.2879L8.92027 12.2535L9.15254 12.116L9.44813 11.9403V11.932L9.48627 11.9092L12.1313 10.3369L12.3349 10.2159L12.3552 10.2229C12.3559 10.2229 12.3571 10.2236 12.3577 10.2236C12.4161 10.2381 12.4732 10.2579 12.5277 10.2822C12.654 10.3369 12.7681 10.4146 12.8658 10.5094C12.9052 10.547 12.9413 10.5877 12.9749 10.6311C13.0034 10.6673 13.0294 10.7056 13.0529 10.7456C13.1554 10.9172 13.2145 11.1191 13.2145 11.3342Z" fill="url(#paint5_linear_1360_20276)"/>\n\t<path d="M9.44886 6.08706L9.44793 11.9401L9.15233 12.1159L8.91993 12.2532L8.86273 12.288C8.8618 12.288 8.86007 12.289 8.85927 12.2898C8.6998 12.3759 8.51767 12.4255 8.3234 12.4255C7.76941 12.4255 7.31074 12.0245 7.21701 11.4955C7.21261 11.4712 7.20928 11.4459 7.20661 11.4215C7.20314 11.3754 7.20061 11.3302 7.19968 11.284V4.69685C7.19968 4.48896 7.36794 4.31934 7.57594 4.31934C7.65394 4.31934 7.72674 4.34368 7.78661 4.38368L8.93713 5.13792C8.94327 5.14313 8.95007 5.14755 8.95713 5.15183C9.2546 5.35544 9.44886 5.69817 9.44886 6.08706Z" fill="url(#paint6_linear_1360_20276)"/>\n\t<path opacity="0.15" d="M13.2145 11.3342C13.2145 11.408 13.2076 11.4793 13.1948 11.5488C13.1909 11.5672 13.1872 11.5857 13.1828 11.6041C13.1745 11.6372 13.1657 11.669 13.1549 11.7009C13.1492 11.7175 13.1434 11.7339 13.1372 11.7498C13.1308 11.7664 13.1238 11.7823 13.1169 11.7988C13.096 11.8472 13.0712 11.8936 13.0433 11.9382C13.0072 11.9968 12.966 12.0515 12.9202 12.1025C12.7102 12.3355 11.9971 12.751 11.7343 12.9198L11.1508 13.2776C10.7233 13.5419 10.3191 13.7289 9.8096 13.7416C9.78547 13.7423 9.762 13.743 9.73853 13.743C9.7056 13.743 9.6732 13.7423 9.6408 13.7411C8.778 13.7081 8.02548 13.2433 7.59161 12.5565C7.39308 12.2427 7.26175 11.8824 7.21735 11.4954C7.31055 12.0243 7.77001 12.4254 8.32387 12.4254C8.51801 12.4254 8.70014 12.3764 8.85934 12.2898C8.86054 12.2891 8.86187 12.2884 8.8632 12.2879L8.92027 12.2535L9.15254 12.116L9.44813 11.9403V11.932L9.48627 11.9092L12.1313 10.3369L12.3349 10.2159L12.3552 10.2229C12.3559 10.2229 12.3571 10.2236 12.3577 10.2236C12.4161 10.2381 12.4732 10.2579 12.5277 10.2822C12.654 10.3369 12.7681 10.4146 12.8658 10.5094C12.9052 10.547 12.9413 10.5877 12.9749 10.6311C13.0034 10.6673 13.0294 10.7056 13.0529 10.7456C13.1554 10.9172 13.2145 11.1191 13.2145 11.3342Z" fill="url(#paint7_linear_1360_20276)"/>\n\t<path opacity="0.1" d="M9.44886 6.08706L9.44793 11.9401L9.15233 12.1159L8.91993 12.2532L8.86273 12.288C8.8618 12.288 8.86007 12.289 8.85927 12.2898C8.6998 12.3759 8.51767 12.4255 8.3234 12.4255C7.76941 12.4255 7.31074 12.0245 7.21701 11.4955C7.21261 11.4712 7.20928 11.4459 7.20661 11.4215C7.20314 11.3754 7.20061 11.3302 7.19968 11.284V4.69685C7.19968 4.48896 7.36794 4.31934 7.57594 4.31934C7.65394 4.31934 7.72674 4.34368 7.78661 4.38368L8.93713 5.13792C8.94327 5.14313 8.95007 5.14755 8.95713 5.15183C9.2546 5.35544 9.44886 5.69817 9.44886 6.08706Z" fill="url(#paint8_linear_1360_20276)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20276" x="0.4" y="0.2" width="19.2" height="19.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.4"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20276"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="0.8"/>\n\t<feGaussianBlur stdDeviation="0.8"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20276" result="effect2_dropShadow_1360_20276"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20276" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20276" x="5.19998" y="4.19995" width="9.60001" height="10.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.2"/>\n\t<feGaussianBlur stdDeviation="1.95"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20276"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20276" x1="10" y1="1" x2="10" y2="17" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20276" x1="2.06107" y1="20" x2="20.0286" y2="17.3521" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20276" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.14286 15.2857) rotate(14.0362) scale(14.1364)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20276" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.42857 6.71429) rotate(-140.774) scale(9.03621)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20276" x1="9.63211" y1="8.39822" x2="13.7598" y2="10.7735" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20276" x1="7.21708" y1="11.9793" x2="13.2145" y2="11.9793" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20276" x1="8.32426" y1="12.5083" x2="8.32426" y2="4.46209" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20276" x1="8.40917" y1="13.4644" x2="12.1226" y2="9.76334" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20276" x1="8.32426" y1="4.31934" x2="8.32426" y2="12.4255" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20276">\n\t<rect width="9.6" height="9.6" fill="white" transform="translate(5.19998 4.19995)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20276">\n\t<rect width="6.4" height="9.6" fill="white" transform="translate(7.19998 4.19995)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble20='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20277)">\n\t<path d="M12 1C17.5228 1 22 5.47648 22 10.9985C22 16.5205 17.5228 20.997 12 20.997C10.8884 20.997 9.80241 20.8151 8.77611 20.4659C7.83349 20.1451 6.82179 19.9945 5.85819 20.2453L3.06538 20.9723C2.6111 21.0907 2.1469 20.8184 2.02858 20.3641C1.99199 20.2237 1.99198 20.0763 2.02855 19.9358L2.75447 17.1476C3.00566 16.1828 2.85436 15.1698 2.53265 14.2262C2.18239 13.1988 2 12.1116 2 10.9985C2 5.47648 6.47715 1 12 1Z" fill="url(#paint0_linear_1360_20277)"/>\n\t<path d="M2.93942 20.4885L2.9393 20.4885C2.75227 20.5372 2.56115 20.4251 2.51243 20.2381L2.51241 20.238C2.49738 20.1803 2.49735 20.1196 2.51242 20.0617L3.23834 17.2736C3.52333 16.179 3.34503 15.0596 3.0059 14.0649C2.67337 13.0895 2.5 12.0567 2.5 10.9985C2.5 5.7527 6.75322 1.5 12 1.5C17.2467 1.5 21.5 5.7527 21.5 10.9985C21.5 16.2443 17.2467 20.497 12 20.497C10.9431 20.497 9.91158 20.3241 8.93719 19.9926C7.94349 19.6544 6.82548 19.4769 5.73224 19.7615L2.93942 20.4885Z" stroke="url(#paint1_linear_1360_20277)"/>\n\t<path d="M2.93942 20.4885L2.9393 20.4885C2.75227 20.5372 2.56115 20.4251 2.51243 20.2381L2.51241 20.238C2.49738 20.1803 2.49735 20.1196 2.51242 20.0617L3.23834 17.2736C3.52333 16.179 3.34503 15.0596 3.0059 14.0649C2.67337 13.0895 2.5 12.0567 2.5 10.9985C2.5 5.7527 6.75322 1.5 12 1.5C17.2467 1.5 21.5 5.7527 21.5 10.9985C21.5 16.2443 17.2467 20.497 12 20.497C10.9431 20.497 9.91158 20.3241 8.93719 19.9926C7.94349 19.6544 6.82548 19.4769 5.73224 19.7615L2.93942 20.4885Z" stroke="url(#paint2_radial_1360_20277)" stroke-opacity="0.6"/>\n\t<path d="M2.93942 20.4885L2.9393 20.4885C2.75227 20.5372 2.56115 20.4251 2.51243 20.2381L2.51241 20.238C2.49738 20.1803 2.49735 20.1196 2.51242 20.0617L3.23834 17.2736C3.52333 16.179 3.34503 15.0596 3.0059 14.0649C2.67337 13.0895 2.5 12.0567 2.5 10.9985C2.5 5.7527 6.75322 1.5 12 1.5C17.2467 1.5 21.5 5.7527 21.5 10.9985C21.5 16.2443 17.2467 20.497 12 20.497C10.9431 20.497 9.91158 20.3241 8.93719 19.9926C7.94349 19.6544 6.82548 19.4769 5.73224 19.7615L2.93942 20.4885Z" stroke="url(#paint3_radial_1360_20277)" stroke-opacity="0.8"/>\n\t</g>\n\t<g filter="url(#filter1_i_1360_20277)">\n\t<g clip-path="url(#clip0_1360_20277)">\n\t<path d="M16.4996 12.7114C16.4996 12.8283 16.4933 12.9445 16.4806 13.0591C16.4053 13.7577 16.104 14.3895 15.6503 14.8781C15.7075 14.8144 15.759 14.746 15.8041 14.6728C15.839 14.6171 15.87 14.5591 15.8961 14.4985C15.9056 14.4786 15.9143 14.4579 15.9215 14.4373C15.9301 14.4174 15.9373 14.3967 15.9436 14.3761C15.9508 14.3571 15.9571 14.3372 15.9626 14.3173C15.9681 14.2965 15.9738 14.276 15.9785 14.2552C15.9793 14.2529 15.9801 14.2504 15.9808 14.248C15.9856 14.2273 15.9895 14.2067 15.9935 14.186C15.9975 14.1646 16.0015 14.143 16.0046 14.1216C16.0046 14.1208 16.0046 14.1208 16.0046 14.1201C16.0078 14.1002 16.0101 14.0803 16.0118 14.0596C16.0166 14.0126 16.019 13.9658 16.019 13.9179C16.019 13.649 15.9451 13.3967 15.816 13.182C15.7866 13.1318 15.7541 13.0842 15.7185 13.0389C15.6765 12.9847 15.6313 12.9338 15.5821 12.8869C15.46 12.7683 15.3173 12.6711 15.1595 12.6027C15.0913 12.5725 15.02 12.5479 14.947 12.5295C14.9461 12.5295 14.9446 12.5287 14.9438 12.5287L14.9185 12.52L14.549 12.3927V12.3919L13.5823 12.0584C13.5791 12.0576 13.5751 12.0576 13.5728 12.0569L13.5125 12.0347C13.3181 11.9583 13.1571 11.8151 13.0565 11.6329L12.7036 10.7297L12.2991 9.69528L12.2215 9.49561L12.2016 9.45498C12.1795 9.4008 12.1675 9.34194 12.1675 9.28073C12.1675 9.26485 12.1675 9.24896 12.1691 9.23458C12.1921 9.00699 12.3848 8.82874 12.618 8.82874C12.6798 8.82874 12.7393 8.84144 12.7933 8.86452L14.5946 9.79126L14.95 9.97353C15.138 10.0857 15.3131 10.2178 15.4733 10.3667C16.0538 10.9014 16.4345 11.6509 16.4916 12.4889C16.4965 12.5628 16.4996 12.6367 16.4996 12.7114Z" fill="url(#paint4_linear_1360_20277)"/>\n\t<path d="M16.0182 13.9177C16.0182 14.01 16.0096 14.0991 15.9936 14.1859C15.9887 14.209 15.9841 14.2321 15.9786 14.2552C15.9682 14.2965 15.9572 14.3363 15.9437 14.3761C15.9366 14.3968 15.9294 14.4174 15.9216 14.4373C15.9136 14.458 15.9049 14.4779 15.8962 14.4985C15.8701 14.559 15.8391 14.617 15.8042 14.6727C15.7591 14.7459 15.7074 14.8143 15.6504 14.878C15.3879 15.1693 14.4964 15.6887 14.1679 15.8998L13.4386 16.3469C12.9043 16.6773 12.3989 16.9111 11.7621 16.927C11.7319 16.9278 11.7026 16.9287 11.6733 16.9287C11.6321 16.9287 11.5916 16.9278 11.5511 16.9263C10.4726 16.885 9.53195 16.3041 8.98962 15.4456C8.74146 15.0533 8.57729 14.603 8.52179 14.1192C8.63829 14.7804 9.21262 15.2817 9.90495 15.2817C10.1476 15.2817 10.3753 15.2205 10.5743 15.1122C10.5758 15.1113 10.5774 15.1105 10.5791 15.1098L10.6504 15.0668L10.9408 14.8949L11.3103 14.6754V14.665L11.3579 14.6364L14.6643 12.6711L14.9188 12.5199L14.9441 12.5286C14.9449 12.5286 14.9464 12.5294 14.9473 12.5294C15.0203 12.5477 15.0916 12.5724 15.1598 12.6027C15.3176 12.6711 15.4603 12.7682 15.5824 12.8868C15.6316 12.9338 15.6768 12.9846 15.7187 13.0388C15.7544 13.0841 15.7869 13.1319 15.8162 13.1819C15.9444 13.3965 16.0182 13.6488 16.0182 13.9177Z" fill="url(#paint5_linear_1360_20277)"/>\n\t<path d="M11.3111 7.35883L11.31 14.6751L10.9405 14.8948L10.65 15.0665L10.5785 15.11C10.5773 15.11 10.5751 15.1112 10.5741 15.1122C10.3748 15.2199 10.1471 15.2819 9.90429 15.2819C9.2118 15.2819 8.63847 14.7806 8.5213 14.1194C8.5158 14.089 8.51163 14.0574 8.5083 14.0269C8.50397 13.9692 8.5008 13.9127 8.49963 13.855V5.62107C8.49963 5.36121 8.70997 5.14917 8.96996 5.14917C9.06746 5.14917 9.15846 5.1796 9.2333 5.2296L10.6715 6.1724C10.6791 6.17892 10.6876 6.18444 10.6965 6.18979C11.0683 6.4443 11.3111 6.87272 11.3111 7.35883Z" fill="url(#paint6_linear_1360_20277)"/>\n\t<path opacity="0.15" d="M16.0182 13.9177C16.0182 14.01 16.0096 14.0991 15.9936 14.1859C15.9887 14.209 15.9841 14.2321 15.9786 14.2552C15.9682 14.2965 15.9572 14.3363 15.9437 14.3761C15.9366 14.3968 15.9294 14.4174 15.9216 14.4373C15.9136 14.458 15.9049 14.4779 15.8962 14.4985C15.8701 14.559 15.8391 14.617 15.8042 14.6727C15.7591 14.7459 15.7076 14.8143 15.6504 14.878C15.3879 15.1693 14.4964 15.6887 14.1679 15.8998L13.4386 16.3469C12.9043 16.6773 12.3989 16.9111 11.7621 16.927C11.7319 16.9278 11.7026 16.9287 11.6733 16.9287C11.6321 16.9287 11.5916 16.9278 11.5511 16.9263C10.4726 16.885 9.53195 16.3041 8.98962 15.4456C8.74146 15.0533 8.57729 14.603 8.52179 14.1192C8.63829 14.7804 9.21262 15.2817 9.90495 15.2817C10.1476 15.2817 10.3753 15.2205 10.5743 15.1122C10.5758 15.1113 10.5774 15.1105 10.5791 15.1098L10.6504 15.0668L10.9408 14.8949L11.3103 14.6754V14.665L11.3579 14.6364L14.6643 12.6711L14.9188 12.5199L14.9441 12.5286C14.9449 12.5286 14.9464 12.5294 14.9473 12.5294C15.0203 12.5477 15.0916 12.5724 15.1598 12.6027C15.3176 12.6711 15.4603 12.7682 15.5824 12.8868C15.6316 12.9338 15.6768 12.9846 15.7187 13.0388C15.7544 13.0841 15.7869 13.1319 15.8162 13.1819C15.9444 13.3965 16.0182 13.6488 16.0182 13.9177Z" fill="url(#paint7_linear_1360_20277)"/>\n\t<path opacity="0.1" d="M11.3111 7.35883L11.31 14.6751L10.9405 14.8948L10.65 15.0665L10.5785 15.11C10.5773 15.11 10.5751 15.1112 10.5741 15.1122C10.3748 15.2199 10.1471 15.2819 9.90429 15.2819C9.2118 15.2819 8.63847 14.7806 8.5213 14.1194C8.5158 14.089 8.51163 14.0574 8.5083 14.0269C8.50397 13.9692 8.5008 13.9127 8.49963 13.855V5.62107C8.49963 5.36121 8.70997 5.14917 8.96996 5.14917C9.06746 5.14917 9.15846 5.1796 9.2333 5.2296L10.6715 6.1724C10.6791 6.17892 10.6876 6.18444 10.6965 6.18979C11.0683 6.4443 11.3111 6.87272 11.3111 7.35883Z" fill="url(#paint8_linear_1360_20277)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20277" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.5"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20277"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1"/>\n\t<feGaussianBlur stdDeviation="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20277" result="effect2_dropShadow_1360_20277"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20277" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20277" x="6" y="5" width="12" height="13.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.5"/>\n\t<feGaussianBlur stdDeviation="2.4375"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20277"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20277" x1="12" y1="1" x2="12" y2="21" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20277" x1="2.07634" y1="24.75" x2="24.5358" y2="21.4401" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20277" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.17857 18.8571) rotate(14.0362) scale(17.6705)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20277" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.78571 8.14286) rotate(-140.774) scale(11.2953)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20277" x1="11.5402" y1="10.2478" x2="16.6999" y2="13.2169" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20277" x1="8.52146" y1="14.7241" x2="16.0182" y2="14.7241" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20277" x1="9.90536" y1="15.3854" x2="9.90536" y2="5.32761" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20277" x1="10.0116" y1="16.5805" x2="14.6533" y2="11.9541" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20277" x1="9.90536" y1="5.14917" x2="9.90536" y2="15.2818" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20277">\n\t<rect width="8" height="12" fill="white" transform="translate(8.5 5)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble24='<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20278)">\n\t<path d="M15 2C21.6274 2 27 7.37178 27 13.9982C27 20.6246 21.6274 25.9964 15 25.9964C13.666 25.9964 12.3629 25.7782 11.1313 25.3591C10.0002 24.9741 8.78614 24.7934 7.62983 25.0944L4.27846 25.9668C3.73332 26.1089 3.17628 25.782 3.0343 25.2369C2.99039 25.0685 2.99038 24.8915 3.03426 24.7229L3.90536 21.3771C4.20679 20.2194 4.02523 19.0038 3.63918 17.8714C3.21887 16.6386 3 15.3339 3 13.9982C3 7.37178 8.37258 2 15 2Z" fill="url(#paint0_linear_1360_20278)"/>\n\t<path d="M4.1525 25.4829L4.15237 25.483C3.87449 25.5554 3.59053 25.3888 3.51815 25.1109L3.51813 25.1108C3.49578 25.0251 3.49575 24.9349 3.51813 24.8489C3.51813 24.8489 3.51813 24.8489 3.51813 24.8489L4.38923 21.5031C4.72446 20.2155 4.5159 18.8935 4.11243 17.7101C3.70985 16.5293 3.5 15.2791 3.5 13.9982C3.5 7.64799 8.64865 2.5 15 2.5C21.3513 2.5 26.5 7.648 26.5 13.9982C26.5 20.3484 21.3513 25.4964 15 25.4964C13.7208 25.4964 12.4721 25.2872 11.2924 24.8857C10.1102 24.4834 8.78983 24.2758 7.50388 24.6105L4.1525 25.4829Z" stroke="url(#paint1_linear_1360_20278)"/>\n\t<path d="M4.1525 25.4829L4.15237 25.483C3.87449 25.5554 3.59053 25.3888 3.51815 25.1109L3.51813 25.1108C3.49578 25.0251 3.49575 24.9349 3.51813 24.8489C3.51813 24.8489 3.51813 24.8489 3.51813 24.8489L4.38923 21.5031C4.72446 20.2155 4.5159 18.8935 4.11243 17.7101C3.70985 16.5293 3.5 15.2791 3.5 13.9982C3.5 7.64799 8.64865 2.5 15 2.5C21.3513 2.5 26.5 7.648 26.5 13.9982C26.5 20.3484 21.3513 25.4964 15 25.4964C13.7208 25.4964 12.4721 25.2872 11.2924 24.8857C10.1102 24.4834 8.78983 24.2758 7.50388 24.6105L4.1525 25.4829Z" stroke="url(#paint2_radial_1360_20278)" stroke-opacity="0.6"/>\n\t<path d="M4.1525 25.4829L4.15237 25.483C3.87449 25.5554 3.59053 25.3888 3.51815 25.1109L3.51813 25.1108C3.49578 25.0251 3.49575 24.9349 3.51813 24.8489C3.51813 24.8489 3.51813 24.8489 3.51813 24.8489L4.38923 21.5031C4.72446 20.2155 4.5159 18.8935 4.11243 17.7101C3.70985 16.5293 3.5 15.2791 3.5 13.9982C3.5 7.64799 8.64865 2.5 15 2.5C21.3513 2.5 26.5 7.648 26.5 13.9982C26.5 20.3484 21.3513 25.4964 15 25.4964C13.7208 25.4964 12.4721 25.2872 11.2924 24.8857C10.1102 24.4834 8.78983 24.2758 7.50388 24.6105L4.1525 25.4829Z" stroke="url(#paint3_radial_1360_20278)" stroke-opacity="0.8"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20278)" filter="url(#filter1_i_1360_20278)">\n\t<g clip-path="url(#clip1_1360_20278)">\n\t<path d="M20.3996 16.0538C20.3996 16.194 20.392 16.3335 20.3768 16.471C20.2864 17.3093 19.9248 18.0675 19.3804 18.6538C19.449 18.5773 19.5108 18.4953 19.565 18.4074C19.6068 18.3406 19.644 18.2709 19.6754 18.1983C19.6868 18.1744 19.6972 18.1495 19.7058 18.1248C19.7162 18.101 19.7248 18.0761 19.7324 18.0514C19.741 18.0285 19.7486 18.0046 19.7552 17.9808C19.7618 17.9559 19.7686 17.9312 19.7742 17.9063C19.7752 17.9035 19.7762 17.9005 19.777 17.8977C19.7828 17.8728 19.7874 17.8481 19.7922 17.8232C19.797 17.7976 19.8018 17.7717 19.8056 17.746C19.8056 17.745 19.8056 17.745 19.8056 17.7442C19.8094 17.7203 19.8122 17.6964 19.8142 17.6715C19.82 17.6152 19.8228 17.559 19.8228 17.5016C19.8228 17.1789 19.7342 16.8761 19.5792 16.6184C19.544 16.5583 19.505 16.5011 19.4622 16.4467C19.4118 16.3817 19.3576 16.3207 19.2986 16.2643C19.152 16.122 18.9808 16.0054 18.7914 15.9233C18.7096 15.887 18.624 15.8575 18.5364 15.8355C18.5354 15.8355 18.5336 15.8345 18.5326 15.8345L18.5022 15.824L18.0588 15.6713V15.6703L16.8988 15.2702C16.895 15.2692 16.8902 15.2692 16.8874 15.2684L16.815 15.2417C16.5818 15.15 16.3886 14.9782 16.2678 14.7595L15.8444 13.6757L15.359 12.4344L15.2658 12.1948L15.242 12.146C15.2154 12.081 15.201 12.0104 15.201 11.9369C15.201 11.9179 15.201 11.8988 15.203 11.8815C15.2306 11.6084 15.4618 11.3945 15.7416 11.3945C15.8158 11.3945 15.8872 11.4098 15.952 11.4375L18.1136 12.5496L18.54 12.7683C18.7656 12.9029 18.9758 13.0615 19.168 13.24C19.8646 13.8818 20.3214 14.7812 20.39 15.7867C20.3958 15.8754 20.3996 15.9641 20.3996 16.0538Z" fill="url(#paint4_linear_1360_20278)"/>\n\t<path d="M19.822 17.5015C19.822 17.6122 19.8116 17.7192 19.7924 17.8233C19.7866 17.851 19.781 17.8787 19.7744 17.9064C19.762 17.956 19.7488 18.0037 19.7326 18.0515C19.724 18.0764 19.7154 18.101 19.706 18.1249C19.6964 18.1498 19.686 18.1737 19.6756 18.1984C19.6442 18.271 19.607 18.3406 19.5652 18.4075C19.511 18.4954 19.449 18.5774 19.3806 18.6539C19.0656 19.0034 17.9958 19.6267 17.6016 19.8799L16.7264 20.4165C16.0852 20.813 15.4788 21.0936 14.7146 21.1126C14.6784 21.1136 14.6432 21.1146 14.608 21.1146C14.5586 21.1146 14.51 21.1136 14.4614 21.1118C13.1672 21.0623 12.0384 20.3652 11.3876 19.3349C11.0898 18.8642 10.8928 18.3238 10.8262 17.7433C10.966 18.5367 11.6552 19.1383 12.486 19.1383C12.7772 19.1383 13.0504 19.0648 13.2892 18.9348C13.291 18.9338 13.293 18.9328 13.295 18.932L13.3806 18.8804L13.729 18.6741L14.1724 18.4107V18.3982L14.2296 18.3639L18.1972 16.0055L18.5026 15.8241L18.533 15.8345C18.534 15.8345 18.5358 15.8355 18.5368 15.8355C18.6244 15.8574 18.71 15.8871 18.7918 15.9234C18.9812 16.0055 19.1524 16.1221 19.299 16.2644C19.358 16.3207 19.4122 16.3817 19.4626 16.4468C19.5054 16.5011 19.5444 16.5585 19.5796 16.6185C19.7334 16.876 19.822 17.1788 19.822 17.5015Z" fill="url(#paint5_linear_1360_20278)"/>\n\t<path d="M14.1734 9.63072L14.172 18.4102L13.7286 18.6739L13.38 18.88L13.2942 18.9322C13.2928 18.9322 13.2902 18.9336 13.289 18.9348C13.0498 19.064 12.7766 19.1384 12.4852 19.1384C11.6542 19.1384 10.9662 18.5368 10.8256 17.7434C10.819 17.7069 10.814 17.669 10.81 17.6324C10.8048 17.5632 10.801 17.4954 10.7996 17.4262V7.5454C10.7996 7.23357 11.052 6.97913 11.364 6.97913C11.481 6.97913 11.5902 7.01565 11.68 7.07565L13.4058 8.207C13.415 8.21482 13.4252 8.22144 13.4358 8.22787C13.882 8.53328 14.1734 9.04738 14.1734 9.63072Z" fill="url(#paint6_linear_1360_20278)"/>\n\t<path opacity="0.15" d="M19.822 17.5015C19.822 17.6122 19.8116 17.7192 19.7924 17.8233C19.7866 17.851 19.781 17.8787 19.7744 17.9064C19.762 17.956 19.7488 18.0037 19.7326 18.0515C19.724 18.0764 19.7154 18.101 19.706 18.1249C19.6964 18.1498 19.686 18.1737 19.6756 18.1984C19.6442 18.271 19.607 18.3406 19.5652 18.4075C19.511 18.4954 19.4492 18.5774 19.3806 18.6539C19.0656 19.0034 17.9958 19.6267 17.6016 19.8799L16.7264 20.4165C16.0852 20.813 15.4788 21.0936 14.7146 21.1126C14.6784 21.1136 14.6432 21.1146 14.608 21.1146C14.5586 21.1146 14.51 21.1136 14.4614 21.1118C13.1672 21.0623 12.0384 20.3652 11.3876 19.3349C11.0898 18.8642 10.8928 18.3238 10.8262 17.7433C10.966 18.5367 11.6552 19.1383 12.486 19.1383C12.7772 19.1383 13.0504 19.0648 13.2892 18.9348C13.291 18.9338 13.293 18.9328 13.295 18.932L13.3806 18.8804L13.729 18.6741L14.1724 18.4107V18.3982L14.2296 18.3639L18.1972 16.0055L18.5026 15.8241L18.533 15.8345C18.534 15.8345 18.5358 15.8355 18.5368 15.8355C18.6244 15.8574 18.71 15.8871 18.7918 15.9234C18.9812 16.0055 19.1524 16.1221 19.299 16.2644C19.358 16.3207 19.4122 16.3817 19.4626 16.4468C19.5054 16.5011 19.5444 16.5585 19.5796 16.6185C19.7334 16.876 19.822 17.1788 19.822 17.5015Z" fill="url(#paint7_linear_1360_20278)"/>\n\t<path opacity="0.1" d="M14.1734 9.63072L14.172 18.4102L13.7286 18.6739L13.38 18.88L13.2942 18.9322C13.2928 18.9322 13.2902 18.9336 13.289 18.9348C13.0498 19.064 12.7766 19.1384 12.4852 19.1384C11.6542 19.1384 10.9662 18.5368 10.8256 17.7434C10.819 17.7069 10.814 17.669 10.81 17.6324C10.8048 17.5632 10.801 17.4954 10.7996 17.4262V7.5454C10.7996 7.23357 11.052 6.97913 11.364 6.97913C11.481 6.97913 11.5902 7.01565 11.68 7.07565L13.4058 8.207C13.415 8.21482 13.4252 8.22144 13.4358 8.22787C13.882 8.53328 14.1734 9.04738 14.1734 9.63072Z" fill="url(#paint8_linear_1360_20278)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20278" x="0.6" y="0.8" width="28.8" height="28.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.6"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20278"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.2"/>\n\t<feGaussianBlur stdDeviation="1.2"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20278" result="effect2_dropShadow_1360_20278"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20278" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20278" x="7.80002" y="6.80005" width="14.4" height="16.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.8"/>\n\t<feGaussianBlur stdDeviation="2.925"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20278"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20278" x1="15" y1="2" x2="15" y2="26" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20278" x1="3.0916" y1="30.5" x2="30.0429" y2="26.5281" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20278" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.21429 23.4286) rotate(14.0362) scale(21.2045)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20278" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.1429 10.5714) rotate(-140.774) scale(13.5543)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20278" x1="14.4484" y1="13.0975" x2="20.6399" y2="16.6603" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20278" x1="10.8258" y1="18.4692" x2="19.8219" y2="18.4692" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20278" x1="12.4865" y1="19.2625" x2="12.4865" y2="7.19326" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20278" x1="12.614" y1="20.6968" x2="18.1841" y2="15.1452" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20278" x1="12.4865" y1="6.97913" x2="12.4865" y2="19.1383" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20278">\n\t<rect width="14.4" height="14.4" fill="white" transform="translate(7.80002 6.80005)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20278">\n\t<rect width="9.6" height="14.4" fill="white" transform="translate(10.8 6.80005)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble32='<svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20279)">\n\t<path d="M20 2C28.8365 2 36 9.16237 36 17.9976C36 26.8328 28.8365 33.9952 20 33.9952C18.2214 33.9952 16.4839 33.7042 14.8418 33.1454C13.3336 32.6322 11.7149 32.3912 10.1731 32.7925L5.70461 33.9557C4.97776 34.1451 4.23504 33.7094 4.04573 32.9826C3.98718 32.758 3.98717 32.522 4.04568 32.2973L5.20715 27.8362C5.60906 26.2925 5.36698 24.6717 4.85224 23.1619C4.29183 21.5181 4 19.7785 4 17.9976C4 9.16237 11.1634 2 20 2Z" fill="url(#paint0_linear_1360_20279)"/>\n\t<path d="M5.51567 33.2299L5.51548 33.23C5.18952 33.3149 4.85641 33.1195 4.77151 32.7935L4.77148 32.7934C4.74527 32.6929 4.74523 32.5871 4.77148 32.4862C4.77149 32.4862 4.77149 32.4862 4.77149 32.4862L5.93295 28.0252C6.38556 26.2868 6.10298 24.5063 5.56212 22.9199C5.0283 21.3541 4.75 19.6963 4.75 17.9976C4.75 9.57669 11.5775 2.75 20 2.75C28.4224 2.75 35.25 9.5767 35.25 17.9976C35.25 26.4185 28.4224 33.2452 20 33.2452C18.3035 33.2452 16.6476 32.9677 15.0834 32.4354C13.4986 31.8961 11.7204 31.6148 9.98417 32.0667L5.51567 33.2299ZM4.04577 32.9826L4.04576 32.9826L4.04577 32.9826Z" stroke="url(#paint1_linear_1360_20279)" stroke-width="1.5"/>\n\t<path d="M5.51567 33.2299L5.51548 33.23C5.18952 33.3149 4.85641 33.1195 4.77151 32.7935L4.77148 32.7934C4.74527 32.6929 4.74523 32.5871 4.77148 32.4862C4.77149 32.4862 4.77149 32.4862 4.77149 32.4862L5.93295 28.0252C6.38556 26.2868 6.10298 24.5063 5.56212 22.9199C5.0283 21.3541 4.75 19.6963 4.75 17.9976C4.75 9.57669 11.5775 2.75 20 2.75C28.4224 2.75 35.25 9.5767 35.25 17.9976C35.25 26.4185 28.4224 33.2452 20 33.2452C18.3035 33.2452 16.6476 32.9677 15.0834 32.4354C13.4986 31.8961 11.7204 31.6148 9.98417 32.0667L5.51567 33.2299ZM4.04577 32.9826L4.04576 32.9826L4.04577 32.9826Z" stroke="url(#paint2_radial_1360_20279)" stroke-opacity="0.6" stroke-width="1.5"/>\n\t<path d="M5.51567 33.2299L5.51548 33.23C5.18952 33.3149 4.85641 33.1195 4.77151 32.7935L4.77148 32.7934C4.74527 32.6929 4.74523 32.5871 4.77148 32.4862C4.77149 32.4862 4.77149 32.4862 4.77149 32.4862L5.93295 28.0252C6.38556 26.2868 6.10298 24.5063 5.56212 22.9199C5.0283 21.3541 4.75 19.6963 4.75 17.9976C4.75 9.57669 11.5775 2.75 20 2.75C28.4224 2.75 35.25 9.5767 35.25 17.9976C35.25 26.4185 28.4224 33.2452 20 33.2452C18.3035 33.2452 16.6476 32.9677 15.0834 32.4354C13.4986 31.8961 11.7204 31.6148 9.98417 32.0667L5.51567 33.2299ZM4.04577 32.9826L4.04576 32.9826L4.04577 32.9826Z" stroke="url(#paint3_radial_1360_20279)" stroke-opacity="0.8" stroke-width="1.5"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20279)" filter="url(#filter1_i_1360_20279)">\n\t<g clip-path="url(#clip1_1360_20279)">\n\t<path d="M27.1994 20.7383C27.1994 20.9254 27.1893 21.1113 27.169 21.2946C27.0485 22.4124 26.5664 23.4232 25.8405 24.205C25.932 24.1031 26.0144 23.9937 26.0866 23.8765C26.1424 23.7874 26.192 23.6945 26.2338 23.5977C26.249 23.5658 26.2629 23.5327 26.2744 23.4998C26.2882 23.4679 26.2997 23.4347 26.3098 23.4018C26.3213 23.3713 26.3314 23.3395 26.3402 23.3076C26.349 23.2745 26.3581 23.2416 26.3656 23.2084C26.3669 23.2046 26.3682 23.2006 26.3693 23.1969C26.377 23.1637 26.3832 23.1308 26.3896 23.0976C26.396 23.0634 26.4024 23.0289 26.4074 22.9946C26.4074 22.9933 26.4074 22.9933 26.4074 22.9922C26.4125 22.9604 26.4162 22.9285 26.4189 22.8953C26.4266 22.8202 26.4304 22.7453 26.4304 22.6687C26.4304 22.2385 26.3122 21.8348 26.1056 21.4912C26.0586 21.411 26.0066 21.3347 25.9496 21.2622C25.8824 21.1755 25.8101 21.0942 25.7314 21.019C25.536 20.8293 25.3077 20.6739 25.0552 20.5644C24.9461 20.516 24.832 20.4767 24.7152 20.4472C24.7138 20.4472 24.7114 20.4459 24.7101 20.4459L24.6696 20.432L24.0784 20.2284V20.227L22.5317 19.6935C22.5267 19.6922 22.5203 19.6922 22.5165 19.6911L22.42 19.6555C22.1091 19.5333 21.8515 19.3042 21.6904 19.0126L21.1259 17.5676L20.4787 15.9125L20.3544 15.593L20.3227 15.528C20.2872 15.4413 20.268 15.3471 20.268 15.2492C20.268 15.2238 20.268 15.1984 20.2707 15.1754C20.3075 14.8112 20.6157 14.526 20.9888 14.526C21.0877 14.526 21.1829 14.5463 21.2693 14.5833L24.1515 16.066L24.72 16.3577C25.0208 16.5372 25.301 16.7486 25.5573 16.9867C26.4861 17.8423 27.0952 19.0415 27.1866 20.3822C27.1944 20.5005 27.1994 20.6187 27.1994 20.7383Z" fill="url(#paint4_linear_1360_20279)"/>\n\t<path d="M26.4292 22.6685C26.4292 22.8162 26.4153 22.9588 26.3897 23.0976C26.382 23.1346 26.3745 23.1715 26.3657 23.2084C26.3492 23.2745 26.3316 23.3382 26.31 23.4019C26.2985 23.435 26.2871 23.4679 26.2745 23.4998C26.2617 23.533 26.2479 23.5648 26.234 23.5977C26.1921 23.6946 26.1425 23.7874 26.0868 23.8765C26.0145 23.9937 25.9319 24.1031 25.8407 24.205C25.4207 24.6711 23.9943 25.5021 23.4687 25.8398L22.3018 26.5552C21.4468 27.0839 20.6383 27.458 19.6194 27.4834C19.5711 27.4847 19.5242 27.4861 19.4772 27.4861C19.4114 27.4861 19.3466 27.4847 19.2818 27.4823C17.5562 27.4162 16.0511 26.4867 15.1834 25.1131C14.7863 24.4854 14.5237 23.7649 14.4349 22.9909C14.6213 24.0488 15.5402 24.8509 16.6479 24.8509C17.0362 24.8509 17.4005 24.753 17.7189 24.5796C17.7213 24.5783 17.7239 24.5769 17.7266 24.5759L17.8407 24.5071L18.3053 24.2321L18.8965 23.8808V23.8642L18.9727 23.8184L24.2628 20.6739L24.67 20.432L24.7106 20.4459C24.7119 20.4459 24.7143 20.4473 24.7156 20.4473C24.8324 20.4764 24.9466 20.516 25.0556 20.5644C25.3081 20.6739 25.5364 20.8293 25.7319 21.019C25.8105 21.0942 25.8828 21.1755 25.95 21.2622C26.0071 21.3347 26.0591 21.4113 26.106 21.4913C26.3111 21.8345 26.4292 22.2383 26.4292 22.6685Z" fill="url(#paint5_linear_1360_20279)"/>\n\t<path d="M18.8978 12.1742L18.8959 23.8803L18.3047 24.2318L17.8399 24.5066L17.7255 24.5762C17.7237 24.5762 17.7202 24.578 17.7186 24.5796C17.3997 24.7519 17.0354 24.8512 16.6469 24.8512C15.5389 24.8512 14.6215 24.0491 14.4341 22.9912C14.4253 22.9425 14.4186 22.8919 14.4133 22.8432C14.4063 22.7509 14.4013 22.6605 14.3994 22.5682V9.39383C14.3994 8.97805 14.7359 8.63879 15.1519 8.63879C15.3079 8.63879 15.4535 8.68749 15.5733 8.76749L17.8743 10.276C17.8866 10.2864 17.9002 10.2952 17.9143 10.3038C18.5093 10.711 18.8978 11.3965 18.8978 12.1742Z" fill="url(#paint6_linear_1360_20279)"/>\n\t<path opacity="0.15" d="M26.4292 22.6685C26.4292 22.8162 26.4153 22.9588 26.3897 23.0976C26.382 23.1346 26.3745 23.1715 26.3657 23.2084C26.3492 23.2745 26.3316 23.3382 26.31 23.4019C26.2985 23.435 26.2871 23.4679 26.2745 23.4998C26.2617 23.533 26.2479 23.5648 26.234 23.5977C26.1921 23.6946 26.1425 23.7874 26.0868 23.8765C26.0145 23.9937 25.9321 24.1031 25.8407 24.205C25.4207 24.6711 23.9943 25.5021 23.4687 25.8398L22.3018 26.5552C21.4468 27.0839 20.6383 27.458 19.6194 27.4834C19.5711 27.4847 19.5242 27.4861 19.4772 27.4861C19.4114 27.4861 19.3466 27.4847 19.2818 27.4823C17.5562 27.4162 16.0511 26.4867 15.1834 25.1131C14.7863 24.4854 14.5237 23.7649 14.4349 22.9909C14.6213 24.0488 15.5402 24.8509 16.6479 24.8509C17.0362 24.8509 17.4005 24.753 17.7189 24.5796C17.7213 24.5783 17.7239 24.5769 17.7266 24.5759L17.8407 24.5071L18.3053 24.2321L18.8965 23.8808V23.8642L18.9727 23.8184L24.2628 20.6739L24.67 20.432L24.7106 20.4459C24.7119 20.4459 24.7143 20.4473 24.7156 20.4473C24.8324 20.4764 24.9466 20.516 25.0556 20.5644C25.3081 20.6739 25.5364 20.8293 25.7319 21.019C25.8105 21.0942 25.8828 21.1755 25.95 21.2622C26.0071 21.3347 26.0591 21.4113 26.106 21.4913C26.3111 21.8345 26.4292 22.2383 26.4292 22.6685Z" fill="url(#paint7_linear_1360_20279)"/>\n\t<path opacity="0.1" d="M18.8978 12.1742L18.8959 23.8803L18.3047 24.2318L17.8399 24.5066L17.7255 24.5762C17.7237 24.5762 17.7202 24.578 17.7186 24.5796C17.3997 24.7519 17.0354 24.8512 16.6469 24.8512C15.5389 24.8512 14.6215 24.0491 14.4341 22.9912C14.4253 22.9425 14.4186 22.8919 14.4133 22.8432C14.4063 22.7509 14.4013 22.6605 14.3994 22.5682V9.39383C14.3994 8.97805 14.7359 8.63879 15.1519 8.63879C15.3079 8.63879 15.4535 8.68749 15.5733 8.76749L17.8743 10.276C17.8866 10.2864 17.9002 10.2952 17.9143 10.3038C18.5093 10.711 18.8978 11.3965 18.8978 12.1742Z" fill="url(#paint8_linear_1360_20279)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20279" x="0.8" y="0.4" width="38.4" height="38.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.8"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20279"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.6"/>\n\t<feGaussianBlur stdDeviation="1.6"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20279" result="effect2_dropShadow_1360_20279"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20279" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20279" x="10.4" y="8.40002" width="19.2" height="21.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="2.4"/>\n\t<feGaussianBlur stdDeviation="3.9"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20279"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20279" x1="20" y1="2" x2="20" y2="34" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20279" x1="4.12214" y1="40" x2="40.0572" y2="34.7041" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20279" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.2857 30.5714) rotate(14.0362) scale(28.2727)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20279" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.8571 13.4286) rotate(-140.774) scale(18.0724)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20279" x1="19.2644" y1="16.7966" x2="27.5199" y2="21.547" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20279" x1="14.4343" y1="23.9588" x2="26.4291" y2="23.9588" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20279" x1="16.6486" y1="25.0167" x2="16.6486" y2="8.9243" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20279" x1="16.8185" y1="26.9289" x2="24.2453" y2="19.5268" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20279" x1="16.6486" y1="8.63879" x2="16.6486" y2="24.851" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20279">\n\t<rect width="19.2" height="19.2" fill="white" transform="translate(10.4 8.40002)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20279">\n\t<rect width="12.8" height="19.2" fill="white" transform="translate(14.4 8.40002)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble36='<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20280)">\n\t<path d="M22 2C31.941 2 40 10.0577 40 19.9973C40 29.9369 31.941 37.9946 22 37.9946C19.999 37.9946 18.0443 37.6673 16.197 37.0386C14.5003 36.4612 12.6792 36.1901 10.9447 36.6416L5.91768 37.9502C5.09998 38.1633 4.26442 37.673 4.05144 36.8554C3.98558 36.6027 3.98556 36.3373 4.05139 36.0844L5.35804 31.0657C5.81019 29.3291 5.53785 27.5057 4.95877 25.8072C4.32831 23.9579 4 22.0008 4 19.9973C4 10.0577 12.0589 2 22 2Z" fill="url(#paint0_linear_1360_20280)"/>\n\t<path d="M5.72875 37.2244L5.72856 37.2244C5.31174 37.333 4.88579 37.0831 4.77723 36.6664L4.7772 36.6662C4.74367 36.5376 4.74362 36.4023 4.7772 36.2733L6.08385 31.2547C6.58669 29.3233 6.27386 27.3403 5.66865 25.5651C5.06478 23.7939 4.75 21.9186 4.75 19.9973C4.75 10.472 12.473 2.75 22 2.75C31.5269 2.75 39.25 10.472 39.25 19.9973C39.25 29.5226 31.5269 37.2446 22 37.2446C20.0812 37.2446 18.2081 36.9308 16.4386 36.3286C14.6653 35.7251 12.6848 35.4137 10.7558 35.9158L5.72875 37.2244Z" stroke="url(#paint1_linear_1360_20280)" stroke-width="1.5"/>\n\t<path d="M5.72875 37.2244L5.72856 37.2244C5.31174 37.333 4.88579 37.0831 4.77723 36.6664L4.7772 36.6662C4.74367 36.5376 4.74362 36.4023 4.7772 36.2733L6.08385 31.2547C6.58669 29.3233 6.27386 27.3403 5.66865 25.5651C5.06478 23.7939 4.75 21.9186 4.75 19.9973C4.75 10.472 12.473 2.75 22 2.75C31.5269 2.75 39.25 10.472 39.25 19.9973C39.25 29.5226 31.5269 37.2446 22 37.2446C20.0812 37.2446 18.2081 36.9308 16.4386 36.3286C14.6653 35.7251 12.6848 35.4137 10.7558 35.9158L5.72875 37.2244Z" stroke="url(#paint2_radial_1360_20280)" stroke-opacity="0.6" stroke-width="1.5"/>\n\t<path d="M5.72875 37.2244L5.72856 37.2244C5.31174 37.333 4.88579 37.0831 4.77723 36.6664L4.7772 36.6662C4.74367 36.5376 4.74362 36.4023 4.7772 36.2733L6.08385 31.2547C6.58669 29.3233 6.27386 27.3403 5.66865 25.5651C5.06478 23.7939 4.75 21.9186 4.75 19.9973C4.75 10.472 12.473 2.75 22 2.75C31.5269 2.75 39.25 10.472 39.25 19.9973C39.25 29.5226 31.5269 37.2446 22 37.2446C20.0812 37.2446 18.2081 36.9308 16.4386 36.3286C14.6653 35.7251 12.6848 35.4137 10.7558 35.9158L5.72875 37.2244Z" stroke="url(#paint3_radial_1360_20280)" stroke-opacity="0.8" stroke-width="1.5"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20280)" filter="url(#filter1_i_1360_20280)">\n\t<g clip-path="url(#clip1_1360_20280)">\n\t<path d="M30.0993 23.0805C30.0993 23.2909 30.0879 23.5001 30.0651 23.7063C29.9295 24.9639 29.3871 26.1011 28.5705 26.9806C28.6734 26.8659 28.7661 26.7428 28.8474 26.6109C28.9101 26.5107 28.9659 26.4063 29.013 26.2973C29.0301 26.2615 29.0457 26.2242 29.0586 26.1871C29.0742 26.1513 29.0871 26.114 29.0985 26.077C29.1114 26.0427 29.1228 26.0068 29.1327 25.971C29.1426 25.9337 29.1528 25.8967 29.1612 25.8594C29.1627 25.8551 29.1642 25.8506 29.1654 25.8464C29.1741 25.8091 29.181 25.7721 29.1882 25.7347C29.1954 25.6962 29.2026 25.6574 29.2083 25.6189C29.2083 25.6174 29.2083 25.6174 29.2083 25.6162C29.214 25.5803 29.2182 25.5445 29.2212 25.5072C29.2299 25.4226 29.2341 25.3383 29.2341 25.2522C29.2341 24.7682 29.1012 24.314 28.8687 23.9276C28.8159 23.8373 28.7574 23.7515 28.6932 23.6699C28.6176 23.5724 28.5363 23.4809 28.4478 23.3963C28.2279 23.1829 27.9711 23.008 27.687 22.8849C27.5643 22.8304 27.4359 22.7862 27.3045 22.7531C27.303 22.7531 27.3003 22.7516 27.2988 22.7516L27.2532 22.7359L26.5881 22.5068V22.5053L24.8481 21.9051C24.8424 21.9036 24.8352 21.9036 24.831 21.9024L24.7224 21.8624C24.3726 21.7249 24.0828 21.4672 23.9016 21.1391L23.2665 19.5134L22.5385 17.6514L22.3987 17.2921L22.363 17.2189C22.3231 17.1214 22.3015 17.0154 22.3015 16.9053C22.3015 16.8767 22.3015 16.8481 22.3045 16.8222C22.3459 16.4125 22.6927 16.0917 23.1123 16.0917C23.2236 16.0917 23.3307 16.1146 23.4279 16.1561L26.6703 17.8242L27.3099 18.1523C27.6483 18.3543 27.9636 18.5921 28.2519 18.86C29.2968 19.8225 29.982 21.1716 30.0849 22.6799C30.0936 22.813 30.0993 22.946 30.0993 23.0805Z" fill="url(#paint4_linear_1360_20280)"/>\n\t<path d="M29.2328 25.2519C29.2328 25.418 29.2172 25.5785 29.1884 25.7347C29.1797 25.7762 29.1713 25.8178 29.1614 25.8593C29.1428 25.9336 29.123 26.0053 29.0987 26.0769C29.0858 26.1142 29.0729 26.1513 29.0588 26.1871C29.0444 26.2244 29.0288 26.2602 29.0132 26.2972C28.9661 26.4062 28.9103 26.5107 28.8476 26.6109C28.7663 26.7427 28.6733 26.8658 28.5707 26.9805C28.0982 27.5048 26.4935 28.4397 25.9022 28.8196L24.5894 29.6245C23.6277 30.2192 22.7181 30.64 21.5718 30.6686C21.5175 30.6701 21.4647 30.6716 21.4119 30.6716C21.3378 30.6716 21.2649 30.6701 21.192 30.6674C19.2507 30.5931 17.5575 29.5474 16.5813 28.0021C16.1346 27.296 15.8391 26.4854 15.7392 25.6146C15.9489 26.8047 16.9827 27.7071 18.2289 27.7071C18.6657 27.7071 19.0755 27.597 19.4337 27.4019C19.4364 27.4004 19.4394 27.3989 19.4424 27.3977L19.5708 27.3203L20.0934 27.0109L20.7585 26.6157V26.597L20.8443 26.5456L26.7956 23.0079L27.2537 22.7358L27.2993 22.7515C27.3008 22.7515 27.3035 22.753 27.305 22.753C27.4364 22.7858 27.5648 22.8304 27.6875 22.8848C27.9716 23.0079 28.2284 23.1828 28.4483 23.3962C28.5368 23.4808 28.6181 23.5723 28.6937 23.6698C28.7579 23.7514 28.8164 23.8375 28.8692 23.9275C29.0999 24.3137 29.2328 24.7679 29.2328 25.2519Z" fill="url(#paint5_linear_1360_20280)"/>\n\t<path d="M20.76 13.4459L20.7579 26.6152L20.0928 27.0107L19.5699 27.3198L19.4412 27.398C19.4391 27.398 19.4352 27.4002 19.4334 27.402C19.0746 27.5958 18.6648 27.7075 18.2277 27.7075C16.9812 27.7075 15.9492 26.8051 15.7383 25.6149C15.7284 25.5602 15.7209 25.5033 15.7149 25.4485C15.7071 25.3446 15.7014 25.2429 15.6993 25.1391V10.3179C15.6993 9.85017 16.0779 9.46851 16.5459 9.46851C16.7214 9.46851 16.8852 9.52329 17.0199 9.61329L19.6086 11.3103C19.6224 11.3221 19.6377 11.332 19.6536 11.3416C20.3229 11.7997 20.76 12.5709 20.76 13.4459Z" fill="url(#paint6_linear_1360_20280)"/>\n\t<path opacity="0.15" d="M29.2328 25.2519C29.2328 25.418 29.2172 25.5785 29.1884 25.7347C29.1797 25.7762 29.1713 25.8178 29.1614 25.8593C29.1428 25.9336 29.123 26.0053 29.0987 26.0769C29.0858 26.1142 29.0729 26.1513 29.0588 26.1871C29.0444 26.2244 29.0288 26.2602 29.0132 26.2972C28.9661 26.4062 28.9103 26.5107 28.8476 26.6109C28.7663 26.7427 28.6736 26.8658 28.5707 26.9805C28.0982 27.5048 26.4935 28.4397 25.9022 28.8196L24.5894 29.6245C23.6277 30.2192 22.7181 30.64 21.5718 30.6686C21.5175 30.6701 21.4647 30.6716 21.4119 30.6716C21.3378 30.6716 21.2649 30.6701 21.192 30.6674C19.2507 30.5931 17.5575 29.5474 16.5813 28.0021C16.1346 27.296 15.8391 26.4854 15.7392 25.6146C15.9489 26.8047 16.9827 27.7071 18.2289 27.7071C18.6657 27.7071 19.0755 27.597 19.4337 27.4019C19.4364 27.4004 19.4394 27.3989 19.4424 27.3977L19.5708 27.3203L20.0934 27.0109L20.7585 26.6157V26.597L20.8443 26.5456L26.7956 23.0079L27.2537 22.7358L27.2993 22.7515C27.3008 22.7515 27.3035 22.753 27.305 22.753C27.4364 22.7858 27.5648 22.8304 27.6875 22.8848C27.9716 23.0079 28.2284 23.1828 28.4483 23.3962C28.5368 23.4808 28.6181 23.5723 28.6937 23.6698C28.7579 23.7514 28.8164 23.8375 28.8692 23.9275C29.0999 24.3137 29.2328 24.7679 29.2328 25.2519Z" fill="url(#paint7_linear_1360_20280)"/>\n\t<path opacity="0.1" d="M20.76 13.4459L20.7579 26.6152L20.0928 27.0107L19.5699 27.3198L19.4412 27.398C19.4391 27.398 19.4352 27.4002 19.4334 27.402C19.0746 27.5958 18.6648 27.7075 18.2277 27.7075C16.9812 27.7075 15.9492 26.8051 15.7383 25.6149C15.7284 25.5602 15.7209 25.5033 15.7149 25.4485C15.7071 25.3446 15.7014 25.2429 15.6993 25.1391V10.3179C15.6993 9.85017 16.0779 9.46851 16.5459 9.46851C16.7214 9.46851 16.8852 9.52329 17.0199 9.61329L19.6086 11.3103C19.6224 11.3221 19.6377 11.332 19.6536 11.3416C20.3229 11.7997 20.76 12.5709 20.76 13.4459Z" fill="url(#paint8_linear_1360_20280)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20280" x="0.4" y="0.2" width="43.2" height="43.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="0.9"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20280"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="1.8"/>\n\t<feGaussianBlur stdDeviation="1.8"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20280" result="effect2_dropShadow_1360_20280"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20280" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20280" x="11.2" y="9.19995" width="21.6" height="24.3" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="2.7"/>\n\t<feGaussianBlur stdDeviation="4.3875"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20280"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20280" x1="22" y1="2" x2="22" y2="38" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20280" x1="4.1374" y1="44.75" x2="44.5644" y2="38.7922" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20280" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.3214 34.1429) rotate(14.0362) scale(31.8068)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20280" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.2143 14.8571) rotate(-140.774) scale(20.3315)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20280" x1="21.1724" y1="18.6461" x2="30.4598" y2="23.9903" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20280" x1="15.7386" y1="26.7035" x2="29.2327" y2="26.7035" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20280" x1="18.2296" y1="27.8936" x2="18.2296" y2="9.7897" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20280" x1="18.4208" y1="30.0449" x2="26.7759" y2="21.7175" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20280" x1="18.2296" y1="9.46851" x2="18.2296" y2="27.7073" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20280">\n\t<rect width="21.6" height="21.6" fill="white" transform="translate(11.2 9.19995)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20280">\n\t<rect width="14.4" height="21.6" fill="white" transform="translate(15.7 9.19995)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble40='<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20281)">\n\t<path d="M24 2C35.0456 2 44 10.953 44 21.997C44 33.041 35.0456 41.994 24 41.994C21.7767 41.994 19.6048 41.6303 17.5522 40.9318C15.667 40.2902 13.6436 39.989 11.7164 40.4907L6.13076 41.9447C5.2222 42.1814 4.2938 41.6367 4.05716 40.7282C3.98398 40.4475 3.98396 40.1525 4.0571 39.8716L5.50894 34.2952C6.01132 32.3656 5.70872 30.3397 5.0653 28.4524C4.36479 26.3977 4 24.2232 4 21.997C4 10.953 12.9543 2 24 2Z" fill="url(#paint0_linear_1360_20281)"/>\n\t<path d="M5.87885 40.9769L5.87859 40.977C5.50454 41.0744 5.12229 40.8502 5.02487 40.4762L5.02483 40.476C4.99476 40.3607 4.99471 40.2393 5.02485 40.1235L6.47667 34.5472C7.04666 32.358 6.69006 30.1192 6.01181 28.1297C5.34674 26.179 5 24.1135 5 21.997C5 11.5054 13.5064 3 24 3C34.4935 3 43 11.5054 43 21.997C43 32.4886 34.4935 40.994 24 40.994C21.8862 40.994 19.8232 40.6483 17.8744 39.9851C15.887 39.3088 13.651 38.9537 11.4645 39.5229L5.87885 40.9769Z" stroke="url(#paint1_linear_1360_20281)" stroke-width="2"/>\n\t<path d="M5.87885 40.9769L5.87859 40.977C5.50454 41.0744 5.12229 40.8502 5.02487 40.4762L5.02483 40.476C4.99476 40.3607 4.99471 40.2393 5.02485 40.1235L6.47667 34.5472C7.04666 32.358 6.69006 30.1192 6.01181 28.1297C5.34674 26.179 5 24.1135 5 21.997C5 11.5054 13.5064 3 24 3C34.4935 3 43 11.5054 43 21.997C43 32.4886 34.4935 40.994 24 40.994C21.8862 40.994 19.8232 40.6483 17.8744 39.9851C15.887 39.3088 13.651 38.9537 11.4645 39.5229L5.87885 40.9769Z" stroke="url(#paint2_radial_1360_20281)" stroke-opacity="0.6" stroke-width="2"/>\n\t<path d="M5.87885 40.9769L5.87859 40.977C5.50454 41.0744 5.12229 40.8502 5.02487 40.4762L5.02483 40.476C4.99476 40.3607 4.99471 40.2393 5.02485 40.1235L6.47667 34.5472C7.04666 32.358 6.69006 30.1192 6.01181 28.1297C5.34674 26.179 5 24.1135 5 21.997C5 11.5054 13.5064 3 24 3C34.4935 3 43 11.5054 43 21.997C43 32.4886 34.4935 40.994 24 40.994C21.8862 40.994 19.8232 40.6483 17.8744 39.9851C15.887 39.3088 13.651 38.9537 11.4645 39.5229L5.87885 40.9769Z" stroke="url(#paint3_radial_1360_20281)" stroke-opacity="0.8" stroke-width="2"/>\n\t</g>\n\t<g filter="url(#filter1_i_1360_20281)">\n\t<g clip-path="url(#clip0_1360_20281)">\n\t<path d="M32.9992 25.4229C32.9992 25.6567 32.9866 25.8891 32.9612 26.1182C32.8106 27.5155 32.2079 28.779 31.3006 29.7562C31.4149 29.6288 31.5179 29.492 31.6082 29.3456C31.6779 29.2342 31.7399 29.1181 31.7922 28.9971C31.8112 28.9573 31.8286 28.9158 31.8429 28.8747C31.8602 28.8349 31.8746 28.7934 31.8872 28.7523C31.9016 28.7141 31.9142 28.6743 31.9252 28.6345C31.9362 28.5931 31.9476 28.5519 31.9569 28.5105C31.9586 28.5058 31.9602 28.5008 31.9616 28.4961C31.9712 28.4546 31.9789 28.4135 31.9869 28.372C31.9949 28.3292 32.0029 28.286 32.0092 28.2432C32.0092 28.2416 32.0092 28.2416 32.0092 28.2402C32.0156 28.2004 32.0202 28.1606 32.0236 28.1192C32.0332 28.0252 32.0379 27.9315 32.0379 27.8359C32.0379 27.2981 31.8902 26.7934 31.6319 26.364C31.5732 26.2637 31.5082 26.1684 31.4369 26.0777C31.3529 25.9694 31.2626 25.8677 31.1642 25.7737C30.9199 25.5366 30.6346 25.3423 30.3189 25.2055C30.1826 25.145 30.0399 25.0958 29.8939 25.059C29.8922 25.059 29.8892 25.0573 29.8876 25.0573L29.8369 25.0399L29.0979 24.7854V24.7838L27.1646 24.1169C27.1582 24.1152 27.1502 24.1152 27.1456 24.1139L27.0249 24.0694C26.6363 23.9166 26.3143 23.6303 26.1129 23.2657L25.4073 21.4594L24.5983 19.3906L24.4429 18.9912L24.4033 18.91C24.3589 18.8016 24.3349 18.6839 24.3349 18.5615C24.3349 18.5297 24.3349 18.4979 24.3383 18.4692C24.3843 18.014 24.7696 17.6575 25.2359 17.6575C25.3596 17.6575 25.4786 17.6829 25.5866 17.729L29.1892 19.5825L29.8999 19.9471C30.2759 20.1715 30.6262 20.4357 30.9466 20.7333C32.1076 21.8029 32.8689 23.3018 32.9832 24.9777C32.9929 25.1256 32.9992 25.2734 32.9992 25.4229Z" fill="url(#paint4_linear_1360_20281)"/>\n\t<path d="M32.0364 27.8356C32.0364 28.0203 32.0191 28.1985 31.9871 28.3721C31.9774 28.4182 31.9681 28.4644 31.9571 28.5105C31.9364 28.5932 31.9144 28.6727 31.8874 28.7523C31.8731 28.7938 31.8588 28.835 31.8431 28.8748C31.8271 28.9162 31.8098 28.956 31.7924 28.9972C31.7401 29.1182 31.6781 29.2343 31.6084 29.3456C31.5181 29.4921 31.4148 29.6289 31.3008 29.7563C30.7758 30.3389 28.9928 31.3777 28.3358 31.7998L26.8771 32.6941C25.8085 33.3549 24.7978 33.8225 23.5241 33.8543C23.4638 33.8559 23.4051 33.8576 23.3465 33.8576C23.2642 33.8576 23.1832 33.8559 23.1022 33.8529C20.9452 33.7703 19.0638 32.6085 17.9792 30.8914C17.4828 30.1068 17.1545 29.2062 17.0435 28.2386C17.2765 29.561 18.4252 30.5637 19.8098 30.5637C20.2952 30.5637 20.7505 30.4413 21.1485 30.2246C21.1515 30.2229 21.1548 30.2212 21.1582 30.2199L21.3008 30.1339L21.8815 29.7901L22.6205 29.351V29.3303L22.7158 29.2731L29.3285 25.3424L29.8374 25.04L29.8881 25.0574C29.8898 25.0574 29.8928 25.0591 29.8944 25.0591C30.0404 25.0956 30.1831 25.1451 30.3194 25.2056C30.6351 25.3424 30.9204 25.5367 31.1648 25.7738C31.2631 25.8678 31.3534 25.9695 31.4374 26.0778C31.5088 26.1684 31.5738 26.2641 31.6324 26.3641C31.8888 26.7932 32.0364 27.2979 32.0364 27.8356Z" fill="url(#paint5_linear_1360_20281)"/>\n\t<path d="M22.6222 14.7178L22.6198 29.3503L21.8808 29.7897L21.2998 30.1332L21.1568 30.2202C21.1545 30.2202 21.1502 30.2225 21.1482 30.2245C20.7495 30.4399 20.2942 30.564 19.8085 30.564C18.4235 30.564 17.2769 29.5613 17.0425 28.2389C17.0315 28.1781 17.0232 28.1149 17.0165 28.054C17.0079 27.9386 17.0015 27.8256 16.9992 27.7102V11.2423C16.9992 10.7225 17.4199 10.2985 17.9399 10.2985C18.1349 10.2985 18.3169 10.3593 18.4665 10.4593L21.3428 12.3449C21.3582 12.358 21.3752 12.369 21.3928 12.3797C22.1365 12.8887 22.6222 13.7456 22.6222 14.7178Z" fill="url(#paint6_linear_1360_20281)"/>\n\t<path opacity="0.15" d="M32.0364 27.8356C32.0364 28.0203 32.0191 28.1985 31.9871 28.3721C31.9774 28.4182 31.9681 28.4644 31.9571 28.5105C31.9364 28.5932 31.9144 28.6727 31.8874 28.7523C31.8731 28.7938 31.8588 28.835 31.8431 28.8748C31.8271 28.9162 31.8098 28.956 31.7924 28.9972C31.7401 29.1182 31.6781 29.2343 31.6084 29.3456C31.5181 29.4921 31.4151 29.6289 31.3008 29.7563C30.7758 30.3389 28.9928 31.3777 28.3358 31.7998L26.8771 32.6941C25.8085 33.3549 24.7978 33.8225 23.5241 33.8543C23.4638 33.8559 23.4051 33.8576 23.3465 33.8576C23.2642 33.8576 23.1832 33.8559 23.1022 33.8529C20.9452 33.7703 19.0638 32.6085 17.9792 30.8914C17.4828 30.1068 17.1545 29.2062 17.0435 28.2386C17.2765 29.561 18.4252 30.5637 19.8098 30.5637C20.2952 30.5637 20.7505 30.4413 21.1485 30.2246C21.1515 30.2229 21.1548 30.2212 21.1582 30.2199L21.3008 30.1339L21.8815 29.7901L22.6205 29.351V29.3303L22.7158 29.2731L29.3285 25.3424L29.8374 25.04L29.8881 25.0574C29.8898 25.0574 29.8928 25.0591 29.8944 25.0591C30.0404 25.0956 30.1831 25.1451 30.3194 25.2056C30.6351 25.3424 30.9204 25.5367 31.1648 25.7738C31.2631 25.8678 31.3534 25.9695 31.4374 26.0778C31.5088 26.1684 31.5738 26.2641 31.6324 26.3641C31.8888 26.7932 32.0364 27.2979 32.0364 27.8356Z" fill="url(#paint7_linear_1360_20281)"/>\n\t<path opacity="0.1" d="M22.6222 14.7178L22.6198 29.3503L21.8808 29.7897L21.2998 30.1332L21.1568 30.2202C21.1545 30.2202 21.1502 30.2225 21.1482 30.2245C20.7495 30.4399 20.2942 30.564 19.8085 30.564C18.4235 30.564 17.2769 29.5613 17.0425 28.2389C17.0315 28.1781 17.0232 28.1149 17.0165 28.054C17.0079 27.9386 17.0015 27.8256 16.9992 27.7102V11.2423C16.9992 10.7225 17.4199 10.2985 17.9399 10.2985C18.1349 10.2985 18.3169 10.3593 18.4665 10.4593L21.3428 12.3449C21.3582 12.358 21.3752 12.369 21.3928 12.3797C22.1365 12.8887 22.6222 13.7456 22.6222 14.7178Z" fill="url(#paint8_linear_1360_20281)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20281" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20281"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="2"/>\n\t<feGaussianBlur stdDeviation="2"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20281" result="effect2_dropShadow_1360_20281"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20281" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20281" x="12" y="10" width="24" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="3"/>\n\t<feGaussianBlur stdDeviation="4.875"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20281"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20281" x1="24" y1="2" x2="24" y2="42" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20281" x1="4.15267" y1="49.5" x2="49.0715" y2="42.8802" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20281" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.3571 37.7143) rotate(14.0362) scale(35.3409)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20281" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5714 16.2857) rotate(-140.774) scale(22.5905)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20281" x1="23.0804" y1="20.4957" x2="33.3998" y2="26.4338" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20281" x1="17.0429" y1="29.4485" x2="32.0363" y2="29.4485" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20281" x1="19.8107" y1="30.7708" x2="19.8107" y2="10.6553" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20281" x1="20.0231" y1="33.1612" x2="29.3066" y2="23.9085" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20281" x1="19.8107" y1="10.2985" x2="19.8107" y2="30.5638" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20281">\n\t<rect width="16" height="24" fill="white" transform="translate(17 10)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble48='<svg width="58" height="59" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20282)">\n\t<path d="M29 3C42.2547 3 53 13.7436 53 26.9964C53 40.2492 42.2547 50.9929 29 50.9929C26.3321 50.9929 23.7258 50.5564 21.2627 49.7182C19.0004 48.9483 16.5723 48.5868 14.2597 49.1888L7.55691 50.9336C6.46664 51.2177 5.35256 50.564 5.06859 49.4739C4.98078 49.137 4.98075 48.783 5.06852 48.4459L6.81072 41.7543C7.41359 39.4388 7.05047 37.0076 6.27836 34.7429C5.43775 32.2772 5 29.6678 5 26.9964C5 13.7436 15.7452 3 29 3Z" fill="url(#paint0_linear_1360_20282)"/>\n\t<path d="M7.305 49.9658L7.30474 49.9659C6.74898 50.1107 6.18105 49.7775 6.0363 49.2218L6.03626 49.2217C5.99156 49.0502 5.9915 48.8698 6.03626 48.6978C6.03626 48.6978 6.03626 48.6978 6.03627 48.6978L7.77846 42.0062C8.44892 39.4311 8.03181 36.7871 7.22487 34.4202C6.4197 32.0585 6 29.5581 6 26.9964C6 14.296 16.2973 4 29 4C41.7026 4 52 14.296 52 26.9964C52 39.6968 41.7026 49.9929 29 49.9929C26.4416 49.9929 23.9441 49.5743 21.5848 48.7715C19.2204 47.9668 16.5797 47.5515 14.0078 48.221L7.305 49.9658Z" stroke="url(#paint1_linear_1360_20282)" stroke-width="2"/>\n\t<path d="M7.305 49.9658L7.30474 49.9659C6.74898 50.1107 6.18105 49.7775 6.0363 49.2218L6.03626 49.2217C5.99156 49.0502 5.9915 48.8698 6.03626 48.6978C6.03626 48.6978 6.03626 48.6978 6.03627 48.6978L7.77846 42.0062C8.44892 39.4311 8.03181 36.7871 7.22487 34.4202C6.4197 32.0585 6 29.5581 6 26.9964C6 14.296 16.2973 4 29 4C41.7026 4 52 14.296 52 26.9964C52 39.6968 41.7026 49.9929 29 49.9929C26.4416 49.9929 23.9441 49.5743 21.5848 48.7715C19.2204 47.9668 16.5797 47.5515 14.0078 48.221L7.305 49.9658Z" stroke="url(#paint2_radial_1360_20282)" stroke-opacity="0.6" stroke-width="2"/>\n\t<path d="M7.305 49.9658L7.30474 49.9659C6.74898 50.1107 6.18105 49.7775 6.0363 49.2218L6.03626 49.2217C5.99156 49.0502 5.9915 48.8698 6.03626 48.6978C6.03626 48.6978 6.03626 48.6978 6.03627 48.6978L7.77846 42.0062C8.44892 39.4311 8.03181 36.7871 7.22487 34.4202C6.4197 32.0585 6 29.5581 6 26.9964C6 14.296 16.2973 4 29 4C41.7026 4 52 14.296 52 26.9964C52 39.6968 41.7026 49.9929 29 49.9929C26.4416 49.9929 23.9441 49.5743 21.5848 48.7715C19.2204 47.9668 16.5797 47.5515 14.0078 48.221L7.305 49.9658Z" stroke="url(#paint3_radial_1360_20282)" stroke-opacity="0.8" stroke-width="2"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20282)" filter="url(#filter1_i_1360_20282)">\n\t<g clip-path="url(#clip1_1360_20282)">\n\t<path d="M39.799 31.1076C39.799 31.3881 39.7838 31.667 39.7534 31.9419C39.5726 33.6187 38.8494 35.1349 37.7606 36.3076C37.8978 36.1547 38.0214 35.9905 38.1298 35.8148C38.2134 35.6811 38.2878 35.5419 38.3506 35.3966C38.3734 35.3488 38.3942 35.2991 38.4114 35.2497C38.4322 35.2019 38.4494 35.1522 38.4646 35.1028C38.4818 35.0571 38.497 35.0093 38.5102 34.9615C38.5234 34.9118 38.537 34.8624 38.5482 34.8126C38.5502 34.807 38.5522 34.801 38.5538 34.7954C38.5654 34.7456 38.5746 34.6963 38.5842 34.6465C38.5938 34.5951 38.6034 34.5433 38.611 34.492C38.611 34.49 38.611 34.49 38.611 34.4884C38.6186 34.4406 38.6242 34.3928 38.6282 34.3431C38.6398 34.2303 38.6454 34.1179 38.6454 34.0032C38.6454 33.3578 38.4682 32.7522 38.1582 32.2369C38.0878 32.1165 38.0098 32.0021 37.9242 31.8934C37.8234 31.7633 37.715 31.6413 37.597 31.5286C37.3038 31.244 36.9614 31.0108 36.5826 30.8467C36.419 30.7741 36.2478 30.7151 36.0726 30.6709C36.0706 30.6709 36.067 30.6689 36.065 30.6689L36.0042 30.648L35.1174 30.3426V30.3406L32.7974 29.5404C32.7898 29.5384 32.7802 29.5384 32.7746 29.5367L32.6298 29.4834C32.1634 29.3 31.777 28.9564 31.5354 28.519L30.6886 26.3514L29.7179 23.8688L29.5315 23.3896L29.4839 23.292C29.4307 23.162 29.4019 23.0207 29.4019 22.8739C29.4019 22.8357 29.4019 22.7976 29.4059 22.7631C29.4611 22.2169 29.9235 21.7891 30.483 21.7891C30.6314 21.7891 30.7742 21.8196 30.9038 21.8749L35.227 24.0991L36.0798 24.5366C36.531 24.8059 36.9514 25.1229 37.3358 25.4801C38.729 26.7636 39.6426 28.5623 39.7798 30.5734C39.7914 30.7508 39.799 30.9282 39.799 31.1076Z" fill="url(#paint4_linear_1360_20282)"/>\n\t<path d="M38.6437 34.0027C38.6437 34.2242 38.6229 34.4381 38.5845 34.6464C38.5729 34.7018 38.5617 34.7572 38.5485 34.8126C38.5237 34.9117 38.4973 35.0072 38.4649 35.1027C38.4477 35.1525 38.4305 35.2018 38.4117 35.2496C38.3925 35.2994 38.3717 35.3471 38.3509 35.3965C38.2881 35.5418 38.2137 35.681 38.1301 35.8147C38.0217 35.9905 37.8977 36.1546 37.7609 36.3075C37.1309 37.0066 34.9913 38.2532 34.2029 38.7596L32.4526 39.8328C31.1702 40.6258 29.9574 41.1869 28.429 41.225C28.3566 41.227 28.2862 41.229 28.2158 41.229C28.117 41.229 28.0198 41.227 27.9226 41.2234C25.3342 41.1243 23.0766 39.7301 21.775 37.6696C21.1794 36.7281 20.7854 35.6473 20.6522 34.4863C20.9318 36.0731 22.3102 37.2763 23.9718 37.2763C24.5542 37.2763 25.1006 37.1294 25.5782 36.8694C25.5818 36.8674 25.5858 36.8654 25.5898 36.8638L25.761 36.7606L26.4578 36.348L27.3446 35.8211V35.7962L27.459 35.7276L35.3941 31.0108L36.0049 30.6479L36.0657 30.6688C36.0677 30.6688 36.0713 30.6708 36.0733 30.6708C36.2485 30.7146 36.4197 30.774 36.5833 30.8466C36.9621 31.0108 37.3045 31.2439 37.5977 31.5285C37.7157 31.6412 37.8241 31.7632 37.9249 31.8933C38.0105 32.002 38.0885 32.1168 38.1589 32.2368C38.4665 32.7517 38.6437 33.3573 38.6437 34.0027Z" fill="url(#paint5_linear_1360_20282)"/>\n\t<path d="M27.3466 18.2613L27.3438 35.8203L26.457 36.3477L25.7598 36.7598L25.5882 36.8642C25.5854 36.8642 25.5802 36.867 25.5778 36.8694C25.0994 37.1279 24.553 37.2768 23.9702 37.2768C22.3082 37.2768 20.9322 36.0736 20.651 34.4867C20.6378 34.4137 20.6278 34.3378 20.6198 34.2648C20.6094 34.1263 20.6018 33.9907 20.599 33.8522V14.0907C20.599 13.467 21.1038 12.9581 21.7278 12.9581C21.9618 12.9581 22.1802 13.0312 22.3598 13.1512L25.8114 15.4139C25.8298 15.4295 25.8502 15.4428 25.8714 15.4556C26.7638 16.0664 27.3466 17.0946 27.3466 18.2613Z" fill="url(#paint6_linear_1360_20282)"/>\n\t<path opacity="0.15" d="M38.6437 34.0027C38.6437 34.2242 38.6229 34.4381 38.5845 34.6464C38.5729 34.7018 38.5617 34.7572 38.5485 34.8126C38.5237 34.9117 38.4973 35.0072 38.4649 35.1027C38.4477 35.1525 38.4305 35.2018 38.4117 35.2496C38.3925 35.2994 38.3717 35.3471 38.3509 35.3965C38.2881 35.5418 38.2137 35.681 38.1301 35.8147C38.0217 35.9905 37.8981 36.1546 37.7609 36.3075C37.1309 37.0066 34.9913 38.2532 34.2029 38.7596L32.4526 39.8328C31.1702 40.6258 29.9574 41.1869 28.429 41.225C28.3566 41.227 28.2862 41.229 28.2158 41.229C28.117 41.229 28.0198 41.227 27.9226 41.2234C25.3342 41.1243 23.0766 39.7301 21.775 37.6696C21.1794 36.7281 20.7854 35.6473 20.6522 34.4863C20.9318 36.0731 22.3102 37.2763 23.9718 37.2763C24.5542 37.2763 25.1006 37.1294 25.5782 36.8694C25.5818 36.8674 25.5858 36.8654 25.5898 36.8638L25.761 36.7606L26.4578 36.348L27.3446 35.8211V35.7962L27.459 35.7276L35.3941 31.0108L36.0049 30.6479L36.0657 30.6688C36.0677 30.6688 36.0713 30.6708 36.0733 30.6708C36.2485 30.7146 36.4197 30.774 36.5833 30.8466C36.9621 31.0108 37.3045 31.2439 37.5977 31.5285C37.7157 31.6412 37.8241 31.7632 37.9249 31.8933C38.0105 32.002 38.0885 32.1168 38.1589 32.2368C38.4665 32.7517 38.6437 33.3573 38.6437 34.0027Z" fill="url(#paint7_linear_1360_20282)"/>\n\t<path opacity="0.1" d="M27.3466 18.2613L27.3438 35.8203L26.457 36.3477L25.7598 36.7598L25.5882 36.8642C25.5854 36.8642 25.5802 36.867 25.5778 36.8694C25.0994 37.1279 24.553 37.2768 23.9702 37.2768C22.3082 37.2768 20.9322 36.0736 20.651 34.4867C20.6378 34.4137 20.6278 34.3378 20.6198 34.2648C20.6094 34.1263 20.6018 33.9907 20.599 33.8522V14.0907C20.599 13.467 21.1038 12.9581 21.7278 12.9581C21.9618 12.9581 22.1802 13.0312 22.3598 13.1512L25.8114 15.4139C25.8298 15.4295 25.8502 15.4428 25.8714 15.4556C26.7638 16.0664 27.3466 17.0946 27.3466 18.2613Z" fill="url(#paint8_linear_1360_20282)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20282" x="0.2" y="0.6" width="57.6" height="57.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="1.2"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20282"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="2.4"/>\n\t<feGaussianBlur stdDeviation="2.4"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20282" result="effect2_dropShadow_1360_20282"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20282" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20282" x="14.6" y="12.6" width="28.8" height="32.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="3.6"/>\n\t<feGaussianBlur stdDeviation="5.85"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20282"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20282" x1="29" y1="3" x2="29" y2="51" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20282" x1="5.18321" y1="60" x2="59.0858" y2="52.0562" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20282" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.4286 45.8571) rotate(14.0362) scale(42.4091)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20282" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.2857 20.1429) rotate(-140.774) scale(27.1086)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20282" x1="27.8965" y1="25.1949" x2="40.2796" y2="32.3206" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20282" x1="20.6514" y1="35.9381" x2="38.6436" y2="35.9381" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20282" x1="23.9727" y1="37.525" x2="23.9727" y2="13.3864" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20282" x1="24.2277" y1="40.3933" x2="35.3679" y2="29.2901" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20282" x1="23.9727" y1="12.9581" x2="23.9727" y2="37.2765" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20282">\n\t<rect width="28.8" height="28.8" fill="white" transform="translate(14.6 12.6)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20282">\n\t<rect width="19.2" height="28.8" fill="white" transform="translate(20.6 12.6)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t',CibLogoIcons.CibLogoWithBubble56='<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t<g filter="url(#filter0_dd_1360_20283)">\n\t<path d="M34 3C49.4638 3 62 15.5342 62 30.9958C62 46.4574 49.4638 58.9917 34 58.9917C30.8874 58.9917 27.8467 58.4824 24.9731 57.5045C22.3338 56.6063 19.501 56.1846 16.8029 56.8869L8.98306 58.9225C7.71108 59.254 6.41132 58.4914 6.08002 57.2195C5.97757 56.8265 5.97754 56.4135 6.07994 56.0202L8.11251 48.2133C8.81585 45.5119 8.39221 42.6755 7.49142 40.0334C6.5107 37.1568 6 34.1124 6 30.9958C6 15.5342 18.536 3 34 3Z" fill="url(#paint0_linear_1360_20283)"/>\n\t<path d="M8.73115 57.9548L8.73089 57.9548C7.99342 58.147 7.23981 57.7049 7.04773 56.9675L7.04769 56.9673C6.98835 56.7397 6.98829 56.5003 7.04768 56.2721C7.04768 56.2721 7.04768 56.2721 7.04769 56.2721L9.08025 48.4653C9.85118 45.5042 9.37355 42.455 8.43793 39.7107C7.49266 36.938 7 34.0027 7 30.9958C7 16.0866 19.0882 4 34 4C48.9117 4 61 16.0866 61 30.9958C61 45.9049 48.9117 57.9917 34 57.9917C30.9969 57.9917 28.0651 57.5004 25.2953 56.5578C22.5538 55.6249 19.5084 55.1493 16.551 55.9192L8.73115 57.9548Z" stroke="url(#paint1_linear_1360_20283)" stroke-width="2"/>\n\t<path d="M8.73115 57.9548L8.73089 57.9548C7.99342 58.147 7.23981 57.7049 7.04773 56.9675L7.04769 56.9673C6.98835 56.7397 6.98829 56.5003 7.04768 56.2721C7.04768 56.2721 7.04768 56.2721 7.04769 56.2721L9.08025 48.4653C9.85118 45.5042 9.37355 42.455 8.43793 39.7107C7.49266 36.938 7 34.0027 7 30.9958C7 16.0866 19.0882 4 34 4C48.9117 4 61 16.0866 61 30.9958C61 45.9049 48.9117 57.9917 34 57.9917C30.9969 57.9917 28.0651 57.5004 25.2953 56.5578C22.5538 55.6249 19.5084 55.1493 16.551 55.9192L8.73115 57.9548Z" stroke="url(#paint2_radial_1360_20283)" stroke-opacity="0.6" stroke-width="2"/>\n\t<path d="M8.73115 57.9548L8.73089 57.9548C7.99342 58.147 7.23981 57.7049 7.04773 56.9675L7.04769 56.9673C6.98835 56.7397 6.98829 56.5003 7.04768 56.2721C7.04768 56.2721 7.04768 56.2721 7.04769 56.2721L9.08025 48.4653C9.85118 45.5042 9.37355 42.455 8.43793 39.7107C7.49266 36.938 7 34.0027 7 30.9958C7 16.0866 19.0882 4 34 4C48.9117 4 61 16.0866 61 30.9958C61 45.9049 48.9117 57.9917 34 57.9917C30.9969 57.9917 28.0651 57.5004 25.2953 56.5578C22.5538 55.6249 19.5084 55.1493 16.551 55.9192L8.73115 57.9548Z" stroke="url(#paint3_radial_1360_20283)" stroke-opacity="0.8" stroke-width="2"/>\n\t</g>\n\t<g clip-path="url(#clip0_1360_20283)" filter="url(#filter1_i_1360_20283)">\n\t<g clip-path="url(#clip1_1360_20283)">\n\t<path d="M46.5989 35.7921C46.5989 36.1194 46.5811 36.4448 46.5457 36.7655C46.3347 38.7218 45.491 40.4907 44.2208 41.8588C44.3808 41.6804 44.525 41.4889 44.6515 41.2838C44.749 41.1279 44.8358 40.9655 44.9091 40.796C44.9357 40.7402 44.9599 40.6822 44.98 40.6246C45.0043 40.5689 45.0243 40.5108 45.0421 40.4532C45.0621 40.3999 45.0799 40.3441 45.0953 40.2884C45.1107 40.2304 45.1265 40.1728 45.1396 40.1147C45.1419 40.1082 45.1443 40.1011 45.1461 40.0946C45.1597 40.0365 45.1704 39.9789 45.1816 39.9209C45.1928 39.8609 45.204 39.8005 45.2129 39.7406C45.2129 39.7383 45.2129 39.7383 45.2129 39.7364C45.2217 39.6807 45.2283 39.6249 45.2329 39.5669C45.2465 39.4353 45.253 39.3042 45.253 39.1703C45.253 38.4174 45.0463 37.7109 44.6846 37.1097C44.6025 36.9692 44.5115 36.8358 44.4116 36.7089C44.294 36.5572 44.1676 36.4148 44.0299 36.2833C43.6878 35.9513 43.2884 35.6793 42.8464 35.4878C42.6556 35.403 42.4558 35.3342 42.2514 35.2827C42.2491 35.2827 42.2449 35.2803 42.2426 35.2803L42.1716 35.256L41.137 34.8997V34.8973L38.4304 33.9637C38.4215 33.9614 38.4103 33.9614 38.4038 33.9595L38.2349 33.8972C37.6907 33.6832 37.2399 33.2825 36.9581 32.7721L35.9701 30.2432L34.8375 27.3468L34.6201 26.7878L34.5645 26.674C34.5025 26.5223 34.4689 26.3575 34.4689 26.1861C34.4689 26.1416 34.4689 26.0972 34.4735 26.0569C34.5379 25.4197 35.0774 24.9205 35.7303 24.9205C35.9034 24.9205 36.07 24.9561 36.2212 25.0207L41.2649 27.6156L42.2598 28.126C42.7862 28.4401 43.2767 28.81 43.7252 29.2267C45.3505 30.7241 46.4164 32.8227 46.5765 35.1689C46.59 35.3759 46.5989 35.5828 46.5989 35.7921Z" fill="url(#paint4_linear_1360_20283)"/>\n\t<path d="M45.251 39.1698C45.251 39.4283 45.2267 39.6778 45.1819 39.9208C45.1684 39.9855 45.1553 40.0501 45.1399 40.1147C45.111 40.2303 45.0802 40.3418 45.0424 40.4532C45.0223 40.5113 45.0023 40.5689 44.9803 40.6246C44.9579 40.6826 44.9337 40.7384 44.9094 40.7959C44.8361 40.9654 44.7493 41.1279 44.6518 41.2838C44.5253 41.4889 44.3807 41.6804 44.2211 41.8588C43.4861 42.6744 40.9899 44.1287 40.0701 44.7196L38.028 45.9716C36.5319 46.8968 35.1169 47.5514 33.3338 47.5959C33.2493 47.5982 33.1672 47.6006 33.0851 47.6006C32.9698 47.6006 32.8564 47.5982 32.743 47.594C29.7232 47.4784 27.0894 45.8518 25.5709 43.4479C24.876 42.3495 24.4163 41.0886 24.2609 39.734C24.5871 41.5854 26.1952 42.9891 28.1338 42.9891C28.8132 42.9891 29.4507 42.8177 30.0079 42.5143C30.0121 42.512 30.0168 42.5096 30.0214 42.5078L30.2212 42.3874L31.0341 41.9061L32.0687 41.2913V41.2623L32.2021 41.1822L41.4598 35.6793L42.1724 35.256L42.2434 35.2803C42.2457 35.2803 42.2499 35.2827 42.2522 35.2827C42.4566 35.3337 42.6564 35.403 42.8472 35.4878C43.2892 35.6793 43.6886 35.9513 44.0307 36.2833C44.1683 36.4148 44.2948 36.5572 44.4124 36.7089C44.5123 36.8358 44.6033 36.9697 44.6854 37.1097C45.0443 37.7104 45.251 38.4169 45.251 39.1698Z" fill="url(#paint5_linear_1360_20283)"/>\n\t<path d="M32.0711 20.8048L32.0678 41.2904L31.0332 41.9056L30.2198 42.3865L30.0196 42.5082C30.0163 42.5082 30.0103 42.5115 30.0075 42.5143C29.4493 42.8158 28.8119 42.9895 28.132 42.9895C26.193 42.9895 24.5876 41.5858 24.2596 39.7345C24.2442 39.6493 24.2325 39.5608 24.2232 39.4755C24.211 39.314 24.2022 39.1557 24.1989 38.9942V15.9391C24.1989 15.2115 24.7878 14.6178 25.5158 14.6178C25.7888 14.6178 26.0436 14.703 26.2532 14.843L30.28 17.4828C30.3015 17.5011 30.3253 17.5165 30.35 17.5315C31.3911 18.2442 32.0711 19.4437 32.0711 20.8048Z" fill="url(#paint6_linear_1360_20283)"/>\n\t<path opacity="0.15" d="M45.251 39.1698C45.251 39.4283 45.2267 39.6778 45.1819 39.9208C45.1684 39.9855 45.1553 40.0501 45.1399 40.1147C45.111 40.2303 45.0802 40.3418 45.0424 40.4532C45.0223 40.5113 45.0023 40.5689 44.9803 40.6246C44.9579 40.6826 44.9337 40.7384 44.9094 40.7959C44.8361 40.9654 44.7493 41.1279 44.6518 41.2838C44.5253 41.4889 44.3811 41.6804 44.2211 41.8588C43.4861 42.6744 40.9899 44.1287 40.0701 44.7196L38.028 45.9716C36.5319 46.8968 35.1169 47.5514 33.3338 47.5959C33.2493 47.5982 33.1672 47.6006 33.0851 47.6006C32.9698 47.6006 32.8564 47.5982 32.743 47.594C29.7232 47.4784 27.0894 45.8518 25.5709 43.4479C24.876 42.3495 24.4163 41.0886 24.2609 39.734C24.5871 41.5854 26.1952 42.9891 28.1338 42.9891C28.8132 42.9891 29.4507 42.8177 30.0079 42.5143C30.0121 42.512 30.0168 42.5096 30.0214 42.5078L30.2212 42.3874L31.0341 41.9061L32.0687 41.2913V41.2623L32.2021 41.1822L41.4598 35.6793L42.1724 35.256L42.2434 35.2803C42.2457 35.2803 42.2499 35.2827 42.2522 35.2827C42.4566 35.3337 42.6564 35.403 42.8472 35.4878C43.2892 35.6793 43.6886 35.9513 44.0307 36.2833C44.1683 36.4148 44.2948 36.5572 44.4124 36.7089C44.5123 36.8358 44.6033 36.9697 44.6854 37.1097C45.0443 37.7104 45.251 38.4169 45.251 39.1698Z" fill="url(#paint7_linear_1360_20283)"/>\n\t<path opacity="0.1" d="M32.0711 20.8048L32.0678 41.2904L31.0332 41.9056L30.2198 42.3865L30.0196 42.5082C30.0163 42.5082 30.0103 42.5115 30.0075 42.5143C29.4493 42.8158 28.8119 42.9895 28.132 42.9895C26.193 42.9895 24.5876 41.5858 24.2596 39.7345C24.2442 39.6493 24.2325 39.5608 24.2232 39.4755C24.211 39.314 24.2022 39.1557 24.1989 38.9942V15.9391C24.1989 15.2115 24.7878 14.6178 25.5158 14.6178C25.7888 14.6178 26.0436 14.703 26.2532 14.843L30.28 17.4828C30.3015 17.5011 30.3253 17.5165 30.35 17.5315C31.3911 18.2442 32.0711 19.4437 32.0711 20.8048Z" fill="url(#paint8_linear_1360_20283)"/>\n\t</g>\n\t</g>\n\t<defs>\n\t<filter id="filter0_dd_1360_20283" x="0.4" y="0.2" width="67.2" height="67.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset/>\n\t<feGaussianBlur stdDeviation="1.4"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>\n\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1360_20283"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="2.8"/>\n\t<feGaussianBlur stdDeviation="2.8"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>\n\t<feBlend mode="normal" in2="effect1_dropShadow_1360_20283" result="effect2_dropShadow_1360_20283"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1360_20283" result="shape"/>\n\t</filter>\n\t<filter id="filter1_i_1360_20283" x="17.2" y="14.2" width="33.6" height="37.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>\n\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n\t<feOffset dy="4.2"/>\n\t<feGaussianBlur stdDeviation="6.825"/>\n\t<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>\n\t<feColorMatrix type="matrix" values="0 0 0 0 0.81875 0 0 0 0 0.824081 0 0 0 0 1 0 0 0 0.37 0"/>\n\t<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1360_20283"/>\n\t</filter>\n\t<linearGradient id="paint0_linear_1360_20283" x1="34" y1="3" x2="34" y2="59" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#F9F9F9"/>\n\t<stop offset="1" stop-color="#EDF0F9"/>\n\t</linearGradient>\n\t<linearGradient id="paint1_linear_1360_20283" x1="6.21374" y1="69.5" x2="69.1001" y2="60.2323" gradientUnits="userSpaceOnUse">\n\t<stop offset="0.107946" stop-color="#1D6CF2"/>\n\t<stop offset="0.870845" stop-color="#1B4AEF"/>\n\t</linearGradient>\n\t<radialGradient id="paint2_radial_1360_20283" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.5 53) rotate(14.0362) scale(49.4773)">\n\t<stop stop-color="#0B31A3"/>\n\t<stop offset="1" stop-color="#39A0ED"/>\n\t</radialGradient>\n\t<radialGradient id="paint3_radial_1360_20283" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25 23) rotate(-140.774) scale(31.6267)">\n\t<stop stop-color="#00FFF3" stop-opacity="0.77"/>\n\t<stop offset="0.423394" stop-color="#00FFF3" stop-opacity="0.72"/>\n\t<stop offset="1" stop-color="#5BDCD6" stop-opacity="0"/>\n\t</radialGradient>\n\t<linearGradient id="paint4_linear_1360_20283" x1="32.7126" y1="28.894" x2="47.1596" y2="37.2074" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#37BDFF"/>\n\t<stop offset="0.1832" stop-color="#33BFFD"/>\n\t<stop offset="0.3576" stop-color="#28C5F5"/>\n\t<stop offset="0.528" stop-color="#15D0E9"/>\n\t<stop offset="0.5468" stop-color="#12D1E7"/>\n\t<stop offset="0.5903" stop-color="#1CD2E5"/>\n\t<stop offset="0.7679" stop-color="#42D8DC"/>\n\t<stop offset="0.9107" stop-color="#59DBD6"/>\n\t<stop offset="1" stop-color="#62DCD4"/>\n\t</linearGradient>\n\t<linearGradient id="paint5_linear_1360_20283" x1="24.26" y1="41.4279" x2="45.2509" y2="41.4279" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#39D2FF"/>\n\t<stop offset="0.1501" stop-color="#38CEFE"/>\n\t<stop offset="0.2931" stop-color="#35C3FA"/>\n\t<stop offset="0.4327" stop-color="#2FB0F3"/>\n\t<stop offset="0.5468" stop-color="#299AEB"/>\n\t<stop offset="0.5827" stop-color="#2692EC"/>\n\t<stop offset="0.7635" stop-color="#1A6CF1"/>\n\t<stop offset="0.909" stop-color="#1355F4"/>\n\t<stop offset="1" stop-color="#104CF5"/>\n\t</linearGradient>\n\t<linearGradient id="paint6_linear_1360_20283" x1="28.1349" y1="43.2791" x2="28.1349" y2="15.1174" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="#1B48EF"/>\n\t<stop offset="0.1221" stop-color="#1C51F0"/>\n\t<stop offset="0.3212" stop-color="#1E69F5"/>\n\t<stop offset="0.5676" stop-color="#2190FB"/>\n\t<stop offset="1" stop-color="#26B8F4"/>\n\t</linearGradient>\n\t<linearGradient id="paint7_linear_1360_20283" x1="28.4323" y1="46.6256" x2="41.4292" y2="33.6719" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<linearGradient id="paint8_linear_1360_20283" x1="28.1349" y1="14.6178" x2="28.1349" y2="42.9892" gradientUnits="userSpaceOnUse">\n\t<stop stop-color="white"/>\n\t<stop offset="0.3726" stop-color="#FDFDFD"/>\n\t<stop offset="0.5069" stop-color="#F6F6F6"/>\n\t<stop offset="0.6026" stop-color="#EBEBEB"/>\n\t<stop offset="0.68" stop-color="#DADADA"/>\n\t<stop offset="0.7463" stop-color="#C4C4C4"/>\n\t<stop offset="0.805" stop-color="#A8A8A8"/>\n\t<stop offset="0.8581" stop-color="#888888"/>\n\t<stop offset="0.9069" stop-color="#626262"/>\n\t<stop offset="0.9523" stop-color="#373737"/>\n\t<stop offset="0.9926" stop-color="#090909"/>\n\t<stop offset="1"/>\n\t</linearGradient>\n\t<clipPath id="clip0_1360_20283">\n\t<rect width="33.6" height="33.6" fill="white" transform="translate(17.2 14.2)"/>\n\t</clipPath>\n\t<clipPath id="clip1_1360_20283">\n\t<rect width="22.4" height="33.6" fill="white" transform="translate(24.2 14.2)"/>\n\t</clipPath>\n\t</defs>\n\t</svg>  \n\t';let $w=class extends St{constructor(){super(),this.size=Bw.CibLogo32,this.svg="",this.update()}connectedCallback(){super.connectedCallback(),this.update()}update(){let O=32;switch(this.size){case Bw.CibLogo12:O=12,this.svg=CibLogoIcons.CibLogo12;break;case Bw.CibLogo16:O=16,this.svg=CibLogoIcons.CibLogo16;break;case Bw.CibLogo20:O=20,this.svg=CibLogoIcons.CibLogo20;break;case Bw.CibLogo24:O=24,this.svg=CibLogoIcons.CibLogo24;break;case Bw.CibLogo32:O=32,this.svg=CibLogoIcons.CibLogo32;break;case Bw.CibLogo36:O=36,this.svg=CibLogoIcons.CibLogo36;break;case Bw.CibLogo40:O=40,this.svg=CibLogoIcons.CibLogo40;break;case Bw.CibLogo48:O=48,this.svg=CibLogoIcons.CibLogo48;break;case Bw.CibLogo56:O=56,this.svg=CibLogoIcons.CibLogo56;break;case Bw.CibLogoWithBubble12:O=12,this.svg=CibLogoIcons.CibLogoWithBubble12;break;case Bw.CibLogoWithBubble16:O=16,this.svg=CibLogoIcons.CibLogoWithBubble16;break;case Bw.CibLogoWithBubble20:O=20,this.svg=CibLogoIcons.CibLogoWithBubble20;break;case Bw.CibLogoWithBubble24:O=24,this.svg=CibLogoIcons.CibLogoWithBubble24;break;case Bw.CibLogoWithBubble32:O=32,this.svg=CibLogoIcons.CibLogoWithBubble32;break;case Bw.CibLogoWithBubble36:O=36,this.svg=CibLogoIcons.CibLogoWithBubble36;break;case Bw.CibLogoWithBubble40:O=40,this.svg=CibLogoIcons.CibLogoWithBubble40;break;case Bw.CibLogoWithBubble48:O=48,this.svg=CibLogoIcons.CibLogoWithBubble48;break;case Bw.CibLogoWithBubble56:O=56,this.svg=CibLogoIcons.CibLogoWithBubble56}this.style.setProperty("--icon-size",`${O}px`)}};__decorate([attr,__metadata("design:type",String)],$w.prototype,"size",void 0),__decorate([observable,__metadata("design:type",String)],$w.prototype,"svg",void 0),$w=__decorate([customElement({name:"cib-logo",template:zw,styles:Fw}),__metadata("design:paramtypes",[])],$w);const Uw=html`
  <div class="privacy-statement">
    <a target="_blank" href=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.termsOfUseLink.url}}>${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.termsOfUseLink.title}}</a>
    <a class="privacy" target="_blank" href=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.privacyStatementLink.url}}
      >${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.privacyStatementLink.title}}</a
    >
  </div>
`,Vw=html`
  <div class="privacy-statement-muid">
    ${O=>{var B,U;return html`<p>
        ${null===(B=O.vm)||void 0===B?void 0:B.termsAndCondSeg1}
        <a target="_blank" href=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.termsOfUseLink.url}}>${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.termsOfUseLink.title}}</a>
        ${null===(U=O.vm)||void 0===U?void 0:U.termsAndCondSeg2}
        <a class="privacy" target="_blank" href=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.privacyStatementLink.url}}
          >${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.privacyStatementLink.title}}</a
        >.
      </p>`}}
  </div>
  <div class="get-started-button-wrapper">
    <button class="get-started-button" type="button" @click=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.provideConsent()}}>
      ${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.getStartedText}}
    </button>
  </div>
`,getPrivacyTemplate=O=>O.vm.isMuidConsentUngranted?Vw:Uw,Gw=html`
  <cib-suggestion-item
    class="welcome-suggestion-item"
    @click=${(O,B)=>B.parent.handleSuggestionClick(B.event)}
    :suggestion=${O=>O}
  >
  </cib-suggestion-item>
`,Hw=html`
  <cib-welcome-item
    class="info-item"
    product="${(O,B)=>B.parent.layout.productType}"
    ?bing-at-work=${(O,B)=>B.parent.vm.bingAtWorkEnabled}
    :header=${O=>O.header}
    :body=${O=>O.body}
    :isClickable=${O=>O.isClickable}
    :disabled=${(O,B)=>B.parent.vm.isMuidConsentUngranted}
    @click=${(O,B)=>O.isClickable&&B.parent.handleWelcomeMessageClick(B.event)}
  >
  </cib-welcome-item>
`,qw=html`
  <div class="learn-tog-item">
    ${O=>{var B,U,G;return html`<span
        >${null===(B=O.vm)||void 0===B?void 0:B.learnSegment1}
        <a class="feedback-form" @click=${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.openFeedbackForm()}}>${null===(U=O.vm)||void 0===U?void 0:U.learnSegment3}</a>
        ${null===(G=O.vm)||void 0===G?void 0:G.learnSegment2}</span
      >`}}
  </div>
`,jw=html`
  ${when((O=>{var B;return 0===(null===(B=O.slotContents)||void 0===B?void 0:B.length)}),html`
      <div class="container-logo">
        <cib-logo class="orb" size=${Bw.CibLogo56}></cib-logo>
      </div>
      <div class="container-title">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.titleText}}</div>
      <div class="container-subTitle">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.subTitleText}}</div>
    `)}

  <slot ${slotted("slotContents")}></slot>
  <div class="container-item">${repeat((O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.messageItems}),Hw,{recycle:!1})}</div>
  ${qw} ${getPrivacyTemplate}
`,Ww=html`
  <div class="mobile-container">
    <div class="container-logo">
      <cib-logo class="orb" size=${Bw.CibLogo56}></cib-logo>
    </div>
    <div class="welcome-body">
      <div class="mobile-title">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.titleText}}</div>
      <div class="mobile-subTitle">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.tertiaryTitleText}}</div>
      ${getPrivacyTemplate}
    </div>
    <div class="welcome-suggestion">
      ${when((O=>{var B;return 0===(null===(B=O.slotContents)||void 0===B?void 0:B.length)&&!O.vm.isMuidConsentUngranted}),html` ${repeat((O=>O.vm.getSuggestions()),Gw,{recycle:!1})} `)}
    </div>
    <slot ${slotted("slotContents")} class="welcome-suggestion"> </slot>
  </div>
`,Yw=html`
  ${when((O=>{var B;return 0===(null===(B=O.slotContents)||void 0===B?void 0:B.length)}),html`
      <div class="container-title">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.titleText}}</div>
      <div class="container-subTitle">${O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.subTitleText}}</div>
    `)}

  <slot ${slotted("slotContents")}></slot>
  <div class="container-item">${repeat((O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.messageItems}),Hw,{recycle:!1})}</div>
  ${getPrivacyTemplate}
`,Kw=html`
  <template product=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.productType}} ?bing-at-work=${O=>O.vm.bingAtWorkEnabled}>
    ${O=>(O=>{var B,U,G;switch(null===(B=O.layout)||void 0===B?void 0:B.productType){case Mb.Shoreline:return Yw;case Mb.Bing:default:if(!(null===(U=O.layout)||void 0===U?void 0:U.isMobile))return jw;if((null===(G=O.layout)||void 0===G?void 0:G.isMobile)&&O.vm.showWelcomeScreen)return Ww}})(O)}
  </template>
`;let Qw=class extends St{constructor(){super(...arguments),this.handleWelcomeMessageClick=O=>{const B=O.target;return this.vm.serp.submitQuery(null==B?void 0:B.body),!0},this.handleSuggestionClick=O=>{const B=O.target;return this.vm.serp.invokeSuggestion(B.suggestion),!0}}};__decorate([observable,__metadata("design:type",Object)],Qw.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],Qw.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Array)],Qw.prototype,"slotContents",void 0),Qw=__decorate([customElement({name:"cib-welcome-container",template:Kw,styles:Ow})],Qw);const Zw=css`
  :host {
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    max-width: 1120px;
    transition-property: transform, max-width, min-width;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  :host .floating,
  :host .bottom {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  :host .floating {
    position: fixed;
    top: 180px;
    inset-inline-start: 0;
    width: calc(100% - var(--side-panel-width, 0px));
    z-index: 5;
  }

  :host([mobile]) .floating {
    top: 48px;
    padding: 16px 0px;
    width: 100%;
  }

  :host([alignment=${Gy.Left}]) .floating {
    max-width: 1440px;
    box-sizing: border-box;
  }

  :host([shared]) .bottom-notifications {
    margin-bottom: 20px;
  }

  .bottom-notifications {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 60px 0 0;
  }

  .bottom-notifications.slotted {
    margin: 0;
  }
`,Xw=css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* INLINE TYPE */

  .inline-type {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 1120px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .inline-type .text-container {
    max-width: 80%;
    padding: 0 10px;
    align-items: center;
  }

  .inline-type svg-icon {
    position: relative;
    top: 6px;
    margin-right: 4px;
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  .inline-type .title {
    display: inline;
    position: relative;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .inline-type .subtitle {
    display: inline;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    font-weight: 600;
  }

  .inline-type button {
    display: inline;
    position: relative;
    align-items: center;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .inline-type.with-decorative-line::before,
  .inline-type.with-decorative-line::after {
    content: "";
    flex: 1;
    margin-top: 4px;
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .inline-type.with-decorative-line::before {
    margin-inline-end: 1vw;
  }

  .inline-type.with-decorative-line::after {
    margin-inline-start: 1vw;
  }

  @media (hover: hover) {
    .inline-type button:hover {
      text-decoration: underline;
    }
  }

  /* STACKED INLINE TYPE */

  .inline-type.stacked-inline {
    flex-direction: column;
    margin-top: -20px;
  }

  .inline-type.stacked-inline svg-icon {
    margin: 0 0 20px;
  }

  .inline-type.stacked-inline .title {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    font-size: 13px;
    font-weight: 400;
  }

  /* TOAST TYPE */

  .toast-type {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCardInverted};
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundInverted};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    padding: 12px 16px;
    margin: 0 12px;
    gap: 10px;
    min-width: 46px;
    max-width: 600px;
    width: 354px;
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .toast-type button {
    display: flex;
    height: 32px;
    padding: 0 16px;
    align-items: center;
    margin: 0;
    border: 0;
    margin-left: 8px;
    border-radius: 4px;
    color: black;
    background-color: white;
    opacity: 0.9;
    cursor: pointer;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .toast-type .icon {
    display: flex;
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundInverted};
  }

  .toast-type button:hover {
    opacity: 1;
  }

  .toast-type button:active {
    opacity: 0.8;
  }

  .toast-type button:focus,
  .toast-type button:focus-visible {
    outline: 2px solid ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  /* MOBILE */

  :host([mobile]) .inline-type {
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: 500;
  }

  :host([mobile]) .inline-type .text-container {
    display: flex;
    flex-direction: column;
  }

  :host([mobile]) .inline-type button {
    width: 100%;
    text-align: center;
    justify-content: center;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: 500;
  }

  :host([mobile]) .inline-type button:before {
    content: "";
    position: absolute;
    inset: -12px;
  }

  :host([mobile]) .toast-type {
    width: 85vw;
  }

  /* MEDIA QUERIES */

  @media (max-width: 767px) {
    .inline-type {
      margin-bottom: unset;
    }
  }

  /* ICON */
  .inline-type svg-icon[type="hug-fill"] {
    background: ${tb.theme.brandColors.background.colorBrandTertiaryBackground};
    padding: 6px 4px 3px;
    border-radius: 4px;
  }
`,getSvgIcon=O=>{const B=new Map([[bh.Loading,lE.RotatingLoader],[bh.Warning,lE.Warning],[bh.Information,lE.HugFill],[bh.Success,lE.Success],[bh.Information,lE.HugFill]]);if(void 0!==O&&B.has(O))return html`<svg-icon type=${B.get(O)} size="20"></svg-icon>`},Jw=html`<div
  class="inline-type with-decorative-line"
>
  <div class="text-container">
    ${when((O=>{var B;return!!(null===(B=O.body.text)||void 0===B?void 0:B.length)}),html`<div class="title">
        ${when((O=>void 0!==O.body.icon),html`${O=>getSvgIcon(O.body.icon)}</div>`)}
        ${O=>O.body.text}
      </div>`)}
    ${when((O=>{var B;return!!(null===(B=O.body.innerHTML)||void 0===B?void 0:B.length)}),html`<div class="title">
        ${when((O=>void 0!==O.body.icon),html`${O=>getSvgIcon(O.body.icon)}</div>`)}
        <span :innerHTML="${O=>O.body.innerHTML}"></span>
      </div>`)}
    ${when((O=>{var B;return(null===(B=O.body.subText)||void 0===B?void 0:B.length)>0}),html`<div class="subtitle">${O=>O.body.subText}</div>`)}
    ${when((O=>{var B;return(null===(B=O.body.cta)||void 0===B?void 0:B.length)>0}),html`<button class="cta" @click=${O=>O.body.resetHandler()}>${O=>O.body.cta}</button>`)}
  </div>
</div>`,ek=html`<div
  class="inline-type stacked-inline"
>
  ${when((O=>void 0!==O.body.icon),html`${O=>getSvgIcon(O.body.icon)}</div>`)}
  <div class="text-container">
    ${when((O=>{var B;return!!(null===(B=O.body.text)||void 0===B?void 0:B.length)}),html`<div class="title">${O=>O.body.text}</div>`)}
    ${when((O=>{var B;return!!(null===(B=O.body.innerHTML)||void 0===B?void 0:B.length)}),html`<div class="title" :innerHTML="${O=>O.body.innerHTML}"></div>`)}
  </div>
</div>`,tk=html`<div class="toast-type">
  ${when((O=>void 0!==O.body.icon),html`<div class="icon">${O=>getSvgIcon(O.body.icon)}</div>`)}
  ${when((O=>{var B;return!!(null===(B=O.body.text)||void 0===B?void 0:B.length)}),html`<div class="title">${O=>O.body.text}</div>`)}
  ${when((O=>{var B;return!!(null===(B=O.body.innerHTML)||void 0===B?void 0:B.length)}),html`<div class="title" :innerHTML="${O=>O.body.innerHTML}"></div>`)}
  ${when((O=>O.body.resetHandler),html`<button @click=${O=>O.body.resetHandler()}>${O=>O.body.cta}</button>`)}
</div>`,ik=html`
  <template ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}} :type=${O=>O.body.type}> ${O=>(O=>{switch(null==O?void 0:O.body.type){case vh.Inline:return Jw;case vh.StackedInline:return ek;case vh.Toast:return tk;default:return}})(O)} </template>
`;let rk=class extends St{constructor(){super(...arguments),this.mobile=!1}};__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],rk.prototype,"mobile",void 0),__decorate([observable,__metadata("design:type",Object)],rk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Object)],rk.prototype,"body",void 0),rk=__decorate([customElement({name:"cib-notification",template:ik,styles:Xw})],rk);const nk=html`<div class="floating">
  <div class="floating-notifications">
    ${when((O=>{var B;return 0===(null===(B=O.floatingContainerSlotContents)||void 0===B?void 0:B.length)}),html`<cib-notification
        :layout=${O=>O.layout}
        :body=${O=>O.vm.floatingNotification}
      ></cib-notification>`)}
  </div>
  <slot ${slotted("floatingContainerSlotContents")} class="floating-notifications"></slot>
</div>`,ak=html`<div class="bottom">
  <div class="bottom-notifications">
    ${when((O=>{var B;return 0===(null===(B=O.bottomBarContainerSlotContents)||void 0===B?void 0:B.length)}),html`<cib-notification
        :layout=${O=>O.layout}
        :body=${O=>O.vm.bottomBarNotification}
      ></cib-notification>`)}
  </div>
  <slot ${slotted("bottomBarContainerSlotContents")} class="bottom-notifications slotted"></slot>
</div>`,sk=html`
  <template
    ?mobile=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isMobile}}
    alignment=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.alignment}}
    ?shared=${O=>{var B;return null===(B=O.layout)||void 0===B?void 0:B.isSharedConversation}}
  >
    ${when((O=>{var B;return(null===(B=O.vm)||void 0===B?void 0:B.floatingNotification)&&O.layout.serpSlot===jy.None}),nk)}
    ${when((O=>{var B;return null===(B=O.vm)||void 0===B?void 0:B.bottomBarNotification}),ak)}
  </template>
`;let lk=class extends St{};__decorate([observable,__metadata("design:type",Object)],lk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Array)],lk.prototype,"floatingContainerSlotContents",void 0),__decorate([observable,__metadata("design:type",Array)],lk.prototype,"bottomBarContainerSlotContents",void 0),lk=__decorate([customElement({name:"cib-notification-container",template:sk,styles:Zw})],lk);const ck=css`
  :host {
    display: flex;
    align-self: center;
    justify-content: center;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 2px 0;
    margin: 0 0 12px;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
  }

  .container:not([visible]) {
    pointer-events: none;
  }

  fieldset {
    opacity: 0;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
    border: none;
  }

  .container[visible] fieldset {
    opacity: 1;
  }

  .container fieldset[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  .container[mobile] {
    padding: 24px 2px 0;
    margin: 30px 0 0;
    border-top: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  .container[product-type=${Mb.Shoreline}] {
    margin: 50px 0 12px;
  }

  .container[product-type=${Mb.Shoreline}] fieldset legend {
    margin: 0 auto 0 auto;
  }

  .preview-label {
    display: inline-block;
    padding: 2px 6px;
    margin: 0 8px;
    transform: translateY(-2px);
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    border: solid 1px ${tb.theme.neutralColors.foreground.colorNeutralForegroundHintLight};
    border-radius: 4px;
    font-size: ${tb.platform.typography.typeRamp.caption1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1Stronger.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.caption1Stronger.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1Stronger.fontVariationSettings};
  }

  .options-list-container {
    padding: 3px;
    margin: 16px 0;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  .options {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .option {
    display: inline-block;
    min-width: 96px;
    height: 42px;
    border-radius: 6px;
    outline: 1px solid transparent;
  }

  .option:not(:last-child) {
    padding: 0 4px 0 0;
  }

  .option button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    border: none;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    font-family: ${tb.platform.typography.fonts.text};
  }

  .option button:not([selected]) {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  .option button:not([selected])::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackgroundAlt};
    opacity: 0.5;
    z-index: -1;
  }

  .option button[selected] {
    color: ${tb.theme.brandColors.foreground.colorBrandPrimaryForeground};
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  .label-modifier {
    display: block;
    margin-bottom: -2px;
    font-size: ${tb.platform.typography.typeRamp.caption2Strong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption2Strong.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.caption2Strong.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption2Strong.fontVariationSettings};
  }

  .label {
    display: block;
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1Stronger.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
  }

  .container cib-tooltip {
    width: var(--tooltip-width);
    left: unset;
    right: unset;
    bottom: 80px;
    margin-inline-start: calc(50% - 153px);
  }
`.withBehaviors(tE(css`
    .option button[selected] {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background: ${iE.ActiveText};
      outline-color: ${iE.ActiveText};
    }

    .option button:focus-visible {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
      outline-color: ${iE.Highlight};
    }
  `)),dk=html`
  <li
    class="option"
    @mouseover=${(O,B)=>B.parent.handleMouseOver(O)}
    @mouseout=${(O,B)=>B.parent.handleMouseOut()}
    @focusin=${(O,B)=>B.parent.handleFocusIn(O)}
    @focusout=${(O,B)=>B.parent.handleFocusOut()}
  >
    <button
      class=${O=>`tone-${O.tone.toLowerCase()}`}
      ?selected=${(O,B)=>O.tone===B.parent.vm.tone}
      ?disabled=${(O,B)=>B.parent.vm.isToneButtonDisabled}
      @click=${(O,B)=>B.parent.handleClick(O.tone)}
      aria-pressed=${(O,B)=>O.tone===B.parent.vm.tone}
    >
      <span class="label-modifier">${O=>O.labelModifier}</span><span class="label">${O=>O.label}</span>
    </button>
  </li>
`,pk=html`
  <div
    class="container"
    ?visible=${O=>O.vm.isVisible}
    ?mobile=${O=>O.vm.serp.isMobile}
    product-type=${O=>O.vm.serp.productType}
  >
    <fieldset ?disabled=${O=>O.vm.isDisabled}>
      <legend>
        ${O=>O.vm.strings.description}${when((O=>O.vm.isPreviewEnabled),html`<span class="preview-label">${O=>O.vm.strings.preview}</span>`)}
      </legend>
      <div class="options-list-container">
        <ul id="tone-options" class="options">
          ${repeat((O=>O.vm.toneOptions),dk)}
        </ul>
      </div>
    </fieldset>
    <cib-tooltip anchor-id="tone-options" arrow-offset=${O=>O.tooltipArrowOffset}>
      ${O=>{var B;return`${null===(B=O.highlightedOption)||void 0===B?void 0:B.tooltip}`}}
    </cib-tooltip>
  </div>
`;let uk=class extends St{constructor(){super(),this.highlightedOption=null,this.tooltipArrowOffset=0,this.tooltipWidth=306,this.handleClick=O=>{this.vm.tone=O},this.handleMouseOver=O=>{this.setHighlightedOption(O)},this.handleMouseOut=()=>{this.resetHighlightedOption()},this.handleFocusIn=O=>{this.setHighlightedOption(O)},this.handleFocusOut=()=>{this.resetHighlightedOption()},this.highlightedOptionChanged=(O,B)=>{B&&(this.tooltipArrowOffset=this.tooltipWidth/this.vm.toneOptions.length-60+100*this.vm.toneOptions.indexOf(B))},this.setHighlightedOption=O=>{this.highlightedOptionTimer.cancel(),this.highlightedOption=O},this.resetHighlightedOption=()=>{this.highlightedOptionTimer.cancelAndSet((()=>{this.highlightedOption=null}),300)},this.disposer=new Disposer,this.highlightedOptionTimer=this.disposer.register(new async_TimeoutTimer),this.style.setProperty("--tooltip-width",`${this.tooltipWidth}px`)}disconnectedCallback(){super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose()}};__decorate([observable,__metadata("design:type",Object)],uk.prototype,"highlightedOption",void 0),__decorate([observable,__metadata("design:type",Number)],uk.prototype,"tooltipArrowOffset",void 0),uk=__decorate([customElement({name:"cib-tone-selector",template:pk,styles:ck}),__metadata("design:paramtypes",[])],uk);const hk=css`
  :host {
    display: flex;
    align-self: center;
    justify-content: center;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 2px 0;
    margin: 0 0 12px;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    opacity: 0;
    transition-property: opacity;
    transition-duration: ${tb.static.motion.duration.fast};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .container:not([visible]) {
    pointer-events: none;
  }

  .container[visible] {
    opacity: 1;
  }

  .container[mobile] {
    padding: 0 2px 0;
  }

  .switch-container {
    display: flex;
    padding: 6px 4px;
    margin: 16px 0;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  .switch {
    height: 20px;
    padding: 8px;
  }

  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-inline-start: 12px;
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1Stronger.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
  }

  @media (min-width: 767px) {
    .container[mobile] {
      padding: 24px 2px 0;
      margin: 30px 0 0;
      border-top: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    }
  }
`;var mk;(function(O){O[O.alt=18]="alt",O[O.arrowDown=40]="arrowDown",O[O.arrowLeft=37]="arrowLeft",O[O.arrowRight=39]="arrowRight",O[O.arrowUp=38]="arrowUp",O[O.back=8]="back",O[O.backSlash=220]="backSlash",O[O.break=19]="break",O[O.capsLock=20]="capsLock",O[O.closeBracket=221]="closeBracket",O[O.colon=186]="colon",O[O.colon2=59]="colon2",O[O.comma=188]="comma",O[O.ctrl=17]="ctrl",O[O.delete=46]="delete",O[O.end=35]="end",O[O.enter=13]="enter",O[O.equals=187]="equals",O[O.equals2=61]="equals2",O[O.equals3=107]="equals3",O[O.escape=27]="escape",O[O.forwardSlash=191]="forwardSlash",O[O.function1=112]="function1",O[O.function10=121]="function10",O[O.function11=122]="function11",O[O.function12=123]="function12",O[O.function2=113]="function2",O[O.function3=114]="function3",O[O.function4=115]="function4",O[O.function5=116]="function5",O[O.function6=117]="function6",O[O.function7=118]="function7",O[O.function8=119]="function8",O[O.function9=120]="function9",O[O.home=36]="home",O[O.insert=45]="insert",O[O.menu=93]="menu",O[O.minus=189]="minus",O[O.minus2=109]="minus2",O[O.numLock=144]="numLock",O[O.numPad0=96]="numPad0",O[O.numPad1=97]="numPad1",O[O.numPad2=98]="numPad2",O[O.numPad3=99]="numPad3",O[O.numPad4=100]="numPad4",O[O.numPad5=101]="numPad5",O[O.numPad6=102]="numPad6",O[O.numPad7=103]="numPad7",O[O.numPad8=104]="numPad8",O[O.numPad9=105]="numPad9",O[O.numPadDivide=111]="numPadDivide",O[O.numPadDot=110]="numPadDot",O[O.numPadMinus=109]="numPadMinus",O[O.numPadMultiply=106]="numPadMultiply",O[O.numPadPlus=107]="numPadPlus",O[O.openBracket=219]="openBracket",O[O.pageDown=34]="pageDown",O[O.pageUp=33]="pageUp",O[O.period=190]="period",O[O.print=44]="print",O[O.quote=222]="quote",O[O.scrollLock=145]="scrollLock",O[O.shift=16]="shift",O[O.space=32]="space",O[O.tab=9]="tab",O[O.tilde=192]="tilde",O[O.windowsLeft=91]="windowsLeft",O[O.windowsOpera=219]="windowsOpera",O[O.windowsRight=92]="windowsRight"})(mk||(mk={}));const gk=css`
  :host {
    display: flex;
    align-self: center;
    justify-content: center;
  }

  .container {
    position: relative;
    display: flex;
    width: 40px;
    height: 20px;
  }

  .container input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    border-radius: 10px;
    background-color: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
    transition-property: background, transform;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    border-radius: 50%;
    background-color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    transition-property: background, transform;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  :host([aria-checked="true"]) .slider {
    border-color: transparent;
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  :host([aria-checked="true"]) .slider:before {
    background-color: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    transform: translateX(20px);
  }
`,fk=html`
  <template
    role="switch"
    tabindex="0"
    aria-checked="${O=>O.checked}"
    @keydown="${(O,B)=>O.keydownHandler(B.event)}"
    @click="${(O,B)=>O.clickHandler(B.event)}"
  >
    <label class="container">
      <span class="slider"></span>
    </label>
    <slot></slot>
  </template>
`;let yk=class extends St{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.keydownHandler=O=>{var B;if(this.disabled)return!0;switch(O.key){case"Enter":case" ":this.checked=!this.checked,null===(B=this.onChange)||void 0===B||B.call(this,O,this.checked)}return!0},this.clickHandler=O=>{var B;this.disabled||(this.checked=!this.checked,null===(B=this.onChange)||void 0===B||B.call(this,O,this.checked))}}};__decorate([attr({mode:"boolean"}),__metadata("design:type",Boolean)],yk.prototype,"checked",void 0),yk=__decorate([customElement({name:"cib-switch",template:fk,styles:gk})],yk);const _k=html`
  <div class="container" ?visible=${O=>O.vm.isVisible} ?mobile=${O=>O.vm.serp.isMobile}>
    <div>${O=>O.vm.strings.description}</div>
    <div class="switch-container">
      <cib-switch class="switch" ?checked=${O=>O.vm.isWorkIncluded} :onChange=${O=>O.handleClick}>
        <div class="label">${O=>O.vm.strings.label}</div>
      </cib-switch>
    </div>
  </div>
`;let vk=class extends St{constructor(){super(...arguments),this.handleClick=(O,B)=>{this.vm.isWorkIncluded=B}}};vk=__decorate([customElement({name:"cib-work-toggle",template:_k,styles:hk})],vk);const bk=html`
  <div class="fade top">
    <cib-background class="background" :vm=${O=>O.vm.serp.background}></cib-background>
  </div>
  <div class="fade bottom">
    <cib-background class="background" :vm=${O=>O.vm.serp.background}></cib-background>
  </div>
`,Sk=html`
  ${when((O=>O.vm.turnCount>O.vm.slottedModeTurnIndex&&O.vm.turns[O.vm.slottedModeTurnIndex].bot.messageCount>0),html`
      <div class="content">
        <div class="main">
          <cib-chat-turn :vm=${O=>O.vm.turns[O.vm.slottedModeTurnIndex]} :layout=${O=>O.layout}>
            <cib-message-group
              :vm=${O=>O.vm.turns[O.vm.slottedModeTurnIndex].bot}
              :layout=${O=>O.layout}
            ></cib-message-group>
          </cib-chat-turn>
        </div>
        <cib-suggestion-bar class="suggestion-bar" :layout=${O=>O.layout} :vm=${O=>O.vm}></cib-suggestion-bar>
      </div>
    `)}
  ${when((O=>O.vm.chatErrorState!==Gc.OK),html`<cib-notification-container
      :layout=${O=>O.layout}
      :vm=${O=>O.vm.notificationContainer}
    ></cib-notification-container>`)}
`,Ck=html`
  <div class="scroller" ${ref("scrollerRef")}>
    <div class="scroller-positioner">
      <div class="content" ${ref("contentRef")}>
        <div class="main" id="cib-chat-main">
          <slot></slot>
          <div class="intro">
            ${when((O=>{var B;return null===(B=O.vm.welcomeContainer)||void 0===B?void 0:B.showWelcomeScreen}),html`<cib-welcome-container
                :vm=${O=>O.vm.welcomeContainer}
                :layout=${O=>O.layout}
              ></cib-welcome-container>`)}
            <div class="container-control">
              ${when((O=>O.vm.toneSelector.isEnabled),html`<cib-tone-selector :vm=${O=>O.vm.toneSelector}></cib-tone-selector>`)}
              ${when((O=>O.vm.workToggle.isEnabled),html`<cib-work-toggle :vm=${O=>O.vm.workToggle}></cib-work-toggle>`)}
            </div>
          </div>
          ${repeat((O=>O.vm.turns),html`<cib-chat-turn
              :vm=${O=>O}
              :layout=${(O,B)=>B.parent.layout}
              ${ref("turnRef")}
            ></cib-chat-turn>`,{recycle:!1})}
          <cib-notification-container
            :layout=${O=>O.layout}
            :vm=${O=>O.vm.notificationContainer}
          ></cib-notification-container>
        </div>
        ${when((O=>O.vm.turnCount>0&&O.layout.serpSlot!==jy.Creator&&!(O.layout.isSharedConversation&&O.layout.serpSlot===jy.None&&O.vm.serp.mode===Hy.Conversation)),html`<cib-suggestion-bar
            class="suggestion-bar ${O=>O.vm.suggestionBarVisible?"visible":"hidden"}"
            :layout=${O=>O.layout}
            :vm=${O=>O.vm}
          ></cib-suggestion-bar>`)}
      </div>
    </div>
    <slot class="side-panel" name="side-panel"></slot>
    ${when((O=>!O.layout.isMobile||O.layout.productType!==Mb.Shoreline),bk)}
  </div>
  <div class="divider"></div>
`,Ek=html`
  <template
    id="cib-conversation-main"
    ?mobile=${O=>O.layout.isMobile}
    ?loading=${O=>O.isLoading}
    ?empty=${O=>{var B;return 0===O.vm.turnCount&&!(null===(B=O.vm.welcomeContainer)||void 0===B?void 0:B.showWelcomeScreen)}}
    mode=${O=>O.vm.serp.mode}
    alignment=${O=>O.layout.alignment}
    serp-slot=${O=>O.layout.serpSlot}
    product-type=${O=>O.layout.productType}
    ?side-panel=${O=>O.vm.isSidePanelEnabled}
    ?side-panel-docked=${O=>O.vm.isSidePanelDocked}
  >
    ${when((O=>O.layout.serpSlot===jy.None),Ck)}
    ${when((O=>O.layout.serpSlot===jy.Creator),Sk)}
    ${when((O=>O.layout.serpSlot===jy.Pole),Sk)}
    ${when((O=>O.layout.serpSlot===jy.RightRail),Sk)}
  </template>
`;let xk=class extends St{constructor(){super(),this.hasBottomFade=!1,this.hasTopFade=!0,this.isScrollEnabled=!1,this.isLoading=!0,this.contentSizeObserver=null,this.scrollerSizeObserver=null,this.currentContentHeight=0,this.previousContentHeight=0,this.previousLastMessage=null,this.throttleTime=10,this.isWindowResizing=!1,this.resizeDelayTimerId=null,this.scrollPosition=0,this.isScrollWithinLowerSnapRegion=!0,this.isPartialScroll=!1,this.handleResize=()=>{this.isWindowResizing=!0,this.startResizeTimer()},this.throttledHandleResize=lodash_es_throttle(this.handleResize,this.throttleTime),this.handleResizeEnd=()=>{this.isWindowResizing=!1,this.updateScrollerEnabled(),this.updateContentHeight()},this.onContentResize=O=>{this.updateScrollerEnabled();const B=this.vm.turnCount?this.vm.current.lastMessage:null;this.vm.shouldAnimate=this.previousLastMessage!==B&&this.isScrollWithinLowerSnapRegion&&!this.isPartialScroll,this.previousLastMessage=B,this.animateContent()},this.onScrollerResize=O=>{this.scrollerRef&&this.isScrollWithinLowerSnapRegion},this.handleScroll=()=>{if(void 0!==this.scrollerRef&&void 0!==this.contentRef&&this.scrollPosition!==this.scrollerRef.scrollTop){this.scrollPosition=this.scrollerRef.scrollTop;const O=this.contentRef.scrollHeight-this.scrollerRef.clientHeight,B=120;this.isScrollWithinLowerSnapRegion=!0,this.scrollPosition<O-B&&(this.isScrollWithinLowerSnapRegion=!1);let U=!1,G=!1;this.scrollerRef.scrollTop<1&&(U=!0),this.scrollPosition>O-1&&(G=!0),this.hasBottomFade=!1,this.scrollPosition<O-1&&(this.hasBottomFade=!0),this.vm.isScrollTop=U,this.vm.isScrollBottom=G,this.vm.hoverCard.setTarget(null)}},this.throttledHandleScroll=lodash_es_throttle(this.handleScroll,this.throttleTime),this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.contentRef&&this.scrollerRef&&(this.contentSizeObserver=new ResizeObserver(this.onContentResize),this.scrollerSizeObserver=new ResizeObserver(this.onScrollerResize),this.contentSizeObserver.observe(this.contentRef),this.scrollerSizeObserver.observe(this.scrollerRef),this.updateScrollerEnabled(),this.disposer.register(addDisposableListener(window,"resize",this.throttledHandleResize)),this.contentRef&&this.disposer.register(addDisposableListener(this.contentRef,"transitionend",this.updateScrollPosition)),this.scrollerRef&&this.disposer.register(addDisposableListener(this.scrollerRef,"scroll",this.throttledHandleScroll,{passive:!0})),this.vm.setScroller(this.scrollerRef),this.onLoad())}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.contentSizeObserver)||void 0===O||O.unobserve(this),this.disposer.isDisposed||this.disposer.dispose()}startResizeTimer(){this.resizeDelayTimerId&&(window.clearTimeout(this.resizeDelayTimerId),this.resizeDelayTimerId=null),this.resizeDelayTimerId=window.setTimeout(this.handleResizeEnd,166)}updateContentHeight(){void 0!==this.contentRef&&(this.previousContentHeight=this.contentRef.offsetHeight)}animateContent(){if(void 0!==this.scrollerRef&&void 0!==this.contentRef)if(this.vm.shouldAnimate){if(!this.isWindowResizing){this.currentContentHeight=this.contentRef.offsetHeight;const O=this.currentContentHeight-this.previousContentHeight;this.contentRef.style.removeProperty("transition-duration"),this.contentRef.style.setProperty("transform",`translateY(${O}px)`),setTimeout((()=>{var O,B;null===(O=this.contentRef)||void 0===O||O.style.setProperty("transition-duration","333ms"),null===(B=this.contentRef)||void 0===B||B.style.removeProperty("transform"),this.previousContentHeight=this.currentContentHeight}))}}else this.previousContentHeight=this.contentRef.offsetHeight}updateScrollerEnabled(){void 0!==this.scrollerRef&&void 0!==this.contentRef&&(this.contentRef.offsetHeight>this.scrollerRef.offsetHeight?(this.isScrollEnabled||(this.scrollerRef.classList.toggle("scroller-enabled",!0),this.isScrollEnabled=!0),this.updateScrollPosition()):this.isScrollEnabled&&(this.scrollerRef.classList.toggle("scroller-enabled",!1),this.isScrollEnabled=!1))}updateScrollPosition(){void 0!==this.scrollerRef&&void 0!==this.contentRef&&this.isScrollWithinLowerSnapRegion&&(this.scrollViewFrame(),this.contentRef.style.removeProperty("transition-duration"))}scrollViewFrame(){const{lastMessage:O,turnRef:B}=this.vm.current;if(void 0!==B&&this.isAnswerTypeMessage(O)){const O=B.getBoundingClientRect().top,U=this.scrollerRef.getBoundingClientRect().top;if(O-U>0){const B=O-U-(this.layout.isMobile?0:94);this.isPartialScroll=!0,this.scrollerRef.scrollBy({top:B,behavior:"smooth"})}}else this.isPartialScroll=!1,this.scrollerRef.scrollTop=this.scrollerRef.scrollHeight}isAnswerTypeMessage(O){return(null==O?void 0:O.author)===Yi.Bot&&O.type===vp.Host&&O.contentType===bp.Answer}onLoad(){setTimeout((()=>{jd((()=>{this.isLoading=!1}))}),20)}};__decorate([attr({attribute:"has-bottom-fade",mode:"boolean"}),__metadata("design:type",Boolean)],xk.prototype,"hasBottomFade",void 0),__decorate([attr({attribute:"has-top-fade",mode:"boolean"}),__metadata("design:type",Boolean)],xk.prototype,"hasTopFade",void 0),__decorate([observable,__metadata("design:type",Boolean)],xk.prototype,"isScrollEnabled",void 0),__decorate([observable,__metadata("design:type",Object)],xk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],xk.prototype,"isLoading",void 0),xk=__decorate([customElement({name:"cib-conversation",template:Ek,styles:qx}),__metadata("design:paramtypes",[])],xk);const Tk=css`
  :host {
    --translate-y: 0%;
    --translate-panel-y: 200px;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%;
    min-height: 200px;
    max-height: min(calc(90vh - calc(env(safe-area-inset-top))), 100% - 80px);
    padding-bottom: max(0px, calc(env(safe-area-inset-bottom) - 20px));
    box-sizing: border-box;
    border-radius: 16px 16px 0 0;
    will-change: transform;
    backface-visibility: hidden;
    transform: unset;
    transition-property: transform;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-easising-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* PANEL */

  .panel {
    display: block;
    position: absolute;
    inset: 0px 0px -100vh;
    top: 100%;
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
    border-radius: 16px 16px 0 0;
    outline: 1px solid transparent;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, var(--translate-panel-y), 0);
    transition-duration: ${tb.static.motion.duration.normal};
    transition-easising-function: ${tb.static.motion.easingFunction.motionIn};
    box-shadow: ${tb.theme.shadows.defaults.card};
  }

  /* DETECTOR */

  .detector {
    position: absolute;
    height: 60px;
    width: 100%;
    left: 0;
    top: 0;
    touch-action: none;
  }

  /* GRABBER */

  .grabber {
    position: relative;
    height: 20px;
    width: 100%;
    flex-shrink: 0;
  }

  /* grabber background is the same in light and dark theme */

  .grabber::before {
    content: "";
    position: absolute;
    height: 4px;
    width: 36px;
    border-radius: 2px;
    left: calc(50% - 18px);
    top: 8px;
    background: #919191;
    outline: 1px solid transparent;
    backface-visibility: hidden;
    will-change: transform;
  }

  /* MAIN */

  .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    width: 100%;
    min-height: 0px;
    padding-top: 20px;
  }

  /* STATES */

  :host([mode=${Hy.OffStage}]) {
    transform: translateY(100%);
  }

  :host([initialize]) .panel {
    transition: unset;
  }

  :host([welcome]) {
    height: min(calc(90vh - calc(env(safe-area-inset-top))), 100% - 80px);
  }

  :host([down]) {
    transition: unset;
    transform: translate3d(0, var(--translate-y), 0);
  }

  :host([history]) .main {
    padding-top: 64px;
  }

  :host([down]) .panel {
    transition: unset;
  }
`,wk=html`
  <template
    mode=${O=>O.vm.serp.mode}
    ?initialize=${O=>O.isInitializing}
    ?down=${O=>O.isTouchDown}
    ?welcome=${O=>O.vm.enableWelcomeScreen}
    ?history=${O=>O.vm.enableHistory}
  >
    <div class="panel" ${ref("panelRef")}>
      <div class="grabber"></div>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="detector" ${ref("detectorRef")}></div>
    ${when((O=>O.vm.shouldRenderHeaderBar),html`<cib-header-bar :layout=${O=>O.layout} :vm=${O=>O.vm.headerBar}></cib-header-bar>`)}
  </template>
`;let kk=class extends St{constructor(){super(),this.isTouchDown=!1,this.isInitializing=!0,this.resizeObserver=null,this.rafId=0,this.panelHeight=0,this.touchStartY=0,this.touchDeltaY=0,this.touchDeltaPreviousY=0,this.touchDirectionIsDown=!1,this.handleShareButtonClick=()=>{this.vm.shareConversation()},this.setPanelHeight=()=>{this.panelRef&&(this.panelHeight=this.offsetHeight,this.isInitializing=!1)},this.onDrawerResize=()=>{this.panelRef&&(this.setPanelHeight(),this.style.setProperty("--translate-panel-y",`-${this.panelHeight}px`))},this.onTouchStart=O=>{this.detectorRef&&(this.isTouchDown=!0,this.touchStartY=O.changedTouches[0].screenY)},this.onTouchMove=O=>{this.detectorRef&&(this.rafId=window.requestAnimationFrame((()=>{this.touchDeltaY=O.changedTouches[0].screenY-this.touchStartY;let B=this.touchDeltaY/this.panelHeight*100;B=Math.min(Math.max(B,0),100),this.style.setProperty("--translate-y",`${B}%`),this.touchDirectionIsDown=!1,this.touchDeltaY>this.touchDeltaPreviousY&&(this.touchDirectionIsDown=!0),this.touchDeltaPreviousY=this.touchDeltaY})))},this.onTouchEnd=O=>{this.detectorRef&&(this.isTouchDown=!1,this.handleGesture())},this.handleGesture=()=>{var O;this.touchDirectionIsDown&&(null===(O=this.vm)||void 0===O||O.serp.changeMode(Hy.OffStage)),setTimeout((()=>{this.style.setProperty("--translate-y","0%")}),333)},this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.onDrawerResize(),this.resizeObserver=new ResizeObserver(this.onDrawerResize),this.resizeObserver.observe(this),this.detectorRef&&(this.disposer.register(addDisposableListener(this.detectorRef,"touchstart",this.onTouchStart)),this.disposer.register(addDisposableListener(this.detectorRef,"touchmove",this.onTouchMove)),this.disposer.register(addDisposableListener(this.detectorRef,"touchend",this.onTouchEnd)))}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.resizeObserver)||void 0===O||O.unobserve(this),window.cancelAnimationFrame(this.rafId),this.disposer.isDisposed||this.disposer.dispose()}};__decorate([observable,__metadata("design:type",Object)],kk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],kk.prototype,"isTouchDown",void 0),__decorate([observable,__metadata("design:type",Boolean)],kk.prototype,"isInitializing",void 0),kk=__decorate([customElement({name:"cib-drawer",template:wk,styles:Tk}),__metadata("design:paramtypes",[])],kk);const Ak=css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    width: 100%;
    max-width: 1184px;
    box-sizing: border-box;
    padding: 32px;
    transition-property: height;
    transition-duration: ${tb.static.motion.duration.slowest};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }

  .dynamic-image {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    aspect-ratio: 1920 / 640;
    background-image: url("/images/assets/background/shapes-1.png");
    background-position: center;
    background-size: cover;
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${tb.static.motion.duration.slower};
    transition-timing-function: ${tb.static.motion.easingFunction.motionTransition};
  }
`,Rk=css`
  :host {
    font-size: 40px;
    line-height: 48px;
    font-weight: 400;
    text-align: center;
    user-select: text;
  }

  :host([text-align="left"]) {
    text-align: left;
  }

  :host([text-align="right"]) {
    text-align: right;
  }
`,Ik=css`
  @keyframes text-stream-item-enter {
    0% {
      opacity: 0;
      color: red;
      transform: scale(0.94);
    }
    75% {
      color: black;
    }
    100% {
      opacity: 1;
      color: black;
      transform: scale(1);
    }
  }

  :host {
    display: inline;
    position: relative;
    opacity: 0;
    text-shadow: rgb(255 255 255 / 60%) 0px 1px 2px;
    transform-origin: bottom;
    animation-name: text-stream-item-enter;
    animation-fill-mode: both;
    animation-duration: ${tb.static.motion.duration.normal};
    animation-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }
`,Pk=html`
  <template style="animation-delay: ${O=>O.delay}ms">
    <slot></slot>
  </template>
`;let Nk=class extends St{constructor(){super(...arguments),this.delay=0}};__decorate([attr,__metadata("design:type",Number)],Nk.prototype,"delay",void 0),Nk=__decorate([customElement({name:"cib-text-stream-item",template:Pk,styles:Ik})],Nk);const Ok=html`
  <template
    style="font-size: ${O=>O.fontSize}; line-height: ${O=>O.lineHeight}; font-weight: ${O=>O.fontWeight}"
  >
    ${repeat((O=>O.textArray),html`<cib-text-stream-item delay=${O=>O.delay}>${O=>O.text}</cib-text-stream-item>`,{recycle:!1})}
  </template>
`;let Mk=class extends St{constructor(){super(...arguments),this.text="",this.initialDelay=1e3,this.fontSize="40px",this.lineHeight="48px",this.fontWeight=400,this.textAlign="center",this.textArray=[],this.handleStringSplit=()=>{var O;const B=null===(O=this.text)||void 0===O?void 0:O.split(" ");let U=Number(this.initialDelay);for(let O=0;O<(null==B?void 0:B.length);O++){const G={text:B[O],delay:this.getRandomArbitrary(80,180)+U};this.textArray.push(G),U=G.delay}},this.getRandomArbitrary=(O,B)=>Math.round(Math.random()*(B-O)+O)}connectedCallback(){super.connectedCallback(),this.handleStringSplit()}disconnectedCallback(){super.disconnectedCallback(),this.textArray=[]}textChanged(){this.$fastController.isConnected&&(this.textArray=[],this.handleStringSplit())}};__decorate([attr,__metadata("design:type",String)],Mk.prototype,"text",void 0),__decorate([attr({attribute:"initial-delay"}),__metadata("design:type",Number)],Mk.prototype,"initialDelay",void 0),__decorate([attr({attribute:"font-size"}),__metadata("design:type",String)],Mk.prototype,"fontSize",void 0),__decorate([attr({attribute:"line-height"}),__metadata("design:type",String)],Mk.prototype,"lineHeight",void 0),__decorate([attr({attribute:"font-weight"}),__metadata("design:type",Number)],Mk.prototype,"fontWeight",void 0),__decorate([attr({attribute:"text-align"}),__metadata("design:type",String)],Mk.prototype,"textAlign",void 0),__decorate([observable,__metadata("design:type",Array)],Mk.prototype,"textArray",void 0),Mk=__decorate([customElement({name:"cib-text-stream",template:Ok,styles:Rk})],Mk);const Dk=html`
  <div class="dynamic-image"></div>
  <cib-text-stream text=""> </cib-text-stream>
`;let Lk=class extends St{};Lk=__decorate([customElement({name:"cib-dynamic-header",template:Dk,styles:Ak})],Lk);const Bk=css`
  :host {
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    left: 0;
    top: 0;
    pointer-events: none;
    --position-left: 12px;
    --position-top: 100vh;
  }

  /* POSITIONER */

  .positioner {
    display: block;
    position: absolute;
    width: max-content;
    height: auto;
    left: 0;
    top: 0;
    transform: translate(var(--position-left), var(--position-top));
  }

  /* DETECTOR */

  .detector {
    max-height: calc(100vh - 24px);
    opacity: 0;
    pointer-events: none;
    box-sizing: border-box;
    padding: 4px;
    background: transparent;
  }

  /* CONTAINER */

  .container {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: initial;
    text-decoration-line: none !important;
    text-decoration-style: none;
    text-decoration-color: initial;
    text-underline-offset: auto;
    border-radius: 8px;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlay};
    transform: translateY(8px);
    box-shadow: ${tb.theme.shadows.defaults.flyout};
    outline: 1px solid transparent;
    display: contents;
  }

  /* VISIBILITY */

  :host([visible]) .detector {
    opacity: 1;
    pointer-events: auto;
  }

  :host([visible]) .container {
    opacity: 1;
    transform: translateY(0);
    transition-property: opacity, transform;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* MOBILE */

  :host([mobile]) .container {
    max-width: min(768px, 100vw - 24px);
  }

  /* IFRAMES */

  .frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-self: flex-start;
    border-radius: 8px;
    box-shadow: ${tb.theme.shadows.defaults.layer};
  }

  .inline {
    margin: 0;
    border-radius: 8px;
    box-shadow: unset;
  }

  /* MEDIA QUERIES */

  @media (max-width: 600px) {
    :host .detector,
    :host .container {
      max-width: calc(100vw - 16px);
    }
  }

  @media (max-width: 480px) {
    :host .positioner {
      width: 100%;
    }
  }

  /* MOBILE */

  :host([mobile]) .container {
    backdrop-filter: unset;
    -webkit-backdrop-filter: unset;
  }
  
  /* DISPLAY MODE MODAL */

  :host([visible]) .positioner[data-position="center"] {
    inset: 0;
    transform: translate(0, 0);
    width: unset;
    height: unset;
  }

  :host([visible]) .positioner[data-position="center"] .detector {
    position: absolute;
    inset: 50%;
  }
`,Fk=html`
  <template ?visible=${O=>O.isVisible} ?mobile=${O=>O.vm.serp.isMobile}>
    <div class="positioner" ${ref("positionerRef")}>
      <div class="detector" ${ref("detectorRef")}>
        <div class="container" ${ref("containerRef")}></div>
      </div>
    </div>
  </template>
`;let zk=class extends St{constructor(){super(),this.isVisible=!1,this.resizeObserver=null,this.target=null,this.previousTarget=null,this.isCurrentCibSerp=!1,this.pointerEvent=null,this.willBeVisible=!1,this.hoverDelayTimerId=null,this.hoverDelayTimerDuration=166,this.hoverResetTimerId=null,this.onTargetPointerDown=(O,B=!1)=>{var U;if(this.isVisible=!1,this.clearHoverDelayTimer(),this.clearHoverResetTimer(),O.preventDefault(),null!==this.target){let G;if(this.target.classList.toggle("hover",!0),null===(U=this.previousTarget)||void 0===U||U.classList.toggle("hover",!1),this.willBeVisible=!0,B){const O=this.target.getClientRects();O.length>0&&(G={x:O[0].left,y:O[0].top})}this.hoverDelayTimerId=window.setTimeout((()=>{this.enableCardVisibility(O,G)}),this.hoverDelayTimerDuration)}},this.onContainerPointerEnter=O=>{var B;this.clearHoverResetTimer(),null===(B=this.target)||void 0===B||B.classList.toggle("hover",!0),this.isVisible=!0},this.onContainerPointerDown=O=>{O.stopPropagation()},this.onContainerResize=()=>{var O,B,U;const G=(null===(B=null===(O=this.containerRef)||void 0===O?void 0:O.querySelector(".actionmenu"))||void 0===B?void 0:B.querySelector(".actionmenucontent"))||null;this.detectorRef&&(this.hoverCardRect=this.clampRectToViewport(null!==(U=null==G?void 0:G.getBoundingClientRect())&&void 0!==U?U:this.detectorRef.getBoundingClientRect())),this.setShareModalPosition()},this.setShareModalPosition=()=>{var O;this.vm.isMobile?this.vm.config.features.enableShareWithNoMargin&&this.setPositionStylesCss(this.hoverCardRect.x,this.hoverCardRect.y):this.layout.serpSlot===jy.None&&this.vm.serp.mode===Hy.Conversation&&this.vm.config.features.enableShareModalDialog?null===(O=this.positionerRef)||void 0===O||O.setAttribute("data-position","center"):this.setPositionStylesCss(this.hoverCardRect.x,this.hoverCardRect.y)},this.onDocumentPointerMove=O=>{this.pointerEvent=O},this.onDocumentPointerDown=O=>{"touch"===O.pointerType&&this.willBeVisible||this.resetCardVisibility()},this.onDocumentTouchMove=O=>{const B=O.composedPath().some((O=>{var B;return!!(null===(B=null==O?void 0:O.classList)||void 0===B?void 0:B.contains("actionmenucontent"))}));B||this.resetCardVisibility()},this.enableCardVisibility=(O,B)=>{var U,G,q,j,W,Y,K,Q,Z,X,J;const ee=null!=B?B:{x:null!==(G=null===(U=this.pointerEvent)||void 0===U?void 0:U.pageX)&&void 0!==G?G:O.pageX,y:null!==(j=null===(q=this.pointerEvent)||void 0===q?void 0:q.pageY)&&void 0!==j?j:O.pageY},te=null===(W=this.target)||void 0===W?void 0:W.getClientRects(),ie=null===(K=null===(Y=this.containerRef)||void 0===Y?void 0:Y.querySelector(".actionmenu"))||void 0===K?void 0:K.querySelector(".actionmenucontent");if(void 0!==te){const B={height:Math.max(null!==(Q=null==ie?void 0:ie.offsetHeight)&&void 0!==Q?Q:this.detectorRef.offsetHeight,400),width:Math.max(null!==(Z=null==ie?void 0:ie.offsetWidth)&&void 0!==Z?Z:this.detectorRef.offsetWidth,435)},U=te[te.length-1];let G=U.y+U.height;"touch"!==O.pointerType&&(G=null!==(J=null===(X=this.getHoverPosition(te,ee,B))||void 0===X?void 0:X.y)&&void 0!==J?J:G);const q={x:ee.x,y:G};this.hoverCardRect={...B,...q},this.hoverCardRect=this.clampRectToViewport(this.hoverCardRect),this.setShareModalPosition(),this.willBeVisible=!1,this.isVisible=!0}},this.setPositionStylesCss=(O,B)=>{void 0!==this.positionStyles&&this.$fastController.removeStyles(this.positionStyles),this.positionStyles=css`
      :host {
        --position-left: ${O+"px"};
        --position-top: ${B+"px"};
      }
    `,this.$fastController.addStyles(this.positionStyles)},this.resetCardVisibility=()=>{var O,B;this.clearHoverDelayTimer(),this.resetCardVisibilityCSS(),null===(O=this.target)||void 0===O||O.classList.toggle("hover",!1),null===(B=this.previousTarget)||void 0===B||B.classList.toggle("hover",!1),this.willBeVisible=!1,this.isVisible=!1},this.resetCardVisibilityCSS=()=>{this.classList.toggle("animate",!1),this.classList.toggle("visible",!1)},this.disposer=new Disposer,this.subscriberDisposer=new Disposer,this.disposer.register((()=>this.disposeSubscriber())),this.hoverCardRect={x:0,y:0,width:0,height:0}}connectedCallback(){var O;super.connectedCallback(),this.subscribeToViewModelChanges(),this.disposer.register(addDisposableListener(document,"pointermove",this.onDocumentPointerMove)),this.disposer.register(addDisposableListener(document,"pointerdown",this.onDocumentPointerDown)),this.disposer.register(addDisposableListener(document,"touchmove",this.onDocumentTouchMove)),this.detectorRef&&(this.disposer.register(addDisposableListener(this.detectorRef,"pointerenter",this.onContainerPointerEnter)),this.disposer.register(addDisposableListener(this.detectorRef,"pointerdown",this.onContainerPointerDown)),this.resizeObserver=new ResizeObserver(this.onContainerResize),this.resizeObserver.observe(this.detectorRef)),this.containerRef?(this.vm.container=this.containerRef,this.vm.initializeShareControl(this.containerRef)):null===(O=this.vm.log)||void 0===O||O.error(this,this.connectedCallback,"containerRef is null, cannot initialize share control")}disconnectedCallback(){var O;super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose(),this.detectorRef&&(null===(O=this.resizeObserver)||void 0===O||O.unobserve(this.detectorRef))}isVisibleChanged(){var O,B;this.vm&&(null===(O=this.vm.log)||void 0===O||O.trace(this,this.isVisibleChanged,"isVisibleChanged",this.isVisible),0!==(null===(B=this.vm.container)||void 0===B?void 0:B.children.length)&&(this.isVisible||this.vm.onHide()))}disposeSubscriber(){this.subscriberDisposer.isDisposed||this.subscriberDisposer.dispose()}subscribeToViewModelChanges(){const O={handleChange:(B,U)=>{var G;null===(G=this.vm.log)||void 0===G||G.trace(this,O.handleChange,"property",U),B===this.vm&&("content"===U&&this.onContentChanged(this.vm.content),"target"===U&&this.onTargetChanged(this.vm.target),"shouldBeVisible"===U&&null!==this.pointerEvent&&this.onTargetPointerDown(this.pointerEvent,!0))}};this.vmChangeNotifier=pt.getNotifier(this.vm),this.vmChangeNotifier.subscribe(O),this.subscriberDisposer.register((()=>this.vmChangeNotifier.unsubscribe(O)))}onContentChanged(O){var B;null===(B=this.vm.log)||void 0===B||B.trace(this,this.onContentChanged,"content",O),this.containerRef&&O&&this.containerRef.appendChild(O)}onTargetChanged(O){O!==this.target&&(this.previousTarget=this.target,this.isCurrentCibSerp=this.findNearestHostElementByTagName(O,"CIB-SERP")===this.getHostElement(this),this.target=this.isCurrentCibSerp?O:null,this.addTargetEventListeners(),setTimeout((()=>{null!==this.pointerEvent&&this.onTargetPointerDown(this.pointerEvent,!0)})))}findNearestHostElementByTagName(O,B){var U;if(!O)return null;if(O.tagName===B)return O;const G=this.getHostElement(O);return null!==(U=this.findNearestHostElementByTagName(G,B))&&void 0!==U?U:null}getHostElement(O){if(!O)return null;const B=O.getRootNode();return B instanceof ShadowRoot?B.host:null}clearHoverDelayTimer(){this.hoverDelayTimerId&&window.clearTimeout(this.hoverDelayTimerId)}clearHoverResetTimer(){this.hoverResetTimerId&&window.clearTimeout(this.hoverResetTimerId)}addTargetEventListeners(){this.isCurrentCibSerp&&null!==this.target&&this.disposer.register(addDisposableListener(this.target,"pointerdown",this.onTargetPointerDown))}getHoverPosition(O,B,U){for(let G=0;G<O.length;G++){const q=O[G].top,j=O[G].bottom;if(B.y>=q&&B.y<=j)return void 0!==U&&j+U.height>window.innerHeight?{x:B.x,y:q-U.height}:{x:B.x,y:j}}}clampRectToViewport(O){var B;const U=this.vm.config.features.enableShareWithNoMargin?0:8,G=this.layout.isMobile?92:8;if(O.x=Math.round(O.x-O.width/2),O.y=Math.round(O.y),O.x<U?O.x=U:O.x+O.width>window.innerWidth-U&&(O.x=Math.round(window.innerWidth-O.width-U)),O.y<U?O.y=U:O.y+O.height>window.innerHeight-G&&(O.y=Math.round(window.innerHeight-O.height-G)),this.vm.config.features.enableShareWithNoMargin&&O.x<0&&(O.x=0,O.y=window.innerHeight),this.vm.enablePageHeaderOverlapClamping){const U=(null===(B=document.querySelector("#b_header"))||void 0===B?void 0:B.querySelector(".b_scopebar"))||null;if(U){const{top:B,height:G}=U.getBoundingClientRect(),q=B+G;O.y<q&&(O.y=q)}}return this.vm.config.features.enableShareCenterAlignment&&(O.x=(window.innerWidth-O.width)/2,O.y=window.innerHeight>O.height?(window.innerHeight+O.height)/2:window.innerHeight-G),O}};__decorate([observable,__metadata("design:type",Object)],zk.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],zk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],zk.prototype,"isVisible",void 0),zk=__decorate([customElement({name:"cib-hover",template:Fk,styles:Bk}),__metadata("design:paramtypes",[])],zk);const $k=css`
  :host {
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    left: 0;
    top: 0;
    pointer-events: none;
    --position-left: 12px;
    --position-top: 100vh;
  }

  /* POSITIONER */

  .positioner {
    display: block;
    position: absolute;
    width: max-content;
    height: auto;
    left: 0;
    top: 0;
    transform: translate(var(--position-left), var(--position-top));
  }

  /* DETECTOR */

  .detector {
    max-height: calc(100vh - 24px);
    opacity: 0;
    pointer-events: none;
    box-sizing: border-box;
    padding: 4px;
    background: transparent;
  }

  /* CONTAINER */

  .container {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: initial;
    text-decoration-line: none !important;
    text-decoration-style: none;
    text-decoration-color: initial;
    text-underline-offset: auto;
    border-radius: 8px;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralLayerOverlayStrokeAlt};
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlayAlt};
    transform: translateY(8px);
    box-shadow: ${tb.theme.shadows.defaults.flyout};
    outline: 1px solid transparent;
  }

  :host([ad-clickout]) .container {
    flex-direction: column-reverse;
  }

  /* VISIBILITY */

  :host([visible]) .detector {
    opacity: 1;
    pointer-events: auto;
  }

  :host([visible]) .container {
    opacity: 1;
    transform: translateY(0);
    transition-property: opacity, transform;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* MOBILE */

  :host([mobile]) .container {
    max-width: min(768px, 100vw - 24px);
  }

  /* ATTRIBUTION ITEM */

  .attributions {
    box-sizing: border-box;
  }

  .attribution-item {
    position: relative;
    display: block;
    padding: 0px 6px;
    text-decoration-line: none;
  }

  .attribution-item:first-child {
    padding-top: 6px;
  }

  .attribution-item:last-child {
    padding-bottom: 6px;
  }

  :host(:not([has-advert])[single]) .attribution-item {
    padding: 0 !important;
  }

  /* ATTRIBUTION ITEM BACKGROUND */

  .attribution-item .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    right: 6px;
    border-radius: 4px;
    background: ${tb.theme.neutralColors.background.colorNeutralAttributionItemBackgroundHover};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralAttributionItemStrokeHover};
    opacity: 0;
    box-shadow: ${tb.theme.shadows.elevations.elevation2};
  }

  :host(:not([ad-clickout])[has-advert]) .attribution-item:first-child .background,
  :host(:not([has-advert])) .attribution-item:first-child .background {
    top: 6px;
  }

  :host([ad-clickout]) .attribution-item:last-child .background,
  :host(:not([has-advert])) .attribution-item:last-child .background {
    bottom: 6px;
  }

  .attribution-item:hover .background,
  :host(:not([has-advert])) .detector .attributions:not(:hover) .attribution-item:first-child .background,
  :host(:not(:hover):not([has-advert])) .attributions .attribution-item:first-child .background,
  :host(:not(:hover):not([ad-clickout])) .attributions .attribution-item:first-child .background {
    opacity: 1;
  }

  :host(:not([has-advert])[single]) .attribution-item .background {
    inset: 0px !important;
    box-shadow: unset;
  }

  /* ATTRIBUTION ITEM CONTENT */

  .attribution-item .content {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    text-decoration-line: none;
    max-width: 660px;
  }

  /* ATTRIBUTION ITEMS */

  .attribution-item:first-child {
    border-top: none;
  }

  .attribution-item .link-container {
    display: flex;
    flex-direction: column;
    width: calc(100% - 48px);
  }

  .attribution-item .favicon {
    align-self: flex-start;
    height: 32px;
    width: 32px;
    margin-top: 3px;
    user-select: none;
  }

  .attribution-item h4,
  .attribution-item p,
  .attribution-item .link-text {
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    margin: 0;
    text-decoration-line: none;
    user-select: none;
  }

  .attribution-item h4 {
    color: ${tb.theme.brandColors.foreground.colorBrandLinkForeground};
    font-size: ${tb.platform.typography.typeRamp.subtitle2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.subtitle2.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.subtitle2.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.subtitle2.fontVariationSettings};
  }

  .attribution-item .link-text {
    color: ${tb.theme.brandColors.foreground.colorBrandAttributionForeground};
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .attribution-item .descriptions {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    margin-top: 3px;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .attribution-item:hover h4,
  .attribution-item:hover .link-text {
    text-decoration: underline;
  }

  .attribution-item .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ADVERTS */

  .adverts {
    display: flex;
    flex-direction: column;
  }

  .advert-item {
    overflow: hidden;
    position: relative;
    visibility: hidden;
    height: 0px;
    width: 24px;
    max-width: min(768px, 90vw);
    padding: 0;
  }

  .advert-item.visible {
    visibility: visible;
    height: unset;
    width: unset;
    padding-bottom: 6px;
  }

  :host([has-advert]) .advert-item.visible {
    padding: 6px 6px 0;
  }

  .advert-item .background {
    position: absolute;
    inset: 6px;
    background: ${tb.theme.neutralColors.background.colorNeutralAttributionItemBackgroundHover};
    opacity: 0;
    border-radius: 4px;
    box-shadow: ${tb.theme.shadows.elevations.elevation2};
  }

  :host(:not(:hover)[ad-clickout]) .advert-item.visible .background {
    opacity: 1;
  }

  .advert-item:hover .background {
    opacity: 1 !important;
  }

  /* IFRAMES */

  .frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-self: flex-start;
    border-radius: 8px;
    box-shadow: ${tb.theme.shadows.defaults.layer};
  }

  .inline {
    margin: 0;
    border-radius: 8px;
    box-shadow: unset;
  }

  /* FAVICON */
  .placeholder-favicon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    height: 32px;
    width: 32px;
    margin-top: 3px;
    background-color: #f0f0f0;
    border-radius: 2px;
  }

  .placeholder-favicon {
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }

  /* MEDIA QUERIES */

  @media (max-width: 600px) {
    :host .detector,
    :host .container {
      max-width: calc(100vw - 16px);
    }
  }

  @media (max-width: 480px) {
    :host .positioner {
      width: 100%;
    }
  }
`,Uk=html`
  <div class="placeholder-favicon-container">
    <svg-icon class="placeholder-favicon" type=${lE.Globe} size="24"></svg-icon>
  </div>
`,Vk=html`
  <a
    h="${O=>O.h}"
    class="attribution-item"
    href=${O=>O.link}
    target="_blank"
    @click=${(O,B)=>O.handleLinkClick(B.event)}
  >
    <span class="background"></span>
    <span class="content">
      ${when(((O,B)=>B.parent.vm.showAttributionFavicons),html`
          ${when((O=>O.favIcon&&O.favIcon.length),html`<img
  class="favicon"
  role="presentation"
  src=${(O,B)=>B.parent.getFavIcon(O.favIcon)}
/> `)}
          ${when((O=>{var B;return!O.favIcon||!(null===(B=O.favIcon)||void 0===B?void 0:B.length)}),Uk)}
        `)}
      <span class="link-container">
        <h4 class="ellipsis">${O=>O.title}</h4>
        <p class="link-text ellipsis">${O=>O.link}</p>
        ${when((O=>{var B;return null===(B=O.description)||void 0===B?void 0:B.length}),html`<p class="descriptions">
            ${repeat((O=>O.description),html`<span class="ellipsis">${O=>O}</span>`)}
          </p>`)}
      </span>
    </span>
  </a>
`,Gk=html`
  ${when((O=>{var B;return null===(B=O.vm.citations)||void 0===B?void 0:B.length}),html` ${repeat((O=>O.vm.citations),Vk)} `)}
`,Hk=html`
  <div class="advert-item${O=>O.isActive?" visible":""}">
    <div class="background"></div>
    ${OnceDirective_once((O=>O),Yx)}
  </div>
`,qk=html`
  <template
    ?visible=${O=>O.isVisible}
    ?has-advert=${O=>O.vm.hasAdvert}
    ?mobile=${O=>O.vm.serp.isMobile}
    ?single=${O=>O.vm.singleCitationGroup}
    ?ad-clickout=${O=>{var B;return null===(B=O.vm.citations)||void 0===B?void 0:B.useAdClickout}}
    serp-slot=${O=>O.layout.serpSlot}
  >
    <div class="positioner" ${ref("positionerRef")}>
      <div class="detector" ${ref("detectorRef")}>
        <div class="container" ${ref("containerRef")}>
          <div class="attributions">${Gk}</div>
          <div class="adverts">${repeat((O=>O.vm.adverts),Hk)}</div>
        </div>
      </div>
    </div>
  </template>
`;let jk=class extends St{constructor(){super(),this.isVisible=!1,this.target=null,this.previousTarget=null,this.currentCibSerp=null,this.isCurrentCibSerp=!1,this.pointerEvent=null,this.willBeVisible=!1,this.hoverDelayTimerId=null,this.hoverDelayTimerDuration=500,this.hoverResetTimerId=null,this.hoverResetTimerDuration=0,this.onTargetPointerEnter=O=>{var B;this.isVisible=!1,this.clearHoverDelayTimer(),this.clearHoverResetTimer(),O.preventDefault(),null!==this.target&&(this.target.classList.toggle("hover",!0),null===(B=this.previousTarget)||void 0===B||B.classList.toggle("hover",!1),this.willBeVisible=!0,this.vm.applyLinkToTarget(),this.hoverDelayTimerId=window.setTimeout((()=>{this.enableCardVisibility(O)}),this.hoverDelayTimerDuration))},this.onTargetPointerMove=O=>{var B,U,G,q;if(null!==this.target&&"touch"!==O.pointerType){const j={x:null!==(U=null===(B=this.pointerEvent)||void 0===B?void 0:B.pageX)&&void 0!==U?U:O.pageX,y:null!==(q=null===(G=this.pointerEvent)||void 0===G?void 0:G.pageY)&&void 0!==q?q:O.pageY},W=this.target.getClientRects(),Y={height:this.hoverCardRect.height,width:this.hoverCardRect.width},K=this.getHoverPosition(W,j,Y);void 0!==K&&(this.hoverCardRect.x=K.x,this.hoverCardRect=this.clampRectToViewport(this.hoverCardRect),this.positionerRef.style.setProperty("--position-left",`${this.hoverCardRect.x}px`));const Q=this.getSelectedText();void 0!==Q&&Q.length>0&&this.target.classList.toggle("hover",!1)}},this.onTargetPointerLeave=O=>{"touch"===O.pointerType&&this.willBeVisible||(this.hoverResetTimerId=window.setTimeout((()=>{this.resetCardVisibility()}),this.hoverResetTimerDuration))},this.onContainerPointerEnter=O=>{var B;this.clearHoverResetTimer(),null===(B=this.target)||void 0===B||B.classList.toggle("hover",!0),this.isVisible=!0},this.onContainerPointerDown=O=>{O.stopPropagation()},this.onContainerPointerLeave=O=>{"touch"!==O.pointerType&&this.resetCardVisibility()},this.onDocumentPointerMove=O=>{this.pointerEvent=O},this.onDocumentPointerDown=O=>{"touch"===O.pointerType&&this.willBeVisible||this.resetCardVisibility()},this.onDocumentPointerLeave=O=>{"touch"!==O.pointerType&&this.resetCardVisibility()},this.onDocumentTouchMove=O=>{this.resetCardVisibility()},this.enableCardVisibility=O=>{var B,U,G,q,j,W,Y;const K={x:null!==(U=null===(B=this.pointerEvent)||void 0===B?void 0:B.pageX)&&void 0!==U?U:O.pageX,y:null!==(q=null===(G=this.pointerEvent)||void 0===G?void 0:G.pageY)&&void 0!==q?q:O.pageY},Q=null===(j=this.target)||void 0===j?void 0:j.getClientRects();if(void 0!==Q){const B={height:this.detectorRef.offsetHeight,width:this.detectorRef.offsetWidth},U=Q[Q.length-1];let G=U.y+U.height;"touch"!==O.pointerType&&(G=null!==(Y=null===(W=this.getHoverPosition(Q,K,B))||void 0===W?void 0:W.y)&&void 0!==Y?Y:G);const q={x:K.x,y:G};this.hoverCardRect={...B,...q},this.hoverCardRect=this.clampRectToViewport(this.hoverCardRect),this.positionerRef.style.setProperty("--position-left",`${this.hoverCardRect.x}px`),this.positionerRef.style.setProperty("--position-top",`${this.hoverCardRect.y}px`),this.willBeVisible=!1,this.isVisible=!0}},this.resetCardVisibility=()=>{var O,B;this.vm.setTarget(null),this.clearHoverDelayTimer(),this.resetCardVisibilityCSS(),null===(O=this.target)||void 0===O||O.classList.toggle("hover",!1),null===(B=this.previousTarget)||void 0===B||B.classList.toggle("hover",!1),this.willBeVisible=!1,this.isVisible=!1},this.resetCardVisibilityCSS=()=>{this.classList.toggle("animate",!1),this.classList.toggle("visible",!1)},this.disposer=new Disposer,this.subscriberDisposer=new Disposer,this.disposer.register((()=>this.disposeSubscriber())),this.hoverCardRect={x:0,y:0,width:0,height:0}}connectedCallback(){super.connectedCallback(),this.subscribeToViewModelChanges(),this.disposer.register(addDisposableListener(document,"pointermove",this.onDocumentPointerMove)),this.disposer.register(addDisposableListener(document,"pointerdown",this.onDocumentPointerDown)),this.disposer.register(addDisposableListener(document,"pointerleave",this.onDocumentPointerLeave)),this.disposer.register(addDisposableListener(document,"touchmove",this.onDocumentTouchMove)),this.detectorRef&&(this.disposer.register(addDisposableListener(this.detectorRef,"pointerenter",this.onContainerPointerEnter)),this.disposer.register(addDisposableListener(this.detectorRef,"pointerdown",this.onContainerPointerDown)),this.disposer.register(addDisposableListener(this.detectorRef,"pointerleave",this.onContainerPointerLeave)))}disconnectedCallback(){super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose()}disposeSubscriber(){this.subscriberDisposer.isDisposed||this.subscriberDisposer.dispose()}subscribeToViewModelChanges(){const O={handleChange:(O,B)=>{O===this.vm&&"citations"===B&&this.onTargetChanged()}};this.vmChangeNotifier=pt.getNotifier(this.vm),this.vmChangeNotifier.subscribe(O),this.subscriberDisposer.register((()=>this.vmChangeNotifier.unsubscribe(O)))}onTargetChanged(){const O=this.vm.target;O!==this.target&&(this.previousTarget=this.target,this.currentCibSerp=this.findNearestHostElementByTagName(O,"CIB-SERP"),this.currentCibSerpTop=this.getDistanceFromTop(this.currentCibSerp),this.isCurrentCibSerp=this.currentCibSerp===this.getHostElement(this),this.target=this.isCurrentCibSerp?O:null,this.addTargetEventListeners(),setTimeout((()=>{null!==this.pointerEvent&&this.onTargetPointerEnter(this.pointerEvent)})))}findNearestHostElementByTagName(O,B){var U;if(!O)return null;if(O.tagName===B)return O;const G=this.getHostElement(O);return null!==(U=this.findNearestHostElementByTagName(G,B))&&void 0!==U?U:null}getHostElement(O){if(!O)return null;const B=O.getRootNode();return B instanceof ShadowRoot?B.host:null}getDistanceFromTop(O){if(!O)return;let B=0;for(;O;)B+=O.offsetTop,O=O.offsetParent;return B}clearHoverDelayTimer(){this.hoverDelayTimerId&&window.clearTimeout(this.hoverDelayTimerId)}clearHoverResetTimer(){this.hoverResetTimerId&&window.clearTimeout(this.hoverResetTimerId)}addTargetEventListeners(){this.isCurrentCibSerp&&null!==this.target&&(this.disposer.register(addDisposableListener(this.target,"pointerenter",this.onTargetPointerEnter)),this.disposer.register(addDisposableListener(this.target,"pointermove",this.onTargetPointerMove)),this.disposer.register(addDisposableListener(this.target,"pointerleave",this.onTargetPointerLeave)))}getHoverPosition(O,B,U){for(let G=0;G<O.length;G++){const q=O[G].top,j=O[G].bottom;if(B.y>=q&&B.y<=j)return void 0!==U&&j+U.height>window.innerHeight?{x:B.x,y:q-U.height}:{x:B.x,y:j}}}clampRectToViewport(O){const B=this.layout.isMobile?92:8;O.x=Math.round(O.x-O.width/2),O.y=Math.round(O.y);if(O.x<8?O.x=8:O.x+O.width>window.innerWidth-8&&(O.x=Math.round(window.innerWidth-O.width-8)),O.y<8?O.y=8:O.y+O.height>window.innerHeight-B&&(O.y=Math.round(window.innerHeight-O.height-B)),this.vm.enablePageHeaderOverlapClamping){const B=70;let U=!1;if(O.y<B){const G=B-O.y;O.y=O.y+G,U=!0}const G=U?window.innerHeight-B-8:window.innerHeight-8;if(G<O.height){const B=O.height-G,U=O.height-B;this.containerRef.style.setProperty("max-height",`${U}px`)}else this.containerRef.style.removeProperty("max-height")}return O}getSelectedText(){let O;return void 0!==window.getSelection&&(O=window.getSelection().toString()),O}getFavIcon(O){return`data:image/png;base64,${O}`}};__decorate([observable,__metadata("design:type",Object)],jk.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],jk.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],jk.prototype,"isVisible",void 0),jk=__decorate([customElement({name:"cib-hover-card",template:qk,styles:$k}),__metadata("design:paramtypes",[])],jk);const Wk=css`
  @keyframes fade-enter {
    from {
      -webkit-mask-position-y: 120px;
    }
    to {
      -webkit-mask-position-y: 0;
    }
  }

  @keyframes button-enter {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  :host {
    display: flex;
    justify-content: center;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: var(--see-more-min-height);
    max-height: var(--see-more-max-height);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 3px 0 rgb(0 0 0 / 10%);
    border-radius: 12px;
    outline: 1px solid transparent;
    overflow: hidden;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCardAlt};
  }

  .container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: var(--see-more-min-height);
    max-height: var(--see-more-max-height);
  }

  /* COVER */

  .cover {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 74px;
    opacity: 0;
    pointer-events: none;
    transition-property: opacity;
    transition-delay: ${tb.static.motion.duration.normal};
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* STATES */

  :host([expanded]) {
    max-height: 100%;
  }

  :host([cached]) .container {
    height: fit-content;
  }

  :host([expanded]) .container {
    max-height: unset;
  }

  :host([covered]) .cover {
    opacity: 1;
    pointer-events: auto;
    transition: none;
  }

  :host([expanded]),
  :host([expanded]) .container {
    transition-property: max-height;
    transition-duration: ${tb.static.motion.duration.normal};
    transition-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  :host([expanded]) .cover {
    opacity: 0;
    pointer-events: none;
    transition: none;
  }

  /* FADE */

  .fade {
    display: flex;
    width: 100%;
  }

  :host([covered]) .fade {
    mask-size: 100%;
    -webkit-mask-position-y: 74px;
    -webkit-mask-image: linear-gradient(black calc(100% - 120px), transparent calc(100% - 40px));
    mask-image: linear-gradient(black calc(100% - 120px), transparent calc(100% - 40px));
    animation-name: fade-enter;
    animation-fill-mode: forwards;
    animation-duration: ${tb.static.motion.duration.normal};
    animation-timing-function: ${tb.static.motion.easingFunction.motionIn};
  }

  /* BUTTON */

  button {
    position: absolute;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    order: 1;
    height: 34px;
    min-width: fit-content;
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    border-radius: 20px;
    border: none;
    outline: 1px solid transparent;
    margin: 0px;
    padding: 7px 12px 7px 16px;
    cursor: pointer;
    opacity: 0;
    background: ${tb.theme.gradientColors.core};
    animation-name: button-enter;
    animation-fill-mode: both;
    animation-duration: ${tb.static.motion.duration.normal};
    animation-timing-function: ${tb.static.motion.easingFunction.motionIn};
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-weight: 500;
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
  }

  button:focus-visible {
    outline: 2px solid black;
  }

  @media (hover: hover) {
    button:hover {
      box-shadow: ${tb.theme.shadows.defaults.cardRaised};
    }
  }

  button:active {
    box-shadow: unset;
  }
`.withBehaviors(tE(css`
    .fade {
      height: 38px;
      background: ${iE.Canvas};
    }

    button:hover,
    button:focus-visible {
      forced-color-adjust: none;
      color: ${iE.HighlightText};
      background: ${iE.Highlight};
      outline: ${iE.Highlight};
    }
  `)),Yk=html`
  <template
    serp-slot=${O=>O.layout.serpSlot}
    ?mobile=${O=>O.layout.isMobile}
    ?cached=${O=>O.layout.isCachedResponse}
    ?covered=${O=>O.layout.isSeeMoreCovering}
    ?expanded=${O=>O.layout.isSeeMoreExpanded}
  >
    <div class="fade">
      <div class="container" ${ref("containerRef")}>
        <slot></slot>
      </div>
    </div>
    <div class="cover">
      <button @click=${O=>O.handleClick()} type="button" ?disabled=${O=>O.layout.isSeeMoreExpanded}>
        <span>${O=>O.vm.strings.seeMoreButton}</span>
        <svg-icon type=${lE.ChevronDownMed} size="20"></svg-icon>
      </button>
    </div>
  </template>
`;let Kk=class extends St{constructor(){super(...arguments),this.resizeObserver=null,this.maxHeight=0,this.minHeight=0,this.handleClick=()=>{this.layout.isSeeMoreCovering=!1,this.layout.isSeeMoreExpanded=!0},this.setMinMaxHeight=()=>{if(this.containerRef&&!this.layout.isSeeMoreExpanded){if(this.layout.serpSlot===jy.Pole&&this.containerRef.offsetWidth>600)this.maxHeight=this.layout.isCachedResponse?380:196,this.minHeight=this.layout.isCachedResponse?196:this.maxHeight-1;else if(this.layout.serpSlot===jy.Pole&&this.containerRef.offsetWidth<=600){const O=320;this.maxHeight=Math.floor(Math.max(O,window.innerHeight/2)),this.minHeight=this.layout.isCachedResponse?196:this.maxHeight-1}else if(this.layout.serpSlot===jy.RightRail){const O=540,B=380;this.maxHeight=Math.floor(Math.max(B,Math.min(O,window.innerHeight/2.25))),this.minHeight=this.layout.isCachedResponse?196:this.maxHeight-1}this.updateCssVariables(),this.calculateHeights()}},this.calculateHeights=()=>{this.containerRef&&!this.layout.isSeeMoreExpanded&&(this.containerRef&&this.containerRef.offsetHeight>=this.maxHeight?this.layout.isSeeMoreCovering=!0:this.layout.isSeeMoreCovering=!1)}}connectedCallback(){super.connectedCallback(),this.containerRef&&(this.resizeObserver=new ResizeObserver(this.setMinMaxHeight),this.resizeObserver.observe(this.containerRef)),window.addEventListener("resize",this.setMinMaxHeight),this.setMinMaxHeight()}disconnectedCallback(){var O;super.disconnectedCallback(),null===(O=this.resizeObserver)||void 0===O||O.unobserve(this),window.removeEventListener("resize",this.setMinMaxHeight)}updateCssVariables(){this.style.setProperty("--see-more-max-height",`${this.maxHeight}px`),this.style.setProperty("--see-more-min-height",`${this.minHeight}px`)}};__decorate([observable,__metadata("design:type",Object)],Kk.prototype,"layout",void 0),Kk=__decorate([customElement({name:"cib-see-more-container",template:Yk,styles:Wk})],Kk);const Qk=css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    min-height: 64px;
    width: 100%;
    margin-bottom: 16px;
    z-index: 1;
    pointer-events: none;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 12px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 40px;
    margin: 0;
    margin-top: 4px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
  }

  .button:focus-visible {
    outline: 2px solid #000;
  }

  /* SERP SLOT */

  :host([serp-slot=${jy.Creator}]) {
    position: absolute;
    display: block;
    top: -2px;
  }
`,Zk=html`
  <template serp-slot=${O=>{var B,U;return null!==(U=null===(B=O.layout)||void 0===B?void 0:B.serpSlot)&&void 0!==U?U:jy.None}}>
    <button type="button" aria-label=${O=>O.vm.strings.letsChat} @click=${O=>O.handleLogoButtonClick()}>
      <cib-logo size=${Bw.CibLogoWithBubble36}></cib-logo>
    </button>
    <slot></slot>
  </template>
`;let Xk=class extends St{constructor(){super(...arguments),this.handleLogoButtonClick=()=>{this.vm.enableConversationMode()}}};__decorate([observable,__metadata("design:type",Object)],Xk.prototype,"layout",void 0),Xk=__decorate([customElement({name:"cib-slim-header",template:Zk,styles:Qk})],Xk);const Jk=css`
  :host {
    position: fixed;
    bottom: 0;
    right: 20px;
    z-index: 100;
  }

  .root .cbtn {
    background: ${tb.theme.brandColors.background.colorBrandSecondaryBackground};
    border: 1px solid ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    cursor: pointer;
    display: block;
    height: 28px;
    line-height: 28px;
    min-width: 110px;
    padding: 0 5px;
    text-align: center;
    font-family: ${tb.platform.typography.fonts.text};
    font-size: 13px;
  }

  .cbtn svg-icon {
    margin: 0 5px -4px 0;
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }
`,eA=html`
  <div class="root">
    <button id="fbpgbt" class="cbtn" @click=${O=>O.vm.openFeedbackForm()}>
      <svg-icon type=${lE.MessageFill} size="14"></svg-icon>
      ${O=>O.vm.feedbackString}
    </button>
  </div>
`;let tA=class extends St{};var iA;__decorate([observable,__metadata("design:type",Object)],tA.prototype,"vm",void 0),tA=__decorate([customElement({name:"cib-serp-feedback",template:eA,styles:Jk})],tA),function(O){O.Start="start",O.Center="center",O.End="end"}(iA||(iA={}));const rA=css`
  :host {
    z-index: 9999;
  }

  :host(:not([visible])) {
    display: none;
  }

  .positioner {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }

  :host([dialog-position-x=${iA.Start}]) .positioner {
    justify-content: start;
  }

  :host([dialog-position-x=${iA.End}]) .positioner {
    justify-content: end;
  }

  :host([dialog-position-y=${iA.Start}]) .positioner {
    align-items: start;
  }

  :host([dialog-position-y=${iA.End}]) .positioner {
    align-items: end;
  }

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${tb.theme.neutralColors.background.colorNeutralOverlayBackground};
    touch-action: none;
  }

  .modal {
    position: relative;
    min-width: 180px;
    min-height: 120px;
    max-width: 90vw;
    max-height: 90vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr auto;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralLayerOverlayStrokeAlt};
    border-radius: 12px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerOverlayAlt};
    box-shadow: ${tb.theme.shadows.defaults.dialog};
    z-index: 0;
  }

  :host([dialog-position-y=${iA.Start}]) .modal {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  :host([dialog-position-y=${iA.End}]) .modal {
    border-end-end-radius: 0;
    border-end-start-radius: 0;
  }

  :host([dialog-position-y=${iA.Center}][dialog-position-x=${iA.Start}]) .modal {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :host([dialog-position-y=${iA.Center}][dialog-position-x=${iA.End}]) .modal {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  .content {
    grid-area: 1 / 1 / 3 / 3;
  }

  .dismiss {
    grid-area: 1 / 2 / 2 / 3;
    width: 36px;
    height: 36px;
    margin: 12px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .dismiss svg-icon {
    margin-top: 3px;
    fill: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
  }
`,nA=html`<button
  class="dismiss"
  type="button"
  aria-label=${O=>O.vm.strings.dismiss}
  @click=${(O,B)=>O.handleDismissBtnClick(B.event)}
>
  <svg-icon type=${lE.Clear12} size="22"></svg-icon>
</button>`,oA=html`
  <template ?visible=${O=>O.vm.isVisible}>
    <div class="positioner">
      <div class="overlay" role="presentation" @click=${(O,B)=>O.handleOverlayClick(B.event)}></div>
      <div class="modal" role="dialog" tabindex="-1" aria-modal="true" ${ref("modalRef")}>
        <div class="content" ${ref("contentRef")}>
          ${when((O=>null!==O.vm.currentDialog),(O=>O.renderModalDialog()))}
        </div>
        ${when((O=>{var B;return null===(B=O.vm.currentDialog)||void 0===B?void 0:B.dialogConfig.enableDismissIconButton}),nA)}
      </div>
    </div>
  </template>
`;let aA=class extends St{constructor(){super(),this.dialogPositionX=iA.Center,this.dialogPositionY=iA.Center,this.focusableElementSelectors="button:not([disabled]), a[href]:not([disabled]), input[type='button']:not([disabled]), input[type='submit']:not([disabled]), input[type='text']:not([disabled]), input[type='radio']:not([disabled]), input[type='checkbox']:not([disabled]), textarea:not([disabled]), select:not([disabled])",this.handleDismissBtnClick=O=>{O.preventDefault(),O.stopPropagation(),this.vm.dismiss()},this.handleOverlayClick=O=>{var B;O.preventDefault(),O.stopPropagation(),(null===(B=this.vm.currentDialog)||void 0===B?void 0:B.dialogConfig.isLightDismiss)&&this.vm.dismiss()},this.handleVisibilityChanged=O=>{var B,U,G,q;O&&this.vm.serp.inMode(Hy.Conversation)&&this.layout.serpSlot===jy.None?(this.visibilityChangedDisposer=new Disposer,this.visibilityChangedDisposer.register(addDisposableListener(document,"focusin",this.handleDocumentFocusIn)),this.visibilityChangedDisposer.register(addDisposableListener(document,"keydown",this.handleDocumentKeyDown)),this.dialogPositionX=null!==(U=null===(B=this.vm.currentDialog)||void 0===B?void 0:B.dialogConfig.positionX)&&void 0!==U?U:iA.Center,this.dialogPositionY=null!==(q=null===(G=this.vm.currentDialog)||void 0===G?void 0:G.dialogConfig.positionY)&&void 0!==q?q:iA.Center,this.trapFocus(),setTimeout((()=>{var O,B;const U=null===(B=null===(O=this.contentRef)||void 0===O?void 0:O.firstElementChild)||void 0===B?void 0:B.shadowRoot;U&&this.contentMutationObserver.observe(U,{childList:!0,subtree:!0})}),300)):this.handleModalHidden()},this.handleDocumentFocusIn=O=>{this.trapFocus(),O.preventDefault()},this.handleDocumentKeyDown=O=>{if(this.vm.isVisible)switch(O.code){case"Escape":this.vm.dismiss(),O.preventDefault();break;case"Tab":if(this.focusableElements){if(1===this.focusableElements.length)return this.focusableElements[0].focus(),void O.preventDefault();const B=O.composedPath()[0];if(O.shiftKey&&B===this.focusableElements[0])this.focusableElements[this.focusableElements.length-1].focus(),O.preventDefault();else if(O.shiftKey||B!==this.focusableElements[this.focusableElements.length-1]){if("radio"===B.type){const U=this.focusableElements[0],G=this.focusableElements[this.focusableElements.length-1];O.shiftKey&&"radio"===U.type&&U.name===B.name&&(this.focusableElements[this.focusableElements.length-1].focus(),O.preventDefault()),O.shiftKey||"radio"!==G.type||G.name!==B.name||(this.focusableElements[0].focus(),O.preventDefault())}}else this.focusableElements[0].focus(),O.preventDefault()}}},this.handleMutation=O=>{for(const B of O)if("childList"===B.type&&B.addedNodes.length>0)return this.vm.isFocusTrapped=!1,void this.trapFocus()},this.contentMutationObserver=new MutationObserver(this.handleMutation)}connectedCallback(){super.connectedCallback(),this.disposer||(this.disposer=new Disposer,this.disposer.register(this.vm.onVisibilityChanged(this.handleVisibilityChanged)))}disconnectedCallback(){var O;this.disposer&&!this.disposer.isDisposed&&(this.disposer.dispose(),delete this.disposer),(null===(O=this.visibilityChangedDisposer)||void 0===O?void 0:O.isDisposed)||this.handleModalHidden(),super.disconnectedCallback()}renderModalDialog(){const O=this.vm.currentDialog,{dialog:B}=O.dialogConfig;return html`<${B} :vm=${()=>O} :layout=${()=>O.layout}></${B}>`}handleModalHidden(){var O;this.contentMutationObserver.disconnect(),null===(O=this.visibilityChangedDisposer)||void 0===O||O.dispose(),delete this.visibilityChangedDisposer}trapFocus(){this.vm.isFocusTrapped||setTimeout((()=>{var O,B,U,G,q;this.vm.isFocusTrapped=!0,this.focusableElements=Array.prototype.slice.call(null===(U=null===(B=null===(O=this.contentRef)||void 0===O?void 0:O.firstElementChild)||void 0===B?void 0:B.shadowRoot)||void 0===U?void 0:U.querySelectorAll(this.focusableElementSelectors)).concat(Array.prototype.slice.call(this.querySelectorAll(this.focusableElementSelectors))).concat(Array.prototype.slice.call(null===(G=this.shadowRoot)||void 0===G?void 0:G.querySelectorAll(this.focusableElementSelectors))),this.focusableElements&&!this.contains(document.activeElement)&&(null===(q=this.focusableElements)||void 0===q||q[0].focus())}),300)}};__decorate([attr({attribute:"dialog-position-x"}),__metadata("design:type",String)],aA.prototype,"dialogPositionX",void 0),__decorate([attr({attribute:"dialog-position-y"}),__metadata("design:type",String)],aA.prototype,"dialogPositionY",void 0),__decorate([observable,__metadata("design:type",Object)],aA.prototype,"vm",void 0),__decorate([observable,__metadata("design:type",Object)],aA.prototype,"layout",void 0),aA=__decorate([customElement({name:"cib-modal",template:oA,styles:rA}),__metadata("design:paramtypes",[])],aA);const sA=css`
  :host {
    display: flex;
    flex-direction: column;
    width: var(--side-panel-width);
    opacity: 1;
    transition: transform ${tb.static.motion.duration.slowest}
        ${tb.static.motion.easingFunction.motionTransition},
      opacity ${tb.static.motion.duration.normal} ${tb.static.motion.easingFunction.linear};
  }

  /* HEADER */

  .header {
    display: flex;
    column-gap: 16px;
    position: relative;
    flex-shrink: 0;
    padding-inline: 16px;
    padding-top: 30px;
    padding-bottom: 22px;
  }

  .header::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 16px;
    right: 16px;
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  /* PIVOT */

  .pivot {
    position: relative;
    height: 24px;
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
  }

  .pivot[disabled] {
    cursor: default;
    pointer-events: none;
  }

  .pivot.selected {
    font-weight: 600;
  }

  .pivot.selected::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -3px;
    left: 0;
    border-radius: 2px;
    background: ${tb.theme.brandColors.background.colorBrandPrimaryBackground};
  }

  .pivot:only-child::before {
    display: none;
  }

  /* MAIN */

  .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  /* SCROLLER */

  .scroller {
    position: relative;
    padding: 16px;
    max-height: max(324px, 60%);
  }

  :host([expanded]) .scroller {
    overflow: hidden auto;
    max-height: unset;
  }

  :host([expanded]) .scroller .surface,
  :host([expanded]) .scroller .threads {
    height: unset !important;
    max-height: unset !important;
  }

  /* SURFACE */

  .surface {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCardDisabled};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
  }

  /* THREADS */

  .threads {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    flex-wrap: wrap;
    column-gap: 20px;
    overflow: hidden;
    max-height: calc(100% - 44px);
  }

  .threads cib-thread:first-child::before {
    border-color: transparent;
  }

  @media (hover: hover) {
    .threads cib-thread:hover + cib-thread::before,
    .threads cib-thread:focus + cib-thread::before,
    .threads cib-thread:focus-within + cib-thread::before {
      border-color: transparent;
    }
  }
  .threads cib-thread:active + cib-thread::before {
    border-color: transparent;
  }

  /* DOCKED */

  :host([docked]) {
    border-left: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  :host([docked]) .header::after {
    left: 0;
    right: 0;
  }

  /* ACTION */

  .show-recent {
    display: flex;
    width: 100%;
    background: transparent;
    border: none;
    margin: 0;
    padding: 18px 20px;
    cursor: pointer;
    border-top: 1px solid ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
    color: ${tb.theme.brandColors.foreground.colorBrandSecondaryForeground};
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  .scroller .show-recent {
    padding: 12px;
  }

  /* HISTORY DESCRIPTION */

  .history-description {
    margin-top: 24px;
    margin-inline-start: 32px;
    margin-inline-end: 32px;
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .history-description-note {
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
    margin: 24px 0 32px 0;
    margin-inline-start: 32px;
    margin-inline-end: 32px;
  }

  /* MOBILE */

  :host([mobile]) {
    height: 100%;
    width: 100%;
  }

  :host([mobile]) .header {
    padding-top: 8px;
    padding-bottom: 12px;
    padding-inline: 16px;
    border-bottom: unset;
  }

  :host([mobile]) .header::after {
    display: none;
  }

  :host([mobile]) .header-title {
    font-weight: ${tb.platform.typography.typeRamp.body1Strong.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.body1Strong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Strong.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Strong.fontVariationSettings};
    font-variation-settings: unset;
  }

  :host([mobile]) .scroller {
    overflow: hidden overlay;
    padding: 0;
    height: auto;
    max-height: unset;
  }

  :host([mobile]) .scroller .surface {
    box-shadow: none;
    background: ${tb.theme.neutralColors.background.colorNeutralInputBackground};
  }

  :host([mobile]) .scroller .surface,
  :host([mobile]) .scroller .threads {
    max-height: unset;
    padding: 4px;
  }

  :host([mobile]) .scroller .surface {
    margin: 0 16px;
  }

  :host([mobile]) cib-thread:last-of-type {
    border-bottom: unset;
  }
`,lA=css`
  :host {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    align-items: center;
    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
  }

  :host::before {
    position: absolute;
    content: "";
    top: 0;
    left: 8px;
    right: 8px;
    border-top: 1px solid ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  @media (hover: hover) {
    :host(:hover),
    :host(:focus),
    :host(:focus-within) {
      box-sizing: border-box;
      background: ${tb.theme.neutralColors.background.colorNeutralLayerCard};
      box-shadow: ${tb.theme.shadows.elevations.elevation1};
    }

    :host(:hover)::before,
    :host(:focus)::before,
    :host(:focus-within)::before {
      border-color: transparent;
    }
  }

  :host([active]) {
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    box-shadow: ${tb.theme.shadows.elevations.elevation1};
  }

  :host([preview]) {
    border-bottom: unset;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
  }

  /* TONE INDICATOR */

  :host(:is(:hover, :focus, :focus-within, [active]):not([preview], [mobile]))::after {
    content: "";
    position: absolute;
    width: 3px;
    height: 100%;
    inset-inline-start: 0;
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;
  }

  :host([hide]) {
    visibility: hidden;
  }

  :host([tone=${sr.Precise}])::after {
    background: ${tb.theme.brandColors.background.colorBrandPrecisePrimaryBackground};
  }

  :host([tone=${sr.Creative}])::after {
    background: ${tb.theme.brandColors.background.colorBrandCreativePrimaryBackground};
  }

  :host([tone=${sr.Balanced}])::after {
    background: ${tb.theme.brandColors.background.colorBrandBalancedPrimaryBackground};
  }

  /* CONTAINER */

  .root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    height: 44px;
    width: 100%;
    box-sizing: border-box;
    padding-block: 10px;
    padding-inline: 8px 6px;
  }

  :host([preview]) .root {
    padding: 16px;
  }

  /* BUTTON */

  .root button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }

  .root > button {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  button:hover {
    cursor: pointer;
  }

  button[aria-expanded="true"] {
    background: ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    border-radius: 4px;
  }

  /* ICON BUTTON */

  .icon-button {
    display: none;
    position: relative;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
  }

  :host(:is(:hover, :focus, :focus-within, [active], [editing]):not([preview], [mobile])) .icon-button {
    display: flex;
  }

  .icon-button:hover {
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  .icon-button:active {
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundPressed};
  }

  .icon-button.confirm {
    fill: ${tb.theme.icons.themed.colorStatusPositivePrimary};
  }

  .icon-button.close {
    fill: ${tb.theme.icons.themed.colorStatusNegativePrimary};
  }

  /* DESCRIPTION */

  .description {
    width: 100%;
    position: relative;
    overflow: hidden;
    pointer-events: none;
  }

  :host(:not([editing])) .description {
    -webkit-mask-image: linear-gradient(
      to right,
      ${tb.theme.neutralColors.background.colorNeutralAppBackground} 90%,
      transparent
    );
  }

  .name {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 2px 4px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 3px;
    border: 1px solid transparent;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }

  :host([editing]) .name {
    outline: none;
    border-color: ${tb.theme.brandColors.stroke.colorBrandSecondaryStroke};
    pointer-events: auto;
  }

  :host([preview]) .name {
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  /* CONTROLS */

  .controls {
    display: flex;
    flex-direction: row;
  }

  :host(:not(:hover, :focus, :focus-within, [active]):not([editing], [preview], [mobile])) .controls {
    display: none;
  }

  /* TIMESTAMP */

  .time {
    display: flex;
    align-items: center;
    text-align: right;
    margin: 0;
    flex-shrink: 0;
    padding-inline-end: 6px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
    font-weight: ${tb.platform.typography.typeRamp.caption2.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.caption2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption2.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption2.fontVariationSettings};
  }

  :host(:is(:hover, :focus, :focus-within, [active]):not([preview], [mobile])) .time {
    display: none;
  }

  /* MOBILE */

  :host([mobile]) {
    min-height: 52px;
  }

  :host([mobile]:active) {
    background: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  :host([mobile]:active)::before {
    border-color: transparent;
  }

  :host([mobile]) .root {
    padding: 0px 4px;
  }

  :host([mobile]) .name {
    font-weight: ${tb.platform.typography.typeRamp.body2.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  :host([mobile]) .time,
  :host([preview]) .time {
    font-weight: ${tb.platform.typography.typeRamp.caption1.fontWeight};
    font-size: ${tb.platform.typography.typeRamp.caption1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.caption1.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.caption1.fontVariationSettings};
  }

  :host([mobile]) .controls {
    display: none;
  }
`,cA=css`
  :host {
    position: fixed;
    inset-inline-end: 26px;
    transform: translateY(30px);
    display: flex;
    align-items: flex-start;
    z-index: 1;
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    border-radius: 4px;
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    box-shadow: 0px 2px 3px ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    padding-inline: 0 8px;
    padding-block: 8px;
  }

  /* BUTTON */

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-inline-start: 14px;
    width: 159px;
    height: 36px;
    cursor: pointer;
    border: none;
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    color: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForeground};
    font-family: ${tb.platform.typography.fonts.text};
    font-size: 13px;
    line-height: 15px;
  }

  button:hover {
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
    color: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForegroundPressed};
  }

  button[aria-expanded="true"] {
    font-weight: 700;
    color: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForegroundPressed};
  }

  /* ICON */

  svg-icon {
    width: 16px;
    height: 16px;
    margin-inline-end: 8px;
    fill: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForeground};
  }

  button:hover svg-icon {
    fill: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForegroundPressed};
  }

  button[aria-expanded="true"] svg-icon {
    fill: ${tb.theme.stealthColors.foreground.colorStealthSecondaryForegroundPressed};
  }

  /* STATES */

  :host([open-export-sub-menu="false"]) .sub-menu {
    display: none;
  }

  :host([open-export-sub-menu="true"]) .sub-menu {
    display: block;
  }

  :host([open-export-sub-menu="true"]) .main-menu {
    margin-inline-end: 7px;
  }

  :host([open-export-sub-menu="true"]) {
    border-color: ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }
`,dA=html`
  <template
    open-export-sub-menu=${O=>O.isExportSubmenuShown}
    @mouseleave=${O=>O.handleHostMouseLeave()}
    @mouseenter=${O=>O.handleHostMouseEnter()}
    style="transform: translateY(${O=>{var B,U;return 30-(null!==(U=null===(B=O.vm.sidePanelVm)||void 0===B?void 0:B.sidePanelScrollTop)&&void 0!==U?U:0)}}px)"
  >
    <div class="main-menu" role="menu">
      <button
        type="button"
        role="menuitem"
        @click=${(O,B)=>O.handleShareButtonClickAsync(B.event)}
        aria-label=${O=>O.vm.strings.shareButtonAriaLabel}
        ${ref("shareButton")}
      >
        <svg-icon type=${lE.Share} size="16"></svg-icon>
        <span class="menu-text">${O=>O.vm.strings.tooltipShare}</span>
      </button>
      <button
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded=${O=>O.isExportButtonClicked}
        @click=${(O,B)=>O.handleExportButtonClick(B.event)}
        aria-label=${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.exportButtonAriaLabel}}
      >
        <svg-icon type=${lE.ArrowDownload} size="16"></svg-icon>
        <span class="menu-text">${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.tooltipExport}}</span>
      </button>
    </div>
    <div class="sub-menu" role="menu">
      <button
        type="button"
        role="menuitem"
        aria-label=${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.exportPdfButtonAriaLabel}}
        @click=${(O,B)=>O.vm.handleExport(B.event,up.Pdf)}
      >
        <span class="menu-text">${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.messageActionsExportPdf}}</span>
      </button>
      <button
        type="button"
        role="menuitem"
        aria-label=${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.exportWordButtonAriaLabel}}
        @click=${(O,B)=>O.vm.handleExport(B.event,up.Docx)}
      >
        <span class="menu-text">${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.messageActionsExportWord}}</span>
      </button>
      <button
        type="button"
        role="menuitem"
        aria-label=${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.exportTextButtonAriaLabel}}
        @click=${(O,B)=>O.vm.handleExport(B.event,up.Txt)}
      >
        <span class="menu-text">${O=>{var B;return null===(B=O.vm.exportVm)||void 0===B?void 0:B.strings.messageActionsExportText}}</span>
      </button>
    </div>
  </template>
`;let pA=class extends St{constructor(){super(...arguments),this.isExportSubmenuShown=!1,this.isExportButtonClicked=!1,this.hostMouseoverTimerId=null,this.hostMouseoverTimeoutMs=1e3}connectedCallback(){var O;super.connectedCallback(),this.vm.config.features.enableFeedbackInstrumentation&&this.shareButton&&this.vm.telemetry.trackEvent("Show","CibThreadContextMenuHandleShareShow",{Namespace:jy.toTelemetryNamespace(null===(O=this.layout)||void 0===O?void 0:O.serpSlot)}),this.vm.telemetry.trackEvent("Show","CibThreadContextMenuExportShow",{Namespace:"Thread"})}hideContextMenu(){this.$emit("contextmenuhide")}handleHostMouseLeave(){this.hostMouseoverTimerId=window.setTimeout((()=>{this.hideContextMenu(),this.hideExportSubmenu(),this.resetExportButtonClickedStatus()}),this.hostMouseoverTimeoutMs)}handleHostMouseEnter(){this.hostMouseoverTimerId&&(window.clearTimeout(this.hostMouseoverTimerId),this.hostMouseoverTimerId=null)}hideExportSubmenu(){!1!==this.isExportSubmenuShown&&(this.isExportSubmenuShown=!1)}toggleExportButtonClickStatus(){this.isExportButtonClicked=!this.isExportButtonClicked}resetExportButtonClickedStatus(){this.isExportButtonClicked&&(this.isExportButtonClicked=!1)}toggleExportSubmenu(){this.isExportSubmenuShown=!this.isExportSubmenuShown}handleExportButtonClick(O){O.preventDefault(),O.stopPropagation(),this.toggleExportSubmenu(),this.toggleExportButtonClickStatus()}async handleShareButtonClickAsync(O){var B,U,G,q;this.vm.config.features.enableFeedbackInstrumentation&&this.vm.telemetry.trackEvent("Click","CibThreadContextMenuHandleShareClick",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)}),O.preventDefault(),O.stopPropagation(),this.hideExportSubmenu(),this.resetExportButtonClickedStatus(),this.historyScreenshot?this.shareButton?await(null===(q=this.vm.feedbackVm)||void 0===q?void 0:q.share(this.layout.serpSlot,this.historyScreenshot,this.shareButton,this.layout.hoverVm)):null===(G=this.vm.log)||void 0===G||G.error(this,this.handleShareButtonClickAsync,"ShareButton undefined, ending share early").write():null===(U=this.vm.log)||void 0===U||U.error(this,this.handleShareButtonClickAsync,"Screenshot target undefined, ending share early").write()}};__decorate([observable,__metadata("design:type",Boolean)],pA.prototype,"isExportSubmenuShown",void 0),__decorate([observable,__metadata("design:type",Boolean)],pA.prototype,"isExportButtonClicked",void 0),__decorate([observable,__metadata("design:type",Object)],pA.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",HTMLButtonElement)],pA.prototype,"shareButton",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],pA.prototype,"historyScreenshot",void 0),pA=__decorate([customElement({name:"cib-thread-context-menu",template:dA,styles:cA})],pA);const uA=html` <h4 class="time">${O=>O.vm.displayTime}</h4> `,hA=html`
  <button
    class="edit icon-button"
    @click=${(O,B)=>O.handleEditClick(B.event)}
    type="button"
    aria-label=${O=>O.vm.strings.edit}
  >
    <svg-icon type=${lE.Edit} size="16"></svg-icon>
  </button>
  <button
    class="delete icon-button"
    @click=${(O,B)=>O.handleDeleteClickAsync(B.event)}
    type="button"
    aria-label=${O=>O.vm.strings.delete}
  >
    <svg-icon type=${lE.Delete} size="16"></svg-icon>
  </button>
  ${when((O=>O.vm.isContextMenuEnabled),html`<button
      class="more icon-button"
      type="button"
      @click=${(O,B)=>O.toggleContextMenu(B.event)}
      aria-expanded=${O=>O.isContextMenuShown}
      aria-haspopup="true"
      aria-label=${O=>O.vm.strings.more}
    >
      <svg-icon type=${lE.More} size="16"></svg-icon>
    </button>`)}
`,mA=html`
  <button
    class="confirm icon-button"
    @click=${(O,B)=>O.handleConfirmEditAsync(B.event)}
    type="button"
    aria-label=${O=>O.vm.strings.confirm}
  >
    <svg-icon type=${lE.CheckMark} size="16"></svg-icon>
  </button>
  <button
    class="close icon-button"
    @click=${(O,B)=>O.handleCancelEdit(B.event)}
    type="button"
    aria-label=${O=>O.vm.strings.cancel}
  >
    <svg-icon type=${lE.Close} size="16"></svg-icon>
  </button>
`,gA=html`
  <cib-thread-context-menu
    @contextmenuhide=${O=>O.hideContextMenu()}
    :vm=${O=>O.vm.contextMenuVm}
    :layout=${O=>O.layout}
    :historyScreenshot=${O=>O.historyScreenshot}
  ></cib-thread-context-menu>
`,fA=html`
  <template
    tone=${O=>{var B;return null===(B=O.vm.model)||void 0===B?void 0:B.threadData.tone}}
    ?active=${O=>O.vm.isActive}
    ?editing=${O=>O.vm.isEditing}
    ?mobile=${O=>O.layout.isMobile}
    enable-context-menu=${O=>O.vm.isContextMenuEnabled}
    ?preview=${O=>O.preview}
  >
    <div class="root">
      <button
        @click=${(O,B)=>O.handleThreadClick(B.event)}
        type="button"
        aria-label=${O=>O.vm.strings.load}
      ></button>
      <div class="description">
        <h3
          class="name"
          ${ref("name")}
          ?contenteditable=${O=>O.vm.isEditing}
          @keydown=${(O,B)=>O.handleEditKeyDown(B.event)}
        >
          ${O=>O.vm.name}
        </h3>
      </div>
      ${when((O=>!O.vm.isEditing),uA)}
      <div class="controls">
        ${O=>!0==!!O.vm.isEditing?mA:hA}
        ${when((O=>O.vm.isContextMenuEnabled&&O.isContextMenuShown),gA)}
      </div>
    </div>
  </template>
`;let yA=class extends St{constructor(){super(),this.isContextMenuShown=!1,this.minMediaQuery=window.matchMedia("(min-width: 768px)")}connectedCallback(){var O;super.connectedCallback(),this.vm.isContextMenuEnabled&&(null===(O=this.vm.contextMenuVm)||void 0===O||O.telemetry.trackEvent("InteractionEvent","CibThreadContextMenuEnable",{Namespace:"Thread"}))}handleEditClick(O){this.name&&(this.vm.beginEdit(),setTimeout((()=>{const O=document.createRange(),B=window.getSelection();O.selectNodeContents(this.name),O.collapse(!1),B&&(B.removeAllRanges(),B.addRange(O)),this.name.focus(),O.detach()}),100)),O.preventDefault(),O.stopPropagation()}async handleDeleteClickAsync(O){await this.vm.deleteSingleConversationAsync(),O.preventDefault(),O.stopPropagation()}async handleConfirmEditAsync(O){this.name&&(this.setCaretFront(),await this.vm.confirmEditAsync(this.name.innerText)),O.preventDefault(),O.stopPropagation()}handleCancelEdit(O){this.name&&(this.setCaretFront(),this.vm.cancelEdit(),this.name.innerText&&(this.name.innerText=this.vm.name)),O.preventDefault(),O.stopPropagation()}handleEditKeyDown(O){if(this.name&&this.vm.isEditing){if("Enter"===O.key)return this.setCaretFront(),this.vm.confirmEditAsync(this.name.innerText),!1;if("Escape"===O.key)return this.setCaretFront(),this.vm.cancelEdit(),this.name.innerText=this.vm.name,!1}return!0}async handleEditFocusOutAsync(O){this.name&&this.vm.isEditing&&(this.setCaretFront(),await this.vm.confirmEditAsync(this.name.innerText))}setCaretFront(){this.name&&this.name.scrollBy(0-this.name.scrollLeft,0)}handleThreadKeyDown(O){return!(O.target===this&&!this.vm.isEditing&&"Enter"===O.key)||(this.vm.loadThreadAsync(),this.handleSidePaneVisibilityOnThreadLoadClick(),!1)}handleThreadClick(O){this.vm.isEditing||(this.vm.loadThreadAsync(),this.handleSidePaneVisibilityOnThreadLoadClick(),O.stopPropagation(),O.preventDefault())}toggleContextMenu(O){var B;O.preventDefault(),O.stopPropagation(),this.isContextMenuShown=!this.isContextMenuShown,this.isContextMenuShown&&(null===(B=this.vm.contextMenuVm)||void 0===B||B.telemetry.trackEvent("Show","CibThreadContextMenuShow",{Namespace:"Thread"}))}hideContextMenu(){!1!==this.isContextMenuShown&&(this.isContextMenuShown=!1)}handleSidePaneVisibilityOnThreadLoadClick(){var O;this.layout.productType===Mb.Shoreline&&(this.minMediaQuery.matches||null===(O=this.vm.sidePanelVm)||void 0===O||O.toggleVisibility(!1))}};__decorate([observable,__metadata("design:type",Object)],yA.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],yA.prototype,"isContextMenuShown",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],yA.prototype,"historyScreenshot",void 0),yA=__decorate([customElement({name:"cib-thread",template:fA,styles:lA}),__metadata("design:paramtypes",[])],yA);const _A=css`
  .plugin-control .title {
    display: none;
    padding: 16px 16px 0;
  }

  .plugin-control .title h2,
  .plugin h2 {
    position: relative;
    margin: 0 0 4px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
  }

  /* SCROLLER */

  .scroller {
    position: relative;
    padding: 16px;
    max-height: max(324px, 60%);
  }

  :host([expanded]) .scroller {
    overflow: hidden auto;
    max-height: unset;
  }

  :host([expanded]) .scroller .surface {
    height: unset !important;
    max-height: unset !important;
  }

  /* SURFACE */

  .surface {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    border-radius: 8px;
    background: ${tb.theme.neutralColors.background.colorNeutralLayerCardDisabled};
    box-shadow: ${tb.theme.shadows.elevations.elevation4};
  }

  /* PLUGIN LIST */

  .plugin-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    flex-wrap: wrap;
    column-gap: 20px;
    overflow: hidden;
    max-height: calc(100% - 44px);
  }

  /* PLUGIN */

  .plugin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    height: 44px;
    width: 100%;
    box-sizing: border-box;
    padding-block: 10px;
    padding-inline: 12px 20px;
  }

  .plugin:not(:first-child)::before {
    position: absolute;
    content: "";
    top: 0;
    left: 8px;
    right: 8px;
    border-top: 1px solid ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  .plugin .plugin-description {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .plugin .plugin-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    object-position: center;
  }

  .plugin .plugin-label {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${tb.platform.typography.typeRamp.body1.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1.lineHeight};
    font-weight: ${tb.platform.typography.typeRamp.body1.fontWeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1.fontVariationSettings};
  }
`,vA=html`
  <div class="plugin">
    <div class="plugin-description">
      <img class="plugin-icon" src=${O=>O.iconUrl} draggable="false" />
      <h2 class="plugin-label">${O=>O.label}</h2>
    </div>
    ${when((O=>O.isToggleVisible),html`
        <cib-switch
          id=${O=>O.name}
          class="switch"
          ?checked=${O=>O.enabled}
          :onChange=${(O,B)=>B.parent.onSwitchClick}
          :disabled=${O=>O.isToggleDisabled}
        ></cib-switch>
      `)}
  </div>
`,bA=html`
  <div class="scroller" ${ref("scrollerRef")}>
    <div class="surface">
      <div class="plugin-list">${repeat((O=>O.vm.plugins),vA)}</div>
    </div>
  </div>
`;let SA=class extends St{constructor(){super(...arguments),this.onSwitchClick=(O,B)=>{if(!O.target)return;const U=this.vm.plugins.find((B=>B.name===O.target.id));if(!U)return;const G=U.optionSet;B?this.vm.addOptionSet(G):this.vm.removeOptionSet(G)}}};SA=__decorate([customElement({name:"cib-plugin-panel",template:bA,styles:_A})],SA);const CA=html` <cib-history-conversation
  :layout=${O=>O.layout}
  :vm=${O=>O.vm.historyConversationVm}
  ${ref("historyScreenshot")}
>
</cib-history-conversation>`,EA=html`
  <div class="header">
    ${when((O=>O.vm.panels),html` ${repeat((O=>O.vm.panels),html`
  <button
    class="pivot ${(O,B)=>B.parent.vm.selectedPanel===O.type?"selected":""}"
    ?disabled=${(O,B)=>1===B.parent.vm.panels.length}
    @click=${(O,B)=>B.parent.handleHeaderTabClick(O)}
  >
    ${O=>O.label}
  </button>
`)} `)}
  </div>
`,xA=html`
  <button class="show-recent" @click=${O=>O.handleThreadsPanelExpansionClick()} type="button">
    ${O=>O.vm.threadsPanelExpansionText}
  </button>
`,TA=html`
  <div class="scroller" ${ref("scrollerRef")}>
    <div class="surface">
      <div class="threads" ${ref("threadsRef")}>
        ${repeat(((O,B)=>O.vm.threads),html`
            <cib-thread
              :layout=${(O,B)=>B.parent.layout}
              :vm=${O=>O}
              :historyScreenshot=${(O,B)=>B.parent.historyScreenshot}
            ></cib-thread>
          `,{recycle:!1})}
      </div>
      ${when((O=>(O.vm.shouldShowExpansion||O.vm.isThreadsPanelExpanded)&&!O.vm.isThreadsPanelDocked&&!O.layout.isMobile),xA)}
    </div>
    ${when((O=>O.layout.isMobile),html`
        <p class="history-description">${O=>O.vm.config.strings.threadsDescription}</p>
        <p class="history-description-note">${O=>O.vm.config.strings.threadsDescriptionNote}</p>
      `)}
  </div>
  ${when((O=>(O.vm.shouldShowExpansion||O.vm.isThreadsPanelExpanded)&&O.vm.isThreadsPanelDocked&&!O.layout.isMobile),xA)}
  ${when((O=>O.vm.config.features.enableThreadShareLandingPage&&!O.layout.isMobile),CA)}
`,wA=html`
  <template
    mode=${O=>O.vm.serp.mode}
    product=${O=>O.layout.productType}
    ?mobile=${O=>O.layout.isMobile}
    ?expanded=${O=>O.vm.isThreadsPanelExpanded}
    ?docked=${O=>O.vm.isThreadsPanelDocked}
  >
    ${EA}
    <div class="main">
      ${when((O=>O.vm.selectedPanel===fb.Threads),TA)}
      ${when((O=>O.vm.selectedPanel===fb.Plugins),html` <cib-plugin-panel :vm=${O=>O.vm.pluginPanel}> </cib-plugin-panel> `)}
    </div>
  </template>
`;let kA=class extends St{constructor(){super(),this.threadHeight=44,this.threadsPadding=8,this.scrollerPadding=24,this.seeAllHeight=44,this.threadsContentObserver=null,this.threadsSizeObserver=null,this.handleScroll=()=>{var O,B;this.vm.updateSidePanelScrollTop(null!==(B=null===(O=this.scrollerRef)||void 0===O?void 0:O.scrollTop)&&void 0!==B?B:0)},this.handleMutation=(O,B)=>{O&&O.length>0&&O[0].target&&this.updateThreadsVisibility(O[0].target)},this.handleResize=O=>{O&&O.length>0&&O[0].target&&this.updateThreadsVisibility(O[0].target)},this.handleWindowResize=()=>{this.threadsRef&&this.threadsRef.style.removeProperty("height"),this.handleDocking()},this.disposer=new Disposer}connectedCallback(){if(super.connectedCallback(),!this.layout.isMobile&&this.layout.productType!==Mb.Shoreline){if(this.updateThreadsVisibility(),this.threadsRef){this.threadsContentObserver=new MutationObserver(this.handleMutation);const O={attributes:!1,childList:!0,subtree:!0};this.threadsContentObserver.observe(this.threadsRef,O),this.threadsSizeObserver=new ResizeObserver(this.handleResize),this.threadsSizeObserver.observe(this.threadsRef),this.disposer.register(addDisposableListener(window,"resize",this.handleWindowResize))}this.scrollerRef&&this.disposer.register(addDisposableListener(this.scrollerRef,"scroll",this.handleScroll))}}disconnectedCallback(){var O,B;super.disconnectedCallback(),this.threadsRef&&(null===(O=this.threadsSizeObserver)||void 0===O||O.unobserve(this.threadsRef)),null===(B=this.threadsContentObserver)||void 0===B||B.disconnect(),this.disposer.isDisposed||this.disposer.dispose()}handleThreadsPanelExpansionClick(){this.vm.handleThreadsPanelExpansionClick()}handleHeaderTabClick(O){this.vm.selectedPanel=O.type}updateThreadsVisibility(O){const B=null!=O?O:this.threadsRef;if(!B||!this.scrollerRef||!this.threadsRef)return;this.threadsRef.style.removeProperty("height");const U=B.children,G=Math.floor((B.clientHeight-this.threadsPadding)/this.threadHeight);this.vm.shouldShowExpansion=U.length>G;for(let O=0;O<U.length;O++){const B=U[O];B&&(O<G||this.vm.isThreadsPanelExpanded||!this.vm.shouldShowExpansion?B.removeAttribute("hide"):B.setAttribute("hide",""))}this.vm.shouldShowExpansion?this.threadsRef.style.setProperty("height",G*this.threadHeight+"px"):this.threadsRef.style.removeProperty("height"),this.handleDocking()}handleDocking(){if(this.threadsRef&&this.scrollerRef){const O=this.threadsRef.clientHeight,B=this.scrollerRef.clientHeight;this.vm.isThreadsPanelDocked=this.vm.isThreadsPanelExpanded&&(this.vm.isThreadsPanelDocked?O>B-this.scrollerPadding:O>B-this.scrollerPadding-this.seeAllHeight)}}};__decorate([observable,__metadata("design:type",Object)],kA.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],kA.prototype,"historyScreenshot",void 0),kA=__decorate([customElement({name:"cib-side-panel",template:wA,styles:sA}),__metadata("design:paramtypes",[])],kA);const AA=css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 0 8px;
    margin-top: 16px;
    pointer-events: none;
  }

  /* SIDE PANEL IS ACTIVE */

  :host([side-panel]) {
    justify-content: flex-start;
  }

  /* TITLE */

  .active-title {
    position: relative;
    margin: 0;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: ${tb.platform.typography.typeRamp.messageStrong.fontSize};
    line-height: ${tb.platform.typography.typeRamp.messageStrong.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.messageStrong.fontVariationSettings};
  }

  input.active-title {
    pointer-events: auto;
    width: 100%;
  }

  /* ICON BUTTON */

  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 4px;
    background: unset;
    border: unset;
    pointer-events: auto;
    cursor: pointer;
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  @media (hover: hover) {
    .icon-button:hover,
    .icon-button:focus-visible {
      background-color: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
    }
  }

  .icon-button:active {
    background-color: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundPressed};
  }

  .icon-button[active] {
    background-color: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  /* MORE MENU */

  .more-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 48px;
    inset-inline-end: 8px;
    min-width: 156px;
    box-sizing: border-box;
    padding: 6px 0;
    border-radius: 8px;
    pointer-events: auto;
    box-shadow: ${tb.theme.shadows.defaults.flyout};
    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
  }

  .more-menu button {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    height: 44px;
    box-sizing: border-box;
    padding: 0 16px;
    margin: 0 6px;
    border-radius: 4px;
    background: unset;
    border: unset;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground};
    font-size: ${tb.platform.typography.typeRamp.body2.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body2.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body2.fontVariationSettings};
  }

  .more-menu button:active {
    background-color: ${tb.theme.stealthColors.background.colorStealthPrimaryBackgroundHover};
  }

  .more-menu span.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    fill: ${tb.theme.neutralColors.foreground.colorNeutralForegroundHint};
  }

  .more-menu button[disabled] {
    pointer-events: none;
  }

  .more-menu button[disabled] svg-icon {
    fill: ${tb.theme.neutralColors.stroke.colorNeutralPrimaryStroke};
  }

  .more-menu button[disabled] span {
    color: ${tb.theme.neutralColors.stroke.colorNeutralPrimaryStroke};
  }

  /* PRODUCT TYPE */

  :host([product=${Mb.Shoreline}]) {
    position: relative;
    flex-shrink: 0;
    height: 64px;
    padding-inline: 12px;
    margin: 0;
    z-index: 1;
    width: calc(100% - var(--side-panel-width) - 1px);
    background-color: ${tb.theme.neutralColors.background.colorNeutralAppBackgroundAlt};
    border-bottom: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
  }

  :host([product=${Mb.Shoreline}]) .icon-button {
    height: 32px;
    width: 32px;
  }

  :host([product=${Mb.Shoreline}]) .active-title {
    font-weight: 600;
    font-size: ${tb.platform.typography.typeRamp.body1Stronger.fontSize};
    line-height: ${tb.platform.typography.typeRamp.body1Stronger.lineHeight};
    font-variation-settings: ${tb.platform.typography.typeRamp.body1Stronger.fontVariationSettings};
  }

  @media (max-width: 767px) {
    :host([product=${Mb.Shoreline}]) {
      width: 100%;
    }
  }
`,RA=css`
  :host {
    background: ${tb.theme.neutralColors.background.colorNeutralDrawerBackground};
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: calc(-1 * max(calc(10vh + calc(env(safe-area-inset-top))), 80px));
    left: 0;
    z-index: 2;
    touch-action: none;
    display: block;
  }

  :host(:not([visible])) {
    display: none;
  }

  .header {
    padding-inline-start: 16px;
    display: flex;
    align-items: center;
    margin-block-start: 23px;
  }

  .header-title {
    margin-inline-start: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
  }

  svg-icon {
    fill: #1a1a1a;
  }

  .content {
    margin-block-start: 34px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 0px 0px;
    gap: 12px;
  }

  .content-line {
    width: 100vw;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 24px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
  }

  .icon-container {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-inline-end: 16px;
  }

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    width: 76px;
    height: 40px;

    background: ${tb.theme.neutralColors.background.colorNeutralAppBackground};
    border: 1px solid ${tb.theme.neutralColors.stroke.colorNeutralStroke};
    border-radius: 4px;
    font-family: "SegoeUIVariable", SegoeUI, "Segoe UI", "Helvetica Neue", Helvetica, Arial Unicode MS, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${tb.theme.neutralColors.foreground.colorNeutralForeground} !important;
  }
`,IA=html`
  <template ?visible=${O=>O.vm.shouldShowExportPopupPanel} @click=${(O,B)=>O.handlePanelClick(B.event)}>
    <div class="header">
      <svg-icon type=${lE.ArrowLeft} size="24" @click=${(O,B)=>O.closePanel(B.event)}></svg-icon>
      <span class="header-title">${O=>O.vm.strings.threadsExportPanelTitle}</span>
    </div>
    <div class="content">
      <div class="content-line">
        <span class="icon-container">${O=>html`<span class="icon">${O.documentPdfIcon}</span>`}PDF</span>
        <button
          type="button"
          aria-label="${O=>O.vm.strings.threadsExportPanelAriaLabel}"
          @click=${(O,B)=>O.handleExportClick(B.event,up.Pdf)}
        >
          ${O=>O.vm.strings.threadsExportPanelAriaLabel}
        </button>
      </div>
      <div class="content-line">
        <span class="icon-container">${O=>html`<span class="icon">${O.documentWordIcon}</span>`}Word</span>
        <button
          type="button"
          aria-label="${O=>O.vm.strings.threadsExportPanelAriaLabel}"
          @click=${(O,B)=>O.handleExportClick(B.event,up.Docx)}
        >
          ${O=>O.vm.strings.threadsExportPanelAriaLabel}
        </button>
      </div>
      <div class="content-line">
        <span class="icon-container">${O=>html`<span class="icon">${O.documentTextIcon}</span>`}Text</span>
        <button
          type="button"
          aria-label="${O=>O.vm.strings.threadsExportPanelAriaLabel}"
          @click=${(O,B)=>O.handleExportClick(B.event,up.Txt)}
        >
          ${O=>O.vm.strings.threadsExportPanelAriaLabel}
        </button>
      </div>
    </div>
  </template>
`;let PA=class extends St{constructor(){super(...arguments),this.documentPdfIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n<path d="M5.25 22.5H18.75C19.1625 22.5 19.5 22.1625 19.5 21.75V7.5H17.25C16.0095 7.5 15 6.4905 15 5.25V1.5H5.25C4.8375 1.5 4.5 1.8375 4.5 2.25V21.75C4.5 22.1625 4.8375 22.5 5.25 22.5Z" fill="white"/>\n<path d="M19.5 5.99999V5.87099C19.5006 5.67233 19.4218 5.48167 19.281 5.34149L16.5 2.56049V5.24999C16.5 5.66249 16.8375 5.99999 17.25 5.99999H19.5Z" fill="white"/>\n<path opacity="0.64" fill-rule="evenodd" clip-rule="evenodd" d="M20.34 4.2795L16.719 0.66C16.2965 0.239308 15.7252 0.00215884 15.129 0H5.25C4.0095 0 3 1.0095 3 2.25V21.75C3 22.9905 4.0095 24 5.25 24H18.75C19.9905 24 21 22.9905 21 21.75V5.871C21 5.271 20.766 4.7055 20.34 4.281V4.2795ZM19.2795 5.3415C19.422 5.4825 19.5 5.6715 19.5 5.871V6H17.25C16.8361 5.99918 16.5008 5.66387 16.5 5.25V2.5605L19.281 5.3415H19.2795ZM5.25 22.5H18.75C19.1625 22.5 19.5 22.1625 19.5 21.75V7.5H17.25C16.0095 7.5 15 6.4905 15 5.25V1.5H5.25C4.8375 1.5 4.5 1.8375 4.5 2.25V21.75C4.50083 22.1639 4.83613 22.4992 5.25 22.5Z" fill="#808080"/>\n<path d="M17.25 12H6.75C6.33579 12 6 11.6642 6 11.25C6 10.8358 6.33579 10.5 6.75 10.5H17.25C17.6642 10.5 18 10.8358 18 11.25C18 11.6642 17.6642 12 17.25 12Z" fill="#C8C6C4"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 19.5V15C7.5 14.1716 8.17157 13.5 9 13.5H15C15.8284 13.5 16.5 14.1716 16.5 15V19.5C16.5 20.3284 15.8284 21 15 21H9C8.17157 21 7.5 20.3284 7.5 19.5ZM2.25 19.5H5.7C5.86569 19.5 6 19.3657 6 19.2V15.3C6 15.135 5.865 15 5.7 15H2.25C1.83579 15 1.5 15.3358 1.5 15.75V18.75C1.5 19.1642 1.83579 19.5 2.25 19.5ZM18.3 19.5H21.75C22.1642 19.5 22.5 19.1642 22.5 18.75V15.75C22.5 15.3358 22.1642 15 21.75 15H18.3C18.135 15 18 15.135 18 15.3V19.2C18 19.3657 18.1343 19.5 18.3 19.5ZM14.7 19.5H9.3C9.13431 19.5 9 19.3657 9 19.2V15.3C9 15.135 9.135 15 9.3 15H14.7C14.865 15 15 15.126 15 15.291V19.209C15 19.374 14.865 19.5 14.7 19.5Z" fill="#D65532"/>\n</svg>',this.documentWordIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n<path d="M8.25 22.5H21.75C22.1625 22.5 22.5 22.1625 22.5 21.75V7.5H20.25C19.0095 7.5 18 6.4905 18 5.25V1.5H8.25C7.8375 1.5 7.5 1.8375 7.5 2.25V21.75C7.5 22.1625 7.8375 22.5 8.25 22.5Z" fill="white"/>\n<path d="M22.5 5.99999V5.87099C22.5006 5.67233 22.4218 5.48167 22.281 5.34149L19.5 2.56049V5.24999C19.5 5.66249 19.8375 5.99999 20.25 5.99999H22.5Z" fill="white"/>\n<path opacity="0.64" fill-rule="evenodd" clip-rule="evenodd" d="M23.34 4.2795L19.719 0.66C19.2965 0.239308 18.7252 0.00215884 18.129 0H8.25C7.0095 0 6 1.0095 6 2.25V21.75C6 22.9905 7.0095 24 8.25 24H21.75C22.9905 24 24 22.9905 24 21.75V5.871C24 5.271 23.766 4.7055 23.34 4.281V4.2795ZM22.2795 5.3415C22.422 5.4825 22.5 5.6715 22.5 5.871V6H20.25C19.8361 5.99918 19.5008 5.66387 19.5 5.25V2.5605L22.281 5.3415H22.2795ZM8.25 22.5H21.75C22.1625 22.5 22.5 22.1625 22.5 21.75V7.5H20.25C19.0095 7.5 18 6.4905 18 5.25V1.5H8.25C7.8375 1.5 7.5 1.8375 7.5 2.25V21.75C7.50083 22.1639 7.83613 22.4992 8.25 22.5Z" fill="#605E5C"/>\n<path d="M20.25 15H15V16.5H20.25C20.6642 16.5 21 16.1642 21 15.75C21 15.3358 20.6642 15 20.25 15Z" fill="#185ABD"/>\n<path d="M20.25 12H15V13.5H20.25C20.6642 13.5 21 13.1642 21 12.75C21 12.3358 20.6642 12 20.25 12Z" fill="#2B7CD3"/>\n<path d="M20.25 9H15V10.5H20.25C20.6642 10.5 21 10.1642 21 9.75C21 9.33579 20.6642 9 20.25 9Z" fill="#41A5EE"/>\n<path d="M1.5 19.5H12C12.8284 19.5 13.5 18.8284 13.5 18V7.5C13.5 6.67157 12.8284 6 12 6H1.5C0.671573 6 0 6.67157 0 7.5V18C0 18.8284 0.671573 19.5 1.5 19.5Z" fill="#185ABD"/>\n<path d="M8.78082 16.458H7.91682L6.76932 10.8255L5.54082 16.485H4.82682L3.00732 9L4.10532 9.003L5.15232 13.965L6.22932 9H7.28832L8.50032 13.947L9.40932 9.0465L10.4698 9.054L8.78082 16.458Z" fill="white"/>\n</svg>',this.documentTextIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n<path d="M5.25 22.5H18.75C19.1625 22.5 19.5 22.1625 19.5 21.75V7.5H17.25C16.0095 7.5 15 6.4905 15 5.25V1.5H5.25C4.8375 1.5 4.5 1.8375 4.5 2.25V21.75C4.5 22.1625 4.8375 22.5 5.25 22.5Z" fill="white"/>\n<path d="M19.5 5.99999V5.87099C19.5006 5.67233 19.4218 5.48167 19.281 5.34149L16.5 2.56049V5.24999C16.5 5.66249 16.8375 5.99999 17.25 5.99999H19.5Z" fill="white"/>\n<path opacity="0.64" fill-rule="evenodd" clip-rule="evenodd" d="M20.34 4.2795L16.719 0.66C16.2965 0.239308 15.7252 0.00215884 15.129 0H5.25C4.0095 0 3 1.0095 3 2.25V21.75C3 22.9905 4.0095 24 5.25 24H18.75C19.9905 24 21 22.9905 21 21.75V5.871C21 5.271 20.766 4.7055 20.34 4.281V4.2795ZM19.2795 5.3415C19.422 5.4825 19.5 5.6715 19.5 5.871V6H17.25C16.8361 5.99918 16.5008 5.66387 16.5 5.25V2.5605L19.281 5.3415H19.2795ZM5.25 22.5H18.75C19.1625 22.5 19.5 22.1625 19.5 21.75V7.5H17.25C16.0095 7.5 15 6.4905 15 5.25V1.5H5.25C4.8375 1.5 4.5 1.8375 4.5 2.25V21.75C4.50083 22.1639 4.83613 22.4992 5.25 22.5Z" fill="#808080"/>\n<path d="M17.25 19.5H6.75C6.33579 19.5 6 19.1642 6 18.75C6 18.3358 6.33579 18 6.75 18H17.25C17.6642 18 18 18.3358 18 18.75C18 19.1642 17.6642 19.5 17.25 19.5Z" fill="#C8C6C4"/>\n<path d="M15.3028 14.7764C15.1793 15.0234 15.2794 15.3237 15.5264 15.4472C15.7734 15.5707 16.0737 15.4706 16.1972 15.2236L15.3028 14.7764ZM17.25 12L17.6972 12.2236L17.809 12L17.6972 11.7764L17.25 12ZM16.1972 8.77639C16.0737 8.5294 15.7734 8.42929 15.5264 8.55279C15.2794 8.67628 15.1793 8.97662 15.3028 9.22361L16.1972 8.77639ZM8.69721 9.22361C8.82071 8.97662 8.7206 8.67628 8.47361 8.55279C8.22662 8.42929 7.92628 8.5294 7.80279 8.77639L8.69721 9.22361ZM6.75 12L6.30279 11.7764L6.19098 12L6.30279 12.2236L6.75 12ZM7.80279 15.2236C7.92628 15.4706 8.22662 15.5707 8.47361 15.4472C8.7206 15.3237 8.82071 15.0234 8.69721 14.7764L7.80279 15.2236ZM13.9743 7.65811C14.0617 7.39614 13.9201 7.11298 13.6581 7.02566C13.3961 6.93833 13.113 7.07991 13.0257 7.34189L13.9743 7.65811ZM10.0257 16.3419C9.93833 16.6039 10.0799 16.887 10.3419 16.9743C10.6039 17.0617 10.887 16.9201 10.9743 16.6581L10.0257 16.3419ZM16.1972 15.2236L17.6972 12.2236L16.8028 11.7764L15.3028 14.7764L16.1972 15.2236ZM17.6972 11.7764L16.1972 8.77639L15.3028 9.22361L16.8028 12.2236L17.6972 11.7764ZM7.80279 8.77639L6.30279 11.7764L7.19721 12.2236L8.69721 9.22361L7.80279 8.77639ZM6.30279 12.2236L7.80279 15.2236L8.69721 14.7764L7.19721 11.7764L6.30279 12.2236ZM13.0257 7.34189L10.0257 16.3419L10.9743 16.6581L13.9743 7.65811L13.0257 7.34189Z" fill="#69AFE5"/>\n</svg>'}closePanel(O){this.vm.toggleExportPopupPanel(),O.preventDefault(),O.stopPropagation()}handlePanelClick(O){O.preventDefault(),O.stopPropagation()}handleExportClick(O,B){var U,G,q;null===(q=null===(G=null===(U=this.vm.sidePanelVm)||void 0===U?void 0:U.activeThread)||void 0===G?void 0:G.contextMenuVm)||void 0===q||q.handleExport(O,B)}};__decorate([observable,__metadata("design:type",String)],PA.prototype,"documentPdfIcon",void 0),__decorate([observable,__metadata("design:type",String)],PA.prototype,"documentWordIcon",void 0),__decorate([observable,__metadata("design:type",String)],PA.prototype,"documentTextIcon",void 0),PA=__decorate([customElement({name:"cib-export-popup-panel",template:IA,styles:RA})],PA);const NA=html`
  <svg-icon type=${lE.History} size="24"></svg-icon>
`,OA=html`
  <svg-icon type=${lE.Close} size="24"></svg-icon>
`,MA=html`
  <svg-icon type=${lE.ChevronLeftMed} size="24"></svg-icon>
`,DA=html`
  <button
    class="icon-button threads"
    type="button"
    aria-label=${O=>O.vm.strings.threadsChatHistory}
    @click=${O=>O.vm.toggleSidePanelVisibility()}
  >
    ${when((O=>O.vm.shouldShowPanel&&O.layout.productType!==Mb.Shoreline),OA)}
    ${when((O=>O.vm.shouldShowPanel&&O.layout.productType===Mb.Shoreline),MA)}
    ${when((O=>!O.vm.shouldShowPanel),NA)}
  </button>
`,LA=html`
  <button
    class="icon-button threads"
    type="button"
    aria-label=${O=>O.vm.strings.threadsChatHistory}
    @click=${(O,B)=>O.handleShareButtonClickAsync(B.event)}
    ${ref("shareButton")}
  >
    <svg-icon type=${lE.Share} size="24"></svg-icon>
  </button>
`,BA=html`
  <input
    type="text"
    ${ref("drawerName")}
    class="active-title"
    value=${O=>O.vm.drawerTitle}
    @keydown=${(O,B)=>O.handleEditKeyDown(B.event)}
    @focusout=${(O,B)=>O.handleEditFocusOutAsync(B.event)}
  />
`,FA=html`
  <h2 class="active-title">${O=>O.vm.drawerTitle}</h2>
`,zA=html`
  ${O=>!0==(!!O.vm.isEditing&&O.layout.productType!==Mb.Shoreline)?BA:FA}
`,$A=html`
  <button
    class="share-panel-button"
    type="button"
    aria-label=${O=>O.vm.strings.shareConversation}
    @click=${(O,B)=>O.handleShareButtonClickAsync(B.event)}
    ?disabled=${O=>{var B;return!(null===(B=O.vm.sidePanelVm)||void 0===B?void 0:B.activeThread)}}
    ${ref("shareButton")}
  >
    <svg-icon type=${lE.Share} size="24"></svg-icon>
    <span>${O=>O.vm.strings.feedbackShareButtonAriaLabel}</span>
  </button>
`,UA=html`
  <button
    class="feedback-panel-button"
    type="button"
    aria-label=${O=>O.vm.strings.sendFeedback}
    @click=${(O,B)=>O.handleSendFeedbackButtonClick(B.event)}
  >
    <svg-icon type=${lE.Feedback} size="24"></svg-icon>
    <span>${O=>O.vm.strings.sendFeedback}</span>
  </button>
`,VA=html`
  <button
    class="export-panel-button"
    type="button"
    aria-label=${O=>O.vm.strings.feedbackExportButtonAriaLabel}
    @click=${(O,B)=>O.handleExportButtonClick(B.event)}
    ?disabled=${O=>{var B;return!(null===(B=O.vm.sidePanelVm)||void 0===B?void 0:B.activeThread)}}
  >
    <svg-icon type=${lE.ArrowDownload} size="24"></svg-icon>
    <span>${O=>O.vm.strings.feedbackExportButtonAriaLabel}</span>
    <cib-export-popup-panel :vm=${O=>O.vm}></cib-export-popup-panel>
  </button>
`,GA=html`
  <div class="more-menu">
    ${when((O=>O.vm.enableHistory),html`<button
        class="rename-button"
        type="button"
        aria-label=${O=>O.vm.strings.threadsEdit}
        @click=${(O,B)=>O.handleEditClick(B.event)}
      >
        <svg-icon type=${lE.Edit} size="24"></svg-icon>
        <span>${O=>O.vm.strings.threadsEdit}</span>
      </button>`)}
    ${when((O=>O.vm.isContextMenuEnabled||O.vm.enableShareConversation),$A)}
    ${when((O=>O.vm.enableSendFeedback),UA)}
    ${when((O=>O.vm.isExportSidePanelEnabled),VA)}
    ${when((O=>O.vm.enableHistory),html`<button
        class="delete-button"
        type="button"
        aria-label=${O=>O.vm.strings.threadsDelete}
        @click=${(O,B)=>O.handleDeleteClickAsync(B.event)}
      >
        <svg-icon type=${lE.Delete} size="24"></svg-icon>
        <span>${O=>O.vm.strings.threadsDelete}</span>
      </button>`)}
  </div>
`,HA=html`
  <button
    class="icon-button more"
    type="button"
    @click=${(O,B)=>O.toggleShowMore(B.event)}
    ?active=${O=>O.vm.shouldShowMoreMenu}
    aria-label=${O=>O.vm.strings.more}
    ${ref("moreButton")}
  >
    <svg-icon type=${lE.More} size="30"></svg-icon>
  </button>
  ${when((O=>O.vm.shouldShowMoreMenu),GA)}
`,qA=html` <cib-history-conversation
  :layout=${O=>O.layout}
  :vm=${O=>{var B;return null===(B=O.vm.sidePanelVm)||void 0===B?void 0:B.historyConversationVm}}
  ${ref("historyScreenshot")}
>
</cib-history-conversation>`,jA=html`
  <template
    mode=${O=>O.vm.serp.mode}
    product=${O=>O.layout.productType}
    ?side-panel=${O=>O.vm.shouldShowPanel}
  >
    ${when((O=>O.vm.enableHistory),html` ${DA} ${zA} `)}
    ${when((O=>!O.vm.shouldShowPanel&&O.layout.productType!==Mb.Shoreline),HA)}
    ${when((O=>!O.vm.shouldShowPanel&&O.layout.productType===Mb.Shoreline),LA)}
    ${when((O=>O.layout.isMobile||O.layout.productType===Mb.Shoreline),qA)}
  </template>
`;let WA=class extends St{constructor(){super(),this.isExportPopupPanelShown=!1,this.handleChatAreaClick=O=>{O&&!O.composedPath().includes(this)&&this.vm.shouldShowMoreMenu&&this.vm.toggleShowMore()},this.disposer=new Disposer}connectedCallback(){super.connectedCallback(),this.disposer.register(addDisposableListener(document,"click",this.handleChatAreaClick))}disconnectedCallback(){super.disconnectedCallback(),this.disposer.isDisposed||this.disposer.dispose()}toggleShowMore(O){var B;this.vm.toggleShowMore(),this.vm.shouldShowMoreMenu&&this.vm.config.features.enableFeedbackInstrumentation&&this.shareButton&&this.vm.telemetry.trackEvent("Show","CibHeaderBarShow",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)})}async handleShareButtonClickAsync(O){var B;O.preventDefault(),O.stopPropagation(),this.vm.config.features.enableFeedbackInstrumentation&&this.vm.telemetry.trackEvent("Click","CibHeaderBarHandleShareClick",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)}),await this.vm.shareConversationAsync(this.historyScreenshot,this.shareButton,this.layout.serpSlot,this.layout.hoverVm)}handleSendFeedbackButtonClick(O){this.vm.sendFeedback(),O.preventDefault(),O.stopPropagation()}handleExportButtonClick(O){var B;this.vm.toggleExportPopupPanel(),O.preventDefault(),O.stopPropagation(),this.vm.config.features.enableFeedbackInstrumentation&&this.vm.telemetry.trackEvent("Click","CibHeaderBarHandleExportClick",{Namespace:jy.toTelemetryNamespace(null===(B=this.layout)||void 0===B?void 0:B.serpSlot)})}handleEditClick(O){this.vm.beginEdit(),setTimeout((()=>{this.drawerName&&(this.drawerName.focus(),this.drawerName.setSelectionRange(0,this.drawerName.value.length))}),100),O.preventDefault(),O.stopPropagation()}async handleDeleteClickAsync(O){await this.vm.deleteConversationAsync(),O.preventDefault(),O.stopPropagation()}async handleConfirmEditAsync(O){this.drawerName&&(this.setCaretFront(),await this.vm.confirmEditAsync(this.drawerName.value)),O.preventDefault(),O.stopPropagation()}handleCancelEdit(O){this.drawerName&&(this.setCaretFront(),this.vm.cancelEdit()),O.preventDefault(),O.stopPropagation()}handleEditKeyDown(O){if(this.drawerName&&this.vm.isEditing){if("Enter"===O.key)return this.setCaretFront(),this.vm.confirmEditAsync(this.drawerName.value),this.moreButton&&this.moreButton.focus(),!1;if("Escape"===O.key)return this.setCaretFront(),this.vm.cancelEdit(),!1}return!0}async handleEditFocusOutAsync(O){this.drawerName&&this.vm.isEditing&&(this.setCaretFront(),await this.vm.confirmEditAsync(this.drawerName.value))}setCaretFront(){this.drawerName&&this.drawerName.scrollBy(0-this.drawerName.scrollLeft,0)}};__decorate([observable,__metadata("design:type",Object)],WA.prototype,"layout",void 0),__decorate([observable,__metadata("design:type",Boolean)],WA.prototype,"isExportPopupPanelShown",void 0),__decorate([observable,__metadata("design:type",HTMLDivElement)],WA.prototype,"historyScreenshot",void 0),__decorate([observable,__metadata("design:type",HTMLButtonElement)],WA.prototype,"shareButton",void 0),__decorate([observable,__metadata("design:type",HTMLButtonElement)],WA.prototype,"moreButton",void 0),WA=__decorate([customElement({name:"cib-header-bar",template:jA,styles:AA}),__metadata("design:paramtypes",[])],WA);const YA=html`
  <cib-chat-turn :layout=${O=>O.layout}>
    <cib-message-group source="bot" :layout=${O=>O.layout}>
      <cib-message class="slotted-message" type="text" source="bot" serp-slot="none" :layout=${O=>O.layout}>
        <slot name="first-turn-bot-message"></slot>
      </cib-message>
    </cib-message-group>
  </cib-chat-turn>
`,KA=html`
  <cib-serp-feedback :vm=${O=>O.vm.serpFeedback}></cib-serp-feedback>
`,QA=html`
  <cib-side-panel slot="side-panel" :layout=${O=>O.layout} :vm=${O=>O.vm.sidePanel}></cib-side-panel>
`,ZA=html`
  <cib-side-panel :layout=${O=>O.layout} :vm=${O=>O.vm.sidePanel}></cib-side-panel>
`,XA=html`
  <cib-see-more-container :vm=${O=>O.vm.seeMoreContainer} :layout=${O=>O.layout}>
    <cib-slim-header :vm=${O=>O.vm.slimHeader} :layout=${O=>O.layout}>
      <cib-typing-indicator :vm=${O=>O.vm.typingIndicator} :layout=${O=>O.layout}></cib-typing-indicator>
    </cib-slim-header>
    <cib-conversation :layout=${O=>O.layout} :vm=${O=>O.vm.conversation}></cib-conversation>
  </cib-see-more-container>
`,JA=html`
  <cib-slim-header :vm=${O=>O.vm.slimHeader} :layout=${O=>O.layout}></cib-slim-header>
  <cib-typing-indicator :vm=${O=>O.vm.typingIndicator} :layout=${O=>O.layout}></cib-typing-indicator>
  <cib-conversation :layout=${O=>O.layout} :vm=${O=>O.vm.conversation}></cib-conversation>
`,eR=html`
  <cib-background :vm=${O=>O.vm.background}></cib-background>
  ${when((O=>O.vm.inMode(Hy.Conversation)&&O.vm.captcha.isVisible),html` <cib-captcha :layout=${O=>O.layout} :vm=${O=>O.vm.captcha}></cib-captcha> `)}
  ${when((O=>O.vm.enableThreads&&O.layout.productType===Mb.Shoreline),html`<cib-header-bar :layout=${O=>O.layout} :vm=${O=>O.vm.headerBar}></cib-header-bar>`)}
  <cib-conversation :layout=${O=>O.layout} :vm=${O=>O.vm.conversation}>
    ${when((O=>{var B,U;return(null!==(U=null===(B=O.firstTurnBotMessageNodes)||void 0===B?void 0:B.length)&&void 0!==U?U:0)>0}),YA)}
    ${when((O=>O.vm.sidePanel.isVisible),QA)}
  </cib-conversation>
  <cib-action-bar autofocus :layout=${O=>O.layout} :vm=${O=>O.vm.actionBar}></cib-action-bar>
  ${when((O=>O.layout.productType!==Mb.Shoreline),KA)}
`,tR=html`
  ${when((O=>O.vm.inMode(Hy.Conversation)&&O.vm.captcha.isVisible),html` <cib-captcha :layout=${O=>O.layout} :vm=${O=>O.vm.captcha}></cib-captcha> `)}
  <cib-conversation :layout=${O=>O.layout} :vm=${O=>O.vm.conversation}></cib-conversation>
  <cib-action-bar autofocus :layout=${O=>O.layout} :vm=${O=>O.vm.actionBar}></cib-action-bar>
`,iR=html`
  <div class="mobile-background" @click=${O=>O.handleBackgroundClick()}></div>
  <cib-drawer :layout=${O=>O.layout} :vm=${O=>O.vm.drawer}>
    ${O=>!0==!!O.vm.sidePanel.isVisible?ZA:tR}
  </cib-drawer>
`,rR=html`
  <div class="mobile-background-fullscreen"></div>
  <cib-conversation :layout=${O=>O.layout} :vm=${O=>O.vm.conversation}></cib-conversation>
  <cib-action-bar autofocus :layout=${O=>O.layout} :vm=${O=>O.vm.actionBar}></cib-action-bar>
`,nR=html`<cib-modal
  :layout=${O=>O.layout}
  :vm=${O=>O.vm.modal}
></cib-modal>`,oR=html`
  <template
    class="cib-serp-main"
    alignment=${O=>O.alignment}
    mode=${O=>O.vm.mode}
    ?dev=${O=>O.vm.isDevMode}
    ?shared=${O=>O.vm.isSharedConversation}
    ?side-panel=${O=>O.vm.sidePanel.isVisible}
    @click=${O=>O.handleClick()}
    ${children({property:"firstTurnBotMessageNodes",filter:node_observation_elements("[slot='first-turn-bot-message']")})}
  >
    ${when((O=>O.layout.isMobile&&!O.vm.enableFullScreenMobile),iR)}
    ${when((O=>O.layout.isMobile&&O.vm.enableFullScreenMobile),rR)}
    ${when((O=>!O.layout.isMobile&&(O.serpSlot===jy.Pole||O.serpSlot===jy.RightRail)),XA)}
    ${when((O=>!O.layout.isMobile&&O.serpSlot===jy.Creator),JA)}
    ${when((O=>!O.layout.isMobile&&O.serpSlot===jy.None),eR)}
    <cib-hover-card :layout=${O=>O.layout} :vm=${O=>O.vm.hoverCard}></cib-hover-card>
    <cib-hover :layout=${O=>O.layout} :vm=${O=>O.hoverVm}></cib-hover>
    ${when((O=>O.mode===Hy.Conversation&&O.serpSlot===jy.None),nR)}
  </template>