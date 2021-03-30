(this["webpackJsonppaint-builder"]=this["webpackJsonppaint-builder"]||[]).push([[5],{366:function(e,t,n){"use strict";t.a={getDifferenceFromToday:function(e){var t=(new Date).getTime()/1e3-new Date(e).getTime();if(t<60)return"".concat(Math.round(t)," seconds ago");var n=t/60;if(n<60)return"".concat(Math.round(n)," minutes ago");var c=n/60;if(c<24)return"".concat(Math.round(c)," hours ago");var r=c/24;return"".concat(Math.round(r)," days ago")},sortBy:function(e,t,n){var c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return e[n]>t[n]?c?-1:1:t[n]<e[n]?c?1:-1:0}}},710:function(e,t,n){"use strict";n.r(t);var c=n(358),r=n(0),o=n(36),i=n(13),a=n(320),l=n(78),j=n(31),u=n(322),s=n(318),d=n(712),b=n(701),O=n(702),f=n(704),h=n(6),p=Object(j.c)(s.a).withConfig({displayName:"ProjectSelectDialog__Button",componentId:"zubwo6-0"})(u.b),g=function(e){var t=e.onCreateProject,n=e.onOpenProject,c=e.onCancel,r=e.open;return Object(h.jsxs)(d.a,{"aria-labelledby":"project-select-title",open:r,children:[Object(h.jsx)(b.a,{id:"project-select-title",children:"Paint Builder"}),Object(h.jsx)(O.a,{dividers:!0,children:Object(h.jsxs)(a.a,{display:"flex",flexDirection:"column",children:[Object(h.jsx)(p,{onClick:t,color:"default",variant:"outlined",mb:1,children:"CREATE A NEW PAINT"}),Object(h.jsx)(p,{onClick:n,color:"default",variant:"outlined",children:"OPEN A PAINT BUILDER PROJECT"})]})}),Object(h.jsx)(f.a,{children:Object(h.jsx)(p,{onClick:c,color:"primary",children:"Cancel"})})]})},m=n(127),x=n(366),C=Object(j.c)(s.a).withConfig({displayName:"OpenProjectDialog__Button",componentId:"nso4l9-0"})(u.b),P=Object(j.c)(a.a).withConfig({displayName:"OpenProjectDialog__SchemeWrapper",componentId:"nso4l9-1"})(["cursor:pointer;padding:10px;:hover{background:rgba(255,255,255,0.1);}"]),y=function(e){var t=e.schemeList,n=e.onCreateProject,c=e.onOpenProject,r=e.onCancel,o=e.open;return Object(h.jsxs)(d.a,{"aria-labelledby":"project-select-title",open:o,children:[Object(h.jsx)(b.a,{id:"project-select-title",children:"Open a Paint Builder Project"}),Object(h.jsx)(O.a,{dividers:!0,children:Object(h.jsx)(a.a,{display:"flex",flexDirection:"column",children:t&&t.length?t.map((function(e){return Object(h.jsxs)(P,{onClick:function(){return c(e.id)},children:[Object(h.jsx)(m.a,{variant:"body1",children:e.name}),Object(h.jsxs)(m.a,{variant:"body2",children:["Last modified"," ",x.a.getDifferenceFromToday(e.date_modified)]})]},e.id)})):Object(h.jsx)(h.Fragment,{})})}),Object(h.jsxs)(f.a,{children:[Object(h.jsx)(C,{onClick:r,color:"primary",children:"Cancel"}),Object(h.jsx)(C,{onClick:n,color:"default",variant:"outlined",mb:1,children:"NEW"})]})]})},v=n(25),D=n(17),k=n(684),w=n(711),E=Object(j.c)(s.a).withConfig({displayName:"CreateProjectDialog__Button",componentId:"e1fbbf-0"})(u.b),_=function(e){var t=Object(r.useState)(null),n=Object(c.a)(t,2),o=n[0],i=n[1],a=e.onContinue,l=e.onCancel,j=e.open,u=e.carMakeList,s=Object(D.a)(u).sort((function(e,t){return x.a.sortBy(e,t,"name")})).sort((function(e,t){return x.a.sortBy(e,t,"car_type")}));return Object(h.jsxs)(d.a,{"aria-labelledby":"project-select-title",open:j,children:[Object(h.jsx)(b.a,{id:"project-select-title",children:"Create a new paint"}),Object(h.jsx)(O.a,{dividers:!0,children:u&&u.length?Object(h.jsx)(w.a,{id:"car-make-select",options:s,groupBy:function(e){return e.car_type},getOptionLabel:function(e){return e.name},style:{width:500},onChange:function(e,t){i(t)},renderInput:function(e){return Object(h.jsx)(k.a,Object(v.a)(Object(v.a)({},e),{},{label:"SELECT VEHICLE",variant:"outlined"}))}}):Object(h.jsx)(h.Fragment,{})}),Object(h.jsxs)(f.a,{children:[Object(h.jsx)(E,{onClick:l,color:"primary",children:"Cancel"}),Object(h.jsx)(E,{onClick:function(){return a(o)},color:"default",variant:"outlined",mb:1,children:"Continue"})]})]})},B=n(133),I=n(64);t.default=function(){var e=Object(o.d)(),t=Object(i.f)(),n=Object(r.useState)("ProjectSelectDialog"),j=Object(c.a)(n,2),u=j[0],s=j[1],d=Object(o.e)((function(e){return e.authReducer.user})),b=Object(o.e)((function(e){return e.carMakeReducer.list})),O=Object(o.e)((function(e){return e.schemeReducer.list})),f=Object(o.e)((function(e){return e.schemeReducer.current})),p=Object(o.e)((function(e){return e.schemeReducer.loading})),m=Object(o.e)((function(e){return e.carMakeReducer.loading}));Object(r.useEffect)((function(){d&&(O.length||e(Object(B.f)(d.id)),b.length||e(Object(I.b)()))}),[d]),Object(r.useEffect)((function(){f&&t.push("/scheme/".concat(f.id))}),[f]);return Object(h.jsx)(a.a,{width:"100%",height:"100%",display:"flex",flexDirection:"column",children:p||m||!O||!b?Object(h.jsx)(l.a,{}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(g,{open:"ProjectSelectDialog"===u,onCreateProject:function(){return s("CreateProjectDialog")},onOpenProject:function(){return s("OpenProjectDialog")},onCancel:function(){return s(null)}}),Object(h.jsx)(y,{schemeList:O,open:"OpenProjectDialog"===u,onCreateProject:function(){return s("CreateProjectDialog")},onOpenProject:function(t){return n=t,console.log("Opening scheme: ",n),e(Object(B.e)(n)),void s(null);var n},onCancel:function(){return s("ProjectSelectDialog")}}),Object(h.jsx)(_,{carMakeList:b,open:"CreateProjectDialog"===u,onContinue:function(t){return function(t){console.log("Creating scheme with carmake: ",t),e(Object(B.c)(t,d.id)),s(null)}(t)},onCancel:function(){return s("ProjectSelectDialog")}})]})})}}}]);
//# sourceMappingURL=5.734db797.chunk.js.map