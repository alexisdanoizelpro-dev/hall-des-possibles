/* ==========================================================
   LE HALL DES POSSIBLES — V0.2
   Le Premier Pas
   ========================================================== */

(() => {
  "use strict";

  const seuil = document.querySelector("#seuil");
  const porte = document.querySelector("#porte");
  const invitation = document.querySelector("#invitation");
  const hall = document.querySelector("#hall");
  const panorama = document.querySelector("#panorama");
  const indication = document.querySelector("#indication");

  if (!seuil || !porte || !hall || !panorama) {
    return;
  }

  let ouvertureLancee = false;
  let glissementEffectue = false;

  const cacherIndication = () => {
    if (!glissementEffectue && indication) {
      glissementEffectue = true;
      indication.classList.add("is-hidden");
    }
  };

  const centrerPanorama = () => {
    const positionCentrale =
      Math.max(0, (panorama.scrollWidth - panorama.clientWidth) / 2);

    panorama.scrollLeft = positionCentrale;
  };

  const ouvrirLeHall = () => {
    if (ouvertureLancee) {
      return;
    }

    ouvertureLancee = true;

    porte.setAttribute("aria-expanded", "true");
    porte.setAttribute(
      "aria-label",
      "La porte du Hall des Possibles est ouverte"
    );

    if (invitation) {
      invitation.textContent = "La porte s'ouvre...";
    }

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

  panorama.addEventListener("scroll", cacherIndication, { passive: true });
  panorama.addEventListener("pointerdown", cacherIndication);

  /* Glissement à la souris sur ordinateur */
  let glisse = false;
  let departX = 0;
  let departScroll = 0;

  panorama.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    glisse = true;
    departX = event.clientX;
    departScroll = panorama.scrollLeft;
    panorama.classList.add("is-dragging");
    panorama.setPointerCapture(event.pointerId);
  });

  panorama.addEventListener("pointermove", (event) => {
    if (!glisse) {
      return;
    }

    const distance = event.clientX - departX;
    panorama.scrollLeft = departScroll - distance;
  });

  const terminerGlissement = (event) => {
    if (!glisse) {
      return;
    }

    glisse = false;
    panorama.classList.remove("is-dragging");

    if (panorama.hasPointerCapture(event.pointerId)) {
      panorama.releasePointerCapture(event.pointerId);
    }
  };

  panorama.addEventListener("pointerup", terminerGlissement);
  panorama.addEventListener("pointercancel", terminerGlissement);

  /* Navigation au clavier */
  panorama.addEventListener("keydown", (event) => {
    const pas = Math.max(120, panorama.clientWidth * 0.22);

    if (event.key === "ArrowLeft") {
      panorama.scrollBy({ left: -pas, behavior: "smooth" });
      cacherIndication();
    }

    if (event.key === "ArrowRight") {
      panorama.scrollBy({ left: pas, behavior: "smooth" });
      cacherIndication();
    }
  });

  const image = panorama.querySelector("img");

  if (image) {
    if (image.complete) {
      centrerPanorama();
    } else {
      image.addEventListener("load", centrerPanorama, { once: true });
    }
  }
})();
