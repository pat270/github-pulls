/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.2
build: 3.7.2
*/
YUI.add("editor-para-base",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host",i="body",s="nodeChange",o="parentNode",u=i+" > p",a="p",f="<br>",l="firstChild",c="li";e.extend(n,e.Base,{_fixFirstPara:function(){var e=this.get(r),t=e.getInstance(),n,i,s=t.config.doc.body,o=s.innerHTML,l=o.length?!0:!1;o===f&&(o="",l=!1),s.innerHTML="<"+a+">"+o+t.EditorSelection.CURSOR+"</"+a+">",i=t.one(u),n=new t.EditorSelection,n.selectNode(i,!0,l)},_afterEditorReady:function(){var e=this.get(r),t=e.getInstance(),n;t&&(t.EditorSelection.filterBlocks(),n=t.EditorSelection.DEFAULT_BLOCK_TAG,u=i+" > "+n,a=n)},_afterContentChange:function(){var e=this.get(r),t=e.getInstance();t&&t.EditorSelection&&t.EditorSelection.filterBlocks()},_afterPaste:function(){var t=this.get(r),n=t.getInstance(),i=new n.EditorSelection;e.later(50,t,function(){n.EditorSelection.filterBlocks()})},initializer:function(){var t=this.get(r);if(t.editorBR){e.error("Can not plug EditorPara and EditorBR at the same time.");return}t.after("ready",e.bind(this._afterEditorReady,this)),t.after("contentChange",e.bind(this._afterContentChange,this)),e.Env.webkit&&t.after("dom:paste",e.bind(this._afterPaste,this))}},{NAME:"editorParaBase",NS:"editorParaBase",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorParaBase=n},"3.7.2",{requires:["editor-base"]});
