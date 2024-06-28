// File: components/ThemeToggle.js

import React from 'react';
import { Sun, Moon, Circle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeToggle component
 * Handles the theme toggle functionality.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ThemeToggle = () => {
  const { theme, toggleTheme, availableThemes } = useTheme();

  return (
    <div className="flex space-x-2">
      {availableThemes.map((themeOption) => (
        <button
          key={themeOption}
          onClick={() => toggleTheme(themeOption)}
          className={`flex items-center justify-center w-10 h-10 rounded-full focus:outline-none ${
            theme === themeOption ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          {themeOption === 'light' ? <Sun /> : themeOption === 'dark' ? <Moon /> : <Circle />}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
