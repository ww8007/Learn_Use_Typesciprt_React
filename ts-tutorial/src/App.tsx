import React from "react";
import MyForm from "./MyForm";

function App() {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit}></MyForm>;
}

export default App;
