"use strict";

/* ==========================================================
   LE HALL DES POSSIBLES
   VERSION FONDATRICE - V1.0.1
   LE GARDIEN
   ========================================================== */

console.log("🐾 Le Gardien ouvre le Hall.");

const hallOverlay = document.getElementById("hall-overlay");

if (!hallOverlay) {
    console.error("Impossible de trouver #hall-overlay");
} else {

    const asmep = document.createElement("img");

    asmep.id = "asmep";

    asmep.src = "asmep1408.png";

    asmep.alt = "ASMEP";

    asmep.className = "hall-element";

    asmep.style.left = "50%";
    asmep.style.top = "67%";

    asmep.style.width = "150px";

    asmep.style.transform = "translate(-50%, -50%)";

   asmep.style.pointerEvents = "none";

    hallOverlay.appendChild(asmep);

    console.log("🐾 ASMEP veille sur le Hall.");
}

/* ==========================================================
   PIERRE N°3
   LE PUPITRE
   ========================================================== */

const zonePupitre = document.createElement("div");

zonePupitre.id = "zone-pupitre";

zonePupitre.className = "hall-element";

zonePupitre.style.position = "absolute";
zonePupitre.style.left = "8%";
zonePupitre.style.top = "53%";
zonePupitre.style.width = "16%";
zonePupitre.style.height = "28%";

zonePupitre.style.cursor = "pointer";

hallOverlay.appendChild(zonePupitre);

zonePupitre.addEventListener("click", ouvrirPupitre);

/* ==========================================================
   PIERRE N°12
   LE LIVRE D'OR
   ========================================================== */

const zoneLivre = document.createElement("div");

zoneLivre.className = "hall-element";

zoneLivre.style.position = "absolute";

zoneLivre.style.left = "46%";

zoneLivre.style.top = "54%";

zoneLivre.style.width = "22%";

zoneLivre.style.height = "9%";

zoneLivre.style.cursor = "pointer";

hallOverlay.appendChild(zoneLivre);


zoneLivre.addEventListener("click", () => {

    alert("Le Livre est bien cliqué");

    ouvrirLivreOr();

});

function ouvrirPupitre(){

    if(document.getElementById("fenetre-seuil")){
        return;
    }

    const fond = document.createElement("div");

fond.id = "fenetre-seuil";

const registre = document.createElement("div");

registre.id = "registre-seuil";

  const titre = document.createElement("h2");

titre.textContent = "Le Registre des Idées";

const texte = document.createElement("p");

texte.textContent =
"Ici, chaque idée mérite d'être entendue. Prenez le temps qu'il vous faut avant de tourner cette première page.";

registre.appendChild(titre);

registre.appendChild(texte); 

 const bouton = document.createElement("button");

bouton.id = "ouvrir-registre";

bouton.textContent = "Commencer";

 bouton.addEventListener("click", ouvrirRegistre);  

registre.appendChild(bouton);  

fond.appendChild(registre);

document.body.appendChild(fond);

}

function ouvrirRegistre(){

    const registre = document.getElementById("registre-seuil");

    registre.innerHTML = "";

   const retour = document.createElement("button");

retour.className = "retour-hall";

retour.textContent = "J'ai encore besoin de temps.";

retour.addEventListener("click", () => {

    document.getElementById("fenetre-seuil").remove();

});

    const titre = document.createElement("h2");

registre.appendChild(retour);
   
    titre.textContent = "Votre idée";

    registre.appendChild(titre);

    const texte = document.createElement("p");
    texte.textContent =
    "Prenez le temps qu'il vous faut. Plus vous me parlerez de votre idée, plus je pourrai lui donner une forme fidèle à vos envies.";

    registre.appendChild(texte);

    registre.appendChild(creerQuestion("À qui s'adresse ce projet ?"));

    registre.appendChild(creerQuestion("Qu'attendez-vous de cette expérience ?"));

    registre.appendChild(creerQuestion("Quelle couleur vous vient spontanément à l'esprit en pensant à cette personne ?"));

    registre.appendChild(creerQuestion("Quelles formes de jeux vous parlent le plus ?"));

    registre.appendChild(creerQuestion("Parlez-moi un peu plus de cette personne ou de ce groupe."));

    registre.appendChild(creerQuestion("Y a-t-il une date importante pour ce projet ?"));

    registre.appendChild(creerQuestion("Y a-t-il quelque chose que je dois respecter ?"));

    registre.appendChild(creerQuestion("Décrivez votre projet."));

    const bouton = document.createElement("button");

    bouton.textContent = "Juste... Avant de partir";

    bouton.id = "ouvrir-registre";

   bouton.addEventListener("click", ouvrirDernierePage);

    registre.appendChild(bouton);

}

function creerQuestion(question){

    const bloc = document.createElement("div");

    const texte = document.createElement("p");

    texte.textContent = question;

    const champ = document.createElement("textarea");

    champ.rows = 5;

    bloc.appendChild(texte);

    bloc.appendChild(champ);

    return bloc;

}

function ouvrirDernierePage(){

    const registre = document.getElementById("registre-seuil");

    registre.innerHTML = "";

   const retour = document.createElement("button");

retour.className = "retour-hall";

retour.textContent = "J'ai encore besoin de temps.";

retour.addEventListener("click", () => {

    document.getElementById("fenetre-seuil").remove();

});

   registre.appendChild(retour);

    const titre = document.createElement("h2");

    titre.textContent = "Juste... Avant de partir";

    registre.appendChild(titre);

    const texte = document.createElement("p");

    texte.textContent =
    "Une dernière chose. Y a-t-il quelque chose que je dois laisser à l'extérieur de votre expérience ?";

    registre.appendChild(texte);

    const champ = document.createElement("textarea");

    champ.rows = 6;

    champ.placeholder =
    "Vous pouvez me parler ici de tout ce qui ne doit pas apparaître...";

    registre.appendChild(champ);

    const bouton = document.createElement("button");

    bouton.id = "ouvrir-registre";

    bouton.textContent = "Soumettre mon idée";

    registre.appendChild(bouton);

}

function ouvrirLivreOr(){

    if(document.getElementById("fenetre-seuil")){
        return;
    }

    const fond = document.createElement("div");

    fond.id = "fenetre-seuil";

    const livre = document.createElement("div");

    livre.id = "livre-or";

    const page = document.createElement("img");

    page.src = "livre-or-premier-artisan.webp";

    page.alt = "Le Premier Artisan";

    livre.appendChild(page);

    fond.appendChild(livre);

    document.body.appendChild(fond);

}

const boutonPorte = document.getElementById("ouvrir-hall");

if(boutonPorte){

    boutonPorte.addEventListener("click", () => {

        document.getElementById("porte-seuil").remove();

    });

}

/* ==========================================================
   PIERRE N°11
   FRANCHIR LE SEUIL
   ========================================================== */

const seuil = document.getElementById("seuil");

seuil.addEventListener("click", entrerDansLeHall);

function entrerDansLeHall(){

    seuil.style.backgroundImage = "url('porte-seuil-ouverte.png')";

    setTimeout(() => {

        seuil.style.display = "none";

    }, 1600);

}
