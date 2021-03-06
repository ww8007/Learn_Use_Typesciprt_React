import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { RootState } from "../modules";
import { increment, decrement, incrementByAmount } from "../modules/counter";

function CounterContainer() {
   const count = useSelector((state: RootState) => state.counter.value);
   const dispatch = useDispatch();

   const onIncrease = () => {
      dispatch(increment());
   };
   const onDecrease = () => {
      dispatch(decrement());
   };
   const onIncreaseBy = (diff: number) => {
      dispatch(incrementByAmount(diff));
   };

   return (
      <Counter
         count={count}
         onIncrease={onIncrease}
         onDecrease={onDecrease}
         onIcreaseBy={onIncreaseBy}
      ></Counter>
   );
}

export default CounterContainer;
