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

/* ==========================================================
   INFORMATIONS PRATIQUES
   ========================================================== */

if (bureauOverlay) {

    /* Zone cliquable sur le dossier */
    const dossierPratique = document.createElement("button");

    dossierPratique.id = "dossier-pratique";
    dossierPratique.type = "button";
    dossierPratique.setAttribute(
        "aria-label",
        "Ouvrir les informations pratiques"
    );

    bureauOverlay.appendChild(dossierPratique);


    /* Feuille */
    const feuillePratique = document.createElement("div");

    feuillePratique.id = "feuille-pratique";
    feuillePratique.hidden = true;

    bureau.appendChild(feuillePratique);


    const pagesPratiques = {

        confier: {
            titre: "Comment confier une idée ?",
            contenu: `
                <p>
                    Les demandes commencent dans le
                    <strong>Hall, par le Registre des Idées</strong>.
                </p>

                <p>
                    Il pose les premières questions nécessaires
                    pour comprendre votre projet.
                </p>

                <p>
                    Après réception, l'Artisan vous répond par mail
                    afin de poursuivre l'échange.
                </p>
            `
        },

        public: {
            titre: "À qui s'adresse l'Atelier ?",
            contenu: `
                <p>
                    L'Atelier s'adresse principalement aux groupes,
                    familles, entreprises, écoles et associations.
                </p>

                <p>
                    Cela ne ferme cependant aucune porte :
                    une demande individuelle peut parfaitement être
                    confiée au Registre des Idées.
                </p>

                <p>
                    Chaque projet est étudié selon ce qu'il cherche
                    à faire vivre.
                </p>
            `
        },

        conception: {
            titre: "Comment est conçu un projet ?",
            contenu: `
                <p>
                    Chaque création est personnalisée.
                </p>

                <p>
                    Il n'existe donc pas de formule standard à choisir :
                    le contenu est construit en fonction de la demande,
                    des personnes concernées et des contraintes indiquées.
                </p>
            `
        },

        tarifs: {
            titre: "Tarifs et devis",
            contenu: `
                <p>
                    Chaque projet étant différent,
                    il n'existe pas de tarif unique.
                </p>

                <p>
                    Une demande peut concerner uniquement la création
                    d'énigmes, nécessiter également la conception ou la
                    fourniture de matériel, ou aller jusqu'à une expérience
                    accompagnée d'une animation.
                </p>

                <p>
                    Le contenu et les besoins sont donc étudiés avant
                    qu'un devis soit proposé.
                </p>

                <p>
                    <strong>
                        Aucune création payante n'est engagée avant
                        son acceptation.
                    </strong>
                </p>
            `
        },

        delais: {
            titre: "Délais",
            contenu: `
                <p class="phrase-seuil">
                    Le Seuil ne connaît qu'un Temps : celui qu'il faut.
                </p>

                <p>
                    Néanmoins, n'hésitez pas à nous indiquer
                    s'il existe une date butoir.
                </p>

                <p>
                    Tout sera fait selon les envies de chacun,
                    ainsi que la nature et l'ampleur de chaque projet.
                </p>
            `
        },

        contact: {
            titre: "Contact",
            contenu: `
                <p>
                    Vous pouvez contacter l'Atelier par mail :
                </p>

                <p>
                    <strong>[bonjour.atelier.du.seuil@outlook.com]</strong>
                </p>

                <p>
                    Vous pouvez également nous écrire sur Instagram :
                </p>

                <p>
                    <strong>@hall-des-possibles</strong>
                </p>
            `
        }
    };


    function afficherSommairePratique() {

        feuillePratique.innerHTML = `
            <button
                class="fermer-feuille-pratique"
                type="button"
                aria-label="Fermer"
            >×</button>

            <h2>Informations pratiques</h2>

            <div class="sommaire-pratique">

                <button data-page="confier">
                    Comment confier une idée ?
                </button>

                <button data-page="public">
                    À qui s'adresse l'Atelier ?
                </button>

                <button data-page="conception">
                    Comment est conçu un projet ?
                </button>

                <button data-page="tarifs">
                    Tarifs et devis
                </button>

                <button data-page="delais">
                    Délais
                </button>

                <button data-page="contact">
                    Contact
                </button>

            </div>
        `;

        brancherFeuillePratique();
    }


    function afficherPagePratique(nomPage) {

        const page = pagesPratiques[nomPage];
        if (!page) return;

        feuillePratique.innerHTML = `
            <button
                class="retour-sommaire-pratique"
                type="button"
            >
                ← Retour au sommaire
            </button>

            <button
                class="fermer-feuille-pratique"
                type="button"
                aria-label="Fermer"
            >×</button>

            <h2>${page.titre}</h2>

            <div class="contenu-pratique">
                ${page.contenu}
            </div>
        `;

        brancherFeuillePratique();
    }


    function brancherFeuillePratique() {

        const fermer =
            feuillePratique.querySelector(
                ".fermer-feuille-pratique"
            );

        if (fermer) {
            fermer.addEventListener("click", () => {
                feuillePratique.hidden = true;
            });
        }


        const retour =
            feuillePratique.querySelector(
                ".retour-sommaire-pratique"
            );

        if (retour) {
            retour.addEventListener(
                "click",
                afficherSommairePratique
            );
        }


        feuillePratique
            .querySelectorAll("[data-page]")
            .forEach((bouton) => {

                bouton.addEventListener("click", () => {
                    afficherPagePratique(
                        bouton.dataset.page
                    );
                });

            });
    }


    dossierPratique.addEventListener("click", () => {

        afficherSommairePratique();
        feuillePratique.hidden = false;

    });
}
