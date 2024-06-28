//EQ-Game/components/MainMenu.js
import React from 'react';
import { motion } from 'framer-motion';

const MainMenu = ({ 
  onStartGame, 
  onOpenLeaderboard, 
  onOpenAchievements, 
  onOpenProfile, 
  onOpenSettings, 
  onOpenMiniGames, 
  onOpenDailyChallenge 
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Emotional Intelligence Master
      </motion.h1>
      <div className="space-y-4">
        <MenuButton onClick={onStartGame}>Start Game</MenuButton>
        <MenuButton onClick={onOpenLeaderboard}>Leaderboard</MenuButton>
        <MenuButton onClick={onOpenAchievements}>Achievements</MenuButton>
        <MenuButton onClick={onOpenProfile}>Profile</MenuButton>
        <MenuButton onClick={onOpenSettings}>Settings</MenuButton>
        <MenuButton onClick={onOpenMiniGames}>Mini Games</MenuButton>
        <MenuButton onClick={onOpenDailyChallenge}>Daily Challenge</MenuButton>
      </div>
    </div>
  );
};

const MenuButton = ({ onClick, children }) => (
  <motion.button
    className="w-48 bg-white text-blue-500 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-200"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.button>
);

export default MainMenu;