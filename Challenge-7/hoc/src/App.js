import React from 'react';
import { Counter1, Counter2 } from './Components/Counter';
import { Counter3, Counter4 } from './Components/Counter1';
function App() {
  return (
    <center>
    <div>
      <Counter1 />
      <Counter2 />
      <div>
      <Counter3
        render={(count, incrementCount, decrementCount, resetCount) => (
          <div>
            <h2>Counter 3: {count}</h2>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount}>Decrement</button>
            <button onClick={resetCount}>Reset</button>
          </div>
        )}
      />
      <Counter4
        render={(count, incrementCount, decrementCount, resetCount) => (
          <div>
            <h2>Counter 4: {count}</h2>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount}>Decrement</button>
            <button onClick={resetCount}>Reset</button>
          </div>
        )}
      />
    </div>
    </div>
    </center>
  );
}

export default App;
