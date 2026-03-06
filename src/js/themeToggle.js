const THEME_STORAGE_KEY = "jw-theme";

const isValidTheme = (theme) => theme === "dark" || theme === "light";

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  // default theme is light
  return isValidTheme(storedTheme) ? storedTheme : "light";
};

const setThemeButtonState = (theme) => {
  const darkButton = document.querySelector(".theme-btn.dark-theme");
  const lightButton = document.querySelector(".theme-btn.light-theme");

  // prevent error if no btn on the page
  if (!darkButton || !lightButton) {
    return;
  }

  const isDark = theme === "dark";

  darkButton.classList.toggle("active", isDark);
  lightButton.classList.toggle("active", !isDark);

  //basic accasability for screen readers
  darkButton.setAttribute("aria-pressed", String(isDark));
  lightButton.setAttribute("aria-pressed", String(!isDark));
};

const applyTheme = (theme) => {
  const normalizedTheme = isValidTheme(theme) ? theme : "light";
  const shouldUseDarkTheme = normalizedTheme === "dark";

  document.body.classList.toggle("theme-dark", shouldUseDarkTheme);
  setThemeButtonState(normalizedTheme);
  localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
};

export const initThemeToggle = () => {
  const darkButton = document.querySelector(".theme-btn.dark-theme");
  const lightButton = document.querySelector(".theme-btn.light-theme");

  if (!darkButton || !lightButton) {
    return;
  }

  //apply the last used theme when reloaded
  applyTheme(getStoredTheme());

  darkButton.addEventListener("click", () => {
    applyTheme("dark");
  });

  lightButton.addEventListener("click", () => {
    applyTheme("light");
  });
};
