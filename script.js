(() => {
  "use strict";

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
    if (invitation) invitation.textContent = "La porte s'ouvre...";
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
  window.addEventListener("resize", centrerPanorama);

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
    dialogueTitle.textContent = button.dataset.title || "Le Hall";
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

  document.querySelectorAll(".hotspot").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "table-idees") openTableIdees(button);
      else openDialog(button);
    });
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
    if (tableIdees && tableIdees.classList.contains("is-open")) closeTableIdees();
    else if (dialogue && dialogue.classList.contains("is-open")) closeDialog();
  });

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
    });
  }

  const image = panorama.querySelector("img");
  if (image) {
    if (image.complete) centrerPanorama();
    else image.addEventListener("load", centrerPanorama, { once: true });
  }
})();
