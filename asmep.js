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

    },

    memoire : []
   
};

/* ==========================================================
   APPARITION D'ASMEP
   ========================================================== */

function creerASMEP(){

    ASMEP.element = document.createElement("img");

   ASMEP.element.classList.add("asmep-respire");

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

   clignerDesYeux();

}

/* ==========================================================
   RESPIRATION
   ========================================================== */

function respiration(){

    if(!ASMEP.element){

        return;

    }

    let inspiration = true;

    setInterval(function(){

        if(!ASMEP.element){

            return;

        }

        if(inspiration){

            ASMEP.element.style.transform = "translateY(-2px)";

        }else{

            ASMEP.element.style.transform = "translateY(0px)";

        }

        inspiration = !inspiration;

    },2500);

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

    ASMEP.decider(proposition);

}

/* ==========================================================
   LE SEUIL PROPOSE
   ========================================================== */

function proposerAASMEP(proposition){

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

    commencerActivite("dormir");

}

function jouerAvecLaCorde(){

    commencerActivite("jouer");

}

function rever(){

    commencerActivite("rever");

}

function changerDePosition(){

    commencerActivite("changer-position");

}

function allerBoire(){

    commencerActivite("boire");

}

function allerAuJardin(){

    commencerActivite("jardin");

}

function monterSurLeCanape(){

    commencerActivite("canape");

}

/* ==========================================================
   ACTIVITÉS D'ASMEP
   ========================================================== */

function commencerActivite(activite){

    switch(activite){

        case "dormir":

            changerPosture("dormir");
            break;

        case "jouer":

            changerPosture("jouer");
            break;

        case "rever":

            changerPosture("rever");
            break;

        case "boire":

            changerPosture("boire");
            break;

        case "canape":

            changerPosture("canape");
            break;

        case "changer-position":

            changerPosture("changer-position");
            break;

    }

setTimeout(function(){

    ASMEP.occupe = false;

}, dureeActivite(activite));

  }

   /* ==========================================================
   DURÉE DES ACTIVITÉS
   ========================================================== */

function dureeActivite(activite){

    switch(activite){

        case "dormir":

            return 180000;

        case "jouer":

            return 90000;

        case "rever":

            return 60000;

        case "boire":

            return 30000;

        case "canape":

            return 180000;

        case "changer-position":

            return 15000;

        default:

            return 60000;

    }

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

/* ==========================================================
   POSTURES D'ASMEP
   ========================================================== */

function changerPosture(posture){

    ASMEP.activite = posture;

    if(!ASMEP.element){

        return;

    }

    switch(posture){

        case "dormir":

            ASMEP.element.src = "asmep-dort.webp";
            break;

        case "rever":

            ASMEP.element.src = "asmep-reve.webp";
            break;

        case "jouer":

            ASMEP.element.src = "asmep-joue.webp";
            break;

        case "boire":

            ASMEP.element.src = "asmep-boit.webp";
            break;

        case "canape":

            ASMEP.element.src = "asmep-canape.webp";
            break;

        case "changer-position":

            ASMEP.element.src = "asmep-position.webp";
            break;

    }

}

/* ==========================================================
   MOUVEMENT DES OREILLES
   ========================================================== */

function oreilles(){

    if(!ASMEP.element){

        return;

    }

    setInterval(function(){

        if(!ASMEP.element){

            return;

        }

        /* Une chance sur trois de réagir */

        if(Math.random() > 0.33){

            return;

        }

        ASMEP.element.classList.add("asmep-ecoute");

        setTimeout(function(){

            if(ASMEP.element){

                ASMEP.element.classList.remove("asmep-ecoute");

            }

        },600);

    },30000);

}

/* ==========================================================
   CLIGNEMENT DES YEUX
   ========================================================== */

function clignerDesYeux(){

    if(!ASMEP.element){

        return;

    }

    setInterval(function(){

        if(!ASMEP.element){

            return;

        }

        /* Une chance sur deux de cligner */

        if(Math.random() > 0.50){

            return;

        }

        ASMEP.element.classList.add("asmep-cligne");

        setTimeout(function(){

            if(ASMEP.element){

                ASMEP.element.classList.remove("asmep-cligne");

            }

        },200);

    },45000);

}
