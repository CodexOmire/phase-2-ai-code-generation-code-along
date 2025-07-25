import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
   } catch (error) {
      console.error('Error adding deposit:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-8">
        Smart Goal Planner
      </h1>
      <Overview goals={goals} />
      <button
        className="bg-secondary text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Goal
      </button>
      {isModalOpen && (
        <GoalForm addGoal={addGoal} closeModal={() => setIsModalOpen(false)} />
      )}
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;