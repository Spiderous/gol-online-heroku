(function(e){function t(t){for(var i,o,s=t[0],c=t[1],l=t[2],h=0,f=[];h<s.length;h++)o=s[h],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(f.length)f.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],i=!0,s=1;s<r.length;s++){var c=r[s];0!==a[c]&&(i=!1)}i&&(n.splice(t--,1),e=o(o.s=r[0]))}return e}var i={},a={app:0},n=[];function o(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=i,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(r,i,function(t){return e[t]}.bind(null,i));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},1:function(e,t){},1340:function(e,t,r){"use strict";var i=r("7851"),a=r.n(i);a.a},"5c0b":function(e,t,r){"use strict";var i=r("9c0c"),a=r.n(i);a.a},7851:function(e,t,r){},"9c0c":function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var i,a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},o=[],s=(r("5c0b"),r("2877")),c={},l=Object(s["a"])(c,n,o,!1,null,null,null),u=l.exports,h=r("8c4f"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"game"},[e.creatorOpen?r("section",{staticClass:"creator"},[r("h1",{staticClass:"creator-header"},[e._v("Kreator struktur")]),r("ul",{staticClass:"creator-grid"},e._l(e.patternCreator,(function(t,i){return r("ul",{key:i,staticClass:"grid-row"},e._l(e.patternCreator[i],(function(t,a){return r("ul",{key:a,staticClass:"grid-col"},[r("li",{staticClass:"grid-cell",class:e.patternCreator[i][a]?"activated":"",on:{click:function(t){return e.changeCreatorCellState(i,a)}}})])})),0)})),0),r("div",{staticClass:"creator-actions"},[r("button",{staticClass:"action_choose-pattern",on:{click:function(t){e.creatorOpen=!1,e.placingPattern=!0}}},[e._v("Dodaj strukturę")]),r("button",{staticClass:"action_close-creator",on:{click:function(t){e.creatorOpen=!1,e.placingPattern=!1}}},[e._v("Wyjdź z kreatora")])])]):e._e(),r("main",{staticClass:"main-content"},[r("div",{staticClass:"game-wrapper"},[r("div",{staticClass:"floating-actions"},[r("button",{staticClass:"action_open-creator",on:{click:function(t){e.creatorOpen=!e.creatorOpen}}},[e._v(e._s(e.creatorOpen?"Zamknij kreator":"Otwórz kreator"))])]),r("canvas",{ref:"canvas",on:{mousemove:e.mouseMove,click:e.canvasClick,mousedown:e.mouseDown,mouseup:e.mouseUp}})])])])},m=[],d=(r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3")),p=r("d4ec"),g=r("bee2"),v=r("99de"),C=r("7e84"),b=r("262e"),y=r("9ab4"),G=r("60a3"),k=r("8055"),O=r.n(k);function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){Object(d["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}(function(e){e[e["LOADING"]=0]="LOADING",e[e["PREPARED"]=1]="PREPARED",e[e["RUNNING"]=2]="RUNNING"})(i||(i={}));var x=function(e){function t(){var e;return Object(p["a"])(this,t),e=Object(v["a"])(this,Object(C["a"])(t).apply(this,arguments)),e.patternCreator=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],e.creatorOpen=!1,e.placingPattern=!1,e.gameState=i.LOADING,e.camera={offsetX:0,offsetY:0},e.mouseCursor={overCell:{col:-1,row:-1},clickPos:{x:0,y:0},dragging:!1},e.isDev=!1,e.devPort=2e3,e.canvasRatio=16/9,e}return Object(b["a"])(t,e),Object(g["a"])(t,[{key:"created",value:function(){this.socket=O()(this.isDev?"http://localhost:".concat(this.devPort):""),this.handleSocketConnection()}},{key:"mounted",value:function(){this.context=this.$refs.canvas.getContext("2d")}},{key:"handleSocketConnection",value:function(){var e=this;this.socket.on("init_pack",(function(t){e.gameGrid=w({},t),e.resizeCanvas(1e3,900),e.camera.offsetX=(e.context.canvas.width-e.gameGrid.dimensions.cols*e.gameGrid.cellSize)/2,e.camera.offsetY=(e.context.canvas.height-e.gameGrid.dimensions.rows*e.gameGrid.cellSize)/2,e.gameState=i.RUNNING,e.renderGame()})),this.socket.on("update_pack",(function(t){e.gameGrid.currentGen=t.currentGen,e.gameGrid.currentIteration=t.currentIteration}))}},{key:"resizeCanvas",value:function(e,t){this.canvasWidth=e,this.canvasHeight=t,this.context.canvas.width=this.canvasWidth,this.context.canvas.height=this.canvasHeight}},{key:"mouseMove",value:function(e){if(this.gameState==i.RUNNING){var t=this.context.canvas.getBoundingClientRect();this.mouseCursor.overCell.col=Math.floor((e.pageX-this.camera.offsetX-t.left)/this.gameGrid.cellSize),this.mouseCursor.overCell.row=Math.floor((e.pageY-this.camera.offsetY-t.top)/this.gameGrid.cellSize),this.mouseCursor.dragging&&(this.camera.offsetX=e.pageX-this.mouseCursor.clickPos.x,this.camera.offsetY=e.pageY-this.mouseCursor.clickPos.y)}}},{key:"mouseDown",value:function(e){this.gameState==i.RUNNING&&(this.placingPattern||(this.mouseCursor.clickPos.x=e.pageX-this.camera.offsetX,this.mouseCursor.clickPos.y=e.pageY-this.camera.offsetY,this.mouseCursor.dragging=!0))}},{key:"mouseUp",value:function(e){this.gameState==i.RUNNING&&(this.mouseCursor.dragging=!1)}},{key:"canvasClick",value:function(e){this.gameState==i.RUNNING&&!this.creatorOpen&&this.placingPattern&&(this.socket.emit("create_pattern",{pattern:this.patternCreator,offsetRow:this.mouseCursor.overCell.row-2,offsetCol:this.mouseCursor.overCell.col-2}),this.patternCreator=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],this.placingPattern=!1)}},{key:"changeCreatorCellState",value:function(e,t){this.gameState==i.RUNNING&&this.$set(this.patternCreator[e],t,this.patternCreator[e][t]?0:1)}},{key:"renderGame",value:function(){if(this.gameState==i.RUNNING){this.context.fillStyle="#333",this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight),this.context.save(),this.context.transform(1,0,0,1,this.camera.offsetX,this.camera.offsetY),this.context.lineWidth=1,this.context.strokeStyle="gray";for(var e=0;e<this.gameGrid.dimensions.cols;e++)for(var t=0;t<this.gameGrid.dimensions.rows;t++){var r=this.gameGrid.currentGen[e][t];this.context.fillStyle=r?"black":"white",this.context.fillRect(e*this.gameGrid.cellSize,t*this.gameGrid.cellSize,this.gameGrid.cellSize,this.gameGrid.cellSize),this.context.strokeRect(e*this.gameGrid.cellSize,t*this.gameGrid.cellSize,this.gameGrid.cellSize,this.gameGrid.cellSize)}var a=!1;if(this.placingPattern){this.context.fillStyle="green";for(var n=0;n<this.patternCreator.length;n++)for(var o=0;o<this.patternCreator.length;o++){var s=(this.mouseCursor.overCell.col+o-2)*this.gameGrid.cellSize,c=(this.mouseCursor.overCell.row+n-2)*this.gameGrid.cellSize;if(1==this.patternCreator[n][o]){if(c<0||c>=this.gameGrid.dimensions.gameHeight){a=!0;continue}if(s<0||s>=this.gameGrid.dimensions.gameWidth){a=!0;continue}this.context.fillRect(s,c,this.gameGrid.cellSize,this.gameGrid.cellSize)}}this.context.strokeStyle=a?"red":"black",this.context.lineWidth=2,this.context.strokeRect((this.mouseCursor.overCell.col-2)*this.gameGrid.cellSize,(this.mouseCursor.overCell.row-2)*this.gameGrid.cellSize,5*this.gameGrid.cellSize,5*this.gameGrid.cellSize)}this.context.restore(),requestAnimationFrame(this.renderGame)}else requestAnimationFrame(this.renderGame)}}]),t}(G["b"]);x=y["a"]([G["a"]],x);var P=x,j=P,N=(r("1340"),Object(s["a"])(j,f,m,!1,null,"8019a2ea",null)),z=N.exports;a["a"].use(h["a"]);var _=[{path:"/",name:"home",component:z}],R=new h["a"]({routes:_}),D=R,I=r("2f62");a["a"].use(I["a"]);var U=new I["a"].Store({state:{},mutations:{},actions:{},modules:{}});a["a"].config.productionTip=!1,new a["a"]({router:D,store:U,render:function(e){return e(u)}}).$mount("#app")}});
//# sourceMappingURL=app.0baf3ae7.js.map