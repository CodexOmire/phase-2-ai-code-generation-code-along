import React, { useState } from 'react';

function DepositForm({ goalId, addDeposit }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      addDeposit(goalId, amount);
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Deposit Amount"
        min="0"
        className="flex-1 p-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
      >
        Deposit
      </button>
    </form>
  );
}

export default DepositForm;