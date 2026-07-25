(() => {
  "use strict";
  const seuil=document.querySelector("#seuil"), porte=document.querySelector("#porte"), invitation=document.querySelector("#invitation"), hall=document.querySelector("#hall"), panorama=document.querySelector("#panorama");
  if(!seuil||!porte||!hall||!panorama)return;
  let ouvertureLancee=false;
  const definirMoment=()=>{const h=new Date().getHours();hall.dataset.moment=h>=6&&h<11?"matin":h>=18&&h<22?"soir":h>=22||h<6?"nuit":"jour"};
  const centrerPanorama=()=>{panorama.scrollLeft=Math.max(0,(panorama.scrollWidth-panorama.clientWidth)/2)};
  const ouvrirLeHall=()=>{if(ouvertureLancee)return;ouvertureLancee=true;porte.setAttribute("aria-expanded","true");porte.setAttribute("aria-label","La porte du Hall des Possibles est ouverte");if(invitation)invitation.textContent="La porte s'ouvre...";seuil.classList.add("is-opening");setTimeout(()=>{seuil.classList.remove("is-opening");seuil.classList.add("is-crossing");hall.classList.add("is-visible");hall.setAttribute("aria-hidden","false");requestAnimationFrame(centrerPanorama)},1750);setTimeout(()=>{seuil.classList.add("is-gone");panorama.focus({preventScroll:true})},3000)};
  porte.addEventListener("click",ouvrirLeHall);window.addEventListener("resize",centrerPanorama);
  let glisse=false,departX=0,departScroll=0;
  panorama.addEventListener("pointerdown",e=>{if(e.pointerType==="touch")return;glisse=true;departX=e.clientX;departScroll=panorama.scrollLeft;panorama.classList.add("is-dragging");panorama.setPointerCapture(e.pointerId)});
  panorama.addEventListener("pointermove",e=>{if(glisse)panorama.scrollLeft=departScroll-(e.clientX-departX)});
  const fin=e=>{if(!glisse)return;glisse=false;panorama.classList.remove("is-dragging");if(panorama.hasPointerCapture(e.pointerId))panorama.releasePointerCapture(e.pointerId)};
  panorama.addEventListener("pointerup",fin);panorama.addEventListener("pointercancel",fin);
  panorama.addEventListener("keydown",e=>{const pas=Math.max(120,panorama.clientWidth*.22);if(e.key==="ArrowLeft")panorama.scrollBy({left:-pas,behavior:"smooth"});if(e.key==="ArrowRight")panorama.scrollBy({left:pas,behavior:"smooth"})});
  const image=panorama.querySelector("img");if(image){if(image.complete)centrerPanorama();else image.addEventListener("load",centrerPanorama,{once:true})}
  definirMoment();setInterval(definirMoment,300000);
})();
