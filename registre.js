const donneesRegistre = {};
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

    champ.addEventListener("input", () => {
        donneesRegistre[question] = champ.value;
    });

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


    // Adresse e-mail
    const texteMail = document.createElement("p");

    texteMail.textContent =
    "À quelle adresse puis-je revenir vers vous si votre idée demande quelques précisions ?";

    registre.appendChild(texteMail);

    const champMail = document.createElement("input");

    champMail.type = "email";
    champMail.placeholder = "Votre adresse e-mail";
    champMail.required = true;

    registre.appendChild(champMail);

    const erreurMail = document.createElement("p");

    erreurMail.style.display = "none";

    erreurMail.textContent =
    "Une adresse e-mail valide est nécessaire pour que l'Artisan puisse revenir vers vous.";

    registre.appendChild(erreurMail);


    const bouton = document.createElement("button");

    bouton.id = "ouvrir-registre";

    bouton.textContent = "Soumettre mon idée";

    bouton.addEventListener("click", async () => {

        const email = champMail.value.trim();

        if (!email || !champMail.checkValidity()) {
            erreurMail.style.display = "block";
            champMail.focus();
            return;
        }

        erreurMail.style.display = "none";

        donneesRegistre["À laisser à l'extérieur"] = champ.value;
        donneesRegistre["Adresse e-mail"] = email;

        if (!window.COURRIER) {
            console.error("Le Facteur du Seuil est introuvable.");
            return;
        }

        const envoye = await window.COURRIER.envoyer(
            "idee",
            donneesRegistre
        );

        if (envoye) {
            terminerRegistre();
        }

    });

    registre.appendChild(bouton);

}


function terminerRegistre(){

    const registre = document.getElementById("registre-seuil");

    registre.innerHTML = "";

    const titre = document.createElement("h2");

    titre.textContent = "Votre idée a franchi le Seuil.";

    registre.appendChild(titre);

    const texte = document.createElement("p");

    texte.textContent =
    "L’Artisan en prendra connaissance et reviendra vers vous si certains éléments méritent d’être précisés.\n\n" +
    "Il n’est pas nécessaire de transmettre davantage d’informations, de photographies ou de documents pour le moment.\n\n" +
    "Si un élément supplémentaire devient utile à la création, l’Artisan vous le demandera directement.\n\n" +
    "L’essentiel est suffisant.";

    registre.appendChild(texte);

    const fermer = document.createElement("button");

    fermer.id = "ouvrir-registre";

    fermer.textContent = "Revenir dans le Hall";

    fermer.addEventListener("click", () => {
        document.getElementById("fenetre-seuil").remove();
    });

    registre.appendChild(fermer);

}
