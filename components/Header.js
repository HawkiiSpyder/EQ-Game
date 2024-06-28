// File: components/Header.js

import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Header component
 * Simple header with theme toggle and navigation menu.
 * 
 * Potential Issues:
 * Validate theme toggle functionality and ensure navigation links work correctly.
 */
const Header = () => {
  const { theme, toggleTheme, availableThemes } = useTheme();

  return (
    <header className="p-4 bg-primary flex justify-between items-center">
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your App
      </motion.h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </li>
        </ul>
      </nav>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} availableThemes={availableThemes} />
    </header>
  );
};

export default Header;
