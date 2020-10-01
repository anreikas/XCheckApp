import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import { tasksReducer } from '../Tasks/TasksReducer';
import reviewReducer from '../Reviews/reducers/reviewReducer';
import { tasksAuthorReducer } from '../Main/MainAuthor/MainAuthorReducer';

const rootReducer = combineReducers({
  appReducer,
  tasksReducer,
  reviewReducer,
  tasksAuthorReducer,
});

export default rootReducer;
