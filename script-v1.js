/*
==========================================================

LE GARDIEN

Le Gardien veille sur le Hall.

Il ne décide jamais.

Il écoute le Registre.
Il donne simplement vie au Hall.

L'essentiel est suffisant.

==========================================================
*/

"use strict";

const Registre = window.RegistreDuSeuil;

/* ==========================================================
   LEÇON II

   OUVRIR LE REGISTRE

   Le Gardien ouvre le Registre.
   Il vérifie simplement qu'il existe.

========================================================== */

function ouvrirLeRegistre() {

    if (!Registre) {

        console.error("Le Registre est introuvable.");

        return;

    }

    console.log("📖 Le Registre est ouvert.");

}
