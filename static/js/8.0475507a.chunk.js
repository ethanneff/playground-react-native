(window.webpackJsonpexample=window.webpackJsonpexample||[]).push([[8],{202:function(e,n,t){"use strict";var r=t(82),o={centroidDimension:function(e,n,t,r){var i=e.touchBank,a=0,u=0,s=1===e.numberActiveTouches?e.touchBank[e.indexOfSingleActiveTouch]:null;if(null!==s)s.touchActive&&s.currentTimeStamp>n&&(a+=r&&t?s.currentPageX:r&&!t?s.currentPageY:!r&&t?s.previousPageX:s.previousPageY,u=1);else for(var c=0;c<i.length;c++){var d=i[c];if(null!==d&&void 0!==d&&d.touchActive&&d.currentTimeStamp>=n){a+=r&&t?d.currentPageX:r&&!t?d.currentPageY:!r&&t?d.previousPageX:d.previousPageY,u++}}return u>0?a/u:o.noCentroid},currentCentroidXOfTouchesChangedAfter:function(e,n){return o.centroidDimension(e,n,!0,!0)},currentCentroidYOfTouchesChangedAfter:function(e,n){return o.centroidDimension(e,n,!1,!0)},previousCentroidXOfTouchesChangedAfter:function(e,n){return o.centroidDimension(e,n,!0,!1)},previousCentroidYOfTouchesChangedAfter:function(e,n){return o.centroidDimension(e,n,!1,!1)},currentCentroidX:function(e){return o.centroidDimension(e,0,!0,!0)},currentCentroidY:function(e){return o.centroidDimension(e,0,!1,!0)},noCentroid:-1},i=o,a=i.currentCentroidXOfTouchesChangedAfter,u=i.currentCentroidYOfTouchesChangedAfter,s=i.previousCentroidXOfTouchesChangedAfter,c=i.previousCentroidYOfTouchesChangedAfter,d=i.currentCentroidX,h=i.currentCentroidY,p={_initializeGestureState:function(e){e.moveX=0,e.moveY=0,e.x0=0,e.y0=0,e.dx=0,e.dy=0,e.vx=0,e.vy=0,e.numberActiveTouches=0,e._accountsForMovesUpTo=0},_updateGestureStateOnMove:function(e,n){e.numberActiveTouches=n.numberActiveTouches,e.moveX=a(n,e._accountsForMovesUpTo),e.moveY=u(n,e._accountsForMovesUpTo);var t=e._accountsForMovesUpTo,r=s(n,t),o=a(n,t),i=c(n,t),d=u(n,t),h=e.dx+(o-r),p=e.dy+(d-i),v=n.mostRecentTimeStamp-e._accountsForMovesUpTo;e.vx=(h-e.dx)/v,e.vy=(p-e.dy)/v,e.dx=h,e.dy=p,e._accountsForMovesUpTo=n.mostRecentTimeStamp},create:function(e){var n={handle:null},t={stateID:Math.random()};return p._initializeGestureState(t),{panHandlers:{onStartShouldSetResponder:function(n){return void 0!==e.onStartShouldSetPanResponder&&e.onStartShouldSetPanResponder(n,t)},onMoveShouldSetResponder:function(n){return void 0!==e.onMoveShouldSetPanResponder&&e.onMoveShouldSetPanResponder(n,t)},onStartShouldSetResponderCapture:function(n){return 1===n.nativeEvent.touches.length&&p._initializeGestureState(t),t.numberActiveTouches=n.touchHistory.numberActiveTouches,void 0!==e.onStartShouldSetPanResponderCapture&&e.onStartShouldSetPanResponderCapture(n,t)},onMoveShouldSetResponderCapture:function(n){var r=n.touchHistory;return t._accountsForMovesUpTo!==r.mostRecentTimeStamp&&(p._updateGestureStateOnMove(t,r),!!e.onMoveShouldSetPanResponderCapture&&e.onMoveShouldSetPanResponderCapture(n,t))},onResponderGrant:function(o){return n.handle||(n.handle=r.a.createInteractionHandle()),t.x0=d(o.touchHistory),t.y0=h(o.touchHistory),t.dx=0,t.dy=0,e.onPanResponderGrant&&e.onPanResponderGrant(o,t),void 0===e.onShouldBlockNativeResponder||e.onShouldBlockNativeResponder()},onResponderReject:function(r){v(n,e.onPanResponderReject,r,t)},onResponderRelease:function(r){v(n,e.onPanResponderRelease,r,t),p._initializeGestureState(t)},onResponderStart:function(n){var r=n.touchHistory;t.numberActiveTouches=r.numberActiveTouches,e.onPanResponderStart&&e.onPanResponderStart(n,t)},onResponderMove:function(n){var r=n.touchHistory;t._accountsForMovesUpTo!==r.mostRecentTimeStamp&&(p._updateGestureStateOnMove(t,r),e.onPanResponderMove&&e.onPanResponderMove(n,t))},onResponderEnd:function(r){var o=r.touchHistory;t.numberActiveTouches=o.numberActiveTouches,v(n,e.onPanResponderEnd,r,t)},onResponderTerminate:function(r){v(n,e.onPanResponderTerminate,r,t),p._initializeGestureState(t)},onResponderTerminationRequest:function(n){return void 0===e.onPanResponderTerminationRequest||e.onPanResponderTerminationRequest(n,t)}},getInteractionHandle:function(){return n.handle}}}};function v(e,n,t,o){e.handle&&(r.a.clearInteractionHandle(e.handle),e.handle=null),n&&n(t,o)}var l=p;n.a=l},234:function(e,n,t){"use strict";t.r(n);var r=t(21),o=t(22),i=t(24),a=t(23),u=t(25),s=t(1),c=t.n(s),d=t(6),h=t(202),p=t(68),v=t(38),l=t(69),f=t(18),m=function(){function e(){var n=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).minTouches,t=void 0===n?2:n;Object(r.a)(this,e),this.minTouches=void 0,this.finish={},this.start={},this.minTouches=t}return Object(o.a)(e,[{key:"onPanResponderMove",value:function(e){var n=this;e.nativeEvent.touches.forEach(function(e){n.recordFinish(e),n.recordStart(e)})}},{key:"onPanResponderRelease",value:function(){var e=this.determineOutcome();return this.start={},this.finish={},e}},{key:"recordStart",value:function(e){this.isStartAlreadyRecorded(e)||(this.start[String(e.identifier)]={x:e.locationX,y:e.locationY})}},{key:"isStartAlreadyRecorded",value:function(e){return this.start[String(e.identifier)]}},{key:"recordFinish",value:function(e){this.finish[String(e.identifier)]={x:e.locationX,y:e.locationY}}},{key:"isSpread",value:function(e,n,t){var r=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y),i=Math.abs(n.x-t.x),a=Math.abs(n.y-t.y);return r<=i&&o<=a}},{key:"determineCenter",value:function(e){for(var n=Object.keys(e).length,t=0,r=0,o=1;o<=n;o++){var i=e[o];t+=i.x,r+=i.x}return{x:t/n,y:r/n}}},{key:"determineOutcome",value:function(){var e=Object.keys(this.start).length,n={pinch:!1,spread:!1};if(e<this.minTouches)return n;for(var t=!1,r=!1,o=this.determineCenter(this.start),i=1;i<=e;i++){var a=this.start[i],u=this.finish[i],s=!this.isSpread(a,u,o),c=this.isSpread(a,u,o);if(s&&c)return n;if(!s&&!c)return n;if(s&&t)return n;if(c&&r)return n;r=s,t=c}return{spread:t,pinch:r}}}]),e}(),S=d.a.create({container:{flex:1}}),R=function(e){function n(e){var t;return Object(r.a)(this,n),(t=Object(i.a)(this,Object(a.a)(n).call(this,e))).state={pinchCount:0,spreadCount:0},t.panGesture=void 0,t.gestureHandler=void 0,t.minTouches=2,t.title="pinch or spread the screen with ".concat(t.minTouches," fingers minimum"),t.nav=function(e){return function(){return t.props.navigate(e)}},t.gestureHandler=new m({minTouches:t.minTouches}),t.panGesture=h.a.create({onMoveShouldSetPanResponderCapture:function(){return!0},onPanResponderMove:function(e){t.gestureHandler.onPanResponderMove(e)},onPanResponderRelease:function(){var e=t.state,n=e.spreadCount,r=e.pinchCount,o=t.gestureHandler.onPanResponderRelease();o.spread&&t.setState({spreadCount:n+1}),o.pinch&&t.setState({pinchCount:r+1})}}),t}return Object(u.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){var e=this.state,n=e.spreadCount,t=e.pinchCount;return c.a.createElement(l.g,{disableScroll:!0,onLeftPress:this.nav("debug")},c.a.createElement(l.h,{center:!0,title:this.title}),c.a.createElement(l.h,{center:!0,title:"spread: ".concat(n)}),c.a.createElement(l.h,{center:!0,title:"pinch: ".concat(t)}),c.a.createElement(p.a.View,Object.assign({style:S.container},this.panGesture.panHandlers)))}}]),n}(c.a.PureComponent),T={navigate:f.l};n.default=Object(v.b)(function(e){return{height:Object(f.h)(e),width:Object(f.j)(e)}},T)(R)}}]);
//# sourceMappingURL=8.0475507a.chunk.js.map