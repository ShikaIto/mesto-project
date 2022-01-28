(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled","true"))}e.d({},{k:()=>J});var n,o,r=document.forms.edit,c=document.forms.avatar,a=document.forms.add,i=a.elements.image,u=a.elements.name,s=r.elements.name,l=r.elements.job,d=c.elements.image,f=document.querySelector(".profile__avatar-container"),m=document.querySelector(".profile__avatar-button"),p=document.querySelector(".profile__name"),v=document.querySelector(".profile__caption"),y=document.querySelector(".profile__avatar"),_={inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_active"},h=document.querySelector(".cards__list"),b=document.querySelector("#popup-image"),S=document.querySelector(".popup__image"),E=document.querySelector(".popup__image-caption"),C=document.querySelector("#popup-add"),L=document.querySelector("#popup-edit"),g=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__edit-button"),k=document.querySelector("#popup-avatar"),A=document.querySelector(".profile__avatar-button"),x=document.querySelector("#popup-delete"),U=x.querySelector(".popup__submit"),w={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"df2a87c1-ee4d-42a8-8cbf-5bf5b4af8b77","Content-Type":"application/json"}};function T(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function j(e,t){e.prepend(t)}function O(e,t,r,c,a){var i,u=document.querySelector("#card-template").content.querySelector(".cards__item").cloneNode(!0),s=u.querySelector(".cards__image"),l=u.querySelector(".cards__like-counter"),d=u.querySelector(".cards__like-button");s.setAttribute("src",e),u.querySelector(".cards__title").textContent=t,s.setAttribute("alt",t),l.textContent=a.length,a.forEach((function(e){e._id===J&&d.classList.add("cards__like-button_active")})),c===J&&j(u,((i=document.createElement("button")).classList.add("cards__delete-button"),i.setAttribute("type","button"),i)),s.addEventListener("click",(function(){N(b),E.textContent=t,S.setAttribute("src",e),S.setAttribute("alt",t)})),d.addEventListener("click",(function(e){!function(e,t,n){t.classList.contains("cards__like-button_active")?function(e){return fetch("".concat(w.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:w.headers}).then(T)}(n).then((function(n){console.log("ok"),e.textContent=n.likes.length,t.classList.remove("cards__like-button_active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(w.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:w.headers}).then(T)}(n).then((function(n){e.textContent=n.likes.length,t.classList.add("cards__like-button_active")})).catch((function(e){console.log(e)}))}(l,e.target,r)}));var f=u.querySelector(".cards__delete-button");return f&&f.addEventListener("click",(function(e){n=e.target.closest(".cards__item"),o=r,N(x),U.addEventListener("click",P)})),u}function P(){var e;(e=o,fetch("".concat(w.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:w.headers}).then(T)).then((function(){n.remove(),D(x)})).catch((function(e){console.log(e)}))}function B(e){"Escape"===e.key&&D(document.querySelector(".popup_opened"))}function D(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",B)}function N(e){e.classList.add("popup_opened"),document.addEventListener("keydown",B)}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&D(e)}))})),g.addEventListener("click",(function(){N(C)})),q.addEventListener("click",(function(){N(L)})),A.addEventListener("click",(function(){N(k)}));var J="";!function(e){Array.from(document.forms).forEach((function(n){!function(e,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),r=e.querySelector(n.submitButtonSelector);t(o,r,n),o.forEach((function(c){c.addEventListener("input",(function(){t(o,r,n),function(e,t,n){t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,c,n)}))}))}(n,e)}))}(_),f.addEventListener("mouseover",(function(){m.style.visibility="visible"})),f.addEventListener("mouseout",(function(){m.style.visibility="hidden"})),r.addEventListener("submit",(function(e){e.preventDefault();var t,n,o=r.elements.submit;o.textContent="Coхранение...",(t=s.value,n=l.value,fetch("".concat(w.baseUrl,"/users/me"),{method:"PATCH",headers:w.headers,body:JSON.stringify({name:t,about:n})}).then(T)).then((function(){p.textContent=s.value,v.textContent=l.value,D(L)})).catch((function(e){console.log(e)})).finally((function(){o.textContent="Сохранить"}))})),a.addEventListener("submit",(function(e){e.preventDefault();var n,o,r=Array.from(a.querySelectorAll(_.inputSelector)),c=a.elements.submit;c.textContent="Coхранение...",(n=u.value,o=i.value,fetch("".concat(w.baseUrl,"/cards"),{method:"POST",headers:w.headers,body:JSON.stringify({name:n,link:o})}).then(T)).then((function(e){j(h,O(e.link,e.name,e._id,e.owner._id,e.likes)),D(C),a.reset(),t(r,c,_)})).catch((function(e){console.log(e)})).finally((function(){c.textContent="Создать"}))})),c.addEventListener("submit",(function(e){e.preventDefault();var n=Array.from(c.querySelectorAll(_.inputSelector)),o=c.elements.submit;o.textContent="Coхранение...",function(e){return fetch("".concat(w.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:w.headers,body:JSON.stringify({avatar:e})}).then(T)}(d.value).then((function(){y.setAttribute("src",d.value),D(k),c.reset(),t(n,o,_)})).catch((function(e){console.log(e)})).finally((function(){o.textContent="Сохранить"}))})),Promise.all([fetch("".concat(w.baseUrl,"/users/me"),{method:"GET",headers:w.headers}).then(T),fetch("".concat(w.baseUrl,"/cards"),{method:"GET",headers:w.headers}).then(T)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(o=n.next()).done)&&(c.push(o.value),!t||c.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw r}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];p.textContent=r.name,v.textContent=r.about,y.src=r.avatar,s.value=r.name,l.value=r.about,J=r._id,c.forEach((function(e){j(h,O(e.link,e.name,e._id,e.owner._id,e.likes))}))})).catch((function(e){console.log(e)}))})();