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

   asmep.style.pointerEvents = "none";

    hallOverlay.appendChild(asmep);

    console.log("🐾 ASMEP veille sur le Hall.");
}

/* ==========================================================
   PIERRE N°3
   LE PUPITRE
   ========================================================== */

const zonePupitre = document.createElement("div");

zonePupitre.id = "zone-pupitre";

zonePupitre.className = "hall-element";

zonePupitre.style.position = "absolute";
zonePupitre.style.left = "8%";
zonePupitre.style.top = "53%";
zonePupitre.style.width = "16%";
zonePupitre.style.height = "28%";

zonePupitre.style.cursor = "pointer";

hallOverlay.appendChild(zonePupitre);

zonePupitre.addEventListener("click", ouvrirPupitre);

/* ==========================================================
   PIERRE N°12
   LE LIVRE D'OR
   ========================================================== */

const zoneLivre = document.createElement("div");

zoneLivre.className = "hall-element";

zoneLivre.style.position = "absolute";

zoneLivre.style.left = "46%";

zoneLivre.style.top = "54%";

zoneLivre.style.width = "22%";

zoneLivre.style.height = "9%";

zoneLivre.style.cursor = "pointer";

hallOverlay.appendChild(zoneLivre);


zoneLivre.addEventListener("click", () => {

    ouvrirLivreOr();

});

/* ==========================================================
   INFORMATIONS LÉGALES
   "LES PAGES JAUNES"
   ========================================================== */

const pagesJaunes = document.createElement("img");

pagesJaunes.id = "pages-jaunes";
pagesJaunes.src = "informations.png";
pagesJaunes.alt = "Informations légales";
pagesJaunes.className = "hall-element";

pagesJaunes.style.left = "82%";
pagesJaunes.style.top = "72%";
pagesJaunes.style.width = "7%";
pagesJaunes.style.transform = "translate(-50%, -50%) rotate(-5deg)";
pagesJaunes.style.cursor = "pointer";

hallOverlay.appendChild(pagesJaunes);

pagesJaunes.addEventListener("click", () => {
    window.location.href = "informations-legales.html";
});

/* ==========================================================
   PIERRE N°11
   FRANCHIR LE SEUIL
   ========================================================== */

const seuil = document.getElementById("seuil");

seuil.addEventListener("click", entrerDansLeHall);

function entrerDansLeHall(){

    seuil.style.backgroundImage = "url('porte-seuil-ouverte.png')";

    setTimeout(() => {

        seuil.style.display = "none";

    }, 1600);

}
