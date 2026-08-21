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

    if (!hallOverlay) {
        return;
    }

    const reflexion = document.createElement("div");

    reflexion.id = "reflexion-du-seuil";
    reflexion.textContent = ARTISAN.reflexion.texte;

    hallOverlay.appendChild(reflexion);
}


installerReflexionDuSeuil();
