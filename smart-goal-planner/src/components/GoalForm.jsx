import React, { useState } from 'react';

function GoalForm({ addGoal, closeModal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(formData);
    setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
    closeModal();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-primary mb-4">Add New Goal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Goal Name"
            className="w-full p-2 mb-4 border rounded-lg"
            required
          />
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="Target Amount"
            className="w-full p-2 mb-4 border rounded-lg"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {['Travel', 'Emergency', 'Electronics', 'Real Estate', 'Vehicle', 'Education', 'Shopping', 'Retirement', 'Home'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-lg"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;