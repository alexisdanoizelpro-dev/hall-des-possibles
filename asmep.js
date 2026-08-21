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

    objets : {

        panier : "panier",

        corde : "corde",

        balle : "balle",

        gamelle : "gamelle"

    }

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

    const tirage = Math.random();

    if(tirage < 0.40){

        continuerADormir();

    }

    else if(tirage < 0.50){

        jouerAvecLaCorde();

    }

    else if(tirage < 0.60){

        rever();

    }

    else if(tirage < 0.70){

        changerDePosition();

    }

    else if(tirage < 0.80){

        allerBoire();

    }

    else if(tirage < 0.90){

        allerAuJardin();

    }

    else{

        monterSurLeCanape();

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

