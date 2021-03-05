# Learn_Use_Typesciprt_React

리엑트에서 타입 스크립트 사용해 보기

### 기본 설정

지금의 React 에서는 Typescript를 이용한 React 프로젝트 설정이 자동으로 지원이 됨
그러므로 명령어만 조금 다르게 설정 한다면 바로 설정 가능

> npx create-react-app ts-tutorial --template typescript

### 기본 확장자

tsx -> typeScript로 작성된 파일임을 명시

### tsx 사용하여 파일 생성

- 넘겨받는 props의 타입을 설정 할 수 있다.

### 화살표 함수를 이용한 React 파일의 장단점

- 장점

1. children props가 기본적으로 탑재 되어 있음
   기존의 js는 children이 기본적으로 내장이 되어있지 않기 때문에 설정을 해줘야 했어야함
2. defaultProps나 기본적인 부분을 Greetings와 같은 부분들을 . 연산자를 이용하여 바로 설정이 가능하다.

- 단점
  defaultProps를 설정하였다 하더라도 이를 ? 연산자를 사용하여서 작성을 해줘야 한다.
  지금 상태에서는 어떻게 변한지 모르겠지만 이때 까지는 ? 연산자를 사용하여야 함
  > 구글링의 결과로는 이를 해결한 방법은 없는 것 같음

* defaultProps가 제대로 작동하지 않음

> 해결 방법

    defaultProps를 props의 비구조 할당 부분에서 설정을 해준다면 문제가 되지 않게 돤다.
    이게 왜 문제가 되냐 하면 array의 경우 map을 사용하여야 하는데 이것이 undefined로 설정이 될 수 있으므로 map을 사용하지 못하는 경우가 생길 수 잇음
    이로써 props의 기본 인자로 defaultProps를 설정해주는 것이 중요하다.

- fuction으로 Props를 설정하게 된다면 이 문제는 생기지 않게 된다.

* ?를 사용하여서 변수를 설정한다면 && 연산자를 사용하여서 안에 설정이 가능하다.

### 함수를 type에 사용하기

이는 onClick 은 함수의 형태이지만 아무런 파라미터도 가져오지 않고 아무런 값도 return 하지 않음을 의미한다.

```typescript
type GreetingProps = {
  name: string;
  mark: string;
  optional?: string;
  onClick: (name: string) => void;
};
```

```typescript
function Greetings({ name, mark, optional, onClick }: GreetingProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

> React.FC

    장점
        children 값을 기본적으로 설정하지 않아도 바로 사용이 가능하다.
    단점
        defaultProps의 값이 제대로 동작하지 않는다.
        기본적으로 값을 설정한다고 하더라도 type이 String이나 undefined로 나타날 수 있음

> Fuction

    장점
        defaultProps의 값이 제대로 동작하게 된다.
    단점
        children 값을 설정하고 싶다면 children? : React.ReactNode로 설정을 해야 한다.

> 정리

    TypeScript를 사용하면 props가 빠진 부분에 대하여 바로 체크가 가능하기 때문에 좋다.

### 상태 관리 in TypeScript

- 간단한 Counter 만들기

useState의 부분의 오른쪽에 Genceric을 설정해도 되고 안해도 됨
-> 코딩 할 때의 편의성으로 가독성을 높혀줄 수는 있음

- 기본적인 코딩은 typeScript와 기본적 js와 별반 차이는 없음
  -> 한 가지 차이는 tsx가 확장자

### Props가 존재하는 예제

Params에 그냥 type을 안정하고 바로 객체 형식으로 선언이 가능하다.

- 일반적인 Pararms를 설정하여서 전달해주는 경우

```typescript
type Params = {
  name: string;
  description: string;
};

type MyFormProps = {
  onSumbit: (form: Params) => void;
};
```

- 객체로 바로 선언하는 경우

```typescript
type MyFormProps = {
  onSumbit: (form: { name: string; description: string }) => void;
};
```

- props를 사용한 경우 App.tsx에서 이것을 무조건 사용해 주어야 한다.
  우리가 작성한 코드에서 form에 대한 구조를 설정하고 사용하였기 때문에 이를 사용하여야 한다.

```typescript
import React from "react";
import MyForm from "./MyForm";

function App() {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit}></MyForm>;
}

export default App;
```

### useReducer를 사용한 상태 관리

Action을 type으로 정리 하여서 사용할 수 있다.
기존의 js로 작성하던 Action대한 부분을 자동완성으로 조금 더 편리하게 작성할 수 있는 것이 장점

```typescript
import React, { useReducer } from "react";

type Action = { type: "INCREASE" } | { type: "DECREASE" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      throw new Error("Unhandled error");
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => dispatch({ type: "INCREASE" });
  const onDecrease = () => dispatch({ type: "DECREASE" });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
```

### 좀 더 복잡한 reducer 사용하기

- State와 Action에 대한 것들을 먼저 정의 한다.

Color의 type을 지정하고 State 지정하기

```typescript
type Color = "red" | "orange" | "yellow";

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};
```

action 지정하기

```typescript
type Action =
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_TEXT"; text: string }
  | { type: "SET_COLOR"; color: Color }
  | { type: "TOGGLE_GOOD" };
```

- TypeScipt의 장점
  switch case 문을 작성할 때 case나 action.text 같은 실수를 방지 할 수 있다.

* boolean의 경우 화면에 출력 되지 않으므로 이를 true false로 출력을 시켜줘야 한다.

* state.을 사용하여서 내가 reducer로 설정한 state값을 출력 할 수 있다.

```typescript
import React, { useReducer } from "react";

type Color = "red" | "orange" | "yellow";

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_TEXT"; text: string }
  | { type: "SET_COLOR"; color: Color }
  | { type: "TOGGLE_GOOD" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNT":
      return {
        ...state,
        count: action.count,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "SET_COLOR":
      return {
        ...state,
        color: action.color,
      };
    case "TOGGLE_GOOD":
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error("Unhandled action type");
  }
}

function ReducerSample() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: "hello",
    color: "red",
    isGood: true,
  });

  const setCount = () => dispatch({ type: "SET_COUNT", count: 5 });
  const setText = () => dispatch({ type: "SET_TEXT", text: "bye" });
  const setColor = () => dispatch({ type: "SET_COLOR", color: "orange" });
  const toggleGood = () => dispatch({ type: "TOGGLE_GOOD" });

  return (
    <div>
      <p>
        <code>count: :</code> {state.count}
      </p>
      <p>
        <code>count: :</code> {state.text}
      </p>
      <p>
        <code>count: :</code> {state.color}
      </p>
      <p>
        <code>count: :</code> {state.isGood ? "true" : "false"}
      </p>
      <div>
        <button onClick={setCount}>SET_COUNT</button>
        <button onClick={setText}>SET_TEXT</button>
        <button onClick={setColor}>SET_COLOR</button>
        <button onClick={toggleGood}>TOGGLE_GGOD</button>
      </div>
    </div>
  );
}

export default ReducerSample;
```
