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

    const papierReflexion = document.createElement("button");

papierReflexion.id = "papier-reflexion";
papierReflexion.type = "button";
papierReflexion.setAttribute("aria-label", "Découvrir une Réflexion du Seuil");

const reflexion = document.createElement("div");

reflexion.id = "reflexion-du-seuil";
reflexion.textContent = ARTISAN.reflexion.texte;
reflexion.hidden = true;

hallOverlay.appendChild(papierReflexion);
hallOverlay.appendChild(reflexion);

   function placerPapierReflexion() {

    const hallImage = document.getElementById("hall-image");

    if (!hallImage) return;

    const imageRect = hallImage.getBoundingClientRect();
    const overlayRect = hallOverlay.getBoundingClientRect();

    if (imageRect.width === 0 || imageRect.height === 0) {
        return;
    }

    const x = 0.52;
    const y = 0.36;

    papierReflexion.style.left =
        (imageRect.left - overlayRect.left + imageRect.width * x) + "px";

    papierReflexion.style.top =
        (imageRect.top - overlayRect.top + imageRect.height * y) + "px";
}


/* Attendre que l'image du Hall soit réellement prête */

const hallImage = document.getElementById("hall-image");

if (hallImage.complete && hallImage.naturalWidth > 0) {

    requestAnimationFrame(placerPapierReflexion);

} else {

    hallImage.addEventListener("load", () => {
        requestAnimationFrame(placerPapierReflexion);
    });

}


/* Recalculer si la taille de l'écran change */

window.addEventListener("resize", () => {
    requestAnimationFrame(placerPapierReflexion);
});

papierReflexion.addEventListener("click", () => {
    reflexion.hidden = !reflexion.hidden;
});

document.addEventListener("click", (event) => {

    if (
        !papierReflexion.contains(event.target) &&
        !reflexion.contains(event.target)
    ) {
        reflexion.hidden = true;
    }

});

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

function enveloppeMarkup(classee) {
    return `
        <span class="enveloppe-corps" aria-hidden="true">
            <span class="enveloppe-rabat"></span>
            <img class="enveloppe-logo" src="logo-atelier-du-seuil.png" alt="">
            <span class="enveloppe-sceau">AS</span>
        </span>
    `;
}

function installerEnqueteDuMoment() {
    if (
        typeof ARTISAN === "undefined" ||
        !ARTISAN.enqueteDuMoment ||
        !ARTISAN.enqueteDuMoment.active
    ) return;

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
    enveloppe.innerHTML = enveloppeMarkup(affaireEstClassee());

    if (affaireEstClassee()) {
        enveloppe.classList.add("est-classee");
        enveloppe.setAttribute("aria-label", "Affaire classée");
    } else {
        enveloppe.setAttribute("aria-label", "Ouvrir l'Enquête du Moment");
    }

    enveloppe.addEventListener("click", function() {
        if (!affaireEstClassee()) ouvrirEnquete(enveloppe);
    });

    hallOverlay.appendChild(enveloppe);
}

function ouvrirEnquete(enveloppeHall) {
    if (enqueteFond) return;

    enqueteFond = document.createElement("div");
    enqueteFond.id = "enquete-fond";
    enqueteFond.className = "anime-ouverture";

    const scene = document.createElement("div");
    scene.id = "enquete-scene-enveloppe";
    scene.innerHTML = `
        <div class="enveloppe-grand-format">
            <div class="face face-avant">
                <img class="logo-grand-format" src="logo-atelier-du-seuil.png" alt="">
            </div>
            <div class="face face-dos">
                <div class="rabat-grand-format"></div>
                <div class="poche-grand-format"></div>
            </div>
        </div>
    `;

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

    enqueteFond.appendChild(scene);
    enqueteFond.appendChild(feuille);
    document.body.appendChild(enqueteFond);
    enveloppeHall.style.visibility = "hidden";

    const champ = feuille.querySelector("#enquete-proposition");
    const formulaire = feuille.querySelector("#enquete-formulaire");
    const choix = feuille.querySelector("#enquete-choix");
    let fermetureEnCours = false;

    function terminerFermeture(classee) {
        if (!enqueteFond) return;
        enqueteFond.remove();
        enqueteFond = null;
        enveloppeHall.style.visibility = "";
        if (classee) {
            enveloppeHall.classList.add("est-classee", "vient-detre-classee");
            enveloppeHall.setAttribute("aria-label", "Affaire classée");
        }
    }

    function refermer(classee) {
        if (fermetureEnCours || !enqueteFond) return;
        fermetureEnCours = true;
        enqueteFond.classList.remove("anime-ouverture");
        enqueteFond.classList.add(classee ? "anime-classement" : "anime-fermeture");
        setTimeout(function(){ terminerFermeture(classee); }, 1900);
    }

    feuille.querySelector("#enquete-fermer").addEventListener("click", function(){ refermer(false); });
    feuille.querySelector("#enquete-reflechir").addEventListener("click", function(){ refermer(false); });

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
            refermer(true);
        } else {
            formulaire.hidden = true;
            choix.hidden = false;
        }
    });

    setTimeout(function() { champ.focus(); }, 1900);
}

installerReflexionDuSeuil();
installerEnqueteDuMoment();
