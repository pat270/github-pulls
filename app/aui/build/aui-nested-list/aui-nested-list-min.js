AUI.add("aui-nested-list",function(u){var n=u.Lang,q=n.isString,a=n.isFunction,G="block",B="body",x="dd",C="display",z="down",t="dragNode",F="dropCondition",b="dropContainer",H="dropOn",s="float",v="height",g="helper",D="hidden",r="left",E="nested-list",I="node",j="nodes",o="none",f="offsetHeight",e="placeholder",k="proxy",m="px",p="right",d="sortCondition",i="up",l="visibility",y="visible",h=u.DD.DDM,w=function(A){return(A instanceof u.NodeList);};var c=u.Component.create({NAME:E,ATTRS:{dd:{value:null},dropCondition:{value:function(){return true;},setter:function(A){return u.bind(A,this);},validator:a},dropContainer:{value:function(M){var A=this;var J=M.drop;var K=J.get(I);var L=A.get(H);return K.one(L);},validator:a},dropOn:{validator:q},helper:{value:null},nodes:{setter:function(A){return this._setNodes(A);}},placeholder:{value:null},proxy:{value:null,setter:function(A){return u.merge({moveOnEnd:false,positionProxy:false},A||{});}},sortCondition:{value:function(){return true;},setter:function(A){return u.bind(A,this);},validator:a}},EXTENDS:u.Base,prototype:{initializer:function(){var A=this;var J=A.get(j);A.on("drag:align",A._onDragAlign);A.on("drag:end",A._onDragEnd);A.on("drag:exit",A._onDragExit);A.on("drag:mouseDown",A._onDragMouseDown);A.on("drag:over",A._onDragOver);A.on("drag:start",A._onDragStart);A._createHelper();if(J){A.addAll(J);}},add:function(J){var A=this;A._createDrag(J);},addAll:function(J){var A=this;J.each(function(K){A.add(K);});},_createDrag:function(N){var J=this;var M=J.get(g);if(!h.getDrag(N)){var L={bubbleTargets:J,node:N,target:true};var K=J.get(k);if(M){K.borderStyle=null;}var A=new u.DD.Drag(u.mix(L,J.get(x))).plug(u.Plugin.DDProxy,K);}},_createHelper:function(){var A=this;var J=A.get(g);if(J){u.one(B).append(J.hide());A.set(g,J);}},_updatePlaceholder:function(J,W){var U=this;var O=J.target;var K=J.drop;var M=O.get(I);var S=K.get(I);var V=U.get(H);var N=U.get(b);if(N){var A=N.apply(U,arguments);}var Q=false;var L=U.XDirection;var R=U.YDirection;if(S.getStyle(s)!=o){Q=true;}var T=U.get(e);if(!T){T=M;}if(!T.contains(S)){var P=U.get(F);if(A&&!W&&P(J)){if(!A.contains(T)&&!T.contains(A)){A.append(T);}}else{if(Q&&(L==r)||!Q&&(R==i)){S.placeBefore(T);}else{S.placeAfter(T);}}}},_onDragAlign:function(L){var J=this;var M=J.lastX;var K=J.lastY;var N=L.target.lastXY;var A=N[0];var O=N[1];if(O!=K){J.YDirection=(O<K)?i:z;}if(A!=M){J.XDirection=(A<M)?r:p;}J.lastX=A;J.lastY=O;},_onDragEnd:function(K){var A=this;var J=K.target;var L=J.get(I);var M=A.get(e);if(M){L.show();M.hide();if(!L.contains(M)){M.placeAfter(L);}}},_onDragExit:function(J){var A=this;var K=A.get(d);if(K(J)){A._updatePlaceholder(J,true);}},_onDragMouseDown:function(L){var A=this;var J=L.target;var K=A.get(g);if(K){J.set(t,K);}},_onDragStart:function(M){var A=this;var J=M.target;var L=J.get(I);var K=A.get(g);var N=A.get(e);if(N){N.setStyle(v,L.get(f)+m);L.hide();N.show();L.placeAfter(N);if(K){K.setStyles({display:G,visibility:y}).show();}}},_onDragOver:function(J){var A=this;var K=A.get(d);if(K(J)){A._updatePlaceholder(J);}},_setNodes:function(J){var A=this;if(w(J)){return J;}else{if(q(J)){return u.all(J);}}return new u.NodeList([J]);}}});u.NestedList=c;},"1.7.0pr2",{skinnable:false,requires:["aui-base","dd-drag","dd-drop","dd-proxy"]});