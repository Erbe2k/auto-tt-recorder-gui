import React, { useState } from "react";
import { ThemeMode, getInitialThemeMode, saveThemeMode } from "../theme-mode";

export function ThemeModeSelect(props: {disabled: boolean}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode());

  function updateThemeMode(event: React.ChangeEvent<HTMLInputElement>) {
    const newMode = event.target.value as ThemeMode;
    setThemeMode(newMode);
    saveThemeMode(newMode);
  }

  return (
    <div className="theme-mode-select">
      <label>Theme: </label>
      <label htmlFor="theme-mode-light">Light: </label>
      <input type="radio" id="theme-mode-light" name="theme-mode" value="light" checked={themeMode === "light"} onChange={updateThemeMode}/>
      <label htmlFor="theme-mode-night">Night: </label>
      <input type="radio" id="theme-mode-night" name="theme-mode" value="night" checked={themeMode === "night"} onChange={updateThemeMode}/>
    </div>
  );
}
