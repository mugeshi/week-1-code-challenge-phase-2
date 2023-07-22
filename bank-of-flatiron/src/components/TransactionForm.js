import React, { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(newTransaction);
    setNewTransaction({
      date: '',
      description: '',
      amount: '',
      category: '',
    });
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
        />
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={newTransaction.category}
          onChange={handleInputChange}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
