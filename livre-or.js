"use strict";

/* ==========================================================
   LIVRE D'OR
   ========================================================== */

let livreFond = null;
let livre = null;
let livreImage = null;

let boutonRetour = null;
let boutonAction = null;

let champNom = null;
let champMessage = null;


/* ==========================================================
   OUVERTURE
   ========================================================== */

function ouvrirLivreOr(){

    if(livreFond){
        return;
    }

    livreFond = document.createElement("div");
    livreFond.id = "livre-fond";

    livre = document.createElement("div");
    livre.id = "livre-or";

    livreImage = document.createElement("img");
    livreImage.id = "livre-image";

    livre.appendChild(livreImage);

    document.body.appendChild(livreFond);
    livreFond.appendChild(livre);

    afficherPremierArtisan();

}


/* ==========================================================
   FERMETURE
   ========================================================== */

function fermerLivre(){

    if(livreFond){

        livreFond.remove();

    }

    livreFond = null;
    livre = null;
    livreImage = null;

    boutonRetour = null;
    boutonAction = null;

    champNom = null;
    champMessage = null;

}


/* ==========================================================
   OUTIL
   ========================================================== */

function nettoyerLivre(){

    while(livre.firstChild){

        livre.removeChild(livre.firstChild);

    }

    livre.appendChild(livreImage);

}

/* ==========================================================
   PAGE 1
   LE PREMIER ARTISAN
   ========================================================== */

function afficherPremierArtisan(){

    nettoyerLivre();

    livreImage.src = "livre-or-premier-artisan.webp";

    boutonRetour = document.createElement("button");
    boutonRetour.id = "livre-retour";
    boutonRetour.textContent = "J'ai encore besoin de réfléchir.";
    boutonRetour.onclick = fermerLivre;

    boutonAction = document.createElement("button");
    boutonAction.id = "livre-action";
    boutonAction.textContent = "Laisser ma Trace";
    boutonAction.onclick = afficherPageTrace;

    livre.appendChild(boutonRetour);
    livre.appendChild(boutonAction);

}


/* ==========================================================
   PAGE 2
   PAGE VIERGE
   ========================================================== */

function afficherPageTrace(){

    nettoyerLivre();

    livreImage.src = "livre-or-page-vierge.webp";

    champNom = document.createElement("input");
    champNom.id = "trace-nom";
    champNom.type = "text";
    champNom.placeholder = "Votre prénom";

    champMessage = document.createElement("textarea");
    champMessage.id = "trace-message";
    champMessage.placeholder = "Votre Trace";

    boutonRetour = document.createElement("button");
    boutonRetour.id = "livre-retour";
    boutonRetour.textContent = "J'ai encore besoin de réfléchir.";
    boutonRetour.onclick = fermerLivre;

    boutonAction = document.createElement("button");
    boutonAction.id = "livre-action";
    boutonAction.textContent = "Laisser ma Trace";
    boutonAction.onclick = afficherTraceGravee;

    livre.appendChild(champNom);
    livre.appendChild(champMessage);

    livre.appendChild(boutonRetour);
    livre.appendChild(boutonAction);

}

/* ==========================================================
   PAGE 3
   TRACE GRAVÉE
   ========================================================== */

function afficherTraceGravee(){

    nettoyerLivre();

    livreImage.src = "livre-or-trace-gravee.webp";

    boutonAction = document.createElement("button");
    boutonAction.id = "livre-action";
    boutonAction.textContent = "Revenir dans le Hall";
    boutonAction.onclick = fermerLivre;

    livre.appendChild(boutonAction);

}


/* ==========================================================
   FIN
   ========================================================== */
