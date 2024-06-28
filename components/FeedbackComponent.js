// File: components/FeedbackComponent.js

import React from 'react';
import { motion } from 'framer-motion';

/**
 * FeedbackComponent provides feedback after answering a scenario question.
 * Displays additional information and lesson insights.
 * 
 * @param {Object} props - The component props
 * @param {Object} props.scenario - The scenario object containing the lesson and Goleman insight
 * @param {number} props.selectedOption - The index of the selected option
 * @param {function} props.onContinue - Function to call when the user clicks the continue button
 * @returns {JSX.Element} The rendered component
 */
const FeedbackComponent = ({ scenario, selectedOption, onContinue }) => {
  const { feedback, correct } = scenario.options[selectedOption] || {};

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {correct ? 'Correct!' : 'Incorrect'}
        </h2>
        <p className="text-lg mb-4">{feedback}</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
          <p>{scenario.lesson}</p>
          <p className="italic mt-2">"{scenario.golemanInsight}" - Daniel Goleman</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FeedbackComponent;
