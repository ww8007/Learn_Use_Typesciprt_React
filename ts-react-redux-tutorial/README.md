# 타입스크립트를 이용한 REDUX 사용

### 기본 설정

yarn add redux react-redux

어떤 라이브러리들은 typescript 지원 하는 것이 있고 안하는 것이 있음

-  redux의 경우 node-module로 들어가보면
   index.d.ts 라는 파일이 존재
   이는 typeScript를 지원한다는 의미

*  react-redux는 typeScript 지원을 안하고 있음
   yarn add @types/react-redux
   써드파티로 TypeScript로 지원을 받음

*  TypeSearch로 찾아볼 수 있음
   [npm](https://www.npmjs.com/package/@types/react-redux)

*  yarn add @types/react

*  npm install --save-dev @types/react-redux

### module 생성

기본적으로 js 파일 작성하듯이 작성하면 오류가 생길 수 있음
increase action을 만들 경우 string이 type으로 출력되게 되는데 이는 나중에 type을 볼 수 없게 됨

-  as const 추가

*  diff payload로 받아옴
   saf action -> action의 모양새를 통일 시킴으로서 코드 작성용이
   payload: diff;

*  ReturnType -> utill type
   특정함수의 return 값을 받아 올 수 있음
   함수의 결과물의 type을 받아올 수 있기 때문에 좋음

```typescript
type CounterAction =
   | ReturnType<typeof increase>
   | ReturnType<typeof decrease>
   | ReturnType<typeof increaseBy>;
```

-  reducer를 만들 때는 return type을 설정해줘야 한다.

*  결과물에 대한 type도 설정해주는 것 잊지 말기

### Redux를 사용한 todo 리스트 만들기

1. todo module 생성
   action 만들 때 as const 추가하는 것 잊지 말기
1. action 만들어주기
   전달받는 payload 값 type 설정해주는 것 잊지 말기
1.

-  css Style 바로 적용하는 법

아래와 같이 CSSProperties를 적용하여서 바로 불러올 수 있다.

```typescript
const textStyle: React.CSSProperties = {
   textDecoration: todo.done ? "line-through" : "none",
};
const removeStyle: CSSProperties = {
   color: "red",
   marginLeft: 8,
};
```

-  container 에서는 따로 Props를 type으로 설정할 필요가 없다.

### TypeSafeActions 리팩토링

yarn add typesafe-actions

-  createAction을 통해서 action 생성

```typescript
export const increase = () => createAction(INCREASE);
export const decrease = () => createAction(DECREASE);
export const increaseBy = () => createAction(INCREASE_BY)<number>();
```

-  payload 값이 존재 한다면 Generic을 통한 생성

```typescript
export const increaseBy = () => createAction(INCREASE_BY)<number>();
```

-  type Action ReturnType 최적화
   1. const actions를 통해 만든 액션들 넣어줌
   1. ```typescript
      type CounterAction = ActionType<typeof actions>;
      ```
   1.

```typescript
// 액션 type 선언
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

// 액션 생성함수를 선언합니다
export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>(); // payload 타입을 Generics 로 설정해주세요.

// 액션 객체 타입 준비
const actions = { increase, decrease, increaseBy }; // 모든 액션 생성함수들을 actions 객체에 넣습니다
type CounterAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해줄 수 있습니다

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type CounterState = {
   count: number;
};

// 초기상태를 선언합니다.
const initialState: CounterState = {
   count: 0,
};

// 리듀서를 만듭니다
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수입니다.
// Generics로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리 할 모든 액션 객체들의 타입을 넣어야합니다
const counter = createReducer<CounterState, CounterAction>(initialState, {
   [INCREASE]: (state) => ({ count: state.count + 1 }), // 액션을 참조 할 필요 없으면 파라미터로 state 만 받아와도 됩니다
   [DECREASE]: (state) => ({ count: state.count - 1 }),
   [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }), // 액션의 타입을 유추 할 수 있습니다.
});

export default counter;
```
