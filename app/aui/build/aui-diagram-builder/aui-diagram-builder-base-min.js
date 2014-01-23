AUI.add("aui-diagram-builder-base",function(ag){var W=ag.Lang,d=W.isArray,aw=W.isBoolean,N=W.isNumber,E=W.isObject,aA=W.isString,L=function(A){return ag.instanceOf(A,ag.ArrayList);},U=function(A){return ag.instanceOf(A,ag.Node);},G=function(A){return ag.instanceOf(A,ag.AvailableField);},aJ=ag.Array,X="add",n="addNode",aI="auto",O="availableField",S="availableFields",aF="availableFieldsDragConfig",u="boundingBox",aC="builder",ab="cancel",ad="canvas",ay="clearfix",f="column",a="container",ae="content",x="contentBox",e="contentContainer",R="contentNode",H="createDocumentFragment",C="diagram",an="diagram-builder",q="draggable",aE="drop",aq="dropConfig",aa="dropContainer",av="field",v="fields",p="fieldsContainer",au="height",r="helper",Z="icon",y="iconClass",ap="id",ak="label",w="layout",ao="list",Q="maxFields",t="node",g="parentNode",af="propertyList",aD="rendered",ar="save",s="settings",P="tab",J="tabView",b="tabs",h="tabview",al="title",M="toolbar",m="toolbarContainer",B=ag.getClassName,aH=" ",i=".",j="#",D="_",z=B(C,aC,ad),ah=B(C,aC,ae,a),F=B(C,aC,aE,a),ax=B(C,aC,av),l=B(C,aC,av,q),c=B(C,aC,av,Z),ac=B(C,aC,av,ak),Y=B(C,aC,v,a),ai=B(C,aC,P,X),K=B(C,aC,P,s),at=B(C,aC,b),T=B(C,aC,b,ae),am=B(C,aC,M,a),aj=B(r,ay),o=B(Z),I=B(w),aB=B(h,ae),aG=B(h,ao);var k=ag.Component.create({NAME:O,ATTRS:{draggable:{value:true,validator:aw},label:{validator:aA},iconClass:{validator:aA},id:{value:ag.guid(),setter:"_setId",validator:aA},node:{valueFn:function(aK){var A=this;if(!U(aK)){aK=ag.Node.create(ag.Lang.sub(A.FIELD_ITEM_TEMPLATE,{iconClass:A.get(y)}));aK.setData(O,A);}return aK;},validator:U,writeOnce:true},type:{value:t,validator:aA}},EXTENDS:ag.Base,buildNodeId:function(A){return S+D+av+D+A;},getAvailableFieldById:function(A){return ag.AvailableField.getAvailableFieldByNode(j+ag.AvailableField.buildNodeId(A));},getAvailableFieldByNode:function(A){A=ag.one(A);if(U(A)){return A.getData(O);}return null;},prototype:{FIELD_ITEM_TEMPLATE:'<li class="'+ax+'">'+'<span class="'+[o,c].join(aH)+' {iconClass}"></span>'+'<div class="'+ac+'"></div>'+"</li>",initializer:function(){var A=this;var aK=A.get(t);A.after({draggableChange:A._afterDraggableChange,idChange:A._afterIdChange,labelChange:A._afterLabelChange});A.labelNode=aK.one(i+ac);A._uiSetDraggable(A.get(q));A._uiSetId(A.get(ap));A._uiSetLabel(A.get(ak));},_afterDraggableChange:function(aK){var A=this;A._uiSetDraggable(aK.newVal);},_afterIdChange:function(aK){var A=this;A._uiSetId(aK.newVal);},_afterLabelChange:function(aK){var A=this;A._uiSetLabel(aK.newVal);},_setId:function(A){return ag.AvailableField.buildNodeId(A);},_uiSetDraggable:function(aK){var A=this;A.get(t).toggleClass(l,aK);},_uiSetId:function(aK){var A=this;A.get(t).set(ap,aK);},_uiSetLabel:function(aK){var A=this;A.get(t).attr(al,aK);A.labelNode.setContent(aK);}}});ag.AvailableField=k;var V=function(){};V.ATTRS={fields:{value:[],setter:"_setFields",validator:function(A){return d(A)||L(A);}},maxFields:{value:Infinity,validator:N}};ag.mix(V.prototype,{_setFields:function(aK){var A=this;if(L(aK)){return aK;}else{return A.createFields(aK);}},_updateFields:function(aK){var A=this;A.set(v,aK);},addField:function(aL,aK){var A=this;if(A.get(v).size()<A.get(Q)){var aM=A.createField(aL);if(aM){A._updateFields(A.get(v).add(aM,aK));}return aM;}return null;},createFields:function(aL){var aK=this;var A=[];aJ.each(aL,function(aN,aM){if(aM<aK.get(Q)){A.push(aK.createField(aN));}});return new ag.ArrayList(A);},removeField:function(aK){var A=this;A._updateFields(A.get(v).remove(aK));},createField:function(A){return A;}});ag.FieldSupport=V;var az=ag.Component.create({NAME:an,ATTRS:{availableFields:{setter:"_setAvailableFields",validator:d},availableFieldsDragConfig:{value:null,setter:"_setAvailableFieldsDragConfig",validator:E},canvas:{valueFn:function(){return ag.Node.create(this.CANVAS_TEMPLATE);}},dropConfig:{value:null,setter:"_setDropConfig",validator:E},contentContainer:{valueFn:function(){return ag.Node.create(this.CONTENT_CONTAINER_TEMPLATE);}},dropContainer:{valueFn:function(){return ag.Node.create(this.DROP_CONTAINER_TEMPLATE);}},fieldsContainer:{valueFn:function(){return ag.Node.create(this.FIELDS_CONTAINER_TEMPLATE);}},propertyList:{setter:"_setPropertyList",validator:E,value:null},strings:{value:{addNode:"Add node",cancel:"Cancel",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},tabView:{setter:"_setTabView",validator:E,value:null,writeOnce:true},toolbar:{setter:"_setToolbar",validator:E,value:null},toolbarContainer:{valueFn:function(){return ag.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);}}},HTML_PARSER:{contentContainer:i+ah,dropContainer:i+F,fieldsContainer:i+Y,toolbarContainer:i+am,canvas:i+z},UI_ATTRS:[S,v],AUGMENTS:[ag.FieldSupport],prototype:{CONTENT_CONTAINER_TEMPLATE:'<div class="'+ah+'"></div>',DROP_CONTAINER_TEMPLATE:'<div class="'+F+'"></div>',TOOLBAR_CONTAINER_TEMPLATE:'<div class="'+am+'"></div>',FIELDS_CONTAINER_TEMPLATE:'<ul class="'+[Y,aj].join(aH)+'"></ul>',CANVAS_TEMPLATE:'<div tabindex="1" class="'+z+'"></div>',fieldsNode:null,propertyList:null,settingsNode:null,tabView:null,toolbar:null,initializer:function(){var A=this;A.publish({cancel:{defaultFn:A._defCancelFn}});A.after({render:A._afterRender,"model:change":A._afterModelChange});A.after(A._afterUiSetHeight,A,"_uiSetHeight");A.canvas=A.get(ad);A.contentContainer=A.get(e);A.dropContainer=A.get(aa);A.fieldsContainer=A.get(p);A.toolbarContainer=A.get(m);},isAvailableFieldsDrag:function(aL){var A=this;var aK=A.availableFieldsDrag;return(aL===aK.dd);},plotFields:function(){var aK=this;var A=aK.get(v);A.each(function(aL){aK.plotField(aL);});},renderUI:function(){var A=this;A._renderTabs();A._renderCanvas();A._uiSetAvailableFields(A.get(S));},syncUI:function(){var A=this;var aK=A.get(x);A._setupDrop();A._setupAvailableFieldsDrag();aK.addClass(I);},_afterActiveTabChange:function(aL){var A=this;var aK=aL.newVal.get(R);if(A.get(aD)&&(aK===A.settingsNode)){A._renderSettings();}},_afterModelChange:function(aK){var A=this;
A._handleSaveEvent();},_afterRender:function(aK){var A=this;A.plotFields();},_afterUiSetHeight:function(aK){var A=this;A.contentContainer.setStyle(au,N(aK)?aK+A.DEF_UNIT:aK);A.dropContainer.setStyle(au,N(aK)?aK+A.DEF_UNIT:aK);},_defCancelFn:function(aK){var A=this;A.tabView.selectTab(0);},_handleCancelEvent:function(){var A=this;A.fire(ab);},_handleSaveEvent:function(){var A=this;A.fire(ar);},_renderCanvas:function(){var A=this;var aK=A.get(x);var aL=A.canvas;var aM=A.contentContainer;var aN=A.dropContainer;if(!aL.inDoc()){aM.appendChild(aL);}if(!aN.inDoc()){aL.appendChild(aN);}if(aM.inDoc()){aM.get(g).append(aM);}else{aK.appendChild(aM);}},_renderPropertyList:function(){var A=this;if(!A.propertyList){A.propertyList=new ag.PropertyList(A.get(af)).render(A.settingsNode);A.propertyList.get(u).unselectable();}},_renderSettings:function(){var A=this;A._renderPropertyList();A._renderToolbar();},_renderTabs:function(){var A=this;if(!A.tabView){var aK=new ag.TabView(A.get(J));aK.get(u);A.tabView=aK;A.fieldsNode=aK.getTab(0).get(R);A.settingsNode=aK.getTab(1).get(R);}},_renderToolbar:function(){var A=this;if(!A.toolbar){A.toolbar=new ag.Toolbar(A.get(M)).render(A.settingsNode);}},_setupDrop:function(){var A=this;A.drop=new ag.DD.Drop(A.get(aq));},_setupAvailableFieldsDrag:function(){var A=this;A.availableFieldsDrag=new ag.DD.Delegate(A.get(aF));},_setAvailableFields:function(aL){var aK=this;var A=[];aJ.each(aL,function(aN,aM){A.push(G(aN)?aN:new ag.AvailableField(aN));});return A;},_setDropConfig:function(aK){var A=this;return ag.merge({bubbleTargets:A,groups:[S],node:A.dropContainer},aK||{});},_setAvailableFieldsDragConfig:function(aK){var A=this;return ag.merge({bubbleTargets:A,container:A.get(u),dragConfig:{groups:[S],plugins:[{cfg:{moveOnEnd:false},fn:ag.Plugin.DDProxy}]},nodes:i+l},aK||{});},_setPropertyList:function(aK){var A=this;return ag.merge({bubbleTargets:A,width:250,scroll:{height:400,width:aI}},aK);},_setTabView:function(aN){var aK=this;var aM=aK.get(u);var aO=aM.one(i+aG);var aL={after:{activeTabChange:ag.bind(aK._afterActiveTabChange,aK)},boundingBox:aM.one(i+at),contentBox:aM.one(i+T),bubbleTargets:aK,contentNode:aM.one(i+aB),cssClass:at,listNode:aO,render:aK.get(x)};if(!aO){var A=aK.getStrings();aL.items=[{cssClass:ai,label:A[n]},{cssClass:K,label:A[s]}];}return ag.merge(aL,aN);},_setToolbar:function(aL){var aK=this;var A=aK.getStrings();return ag.merge({activeState:false,bubbleTargets:aK,children:[{handler:ag.bind(aK._handleCancelEvent,aK),label:A[ab]}]},aL);},_uiSetAvailableFields:function(aM){var A=this;var aL=A.fieldsNode;if(aL){var aK=ag.getDoc().invoke(H);aJ.each(aM,function(aN){aK.appendChild(aN.get(t));});aL.setContent(A.fieldsContainer.setContent(aK));}},_uiSetFields:function(aK){var A=this;if(A.get(aD)){A.plotFields();}}}});ag.DiagramBuilderBase=az;},"1.7.0pr2",{skinnable:true,requires:["aui-tabs","aui-property-list","collection","dd"]});