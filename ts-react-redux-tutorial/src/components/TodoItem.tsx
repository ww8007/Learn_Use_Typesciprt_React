import React from "react";
import { Todo } from "../modules/todos/todos";

type TodoItemProps = {
   todo: Todo;
   onToggle: (id: number) => void;
   onRemove: (id: number) => void;
};

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
   const handleToggle = () => onToggle(todo.id);
   const handleRemove = () => onRemove(todo.id);

   const textStyle: React.CSSProperties = {
      textDecoration: todo.check ? "line-through" : "none",
   };
   const removeStyle: React.CSSProperties = {
      color: "red",
      marginLeft: 8,
   };
   return (
      <li>
         <span onClick={handleToggle} style={textStyle}>
            {todo.text}
         </span>
         <span onClick={handleRemove} style={removeStyle}>
            (x)
         </span>
      </li>
   );
}

export default TodoItem;
