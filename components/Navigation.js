//EQ-Game/components/Navigation.js
import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const Navigation = ({ onHome, onBack, gameState }) => {
  if (gameState === 'menu') return null; // Don't show navigation on main menu

  return (
    <div className="fixed top-4 left-4 flex space-x-2 z-50">
      <NavigationButton onClick={onHome} icon={<Home size={20} />}>
        Home
      </NavigationButton>
      <NavigationButton onClick={onBack} icon={<ArrowLeft size={20} />}>
        Back
      </NavigationButton>
    </div>
  );
};

const NavigationButton = ({ onClick, children, icon }) => (
  <motion.button
    onClick={onClick}
    className="bg-white text-blue-500 font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-100 transition duration-200 flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </motion.button>
);

export default Navigation;