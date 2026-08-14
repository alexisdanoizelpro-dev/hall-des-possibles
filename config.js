/*
==========================================================

LE REGISTRE DU SEUIL

Ce registre raconte l'état du Hall.

Le code ne décide jamais.
Il écoute le Registre.

L'essentiel est suffisant.

==========================================================
*/

"use strict";

const RegistreDuSeuil = {

        /* ==========================================================
       CHAPITRE I
       LE HALL

       Le Hall est le cœur du Seuil.
       Tout le reste prend vie autour de lui.
    ========================================================== */

    Hall: {

        Nom: "Le Hall des Possibles",

        Image: "hall-versionfondatrice.png",

        Visible: false

    },

        /* ==========================================================
       CHAPITRE II
       LES HABITANTS

       Chaque habitant possède sa propre personnalité.
       Le Hall ne leur impose jamais d'être présents.
    ========================================================== */

    Habitants: {

        ASMEP: {

            Nom: "ASMEP",

            Présent: true,

            Visible: true,

            Dort: true,

            PeutAllerAuJardin: true,

            PeutEntrerAuVestibule: false

        }

    },

        /* ==========================================================
       CHAPITRE III
       LES OBJETS

       Les objets racontent la vie du Hall.
       Ils peuvent évoluer, apparaître, disparaître
       ou simplement changer de place.

       Le Hall demeure.
       Les objets vivent.
    ========================================================== */

    Objets: {

        Tableau: {

            Visible: true,

            Image: "",

            Position: ""

        },



        Balle: {

            Visible: true,

            Position: ""

        },



        Laisse: {

            Visible: true,

            Position: ""

        },



        Corde: {

            Visible: true,

            Position: ""

        },



        Panier: {

            Visible: true,

            Position: ""

        },



        Gamelle: {

            Visible: true,

            Position: ""

        }

    },

            /* ==========================================================
       CHAPITRE IV
       LES RENCONTRES

       Les Rencontres permettent au Visiteur de laisser
       une trace, une pensée ou une idée.

       Chacune possède sa propre voix,
       mais toutes partagent le même esprit.

    ========================================================== */

    Rencontres: {

        LivreOr: {

            Visible: true,

            Ouvert: false

        },



        TableDesIdees: {

            Visible: true,

            Ouverte: false

        },



        CoupelleDeLait: {

            Visible: false,

            Disponible: false

        }

    },

            /* ==========================================================
       CHAPITRE V
       LES DÉCOUVERTES

       Les Découvertes accompagnent le Visiteur.
       Elles ne cherchent jamais à convaincre.
       Elles attendent simplement d'être rencontrées.

    ========================================================== */

    Découvertes: {

        ParoleDuMoment: {

            Visible: true,

            Nom: "",

            Texte: ""

        },



        EnigmeDuMoment: {

            Visible: true,

            Nom: "",

            Texte: "",

            Réponse: ""

        },



        RéflexionsDuSeuil: {

            Visibles: []

        },



        LoisDuSeuil: {

            Visibles: []

        },



        Archives: {

            Disponibles: []

        }

    },


            /* ==========================================================
       CHAPITRE VI
       L'AMBIANCE

       L'Ambiance ne cherche jamais à attirer l'attention.
       Elle accompagne simplement le Visiteur.

       Elle est discrète.
       Mais lorsqu'elle disparaît...
       Le Hall n'est plus tout à fait le même.

    ========================================================== */

    Ambiance: {

        Musique: {

            Visible: true,

            LectureAutomatique: true,

            Volume: 30

        },



        Cheminée: {

            Visible: true,

            Animée: true

        },



        Lumière: {

            Visible: true

        }

    },

            /* ==========================================================
       CHAPITRE VII
       LES PORTES

       Les Portes ne forcent jamais le passage.

       Elles attendent simplement que le Visiteur
       choisisse de les pousser.

    ========================================================== */

    Portes: {

        Hall: {

            Visible: true,

            Ouverte: true

        },



        Jardin: {

            Visible: true,

            Ouverte: false

        },



        Vestibule: {

            Visible: false,

            Ouverte: false

        },



        Atelier: {

            Visible: true,

            Ouverte: false

        }

    },

        };
 
window.RegistreDuSeuil = RegistreDuSeuil;
