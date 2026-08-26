"use strict";

/* =========================================
   LE PANNEAU DE L'ARTISAN
   =========================================

   Ce fichier contient uniquement les éléments
   que l'Artisan peut modifier facilement.

   true  = visible dans le Hall
   false = absent du Hall

   ========================================= */

const ARTISAN = {

    /* -------------------------------------
       RÉFLEXION DU SEUIL
       ------------------------------------- */

    reflexion: {
        active: true,
        texte: "La vie avance en silence. Si tu veux vivre, alors fais du bruit..."
    },

    /* -------------------------------------
       ENQUÊTE DU MOMENT
       -------------------------------------

       Pour changer d'enquête, l'Artisan ne touche
       qu'à ce bloc.

       IMPORTANT : changez aussi l'identifiant à
       chaque nouvelle enquête. C'est lui qui permet
       au Seuil de savoir si CETTE affaire a déjà été
       classée sur le navigateur du Visiteur.
       ------------------------------------- */

    enqueteDuMoment: {
        active: true,

        identifiant: "enquete-001",
        categorie: "ENQUÊTE",
        titre: "Une affaire attend votre regard",

        contenu: "Un pas en avant, ou un pas en arrière, il sera toujours le premier. Même si il ne mène pas la danse, il rend la fuite impossible, qui est-ce ?",

        // Plusieurs réponses peuvent être acceptées.
        // Majuscules, accents et espaces superflus sont ignorés.
        reponsesAcceptees: ["le A", "A", "a", "la lettre A", "le a", "la lettre a"],

        // Position de l'enveloppe dans le Hall.
        // À ajuster facilement si nécessaire.
        position: {
            left: "50%",
            top: "43%",
            width: "9%"
        }
    }
};
