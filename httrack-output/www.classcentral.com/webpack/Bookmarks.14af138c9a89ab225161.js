(self.webpackChunk=self.webpackChunk||[]).push([[2427],{6491:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return p}});var a=e(9894),c=e(5982),o=e(3443),i=t=>"<button\n    ".concat(t.disabled?"disabled":"","\n    ").concat(t.loggedIn?'\n      data-detail=\'{\n        "size": "'.concat(t.size,'",\n        "type": "').concat(t.type,'",\n        "id": ').concat(t.id).concat(t.count?', "count": '.concat(t.count):"","}'\n      data-name=\"BOOKMARK_").concat(t.saved["".concat(t.type,"s")].includes(t.id)?"REMOVE":"ADD",'"\n    '):'data-name="BOOKMARK_ADD"','\n  >\n    <i class="').concat(t.saved["".concat(t.type,"s")].includes(t.id)?"icon-bookmarked":"icon-bookmark"," icon-").concat(t.size,'"></i>\n  </button>\n  ').concat(t.count?'<strong class="cmpt-bookmark-count text-3 weight-semi hidden medium-up-inline-block">'.concat((0,o.uf)(t.count).shortHand,"</strong>"):"","\n  "),r=e(7078),s=e.n(r),u=e(8785);const d=()=>(0,a.y0)().saved,l=t=>(0,a.IW)({saved:{...d(),...t}});l(window.CC.data.saved);var p=t=>{switch(t.name){case"click:BOOKMARK_ADD":{if(t.target.disabled)return;t.originalEvent.preventDefault();const n=parseInt(t.detail.id,10),e=t.detail.type,o=d();if(!(0,a.y0)().user.loggedIn)return void(0,c.W)("signup","SIGNUP_INTENT",{returnToPage:!0,source:"save course"});(0,u.Z)("SAVED/ADD",{parameters:{...t.detail,count:t.detail.count?t.detail.count+1:null}}),!o["".concat(e,"s")].includes(n)&&o["".concat(e,"s")].push(n),l(o),(0,a.sY)("bookmark-".concat(e,"-").concat(n),i({disabled:!0,size:t.detail.size,count:t.detail.count?t.detail.count+1:null,id:n,type:e,loggedIn:(0,a.y0)().user.loggedIn,saved:o}));break}case"click:BOOKMARK_REMOVE":{if(t.target.disabled)return;const n=parseInt(t.detail.id,10),e=t.detail.type,c=d();(0,u.Z)("SAVED/REMOVE",{parameters:{...t.detail,count:t.detail.count?t.detail.count-1:null}}),c["".concat(e,"s")].includes(n)&&s()(c["".concat(e,"s")],(t=>t===n)),l(c),(0,a.sY)("bookmark-".concat(e,"-").concat(n),i({disabled:!0,size:t.detail.size,count:t.detail.count?t.detail.count-1:null,id:n,type:e,loggedIn:(0,a.y0)().user.loggedIn,saved:c}));break}case"request:SAVED/ADD_SUCCESS":case"request:SAVED/REMOVE_SUCCESS":case"request:SAVED/ADD_ERROR":case"request:SAVED/REMOVE_ERROR":{const{id:n,type:e,count:c,size:o}=t.detail.originalParameters;(0,a.sY)("bookmark-".concat(e,"-").concat(n),i({disabled:!1,size:o,count:c,id:parseInt(n,10),type:e,loggedIn:(0,a.y0)().user.loggedIn,saved:d()}));break}}}},4146:function(t,n,e){var a=e(830),c=e(2383),o=Array.prototype.splice;t.exports=function(t,n){for(var e=t?n.length:0,i=e-1;e--;){var r=n[e];if(e==i||r!==s){var s=r;c(r)?o.call(t,r,1):a(t,r)}}return t}},5733:function(t){t.exports=function(t,n,e){var a=-1,c=t.length;n<0&&(n=-n>c?0:c+n),(e=e>c?c:e)<0&&(e+=c),c=n>e?0:e-n>>>0,n>>>=0;for(var o=Array(c);++a<c;)o[a]=t[a+n];return o}},830:function(t,n,e){var a=e(6747),c=e(1159),o=e(4373),i=e(7948);t.exports=function(t,n){return n=a(n,t),null==(t=o(t,n))||delete t[i(c(n))]}},4373:function(t,n,e){var a=e(9867),c=e(5733);t.exports=function(t,n){return n.length<2?t:a(t,c(n,0,-1))}},1159:function(t){t.exports=function(t){var n=null==t?0:t.length;return n?t[n-1]:void 0}},7078:function(t,n,e){var a=e(9278),c=e(4146);t.exports=function(t,n){var e=[];if(!t||!t.length)return e;var o=-1,i=[],r=t.length;for(n=a(n,3);++o<r;){var s=t[o];n(s,o,t)&&(e.push(s),i.push(o))}return c(t,i),e}}}]);