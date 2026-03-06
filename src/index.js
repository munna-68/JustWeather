import "./styles/style.css";
import { print } from "./js/module";
import { initThemeToggle } from "./js/themeToggle";

console.log(print);

// Theme toggle card expand/collapse
document.addEventListener("DOMContentLoaded", () => {
  const themeCard = document.querySelector(".theme-toggle-card");
  const cardHeader = themeCard?.querySelector(".card-header");

  initThemeToggle();

  if (cardHeader && themeCard) {
    cardHeader.addEventListener("click", () => {
      themeCard.classList.toggle("expanded");
    });
  }
});
