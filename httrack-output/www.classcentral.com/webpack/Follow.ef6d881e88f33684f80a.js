"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8535],{9627:function(t,n,e){e.r(n),e.d(n,{default:function(){return i}});var a=e(9894),o=e(5982),c=e(3443),l=e(8785),i=t=>{switch(t.name){case"click:FOLLOW":case"click:UNFOLLOW":{const n=parseInt(t.detail.id,10),e=parseInt(t.detail.count,10)+(t.name.match(/UNFOLLOW/)?-1:1),i=t.detail.hideCountOnFollowed||!1,s=t.detail.cmptId||!1;if(!(0,a.y0)().user.loggedIn)return void(0,o.W)("signup","SIGNUP_INTENT",{returnToPage:!0,source:"follow"});window.CC.trackGA([{category:"Follow",action:"Logged in",label:t.detail.name},{category:"Follow Button With Count",action:"Logged in",label:t.detail.name}]),(0,l.Z)("FOLLOWS/".concat(t.name.match(/UNFOLLOW/)?"REMOVE":"ADD"),{parameters:{name:t.detail.name,id:n}}),(0,a.sY)("follow-".concat(t.detail.name,"-").concat(n).concat(s?"-".concat(s):""),(t=>{let{following:n,cmptId:e,hideCountOnFollowed:a,size:o,id:l,name:i,count:s}=t;return'<button\n    class="btn-blue btn-'.concat(o," ").concat(n?"icon-left-small icon-checkmark-white":"",'"\n    data-name="').concat(n?"UNFOLLOW":"FOLLOW",'"\n    data-detail=\'{\n      "id": "').concat(l,'",\n      ').concat(e?'"cmptId": "'.concat(e,'",'):"",'\n      "name": "').concat(i,'",\n      "count": ').concat(s,',\n      "size": "').concat(o,'",\n      "hideCountOnFollowed": ').concat(a,"\n    }'\n  >\n     ").concat(n?"Following":"Follow","\n    ").concat(a&&n?"":'<span class="cmpt-follow-count bg-blue-black radius-small padding-horz-xxsmall margin-left-xsmall">'.concat((0,c.uf)(s).shortHand,"</span>"),"\n  </button>\n  ")})({following:!t.name.match(/UNFOLLOW/),id:n,cmptId:s,hideCountOnFollowed:i,size:t.detail.size,name:t.detail.name,count:e<=0?0:e})),t.originalEvent.stopPropagation();break}case"mouseenter:FOLLOW_ROW":{const n=t.target.querySelector("[data-offset-src]"),e=n.offsetLeft;(0,c.cn)("invisible",n),t.target.querySelector("[data-offset-target]").style.left="".concat(e,"px");break}case"mouseleave:FOLLOW_ROW":{const n=t.target.querySelector("[data-offset-src]");(0,c.IV)("invisible",n);break}}}}}]);