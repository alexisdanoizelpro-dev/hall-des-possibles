"use strict";

/* ==========================================================
   LE BUREAU
   VERSION 0.1
   ========================================================== */

const bureau = document.getElementById("bureau");
const hallBureau = document.getElementById("hall");

function ouvrirBureau() {

    if (!bureau || !hallBureau) return;

    hallBureau.style.display = "none";
    bureau.hidden = false;

}

function quitterBureau() {

    if (!bureau || !hallBureau) return;

    bureau.hidden = true;
    hallBureau.style.display = "";

}

/* ==========================================================
   SORTIE DU BUREAU
   La porte vitrée ramène au Hall
   ========================================================== */

const bureauOverlay = document.getElementById("bureau-overlay");

if (bureauOverlay) {

    const sortieBureau = document.createElement("button");

    sortieBureau.id = "sortie-bureau";
    sortieBureau.type = "button";
    sortieBureau.setAttribute("aria-label", "Redescendre dans le Hall");

    bureauOverlay.appendChild(sortieBureau);

    sortieBureau.addEventListener("click", quitterBureau);
}
