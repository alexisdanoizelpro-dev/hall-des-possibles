"use strict";

/* ==========================================================
   LE HALL DES POSSIBLES
   LIVRE D'OR
   VERSION FONDATRICE - V1.0.0
   ========================================================== */

let fondLivre = null;
let livre = null;
let imageLivre = null;

/* ==========================================================
   OUVERTURE DU LIVRE
   ========================================================== */

function ouvrirLivreOr(){

    // Empêche plusieurs ouvertures
    if(fondLivre){
        return;
    }

    creerFond();

    creerLivre();

    afficherPremierArtisan();

}

/* ==========================================================
   FOND
   ========================================================== */

function creerFond(){

    fondLivre = document.createElement("div");

    fondLivre.id = "livre-fond";

    document.body.appendChild(fondLivre);

}

/* ==========================================================
   LIVRE
   ========================================================== */

function creerLivre(){

    livre = document.createElement("div");

    livre.id = "livre-or";

    imageLivre = document.createElement("img");

    imageLivre.id = "livre-image";

    livre.appendChild(imageLivre);

    fondLivre.appendChild(livre);

}

/* ==========================================================
   PREMIÈRE PAGE
   ========================================================== */

function afficherPremierArtisan(){

    imageLivre.src = "livre-or-premier-artisan.webp";

    supprimerZones();

    creerBoutonRetour();

    creerBoutonTrace();

}

/* ==========================================================
   BOUTON RETOUR
   ========================================================== */

function creerBoutonRetour(){

    const bouton = document.createElement("button");

    bouton.id = "livre-retour";

    bouton.textContent = "J'ai encore besoin de réfléchir.";

    bouton.addEventListener("click", fermerLivre);

    livre.appendChild(bouton);

}

/* ==========================================================
   BOUTON TRACE
   ========================================================== */

function creerBoutonTrace(){

    const bouton = document.createElement("button");

    bouton.id = "livre-trace";

    bouton.textContent = "Laisser ma Trace";

    bouton.addEventListener("click", afficherPageTrace);

    livre.appendChild(bouton);

}

/* ==========================================================
   FERMETURE
   ========================================================== */

function fermerLivre(){

    if(fondLivre){

        fondLivre.remove();

    }

    fondLivre = null;

    livre = null;

    imageLivre = null;

}

/* ==========================================================
   PAGE TRACE
   ========================================================== */

function afficherPageTrace(){

    imageLivre.src = "livre-or-page-vierge.webp";

    supprimerZones();

    creerChampNom();

    creerChampTrace();

    creerBoutonRetour();

    creerBoutonGraver();

}

/* ==========================================================
   NOM
   ========================================================== */

function creerChampNom(){

    const champ = document.createElement("input");

    champ.id = "trace-nom";

    champ.placeholder = "Nom (facultatif)";

    livre.appendChild(champ);

}

/* ==========================================================
   TRACE
   ========================================================== */

function creerChampTrace(){

    const champ = document.createElement("textarea");

    champ.id = "trace-message";

    champ.placeholder = "Laissez ici votre Trace...";

    livre.appendChild(champ);

}

/* ==========================================================
   BOUTON GRAVER
   ========================================================== */

function creerBoutonGraver(){

    const bouton = document.createElement("button");

    bouton.id = "livre-trace";

    bouton.textContent = "Laisser ma Trace";

    bouton.addEventListener("click", graverTrace);

    livre.appendChild(bouton);

}

/* ==========================================================
   TRACE GRAVÉE
   ========================================================== */

function graverTrace(){

    imageLivre.src = "livre-or-trace-gravee.webp";

    supprimerZones();

    const bouton = document.createElement("button");

    bouton.id = "livre-retour";

    bouton.textContent = "Revenir dans le Hall";

    bouton.addEventListener("click", fermerLivre);

    livre.appendChild(bouton);

}

/* ==========================================================
   NETTOYAGE
   ========================================================== */

function supprimerZones(){

    livre.querySelectorAll("button").forEach(element => element.remove());

    livre.querySelectorAll("input").forEach(element => element.remove());

    livre.querySelectorAll("textarea").forEach(element => element.remove());

}
