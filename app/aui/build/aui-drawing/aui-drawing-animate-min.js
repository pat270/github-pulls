AUI.add("aui-drawing-animate",function(o){var e=o.Lang,a=e.isFunction,l=e.isString,E=o.ColorUtil,m=o.Drawing,r=m.Element,x=m.Set,g=m.Util,d=r.prototype,n=m.MAP_ATTRS_AVAILABLE,k=Math,s=k.abs,z=k.max,v=k.min,h=k.pow,p=k.round,D=/^(from|to|\d+%)$/,y=/^cubic-bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,i=m.REGEX_SEPARATOR,q=m.STR_EMPTY,b=m.STR_SPACE,f="number",j={along:"along",blur:f,"clip-rect":"csv",cx:f,cy:f,fill:"color","fill-opacity":f,"font-size":f,height:f,opacity:f,path:"path",r:f,rotation:"csv",rx:f,ry:f,scale:"csv",stroke:"color","stroke-opacity":f,"stroke-width":f,translation:"csv",width:f,x:f,y:f};var C=m.Animation={};C.easing_formulas={linear:function(A){return A;},"<":function(A){return h(A,3);},">":function(A){return h(A-1,3)+1;},"<>":function(A){A=A*2;if(A<1){return h(A,3)/2;}A-=2;return(h(A,3)+2)/2;},backIn:function(F){var A=1.70158;return F*F*((A+1)*F-A);},backOut:function(F){F=F-1;var A=1.70158;return F*F*((A+1)*F+A)+1;},elastic:function(G){if(G==0||G==1){return G;}var F=0.3;var A=F/4;return h(2,-10*G)*k.sin((G-A)*(2*k.PI)/F)+1;},bounce:function(H){var F=7.5625;var G=2.75;var A;if(H<(1/G)){A=F*H*H;}else{if(H<(2/G)){H-=(1.5/G);A=F*H*H+0.75;}else{if(H<(2.5/G)){H-=(2.25/G);A=F*H*H+0.9375;}else{H-=(2.625/G);A=F*H*H+0.984375;}}}return A;}};var w=[];C.elements=w;C.animation=function(){var L=+new Date;for(var V=0;V<w.length;V++){if(V!="length"&&w.hasOwnProperty(V)){var aa=w[V];if(aa.stop||aa.el.removed){continue;}var I=L-aa.start;var S=aa.ms;var R=aa.easing;var W=aa.from;var P=aa.diff;var F=aa.to;var O=aa.t;var K=aa.el;var Q={};var A;if(I<S){var H=R(I/S);for(var T in W){if(W.hasOwnProperty(T)){switch(j[T]){case"along":A=H*S*P[T];F.back&&(A=F.len-A);var U=getPointAtLength(F[T],A);K.translate(P.sx-P.x||0,P.sy-P.y||0);P.x=U.x;P.y=U.y;K.translate(U.x-P.sx,U.y-P.sy);F.rot&&K.rotate(P.r+U.alpha,U.x,U.y);break;case f:A=+W[T]+H*S*P[T];break;case"color":A="rgb("+[B(p(W[T].r+H*S*P[T].r)),B(p(W[T].g+H*S*P[T].g)),B(p(W[T].b+H*S*P[T].b))].join(",")+")";break;case"path":A=[];for(var Y=0,G=W[T].length;Y<G;Y++){A[Y]=[W[T][Y][0]];for(var X=1,Z=W[T][Y].length;X<Z;X++){A[Y][X]=+W[T][Y][X]+H*S*P[T][Y][X];}A[Y]=A[Y].join(b);}A=A.join(b);break;case"csv":switch(T){case"translation":var N=H*S*P[T][0]-O.x;var M=H*S*P[T][1]-O.y;O.x+=N;O.y+=M;A=N+b+M;break;case"rotation":A=+W[T][0]+H*S*P[T][0];W[T][1]&&(A+=","+W[T][1]+","+W[T][2]);break;case"scale":A=[+W[T][0]+H*S*P[T][0],+W[T][1]+H*S*P[T][1],(2 in F[T]?F[T][2]:q),(3 in F[T]?F[T][3]:q)].join(b);break;case"clip-rect":A=[];Y=4;while(Y--){A[Y]=+W[T][Y]+H*S*P[T][Y];}break;}break;default:var J=[].concat(W[T]);var A=[];Y=K.paper.customAttributes[T].length;while(Y--){A[Y]=+W[Y]+H*S*P[T][Y];}break;}Q[T]=A;}}K.attr(Q);K._run&&K._run.call(K);}else{if(F.along){U=getPointAtLength(F.along,F.len*!F.back);K.translate(P.sx-(P.x||0)+U.x-P.sx,P.sy-(P.y||0)+U.y-P.sy);F.rot&&K.rotate(P.r+U.alpha,U.x,U.y);}if(O.x||O.y){K.translate(-O.x,-O.y);}if(F.scale){F.scale+=q;}K.attr(F);w.splice(V--,1);}}}if(o.UA.svg&&K&&K.paper){K.paper.safari();}if(w.length){setTimeout(C.animation);}};var u=function(F,A){return F.key-A.key;};var t=function(A,F,J,G,H){var I=J-G;F.timeouts.push(setTimeout(function(){if(a(H)){H.call(F);}F.animate(A,I,A.easing);},G));};var B=function(A){return z(v(A,255),0);};function c(R,H,F,Q,P,L){var M=3*H;var O=3*(Q-H)-M;var A=1-M-O;var K=3*F;var N=3*(P-F)-K;var S=1-K-N;function J(T){return((A*T+O)*T+M)*T;}function G(T,V){var U=I(T,V);return((S*U+N)*U+K)*U;}function I(T,aa){var Z,Y,W,U,X,V;for(W=T,V=0;V<8;V++){U=J(W)-T;if(s(U)<aa){return W;}X=(3*A*W+2*O)*W+M;if(s(X)<0.000001){break;}W=W-U/X;}Z=0;Y=1;W=T;if(W<Z){return Z;}if(W>Y){return Y;}while(Z<Y){U=J(W);if(s(U-T)<aa){return W;}if(T>U){Z=W;}else{Y=W;}W=(Y-Z)/2+Z;}return W;}return G(R,1/(200*L));}d.animateWith=function(G,I,A,K,J){for(var F=0,H=w.length;F<H;F++){if(w[F].el.id==G.id){I.start=w[F].start;}}return this.animate(I,A,K,J);};C.along=function(A){return function(H,G,F,J){var I={back:A};a(F)?(J=F):(I.rot=F);H&&H.constructor==r&&(H=H.attrs.path);H&&(I.along=H);return this.animate(I,G,J);};};d.animateAlong=C.along();d.animateAlongBack=C.along(1);d.onAnimation=function(F){var A=this;A._run=F||0;return A;};d.animate=function(ag,W,V,J){var af=this;af.timeouts=af.timeouts||[];if(a(V)||!V){J=V||null;}if(af.removed){J&&J.call(af);return af;}var aa={};var F={};var O={};var N=false;var T=af.paper.customAttributes;for(var X in ag){if(ag.hasOwnProperty(X)){if(j.hasOwnProperty(X)||T.hasOwnProperty(X)){N=true;aa[X]=af.attr(X);if(aa[X]==null){aa[X]=n[X];}F[X]=ag[X];switch(j[X]){case"along":var ad=getTotalLength(ag[X]);var Y=getPointAtLength(ag[X],ad*!!ag.back);var K=af.getRegion();O[X]=ad/W;O.tx=K.x;O.ty=K.y;O.sx=Y.x;O.sy=Y.y;F.rot=ag.rot;F.back=ag.back;F.len=ad;if(ag.rot){O.r=parseFloat(af.rotate())||0;}break;case f:O[X]=(F[X]-aa[X])/W;break;case"color":aa[X]=E.getRGB(aa[X]);var Z=E.getRGB(F[X]);O[X]={r:(Z.r-aa[X].r)/W,g:(Z.g-aa[X].g)/W,b:(Z.b-aa[X].b)/W};break;case"path":var L=g.path2curve(aa[X],F[X]);aa[X]=L[0];var R=L[1];O[X]=[];for(var ac=0,H=aa[X].length;ac<H;ac++){O[X][ac]=[0];for(var ab=1,ae=aa[X][ac].length;ab<ae;ab++){O[X][ac][ab]=(R[ac][ab]-aa[X][ac][ab])/W;}}break;case"csv":var A=String(ag[X]).split(i);var M=String(aa[X]).split(i);switch(X){case"translation":aa[X]=[0,0];O[X]=[A[0]/W,A[1]/W];break;case"rotation":aa[X]=(M[1]==A[1]&&M[2]==A[2])?M:[0,A[1],A[2]];O[X]=[(A[0]-aa[X][0])/W,0,0];break;case"scale":ag[X]=A;aa[X]=String(aa[X]).split(i);O[X]=[(A[0]-aa[X][0])/W,(A[1]-aa[X][1])/W,0,0];break;case"clip-rect":aa[X]=String(aa[X]).split(i);O[X]=[];ac=4;while(ac--){O[X][ac]=(A[ac]-aa[X][ac])/W;}break;}F[X]=A;break;default:A=[].concat(ag[X]);M=[].concat(aa[X]);O[X]=[];ac=T[X].length;while(ac--){O[X][ac]=((A[ac]||0)-(M[ac]||0))/W;}break;}}}}if(!N){var U=[];var I;for(var ah in ag){if(ag.hasOwnProperty(ah)&&D.test(ah)){X={value:ag[ah]};if(ah=="from"){ah=0;}else{if(ah=="to"){ah=100;}}X.key=parseInt(ah,10);U.push(X);}}U.sort(u);if(U[0].key){U.unshift({key:0,value:af.attrs});}var S;var G=U.length;for(var ac=0;ac<G;ac++){X=U[ac];
S=U[ac-1];t(X.value,af,W/100*X.key,W/100*(S&&S.key||0),S&&S.value.callback);}I=U[G-1].value.callback;if(I){af.timeouts.push(setTimeout(function(){I.call(af);},W));}}else{var P=C.easing_formulas[V];if(!P){P=String(P).match(y);if(P&&P.length==5){var Q=P;P=function(ai){return c(ai,+Q[1],+Q[2],+Q[3],+Q[4],W);};}else{P=function(ai){return ai;};}}w.push({start:ag.start||+new Date,ms:W,easing:P,from:aa,diff:O,to:F,el:af,t:{x:0,y:0}});if(a(J)){af._ac=setTimeout(function(){J.call(af);},W);}if(w.length==1){setTimeout(C.animation);}}return af;};d.stop=function(){var A=this;for(var F=0;F<w.length;F++){if(w[F].el.id==A.id){w.splice(F--,1);}}A.timeouts=[];clearTimeout(A._ac);delete A._ac;return A;};d.translate=function(A,F){return this.attr({translation:A+" "+F});};x.addMethod(["animateAlong","animateAlongBack","animateWith","onAnimation","stop","translate"]);x.prototype.animate=function(G,A,J,N){var M=this;if(a(J)||!J){N=J||null;}var K=M._items;var F=K.length;var H=F;var O;var L;var I;if(N){I=function(){if(!--F){N.call(M);}};}J=l(J)?J:I;O=K[--H].animate(G,A,J,I);while(H--){L=K[H];if(L&&!L.removed){L.animateWith(O,G,A,J,I);}}return M;};},"1.7.0pr2",{requires:["aui-drawing-base"]});