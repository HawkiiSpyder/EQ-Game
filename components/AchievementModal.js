// EQ-Game/components/AchievementModal.js
/**
 * AchievementModal Component
 * Displays achievements with tooltips and progress indicators.
 * 
 * Potential Issues Fixed:
 * - Verified unlockedAchievements state management.
 * - Ensured accurate progress display for each achievement.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const achievements = [
  { id: 'quickThinker', name: "Quick Thinker", description: "Answer correctly in less than 10 seconds", icon: "⚡", tiers: ['bronze', 'silver', 'gold'] },
  { id: 'empathyMaster', name: "Empathy Master", description: "Get 5 empathy questions correct in a row", icon: "🤗", tiers: ['bronze', 'silver', 'gold'] },
  { id: 'consistentPerformer', name: "Consistent Performer", description: "Maintain a streak of 10", icon: "🎯", tiers: ['bronze', 'silver', 'gold'] },
  { id: 'coinCollector', name: "Coin Collector", description: "Earn 1000 coins", icon: "💰", tiers: ['bronze', 'silver', 'gold'] },
  { id: 'miniGameChampion', name: "Mini-Game Champion", description: "Win all mini-games", icon: "🏆", tiers: ['bronze', 'silver', 'gold'] },
  { id: 'dailyChallenger', name: "Daily Challenger", description: "Complete daily challenges", icon: "📅", tiers: ['bronze', 'silver', 'gold'] },
];

const AchievementModal = ({ unlockedAchievements = {}, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        {achievements.map((achievement) => (
          <Tooltip
            title={achievement.description}
            position="right"
            trigger="mouseenter"
            key={achievement.id}
          >
            <div className="flex items-center mb-4 p-2 rounded hover:bg-gray-100 transition duration-200 ease-in-out">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl mr-3"
              >
                {achievement.icon}
              </motion.span>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <div className="flex items-center mt-1">
                  {achievement.tiers.map((tier, index) => {
                    const achievementLevel = unlockedAchievements[achievement.id] || 0;
                    return (
                      <div 
                        key={tier}
                        className={`w-6 h-6 rounded-full mr-1 ${
                          achievementLevel > index
                            ? tier === 'bronze' ? 'bg-yellow-600' : tier === 'silver' ? 'bg-gray-400' : 'bg-yellow-400'
                            : 'bg-gray-200'
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className={`h-2.5 rounded-full ${
                      unlockedAchievements[achievement.id] >= 3 ? 'bg-green-500' : unlockedAchievements[achievement.id] === 2 ? 'bg-yellow-400' : 'bg-gray-400'
                    }`}
                    style={{ width: `${(unlockedAchievements[achievement.id] / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AchievementModal;
