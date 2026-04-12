import "./styles/style.css";
import { renderWeather } from "./js/renderWeather";
import { initThemeToggle } from "./js/themeToggle";

document.title = "Just Weather";

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

renderWeather();
