import { createSlice } from '@reduxjs/toolkit';
import { tasksAPI } from '../../../utils';

const initialState = {
  tasksAuthor: [],
  tasks: [],
};

const TasksAuthorSlice = createSlice({
  name: 'tasksAuthor',
  initialState,
  reducers: {
    authorReducer(state, action) {
      /* eslint-disable no-param-reassign */
      state.tasksAuthor = action.payload.tasksAuthor;
      state.tasks = action.payload.tasks;
    },
  },
});

export const tasksAuthorReducer = TasksAuthorSlice.reducer;

export const { authorReducer } = TasksAuthorSlice.actions;

export const getTasksAuthor = (author) => async (dispatch) => {
  const tasks = await tasksAPI.getTasks();
  const tasksAuthor = tasks.filter((task) => task.author === author);

  dispatch(authorReducer({ tasksAuthor, tasks }));
};
