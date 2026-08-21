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

    objets : {

        panier : "panier",

        corde : "corde",

        balle : "balle",

        gamelle : "gamelle"

    }

    memoire : []
   
};


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

    ASMEP.activite = "boire";

    ASMEP.position = "gamelle";

}

function allerAuJardin(){

    ASMEP.activite = "marcher";

    ASMEP.lieu = "jardin";

    ASMEP.position = "allee";

}

function monterSurLeCanape(){

    ASMEP.activite = "marcher";

    ASMEP.position = "canape";

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
