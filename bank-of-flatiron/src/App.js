import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import TransactionForm from './components/TransactionForm';
import './index.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addTransaction = (newTransaction) => {
    // Assuming each new transaction has a unique ID, you can modify this logic as per your data structure.
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortTransactions = (type) => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      type === 'category'
        ? a.category.localeCompare(b.category)
        : a.description.localeCompare(b.description)
    );
    setTransactions(sortedTransactions);
  };

  return (
    <div>
      <h1>Bank of Flatiron</h1>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <TransactionTable
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />

      <TransactionForm addTransaction={addTransaction} />

      <div>
        <button onClick={() => sortTransactions('category')}>
          Sort by Category
        </button>
        <button onClick={() => sortTransactions('description')}>
          Sort by Description
        </button>
      </div>
    </div>
  );
}

export default App
