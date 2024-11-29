"use client";
import { COLOR_THEME_COOKIE_ID } from "@/constants";
import Cookies from "js-cookie";
import React from "react";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

const DarkModeContext = React.createContext(undefined);

const DarkModeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleTheme = React.useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    console.log(`toggling theme! ${nextTheme}`);

    // Save to a cookie for later
    Cookies.set(COLOR_THEME_COOKIE_ID, nextTheme, { expires: 1000 });

    // Update the HTML element with the new theme
    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);

    // Update the theme colors
    const themeColors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    for (const [key, value] of Object.entries(themeColors)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export function useDarkMode() {
  const context = React.useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export default DarkModeProvider;
