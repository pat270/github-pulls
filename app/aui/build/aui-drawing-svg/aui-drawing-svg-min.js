AUI.add("aui-drawing-svg",function(t){var h=t.Lang,n=h.isArray,a=h.isFunction,m=h.isObject,p=h.isString,e=h.isUndefined,F=t.config,d=F.doc,C=t.ColorUtil,q=t.Drawing,v=q.Element,H,i=q.Util,r=q.prototype,g=v.prototype,o=Math,z=o.max,j=o.pow,s=q.MAP_ATTRS_AVAILABLE,w=q.MAP_TYPES_IMAGE_TEXT,B=q.MAP_TYPES_CIRCLE_ELLIPSE,E=q.REGEX_ISURL,l=q.REGEX_RADIAL_GRADIENT,k=q.REGEX_SEPARATOR,b=q.REGEX_SEPARATOR_GRADIENT,y="Created with AlloyUI",u=q.STR_EMPTY,f=q.STR_FILL,c=q.STR_SPACE,G=1.2,x=String.prototype.toLowerCase,D=String.prototype.toUpperCase;r.svgns="http://www.w3.org/2000/svg";r.xlink="http://www.w3.org/1999/xlink";i.CREATE_ELEMENT=function(A){var I=d.createElementNS(r.svgns,A);I.style.webkitTapHighlightColor="rgba(0,0,0,0)";return I;};i.SET_ATTRS=function(J,A){for(var I in A){if(A.hasOwnProperty(I)){J.setAttribute(I,String(A[I]));}}return J;};i.TUNE_TEXT=function(I,L){if(I.type!="text"||!(L.hasOwnProperty("text")||L.hasOwnProperty("font")||L.hasOwnProperty("font-size")||L.hasOwnProperty("x")||L.hasOwnProperty("y"))){return;}var K;var P=I.attrs;var J=I.node;var R=10;if(J.firstChild){R=parseInt(d.defaultView.getComputedStyle(J.firstChild,u).getPropertyValue("font-size"),10);}if(L.hasOwnProperty("text")){P.text=L.text;while(J.firstChild){J.removeChild(J.firstChild);}K=String(L.text).split("\n");for(var M=0,A=K.length;M<A;M++){if(K[M]){var O=i.CREATE_ELEMENT("tspan");if(M){i.SET_ATTRS(O,{dy:R*G,x:P.x});}O.appendChild(d.createTextNode(K[M]));J.appendChild(O);}}}else{K=J.getElementsByTagName("tspan");for(M=0,A=K.length;M<A;M++){if(M){i.SET_ATTRS(K[M],{dy:R*G,x:P.x});}}}i.SET_ATTRS(J,{y:P.y});var N=I.getRegion();var Q=P.y-(N.y+N.height/2);if(Q&&isFinite(Q)){i.SET_ATTRS(J,{y:P.y+Q});}};i.UPDATE_POSITION=function(A){var I=A.getRegion();i.SET_ATTRS(A.pattern,{patternTransform:h.sub("translate({0},{1})",[I.x,I.y])});};H=q.Impl={addGradientFill:function(R,A,U){var N="linear";var M=0.5;var L=0.5;var J=R.style;var K;A=String(A).replace(l,function(ab,Z,ac){N="radial";if(Z&&ac){M=parseFloat(Z);L=parseFloat(ac);var aa=((L>0.5)*2-1);j(M-0.5,2)+j(L-0.5,2)>0.25&&(L=o.sqrt(0.25-j(M-0.5,2))*aa+0.5)&&L!=0.5&&(L=L.toFixed(5)-0.00001*aa);}return u;});A=A.split(b);if(N=="linear"){var Y=A.shift();Y=-parseFloat(Y);if(isNaN(Y)){return null;}K=[0,0,o.cos(Y*o.PI/180),o.sin(Y*o.PI/180)];var W=1/(z(o.abs(K[2]),o.abs(K[3]))||1);K[2]*=W;K[3]*=W;if(K[2]<0){K[0]=-K[2];K[2]=0;}if(K[3]<0){K[1]=-K[3];K[3]=0;}}var Q=i.parseDots(A);if(!Q){return null;}var T=R.getAttribute(f);T=T.match(/^url\(#(.*)\)$/);T&&U.defs.removeChild(d.getElementById(T[1]));var I=i.CREATE_ELEMENT(N+"Gradient");I.id=t.guid();var S;if(N=="radial"){S={fx:M,fy:L};}else{S={x1:K[0],y1:K[1],x2:K[2],y2:K[3]};}i.SET_ATTRS(I,S);U.defs.appendChild(I);for(var X=0,O=Q.length;X<O;X++){var V=i.CREATE_ELEMENT("stop");var P=Q[X].offset;if(!P){if(!X){P="0%";}else{P="100%";}}i.SET_ATTRS(V,{offset:P,"stop-color":Q[X].color||"#fff"});I.appendChild(V);}i.SET_ATTRS(R,{fill:"url(#"+I.id+")",opacity:1,"fill-opacity":1});J.fill=u;J.opacity=1;J.fillOpacity=1;return 1;},clear:function(){var A=this;var I=A.canvas;while(I.firstChild){I.removeChild(I.firstChild);}A.bottom=A.top=null;A.desc=i.CREATE_ELEMENT("desc");A.desc.appendChild(d.createTextNode(y));I.appendChild(A.desc);A.defs=i.CREATE_ELEMENT("defs");I.appendChild(A.defs);},createCanvas:function(){var J=this;var K=J.get("contentBox");var I=J.get("x");var N=J.get("y");var M=J.get("width");var A=J.get("height");var L=i.CREATE_ELEMENT("svg");i.SET_ATTRS(L,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:M,height:A});K.prepend(L);J.canvas=L;J.clear();},createCircle:function(I,M,K){var A=this;var J=i.CREATE_ELEMENT("circle");A.canvas.appendChild(J);var L=new v(J,A);L.attrs={cx:I,cy:M,r:K,fill:"none",stroke:"#000"};L.type="circle";i.SET_ATTRS(J,L.attrs);return L;},createEllipse:function(I,N,M,L){var A=this;var J=i.CREATE_ELEMENT("ellipse");A.canvas.appendChild(J);var K=new v(J,A);K.attrs={cx:I,cy:N,rx:M,ry:L,fill:"none",stroke:"#000"};K.type="ellipse";i.SET_ATTRS(J,K.attrs);return K;},createImage:function(N,I,O,J,L){var A=this;var K=i.CREATE_ELEMENT("image");i.SET_ATTRS(K,{x:I,y:O,width:J,height:L,preserveAspectRatio:"none"});K.setAttributeNS(A.xlink,"href",N);A.canvas.appendChild(K);var M=new v(K,A);M.attrs={x:I,y:O,width:J,height:L,src:N};M.type="image";return M;},createPath:function(I){var A=this;var J=i.CREATE_ELEMENT("path");A.canvas.appendChild(J);var K=new v(J,A);K.type="path";H.setFillAndStroke(K,{fill:"none",stroke:"#000",path:I});return K;},createRectangle:function(I,O,J,L,N){var A=this;var K=i.CREATE_ELEMENT("rect");A.canvas.appendChild(K);var M=new v(K,A);M.attrs={x:I,y:O,width:J,height:L,r:N,rx:N,ry:N,fill:"none",stroke:"#000"};M.type="rect";i.SET_ATTRS(K,M.attrs);return M;},createText:function(I,M,L){var A=this;var K=i.CREATE_ELEMENT("text");i.SET_ATTRS(K,{x:I,y:M,"text-anchor":"middle"});A.canvas.appendChild(K);var J=new v(K,A);J.attrs={x:I,y:M,"text-anchor":"middle",text:L,font:s.font,stroke:"none",fill:"#000"};J.type="text";H.setFillAndStroke(J,J.attrs);return J;},setFillAndStroke:function(S,ae){var W={"":[0],"none":[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]};var Y=S.node;var U=S.attrs;var Q=S.rotate();var M=function(al,ak){ak=W[x.call(ak)];if(ak){var ai=al.attrs["stroke-width"]||"1";var ag={round:ai,square:ai,butt:0}[al.attrs["stroke-linecap"]||ae["stroke-linecap"]]||0;var aj=[];var ah=ak.length;while(ah--){aj[ah]=ak[ah]*ai+((ah%2)?1:-1)*ag;}i.SET_ATTRS(Y,{"stroke-dasharray":aj.join(",")});}};if(ae.hasOwnProperty("rotation")){Q=ae.rotation;}var P=String(Q).split(k);if(!(P.length-1)){P=null;}else{P[1]=+P[1];P[2]=+P[2];}parseFloat(Q)&&S.rotate(0,true);for(var X in ae){if(ae.hasOwnProperty(X)){if(!s.hasOwnProperty(X)){continue;}var V=ae[X];U[X]=V;switch(X){case"blur":S.blur(V);break;case"rotation":S.rotate(V,true);break;case"href":case"title":case"target":var ab=Y.parentNode;if(x.call(ab.tagName)!="a"){var K=i.CREATE_ELEMENT("a");
ab.insertBefore(K,Y);K.appendChild(Y);ab=K;}ab.setAttributeNS(S.paper.xlink,X,V);break;case"cursor":Y.style.cursor=V;break;case"clip-rect":var I=String(V).split(k);if(I.length==4){S.clip&&S.clip.parentNode.parentNode.removeChild(S.clip.parentNode);var J=i.CREATE_ELEMENT("clipPath");var Z=i.CREATE_ELEMENT("rect");J.id=t.guid();i.SET_ATTRS(Z,{x:I[0],y:I[1],width:I[2],height:I[3]});J.appendChild(Z);S.paper.defs.appendChild(J);i.SET_ATTRS(Y,{"clip-path":"url(#"+J.id+")"});S.clip=Z;}if(!V){var ac=d.getElementById(Y.getAttribute("clip-path").replace(/(^url\(#|\)$)/g,u));ac&&ac.parentNode.removeChild(ac);i.SET_ATTRS(Y,{"clip-path":u});delete S.clip;}break;case"path":if(S.type=="path"){var ad="M0,0";if(V){ad=i.pathToAbsolute(V);}i.SET_ATTRS(Y,{d:ad});}break;case"width":Y.setAttribute(X,V);if(U.fx){X="x";V=U.x;}else{break;}case"x":if(U.fx){V=-U.x-(U.width||0);}case"rx":if(X=="rx"&&S.type=="rect"){break;}case"cx":P&&(X=="x"||X=="cx")&&(P[1]+=V-U[X]);Y.setAttribute(X,V);S.pattern&&i.UPDATE_POSITION(S);break;case"height":Y.setAttribute(X,V);if(U.fy){X="y";V=U.y;}else{break;}case"y":if(U.fy){V=-U.y-(U.height||0);}case"ry":if(X=="ry"&&S.type=="rect"){break;}case"cy":P&&(X=="y"||X=="cy")&&(P[2]+=V-U[X]);Y.setAttribute(X,V);S.pattern&&i.UPDATE_POSITION(S);break;case"r":if(S.type=="rect"){i.SET_ATTRS(Y,{rx:V,ry:V});}else{Y.setAttribute(X,V);}break;case"src":if(S.type=="image"){Y.setAttributeNS(S.paper.xlink,"href",V);}break;case"stroke-width":Y.style.strokeWidth=V;Y.setAttribute(X,V);if(U["stroke-dasharray"]){M(S,U["stroke-dasharray"]);}break;case"stroke-dasharray":M(S,V);break;case"translation":var N=String(V).split(k);N[0]=+N[0]||0;N[1]=+N[1]||0;if(P){P[1]+=N[0];P[2]+=N[1];}i.translate.call(S,N[0],N[1]);break;case"scale":N=String(V).split(k);S.scale(+N[0]||1,+N[1]||+N[0]||1,isNaN(parseFloat(N[2]))?null:+N[2],isNaN(parseFloat(N[3]))?null:+N[3]);break;case f:var L=String(V).match(E);if(L){J=i.CREATE_ELEMENT("pattern");var T=i.CREATE_ELEMENT("image");J.id=t.guid();i.SET_ATTRS(J,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});i.SET_ATTRS(T,{x:0,y:0});T.setAttributeNS(S.paper.xlink,"href",L[1]);J.appendChild(T);var af=d.createElement("img");af.style.cssText="position: absolute; left: -9999em; top: -9999em";af.onload=function(){var ag={width:this.offsetWidth,height:this.offsetHeight};i.SET_ATTRS(J,ag);i.SET_ATTRS(T,ag);d.body.removeChild(this);S.paper.safari();};d.body.appendChild(af);af.src=L[1];S.paper.defs.appendChild(J);Y.style.fill="url(#"+J.id+")";i.SET_ATTRS(Y,{fill:"url(#"+J.id+")"});S.pattern=J;S.pattern&&i.UPDATE_POSITION(S);break;}var aa=C.getRGB(V);if(!aa.error){delete ae.gradient;delete U.gradient;if(!e(U.opacity)&&e(ae.opacity)){i.SET_ATTRS(Y,{opacity:U.opacity});}if(!e(U["fill-opacity"])&&e(ae["fill-opacity"])){i.SET_ATTRS(Y,{"fill-opacity":U["fill-opacity"]});}}else{if((B.hasOwnProperty(S.type)||String(V).charAt(0)!="r")&&H.addGradientFill(Y,V,S.paper)){U.gradient=V;U.fill="none";break;}}if(aa.hasOwnProperty("o")){i.SET_ATTRS(Y,{"fill-opacity":aa.o>1?aa.o/100:aa.o});}case"stroke":aa=C.getRGB(V);Y.setAttribute(X,aa.hex);if(X=="stroke"&&aa.hasOwnProperty("o")){i.SET_ATTRS(Y,{"stroke-opacity":aa.o>1?aa.o/100:aa.o});}break;case"gradient":if(B.hasOwnProperty(S.type)||String(V).charAt(0)!="r"){H.addGradientFill(Y,V,S.paper);}break;case"opacity":if(U.gradient&&!U.hasOwnProperty("stroke-opacity")){i.SET_ATTRS(Y,{"stroke-opacity":V>1?V/100:V});}case"fill-opacity":if(U.gradient){var A=d.getElementById(Y.getAttribute(f).replace(/^url\(#|\)$/g,u));if(A){var O=A.getElementsByTagName("stop");O[O.length-1].setAttribute("stop-opacity",V);}break;}default:if(X=="font-size"){V=parseInt(V,10)+"px";}var R=X.replace(/(\-.)/g,function(ag){return D.call(ag.substring(1));});Y.style[R]=V;Y.setAttribute(X,V);break;}}}i.TUNE_TEXT(S,ae);if(P){S.rotate(P.join(c));}else{parseFloat(Q)&&S.rotate(Q,true);}},remove:function(){var A=this;var I=A.get("contentBox");I.removeChild(A.canvas);for(var J in A){if(r.hasOwnProperty(J)){A[J]=i.removed(J);}}}};r._uiSetWidth=function(I){var A=this;q.superclass._uiSetWidth.apply(A,arguments);A.canvas.setAttribute("width",I);};r._uiSetHeight=function(I){var A=this;q.superclass._uiSetHeight.apply(A,arguments);A.canvas.setAttribute("height",I);};g.createElement=function(J,I){var A=this;A[0]=J;A.id=t.guid();A.node=J;A.paper=I;A.attrs=A.attrs||{};A.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};if(!I.bottom){I.bottom=A;}A.prev=I.top;if(I.top){I.top.next=A;}I.top=A;A.next=null;};g.rotate=function(J,I,L){var A=this;if(A.removed){return A;}if(J==null){if(A._.rt.cx){return[A._.rt.deg,A._.rt.cx,A._.rt.cy].join(c);}return A._.rt.deg;}var K=A.getRegion();J=String(J).split(k);if(J.length-1){I=parseFloat(J[1]);L=parseFloat(J[2]);}J=parseFloat(J[0]);if(I!=null){A._.rt.deg=J;}else{A._.rt.deg+=J;}(L==null)&&(I=null);A._.rt.cx=I;A._.rt.cy=L;I=I==null?K.x+K.width/2:I;L=L==null?K.y+K.height/2:L;if(A._.rt.deg){A.transformations[0]=h.sub("rotate({0} {1} {2})",[A._.rt.deg,I,L]);if(A.clip){i.SET_ATTRS(A.clip,{transform:h.sub("rotate({0} {1} {2})",[-A._.rt.deg,I,L])});}}else{A.transformations[0]=u;if(A.clip){i.SET_ATTRS(A.clip,{transform:u});}}i.SET_ATTRS(A.node,{transform:A.transformations.join(c)});return A;};g.hide=function(){var A=this;!A.removed&&(A.node.style.display="none");return this;};g.show=function(){var A=this;!A.removed&&(A.node.style.display="");return A;};g.remove=function(){var A=this;if(A.removed){return;}i.tear(A,A.paper);A.node.parentNode.removeChild(A.node);for(var I in A){delete A[I];}A.removed=true;};g.getRegion=function(){var A=this;if(A.removed){return A;}if(A.type=="path"){return i.pathDimensions(A.attrs.path);}var J=false;if(A.node.style.display=="none"){A.show();J=true;}var N={};try{N=A.node.getBBox();}catch(L){}finally{N=N||{};}if(A.type=="text"){N={x:N.x,y:Infinity,width:0,height:0};for(var I=0,K=A.node.getNumberOfChars();I<K;I++){var M=A.node.getExtentOfChar(I);if(M.y<N.y){N.y=M.y;}if(M.y+M.height-N.y>N.height){N.height=M.y+M.height-N.y;}if(M.x+M.width-N.x>N.width){N.width=M.x+M.width-N.x;
}}}if(J){A.hide();}return N;};g.getBBox=g.getRegion;g.attr=function(A,N){var P=this;if(P.removed){return P;}if(A==null){var L={};for(var K in P.attrs){if(P.attrs.hasOwnProperty(K)){L[K]=P.attrs[K];}}P._.rt.deg&&(L.rotation=P.rotate());(P._.sx!=1||P._.sy!=1)&&(L.scale=P.scale());L.gradient&&L.fill=="none"&&(L.fill=L.gradient)&&delete L.gradient;return L;}if(N==null&&p(A)){if(A=="translation"){return i.translate.call(P);}if(A=="rotation"){return P.rotate();}if(A=="scale"){return P.scale();}if(A==f&&P.attrs.fill=="none"&&P.attrs.gradient){return P.attrs.gradient;}return P.attrs[A];}if(N==null&&n(A)){var O={};for(var J=0,M=A.length;J<M;J++){O[A[J]]=P.attr(A[J]);}return O;}var I=i.applyAttributes(P,A,N);H.setFillAndStroke(P,I);return P;};g.toFront=function(){var A=this;if(A.removed){return A;}A.node.parentNode.appendChild(A.node);var I=A.paper;I.top!=A&&i.toFront(A,I);return A;};g.toBack=function(){var A=this;if(A.removed){return A;}if(A.node.parentNode.firstChild!=A.node){A.node.parentNode.insertBefore(A.node,A.node.parentNode.firstChild);i.toBack(A,A.paper);}return A;};g.insertAfter=function(I){var A=this;if(A.removed){return A;}var J=I.node||I instanceof q.Set&&I.item(I.size()).node;if(J.nextSibling){J.parentNode.insertBefore(A.node,J.nextSibling);}else{J.parentNode.appendChild(A.node);}i.insertAfter(A,I,A.paper);return A;};g.insertBefore=function(I){var A=this;if(A.removed){return A;}var J=I.node||I instanceof q.Set&&I.item(0).node;J.parentNode.insertBefore(A.node,J);i.insertBefore(A,I,A.paper);return A;};g.blur=function(I){var A=this;if(+I!==0){var J=CREATE_ELEMENT("filter");var K=CREATE_ELEMENT("feGaussianBlur");A.attrs.blur=I;J.id=t.guid();i.SET_ATTRS(K,{stdDeviation:+I||1.5});J.appendChild(K);A.paper.defs.appendChild(J);A._blur=J;i.SET_ATTRS(A.node,{filter:"url(#"+J.id+")"});}else{if(A._blur){A._blur.parentNode.removeChild(A._blur);delete A._blur;delete A.attrs.blur;}A.node.removeAttribute("filter");}};},"1.7.0pr2",{condition:{name:"aui-drawing-svg",trigger:"aui-drawing-base",test:function(a){return a.UA.svg;}},requires:["aui-drawing-base"]});