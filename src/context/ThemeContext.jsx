import React, { createContext, useContext, useEffect, useState } from "react";

// Créer le contexte du thème
const ThemeContext = createContext();

// Provider pour envelopper l'app
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialiser le thème au montage
  useEffect(() => {
    // Vérifier s'il y a un thème sauvegardé dans localStorage
    const savedTheme = localStorage.getItem("site_theme");
    
    if (savedTheme) {
      // Utiliser le thème sauvegardé
      setIsDark(savedTheme === "dark");
    } else {
      // Utiliser la préférence système
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
    
    setIsLoaded(true);
  }, []);

  // Appliquer la classe 'dark' au document root
  useEffect(() => {
    if (!isLoaded) return;

    const htmlEl = document.documentElement;
    
    if (isDark) {
      htmlEl.classList.add("dark");
      localStorage.setItem("site_theme", "dark");
    } else {
      htmlEl.classList.remove("dark");
      localStorage.setItem("site_theme", "light");
    }
  }, [isDark, isLoaded]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Fonction pour définir le thème directement
  const setTheme = (theme) => {
    setIsDark(theme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personnalisé pour utiliser le thème
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
  }
  return context;
}
