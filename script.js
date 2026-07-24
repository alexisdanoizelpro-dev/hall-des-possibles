document.addEventListener("DOMContentLoaded", () => {
  const seuil = document.querySelector(".seuil");
  const porte = document.querySelector(".porte");

  if (!seuil || !porte) {
    return;
  }

  porte.addEventListener("click", () => {
    porte.classList.add("ouverte");
    seuil.classList.add("entree-ouverte");
  });
});
