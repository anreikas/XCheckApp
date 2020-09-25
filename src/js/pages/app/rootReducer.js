import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import { tasksReducer } from '../Tasks/TasksReducer';

const rootReducer = combineReducers({
  appReducer,
  tasksReducer
});

export default rootReducer;
