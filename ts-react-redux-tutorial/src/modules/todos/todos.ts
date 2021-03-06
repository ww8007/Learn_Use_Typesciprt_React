import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
   id: number;
   check: boolean;
   text: string;
};

export type TodosState = Todo[];
let nextId = 1;
const initialState: TodosState = [];

export const todosSlice = createSlice({
   name: "todos",
   initialState,
   reducers: {
      addTodo: (state, action: PayloadAction<string>) => {
         state.push({ id: nextId++, check: false, text: action.payload });
         console.log(state);
      },
      removeTodo: (state, action: PayloadAction<number>) => {
         const todo = state.findIndex((todo) => todo.id === action.payload);
         state.splice(todo, 1);
      },
      toggleTodo: (state, action: PayloadAction<number>) => {
         const todo = state.find((todo) => todo.id === action.payload);
         if (todo) {
            todo.check = !todo.check;
         }
      },
   },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
