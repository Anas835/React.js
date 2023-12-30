import React from 'react';
import './ExpenseList.css'; // Import the CSS file

const ExpenseList = ({ expenses, updateExpense, deleteExpense }) => {
  const handleUpdateClick = (expense) => {
    const updatedAmount = prompt('Enter the updated amount:');
    if (updatedAmount !== null && updatedAmount !== '') {
      const updatedExpense = { ...expense, amount: parseFloat(updatedAmount) };
      updateExpense(updatedExpense); // Make sure the correct function is called here
    }
  };

  // Function to group expenses by month and render them
  const renderExpensesByMonth = () => {
    const groupExpensesByMonth = () => {
      const expensesByMonth = {};

      expenses.forEach((expense) => {
        if (!expensesByMonth[expense.month]) {
          expensesByMonth[expense.month] = { total: 0, expenses: [] };
        }
        expensesByMonth[expense.month].expenses.push(expense);
        expensesByMonth[expense.month].total += parseFloat(expense.amount);
      });

      return expensesByMonth;
    };

    const expensesByMonth = groupExpensesByMonth();

    return Object.keys(expensesByMonth).map((month) => (
      <div className="expense-month" key={month}>
        <h3>
          {month} - Total Spend: ${expensesByMonth[month].total.toFixed(2)}
        </h3>
        <div className="expense-list">
          {expensesByMonth[month].expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <p>
                <span>Item: {expense.item}</span>
                <span>Amount: {expense.amount}</span>
              </p>
              <div className="expense-buttons">
                <button onClick={() => handleUpdateClick(expense)}>Update Amount</button>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderExpensesByMonth()}
    </div>
  );
};

export default ExpenseList;
