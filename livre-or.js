"use strict";

/* ==========================================================
   LIVRE D'OR
   COUCHE 1
   ========================================================== */

let fondLivre = null;
let livre = null;
let imageLivre = null;

function ouvrirLivreOr(){

    if(fondLivre){
        return;
    }

    fondLivre = document.createElement("div");
    fondLivre.id = "livre-fond";

    livre = document.createElement("div");
    livre.id = "livre-or";

    imageLivre = document.createElement("img");
    imageLivre.id = "livre-image";
    imageLivre.src = "livre-or-premier-artisan.webp";

    livre.appendChild(imageLivre);

    const retour = document.createElement("button");
    retour.id = "livre-retour";
    retour.textContent = "J'ai encore besoin de réfléchir.";
    retour.addEventListener("click", fermerLivre);

    const trace = document.createElement("button");
    trace.id = "livre-trace";
    trace.textContent = "Laisser ma Trace";
    trace.addEventListener("click", afficherPageTrace);

    livre.appendChild(retour);
    livre.appendChild(trace);

    fondLivre.appendChild(livre);

    document.body.appendChild(fondLivre);

}

function fermerLivre(){

    if(!fondLivre){
        return;
    }

    fondLivre.remove();

    fondLivre = null;
    livre = null;
    imageLivre = null;

}

/* ==========================================================
   COUCHE 2
   PAGE VIERGE
   ========================================================== */

function afficherPageTrace(){

    imageLivre.src = "livre-or-page-vierge.webp";

    const boutons = livre.querySelectorAll("button");

    boutons.forEach(bouton => bouton.remove());

    const retour = document.createElement("button");
    retour.id = "livre-retour";
    retour.textContent = "J'ai encore besoin de réfléchir.";
    retour.addEventListener("click", fermerLivre);

    const trace = document.createElement("button");
    trace.id = "livre-trace";
    trace.textContent = "Laisser ma Trace";
    trace.addEventListener("click", afficherTraceGravee);

    livre.appendChild(retour);
    livre.appendChild(trace);

}
