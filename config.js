// ==========================================================
// LE HALL DES POSSIBLES — ÉDITION FONDATRICE
// Configuration de l'Artisan
//
// Ce fichier est le seul que l'Artisan modifie régulièrement.
// Il ne contient que des éléments de configuration.
// Toute la logique du Hall appartient à script.js.
// ==========================================================

window.CONFIG_SEUIL = {

  // ========================================================
  // COUPELLE DE LAIT
  // true  : visible
  // false : totalement absente du Hall
  // ========================================================

  coupelleDisponible: true,



  // ========================================================
  // PAROLE DU MOMENT
  // Seul ce contenu change.
  // L'animation et le fonctionnement restent dans script.js.
  // ========================================================

  paroleDuSeuil: {

    // URL de réception des réponses.
    // Laisser vide tant qu'aucun service n'est connecté.

    reponseUrl: "",

    introduction:
      "L’Atelier vous confie ceci, si la curiosité vous appelle.",

    texte:
      "Je nais sans bruit, je grandis quand on me partage, et je peux ouvrir des mondes sans posséder de clé. Qui suis-je ?"

  }

};
