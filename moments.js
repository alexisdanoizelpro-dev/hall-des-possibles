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


    /* =========================================
       PETIT PAPIER DANS LA BIBLIOTHÈQUE
       ========================================= */

    const papierReflexion = document.createElement("button");

    papierReflexion.id = "papier-reflexion";
    papierReflexion.type = "button";
    papierReflexion.setAttribute(
        "aria-label",
        "Découvrir une Réflexion du Seuil"
    );


    /* =========================================
       BILLET DE LA RÉFLEXION
       ========================================= */

    const reflexion = document.createElement("section");

    reflexion.id = "reflexion-du-seuil";
    reflexion.setAttribute("role", "dialog");
    reflexion.setAttribute("aria-modal", "false");
    reflexion.setAttribute("aria-label", "Réflexion");

    reflexion.innerHTML = `
        <button
            id="reflexion-fermer"
            type="button"
            aria-label="Refermer la Réflexion"
        >×</button>

        <div class="reflexion-filigrane" aria-hidden="true"></div>

        <p class="reflexion-texte"></p>
    `;

    reflexion.querySelector(".reflexion-texte").textContent =
        ARTISAN.reflexion.texte;

    reflexion.hidden = true;

    hallOverlay.appendChild(papierReflexion);
    hallOverlay.appendChild(reflexion);


    /* =========================================
       POSITION DU PETIT PAPIER
       ========================================= */

