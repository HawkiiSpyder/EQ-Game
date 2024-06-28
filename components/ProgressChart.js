//EQ-Game/components/ProgressChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ progressData, personalBest, onClose }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <p className="mb-4">Personal Best: {personalBest}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={progressData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ProgressChart;