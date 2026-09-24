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

   /* Feuille des Feuillets du Seuil */
const feuilleFeuillets = document.createElement("div");

feuilleFeuillets.id = "feuille-feuillets";
feuilleFeuillets.hidden = true;

feuilleFeuillets.innerHTML = `
    <button
        class="fermer-feuille-feuillets"
        type="button"
        aria-label="Fermer"
    >×</button>

    <div id="sommaire-feuillets">
        <h2>Feuillets du Seuil</h2>

        <div class="grille-feuillets">

            <button class="case-feuillet" type="button" data-feuillet="surprendre">
                <img src="feuillet-surprendre.png" alt="">
                <span>Surprendre quelqu’un</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="famille">
                <img src="feuillet-famille.png" alt="">
                <span>En Famille</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="soiree">
                <img src="feuillet-soirée.png" alt="">
                <span>Jeux de soirée</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="anniversaire">
                <img src="feuillet-anniversaire.png" alt="">
                <span>Anniversaire</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="chasse">
                <img src="feuillet-chasse_tresor.png" alt="">
                <span>Chasse au Trésor</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="mariage">
                <img src="feuillet-mariage.png" alt="">
                <span>Mariage</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="enfants">
                <img src="feuillet-enfants.png" alt="">
                <span>Enfants</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="enquete">
                <img src="feuillet-enquete.png" alt="">
                <span>Enquête</span>
            </button>

            <button class="case-feuillet" type="button" data-feuillet="entreprise">
                <img src="feuillet-entreprise.png" alt="">
                <span>Entreprise</span>
            </button>

        </div>

        <div class="note-feuillets">
            <p>
                <strong>
                    Une date marque parfois l'aboutissement d'une expérience,
                    pas son commencement.
                </strong>
            </p>

            <p>
                Un indice, un message, un objet ou une réflexion peut apparaître
                bien avant le jour prévu. Ce qui semble anodin aujourd'hui peut
                prendre tout son sens une fois les participants réunis.
            </p>
        </div>
    </div>

    <div id="contenu-feuillet" hidden></div>
`;
   
bureau.appendChild(feuilleFeuillets);

   /* Contenu des Feuillets */
