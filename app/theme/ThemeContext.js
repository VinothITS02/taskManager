import React, { createContext, useState, useContext } from "react";
import { buildTheme } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light"); // "light" | "dark"
  const [opco, setOpco] = useState("default"); // "default" | "opco1" | "opco2"

  const theme = buildTheme(opco, mode);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changeOpco = (newOpco) => {
    setOpco(newOpco);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, opco, toggleMode, changeOpco }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
