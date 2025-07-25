import React, { useState } from 'react';
import Overview from './components/Overview';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';

function App() {
  const [goals, setGoals] = useState([]);

  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (index, savedAmount) => {
    const updatedGoals = [...goals];
    updatedGoals[index].savedAmount += savedAmount;
    setGoals(updatedGoals);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-8 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-10">Smart Goal Planner</h1>
        <Overview goals={goals} />
        <GoalForm onAddGoal={addGoal} />
        <GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} />
      </div>
    </div>
  );
}

export default App;
