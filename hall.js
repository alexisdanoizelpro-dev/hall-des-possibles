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
   ACCÈS AU BUREAU
   L'ESCALIER
   ========================================================== */

const panneauBureau = document.createElement("button");

panneauBureau.id = "panneau-bureau";
panneauBureau.className = "hall-element";

panneauBureau.type = "button";
panneauBureau.innerHTML = `
    <span class="panneau-bureau-titre">BUREAU</span>
    <span class="panneau-bureau-indication">↑</span>
`;

hallOverlay.appendChild(panneauBureau);


/* Position sur PC */
panneauBureau.style.left = "39%";
panneauBureau.style.top = "12%";


/* Position sur téléphone :
   calculée à partir de l'image réelle du Hall */
function placerPanneauBureauMobile() {

    if (!window.matchMedia("(max-width: 700px)").matches) {
        return;
    }

    const hallImage = document.getElementById("hall-image");
    if (!hallImage) return;

    const imageLeft = hallImage.offsetLeft;
    const imageTop = hallImage.offsetTop;
    const imageWidth = hallImage.offsetWidth;
    const imageHeight = hallImage.offsetHeight;

    panneauBureau.style.left =
        (imageLeft + imageWidth * 0.35) + "px";

    panneauBureau.style.top =
        (imageTop + imageHeight * 0.17) + "px";
}

requestAnimationFrame(placerPanneauBureauMobile);

window.addEventListener(
    "resize",
    placerPanneauBureauMobile
);


/* Monter au Bureau */
panneauBureau.addEventListener("click", () => {

    if (typeof ouvrirBureau === "function") {
        ouvrirBureau();
    }

});

/* ==========================================================
   PIERRE N°3
   LE PUPITRE
   ========================================================== */

const zonePupitre = document.createElement("div");

zonePupitre.id = "zone-pupitre";

zonePupitre.className = "hall-element";

zonePupitre.style.position = "absolute";
zonePupitre.style.left = "21%";
zonePupitre.style.top = "49%";
zonePupitre.style.width = "13%";
zonePupitre.style.height = "10%";

zonePupitre.style.cursor = "pointer";

hallOverlay.appendChild(zonePupitre);

function placerPupitreMobile() {

    if (!window.matchMedia("(max-width: 700px)").matches) {
        return;
    }

    const hallImage = document.getElementById("hall-image");
    if (!hallImage) return;

    const imageLeft = hallImage.offsetLeft;
    const imageTop = hallImage.offsetTop;
    const imageWidth = hallImage.offsetWidth;
    const imageHeight = hallImage.offsetHeight;

    zonePupitre.style.left =
        (imageLeft + imageWidth * 0.065) + "px";

    zonePupitre.style.top =
        (imageTop + imageHeight * 0.455) + "px";

    zonePupitre.style.width =
        (imageWidth * 0.175) + "px";

    zonePupitre.style.height =
        (imageHeight * 0.20) + "px";
}

requestAnimationFrame(placerPupitreMobile);

window.addEventListener(
    "resize",
    placerPupitreMobile
);

zonePupitre.addEventListener("click", ouvrirPupitre);

/* ==========================================================
   PIERRE N°12
   LE LIVRE D'OR
   ========================================================== */

const zoneLivre = document.createElement("div");

zoneLivre.className = "hall-element";

zoneLivre.style.position = "absolute";

zoneLivre.style.left = "49%";

zoneLivre.style.top = "55%";

zoneLivre.style.width = "12%";

zoneLivre.style.height = "16%";

zoneLivre.style.cursor = "pointer";

hallOverlay.appendChild(zoneLivre);

function placerLivreMobile() {

    if (!window.matchMedia("(max-width: 700px)").matches) {
        return;
    }

    const hallImage = document.getElementById("hall-image");
    if (!hallImage) return;

    const imageLeft = hallImage.offsetLeft;
    const imageTop = hallImage.offsetTop;
    const imageWidth = hallImage.offsetWidth;
    const imageHeight = hallImage.offsetHeight;

    zoneLivre.style.left =
        (imageLeft + imageWidth * 0.48) + "px";

    zoneLivre.style.top =
        (imageTop + imageHeight * 0.57) + "px";

    zoneLivre.style.width =
        (imageWidth * 0.255) + "px";

    zoneLivre.style.height =
        (imageHeight * 0.24) + "px";
}

