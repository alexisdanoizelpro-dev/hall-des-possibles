/* ==========================================================
   LE HALL DES POSSIBLES — V0.3.1b
   Le Premier Battement — correctif mobile et mouvement
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
      document.documentElement.classList.add("mouvement-actif");
      window.requestAnimationFrame(centrerPanorama);
      demarrerLeFeu();
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


  /* Le Premier Battement : braises irrégulières et tassement rare des bûches. */
  const feu = document.querySelector("#feu");
  const braises = document.querySelector("#braises");
  let feuDemarre = false;
  let minuterieBraise = 0;
  let minuterieBuche = 0;

  const creerBraise = (rapide = false) => {
    if (!braises || document.hidden) return;

    const braise = document.createElement("i");
    braise.className = "braise";
    braise.style.setProperty("--x", `${24 + Math.random() * 52}%`);
    braise.style.setProperty("--taille", `${2 + Math.random() * 2.4}px`);
    braise.style.setProperty("--duree", `${1.75 + Math.random() * 1.45}s`);
    braise.style.setProperty("--derive", `${-18 + Math.random() * 36}px`);
    braise.style.setProperty("--hauteur", `${-(70 + Math.random() * 58)}px`);
    braises.appendChild(braise);
    braise.addEventListener("animationend", () => braise.remove(), { once: true });

    window.clearTimeout(minuterieBraise);
    const prochainDelai = rapide ? 1800 : 9000 + Math.random() * 17000;
    minuterieBraise = window.setTimeout(() => creerBraise(false), prochainDelai);
  };

  const tasserLesBuches = () => {
    if (!feu || document.hidden) return;
    feu.classList.remove("is-settling");
    void feu.offsetWidth;
    feu.classList.add("is-settling");
    window.setTimeout(() => feu.classList.remove("is-settling"), 1700);

    window.clearTimeout(minuterieBuche);
    minuterieBuche = window.setTimeout(tasserLesBuches, 110000 + Math.random() * 90000);
  };

  const demarrerLeFeu = () => {
    if (feuDemarre || !feu || !braises) return;
    feuDemarre = true;
    window.setTimeout(() => creerBraise(true), 900);
    window.setTimeout(() => creerBraise(false), 3600);
    minuterieBuche = window.setTimeout(tasserLesBuches, 70000 + Math.random() * 50000);
  };

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && feuDemarre) {
      window.clearTimeout(minuterieBraise);
      minuterieBraise = window.setTimeout(() => creerBraise(false), 1600);
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
