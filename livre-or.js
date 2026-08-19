"use strict";

/* ==========================================================
   LIVRE D'OR
   COUCHE 1
   OUVERTURE
   ========================================================== */

let fondLivre = null;
let livre = null;

function ouvrirLivreOr(){

    if(fondLivre){
        return;
    }

    fondLivre = document.createElement("div");
    fondLivre.id = "livre-fond";

    livre = document.createElement("div");
    livre.id = "livre-or";

    fondLivre.appendChild(livre);

    document.body.appendChild(fondLivre);

    fondLivre.addEventListener("click", fermerLivre);

}

function fermerLivre(){

    if(!fondLivre){
        return;
    }

    fondLivre.remove();

    fondLivre = null;
    livre = null;

}
