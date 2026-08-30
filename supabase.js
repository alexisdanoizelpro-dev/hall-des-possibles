"use strict";

/* =========================================
   SUPABASE — MÉMOIRE DU SEUIL
   ========================================= */

window.SUPABASE_SEUIL = {

    url: "https://zkemqqvnuwqkeasuujkl.supabase.co",

    key: "sb_publishable_FzPGtY8LNGzT2M5hcK9lBA_EkMlVYaL",

    async enregistrerReponseEnquete(donnees) {

        try {

            const reponse = await fetch(
                this.url + "/rest/v1/enquetes-reponses",
                {
                    method: "POST",

                    headers: {
                        "apikey": this.key,
                        "Authorization": "Bearer " + this.key,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },

                    body: JSON.stringify(donnees)
                }
            );

            if (!reponse.ok) {
                throw new Error(
                    "Supabase a refusé le dépôt : " +
                    reponse.status
                );
            }

            return true;

        } catch (erreur) {

            console.error(
                "La mémoire du Seuil n'a pas reçu la réponse :",
                erreur
            );

            return false;
        }
    }
};