const pagesFeuillets = {

    anniversaire: {
        titre: "Anniversaire",
        contenu: `
            <p>
                <strong>Un anniversaire ressemble d'abord à la personne que l'on célèbre.</strong>
            </p>

            <p>
                Son âge, ce qu'elle aime — ou préfère éviter — et quelques détails
                qui lui ressemblent permettent à l'Artisan d'imaginer une expérience
                qui lui appartient vraiment.
            </p>

            <p>
                Le lieu, les personnes présentes et le temps que vous souhaitez lui
                consacrer aideront ensuite à lui donner sa juste place dans la journée :
                une courte surprise, un moment à part entière, ou quelque chose qui
                accompagnera la fête plus longtemps.
            </p>

            <p>
                Vous n'avez pas besoin d'avoir déjà toutes les réponses.<br>
                <strong>Le Registre des Idées est là pour recueillir ce que vous savez déjà.</strong>
            </p>
        `
    },

    chasse: {
        titre: "Chasse au Trésor",
        contenu: `
            <p>
                <strong>Une chasse au trésor commence bien avant de trouver le premier indice.</strong>
            </p>

            <p>
                La date prévue permet d'abord à l'Artisan de savoir jusqu'où l'aventure
                peut aller. Le nombre de participants, le thème que vous imaginez et le
                temps que vous souhaitez lui consacrer lui permettront ensuite d'en
                construire le rythme et l'ampleur.
            </p>

            <p>
                Le thème ne vient pas simplement décorer l'expérience : il peut guider
                son histoire, ses énigmes et la manière dont les participants
                progresseront jusqu'au trésor.
            </p>

            <p>
                Quelques informations suffisent pour commencer.<br>
                <strong>Le Registre des Idées est là pour recueillir celles que vous avez déjà.</strong>
            </p>
        `
    },

    famille: {
        titre: "En Famille",
        contenu: `
            <p>
                <strong>Une famille n'a pas besoin de tous aimer les mêmes choses pour partager la même aventure.</strong>
            </p>

            <p>
                Quelques détails sur les personnes qui la vivront — leurs âges, leurs
                goûts, ce qu'elles aiment faire ensemble ou ce qui les distingue —
                permettent à l'Artisan d'imaginer une expérience dans laquelle chacun
                peut trouver sa place.
            </p>

            <p>
                Une différence d'âge, une passion que personne d'autre ne partage ou
                une aptitude particulière peuvent même devenir une partie du jeu :
                parfois, l'aventure avance justement parce que chacun apporte quelque
                chose que les autres n'ont pas.
            </p>

            <p>
                Il suffit de raconter un peu votre famille.<br>
                <strong>Le Registre des Idées accueillera le reste.</strong>
            </p>
        `
    },

    enfants: {
        titre: "Enfants",
        contenu: `
            <p>
                <strong>Les enfants n'ont pas besoin que l'on fasse l'aventure à leur place.</strong>
            </p>

            <p>
                Leur âge, ce qu'ils aiment et quelques mots sur ce qu'ils savent déjà
                faire seuls permettent à l'Artisan d'imaginer une expérience réellement
                faite pour eux.
            </p>

            <p>
                Le nombre d'enfants, les liens qui les unissent et l'espace disponible
                aideront ensuite à construire une aventure qu'ils pourront vivre
                ensemble, chercher, essayer et faire avancer sans avoir besoin d'un
                adulte pour poursuivre.
            </p>

            <p>
                Quelques repères suffisent pour commencer.<br>
                <strong>Le Registre des Idées est là pour recueillir ceux que vous connaissez déjà.</strong>
            </p>
        `
    },

    enquete: {
        titre: "Enquête",
        contenu: `
            <p>
                <strong>Une enquête commence par quelque chose qui mérite d'être découvert.</strong>
            </p>

            <p>
                Son contexte, les personnes qui mèneront les recherches et le degré
                d'immersion souhaité permettent à l'Artisan de construire une affaire
                à leur mesure : quelques indices à relier, une véritable investigation,
                ou une histoire capable de les entraîner bien plus loin.
            </p>

            <p>
                Elle peut rester dans un même lieu ou inviter les enquêteurs à se
                déplacer. Elle peut également naître d'une histoire entièrement
                imaginée ou s'appuyer sur des éléments réels —
                <strong>sans jamais confondre les deux.</strong>
            </p>

            <p>
                Quelques premières pistes suffisent.<br>
                <strong>Le Registre des Idées permettra de les confier à l'Artisan.</strong>
            </p>
        `
    },

    entreprise: {
        titre: "Entreprise",
        contenu: `
            <p>
                <strong>Réunir des personnes ne suffit pas toujours à créer un moment ensemble.</strong>
            </p>

            <p>
                Pour commencer, l'Artisan a surtout besoin de comprendre
                <strong>pourquoi vous souhaitez les réunir</strong> : créer du lien,
                partager un moment, célébrer quelque chose, apprendre à mieux se
                connaître… ou simplement sortir du cadre habituel.
            </p>

            <p>
                Le lieu prévu donnera ensuite les limites — et parfois les possibilités —
                dans lesquelles l'expérience pourra prendre forme.
            </p>

            <p>
                Deux informations peuvent déjà suffire pour commencer.<br>
                <strong>Le Registre des Idées permettra de confier les vôtres à l'Artisan.</strong>
            </p>
        `
    },

    soiree: {
        titre: "Jeux de soirée",
        contenu: `
            <p>
                <strong>Une soirée peut accueillir un jeu… ou devenir elle-même le terrain de jeu.</strong>
            </p>

            <p>
                L'occasion, les personnes réunies et l'ambiance que vous imaginez
                permettent à l'Artisan de comprendre le moment que vous souhaitez
                partager. Quelques indications sur les jeux que vous aimez — ou ceux
                que vous préférez éviter — peuvent ensuite lui donner une première direction.
            </p>

            <p>
                Un thème peut habiller l'expérience, mais celle-ci peut aussi se glisser
                dans la soirée autrement : comme un moment bien défini ou comme un fil
                rouge qui revient au fil des heures.
            </p>

            <p>
                Il suffit de raconter un peu la soirée que vous imaginez.<br>
                <strong>Le Registre des Idées permettra à l'Artisan d'en découvrir le reste.</strong>
            </p>
        `
    },

    mariage: {
        titre: "Mariage",
        contenu: `
            <p>
                <strong>Un mariage raconte déjà une histoire. L'expérience peut simplement trouver sa place à l'intérieur.</strong>
            </p>

            <p>
                Quelques mots sur le couple, les personnes qui seront présentes et
                surtout <strong>ce que vous aimeriez leur faire vivre</strong> permettent
                à l'Artisan de comprendre l'esprit du moment.
            </p>

            <p>
                Le lieu et le déroulement de la journée aideront ensuite à imaginer la
                juste place de l'expérience : un moment particulier, une animation
                discrète ou même un fil rouge qui accompagne les invités et crée des
                rencontres au fil des heures.
            </p>

            <p>
                Vous n'avez pas besoin d'avoir déjà imaginé comment tout cela fonctionnera.<br>
                <strong>Le Registre des Idées est là pour confier à l'Artisan ce que vous souhaitez faire naître.</strong>
            </p>
        `
    },

    surprendre: {
        titre: "Surprendre quelqu'un",
        contenu: `
            <p>
                <strong>Une surprise ne commence pas forcément au moment où elle est découverte.</strong>
            </p>

            <p>
                Quelques mots sur la personne que vous souhaitez surprendre, ce qui
                vous lie et les souvenirs ou petites histoires que vous partagez peuvent
                offrir à l'Artisan la matière nécessaire pour imaginer quelque chose
                qui n'appartient qu'à vous.
            </p>

            <p>
                Reste surtout à comprendre pourquoi vous souhaitez la surprendre :
                faire rire, émouvoir, annoncer quelque chose, célébrer un moment…
                Cette intention peut donner naissance à une simple attention comme à
                une expérience qui se construit discrètement pendant plusieurs jours.
            </p>

            <p>
                Vous n'avez pas besoin de savoir encore quelle forme prendra la surprise.<br>
                <strong>Le Registre des Idées est justement là pour confier à l'Artisan ce que vous aimeriez provoquer.</strong>
            </p>
        `
    }
};

   const sommaireFeuillets =
    feuilleFeuillets.querySelector("#sommaire-feuillets");

