/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.2
build: 3.7.2
*/
YUI.add("event-outside",function(e,t){var n=["blur","change","click","dblclick","focus","keydown","keypress","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","select","submit"];e.Event.defineOutside=function(t,n){n=n||t+"outside";var r={on:function(n,r,i){r.handle=e.one("doc").on(t,function(e){this.isOutside(n,e.target)&&(e.currentTarget=n,i.fire(e))},this)},detach:function(e,t,n){t.handle.detach()},delegate:function(n,r,i,s){r.handle=e.one("doc").delegate(t,function(e){this.isOutside(n,e.target)&&i.fire(e)},s,this)},isOutside:function(e,t){return t!==e&&!t.ancestor(function(t){return t===e})}};r.detachDelegate=r.detach,e.Event.define(n,r)},e.Array.each(n,function(t){e.Event.defineOutside(t)})},"3.7.2",{requires:["event-synthetic"]});
