AUI.add("aui-event-input",function(c){var g=c.Lang,b=g.isFunction,h="activeElement",a="ownerDocument",e=c.UA,d=c.config.doc,f=d&&d.implementation,j=f&&(!f.hasFeature("Events","2.0"));var i={on:function(n,m,l){var o="input";if(!/chrome/i.test(e.agent)&&e.webkit&&e.version.major<=2){o="keypress";}else{if(e.ie&&j){o="propertychange";}}var k=function(s){var q=this;var r=s.target;var p=s._event;if(s.type=="propertychange"){if(p&&(p.propertyName!="value")){return false;}}var t=(r.get(a).get(h)==r);if(t&&b(m)){m.apply(q,arguments);}};return c.Event.attach(o,k,l);}};c.Env.evt.plugins.input=i;if(c.Node){c.Node.DOM_EVENTS.input=i;}},"1.7.0pr2",{requires:["aui-base"]});