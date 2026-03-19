const loadingScreen = document.querySelector(".loading-screen");
const loadingProgressFill = document.querySelector(".loader-progress-fill");
const searchInput = document.querySelector(".search-input");

let activeLoadingCount = 0;

function restartProgressAnimation() {
  if (!loadingProgressFill) {
    return;
  }

  loadingProgressFill.style.animation = "none";
  loadingProgressFill.offsetWidth;
  loadingProgressFill.style.animation = "";
}

export function showLoadingScreen() {
  if (!loadingScreen) {
    return;
  }

  activeLoadingCount += 1;

  if (activeLoadingCount === 1) {
    restartProgressAnimation();
    loadingScreen.classList.add("visible");
    loadingScreen.setAttribute("aria-hidden", "false");
  }
}

export function hideLoadingScreen() {
  if (!loadingScreen) {
    return;
  }

  activeLoadingCount = Math.max(0, activeLoadingCount - 1);

  if (activeLoadingCount === 0) {
    loadingScreen.classList.remove("visible");
    loadingScreen.setAttribute("aria-hidden", "true");
  }
}
