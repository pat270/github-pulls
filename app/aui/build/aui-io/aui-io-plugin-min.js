AUI.add("aui-io-plugin",function(s){var n=s.Lang,o=n.isBoolean,p=n.isString,t=function(A){return(A instanceof s.Node);},u=s.WidgetStdMod,c="Node",l="Widget",E="",d="failure",g="failureMessage",w="host",h="icon",i="io",e="IOPlugin",v="loading",f="loadingMask",D="node",r="outer",z="parseContent",k="queue",b="rendered",m="section",C="showLoading",y="success",q="type",a="where",x=s.getClassName,j=x(h,v);var B=s.Component.create({NAME:e,NS:i,ATTRS:{node:{value:null,getter:function(H){var A=this;if(!H){var G=A.get(w);var F=A.get(q);if(F==c){H=G;}else{if(F==l){var I=A.get(m);if(!G.getStdModNode(I)){G.setStdModContent(I,E);}H=G.getStdModNode(I);}}}return s.one(H);},validator:t},failureMessage:{value:"Failed to retrieve content",validator:p},loadingMask:{value:{}},parseContent:{value:true,validator:o},showLoading:{value:true,validator:o},section:{value:u.BODY,validator:function(A){return(!A||A==u.BODY||A==u.HEADER||A==u.FOOTER);}},type:{readOnly:true,valueFn:function(){var A=this;var F=c;if(A.get(w) instanceof s.Widget){F=l;}return F;},validator:p},where:{value:u.REPLACE,validator:function(A){return(!A||A==u.AFTER||A==u.BEFORE||A==u.REPLACE||A==r);}}},EXTENDS:s.IORequest,prototype:{bindUI:function(){var A=this;A.on("activeChange",A._onActiveChange);A.on(y,A._successHandler);A.on(d,A._failureHandler);if((A.get(q)==l)&&A.get(C)){var F=A.get(w);F.after("heightChange",A._syncLoadingMaskUI,A);F.after("widthChange",A._syncLoadingMaskUI,A);}},_autoStart:function(){var A=this;A.bindUI();B.superclass._autoStart.apply(this,arguments);},_bindParseContent:function(){var A=this;var F=A.get(D);if(F&&!F.ParseContent&&A.get(z)){F.plug(s.Plugin.ParseContent);}},hideLoading:function(){var A=this;var F=A.get(D);if(F.loadingmask){F.loadingmask.hide();}},setContent:function(F){var A=this;A._bindParseContent();A._getContentSetterByType().apply(A,[F]);if(A.overlayMaskBoundingBox){A.overlayMaskBoundingBox.remove();}},showLoading:function(){var A=this;var F=A.get(D);if(F.loadingmask){if(A.overlayMaskBoundingBox){F.append(A.overlayMaskBoundingBox);}}else{F.plug(s.LoadingMask,A.get(f));A.overlayMaskBoundingBox=F.loadingmask.overlayMask.get("boundingBox");}F.loadingmask.show();},start:function(){var A=this;var F=A.get(w);if(!F.get(b)){F.after("render",function(){A._setLoadingUI(true);});}B.superclass.start.apply(A,arguments);},_getContentSetterByType:function(){var A=this;var F={Node:function(J){var G=this;var I=G.get(D);if(J instanceof s.NodeList){J=J.toFrag();}if(J instanceof s.Node){J=J._node;}var H=G.get(a);if(H==r){I.replace(J);}else{I.insert(J,H);}},Widget:function(I){var G=this;var H=G.get(w);H.setStdModContent.apply(H,[G.get(m),I,G.get(a)]);}};return F[this.get(q)];},_setLoadingUI:function(F){var A=this;if(A.get(C)){if(F){A.showLoading();}else{A.hideLoading();}}},_syncLoadingMaskUI:function(){var A=this;A.get(D).loadingmask.refreshMask();},_successHandler:function(F,H,G){var A=this;A.setContent(this.get("responseData"));},_failureHandler:function(F,H,G){var A=this;A.setContent(A.get(g));},_onActiveChange:function(G){var A=this;var F=A.get(w);var H=A.get(q)==l;if(!H||(H&&F&&F.get(b))){A._setLoadingUI(G.newVal);}}}});s.Node.prototype.load=function(J,I,K){var F=this;var H=J.indexOf(" ");var A;if(H>0){A=J.slice(H,J.length);J=J.slice(0,H);}if(n.isFunction(I)){K=I;I=null;}I=I||{};if(K){I.after=I.after||{};I.after.success=K;}var G=I.where;I.uri=J;I.where=G;if(A){I.selector=A;I.where=G||"replace";}F.plug(s.Plugin.IO,I);return F;};s.namespace("Plugin").IO=B;},"1.7.0pr2",{requires:["aui-overlay-base","aui-parse-content","aui-io-request","aui-loading-mask"]});