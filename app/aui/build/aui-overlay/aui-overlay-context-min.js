AUI.add("aui-overlay-context",function(o){var g=o.Lang,m=g.isString,n=g.isNumber,j=g.isObject,i=g.isBoolean,q=function(A){return(A instanceof o.NodeList);},f="align",w="bl",x="boundingBox",a="cancellableHide",p="overlaycontext",y="currentNode",k="focused",v="hide",c="hideDelay",r="hideOn",t="hideOnDocumentClick",h="mousedown",d="show",B="showDelay",u="showOn",z="tl",b="trigger",l="useARIA",s="visible";var e=o.Component.create({NAME:p,ATTRS:{align:{value:{node:null,points:[z,w]}},cancellableHide:{value:true,validator:i},currentNode:{valueFn:function(){return this.get(b).item(0);}},delay:{value:null,validator:j},hideOn:{lazyAdd:false,value:"mouseout",setter:function(A){return this._setHideOn(A);}},hideOnDocumentClick:{lazyAdd:false,setter:function(A){return this._setHideOnDocumentClick(A);},value:true,validator:i},hideDelay:{lazyAdd:false,setter:"_setHideDelay",value:0,validator:n},showOn:{lazyAdd:false,value:"mouseover",setter:function(A){return this._setShowOn(A);}},showDelay:{lazyAdd:false,setter:"_setShowDelay",value:0,validator:n},trigger:{lazyAdd:false,setter:function(A){if(q(A)){return A;}else{if(m(A)){return o.all(A);}}return new o.NodeList([A]);}},useARIA:{value:true},visible:{value:false}},EXTENDS:o.OverlayBase,constructor:function(C){var A=this;A._showCallback=null;A._hideCallback=null;e.superclass.constructor.apply(this,arguments);},prototype:{initializer:function(){var A=this;var C=A.get(b);if(C&&C.size()){A.set("align.node",C.item(0));}},bindUI:function(){var A=this;var C=A.get(x);C.on(h,A._stopTriggerEventPropagation);A.before("triggerChange",A._beforeTriggerChange);A.before("showOnChange",A._beforeShowOnChange);A.before("hideOnChange",A._beforeHideOnChange);A.after("triggerChange",A._afterTriggerChange);A.after("showOnChange",A._afterShowOnChange);A.after("hideOnChange",A._afterHideOnChange);C.on("click",o.bind(A._cancelAutoHide,A));C.on("mouseenter",o.bind(A._cancelAutoHide,A));C.on("mouseleave",o.bind(A._invokeHideTaskOnInteraction,A));A.after("focusedChange",o.bind(A._invokeHideTaskOnInteraction,A));A.on("visibleChange",A._onVisibleChangeOverlayContext);},hide:function(){var A=this;A.clearIntervals();A.fire("hide");e.superclass.hide.apply(A,arguments);},show:function(C){var A=this;A.clearIntervals();A.updateCurrentNode(C);A.fire("show");e.superclass.show.apply(A,arguments);A.refreshAlign();},syncUI:function(){var A=this;if(A.get(l)){A.plug(o.Plugin.Aria,{attributes:{trigger:{ariaName:"controls",format:function(C){var D=A.get(x).generateID();return D;},node:function(){return A.get(b);}},visible:{ariaName:"hidden",format:function(C){return !C;}}},roleName:"dialog"});}},toggle:function(C){var A=this;if(A.get(s)){A._hideTask(C);}else{A._showTask(C);}},clearIntervals:function(){this._hideTask.cancel();this._showTask.cancel();},refreshAlign:function(){var A=this;var D=A.get(f);var C=A.get(y);if(C){A._uiSetAlign(C,D.points);}},updateCurrentNode:function(E){var A=this;var G=A.get(f);var C=A.get(b);var F=null;if(E){F=E.currentTarget;}var D=F||C.item(0)||G.node;if(D){A.set(y,D);}},_toggle:function(C){var A=this;var D=C.currentTarget;if(A._lastTarget!=D){A.hide();}A.toggle(C);C.stopPropagation();A._lastTarget=D;},_afterShowOnChange:function(D){var A=this;var E=D.prevVal==A.get(r);if(E){var C=A.get(b);C.detach(D.prevVal,A._hideCallback);A._setHideOn(A.get(r));}},_afterHideOnChange:function(D){var A=this;var E=D.prevVal==A.get(u);if(E){var C=A.get(b);C.detach(D.prevVal,A._showCallback);A._setShowOn(A.get(u));}},_afterTriggerChange:function(C){var A=this;A._setShowOn(A.get(u));A._setHideOn(A.get(r));},_beforeShowOnChange:function(D){var A=this;var C=A.get(b);C.detach(D.prevVal,A._showCallback);},_beforeHideOnChange:function(D){var A=this;var C=A.get(b);C.detach(D.prevVal,A._hideCallback);},_beforeTriggerChange:function(F){var A=this;var E=A.get(b);var C=A.get(u);var D=A.get(r);E.detach(C,A._showCallback);E.detach(D,A._hideCallback);E.detach(h,A._stopTriggerEventPropagation);},_cancelAutoHide:function(C){var A=this;if(A.get(a)){A.clearIntervals();}C.stopPropagation();},_invokeHideTaskOnInteraction:function(D){var C=this;var A=C.get(a);var E=C.get(k);if(!E&&!A){C._hideTask();}},_onVisibleChangeOverlayContext:function(C){var A=this;if(C.newVal&&A.get("disabled")){C.preventDefault();}},_stopTriggerEventPropagation:function(A){A.stopPropagation();},_setHideDelay:function(C){var A=this;A._hideTask=o.debounce(A.hide,C,A);return C;},_setHideOn:function(F){var C=this;var E=C.get(b);var A=F==C.get(u);if(A){C._hideCallback=o.bind(C._toggle,C);E.detach(F,C._showCallback);}else{var D=C.get(c);C._hideCallback=function(G){C._hideTask(G);G.stopPropagation();};}E.on(F,C._hideCallback);return F;},_setHideOnDocumentClick:function(C){var A=this;if(C){o.OverlayContextManager.register(A);}else{o.OverlayContextManager.remove(A);}return C;},_setShowDelay:function(C){var A=this;A._showTask=o.debounce(A.show,C,A);return C;},_setShowOn:function(F){var C=this;var E=C.get(b);var A=F==C.get(r);if(A){C._showCallback=o.bind(C._toggle,C);E.detach(F,C._hideCallback);}else{var D=C.get(B);C._showCallback=function(G){C._showTask(G);G.stopPropagation();};}if(F!=h){E.on(h,C._stopTriggerEventPropagation);}else{E.detach(h,C._stopTriggerEventPropagation);}E.on(F,C._showCallback);return F;}}});o.OverlayContext=e;o.OverlayContextManager=new o.OverlayManager({});o.on(h,function(){o.OverlayContextManager.hideAll();},o.getDoc());},"1.7.0pr2",{requires:["aui-overlay-manager","aui-delayed-task","aui-aria"]});