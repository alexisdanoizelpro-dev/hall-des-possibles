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

console.log("🔥 script.js démarre");

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

function lireLeChapitreHall() {

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

function observerLeChapitreHall() {

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

function accueillirLeChapitreHall() {

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

    accueillirLeChapitreHall();

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

    lireLeChapitreHall();

    observerLeChapitreHall();

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

/* ==========================================================
   ACTION I

   VEILLER SUR LE HALL

   Le Gardien veille à ce que le Hall
   reste fidèle au Registre.

========================================================== */

function veillerSurLeHall() {

    const Hall = Registre.Hall;

    if (!Hall) {

        console.error("Le Hall est introuvable dans le Registre.");

        return;

    }

    observerLeChapitreHall();

    if (Hall.Visible) {

        accueillirLeChapitreHall();

    }

}

/* ==========================================================
   MISSION I

   RETROUVER LE HALL

   Le Gardien retrouve le Hall.

========================================================== */

function retrouverLeHall() {

    const Hall = document.getElementById("hall");

    if (!Hall) {

        console.error("Le Hall est introuvable.");

        return null;

    }

    return Hall;

}

/* ==========================================================
   MISSION II

   LIRE LE HALL

   Le Gardien découvre l'état actuel du Hall.

========================================================== */

function lireLeHall() {

    const Hall = retrouverLeHall();

    if (!Hall) {

        return null;

    }

    return {

        visible : Hall.hidden === false

    };

}

/* ==========================================================
   MISSION III

   COMPARER LE HALL AU REGISTRE

   Le Gardien compare le Hall
   avec le Registre.

========================================================== */

function comparerLeHall() {

    const Hall = lireLeHall();

    if (!Hall) {

        return false;

    }

    if (Hall.visible !== Registre.Hall.Visible) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   CORRIGER LE HALL SI NÉCESSAIRE

   Le Gardien agit uniquement
   lorsqu'une différence est constatée.

========================================================== */

function corrigerLeHall() {

    const Hall = retrouverLeHall();

    if (!Hall) {

        return;

    }

    Hall.hidden = !Registre.Hall.Visible;

}

/* ==========================================================
   ACTION II

   VEILLER SUR LES HABITANTS

   Le Gardien veille sur les Habitants.

   Il respecte leur présence.
   Il ne décide jamais à leur place.

========================================================== */

function veillerSurLesHabitants() {

retrouverLesHabitants();

lireLesHabitants();

comparerLesHabitants();

respecterLesHabitants();

}

/* ==========================================================
   MISSION I

   RETROUVER LES HABITANTS

   Le Gardien retrouve les Habitants
   du Hall.

========================================================== */

function retrouverLesHabitants() {

    const Habitants = Registre.Habitants;

    if (!Habitants) {

        console.error("Les Habitants sont introuvables.");

        return null;

    }

    return Habitants;

}

/* ==========================================================
   MISSION II

   LIRE LES HABITANTS

   Le Gardien découvre leur état
   actuel.

========================================================== */

function lireLesHabitants() {

    const Habitants = retrouverLesHabitants();

    if (!Habitants) {

        return null;

    }

    return Habitants;

}

/* ==========================================================
   MISSION III

   COMPARER LES HABITANTS AU REGISTRE

   Le Gardien vérifie que les Habitants
   correspondent au Registre.

========================================================== */

function comparerLesHabitants() {

    const Habitants = lireLesHabitants();

    if (!Habitants) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   RESPECTER LES HABITANTS

   Le Gardien respecte leur état.

   Il ne décide jamais à leur place.

========================================================== */

function respecterLesHabitants() {

    if (!comparerLesHabitants()) {

        return;

    }

    console.log("🐾 Les Habitants sont respectés.");

}

/* ==========================================================
   ACTION III

   VEILLER SUR L'AMBIANCE

   Le Gardien veille à ce que l'Ambiance
   reste fidèle au Registre.

========================================================== */

function veillerSurLAmbiance() {

retrouverLAmbiance();

lireLAmbiance();

comparerLAmbiance();

respecterLAmbiance();
   
}

/* ==========================================================
   MISSION I

   RETROUVER L'AMBIANCE

   Le Gardien retrouve l'Ambiance
   du Hall.

========================================================== */

function retrouverLAmbiance() {

    const Ambiance = Registre.Ambiance;

    if (!Ambiance) {

        console.error("L'Ambiance est introuvable.");

        return null;

    }

    return Ambiance;

}

/* ==========================================================
   MISSION II

   LIRE L'AMBIANCE

   Le Gardien découvre son état
   actuel.

========================================================== */

function lireLAmbiance() {

    const Ambiance = retrouverLAmbiance();

    if (!Ambiance) {

        return null;

    }

    return Ambiance;

}

/* ==========================================================
   MISSION III

   COMPARER L'AMBIANCE AU REGISTRE

   Le Gardien vérifie que l'Ambiance
   correspond au Registre.

========================================================== */

function comparerLAmbiance() {

    const Ambiance = lireLAmbiance();

    if (!Ambiance) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   RESPECTER L'AMBIANCE

   Le Gardien respecte l'Ambiance.

   Il ne cherche jamais à attirer
   l'attention sur elle.

========================================================== */

function respecterLAmbiance() {

    if (!comparerLAmbiance()) {

        return;

    }

    console.log("🔥 L'Ambiance est respectée.");

}

/* ==========================================================
   ACTION IV

   VEILLER SUR LES OBJETS

   Le Gardien veille à ce que les Objets
   restent fidèles au Registre.

========================================================== */

function veillerSurLesObjets() {

retrouverLesObjets();

lireLesObjets();

comparerLesObjets();

replacerLesObjets();
   
}

/* ==========================================================
   MISSION I

   RETROUVER LES OBJETS

   Le Gardien retrouve les Objets
   du Hall.

========================================================== */

function retrouverLesObjets() {

    const Objets = Registre.Objets;

    if (!Objets) {

        console.error("Les Objets sont introuvables.");

        return null;

    }

    return Objets;

}

/* ==========================================================
   MISSION II

   LIRE LES OBJETS

   Le Gardien découvre leur état
   actuel.

========================================================== */

function lireLesObjets() {

    const Objets = retrouverLesObjets();

    if (!Objets) {

        return null;

    }

    return Objets;

}

/* ==========================================================
   MISSION III

   COMPARER LES OBJETS AU REGISTRE

   Le Gardien vérifie que les Objets
   correspondent au Registre.

========================================================== */

function comparerLesObjets() {

    const Objets = lireLesObjets();

    if (!Objets) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   REPLACER LES OBJETS SI NÉCESSAIRE

   Le Gardien replace les Objets
   uniquement lorsque cela est nécessaire.

========================================================== */

function replacerLesObjets() {

    if (!comparerLesObjets()) {

        return;

    }

    console.log("🪑 Les Objets sont à leur place.");

}
/* ==========================================================
   ACTION V

   VEILLER SUR LES PORTES

   Le Gardien veille à ce que les Portes
   restent fidèles au Registre.

========================================================== */

function veillerSurLesPortes() {

retrouverLesPortes();

lireLesPortes();

comparerLesPortes();

respecterLesPortes();
   
}

/* ==========================================================
   MISSION I

   RETROUVER LES PORTES

   Le Gardien retrouve les Portes
   du Hall.

========================================================== */

function retrouverLesPortes() {

    const Portes = Registre.Portes;

    if (!Portes) {

        console.error("Les Portes sont introuvables.");

        return null;

    }

    return Portes;

}

/* ==========================================================
   MISSION II

   LIRE LES PORTES

   Le Gardien découvre leur état
   actuel.

========================================================== */

function lireLesPortes() {

    const Portes = retrouverLesPortes();

    if (!Portes) {

        return null;

    }

    return Portes;

}

/* ==========================================================
   MISSION III

   COMPARER LES PORTES AU REGISTRE

   Le Gardien vérifie que les Portes
   correspondent au Registre.

========================================================== */

function comparerLesPortes() {

    const Portes = lireLesPortes();

    if (!Portes) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   RESPECTER LES PORTES

   Le Gardien respecte l'état
   de chaque Porte.

   Il n'en ouvre ni n'en ferme
   aucune de sa propre initiative.

========================================================== */

function respecterLesPortes() {

    if (!comparerLesPortes()) {

        return;

    }

    console.log("🚪 Les Portes sont respectées.");

}

/* ==========================================================
   ACTION VI

   VEILLER SUR LES RENCONTRES

   Le Gardien veille à ce que les Rencontres
   restent fidèles au Registre.

========================================================== */

function veillerSurLesRencontres() {

   retrouverLesRencontres();

lireLesRencontres();

comparerLesRencontres();

préparerLesRencontres();

}

/* ==========================================================
   MISSION I

   RETROUVER LES RENCONTRES

   Le Gardien retrouve les Rencontres
   du Hall.

========================================================== */

function retrouverLesRencontres() {

    const Rencontres = Registre.Rencontres;

    if (!Rencontres) {

        console.error("Les Rencontres sont introuvables.");

        return null;

    }

    return Rencontres;

}

/* ==========================================================
   MISSION II

   LIRE LES RENCONTRES

   Le Gardien découvre leur état
   actuel.

========================================================== */

function lireLesRencontres() {

    const Rencontres = retrouverLesRencontres();

    if (!Rencontres) {

        return null;

    }

    return Rencontres;

}

/* ==========================================================
   MISSION III

   COMPARER LES RENCONTRES AU REGISTRE

   Le Gardien vérifie que les Rencontres
   correspondent au Registre.

========================================================== */

function comparerLesRencontres() {

    const Rencontres = lireLesRencontres();

    if (!Rencontres) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   PRÉPARER LES RENCONTRES

   Le Gardien prépare les Rencontres.

   Il veille simplement à ce que
   tout soit prêt pour le Visiteur.

========================================================== */

function préparerLesRencontres() {

    if (!comparerLesRencontres()) {

        return;

    }

    console.log("🤝 Les Rencontres sont prêtes.");

}

/* ==========================================================
   ACTION VII

   VEILLER SUR LES DÉCOUVERTES

   Le Gardien veille à ce que les Découvertes
   restent fidèles au Registre.

========================================================== */

function veillerSurLesDécouvertes() {

    retrouverLesDécouvertes();

    lireLesDécouvertes();

    comparerLesDécouvertes();

    présenterLesDécouvertes();

}

    
/* ==========================================================
   MISSION I

   RETROUVER LES DÉCOUVERTES

   Le Gardien retrouve les Découvertes
   du Hall.

========================================================== */

function retrouverLesDécouvertes() {

    const Découvertes = Registre.Découvertes;

    if (!Découvertes) {

        console.error("Les Découvertes sont introuvables.");

        return null;

    }

    return Découvertes;

}

/* ==========================================================
   MISSION II

   LIRE LES DÉCOUVERTES

   Le Gardien découvre leur état
   actuel.

========================================================== */

function lireLesDécouvertes() {

    const Découvertes = retrouverLesDécouvertes();

    if (!Découvertes) {

        return null;

    }

    return Découvertes;

}

/* ==========================================================
   MISSION III

   COMPARER LES DÉCOUVERTES AU REGISTRE

   Le Gardien vérifie que les Découvertes
   correspondent au Registre.

========================================================== */

function comparerLesDécouvertes() {

    const Découvertes = lireLesDécouvertes();

    if (!Découvertes) {

        return false;

    }

    return true;

}

/* ==========================================================
   MISSION IV

   PRÉSENTER LES DÉCOUVERTES

   Le Gardien présente les Découvertes.

   Il ne les impose jamais.

========================================================== */

function présenterLesDécouvertes() {

    if (!comparerLesDécouvertes()) {

        return;

    }

    console.log("📖 Les Découvertes sont prêtes à être rencontrées.");

}

réveillerLeGardien();

veillerSurLeHall();

veillerSurLesHabitants();

veillerSurLAmbiance();

veillerSurLesObjets();

veillerSurLesPortes();

veillerSurLesRencontres();

veillerSurLesDécouvertes();

bâtirLeHall();

function bâtirLeHall() {

    console.log("🏛️ Le Bâtisseur entre dans le Hall.");

   const Hall = document.getElementById("hall");

const ASMEP = document.createElement("img");

ASMEP.id = "asmep";
ASMEP.src = "asmep1408.png";
ASMEP.alt = "ASMEP";

Hall.appendChild(ASMEP);

ASMEP.style.position = "absolute";
ASMEP.style.left = "50%";
ASMEP.style.top = "65%";
ASMEP.style.width = "120px";
ASMEP.style.transform = "translate(-50%, -50%)";

const ZonePupitre = document.createElement("div");

ZonePupitre.id = "zone-pupitre";

ZonePupitre.style.position = "absolute";
ZonePupitre.style.left = "7%";
ZonePupitre.style.top = "54%";
ZonePupitre.style.width = "18%";
ZonePupitre.style.height = "32%";

ZonePupitre.style.cursor = "pointer";

ZonePupitre.style.background = "transparent";

Hall.appendChild(ZonePupitre);

ZonePupitre.addEventListener("click", ouvrirPupitre);

 function ouvrirPupitre(){

    if(document.getElementById("fenetre-seuil")){
        return;
    }

    const Fond=document.createElement("div");
    Fond.id="fenetre-seuil";

    Fond.innerHTML=`
<div id="registre-seuil">

<h2>Bienvenue au Pupitre des Idées</h2>

<p>
Ici, les idées sont accueillies sans jugement.
</p>

<p>
Certaines deviendront peut-être une expérience.
</p>

<p>
D'autres resteront simplement un souvenir précieux.
</p>

<p>
Les deux ont leur place ici.
</p>

<p><strong>Prenez le temps qu'il vous faut.</strong></p>

<button id="ouvrir-registre">
Ouvrir le Registre
</button>

</div>
`;

    document.body.appendChild(Fond);

    const bouton = document.getElementById("ouvrir-registre");

bouton.addEventListener("click", () => {
    console.log("Le Registre continue...");
});

}

   }
