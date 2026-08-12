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

        Image: "assets/hall/hall-versionfondatrice.png",

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
