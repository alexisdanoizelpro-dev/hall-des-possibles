"use strict";

/* =========================================
   LE COURRIER DU SEUIL
   =========================================

   Ce fichier est le facteur du Seuil.

   Les autres éléments du Hall lui confient
   simplement un courrier. Lui seul sait
   comment l'envoyer.

   IMPORTANT :
Le Facteur doit être relié à une fonction sécurisée.
Aucun mot de passe, aucune clé privée et aucun secret
ne doit être inscrit dans ce fichier.

   ========================================= */

window.COURRIER = {

    endpoint: "https://zkemqqvnuwqkeasuujkl.supabase.co/functions/v1/facteur-du-seuil",

    async envoyer(type, donnees = {}) {

        if (!this.endpoint) {
            console.warn(
                "Le Courrier du Seuil n'est pas encore relié à une adresse."
            );

            return false;
        }

        const courrier = new FormData();

        courrier.append("origine", type);

        courrier.append(
            "date",
            new Date().toLocaleString("fr-FR")
        );

        Object.entries(donnees).forEach(([cle, valeur]) => {

            if (valeur === undefined || valeur === null) {
                return;
            }

            if (Array.isArray(valeur)) {

                courrier.append(
                    cle,
                    valeur.join(", ")
                );

            } else {

                courrier.append(
                    cle,
                    String(valeur)
                );
            }
        });

        try {

            const reponse = await fetch(
                this.endpoint,
                {
                    method: "POST",

                    body: courrier,

                    headers: {
    "Accept": "application/json",
    "apikey": "sb_publishable_FzPGtY8LNGzT2M5hcK9lBA_EkMlVYaL"
}
                }
            );

            if (!reponse.ok) {

                throw new Error(
                    "Le courrier n'a pas pu être remis."
                );
            }

            return true;

        } catch (erreur) {

            console.error(
                "Le facteur du Seuil s'est perdu :",
                erreur
            );

            return false;
        }
    }
};
