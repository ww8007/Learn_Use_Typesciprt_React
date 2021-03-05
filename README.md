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
