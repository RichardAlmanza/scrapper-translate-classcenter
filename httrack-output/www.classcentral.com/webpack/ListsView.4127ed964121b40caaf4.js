"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6352],{6115:function(c,e,n){n.r(e);var o=n(3443);e.default=c=>{switch(c.name){case"click:SECTION_TOGGLE_ALL":{const e=document.querySelectorAll(".cmpt-list-section"),n=document.querySelectorAll('[data-name="SECTION_TOGGLE"]'),t=c.target;t.classList.contains("icon-circle-chevron-right")?((0,o.IV)("hidden",e),(0,o.cn)("animate-expand",e),(0,o.IV)("icon-circle-chevron-right",t),(0,o.cn)("icon-circle-chevron-down",t),(0,o.IV)("icon-chevron-right-charcoal",n),(0,o.cn)("icon-chevron-down-charcoal",n),t.textContent="Collapse All",setTimeout((()=>{(0,o.IV)("animate-expand",e)}),300)):((0,o.cn)("animate-collapse",e),setTimeout((()=>{(0,o.IV)("animate-collapse",e),(0,o.cn)("hidden",e)}),300),(0,o.IV)("icon-circle-chevron-down",t),(0,o.cn)("icon-circle-chevron-right",t),(0,o.IV)("icon-chevron-down-charcoal",n),(0,o.cn)("icon-chevron-right-charcoal",n),t.textContent="Expand All");break}case"click:SECTION_TOGGLE":{const e=document.querySelector(".cmpt-list-section-".concat(c.detail.id)),n=document.querySelector(".cmpt-list-toggle-".concat(c.detail.id));e.classList.contains("hidden")?((0,o.IV)("hidden",e),(0,o.cn)("animate-expand",e),(0,o.IV)("icon-chevron-right-charcoal",n),(0,o.cn)("icon-chevron-down-charcoal",n),setTimeout((()=>{(0,o.IV)("animate-expand",e)}),300)):((0,o.cn)("animate-collapse",e),setTimeout((()=>{(0,o.IV)("animate-collapse",e),(0,o.cn)("hidden",e)}),300),(0,o.IV)("icon-chevron-down-charcoal",n),(0,o.cn)("icon-chevron-right-charcoal",n));break}}}}}]);