const contenuFeuillet =
    feuilleFeuillets.querySelector("#contenu-feuillet");


function afficherFeuillet(nomFeuillet) {

    const page = pagesFeuillets[nomFeuillet];
    if (!page) return;

    sommaireFeuillets.hidden = true;

    contenuFeuillet.innerHTML = `
        <button
            class="retour-feuillets"
            type="button"
        >
            ← Retour aux Feuillets
        </button>

        <h2>${page.titre}</h2>

        <div class="texte-feuillet">
            ${page.contenu}
        </div>
    `;

    contenuFeuillet.hidden = false;

    contenuFeuillet
        .querySelector(".retour-feuillets")
        .addEventListener("click", () => {

            contenuFeuillet.hidden = true;
            contenuFeuillet.innerHTML = "";

            sommaireFeuillets.hidden = false;
        });
}


feuilleFeuillets
    .querySelectorAll(".case-feuillet")
    .forEach((caseFeuillet) => {

        caseFeuillet.addEventListener("click", () => {
            afficherFeuillet(caseFeuillet.dataset.feuillet);
        });

    });

/* Fermer les Feuillets et revenir au Bureau */
const fermerFeuilleFeuillets =
    feuilleFeuillets.querySelector(".fermer-feuille-feuillets");

fermerFeuilleFeuillets.addEventListener("click", () => {

    feuilleFeuillets.hidden = true;

    feuillePratique.classList.remove("feuille-pratique-soulevee");
    feuillePratique.hidden = true;
});
   
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
                    à faire vivre. Un projet peut ainsi accompagner un anniversaire, un mariage, une soirée entre amis,
une fête de famille, un événement professionnel ou simplement l'envie de partager
un moment différent.
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
  Selon l'idée confiée, un projet peut prendre la forme d'énigmes personnalisées,
  d'une chasse au trésor, d'un jeu de piste, d'un escape game, d'une enquête
  ou encore d'un jeu imaginé entièrement sur mesure. L'expérience peut être pensée pour le lieu où elle se déroulera :
à domicile, dans un jardin, une salle, une entreprise
ou tout autre espace adapté au projet. Le contenu, la difficulté et la durée peuvent également être adaptés aux participants,
qu'il s'agisse d'enfants, d'adultes ou d'un groupe réunissant plusieurs générations.
                </p>
            `
        },

        tarifs: {
            titre: "Tarifs et devis",
            contenu: `
                <p>
                    Chaque projet étant différent,
                    il n'existe pas de tarif unique.
                    Mais votre budget sera écouté et respecté.
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
        id="coin-feuillets"
        type="button"
        aria-label="Découvrir les Feuillets du Seuil"
    ></button>

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

       const coinFeuillets =
    feuillePratique.querySelector("#coin-feuillets");

if (coinFeuillets) {
    coinFeuillets.addEventListener("click", (event) => {
        event.stopPropagation();

        feuilleFeuillets.hidden = false;
        feuillePratique.classList.add("feuille-pratique-soulevee");
    });
}

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
