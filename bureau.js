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
