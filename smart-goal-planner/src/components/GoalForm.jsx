import React, { useState } from 'react';

function GoalForm({ onAddGoal }) {
  const [goal, setGoal] = useState({ name: '', targetAmount: '', deadline: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.name || !goal.targetAmount || !goal.deadline) return;

    onAddGoal({ ...goal, savedAmount: 0 });
    setGoal({ name: '', targetAmount: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl mb-8 space-y-4">
      <h2 className="text-xl font-semibold text-primary mb-2">Add New Goal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Goal Name"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          className="input-style"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={goal.targetAmount}
          onChange={(e) => setGoal({ ...goal, targetAmount: parseFloat(e.target.value) })}
          className="input-style"
        />
        <input
          type="date"
          value={goal.deadline}
          onChange={(e) => setGoal({ ...goal, deadline: e.target.value })}
          className="input-style"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition"
      >
        Add Goal
      </button>
    </form>
  );
}

export default GoalForm;
