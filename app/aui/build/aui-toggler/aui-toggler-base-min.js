AUI.add("aui-toggler-base",function(p){var ad=p.Lang,K=ad.isBoolean,Q=ad.isObject,u=ad.isUndefined,m=ad.toInt,C="-",x=".",O="",G="px",a=" ",H="animated",T="animating",D="bindDOMEvents",U="click",q="collapsed",R="content",V="cubic-bezier",F="down",b="enter",j="esc",c="expanded",k="expandedChange",i="getBoundingClientRect",S="gutter",M="header",W="helper",ac="keydown",y="left",h="linear",n="marginTop",l="minus",r="num_minus",z="num_plus",o="parentNode",w="plus",X="right",a="space",B="toggler",Z="transition",g="transitionEnd",e="transitionStart",v="up",aa="wrapper",f=p.getClassName,t=f(B,R),ab=f(B,R,q),N=f(B,R,c),s=f(B,R,aa),d=f(B,M),J=f(B,M,q),I=f(B,M,c),L={"false":ab,"true":N},E={"false":J,"true":I},P='<div class="'+s+'"></div>';var Y=p.Component.create({NAME:B,ATTRS:{animated:{validator:K,value:false,writeOnce:true},animating:{validator:K,value:false},bindDOMEvents:{validator:K,value:true,writeOnce:true},content:{setter:p.one},expanded:{validator:K,value:true},header:{setter:p.one},transition:{validator:Q,value:{duration:0.4,easing:V}}},EXTENDS:p.Base,headerEventHandler:function(ae,A){if(ae.type===U||ae.isKey(b)||ae.isKey(a)){ae.preventDefault();return A.toggle();}else{if(ae.isKey(F)||ae.isKey(X)||ae.isKey(z)){ae.preventDefault();return A.expand();}else{if(ae.isKey(v)||ae.isKey(y)||ae.isKey(j)||ae.isKey(r)){ae.preventDefault();return A.collapse();}}}},prototype:{initializer:function(){var A=this;A.bindUI();A.syncUI();A._uiSetExpanded(A.get(c));},bindUI:function(){var A=this;var ae=A.get(M);ae.setData(B,A);A.on(k,p.bind(A._onExpandedChange,A));if(A.get(D)){ae.on([U,ac],p.rbind(Y.headerEventHandler,null,A));}},syncUI:function(){var A=this;A.get(R).addClass(t);A.get(M).addClass(d);},animate:function(ae,af){var A=this;A._uiSetExpanded(true);var ag=p.merge(ae,A.get(Z));A.get(R).transition(ag,p.bind(af,A));},collapse:function(){var A=this;return A.toggle(false);},expand:function(){var A=this;return A.toggle(true);},getContentHeight:function(){var ae=this;var ah=ae.get(R);var ag=ae.get(c),A;if(!ag){ae._uiSetExpanded(true);}if(ah.hasMethod(i)){var af=ah.invoke(i);if(af){A=af.bottom-af.top;}}else{A=ah.get(OFFSET_HEIGHT);}if(!ag){ae._uiSetExpanded(false);}return A;},toggle:function(af){var ae=this;if(u(af)){af=!ae.get(c);}if(ae.get(H)){if(ae.get(T)){return af;}var ag=ae.get(R);var A=ae.getContentHeight();var ah=m(ag.getStyle(n));if(!ae.wrapped){ag.wrap(P);if(af){ah=-(A+ah);ag.setStyle(n,ah);}ae.wrapped=true;}ae.set(T,true);ae.animate({marginTop:-(A+ah)+G},function(){ae.set(T,false);ae.set(c,af);});}else{ae.set(c,af);}return af;},_onExpandedChange:function(ae){var A=this;A._uiSetExpanded(ae.newVal);},_uiSetExpanded:function(ae){var A=this;A.get(R).replaceClass(L[!ae],L[ae]);A.get(M).replaceClass(E[!ae],E[ae]);}}});p.Toggler=Y;},"1.7.0pr2",{skinnable:true,requires:["aui-base","transition"]});