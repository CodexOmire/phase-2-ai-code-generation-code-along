import React from 'react';

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter((goal) => goal.savedAmount >= goal.targetAmount).length;
  const urgentGoals = goals.filter((goal) => {
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  }).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-4">Savings Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">Total Goals</p>
          <p className="text-xl font-semibold">{totalGoals}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">Total Saved</p>
          <p className="text-xl font-semibold">${totalSaved.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">Completed Goals</p>
          <p className="text-xl font-semibold">{completedGoals}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">Urgent Goals</p>
          <p className="text-xl font-semibold text-warning">{urgentGoals}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;