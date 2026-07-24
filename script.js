/* ==========================================================
   LE HALL DES POSSIBLES — V0.3
   Le Hall s'éveille
   ========================================================== */

(() => {
  "use strict";

  const seuil = document.querySelector("#seuil");
  const porte = document.querySelector("#porte");
  const invitation = document.querySelector("#invitation");
  const hall = document.querySelector("#hall");
  const panorama = document.querySelector("#panorama");

  if (!seuil || !porte || !hall || !panorama) return;

  let ouvertureLancee = false;

  const definirMoment = () => {
    const heure = new Date().getHours();
    let moment = "jour";

    if (heure >= 6 && heure < 11) moment = "matin";
    else if (heure >= 18 && heure < 22) moment = "soir";
    else if (heure >= 22 || heure < 6) moment = "nuit";

    hall.dataset.moment = moment;
  };

  const centrerPanorama = () => {
    panorama.scrollLeft = Math.max(
      0,
      (panorama.scrollWidth - panorama.clientWidth) / 2
    );
  };

  const ouvrirLeHall = () => {
    if (ouvertureLancee) return;
    ouvertureLancee = true;

    porte.setAttribute("aria-expanded", "true");
    porte.setAttribute("aria-label", "La porte du Hall des Possibles est ouverte");

    if (invitation) invitation.textContent = "La porte s'ouvre...";

    seuil.classList.add("is-opening");

    window.setTimeout(() => {
      seuil.classList.remove("is-opening");
      seuil.classList.add("is-crossing");
      hall.classList.add("is-visible");
      hall.setAttribute("aria-hidden", "false");
      window.requestAnimationFrame(centrerPanorama);
    }, 1750);

    window.setTimeout(() => {
      seuil.classList.add("is-gone");
      panorama.focus({ preventScroll: true });
    }, 3000);
  };

  porte.addEventListener("click", ouvrirLeHall);
  window.addEventListener("resize", centrerPanorama);

  /* Glissement souris */
  let glisse = false;
  let departX = 0;
  let departScroll = 0;

  panorama.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;

    glisse = true;
    departX = event.clientX;
    departScroll = panorama.scrollLeft;
    panorama.classList.add("is-dragging");
    panorama.setPointerCapture(event.pointerId);
  });

  panorama.addEventListener("pointermove", (event) => {
    if (!glisse) return;
    panorama.scrollLeft = departScroll - (event.clientX - departX);
  });

  const terminerGlissement = (event) => {
    if (!glisse) return;
    glisse = false;
    panorama.classList.remove("is-dragging");

    if (panorama.hasPointerCapture(event.pointerId)) {
      panorama.releasePointerCapture(event.pointerId);
    }
  };

  panorama.addEventListener("pointerup", terminerGlissement);
  panorama.addEventListener("pointercancel", terminerGlissement);

  panorama.addEventListener("keydown", (event) => {
    const pas = Math.max(120, panorama.clientWidth * .22);

    if (event.key === "ArrowLeft") {
      panorama.scrollBy({ left: -pas, behavior: "smooth" });
    } else if (event.key === "ArrowRight") {
      panorama.scrollBy({ left: pas, behavior: "smooth" });
    }
  });

  const image = panorama.querySelector("img");
  if (image) {
    if (image.complete) centrerPanorama();
    else image.addEventListener("load", centrerPanorama, { once: true });
  }

  definirMoment();
  window.setInterval(definirMoment, 5 * 60 * 1000);
})();
