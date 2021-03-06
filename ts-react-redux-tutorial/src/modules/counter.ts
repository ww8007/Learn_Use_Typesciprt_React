import { deprecated, ActionType, createReducer } from "typesafe-actions";
const { createAction, createStandardAction } = deprecated;
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();

const actions = { increase, decrease, increaseBy }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
type CounterAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다

type CounterState = {
   count: number;
};

const initialState: CounterState = {
   count: 0,
};

const counter = createReducer<CounterState, CounterAction>(initialState, {
   [INCREASE]: (state) => ({ count: state.count + 1 }), // 액션을 참조 할 필요 없으면 파라미터로 state 만 받아와도 됩니다
   [DECREASE]: (state) => ({ count: state.count - 1 }),
   [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }), // 액션의 타입을 유추 할 수 있습니다.
});

// function Counter(
//    state: CounterState = initialState,
//    action: CounterAction
// ): CounterState {
//    switch (action.type) {
//       case "counter/INCREASE":
//          return { count: state.count + 1 };
//       case "counter/DECREASE":
//          return { count: state.count - 1 };
//       case "counter/INCREASE_BY":
//          return { count: state.count + action.payload };
//       default:
//          return state;
//    }
// }

export default counter;
