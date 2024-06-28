// File: components/LessonComponent.js
import React from 'react';
import { motion } from 'framer-motion';

const LessonComponent = ({ scenario, onContinue, progress, totalScenarios }) => {
  const progressPercentage = (progress / totalScenarios) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Lesson</h2>
        <p className="mb-4">{scenario.lesson}</p>
        <p className="mb-4 italic">"{scenario.golemanInsight}" - Daniel Goleman</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Summary</h3>
        <ul className="list-disc list-inside">
          <li>Reflect on your emotions and identify their causes.</li>
          <li>Practice empathy by actively listening to others.</li>
          <li>Manage stress through relaxation techniques.</li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progress} of {totalScenarios} scenarios completed ({Math.round(progressPercentage)}%)
        </p>
      </div>
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Next Scenario
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LessonComponent;
