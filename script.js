/* ==========================================================
   LE HALL DES POSSIBLES — V0.5
   Le Hall se souvient et respire
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
      lancerVieDuHall();
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


  /* V0.4 — Les objets racontent sans imposer leur histoire. */
  const murmure = document.querySelector("#murmure");
  const murmureTexte = document.querySelector("#murmureTexte");
  const fermerMurmure = document.querySelector(".murmure__fermer");
  let minuterieMurmure = 0;

  const montrerMurmure = (texte) => {
    if (!murmure || !murmureTexte || !texte) return;
    window.clearTimeout(minuterieMurmure);
    murmureTexte.textContent = texte;
    murmure.classList.add("is-visible");
    murmure.setAttribute("aria-hidden", "false");
    minuterieMurmure = window.setTimeout(() => {
      murmure.classList.remove("is-visible");
      murmure.setAttribute("aria-hidden", "true");
    }, 6500);
  };

  document.querySelectorAll("[data-souvenir]").forEach((objet) => {
    objet.addEventListener("click", () => montrerMurmure(objet.dataset.souvenir));
  });

  fermerMurmure?.addEventListener("click", () => {
    window.clearTimeout(minuterieMurmure);
    murmure?.classList.remove("is-visible");
    murmure?.setAttribute("aria-hidden", "true");
  });

  const enigmeDuJour = document.querySelector("#enigmeDuJour");
  const lettreDuJour = document.querySelector("#lettreDuJour");
  const fermerLettre = document.querySelector(".lettre__fermer");

  enigmeDuJour?.addEventListener("click", () => {
    if (lettreDuJour?.showModal) lettreDuJour.showModal();
    else lettreDuJour?.setAttribute("open", "");
  });

  fermerLettre?.addEventListener("click", () => lettreDuJour?.close());
  lettreDuJour?.addEventListener("click", (event) => {
    if (event.target === lettreDuJour) lettreDuJour.close();
  });




  /* V0.5 — Événements rares : le Hall ne se donne jamais en spectacle. */
  const feuillePassante = document.querySelector("#feuillePassante");
  const lampeVivante = document.querySelector("#lampeVivante");
  const livreVivant = document.querySelector("#livreVivant");
  const horlogeVivante = document.querySelector("#horlogeVivante");
  const chienVivant = document.querySelector("#chienVivant");
  let vieDuHallLancee = false;
  const minuteriesVie = [];

  const apres = (fonction, minimum, variation) => {
    const id = window.setTimeout(fonction, minimum + Math.random() * variation);
    minuteriesVie.push(id);
  };

  const jouerPuisReprogrammer = (element, classe, duree, minimum, variation) => {
    if (!element || document.hidden) {
      apres(() => jouerPuisReprogrammer(element, classe, duree, minimum, variation), 8000, 10000);
      return;
    }
    element.classList.remove(classe);
    void element.offsetWidth;
    element.classList.add(classe);
    window.setTimeout(() => element.classList.remove(classe), duree);
    apres(() => jouerPuisReprogrammer(element, classe, duree, minimum, variation), minimum, variation);
  };

  const episodeDePluie = () => {
    if (!document.hidden) {
      hall.classList.add("is-raining");
      window.setTimeout(() => hall.classList.remove("is-raining"), 26000 + Math.random() * 22000);
    }
    apres(episodeDePluie, 150000, 210000);
  };

  const lancerVieDuHall = () => {
    if (vieDuHallLancee || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    vieDuHallLancee = true;
    apres(() => jouerPuisReprogrammer(feuillePassante, "is-passing", 5600, 85000, 120000), 30000, 50000);
    apres(() => jouerPuisReprogrammer(lampeVivante, "is-flickering", 1500, 70000, 110000), 18000, 38000);
    apres(() => jouerPuisReprogrammer(livreVivant, "is-turning", 2400, 100000, 150000), 42000, 65000);
    apres(() => jouerPuisReprogrammer(chienVivant, "is-shifting", 2700, 80000, 140000), 26000, 50000);
    apres(episodeDePluie, 110000, 130000);
  };

  const verifierHeurePleine = () => {
    const maintenant = new Date();
    if (maintenant.getMinutes() === 0 && maintenant.getSeconds() < 8 && !document.hidden) {
      horlogeVivante?.classList.add("is-striking");
      window.setTimeout(() => horlogeVivante?.classList.remove("is-striking"), 1900);
    }
  };
  window.setInterval(verifierHeurePleine, 7000);

  definirMoment();
  window.setInterval(definirMoment, 5 * 60 * 1000);
})();
