import React, { useState } from "react";

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 여기도 모르니까 any 로 하겠습니다.
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={onChange} name="name"></input>
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
