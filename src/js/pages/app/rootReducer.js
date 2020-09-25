import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import { tasksReducer } from '../Tasks/TasksReducer';
import { tasksAuthorReducer } from '../Main/MainAuthor/MainAuthorReducer';

const rootReducer = combineReducers({
  appReducer,
  tasksReducer,
  tasksAuthorReducer
});

export default rootReducer;
