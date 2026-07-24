/* ==========================================================
   LE HALL DES POSSIBLES — V0.1
   Ouverture du Seuil
   ========================================================== */

(() => {
  "use strict";

  const seuil =
    document.querySelector("#seuil");

  const porte =
    document.querySelector("#porte");

  const invitation =
    document.querySelector("#invitation");


  /*
   * Si un élément indispensable manque,
   * le script s'arrête sans provoquer d'erreur.
   */

  if (!seuil || !porte) {
    return;
  }


  /*
   * Cette variable empêche le Visiteur
   * de déclencher plusieurs ouvertures
   * en touchant rapidement la porte.
   */

  let ouvertureLancee = false;


  /*
   * Fonction principale :
   * elle lance l'ouverture du Seuil.
   */

  const ouvrirLeHall = () => {

    if (ouvertureLancee) {
      return;
    }

    ouvertureLancee = true;


    /*
     * Mise à jour des informations
     * destinées aux lecteurs d'écran.
     */

    porte.setAttribute(
      "aria-expanded",
      "true"
    );

    porte.setAttribute(
      "aria-label",
      "La porte du Hall des Possibles est ouverte"
    );


    /*
     * La classe is-opening déclenche
     * les animations écrites dans le CSS.
     */

    seuil.classList.add("is-opening");


    /*
     * Le texte change immédiatement,
     * avant de disparaître avec l'animation.
     */

    if (invitation) {
      invitation.textContent =
        "La porte s'ouvre...";
    }


    /*
     * Lorsque le mouvement de la porte
     * est terminé, le Seuil passe dans
     * son état définitivement ouvert.
     */

    window.setTimeout(() => {

      seuil.classList.remove(
        "is-opening"
      );

      seuil.classList.add(
        "is-open"
      );

    }, 1850);

  };


  /*
   * Le Visiteur ouvre la porte
   * en la touchant ou en cliquant dessus.
   */

  porte.addEventListener(
    "click",
    ouvrirLeHall
  );

})();
