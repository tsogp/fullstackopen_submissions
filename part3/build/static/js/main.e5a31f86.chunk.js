(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,n,t){e.exports=t(50)},49:function(e,n,t){},50:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(18),u=t.n(c),o=t(1),l=t(3),i=t.n(l),s="http://localhost:3001/api/persons",d=function(){return i.a.get(s).then(function(e){return e.data})},m=function(e){return i.a.post(s,e).then(function(e){return e.data})},f=function(e){return i.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},h=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then(function(e){return e.data})},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:n.type},n.message)},b=(t(49),function(e){return r.a.createElement(r.a.Fragment,null,"filter shown with ",r.a.createElement("input",{onChange:e.handleFilterChange}))}),E=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:e.handleNameChange}),"number: ",r.a.createElement("input",{onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:e.addPerson},"add")))},g=function(e){var n=e.persons,t=e.deletePerson;return n.map(function(e){return r.a.createElement("div",{key:e.id},r.a.createElement("h3",null,e.name," ",e.number),r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})},v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),i=l[0],s=l[1],v=Object(a.useState)(""),w=Object(o.a)(v,2),C=w[0],j=w[1],O=Object(a.useState)(""),y=Object(o.a)(O,2),k=y[0],N=y[1],F=Object(a.useState)({}),S=Object(o.a)(F,2),P=S[0],D=S[1];Object(a.useEffect)(function(){d().then(function(e){c(e)})},[]);var I=function(e,n){D({message:e,type:n}),setTimeout(function(){D(null)},5e3)};return r.a.createElement("div",null,r.a.createElement(p,{message:P}),r.a.createElement("h2",null,"Filter"),r.a.createElement(b,{handleFilterChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(E,{handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){j(e.target.value)},addPerson:function(e){e.preventDefault();var n=t.find(function(e){return e.name===i}),a={name:i,number:C};n?window.confirm("".concat(i," is already in the phonebook. want to update?"))&&h(n.id,a).then(function(e){c(t.map(function(t){return t.id!==n.id?t:e})),I("".concat(i,"'s data was updated"),"success")}).catch(function(e){I(e.response.data.error,"error")}):m(a).then(function(e){c(t.concat(a)),I("".concat(i,"'s data was added"),"success")}).catch(function(e){I(e.response.data.error,"error")})}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{persons:k?t.filter(function(e){return-1!==e.name.toLowerCase().split(" ")[0].search(k)}):t,deletePerson:function(e){var n=t.find(function(n){return n.id===e});window.confirm("Delete ".concat(n.name,"?"))&&f(e).then(function(){c(t.filter(function(n){return n.id!==e}))}).catch(function(e){I("Informaiton of ".concat(n.name," has already been deleted from the server"),"error")})}}))};u.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.Fragment,null,r.a.createElement(v,null)))}},[[19,1,2]]]);
//# sourceMappingURL=main.e5a31f86.chunk.js.map