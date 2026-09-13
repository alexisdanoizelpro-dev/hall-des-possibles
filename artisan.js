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
        texte: "Vis ta vie, quoique tu fasses, les gens parleront alors vis, tout simplement."
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

        identifiant: "enquete-002",
        categorie: "Analyse",
        titre: "Une affaire attend votre regard",

        contenu: "Sachant que Mr Plot habite dans un phare et que Mr Flan habite au dessus d'une boulangerie, où vit Mr Hanté ?",

        // Plusieurs réponses peuvent être acceptées.
        // Majuscules, accents et espaces superflus sont ignorés.
        reponsesAcceptees: ["le cimetière", "un cimetière", "cimetière", "sous le cimetière", "sous un cimetière"],

        // Position de l'enveloppe SUR L'IMAGE du Hall.
        // x / y : de 0 à 1. La position reste donc stable sur PC et téléphone.
        position: {
            x: 0.405,
            y: 0.330,
            largeur: 0.046
        }
    }
};
