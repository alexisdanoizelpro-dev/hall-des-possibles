/* ==========================================================
   LIVRE D'OR
   LE HALL DES POSSIBLES
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

    livreFond.onclick = fermerLivre;

    livre = document.createElement("div");
    livre.id = "livre";

    livre.onclick = function(e){

        e.stopPropagation();

    };

    livreImage = document.createElement("img");
    livreImage.id = "livre-image";

    livre.appendChild(livreImage);

    livreFond.appendChild(livre);

    document.body.appendChild(livreFond);

    afficherPremierArtisan();

}

/* ==========================================================
   PAGE 1
   LE PREMIER ARTISAN
   ========================================================== */

function afficherPremierArtisan(){

    nettoyerLivre();

    livreImage.src = "livre-or-premier-artisan.webp";

    boutonAction = document.createElement("button");
    boutonAction.id = "zone-plume";

    boutonAction.onclick = function(e){

        e.stopPropagation();

        afficherPageTrace();

    };

    livre.appendChild(boutonAction);

}

/* ==========================================================
   PAGE 2
   LAISSEZ VOTRE TRACE
   ========================================================== */

function afficherPageTrace(){

    nettoyerLivre();

    livreImage.src = "livre-or-page-vierge.webp";

    champNom = document.createElement("input");
    champNom.id = "trace-nom";
    champNom.type = "text";
    champNom.placeholder = "Prénom";

    champMessage = document.createElement("textarea");
    champMessage.id = "trace-message";
    champMessage.placeholder = "";

    livre.appendChild(champNom);
    livre.appendChild(champMessage);

    boutonAction = document.createElement("button");
    boutonAction.id = "zone-plume";

    boutonAction.onclick = function(e){

        e.stopPropagation();

        afficherTraceGravee();

    };

    livre.appendChild(boutonAction);

}

/* ==========================================================
   PAGE 3
   TRACE GRAVÉE
   ========================================================== */

function afficherTraceGravee(){

    nettoyerLivre();

    livreImage.src = "livre-or-trace-gravee.webp";

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
   FIN
   ========================================================== */
