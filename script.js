/* ==========================================================
   LE HALL DES POSSIBLES — V0.3.1
   Le Premier Battement
   ========================================================== */

(() => {
  "use strict";

  const seuil = document.querySelector("#seuil");
  const porte = document.querySelector("#porte");
  const invitation = document.querySelector("#invitation");
  const hall = document.querySelector("#hall");
  const panorama = document.querySelector("#panorama");
  const feu = document.querySelector("#feuVivant");
  const lueur = document.querySelector("#lueurFeu");
  const braisesVolantes = document.querySelector("#braisesVolantes");

  if (!seuil || !porte || !hall || !panorama) return;

  let ouvertureLancee = false;
  let feuDemarre = false;
  let minuterieSouffle = 0;
  let minuterieBraise = 0;
  let minuterieBuche = 0;

  const aleatoire = (minimum, maximum) =>
    Math.random() * (maximum - minimum) + minimum;

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

  const faireRespirerLeFeu = () => {
    if (!feu || document.hidden) {
      minuterieSouffle = window.setTimeout(faireRespirerLeFeu, 1800);
      return;
    }

    feu.style.setProperty("--souffle", aleatoire(.94, 1.075).toFixed(3));
    feu.style.setProperty("--inclinaison", `${aleatoire(-1.15, 1.15).toFixed(2)}deg`);

    if (lueur) {
      lueur.style.setProperty("--lueur-opacite", aleatoire(.61, .78).toFixed(3));
      lueur.style.setProperty("--lueur-echelle", aleatoire(.975, 1.035).toFixed(3));
    }

    minuterieSouffle = window.setTimeout(
      faireRespirerLeFeu,
      aleatoire(850, 1850)
    );
  };

  const creerUneBraise = () => {
    if (!braisesVolantes || document.hidden) {
      minuterieBraise = window.setTimeout(creerUneBraise, aleatoire(15000, 40000));
      return;
    }

    const braise = document.createElement("i");
    braise.className = "braise";
    braise.style.setProperty("--x", `${aleatoire(32, 70).toFixed(1)}%`);
    braise.style.setProperty("--taille", `${aleatoire(1.7, 3.4).toFixed(1)}px`);
    braise.style.setProperty("--derive", `${aleatoire(-15, 16).toFixed(1)}px`);
    braise.style.setProperty("--montee", `${aleatoire(-64, -103).toFixed(1)}px`);
    braise.style.setProperty("--duree", `${aleatoire(2200, 3400).toFixed(0)}ms`);

    braisesVolantes.appendChild(braise);
    braise.addEventListener("animationend", () => braise.remove(), { once: true });

    minuterieBraise = window.setTimeout(creerUneBraise, aleatoire(15000, 40000));
  };

  const faireTasserLaBuche = () => {
    if (!feu || document.hidden) {
      minuterieBuche = window.setTimeout(faireTasserLaBuche, aleatoire(120000, 180000));
      return;
    }

    feu.classList.add("is-buche-settling");

    window.setTimeout(() => {
      feu.classList.remove("is-buche-settling");
    }, 1900);

    minuterieBuche = window.setTimeout(faireTasserLaBuche, aleatoire(120000, 180000));
  };

  const demarrerLePremierBattement = () => {
    if (feuDemarre || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    feuDemarre = true;

    window.setTimeout(faireRespirerLeFeu, 1200);
    minuterieBraise = window.setTimeout(creerUneBraise, aleatoire(9000, 18000));
    minuterieBuche = window.setTimeout(faireTasserLaBuche, aleatoire(120000, 180000));
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
      demarrerLePremierBattement();
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

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && feuDemarre) {
      window.clearTimeout(minuterieSouffle);
      faireRespirerLeFeu();
    }
  });

  definirMoment();
  window.setInterval(definirMoment, 5 * 60 * 1000);
})();
