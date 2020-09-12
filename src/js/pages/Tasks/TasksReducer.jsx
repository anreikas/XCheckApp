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

export const getTasks = () => (dispatch) => {
  const tasks = [{
    id: "simple-task-v1",
    author: "cardamo",
    state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
    categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    items: [
      {
        id: "basic_p1",
        minScore: 0,
        maxScore: 20,
        category: "Basic Scope",
        title: "Basic things",
        description: "You need to make things right, not wrong"
      },
      {
        id: "extra_p1",
        minScore: 0,
        maxScore: 30,
        category: "Extra Scope",
        title: "More awesome things",
        description: "Be creative and make up some more awesome things"
      },
      {
        id: "fines_p1",
        minScore: -10,
        maxScore: 0,
        category: "Fines",
        title: "App crashes",
        description: "App causes BSoD!"
      }
    ]
  },
  {
    id: "simple-task-v2",
    author: "karway",
    state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
    categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    items: [
      {
        id: "basic_p1",
        minScore: 0,
        maxScore: 30,
        category: "Basic Scope",
        title: "Basic things",
        description: "You need to make things right, not wrong"
      },
      {
        id: "extra_p1",
        minScore: 0,
        maxScore: 30,
        category: "Extra Scope",
        title: "More awesome things",
        description: "Be creative and make up some more awesome things"
      },
      {
        id: "fines_p1",
        minScore: -10,
        maxScore: 0,
        category: "Fines",
        title: "App crashes",
        description: "App causes BSoD!"
      }
    ]
  }];
  dispatch(updateTasks({tasks}))
}