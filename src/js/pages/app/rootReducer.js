import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import { tasksReducer } from '../Tasks/TasksReducer';
import reviewReducer from '../Reviews/reducers/reviewReducer';

const rootReducer = combineReducers({
  appReducer,
  tasksReducer,
  reviewReducer,
});

export default rootReducer;
