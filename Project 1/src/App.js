import React, { useState } from 'react';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseList from './Components/ExpenseList';
import ExpenseChart from './Components/ExpenseChart';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };
  const deleteExpense = (expenseId) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== expenseId);
    setExpenses(filteredExpenses);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default App;
