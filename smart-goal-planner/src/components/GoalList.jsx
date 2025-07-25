import React from 'react';
import DepositForm from './DepositForm';

function GoalList({ goals, setGoals }) {
  const updateGoal = async (id, updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) throw new Error('Failed to update goal');
      const updated = await response.json();
      setGoals(goals.map((goal) => (goal.id === id ? updated : goal)));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' });
      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const addDeposit = async (id, amount) => {
    const goal = goals.find((g) => g.id === id);
    const newSavedAmount = goal.savedAmount + parseFloat(amount);

    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      if (!response.ok) throw new Error('Failed to add deposit');
      const updated = await response.json();
      setGoals(goals.map((g) => (g.id === id ? updated : g)));
    } catch (error) {
      console.error('Error adding deposit:', error);
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => {
        const progress = (goal.savedAmount / goal.targetAmount) * 100;
        const daysLeft = getDaysUntilDeadline(goal.deadline);
        const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
        const isNearDeadline = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
        const isComplete = goal.savedAmount >= goal.targetAmount;

        return (
          <div
            key={goal.id}
            className="bg-white p-6 rounded-lg shadow-lg animate-fade-in hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-primary">{goal.name}</h3>
            <p className="text-gray-600">Category: {goal.category}</p>
            <p className="text-gray-600">Target: ${goal.targetAmount.toLocaleString()}</p>
            <p className="text-gray-600">Saved: ${goal.savedAmount.toLocaleString()}</p>
            <p className="text-gray-600">
              Remaining: ${(goal.targetAmount - goal.savedAmount).toLocaleString()}
            </p>
            <p className="text-gray-600">Deadline: {goal.deadline}</p>
            <div className="progress-bar mt-4">
              <div
                className="progress"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, #10B981, #34D399)`,
                }}
              ></div>
            </div>
            {isComplete && (
              <p className="text-secondary font-bold mt-2">Goal Achieved! 🎉</p>
            )}
            {isNearDeadline && (
              <p className="text-warning font-bold mt-2">⚠️ Less than 30 days left!</p>
            )}
            {isOverdue && (
              <p className="text-overdue font-bold mt-2">⏰ Overdue!</p>
            )}
            <DepositForm goalId={goal.id} addDeposit={addDeposit} />
            <button
              className="mt-4 bg-overdue text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => deleteGoal(goal.id)}
            >
              Delete Goal
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;