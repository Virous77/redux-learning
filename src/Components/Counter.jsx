import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decerement,
  reset,
  incrementByAmount,
} from "../store/slice/counterSlice";

const Counter = () => {
  const [incrementBy, setIncrementBy] = useState(0);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <section>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decerement())}>-</button>

      <input
        type="number"
        value={incrementBy}
        onChange={(e) => setIncrementBy(e.target.value)}
      />
      <button onClick={() => dispatch(incrementByAmount(+incrementBy))}>
        Inc
      </button>
      <button
        onClick={() => {
          dispatch(reset());
          setIncrementBy(0);
        }}
      >
        Reset
      </button>
    </section>
  );
};

export default Counter;
