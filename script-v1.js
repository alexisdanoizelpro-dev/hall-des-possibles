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

ouvrirLeRegistre();

/* ==========================================================
   LEÇON III

   LIRE LE HALL

   Le Gardien découvre le premier chapitre
   du Registre.

========================================================== */

function lireLeHall() {

    const Hall = Registre.Hall;

    if (!Hall) {

        console.error("Le chapitre 'Hall' est introuvable.");

        return;

    }

    console.log("🏛️ Le Hall est lu.");

}

/* ==========================================================
   LEÇON IV

   OBSERVER LE HALL

   Le Gardien observe le Hall.
   Il ne le modifie jamais.
   Il apprend simplement à le connaître.

========================================================== */

function observerLeHall() {

    const Hall = Registre.Hall;

    console.log("Nom :", Hall.Nom);
    console.log("Image :", Hall.Image);
    console.log("Visible :", Hall.Visible);

}

/* ==========================================================
   LEÇON V

   ACCUEILLIR LE HALL

   Le Gardien respecte la volonté du Registre.
   Si le Hall doit être visible, il l'accueille.
   Sinon, il attend.

========================================================== */

function accueillirLeHall() {

    const Hall = Registre.Hall;

    if (Hall.Visible) {

        console.log("🏛️ Le Hall accueille le Visiteur.");

    } else {

        console.log("🚪 Le Hall attend derrière le Seuil.");

    }

}

/* ==========================================================
   LEÇON VI

   DONNER VIE AU HALL

   Le Gardien donne vie au Hall
   lorsque le Registre l'y autorise.

========================================================== */

function donnerVieAuHall() {

    accueillirLeHall();

}

/* ==========================================================
   LEÇON VII

   RÉVEILLER LE GARDIEN

   Chaque journée commence de la même manière.
   Le Gardien ouvre le Registre,
   découvre le Hall,
   puis lui donne vie.

========================================================== */

function réveillerLeGardien() {

    ouvrirLeRegistre();

    lireLeHall();

    observerLeHall();

    donnerVieAuHall();

}

/* ==========================================================
   LEÇON VIII

   RESPECTER LE REGISTRE

   Le Gardien ne modifie jamais le Registre.

   Il le lit.
   Il le respecte.
   Puis il agit.

========================================================== */

function respecterLeRegistre() {

    if (!Registre) {

        return false;

    }

    return true;

}

/* ==========================================================
   LEÇON IX

   RENCONTRER LES HABITANTS

   Le Gardien découvre les Habitants du Hall.

   Il ne les appelle jamais.
   Il constate simplement leur présence.

========================================================== */

function rencontrerLesHabitants() {

    const Habitants = Registre.Habitants;

    if (!Habitants) {

        console.log("Aucun habitant n'est présent.");

        return;

    }

    console.log("🐾 Les Habitants sont présents.");

}

/* ==========================================================
   LEÇON X

   RECONNAÎTRE LES OBJETS

   Le Gardien découvre les Objets du Hall.

   Il ne les déplace jamais.
   Il apprend simplement à les reconnaître.

========================================================== */

function reconnaîtreLesObjets() {

    const Objets = Registre.Objets;

    if (!Objets) {

        console.log("Aucun objet n'est présent.");

        return;

    }

    console.log("🪑 Les Objets sont reconnus.");

}



réveillerLeGardien();
