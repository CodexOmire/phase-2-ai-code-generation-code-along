import React, { useState } from 'react';

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  const [amounts, setAmounts] = useState({});

  const handleSave = (index) => {
    const amount = parseFloat(amounts[index]);
    if (!isNaN(amount) && amount > 0) {
      onUpdateGoal(index, amount);
      setAmounts({ ...amounts, [index]: '' });
    }
  };

  return (
    <div className="space-y-6">
      {goals.map((goal, index) => {
        const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(1);
        return (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg space-y-2">
            <h3 className="text-xl font-semibold text-primary">{goal.name}</h3>
            <p className="text-gray-600">Target: ${goal.targetAmount.toLocaleString()}</p>
            <p className="text-gray-600">Saved: ${goal.savedAmount.toLocaleString()}</p>
            <p className="text-gray-600">Deadline: {goal.deadline}</p>
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div
                className="h-3 rounded-full bg-green-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <input
                type="number"
                value={amounts[index] || ''}
                onChange={(e) => setAmounts({ ...amounts, [index]: e.target.value })}
                placeholder="Add Amount"
                className="input-style flex-1"
              />
              <button
                onClick={() => handleSave(index)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => onDeleteGoal(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
