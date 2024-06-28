import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [backgroundColor, setBackgroundColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('backgroundColor') || '#ffffff';
    }
    return '#ffffff';
  });

  const [fontColor, setFontColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fontColor') || '#000000';
    }
    return '#000000';
  });

  const availableThemes = ['light', 'dark', 'solarized', 'dracula', 'material'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      localStorage.setItem('backgroundColor', backgroundColor);
      localStorage.setItem('fontColor', fontColor);
      document.documentElement.style.setProperty('--bg-color', backgroundColor);
      document.documentElement.style.setProperty('--text-color', fontColor);
    }
  }, [theme, backgroundColor, fontColor]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const changeFontColor = (color) => {
    setFontColor(color);
  };

  const setThemeSettings = (newSettings) => {
    toggleTheme(newSettings.theme);
    changeBackgroundColor(newSettings.backgroundColor);
    changeFontColor(newSettings.fontColor);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, availableThemes, backgroundColor, changeBackgroundColor, fontColor, changeFontColor, setThemeSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
