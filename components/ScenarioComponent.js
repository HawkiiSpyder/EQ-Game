// File: components/ScenarioComponent.js
import React from 'react';
import { motion } from 'framer-motion';

const ScenarioComponent = ({ scenario, handleAnswer, timer, isTimerRunning, setIsTimerRunning, activePowerUps, onUsePowerUp }) => {
  return (
    <div className="animate-fadeIn text-gray-800">
      <h2 className="text-xl font-semibold mb-4">{scenario.question}</h2>
      <div className="mb-4">
        {scenario.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="block w-full text-left p-2 hover:bg-gray-100 rounded mb-2"
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <p className="font-semibold">Emotion: {scenario.emotion}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Active Power-Ups:</h3>
        {activePowerUps.map((powerUpId) => (
          <button
            key={powerUpId}
            onClick={() => onUsePowerUp(powerUpId)}
            className="mr-2 mb-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Use Power-Up {powerUpId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioComponent;
