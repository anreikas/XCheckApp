/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: null
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTasks(state, action) {
      state.tasks = action.payload.tasks
    }
  },
});

export const tasksReducer = TasksSlice.reducer;

export const { updateTasks } = TasksSlice.actions;

export const getTasks = () => async (dispatch) => {
  const response = await fetch('https://x-check.herokuapp.com/tasks');
  const tasks = await response.json();
  dispatch(updateTasks({tasks}))
}
