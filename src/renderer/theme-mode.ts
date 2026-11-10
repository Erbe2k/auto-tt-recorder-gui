// Light / night mode of the GUI. The choice is kept in localStorage; before the user picks one,
// the GUI follows the Windows light/dark setting.

export type ThemeMode = "light" | "night";

const THEME_STORAGE_KEY = "auto-tt-recorder-gui-theme";

export function getSavedThemeMode(): ThemeMode | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "night" ? value : null;
  } catch (e) {
    return null;
  }
}

export function getInitialThemeMode(): ThemeMode {
  const saved = getSavedThemeMode();
  if (saved !== null) {
    return saved;
  }
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light";
  } catch (e) {
    return "light";
  }
}

export function applyThemeMode(mode: ThemeMode) {
  document.documentElement.setAttribute("data-theme", mode);
}

export function saveThemeMode(mode: ThemeMode) {
  applyThemeMode(mode);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (e) {
    // storage not available: the choice only lasts until the program is closed
  }
}
