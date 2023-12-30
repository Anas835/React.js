import React, { useState } from 'react';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

// Higher-order component to manage count logic
const withCounter = (WrappedComponent) => {
  const CounterWithLogic = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
      setCount(count + 1);
    };

    const decrementCount = () => {
      setCount(count - 1);
    };

    const resetCount = () => {
      setCount(0);
    };

    return (
      <WrappedComponent
        count={count}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        resetCount={resetCount}
      />
    );
  };

  return CounterWithLogic;
};

// Counter component
const Counter = ({ count, incrementCount, decrementCount, resetCount }) => {
  if (count === 5) {
    throw new Error('Count reached 5!');
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
};

// Wrap Counter component with the higher-order component
const CounterWithLogic = withCounter(Counter);

// Counter 1 component using the HOC and ErrorBoundary
const Counter1 = () => {
  return (
    <ErrorBoundary>
      <div>
        <h1>Counter 1</h1>
        <CounterWithLogic />
      </div>
    </ErrorBoundary>
  );
};

// Counter 2 component using the HOC and ErrorBoundary
const Counter2 = () => {
  return (
    <ErrorBoundary>
      <div>
        <h1>Counter 2</h1>
        <CounterWithLogic />
      </div>
    </ErrorBoundary>
  );
};

export { Counter1, Counter2 };
