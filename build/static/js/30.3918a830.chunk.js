(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[30],{1067:function(t,e,n){"use strict";n.r(e);var a=n(78),c=n.n(a),r=n(18),o=n(110),i=n(733),s=n(1),u=n.n(s),d=n(740),l=(n(855),n(51)),p=n(856),f=n(788),j=n(861),b=n(1059),O=n(1078),m=n(1051),g=n(891),h=n(87),x=n(194),v=n(793),y=n(193),k=n(757),I=n(19);e.default=Object(y.b)()((function(t){var e,n=t.t,a=Object(h.c)((function(t){return t})).categories,y=Object(s.useState)({page:1,limit:10}),S=Object(i.a)(y,2),N=S[0],w=S[1],z=Object(s.useState)(),D=Object(i.a)(z,2),F=D[0],E=D[1],L=[{title:n("ID"),dataIndex:"key"},{title:n("Name"),dataIndex:"name",render:function(t){return Object(I.jsx)(I.Fragment,{children:t})}},{title:n("Price"),dataIndex:"price",render:function(t){return Object(I.jsx)(I.Fragment,{children:k.a.formatVND(t||0)})},sorter:function(t,e){return t.price-e.price},sortDirections:["ascend","descend","ascend"],defaultSortOrder:"ascend"},{title:n("Category"),dataIndex:"category",render:function(t){return Object(I.jsx)(I.Fragment,{children:t.map((function(t){return t.name})).join(", ")})}},{title:n("Status"),dataIndex:"status",render:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=l.d.pros.filter((function(e){return e.id==t}))[0].color,n=l.d.pros.filter((function(e){return e.id==t}))[0].name;return Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(f.a,{color:e,children:n},n)})},sorter:function(t,e){return t.status-e.status},sortDirections:["ascend","descend","ascend"],defaultSortOrder:"ascend"},{title:n("Image"),dataIndex:"image",render:function(t){return Object(I.jsx)(p.LazyLoadImage,{src:t,alt:"product-img",style:{width:"64px"}})}},{title:n("Action"),dataIndex:"_id",render:function(t){return Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(j.b,{size:"middle",children:Object(I.jsx)(x.b,{to:"/products/".concat(t),children:n("Detail")})})})}}],C=function(){var t=Object(o.a)(c.a.mark((function t(e){var a,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(v.c)(N,"all"==e?null:e);case 2:200==(null===(a=t.sent)||void 0===a?void 0:a.status)||204==(null===a||void 0===a?void 0:a.status)?(o=1,0==Object.keys(a).length?(E([]),w(Object(r.a)(Object(r.a)({},N),{},{total:0,pageSize:N.limit}))):(a.data.data.forEach((function(t){t.key=o++})),E(a.data.data),w(Object(r.a)(Object(r.a)({},N),{},{total:a.data.paginationInfo.total})))):b.a.error({message:n("Notification"),description:"".concat(a.message||"Get list product error!"),placement:"bottomRight",duration:1.5});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),P=function(t,e,a){var c=t.pageSize*(t.current-1)+1;Object(v.d)(Object(r.a)(Object(r.a)({},t),{},{page:t.current}),null,(function(e){200==e.status||204==(null===e||void 0===e?void 0:e.status)?0==Object.keys(e).length?(E([]),w(Object(r.a)(Object(r.a)({},t),{},{total:0,pageSize:t.limit}))):(e.data.data.forEach((function(t){t.key=c++})),E(e.data.data),w(Object(r.a)(Object(r.a)({},t),{},{total:e.data.paginationInfo.total,pageSize:e.data.paginationInfo.limit}))):b.a.error({message:n("Notification"),description:"".concat(e.message),placement:"bottomRight",duration:1.5})}))};return Object(s.useEffect)((function(){Object(v.d)(N,null,(function(t){if(200==t.status||204==t.status){var e=1;0==Object.keys(t).length?(E([]),w(Object(r.a)(Object(r.a)({},N),{},{total:0,pageSize:N.limit}))):(t.data.data.forEach((function(t){t.key=e++})),E(t.data.data),w(Object(r.a)(Object(r.a)({},N),{},{total:t.data.paginationInfo.total,pageSize:t.data.paginationInfo.limit})))}else b.a.error({message:n("Notification"),description:"".concat(t.message),placement:"bottomRight",duration:1.5})}))}),[a]),Object(I.jsx)(d.E,{children:Object(I.jsx)(d.j,{xs:"12",md:"12",className:"mb-4",children:Object(I.jsxs)(d.f,{children:[Object(I.jsx)(d.i,{children:n("List Products")}),Object(I.jsx)(d.g,{children:Object(I.jsxs)(O.a,{onChange:C,children:[Object(I.jsx)(O.a.TabPane,{tab:"ALL",children:Object(I.jsx)(m.a,{className:"overflow-auto",columns:L,dataSource:F,pagination:N,onChange:P})},"all"),(null===(e=Object.keys(a))||void 0===e?void 0:e.length)>0?Object(I.jsx)(I.Fragment,{children:a.map((function(t,e){return Object(I.jsx)(O.a.TabPane,{tab:null===t||void 0===t?void 0:t.name,children:Object(I.jsx)(u.a.Suspense,{fallback:Object(I.jsx)("div",{className:"d-flex justify-content-center",children:Object(I.jsx)(g.a,{})}),children:Object(I.jsx)(m.a,{className:"overflow-auto",columns:L,dataSource:F,pagination:N,onChange:P})})},null===t||void 0===t?void 0:t._id)}))}):Object(I.jsx)(I.Fragment,{})]})})]})})})}))},757:function(t,e,n){"use strict";var a=n(729),c=n(730),r=function(){function t(){Object(a.a)(this,t)}return Object(c.a)(t,[{key:"formatData",value:function(t){return Object.keys(t).forEach((function(e){isNaN(t[e])||(t[e]=parseFloat(t[e]))})),t}},{key:"formatVND",value:function(t){return t.toLocaleString("it-IT",{style:"currency",currency:"USD"})}}]),t}();e.a=new r},793:function(t,e,n){"use strict";n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return l})),n.d(e,"e",(function(){return p})),n.d(e,"f",(function(){return f})),n.d(e,"b",(function(){return j})),n.d(e,"a",(function(){return b}));var a=n(78),c=n.n(a),r=n(18),o=n(110),i=(n(112),n(51)),s=n(741);function u(t,e){return d.apply(this,arguments)}function d(){return(d=Object(o.a)(c.a.mark((function t(e,n){var a,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=Object(i.b)(),r="",r=n?"/product?page=".concat(e.page||1,"&limit=").concat(e.limit||100,"&category=").concat(n):"/product?page=".concat(e.page||1,"&limit=").concat(e.limit||100),t.next=5,a.get(r);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function l(t,e,n){var a=Object(i.b)(),c="";c=e?"/product?page=".concat(t.page||1,"&limit=").concat(t.limit||100,"&category=").concat(e):"/product?page=".concat(t.page||1,"&limit=").concat(t.limit||100),a.get(c).then((function(t){n(Object(r.a)({},t))})).catch((function(a){a.response&&(401==a.response.status||403==a.response.status?Object(s.c)((function(){l(t,e,n)})):n(Object(r.a)(Object(r.a)({},a.response),{},{message:"Get list products failed!"})))}))}function p(t,e){Object(i.b)().get("".concat("https://cosmetic-backend.eastasia.cloudapp.azure.com/api-admin/","product/").concat(t)).then((function(t){e(t)})).catch((function(n){n.response&&(console.log(n.response),401===n.response.status||403===n.response.status?Object(s.c)((function(){p(t,e)})):e(n.response.data))}))}function f(t,e,n){Object(i.b)().put("/product/".concat(t),e).then((function(t){n(t)})).catch((function(a){a.response&&(403===a.response.status||401==a.response.status?Object(s.c)((function(){f(t,e,n)})):n(a.response.data))}))}function j(t,e){Object(i.b)().post("/product",t).then((function(t){e(t)})).catch((function(n){n.response&&(403===n.response.status||401==n.response.status?Object(s.c)((function(){j(t,e)})):e(n.response.data))}))}function b(t,e,n){Object(i.b)().put("/product/convert/".concat(t),e).then((function(t){n(t)})).catch((function(a){a.response&&(403===a.response.status||401==a.response.status?Object(s.c)((function(){b(t,e,n)})):n(a.response.data))}))}}}]);
//# sourceMappingURL=30.3918a830.chunk.js.map