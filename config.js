// ==========================================================
// LE HALL DES POSSIBLES — V0.6.1
// Configuration simple du Hall
// ==========================================================

window.CONFIG_SEUIL = {
  // COUPELLE DE LAIT
  // true  = la Coupelle de Lait est disponible
  // false = la Coupelle de Lait disparaît complètement
  coupelleDisponible: true,

  // PAROLE DU SEUIL
  // Modifiez uniquement ces deux textes pour changer ce que contient
  // l'enveloppe scellée, sans toucher au code du Hall.
  paroleDuSeuil: {
    // Facultatif : URL de réception des réponses. Laisser vide tant qu’aucun service n’est branché.
    reponseUrl: "",
    introduction: "L’Atelier vous confie ceci, si la curiosité vous appelle.",
    texte: "Je nais sans bruit, je grandis quand on me partage, et je peux ouvrir des mondes sans posséder de clé. Qui suis-je ?"
  }
};
