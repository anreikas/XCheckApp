/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { tasksAPI } from '../../utils';

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
  const tasks = await tasksAPI.getTasks()
  .then(tasksData=> tasksData.filter(task => task.state === 'PUBLISHED'));
  dispatch(updateTasks({tasks}));
}
