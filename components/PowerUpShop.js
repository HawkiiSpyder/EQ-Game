// File: components/PowerUpShop.js

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

const powerUps = [
  { id: 1, name: "Time Freeze", description: "Add 10 seconds to the timer", cost: 50, icon: "⏱️" },
  { id: 2, name: "Hint", description: "Get a hint for the correct answer", cost: 100, icon: "💡" },
  { id: 3, name: "Double Points", description: "Earn double points for the next question", cost: 150, icon: "🔥" },
  { id: 4, name: "Skip Question", description: "Skip the current question without penalty", cost: 200, icon: "⏭️" },
  { id: 5, name: "Empathy Boost", description: "Increases chances of correct empathy-related answers", cost: 250, icon: "🤗" },
  { id: 6, name: "Streak Shield", description: "Protects your streak from one wrong answer", cost: 300, icon: "🛡️" },
  { id: 7, name: "Score Multiplier", description: "Triple your points for the next question", cost: 400, icon: "⭐" },
  { id: 8, name: "Extra Life", description: "Gives an extra life if you make a mistake", cost: 500, icon: "❤️" },
  // Add more power-ups here
];

const PowerUpShop = ({ coins, setCoins, onClose, onPurchase }) => {
  const buyPowerUp = (powerUp) => {
    if (coins >= powerUp.cost) {
      setCoins(coins - powerUp.cost);
      onPurchase(powerUp.id);
      console.log(`Bought ${powerUp.name}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Power-Up Shop</h2>
        <p className="mb-4 text-center">Your Coins: {coins}</p>
        <div className="space-y-4">
          {powerUps.map((powerUp) => (
            <Tooltip
              title={powerUp.description}
              position="right"
              trigger="mouseenter"
              key={powerUp.id}
            >
              <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-md hover:bg-gray-200 transition duration-200 ease-in-out">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{powerUp.icon}</span>
                  <div>
                    <h3 className="font-semibold">{powerUp.name}</h3>
                    <p className="text-sm text-gray-600">{powerUp.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => buyPowerUp(powerUp)}
                  disabled={coins < powerUp.cost}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm disabled:bg-gray-400"
                >
                  Buy ({powerUp.cost} coins)
                </button>
              </div>
            </Tooltip>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PowerUpShop;
