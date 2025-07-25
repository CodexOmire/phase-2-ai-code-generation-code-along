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
    <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-6">Savings Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-600">Total Goals</p>
          <p className="text-2xl font-bold text-blue-700">{totalGoals}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl text-center">
          <p className="text-gray-600">Total Saved</p>
          <p className="text-2xl font-bold text-green-700">${totalSaved.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl text-center">
          <p className="text-gray-600">Completed Goals</p>
          <p className="text-2xl font-bold text-purple-700">{completedGoals}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-xl text-center">
          <p className="text-gray-600">Urgent Goals</p>
          <p className="text-2xl font-bold text-red-700">{urgentGoals}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
