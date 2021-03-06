# 타입스크립트를 이용한 REDUX 사용

### 기본 설정

yarn add redux react-redux

어떤 라이브러리들은 typescript 지원 하는 것이 있고 안하는 것이 있음

- redux의 경우 node-module로 들어가보면
  index.d.ts 라는 파일이 존재
  이는 typeScript를 지원한다는 의미

* react-redux는 typeScript 지원을 안하고 있음
  yarn add @types/react-redux
  써드파티로 TypeScript로 지원을 받음

* TypeSearch로 찾아볼 수 있음
  [npm](https://www.npmjs.com/package/@types/react-redux)

* yarn add @types/react

### module 생성

기본적으로 js 파일 작성하듯이 작성하면 오류가 생길 수 있음
increase action을 만들 경우 string이 type으로 출력되게 되는데 이는 나중에 type을 볼 수 없게 됨

- as const 추가

* diff payload로 받아옴
  saf action -> action의 모양새를 통일 시킴으로서 코드 작성용이
  payload: diff;

* ReturnType -> utill type
  특정함수의 return 값을 받아 올 수 있음
  함수의 결과물의 type을 받아올 수 있기 때문에 좋음

```typescript
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
```

- reducer를 만들 때는 return type을 설정해줘야 한다.
