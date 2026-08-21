/* ==========================================================
   LE HALL DES POSSIBLES
   ASMEP
   VERSION 1.0.0
   ========================================================== */


/* ==========================================================
   ÉTAT D'ASMEP
   ========================================================== */

const ASMEP = {

    lieu : "hall",

    position : "panier",

    activite : "dormir",

   occupe : false,

   sprite : null,

element : null,

    objets : {

        panier : "panier",

        corde : "corde",

        balle : "balle",

        gamelle : "gamelle"

    }

    memoire : []
   
};

/* ==========================================================
   APPARITION D'ASMEP
   ========================================================== */

function creerASMEP(){

    ASMEP.element = document.createElement("img");

    ASMEP.element.id = "asmep";

    ASMEP.element.src = "asmep-dort.webp";

    document.body.appendChild(ASMEP.element);

    mettreAJourPosition();

}

function mettreAJourPosition(){

    switch(ASMEP.position){

        case "panier":

            ASMEP.element.style.left = "72%";
            ASMEP.element.style.top = "63%";
            break;

        case "canape":

            ASMEP.element.style.left = "86%";
            ASMEP.element.style.top = "56%";
            break;

        case "gamelle":

            ASMEP.element.style.left = "77%";
            ASMEP.element.style.top = "72%";
            break;

    }

}

/* ==========================================================
   LIEUX AUTORISÉS
   ========================================================== */

const LIEUX = {

    hall : [

        "panier",
        "canape",
        "gamelle"

    ],

    jardin : [

        "allee",
        "fontaine",
        "lierre",
        "pelouse"

    ]

};

/* ==========================================================
   INITIALISATION
   ========================================================== */

function initialiserASMEP(){

    respiration();

    oreilles();

    setInterval(propositionDuSeuil,240000);

}


/* ==========================================================
   RESPIRATION
   ========================================================== */

function respiration(){

    // Animation permanente.
    // Elle sera créée plus tard.

}


/* ==========================================================
   OREILLES
   ========================================================== */

function oreilles(){

    // Les oreilles réagissent régulièrement
    // aux bruits du Hall.

}


/* ==========================================================
   LE SEUIL PROPOSE
   ========================================================== */

function propositionDuSeuil(){

    switch(ASMEP.lieu){

        case "hall":

            propositionHall();

            break;

        case "jardin":

            propositionJardin();

            break;

    }

}

/* ==========================================================
   PROPOSITIONS DU HALL
   ========================================================== */

function propositionHall(){

    const propositions = [

        "dormir",
        "corde",
        "rever",
        "position",
        "boire",
        "jardin",
        "canape"

    ];

    const disponibles = propositions.filter(function(proposition){

        return !propositionRecente(proposition);

    });

    if(disponibles.length === 0){

        ASMEP.memoire = [];

        return propositionHall();

    }

    const proposition = disponibles[
        Math.floor(Math.random()*disponibles.length)
    ];

    memoriserProposition(proposition);

    proposerAASMEP(proposition);

}

/* ==========================================================
   LE SEUIL PROPOSE
   ========================================================== */

function ASMEP.decider(proposition){

    switch(proposition){

        case "dormir":

            continuerADormir();

            break;

        case "corde":

            jouerAvecLaCorde();

            break;

        case "rever":

            rever();

            break;

        case "position":

            changerDePosition();

            break;

        case "boire":

            allerBoire();

            break;

        case "jardin":

            allerAuJardin();

            break;

        case "canape":

            monterSurLeCanape();

            break;

    }

}

/* ==========================================================
   ACTIONS D'ASMEP
   ========================================================== */

function continuerADormir(){

    ASMEP.activite = "dormir";

}

function jouerAvecLaCorde(){

    ASMEP.activite = "jouer";

}

function rever(){

    ASMEP.activite = "rever";

}

function changerDePosition(){

    ASMEP.activite = "changer-position";

}

function allerBoire(){

    deplacerASMEP("gamelle");

}

function allerAuJardin(){

    deplacerASMEP("jardin");

}

function monterSurLeCanape(){

    deplacerASMEP("canape");

}

/* ==========================================================
   MÉMOIRE DU SEUIL
   ========================================================== */

function memoriserProposition(proposition){

    ASMEP.memoire.push(proposition);

    if(ASMEP.memoire.length > 2){

        ASMEP.memoire.shift();

    }

}

function propositionRecente(proposition){

    return ASMEP.memoire.includes(proposition);

}

/* ==========================================================
   ASMEP DÉCIDE
   ========================================================== */

ASMEP.decider = function(proposition){

    /* ------------------------------------------------------
       Si ASMEP est déjà occupé,
       il continue naturellement ce qu'il fait.
       ------------------------------------------------------ */

    if(ASMEP.occupe){

        return;

    }

    /* ------------------------------------------------------
       Le chien est libre d'accepter...
       ou non.
       ------------------------------------------------------ */

    const accepte = Math.random() < 0.80;

    if(!accepte){

        return;

    }

    proposerAASMEP(proposition);

};

/* ==========================================================
   DÉPLACEMENT D'ASMEP
   ========================================================== */

function deplacerASMEP(destination){

    ASMEP.occupe = true;

    ASMEP.destination = destination;

    ASMEP.activite = "marcher";

    marcherVersDestination();

}

function marcherVersDestination(){

    /* ---------------------------------------------
       Temps de trajet.
       Entre 20 et 80 secondes.
    ---------------------------------------------- */

    const duree = 20000 + Math.random() * 60000;

    setTimeout(function(){

        terminerDeplacement();

    }, duree);

}

function terminerDeplacement(){

    ASMEP.position = ASMEP.destination;

   mettreAJourPosition();

    ASMEP.destination = null;

    ASMEP.activite = "repos";

    ASMEP.occupe = false;

}
