import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense, updateExpense, expenseToEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [expense, setExpense] = useState({ month: '', item: '', amount: '' });

  useEffect(() => {
    if (expenseToEdit) {
      setIsEditing(true);
      setExpense(expenseToEdit);
    }
  }, [expenseToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.month && expense.item && expense.amount) {
      if (isEditing) {
        updateExpense(expense.id, expense);
        setIsEditing(false);
      } else {
        addExpense({ ...expense, id: Math.random().toString() });
      }
      setExpense({ month: '', item: '', amount: '' });
    }
  };

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <select name="month" value={expense.month} onChange={handleInputChange}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
      <input type="text" name="item" value={expense.item} onChange={handleInputChange} placeholder="Item" />
      <input type="number" name="amount" value={expense.amount} onChange={handleInputChange} placeholder="Amount" />
      <button type="submit">{isEditing ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;
