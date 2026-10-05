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

        identifiant: "enquete-003",
        categorie: "Analyse",
        titre: "Une affaire attend votre regard",

        contenu: "Je ne fais de tort à personne, mais je disparais au coucher du jour. La lune peut me créer, mais elle n'aura pas le privilège de me contrôler. Je serai toujours à tes côtés, même si la nuit, tu ne me vois pas. On pense que je suis le mauvais côté des gens, mais je ne révèle rien d'autre que la vérité"

        // Plusieurs réponses peuvent être acceptées.
        // Majuscules, accents et espaces superflus sont ignorés.
        reponsesAcceptees: ["ombre", "l'ombre", "mon ombre", "une ombre"],

        // Position de l'enveloppe SUR L'IMAGE du Hall.
        // x / y : de 0 à 1. La position reste donc stable sur PC et téléphone.
        position: {
            x: 0.405,
            y: 0.330,
            largeur: 0.046
        }
    }
};