function placerPapierReflexion() {

    const hallImage = document.getElementById("hall-image");

    if (!hallImage) return;

    /*
       On utilise désormais les dimensions INTERNES de l'image.
       Elles ne sont pas faussées par le zoom mobile du Hall.
    */

    const imageLeft = hallImage.offsetLeft;
    const imageTop = hallImage.offsetTop;
    const imageWidth = hallImage.offsetWidth;
    const imageHeight = hallImage.offsetHeight;

    if (imageWidth === 0 || imageHeight === 0) {
        return;
    }

    /*
       POSITION VALIDÉE.
       NE PLUS TOUCHER.
    */

    const x = 0.795;
    const y = 0.17;

    papierReflexion.style.left =
        (imageLeft + imageWidth * x) + "px";

    papierReflexion.style.top =
        (imageTop + imageHeight * y) + "px";
}

    /* Attendre que l'image du Hall soit prête */

    const hallImage = document.getElementById("hall-image");

    if (hallImage.complete && hallImage.naturalWidth > 0) {

        requestAnimationFrame(placerPapierReflexion);

    } else {

        hallImage.addEventListener(
            "load",
            () => {
                requestAnimationFrame(placerPapierReflexion);
            },
            { once: true }
        );
    }


    /* Recalculer uniquement si l'écran change de taille */

    window.addEventListener("resize", () => {
        requestAnimationFrame(placerPapierReflexion);
    });


    /* =========================================
       OUVERTURE / FERMETURE DU BILLET
       ========================================= */

    function ouvrirReflexion() {
        reflexion.hidden = false;
    }

    function fermerReflexion() {
        reflexion.hidden = true;
    }


    papierReflexion.addEventListener("click", (event) => {
        event.stopPropagation();
        ouvrirReflexion();
    });


    reflexion
        .querySelector("#reflexion-fermer")
        .addEventListener("click", (event) => {

            event.stopPropagation();
            fermerReflexion();
        });


    /*
       Un clic ailleurs dans le Hall
       referme simplement le billet.
    */

    document.addEventListener("click", (event) => {

        if (
            !papierReflexion.contains(event.target) &&
            !reflexion.contains(event.target)
        ) {
            fermerReflexion();
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

    function placerEnveloppe() {

    const hallImage = document.getElementById("hall-image");
    if (!hallImage) return;

    /*
       Même principe que pour la Réflexion :
       dimensions internes, indépendantes du zoom mobile.
    */

    const imageLeft = hallImage.offsetLeft;
    const imageTop = hallImage.offsetTop;
    const imageWidth = hallImage.offsetWidth;
    const imageHeight = hallImage.offsetHeight;

    if (imageWidth === 0 || imageHeight === 0) return;

    const x =
        typeof position.x === "number"
            ? position.x
            : 0.69;

    const y =
        typeof position.y === "number"
            ? position.y
            : 0.485;

    const largeur =
        typeof position.largeur === "number"
            ? position.largeur
            : 0.052;

    enveloppe.style.left =
        (imageLeft + imageWidth * x) + "px";

    enveloppe.style.top =
        (imageTop + imageHeight * y) + "px";

    enveloppe.style.width =
        (imageWidth * largeur) + "px";
}

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

    const hallImage = document.getElementById("hall-image");

    if (hallImage && hallImage.complete && hallImage.naturalWidth > 0) {
        requestAnimationFrame(placerEnveloppe);
    } else if (hallImage) {
        hallImage.addEventListener("load", function() {
            requestAnimationFrame(placerEnveloppe);
        }, { once: true });
    }

    window.addEventListener("resize", function() {
        requestAnimationFrame(placerEnveloppe);
    });
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
    <label for="enquete-visiteur">Comment devons-nous vous appeler ?</label>
    <input
        id="enquete-visiteur"
        type="text"
        autocomplete="nickname"
        placeholder="Nom ou pseudonyme"
    >

    <label for="enquete-proposition">Votre proposition</label>
    <input id="enquete-proposition" type="text" autocomplete="off">

    <button id="enquete-confier" type="submit">
        Confier ma proposition au Seuil
    </button>
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
    const visiteur = feuille.querySelector("#enquete-visiteur");
    const bouton = feuille.querySelector("#enquete-confier");

let sessionId = sessionStorage.getItem("seuil-enquete-session");

if (!sessionId) {
    sessionId = crypto.randomUUID
        ? crypto.randomUUID()
        : "session-" + Date.now() + "-" + Math.random().toString(36).slice(2);

    sessionStorage.setItem("seuil-enquete-session", sessionId);
}

let tentative = Number(
    sessionStorage.getItem("seuil-enquete-tentative") || "0"
);
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
    champ.readOnly = false;

    if (visiteur) {
        visiteur.readOnly = false;
    }

    if (bouton) {
        bouton.disabled = false;
        bouton.textContent = "Confier ma proposition au Seuil";
    }

    champ.focus();
});
   
formulaire.addEventListener("submit", function(e) {
    e.preventDefault();

    const proposition = champ.value.trim();
    if (!proposition) return;

    const nomVisiteur =
        visiteur && visiteur.value.trim()
            ? visiteur.value.trim()
            : "Visiteur anonyme";

    tentative += 1;

    sessionStorage.setItem(
        "seuil-enquete-tentative",
        String(tentative)
    );

    const acceptee = reponseEstAcceptee(proposition);

    if (window.SUPABASE_SEUIL) {
        SUPABASE_SEUIL.enregistrerReponseEnquete({
            visiteur: nomVisiteur,
            session_id: sessionId,
            tentative: tentative,
            enquete_id: ARTISAN.enqueteDuMoment.identifiant,
            proposition: proposition,
            resultats: acceptee
                ? "acceptee"
                : "autre_proposition",
            action: null
        });
    }

    const bouton = feuille.querySelector("#enquete-confier");

    champ.readOnly = true;

    if (visiteur) {
        visiteur.readOnly = true;
    }

    if (bouton) {
        bouton.disabled = true;
        bouton.textContent =
            "Le Seuil examine votre proposition…";
    }

    /*
       Le Seuil prend le même temps,
       que la proposition soit juste ou non.
    */
    setTimeout(function() {

        if (acceptee) {

            classerAffaire();
            refermer(true);

        } else {

            const silence = document.createElement("div");

            silence.textContent =
                "Le Seuil demeure silencieux…";

            silence.style.opacity = "0";
            silence.style.transition =
                "opacity 0.45s ease";
            silence.style.textAlign = "center";
            silence.style.marginTop = "18px";
            silence.style.fontStyle = "italic";

            formulaire.insertAdjacentElement(
                "afterend",
                silence
            );

            formulaire.hidden = true;

            requestAnimationFrame(function() {
                silence.style.opacity = "1";
            });

            /*
               Petit instant supplémentaire :
               le Visiteur comprend que
               l'affaire n'est pas encore résolue.
            */
            setTimeout(function() {

                silence.style.opacity = "0";

                setTimeout(function() {

                    silence.remove();

                    choix.hidden = false;
                    choix.style.opacity = "0";
                    choix.style.transition =
                        "opacity 0.5s ease";

                    requestAnimationFrame(function() {
                        choix.style.opacity = "1";
                    });

                }, 450);

            }, 700);
        }

    }, 1800);
});

    setTimeout(function() { champ.focus(); }, 1900);
}

installerReflexionDuSeuil();
installerEnqueteDuMoment();
