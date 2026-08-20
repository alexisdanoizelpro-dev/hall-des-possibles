/* ==========================================================
   PAGE 1
   LE PREMIER ARTISAN
   ========================================================== */

function afficherPremierArtisan(){

    nettoyerLivre();

    livreImage.src = "livre-or-premier-artisan.webp";

    boutonRetour = document.createElement("button");
    boutonRetour.id = "zone-retour";
    boutonRetour.onclick = fermerLivre;

    boutonAction = document.createElement("button");
    boutonAction.id = "zone-trace";
    boutonAction.onclick = afficherPageTrace;

    livre.appendChild(boutonRetour);
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

    boutonRetour = document.createElement("button");
    boutonRetour.id = "zone-retour";
    boutonRetour.onclick = afficherPremierArtisan;

    boutonAction = document.createElement("button");
    boutonAction.id = "zone-valider";
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
    boutonAction.id = "zone-fermer";
    boutonAction.onclick = fermerLivre;

    livre.appendChild(boutonAction);

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
   FIN
   ========================================================== */
