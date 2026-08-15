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

function ouvrirPupitre(){

    if(document.getElementById("fenetre-seuil")){
        return;
    }

    const fond = document.createElement("div");

fond.id = "fenetre-seuil";

const registre = document.createElement("div");

registre.id = "registre-seuil";

  const titre = document.createElement("h2");

titre.textContent = "Le Registre des Idées";

const texte = document.createElement("p");

texte.textContent =
"Ici, chaque idée mérite d'être entendue. Prenez le temps qu'il vous faut avant de tourner cette première page.";

registre.appendChild(titre);

registre.appendChild(texte); 

 const bouton = document.createElement("button");

bouton.id = "ouvrir-registre";

bouton.textContent = "Ouvrir le Registre";

 bouton.addEventListener("click", ouvrirRegistre);  

registre.appendChild(bouton);  

fond.appendChild(registre);

document.body.appendChild(fond);

}

function ouvrirRegistre(){

    const registre = document.getElementById("registre-seuil");

    registre.innerHTML = "";

    const titre = document.createElement("h2");

    titre.textContent = "Commençons.";

    const texte = document.createElement("p");

    texte.textContent =
    "Les quelques questions qui suivent permettront à l'Artisan de mieux comprendre votre idée. Il n'existe pas de bonne ou de mauvaise réponse. Prenez simplement le temps qu'il vous faut.";

    registre.appendChild(titre);

    registre.appendChild(texte);

}
