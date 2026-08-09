(() => {
  "use strict";

  // Configuration externe du Hall (config.js).
  // Valeur de repli prudente si le fichier de configuration n’est pas chargé.
  const CONFIG_SEUIL = window.CONFIG_SEUIL || {
    coupelleDisponible: false,
    paroleDuSeuil: {
      introduction: "L’Atelier vous confie ceci, si la curiosité vous appelle.",
      texte: ""
    }
  };

  const seuil = document.querySelector("#seuil");
  const porte = document.querySelector("#porte");
  const invitation = document.querySelector("#invitation");
  const hall = document.querySelector("#hall");
  const panorama = document.querySelector("#panorama");
  const dialogue = document.querySelector("#dialogue");
  const dialogueTitle = document.querySelector("#dialogue-title");
  const dialogueText = document.querySelector("#dialogue-text");
  const dialogueClose = document.querySelector("#dialogue-close");
  const tableIdees = document.querySelector("#table-idees");
  const tableIdeesClose = document.querySelector("#table-idees-close");
  const tableIdeesForm = document.querySelector("#table-idees-form");
  const tableIdeesRetour = document.querySelector("#table-idees-retour");
  const mailFlag = document.querySelector("#mail-flag");
  const requeteBook = document.querySelector("#requete-book");
  const coupelleHotspot = document.querySelector("#coupelle-hotspot");
  const coupelle = document.querySelector("#coupelle");
  const coupelleClose = document.querySelector("#coupelle-close");
  const coupelleForm = document.querySelector("#coupelle-form");
  const coupelleRetour = document.querySelector("#coupelle-retour");
  const paroleHotspot = document.querySelector("#parole-hotspot");
  const paroleGeste = document.querySelector("#parole-geste");
  const paroleObjet = document.querySelector("#parole-objet");
  const paroleFeuille = document.querySelector("#parole-feuille");
  const paroleTexte = document.querySelector("#parole-texte");
  const paroleInvitation = document.querySelector("#parole-invitation");
  const paroleAccueillir = document.querySelector("#parole-accueillir");
  const paroleLaisser = document.querySelector("#parole-laisser");
  const paroleReponse = document.querySelector("#parole-reponse");
  const paroleRegard = document.querySelector("#parole-regard");
  const paroleReponseRetour = document.querySelector("#parole-reponse-retour");

  // L'invitation précède désormais la Parole.
  // Seul le contenu de la Parole elle-même vient de config.js.
  if (paroleHotspot) {
    const parole = CONFIG_SEUIL.paroleDuSeuil || {};
    if (paroleTexte) paroleTexte.textContent = parole.texte || "";
  }

  if (!seuil || !porte || !hall || !panorama) return;

  let ouvertureLancee = false;
  let lastFocus = null;

  const centrerPanorama = () => {
    panorama.scrollLeft = Math.max(0, (panorama.scrollWidth - panorama.clientWidth) / 2);
  };

  const ouvrirLeHall = () => {
    if (ouvertureLancee) return;
    ouvertureLancee = true;
    porte.setAttribute("aria-expanded", "true");
    porte.setAttribute("aria-label", "La porte du Hall des Possibles est ouverte");
    if (invitation) invitation.textContent = "";
    seuil.classList.add("is-opening");

    setTimeout(() => {
      seuil.classList.remove("is-opening");
      seuil.classList.add("is-crossing");
      hall.classList.add("is-visible");
      hall.setAttribute("aria-hidden", "false");
      requestAnimationFrame(centrerPanorama);
    }, 1750);

    setTimeout(() => {
      seuil.classList.add("is-gone");
      panorama.focus({ preventScroll: true });
    }, 3000);
  };

  porte.addEventListener("click", ouvrirLeHall);
  window.addEventListener("resize", () => { centrerPanorama(); if (!paroleEnCours) placerOrigineParole(); });

  let glisse = false;
  let departX = 0;
  let departScroll = 0;

  panorama.addEventListener("pointerdown", e => {
    if (e.pointerType === "touch" || e.target.closest("button")) return;
    glisse = true;
    departX = e.clientX;
    departScroll = panorama.scrollLeft;
    panorama.classList.add("is-dragging");
    panorama.setPointerCapture(e.pointerId);
  });

  panorama.addEventListener("pointermove", e => {
    if (glisse) panorama.scrollLeft = departScroll - (e.clientX - departX);
  });

  const finGlisse = e => {
    if (!glisse) return;
    glisse = false;
    panorama.classList.remove("is-dragging");
    if (panorama.hasPointerCapture(e.pointerId)) panorama.releasePointerCapture(e.pointerId);
  };

  panorama.addEventListener("pointerup", finGlisse);
  panorama.addEventListener("pointercancel", finGlisse);
  panorama.addEventListener("keydown", e => {
    const pas = Math.max(120, panorama.clientWidth * .22);
    if (e.key === "ArrowLeft") panorama.scrollBy({ left: -pas, behavior: "smooth" });
    if (e.key === "ArrowRight") panorama.scrollBy({ left: pas, behavior: "smooth" });
  });

  const openDialog = button => {
    if (!dialogue || !dialogueTitle || !dialogueText || !dialogueClose) return;
    lastFocus = button;
    const titre = button.dataset.title || "";
    dialogueTitle.textContent = titre;
    dialogueTitle.hidden = !titre;
    const parts = (button.dataset.text || "").split("|");
    dialogueText.innerHTML = parts.map((p, i) => i ? `<br><br><em>${p}</em>` : p).join("");
    dialogue.classList.add("is-open");
    dialogue.setAttribute("aria-hidden", "false");
    dialogueClose.focus();
  };

  const closeDialog = () => {
    if (!dialogue) return;
    dialogue.classList.remove("is-open");
    dialogue.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  };


  let paroleEnCours = false;
  let paroleRetourTimer = null;

  const placerOrigineParole = () => {
    if (!paroleHotspot || !paroleGeste) return;
    const r = paroleHotspot.getBoundingClientRect();
    const x = (r.left + r.width / 2) - window.innerWidth / 2;
    const y = (r.top + r.height / 2) - window.innerHeight / 2;
    paroleGeste.style.setProperty("--parole-origin-x", `${x}px`);
    paroleGeste.style.setProperty("--parole-origin-y", `${y}px`);
  };

  const ouvrirParole = button => {
    if (!paroleGeste || !paroleObjet || paroleEnCours) return;
    paroleEnCours = true;
    lastFocus = button;
    if (paroleRetourTimer) clearTimeout(paroleRetourTimer);

    placerOrigineParole();
    if (paroleRegard) paroleRegard.value = "";
    if (paroleReponseRetour) paroleReponseRetour.textContent = "";

    paroleGeste.className = "parole-geste";
    paroleGeste.setAttribute("aria-hidden", "false");

    // 1. L'enveloppe quitte son rayonnage et vient au centre du regard.
    requestAnimationFrame(() => {
      paroleGeste.classList.add("is-present");
      setTimeout(() => paroleGeste.classList.add("is-centered"), 80);

      // 2. Le sceau se détache.
      setTimeout(() => paroleGeste.classList.add("is-unsealed"), 850);

      // 3. Le rabat s'ouvre.
      setTimeout(() => paroleGeste.classList.add("is-opened"), 1250);

      // 4. La feuille sort juste assez pour révéler l'invitation.
      setTimeout(() => paroleGeste.classList.add("is-paper-out"), 1700);

      // 5. Le Seuil propose. Il ne révèle pas encore la Parole.
      setTimeout(() => {
        paroleGeste.classList.add("is-inviting");
        if (paroleAccueillir) paroleAccueillir.focus({ preventScroll: true });
      }, 2150);
    });
  };

  const accueillirParole = () => {
    if (!paroleGeste || !paroleEnCours || paroleGeste.classList.contains("is-accepted")) return;

    // L'invitation est accueillie : la même feuille poursuit son dépliage.
    paroleGeste.classList.add("is-accepted");
    paroleGeste.classList.remove("is-inviting");

    setTimeout(() => {
      paroleGeste.classList.add("is-unfolded");
    }, 320);

    setTimeout(() => {
      if (paroleRegard) paroleRegard.focus({ preventScroll: true });
    }, 900);
  };

  const terminerRetourParole = () => {
    if (!paroleGeste) return;
    paroleGeste.className = "parole-geste";
    paroleGeste.setAttribute("aria-hidden", "true");
    paroleEnCours = false;
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  const refermerParole = () => {
    if (!paroleGeste || !paroleEnCours || paroleGeste.classList.contains("is-returning")) return;

    // Le regard disparaît avec l'écriture : le papier redevient l'objet.
    paroleGeste.classList.add("is-returning");
    paroleGeste.classList.remove("is-inviting");
    paroleGeste.classList.remove("is-accepted");
    paroleGeste.classList.remove("is-unfolded");

    // La feuille se replie.
    setTimeout(() => paroleGeste.classList.remove("is-paper-out"), 500);

    // Elle rentre dans l'enveloppe, qui se referme.
    setTimeout(() => paroleGeste.classList.remove("is-opened"), 900);

    // L'enveloppe repart vers son emplacement dans la bibliothèque.
    setTimeout(() => {
      paroleGeste.classList.remove("is-unsealed");
      paroleGeste.classList.remove("is-centered");
    }, 1250);

    setTimeout(() => paroleGeste.classList.remove("is-present"), 1850);
    paroleRetourTimer = setTimeout(terminerRetourParole, 2200);
  };

  const openTableIdees = button => {
    if (!tableIdees || !tableIdeesClose) return;
    lastFocus = button;
    tableIdees.classList.add("is-open");
    tableIdees.setAttribute("aria-hidden", "false");
    tableIdeesClose.focus();
  };

  const closeTableIdees = () => {
    if (!tableIdees) return;
    tableIdees.classList.remove("is-open");
    tableIdees.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  };

  const openCoupelle = button => {
    if (!CONFIG_SEUIL.coupelleDisponible || !coupelle || !coupelleClose) return;
    lastFocus = button;
    coupelle.classList.add("is-open");
    coupelle.setAttribute("aria-hidden", "false");
    coupelleClose.focus();
  };

  const closeCoupelle = () => {
    if (!coupelle) return;
    coupelle.classList.remove("is-open");
    coupelle.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  };

  if (coupelleHotspot) {
    coupelleHotspot.hidden = !CONFIG_SEUIL.coupelleDisponible;
    coupelleHotspot.setAttribute("aria-hidden", String(!CONFIG_SEUIL.coupelleDisponible));
  }

  document.querySelectorAll(".hotspot").forEach(button => {
    button.addEventListener("click", () => {
      if (button.id === "parole-hotspot") ouvrirParole(button);
      else if (button.dataset.action === "table-idees") openTableIdees(button);
      else if (button.dataset.action === "coupelle") openCoupelle(button);
      else if (button.dataset.action === "silence") return;
      else openDialog(button);
    });
  });

  if (coupelleClose) coupelleClose.addEventListener("click", closeCoupelle);
  if (coupelle) coupelle.addEventListener("click", e => {
    if (e.target === coupelle) closeCoupelle();
  });

  if (dialogueClose) dialogueClose.addEventListener("click", closeDialog);
  if (dialogue) dialogue.addEventListener("click", e => {
    if (e.target === dialogue) closeDialog();
  });

  if (tableIdeesClose) tableIdeesClose.addEventListener("click", closeTableIdees);
  if (tableIdees) tableIdees.addEventListener("click", e => {
    if (e.target === tableIdees) closeTableIdees();
  });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (paroleEnCours) refermerParole();
    else if (coupelle && coupelle.classList.contains("is-open")) closeCoupelle();
    else if (tableIdees && tableIdees.classList.contains("is-open")) closeTableIdees();
    else if (dialogue && dialogue.classList.contains("is-open")) closeDialog();
  });

  if (coupelleForm) {
    coupelleForm.addEventListener("submit", e => {
      e.preventDefault();
      const question = (new FormData(coupelleForm).get("question") || "").toString().trim();
      if (!question) return;
      if (coupelleRetour) coupelleRetour.textContent = "La Coupelle garde ces mots pour l’Artisan. Rien d’autre ne vous est demandé.";
      const submit = coupelleForm.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Mots déposés";
      }
      // Une question ne devient jamais un projet : aucun livre n’apparaît.
      try { sessionStorage.setItem("seuil-coupelle-confiee", "1"); } catch (_) {}
    });
  }

  if (paroleAccueillir) {
    paroleAccueillir.addEventListener("click", accueillirParole);
  }

  if (paroleLaisser) {
    paroleLaisser.addEventListener("click", refermerParole);
  }

  if (paroleReponse) {
    paroleReponse.addEventListener("submit", async e => {
      e.preventDefault();
      const regard = (new FormData(paroleReponse).get("regard") || "").toString().trim();
      if (!regard || !paroleEnCours) return;

      const parole = CONFIG_SEUIL.paroleDuSeuil || {};
      const url = (parole.reponseUrl || "").toString().trim();
      const submit = paroleReponse.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Le regard rejoint la feuille…";
      }

      let message = "Votre regard reste confié à cette visite.";
      try {
        sessionStorage.setItem("seuil-parole-regard", regard);
      } catch (_) {}

      if (url) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "parole-du-seuil",
              parole: parole.texte || "",
              regard
            })
          });
          if (!response.ok) throw new Error("envoi-refuse");
          message = "Votre regard a été confié au Seuil.";
        } catch (_) {
          message = "Votre regard reste inscrit ici pour cette visite.";
        }
      }

      if (paroleReponseRetour) paroleReponseRetour.textContent = message;

      // Pas de bouton « fermer » : après l'écriture, le geste se termine de lui-même.
      setTimeout(refermerParole, 900);
      setTimeout(() => {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Partager mon regard";
        }
      }, 3300);
    });
  }

  if (tableIdeesForm) {
    tableIdeesForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(tableIdeesForm);
      const projet = (data.get("projet") || "").toString().trim();
      if (!projet) return;

      // V0.6.1 : la Table fonctionne déjà comme expérience locale.
      // L'envoi réel sera branché ensuite sur la boîte aux lettres / messagerie.
      tableIdeesForm.classList.add("is-confiee");
      if (tableIdeesRetour) {
        tableIdeesRetour.textContent = "Merci d’avoir accordé votre confiance à l’Atelier. Votre idée a trouvé sa place au Seuil.";
      }
      const submit = tableIdeesForm.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Idée confiée";
      }

      // Le Hall accuse réception sans interrompre le Requêteur :
      // le bras de la boîte se lève et un livre rejoint la bibliothèque.
      if (mailFlag) mailFlag.classList.add("is-raised");
      if (requeteBook) requeteBook.classList.add("is-visible");

      // On conserve uniquement cette trace dans la session en cours.
      try { sessionStorage.setItem("seuil-idee-confiee", "1"); } catch (_) {}
    });
  }

  // Si la Table a déjà reçu une idée pendant cette visite, le Hall garde la trace.
  try {
    if (sessionStorage.getItem("seuil-idee-confiee") === "1") {
      if (mailFlag) mailFlag.classList.add("is-raised");
      if (requeteBook) requeteBook.classList.add("is-visible");
    }
  } catch (_) {}


  // Le champ « Autre » ne s'invite que lorsqu'il est réellement utile.
  const publicAutre = tableIdeesForm?.querySelector('[name="public_autre"]');
  const publicRadios = tableIdeesForm?.querySelectorAll('[name="public"]');
  const syncPublicAutre = () => {
    if (!publicAutre || !publicRadios) return;
    const autre = [...publicRadios].some(radio => radio.checked && radio.value === "Autre");
    publicAutre.hidden = !autre;
    publicAutre.disabled = !autre;
    if (!autre) publicAutre.value = "";
  };
  if (publicRadios) publicRadios.forEach(radio => radio.addEventListener("change", syncPublicAutre));
  syncPublicAutre();

  const image = panorama.querySelector("img");
  if (image) {
    if (image.complete) centrerPanorama();
    else image.addEventListener("load", centrerPanorama, { once: true });
  }
})();