requestAnimationFrame(placerLivreMobile);

window.addEventListener(
    "resize",
    placerLivreMobile
);

zoneLivre.addEventListener("click", () => {

    ouvrirLivreOr();

});

/* ==========================================================
   INFORMATIONS LÉGALES
   "LES PAGES JAUNES"
   ========================================================== */

const pagesJaunes = document.createElement("img");

pagesJaunes.id = "pages-jaunes";
pagesJaunes.src = "informations.png";
pagesJaunes.alt = "Informations légales";
pagesJaunes.className = "hall-element";

pagesJaunes.style.left = "82%";
pagesJaunes.style.top = "64%";
pagesJaunes.style.width = "7%";
pagesJaunes.style.transform = "translate(-50%, -50%) rotate(-5deg)";
pagesJaunes.style.cursor = "pointer";

hallOverlay.appendChild(pagesJaunes);

pagesJaunes.addEventListener("click", () => {
    window.location.href = "informations-legales.html";
});

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

/* ==========================================================
   EXPÉRIENCE MOBILE DU HALL
   Regarder autour de soi
   ========================================================== */

const hallScene = document.getElementById("hall-scene");
const hall = document.getElementById("hall");

const hallMobile = window.matchMedia("(max-width: 700px)");

let hallPanX = 0;
let hallPanDepart = 0;
let hallDoigtDepartX = 0;

let hallGlissement = false;
let hallAReellementBouge = false;


/* Limite le déplacement aux bords réels de la scène */
function limiteHallMobile() {

    if (!hallScene) return 0;

    const largeurScene =
        hallScene.getBoundingClientRect().width;

    const largeurEcran =
        window.innerWidth;

    return Math.max(
        0,
        (largeurScene - largeurEcran) / 2
    );
}


/* Applique le déplacement */
function placerHallMobile() {

    if (!hallScene) return;

    const limite = limiteHallMobile();

    hallPanX = Math.max(
        -limite,
        Math.min(limite, hallPanX)
    );

    hallScene.style.setProperty(
        "--hall-pan-x",
        hallPanX + "px"
    );
}


/* Le doigt se pose */
hall.addEventListener("pointerdown", (event) => {

    if (!hallMobile.matches) return;

    hallGlissement = true;
    hallAReellementBouge = false;

    hallDoigtDepartX = event.clientX;
    hallPanDepart = hallPanX;

});


/* Le doigt regarde à gauche ou à droite */
hall.addEventListener("pointermove", (event) => {

    if (!hallMobile.matches) return;
    if (!hallGlissement) return;

    const mouvement =
        event.clientX - hallDoigtDepartX;

    /*
       Petite tolérance :
       un simple tap reste un clic normal.
    */
    if (Math.abs(mouvement) > 7) {
        hallAReellementBouge = true;
    }

    if (!hallAReellementBouge) return;

    hallPanX =
        hallPanDepart + mouvement;

    placerHallMobile();

    event.preventDefault();

});


/* Le doigt se relève */
function terminerGlissementHall() {

    if (!hallMobile.matches) return;

    hallGlissement = false;

}

hall.addEventListener(
    "pointerup",
    terminerGlissementHall
);

hall.addEventListener(
    "pointercancel",
    terminerGlissementHall
);


/*
   Si le visiteur a réellement fait glisser la pièce,
   on empêche ce geste de déclencher accidentellement
   l'objet situé sous son doigt.
*/
hall.addEventListener(
    "click",
    (event) => {

        if (!hallMobile.matches) return;
        if (!hallAReellementBouge) return;

        event.preventDefault();
        event.stopPropagation();

        hallAReellementBouge = false;

    },
    true
);


/* Sécurité si le téléphone change d'orientation */
window.addEventListener("resize", () => {

    if (!hallMobile.matches) {

        hallPanX = 0;

        if (hallScene) {
            hallScene.style.removeProperty(
                "--hall-pan-x"
            );
        }

        return;
    }

    placerHallMobile();

});
