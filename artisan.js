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

        contenu: "Ceci est le contenu de la première Enquête du Moment. Remplacez simplement ce texte dans artisan.js lorsque l'affaire sera prête.",

        // Plusieurs réponses peuvent être acceptées.
        // Majuscules, accents et espaces superflus sont ignorés.
        reponsesAcceptees: ["seuil"],

        // Position de l'enveloppe dans le Hall.
        // À ajuster facilement si nécessaire.
        position: {
            left: "50%",
            top: "43%",
            width: "9%"
        }
    }
};
