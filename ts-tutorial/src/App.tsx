import React from "react";
import Counter from "./Counter";
import MyForm from "./MyForm";
import ReducerSample from "./ReducerSample";
import { SampleProvider } from "./SampleContext";

function App() {
  // const onSubmit = (form: { name: string; description: string }) => {
  //   console.log(form);
  // };
  // return <MyForm onSubmit={onSubmit}></MyForm>;
  return (
    <SampleProvider>
      <ReducerSample></ReducerSample>
    </SampleProvider>
  );
}

export default App;
