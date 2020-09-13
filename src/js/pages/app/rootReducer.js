import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';
import reviewReducer from '../Reviews/reducers/reviewReducer';

const rootReducer = combineReducers({
  appReducer,
  reviewReducer,
});

export default rootReducer;
