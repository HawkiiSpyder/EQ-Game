//EQ-Game/components/Tutorial.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tutorialSteps = [
  {
    title: "Welcome to Emotional Intelligence Master!",
    content: "This game will help you improve your emotional intelligence through various scenarios and challenges."
  },
  {
    title: "Answering Questions",
    content: "You'll be presented with scenarios. Choose the best response to demonstrate your emotional intelligence."
  },
  {
    title: "Scoring",
    content: "Earn points for correct answers. The faster you answer, the more points you get!"
  },
  {
    title: "Power-Ups",
    content: "Use power-ups to help you in difficult situations. You can purchase these in the Power-Up Shop."
  },
  {
    title: "Daily Challenges",
    content: "Complete daily challenges to earn extra rewards and improve your skills consistently."
  }
];

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">{tutorialSteps[currentStep].title}</h2>
      <p className="mb-6">{tutorialSteps[currentStep].content}</p>
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={nextStep}
        >
          {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
        </motion.button>
      </div>
      <div className="mt-4 text-center">
        {currentStep + 1} / {tutorialSteps.length}
      </div>
    </div>
  );
};

export default Tutorial;