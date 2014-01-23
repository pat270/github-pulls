AUI.add("aui-editor-toolbar-plugin",function(s){var an=s.Lang,w=s.Array,F=an.isArray,t=an.isFunction,ai=s.getClassName,L="editortoolbar",al="toolbar",v="align-block",Z="align-inline",G="align-left",am="align-right",x="alignment",N="color",S="content",p="font",ag="indent",l="input",U="insert",I="insertimage",aa="insertlink",E="left",V="list",ah="right",y="select",c="source",J="start",m="styles",ac="subscript",ab="text",Q="circle-check",a="close",ae={backcolor:true,forecolor:true,format:true,insertimage:true,insertlink:true,source:true,styles:true},B=["b","big","font","em","i","small","s","strike","strong","sub","sup","u"],q=ai("button","holder"),r=ai("field",l),z=ai("field",l,"text"),h=ai("field","label"),K=ai("field","numeric"),n=ai(L,"align","node"),C=ai(L,I),k=ai(L,aa),b=ai(L,y,"fontname"),af=ai(L,y,"fontsize"),f=ai(L,"size","separator"),i=ai(L,c,"textarea"),e=ai("state","active"),j=ai(L),D=ai(L,S),T='<div class="'+n+'"></div>',o="<a></a>",H="<img />",P='<a href="{0}"{2}>{1}</a>',g='<textarea class="'+i+'"></textarea>',ak='<div class="'+j+'"><div class="'+D+'"></div></div>',X='<div class="'+q+'"></div>',aj='<select class="'+b+'">{0}</select>',u='<option selected="selected"></option>'+"<option>Arial</option>"+"<option>Arial Black</option>"+"<option>Comic Sans MS</option>"+"<option>Courier New</option>"+"<option>Lucida Console</option>"+"<option>Tahoma</option>"+"<option>Times New Roman</option>"+"<option>Trebuchet MS</option>"+"<option>Verdana</option>",Y='<select class="'+af+'">{0}</select>',R='<option selected="selected"></option>'+'<option value="1">10</option>'+'<option value="2">13</option>'+'<option value="3">16</option>'+'<option value="4">18</option>'+'<option value="5">24</option>'+'<option value="6">32</option>'+'<option value="7">48</option>',O='<span class="'+f+'">x</span>';var M=s.Component.create({NAME:L,NS:al,EXTENDS:s.Plugin.Base,ATTRS:{append:{value:null},groups:{value:[{type:p},{type:ab},{type:N},{type:x},{type:ag},{type:V},{type:U},{type:c}]}},_alignNode:null,prototype:{initializer:function(){var aF=this;var ao=s.Node.create(T);var aD=aF.get("append");var ar=s.Node.create(ak);var av=ar.one("."+D);var aG=aF.get("groups");var aw=aF.get("host");var au=aw.frame.get("container");au.placeBefore(ar);aF._boundingBox=ar;aF._contentBox=av;ao.hide();s.getBody().append(ao);aF._alignNode=ao;var ax=[];if(F(aD)){var ay=aD.length;for(var aB=0;aB<ay;aB++){var aE=aD[aB];if(aE.index!=null){var ap=aF._isGroupIncluded("type",aG,aE.type);if(ap!=-1){aG.splice(ap,1);}aG.splice(Math.min(aE.index,aG.length),0,aE);}else{aG.push(aE);}}}for(aB=0;aB<aG.length;aB++){var aq=aG[aB];var az=W[aq.type]||aq;var aC=[];if(F(aq.include)){var A=aq.include.length;for(var aA=0;aA<A;aA++){ap=aF._isGroupIncluded("icon",az.children,aq.include[aA]);if(ap!=-1){aC.push(az.children[ap]);}}}else{aC=az.children;}var at=aF._addGroup(aq,az,aC);if(at){ax.push(at);}}aF._toolbars=ax;av.delegate("click",function(aK){var aI=this;var aJ=s.Widget.getByNode(aK.currentTarget);if(aJ){var aH=aJ.get("icon").split("-");if(!ae[aH[0]]){aI.execCommand(aH[0],(aH[1]?aH[1]:""));aI.focus();}}},"button",aw);},addGroup:function(ap){var A=this;var ao=W[ap.type]||ap;A._addGroup(ap,ao);},addGroupType:function(ao,ap){var A=this;if(!W[ao]){W[ao]=ap;}},_addGroup:function(ar,ay,aC){var aF=this;var ao=(aC==null&&ar.index!=null);aC=aC||ay.children;if(F(aC)){var av=aF.get("host");var au=aF._contentBox;var ap=[];var at;var ax={boundingBox:aF._boundingBox,contentBox:au};for(var aB=0;aB<aC.length;aB++){var A=aC[aB];if(!A.select){var aH=YUI.AUI.defaults.EditorToolbar.STRINGS[A._titleKey];A.title=(aH!=null?aH:ad[A._titleKey]);ap.push(A);}}if(ap.length){at=new s.Toolbar(s.merge(ay.config,ar.toolbar,{children:ap})).render(au);}var az=ay.generate;if(az&&t(az.init)){az.init.call(aF,av,ax);}if(ay.radio){at.after("buttonitem:click",aF._deactivateItems,aF,at);}ap=(ap.length?ap:aC);for(aB=0;aB<ap.length;aB++){var aE=ap[aB];var aD=aE.icon;if(az&&t(az[aD])){var aG=(ar.config?ar.config[aD]:null);ax.button=(aE.select||!at?null:at.item(aB));az[aD].call(aF,av,ax,aG);}}if(ao){var aw=au.get("childNodes");var aA=aw.size();var aq=ar.index;if(aq<aA-1){au.insert(aw.item(aA-1),aw.item(aq));}}return at;}return null;},_deactivateItems:function(ap,ao){var A=ap.target;ao.each(function(ar,aq,at){if(ar!=A){ar.StateInteraction.set("active",false);}});},_handleAlign:function(aq,ap){var ao=aq.changedNode;var A=aq.commands;var ar=ao.getStyle("textAlign")||J;if(ar&&ar.toLowerCase()==="start"){ar=E;if(ao.getStyle("direction")==="rtl"){ar=ah;}}if(ar){A["justify"+ar]=1;}},_handleFontName:function(at,aq){var ap=at.changedNode;var A=at.commands;var ao=aq._fontNameOptions;if(ao){var ar=at.fontFamily;ao.item(0).set("selected",true);ao.each(function(av,au,ax){var aw=av.get("value").toLowerCase();if(aw===ar.toLowerCase()){av.set("selected",true);}});}},_handleFontSize:function(ar,ap){var ao=ar.changedNode;var A=ar.commands;var at=ar.fontSize;var aq=ap._fontSizeOptions;if(aq){at=at.replace("px","");aq.item(0).set("selected",true);aq.each(function(aw,av,ax){var au=aw.get("text");if(au===at){aw.set("selected",true);}});}},_isGroupIncluded:function(ao,aq,ar){var A=this;for(var ap=0;ap<aq.length;ap++){if(aq[ap][ao]==ar){return ap;}}return -1;},_onNodeChange:function(ap,ao){var A=this;var aq=A._toolbars;A._handleAlign(ap,ao);A._handleFontSize(ap,ao);A._handleFontName(ap,ao);A._updateToolbar(ap.commands);},_openOverlayToAlignNode:function(ap,ao,aq){var at=this;var av=aq.get("docScrollX");var au=aq.get("docScrollY");var aw=ao.getXY();var ar=aq.getXY();aw=[aw[0]+ar[0]-av,aw[1]+ar[1]-au];var A=at._alignNode;A.setStyles({height:aq.get("offsetHeight"),width:aq.get("offsetWidth")});A.show();A.setXY(aw);ap.show();ap.set("align",{node:A,points:["tl","bc"]});},_updateToolbar:function(ao){var A=this;w.each(A._toolbars,function(aq,ap,ar){aq.each(function(au,at,aw){var av=!!(ao[au.get("icon")]);au.StateInteraction.set("active",av);});});}}});function d(ap){var A=this;var ar=ap.currentTarget;var ao=ar.get("className");
var aq=ao.substring(ao.lastIndexOf("-")+1);var at=ar.get("value");A.execCommand(aq,at);A.focus();}M.generateOverlay=function(aq,ap,A){var ao=new s["OverlayContext"+(A?"Panel":"")](s.merge({align:{node:aq,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:aq},ap)).render();return ao;};M.generateColorPicker=function(au,aq,ap,av){var at=aq.button;var ao=at.get("boundingBox");var A=new s.ColorPicker(s.merge({align:{node:ao,points:["tl","bl"]},trigger:ao},ap));if(ap&&ap.plugins){for(var ar=0;ar<ap.plugins.length;ar++){A.plug(ap.plugins[ar],ap);}}A.render(s.getBody());A.on("colorChange",function(ay){var aw=this;var ax=A.get("rgb");au.execCommand(av,ax.hex);au.focus();});};var ad={ALIGN:"Align",ALIGN_BLOCK:"Block",ALIGN_INLINE:"Inline",ALIGN_LEFT:"Left",ALIGN_RIGHT:"Right",BACKCOLOR:"Background Color",BOLD:"Bold",BORDER:"Border",DESCRIPTION:"Description",EDIT_IMAGE:"Edit Image",EDIT_LINK:"Edit Link",FORECOLOR:"Foreground Color",IMAGE_URL:"Image URL",INDENT:"Indent",INSERT:"Insert",INSERT_IMAGE:"Insert Image",INSERT_LINK:"Insert Link",INSERT_ORDERED_LIST:"Insert Numbered List",INSERT_UNORDERED_LIST:"Insert Bulleted List",ITALIC:"Italic",JUSTIFY_CENTER:"Justify Center",JUSTIFY_LEFT:"Justify Left",JUSTIFY_RIGHT:"Justify Right",LINE_THROUGH:"Line Through",LINK_URL:"Link URL",OPEN_IN_NEW_WINDOW:"Open in new window",OUTDENT:"Outdent",PADDING:"Padding",REMOVE_FORMAT:"Format Source",SAVE:"Save",SIZE:"Size",SOURCE:"Source",STYLES:"Styles",SUBSCRIPT:"Subscript",SUPERSCRIPT:"Superscript",UNDERLINE:"Underline"};if(!YUI.AUI.defaults.EditorToolbar){YUI.AUI.defaults.EditorToolbar={STRINGS:{}};}s.mix(YUI.AUI.defaults.EditorToolbar.STRINGS,ad);var W={};W[x]={children:[{activeState:true,icon:"justifyleft",_titleKey:"JUSTIFY_LEFT"},{activeState:true,icon:"justifycenter",_titleKey:"JUSTIFY_CENTER"},{activeState:true,icon:"justifyright",_titleKey:"JUSTIFY_RIGHT"}],radio:true};W[N]={children:[{icon:"forecolor",_titleKey:"FORECOLOR"},{icon:"backcolor",_titleKey:"BACKCOLOR"}],generate:{forecolor:function(aq,ap,ao){var A=this;M.generateColorPicker(aq,ap,ao,"forecolor");},backcolor:function(aq,ap,ao){var A=this;M.generateColorPicker(aq,ap,ao,"backcolor");}}};W[p]={children:[{icon:"fontname",select:true},{icon:"fontsize",select:true}],generate:{init:function(aq,ap){var A=this;var ao=ap.contentBox;aq.after("nodeChange",function(at){var ar=this;switch(at.changedType){case"keyup":case"mousedown":ar._onNodeChange(at,ap);break;}},A);},fontname:function(at,ar,aq){var A=this;var ao=ar.contentBox;var au;var av=[u];if(aq&&aq.optionHtml){av[0]=aq.optionHtml;}au=s.Node.create(an.sub(aj,av));ao.append(au);au.on("change",d,at);var ap=ao.all("."+b+" option");ar._fontNameOptions=ap;return au;},fontsize:function(at,ar,aq){var A=this;var ao=ar.contentBox;var au;var av=[R];if(aq&&aq.optionHtml){av[0]=aq.optionHtml;}au=s.Node.create(an.sub(Y,av));ao.append(au);au.on("change",d,at);var ap=ao.all("."+af+" option");ar._fontSizeOptions=ap;return au;}}};W[ag]={children:[{icon:ag,_titleKey:"INDENT"},{icon:"outdent",_titleKey:"OUTDENT"}]};W[U]={children:[{icon:"insertimage",_titleKey:"INSERT_IMAGE"},{icon:"insertlink",_titleKey:"INSERT_LINK"}],generate:{insertimage:function(aq,az,aI){var aG=this;var A=az.button;var au=A.get("boundingBox");var aF=M.generateOverlay(au,aI,true);var aC=aF.get("contentBox");var ax=new s.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE,icons:[{icon:a,handler:{fn:aF.hide,context:aF}}]}).render(aC);aC=ax.bodyNode;if(aI&&aI.dataBrowser){aI.dataBrowser.render(aC);}else{var at;var aJ;var aH=new s.Form({cssClass:C,labelAlign:E}).render(aC);var aw=[{labelText:"none",value:"none"}];for(var aD=1;aD<6;aD++){aw.push({labelText:aD+"px",value:aD+"px solid"});}aH.add([{id:"imageURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.IMAGE_URL},{id:"size",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.SIZE,type:"hidden"},{id:"width",labelText:false,cssClass:K},{id:"height",labelText:false,cssClass:K},{id:"padding",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.PADDING},new s.Select({id:"border",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.BORDER,options:aw}),{id:"align",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN,type:"hidden"},{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);aH.getField("width").get("boundingBox").placeAfter(O);var ar=aH.get("contentBox");var aE=s.Node.create(X);var ay=aH.getField("openInNewWindow");var aB=new s.ButtonItem({icon:Q,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(aE);aB.on("click",function(aL){var aV=this;var aM;var aP;var aT;if(at){aP=at;aT=at.get("parentNode");if(aT.get("tagName").toLowerCase()=="a"){aM=aT;}}else{aP=s.Node.create(H);}var aO=aH.get("fieldValues");var aU=aO.description;var aQ={src:aO.imageURL,title:aU,alt:aU};var aS={border:aO.border};var aW=parseInt(aO.height,10);var aN=parseInt(aO.width,10);if(!isNaN(aW)){aQ.height=aW;}if(!isNaN(aN)){aQ.width=aN;}var aR=parseInt(aO.padding,10);if(!isNaN(aR)){aS.padding=aR;}aA.some(function(aZ,aY,a1){var aX=this;var a0=aZ.StateInteraction.get("active");if(a0){aS.display="";switch(aY){case 0:aQ.align=E;break;case 1:aQ.align="";break;case 2:aQ.align="center";aS.display="block";break;case 3:aQ.align=ah;break;}return true;}return false;});aP.setAttrs(aQ);aP.setStyles(aS);var aK=aO.linkURL;if(aK){if(!aM){aM=s.Node.create(o);if(at){aT.insert(aM,at);}aM.append(aP);}aM.setAttribute("href",aK);aM.setAttribute("target",(ay.get("node").get("checked")?"_blank":""));aP=aM;}else{if(at&&aM){aT.insert(at,aM);aM.remove(true);}}if(!at&&aJ&&aJ.anchorNode){aJ.anchorNode.append(aP);}aF.hide();});var av=s.Node.create(H);var ao=aH.getField("height");var ap=aH.getField("width");av.on("load",function(aL){var aK=aL.currentTarget;if(!ao.get("value")||!ap.get("value")){aH.set("values",{height:aK.get("height"),width:aK.get("width")});
}});aH.getField("imageURL").get("node").on("blur",function(aK){av.set("src",this.val());});ar.append(aE);var aA=new s.Toolbar({children:[{activeState:true,icon:G,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_LEFT},{activeState:true,icon:Z,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_INLINE},{activeState:true,icon:v,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_BLOCK},{activeState:true,icon:am,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_RIGHT}]});aA.render(aH.getField("align").get("contentBox"));aF.on("show",function(aK){if(!aJ||!aJ.anchorNode){var aL=aq.getInstance();aq.focus();aJ=new aL.Selection();}});aF.after("hide",function(aK){aH.resetValues();aA.each(function(aM,aL,aN){aM.StateInteraction.set("active",false);});ay.get("node").set("checked",false);ax.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE);aB.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);aG._alignNode.hide();aF.set("align",{node:au,points:["tl","bl"]});at=null;});aq.on("toolbar:ready",function(){var aK=aq.frame._iframe;var aL=aq.getInstance();aK.on("mouseout",function(aM){aJ=new aL.Selection();});aL.one("body").delegate("click",s.bind(function(aR){var aM=this;if(at!=aR.currentTarget){var aO=aR.currentTarget;var aQ=aO.get("parentNode");var aN=aO.getStyle("borderWidth");var aS=aO.getStyle("padding");var aT=(aQ.get("tagName").toLowerCase()=="a");aH.set("values",{border:(aN?aN+" solid":""),description:aO.get("alt"),height:aO.get("height"),imageURL:aO.get("src"),linkURL:(aT?aQ.get("href"):""),width:aO.get("width"),padding:(aS?parseInt(aS,10):"")});var aP=1;switch(aO.getAttribute("align")){case E:aP=0;break;case"center":aP=2;break;case ah:aP=3;break;}aA.item(aP).StateInteraction.set("active",true);ay.get("node").attr("checked",(aT&&aQ.getAttribute("target")=="_blank"));ax.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_IMAGE);aB.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);at=aO;aM._openOverlayToAlignNode(aF,aK,aO);}},aG),"img");});}},insertlink:function(aw,aC,ao){var aD=this;var av=aC.button;var ar=av.get("boundingBox");var at=M.generateOverlay(ar,ao,true);var aA=at.get("contentBox");var A=new s.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_LINK,icons:[{icon:a,handler:{fn:at.hide,context:at}}]}).render(aA);aA=A.bodyNode;var aq=aw.frame._iframe;var az;var aB;var au=new s.Form({cssClass:k,labelAlign:E}).render(aA);au.add([{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);var ay=au.get("contentBox");var ax=s.Node.create(X);var aE=au.getField("openInNewWindow");var ap=new s.ButtonItem({icon:Q,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(ax);ap.on("click",function(aH){var aF=this;var aG=au.get("fieldValues");if(az){az.setAttribute("href",aG.linkURL);az.set("innerHTML",aG.description);if(aE.get("node").get("checked")){az.setAttribute("target","_blank");}else{az.setAttribute("target","");}}else{aw.execCommand("inserthtml",an.sub(P,[aG.linkURL,aG.description,(aE.get("node").get("checked")?' target="_blank"':"")]));}at.hide();});ay.append(ax);at.after("hide",function(aF){au.resetValues();aE.get("node").set("checked",false);A.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.CREATE_LINK);ap.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);aD._alignNode.hide();at.set("align",{node:ar,points:["tl","bl"]});az=null;});aw.on("toolbar:ready",function(){var aF=aw.getInstance();aF.one("body").delegate("click",s.bind(function(aJ){var aG=this;if(az!=aJ.currentTarget){var aI=aJ.currentTarget;if(!aI.one("img")){var aH=aI.get("parentNode");au.set("values",{description:aI.get("innerHTML"),linkURL:aI.getAttribute("href")});aE.get("node").attr("checked",(aI.getAttribute("target")=="_blank"));A.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_LINK);ap.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);az=aI;aG._openOverlayToAlignNode(at,aq,aI);}}},aD),"a");});}}};W[V]={children:[{activeState:true,icon:"insertunorderedlist",_titleKey:"INSERT_UNORDERED_LIST"},{activeState:true,icon:"insertorderedlist",_titleKey:"INSERT_ORDERED_LIST"}],generate:{init:function(ao){var A=this;ao.plug(s.Plugin.EditorLists);}},radio:true};W[c]={children:[{icon:"format",_titleKey:"REMOVE_FORMAT"},{icon:"source",_titleKey:"SOURCE"}],generate:{format:function(ar,ap,ao){var A=this;var aq=ap.button;aq.on("click",function(aw){var at=this;var ax=at.getInstance();var av=new ax.Selection();var au=av.getSelected();if(!av.isCollapsed&&au.size()){au.each(function(aE,aA,aF){var ay=this;aE.removeAttribute("style");var aC=aE.get("innerHTML");aC=aC.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g,"<$1>");for(var aB=0;aB<B.length;aB++){var az=new RegExp("(<"+B[aB]+">|<\\/"+B[aB]+">)","ig");aC=aC.replace(az,"");}aE.set("innerHTML",aC);var aD=aE.get("parentNode");if(!aD.test("body")){aD.removeAttribute("style");}});}},ar);},source:function(au,ar,aq){var A=this;var ap=ar.contentBox;var at=ar.button;var av;var ao=s.Node.create(g);au.on("toolbar:ready",function(){var aw=this;var ay=au.frame;var ax=ay.get("container");ao.hide();ax.append(ao);});at._visible=false;at.on("click",function(aA){var aw=this;var aB=au.frame;var ay=at._visible;if(ay){aw.set("content",ao.val());ao.hide();ao.val("");aB.show();}else{var az=aB._iframe;ao.val(aw.getContent());var ax=az.get("offsetHeight")-ao.getPadding("tb");ao.setStyle("height",ax);aB.hide();ao.show();}ay=!ay;at._visible=ay;ap.all("select").attr("disabled",ay);ap.all("button").attr("disabled",ay);at.get("contentBox").attr("disabled",false);},au);}}};W[m]={children:[{icon:"styles",_titleKey:"STYLES"}],generate:{styles:function(at,aq,ap){var A=this;var ar=aq.button;var ao=ar.get("boundingBox");at.plug(s.Plugin.EditorMenu);at.menu.add(s.merge({align:{node:ao,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:ao},ap));}}};
W[ac]={children:[{icon:"subscript",_titleKey:"SUBSCRIPT"},{icon:"superscript",_titleKey:"SUPERSCRIPT"}]};W[ab]={children:[{activeState:true,icon:"bold",_titleKey:"BOLD"},{activeState:true,icon:"italic",_titleKey:"ITALIC"},{activeState:true,icon:"underline",_titleKey:"UNDERLINE"},{activeState:true,icon:"strikethrough",_titleKey:"LINE_THROUGH"}]};s.namespace("Plugin").EditorToolbar=M;},"1.7.0pr2",{skinnable:true,requires:["aui-base","aui-button-item","aui-color-picker","aui-editor-menu-plugin","aui-editor-tools-plugin","aui-form-select","aui-overlay-context-panel","aui-panel","aui-toolbar","createlink-base","editor-lists","editor-base","plugin"]});