import React from "react";

type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIcreaseBy: (diff: number) => void;
};

function Counter({ count, onIncrease, onDecrease, onIcreaseBy }: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIcreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
