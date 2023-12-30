import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ExpenseChart = ({ expenses }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const expensesByMonth = {};
    const allProducts = new Set();
    expenses.forEach((expense) => {
      if (!expensesByMonth[expense.month]) {
        expensesByMonth[expense.month] = {};
      }
      if (!expensesByMonth[expense.month][expense.item]) {
        expensesByMonth[expense.month][expense.item] = 0;
      }
      expensesByMonth[expense.month][expense.item] += parseFloat(expense.amount);
      allProducts.add(expense.item);
    });

    const months = Object.keys(expensesByMonth);
    const datasets = Array.from(allProducts).map((product) => {
      const data = months.map((month) => expensesByMonth[month][product] || 0);
      return {
        label: product,
        data: data,
        backgroundColor: getRandomColor(),
        borderWidth: 1,
      };
    });

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: datasets,
      },
      options: {
        // Add additional options as needed
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas ref={chartRef} style={{ width: '80%', maxHeight:'450px',maxWidth: '1000px' }} />
    </div>
  );
};

export default ExpenseChart;
