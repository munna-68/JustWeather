import "./styles/style.css";
import { print } from "./js/module";

console.log(print);

// Theme toggle card expand/collapse
document.addEventListener("DOMContentLoaded", () => {
  const themeCard = document.querySelector(".theme-toggle-card");
  const cardHeader = themeCard?.querySelector(".card-header");

  if (cardHeader && themeCard) {
    cardHeader.addEventListener("click", () => {
      themeCard.classList.toggle("expanded");
    });
  }
});
