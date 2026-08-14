"use strict";

/* ==========================================================
   LE HALL DES POSSIBLES
   VERSION FONDATRICE - V1.0.1
   LE GARDIEN
   ========================================================== */

console.log("🐾 Le Gardien ouvre le Hall.");

const hallOverlay = document.getElementById("hall-overlay");

if (!hallOverlay) {
    console.error("Impossible de trouver #hall-overlay");
} else {

    const asmep = document.createElement("img");

    asmep.id = "asmep";

    asmep.src = "asmep1408.png";

    asmep.alt = "ASMEP";

    asmep.className = "hall-element";

    asmep.style.left = "50%";
    asmep.style.top = "67%";

    asmep.style.width = "150px";

    asmep.style.transform = "translate(-50%, -50%)";

    hallOverlay.appendChild(asmep);

    console.log("🐾 ASMEP veille sur le Hall.");
}
