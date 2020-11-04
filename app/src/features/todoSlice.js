import { createSlice } from '@reduxjs/toolkit';

const nextTodoId = 0;

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        const { id, text } = action.payload;
        state.push({ id, text, completed: false });
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId + 1 } };
      },
    },
    toggleTodo(state, action) {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
