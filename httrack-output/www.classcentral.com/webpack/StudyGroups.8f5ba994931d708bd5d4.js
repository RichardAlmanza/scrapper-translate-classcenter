"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2941],{1029:function(e,a){a.Z=e=>{let{content:a,style:n,id:t=""}=e;return'\n  <div class="cmpt-modal active">\n    <div data-name="MODAL_CLOSE" data-detail=\'{ "id": "'.concat(t,'" }\' class="cmpt-modal-blanket scrollable-y z-top border-box fixed top left height-100 padding-small large-up-padding-xlarge width-100">\n      <div class="cmpt-modal-container bg-white radius border-box width-centered width-100 relative" style="min-width: auto; max-width: ').concat(n.width,'px;">\n        <button\n          data-name="MODAL_CLOSE" \n          data-detail=\'{ "close": true }\'\n          class="radius-circle scale-on-hover bg-gray-light z-force-top absolute top right margin-vert-xsmall margin-horz-xsmall"\n        >\n          <span class="margin-xsmall icon-center icon-x-charcoal icon-small">Close</span>\n        </button>\n        <div data-template="modal-content" style="min-height: ').concat(isNaN(n.height)?n.height:"".concat(n.height,"px"),';">\n          ').concat(a,"\n        </div>\n      </div>      \n    </div>\n  </div>\n")}},4079:function(e,a,n){var t=n(8117),s=n(6848);a.Z=e=>'\n<div class="padding-medium">\n  <h3 class="head-3">Verify your email address</h3>\n  <p class="margin-vert-small line-tight">\n    '.concat(e.message?e.message:"To complete your profile and make use of all Class Central features, you’ll need to verify your email address.","    \n  </p>\n  ").concat(e.error?(0,s.Z)({type:"error",message:e.error}):"","\n  ").concat(e.sent?(0,s.Z)({type:"success",message:"A verification link has been sent to your email account. Please click on the link in the email to verify your address."}):"","\n  ").concat(e.error||e.sent?"":'\n    <form data-name="RESEND_EMAIL_VERIFICATION" class="bg-blue-xlight radius-small border-all border-blue-light padding-small text-center line-tight">\n      <p class="margin-bottom-small">If your verification email has expired or you need us to send it again, click below.</p>\n      '.concat((0,t.Z)({size:"medium",label:"Resend Verification Email",isLoading:e.isLoading}),"\n    </form>"),"\n</div>\n")},8117:function(e,a){a.Z=e=>'\n  <button\n    class="'.concat(e.isLoading?" processing ":"").concat(e.style?e.style:"btn-blue"," btn-").concat(e.size||"large",' relative"\n    type="').concat(e.type?e.type:"submit",'"').concat(e.isLoading?" disabled":"","\n  >\n    ").concat(e.isLoading?'<span\n        class="loader-bars '.concat(e.loaderStyle?e.loaderStyle:"loader-white",' loader-small absolute"\n        style="left: 50%; margin-left: -2.5px;"\n      ></span>\n      <span class="invisible">').concat(e.label,"</span>"):e.label,"\n  </button>\n")},3442:function(e,a,n){n.r(a);var t=n(9894),s=n(5982),l=n(3443),i=n(8785),o=n(1029),r=n(4079);a.default=e=>{switch(e.name){case"click:STUDY_GROUP_ENROLL":if(e.originalEvent.preventDefault(),!(0,t.y0)().user.loggedIn)return void(0,s.W)("signup","SIGNUP_INTENT",{returnToPage:!0,skipOnboarding:!0,source:"study group"});(0,l.cn)("processing",e.target),(0,t.sY)("sg-join",'\n        <span class="processing">\n          <span class="loader-bars loader-white loader-small absolute" style="top: 23px; left: 50%; margin-left: -2.5px;"></span>\n          <span class="text-1 weight-bold invisible">Enroll</span>\n        </span>\n      '),(0,i.Z)("STUDY_GROUP/ENROLL",{parameters:e.detail,context:{btn:e.target,redirect:e.detail.redirect}});break;case"request:STUDY_GROUP/ENROLL_ERROR":var a;(0,l.IV)("processing",e.detail.context.btn),(0,t.sY)("sg-join",'<span class="text-1 weight-bold">Enroll</span>'),401===(null===(a=e.detail.json)||void 0===a?void 0:a.statusCode)&&"User Email Verification is Pending"===e.detail.json.message?((0,t.IW)({onboarding:{...(0,t.y0)().onboarding,verifyEmailMessage:"To enroll in a Study Group and make use of all Class Central features, you’ll need to verify your email address."}}),(0,t.sY)("modal",(0,o.Z)({content:(0,r.Z)({message:"To enroll in a Study Group and make use of all Class Central features, you’ll need to verify your email address."}),style:{width:400,height:230}}))):e.detail.json&&(0,s.W)("notification","SHOW",{title:"Our apologies",body:"There was an error on our end. Please try again.",type:"error",delay:1e4});break;case"request:STUDY_GROUP/ENROLL_SUCCESS":window.addEventListener("unload",(()=>{(0,l.IV)("processing",e.detail.context.btn),(0,t.sY)("sg-join",'<span class="text-1 weight-bold">Enroll</span>')})),window.location.href=e.detail.context.redirect}}}}]);