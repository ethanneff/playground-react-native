(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[30],{222:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n(52),o=n(178),c=n(1),i=n.n(c),l=n(177),d=n(38),s=n(7),u=n(220),m=n(174),f=n(13),b=n(197),h=n(6),p=Object(c.memo)(function(e){var t=e.item;return i.a.createElement(f.a,{style:{alignItems:"center",borderTopColor:"grey",borderTopWidth:1,flexDirection:"row",justifyContent:"center",marginTop:h.b.padding.p02,padding:h.b.padding.p02}},i.a.createElement(l.h,{h3:!0,title:t.dayOfMonth}),i.a.createElement(l.h,{overline:!0,title:" ".concat(t.month,", ").concat(t.dayOfWeek)}))}),g=Object(c.memo)(function(e){var t=e.showSection,n=e.item,r=e.onItemPress,a=e.currentItem,o=Object(d.a)(),c=n.id>Date.now(),s=c?o.secondary:o.success,u=a?"current":c?"future":n.action;return i.a.createElement(f.a,{style:{borderColor:a?o.primary:o.background,borderLeftWidth:h.b.padding.p01,flex:1}},i.a.createElement(b.a,{style:{flex:1,flexDirection:"row",height:h.b.padding.p10,paddingHorizontal:h.b.padding.p04,paddingVertical:h.b.padding.p02},onPress:function(){return r(n)},disabled:c},i.a.createElement(f.a,{style:{flexDirection:"row",width:h.b.padding.p20}},i.a.createElement(l.e,{name:c?"cancel":"checkbox-blank-circle",size:14,color:s,style:{paddingRight:h.b.padding.p01}}),i.a.createElement(l.h,{title:"".concat(n.hour," ").concat(n.zone)})),i.a.createElement(l.h,{style:{color:o.secondary,flex:1},title:u,body1:!0,numberOfLines:1,ellipsizeMode:l.d.Tail})),t&&i.a.createElement(p,{item:n}))}),O=n(179),y=n.n(O),E=h.b.padding.p10,j=y()().startOf("day").add(2,"day").diff(y()(),"hour")-4,v=function(e,t){return{length:E,offset:E*t,index:t}},w=function(e){var t=new Date,n=t.setHours(t.getHours()-1),r=t.setHours(t.getHours()+1);return e.id>n&&e.id<r},P=function(e,t,n){return!(e<1)&&t.dayOfMonth!==n[e-1].dayOfMonth},I=function(e){return String(e.id)},S=Object(c.memo)(function(e){var t=e.items,n=e.onItemPress,r=e.onEndReached,a=e.onEndReachedThreshold,l=Object(c.useState)(!0),d=Object(o.a)(l,2),f=d[0],b=d[1],h=s.a.create({list:{opacity:f?0:1},loading:{position:"absolute",height:"100%",width:"100%"}});return Object(c.useEffect)(function(){setTimeout(function(){b(!1)},300)},[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{style:h.list,inverted:!0,initialScrollIndex:j,getItemLayout:v,keyExtractor:I,data:t,onEndReached:r,onEndReachedThreshold:a,renderItem:function(e){var r=e.item,a=e.index;return i.a.createElement(g,{currentItem:w(r),item:r,showSection:P(a,r,t),onItemPress:n})}}),f&&i.a.createElement(m.a,{size:"large",style:h.loading}))});function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}n.d(t,"default",function(){return M});var x=100,D={visible:!1,item:null};function M(){var e=Object(c.useState)(D),t=Object(o.a)(e,2),n=t[0],s=t[1],u=Object(c.useState)(!1),m=Object(o.a)(u,1)[0],f=Object(c.useState)(!1),b=Object(o.a)(f,1)[0],h=Object(c.useState)([]),p=Object(o.a)(h,2),g=p[0],O=p[1],E=Object(d.c)(),j=function(){for(var e=Object(a.a)(g),t=0;t<x;t++){var n=0===e.length?y()().startOf("day").add(2,"day").valueOf():e[e.length-1].id,r=y()(n).subtract(1,"hour"),o=r.valueOf();e.push({action:String(Math.random())+String(Math.random()),dayOfMonth:r.format("D"),dayOfWeek:r.format("ddd"),hour:r.format("h"),id:o,month:r.format("MMM"),zone:r.format("a")})}O(e)},v=Object(c.useCallback)(function(){s(function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach(function(t){Object(r.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e,{visible:!1})})},[]);return Object(c.useEffect)(function(){g.length>0||j()},[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(l.g,{disableScroll:!0,onLeftPress:E.to("portfolioLanding"),title:"Focus"},g.length>0&&i.a.createElement(S,{items:g,onItemPress:function(e){s({visible:!0,item:e})},onEndReached:j,onEndReachedThreshold:.5})),n.visible&&i.a.createElement(l.c,{duration:2e3,testID:"editItem",title:n.item?n.item.action:"empty",onBackgroundPress:v}),m&&i.a.createElement(l.c,{testID:"editItem",title:"hello",onBackgroundPress:v}),b&&i.a.createElement(l.c,{testID:"editItem",title:"hello",onBackgroundPress:v}))}}}]);
//# sourceMappingURL=30.05954c65.chunk.js.map