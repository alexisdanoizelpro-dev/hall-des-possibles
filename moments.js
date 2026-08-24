"use strict";

/* =========================================
   LES MOMENTS DU SEUIL
   =========================================

   Ce fichier fait vivre les éléments définis
   par l'Artisan dans artisan.js.

   ========================================= */

function installerReflexionDuSeuil() {
    if (
        typeof ARTISAN === "undefined" ||
        !ARTISAN.reflexion ||
        !ARTISAN.reflexion.active
    ) {
        return;
    }

    const hallOverlay = document.getElementById("hall-overlay");
    if (!hallOverlay) return;

    const reflexion = document.createElement("div");
    reflexion.id = "reflexion-du-seuil";
    reflexion.textContent = ARTISAN.reflexion.texte;
    hallOverlay.appendChild(reflexion);
}

/* =========================================
   ENQUÊTE DU MOMENT
   ========================================= */

let enqueteFond = null;

function cleEnqueteClassee() {
    return "seuil-affaire-classee-" + ARTISAN.enqueteDuMoment.identifiant;
}

function affaireEstClassee() {
    try {
        return localStorage.getItem(cleEnqueteClassee()) === "oui";
    } catch (e) {
        return false;
    }
}

function classerAffaire() {
    try {
        localStorage.setItem(cleEnqueteClassee(), "oui");
    } catch (e) {
        // Le Hall continue de fonctionner même si le stockage est bloqué.
    }
}

function normaliserReponse(texte) {
    return String(texte || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

function reponseEstAcceptee(proposition) {
    const attendues = ARTISAN.enqueteDuMoment.reponsesAcceptees || [];
    const valeur = normaliserReponse(proposition);

    return attendues.some(function(reponse) {
        return normaliserReponse(reponse) === valeur;
    });
}

function installerEnqueteDuMoment() {
    if (
        typeof ARTISAN === "undefined" ||
        !ARTISAN.enqueteDuMoment ||
        !ARTISAN.enqueteDuMoment.active
    ) {
        return;
    }

    const hallOverlay = document.getElementById("hall-overlay");
    if (!hallOverlay) return;

    const enveloppe = document.createElement("button");
    enveloppe.id = "enveloppe-enquete";
    enveloppe.type = "button";
    enveloppe.className = "hall-element";

    const position = ARTISAN.enqueteDuMoment.position || {};
    enveloppe.style.left = position.left || "50%";
    enveloppe.style.top = position.top || "43%";
    enveloppe.style.width = position.width || "9%";

    enveloppe.innerHTML = `
        <span class="enveloppe-corps" aria-hidden="true">
            <span class="enveloppe-rabat"></span>
            <span class="enveloppe-logo">AS</span>
            <span class="enveloppe-sceau">AS</span>
        </span>
    `;

    if (affaireEstClassee()) {
        enveloppe.classList.add("est-classee");
        enveloppe.setAttribute("aria-label", "Affaire classée");
    } else {
        enveloppe.setAttribute("aria-label", "Ouvrir l'Enquête du Moment");
    }

    enveloppe.addEventListener("click", function() {
        if (affaireEstClassee()) return;
        ouvrirEnquete(enveloppe);
    });

    hallOverlay.appendChild(enveloppe);
}

function ouvrirEnquete(enveloppeHall) {
    if (enqueteFond) return;

    enqueteFond = document.createElement("div");
    enqueteFond.id = "enquete-fond";

    const feuille = document.createElement("section");
    feuille.id = "enquete-feuille";
    feuille.setAttribute("role", "dialog");
    feuille.setAttribute("aria-modal", "true");
    feuille.setAttribute("aria-label", "Enquête du Moment");

    feuille.innerHTML = `
        <button id="enquete-fermer" type="button" aria-label="Refermer l'enveloppe">×</button>
        <div id="enquete-categorie"></div>
        <h2 id="enquete-titre"></h2>
        <div id="enquete-contenu"></div>
        <form id="enquete-formulaire">
            <label for="enquete-proposition">Votre proposition</label>
            <input id="enquete-proposition" type="text" autocomplete="off">
            <button id="enquete-confier" type="submit">Confier ma proposition au Seuil</button>
        </form>
        <div id="enquete-choix" hidden>
            <button id="enquete-reessayer" type="button">Oser une autre proposition</button>
            <button id="enquete-reflechir" type="button">Réfléchir encore</button>
        </div>
    `;

    feuille.querySelector("#enquete-categorie").textContent = ARTISAN.enqueteDuMoment.categorie || "";
    feuille.querySelector("#enquete-titre").textContent = ARTISAN.enqueteDuMoment.titre || "";
    feuille.querySelector("#enquete-contenu").textContent = ARTISAN.enqueteDuMoment.contenu || "";

    enqueteFond.appendChild(feuille);
    document.body.appendChild(enqueteFond);

    const champ = feuille.querySelector("#enquete-proposition");
    const formulaire = feuille.querySelector("#enquete-formulaire");
    const choix = feuille.querySelector("#enquete-choix");

    function fermer() {
        if (!enqueteFond) return;
        enqueteFond.remove();
        enqueteFond = null;
    }

    feuille.querySelector("#enquete-fermer").addEventListener("click", fermer);
    enqueteFond.addEventListener("click", function(e) {
        if (e.target === enqueteFond) fermer();
    });

    feuille.querySelector("#enquete-reflechir").addEventListener("click", fermer);

    feuille.querySelector("#enquete-reessayer").addEventListener("click", function() {
        choix.hidden = true;
        formulaire.hidden = false;
        champ.value = "";
        champ.focus();
    });

    formulaire.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!champ.value.trim()) return;

        if (reponseEstAcceptee(champ.value)) {
            classerAffaire();
            feuille.classList.add("se-referme");

            setTimeout(function() {
                fermer();
                enveloppeHall.classList.add("est-classee", "vient-detre-classee");
                enveloppeHall.setAttribute("aria-label", "Affaire classée");
            }, 850);
        } else {
            formulaire.hidden = true;
            choix.hidden = false;
        }
    });

    setTimeout(function() {
        champ.focus();
    }, 100);
}

installerReflexionDuSeuil();
installerEnqueteDuMoment();
