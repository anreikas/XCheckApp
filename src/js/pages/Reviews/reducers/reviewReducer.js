/* eslint-disable no-unused-vars */
<<<<<<< HEAD
import { ADD_REVIEW, DELETE_REVIEW, FILTER, SET_STATE} from '../actions/types';

const initialState = [
  // {
  //   key: '1',
  //   name: 'Mike',
  //   age: 32,
  //   address: '10 Downing Street',
  //   tags: ['cool', 'teacher'],
  // },
  // {
  //   key: '2',
  //   name: 'John',
  //   age: 42,
  //   address: '10 Downing Street',
  //   tags: ['loser'],
  // },
];
export default (state = initialState, action) => {
  const { data } = action;

  console.log('@ : action ', action);
  switch (action.type) {
    case SET_STATE:
      return data;
    case ADD_REVIEW:
      return [...state, action.data];
    case FILTER:
      return [...state];
    case DELETE_REVIEW:
      return state.filter((el) => el.key !== data.key);
=======
import { ADD_REVIEW, DELETE_REVIEW } from '../actions/types';

const initialState = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tags: ['cool', 'teacher'],
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tags: ['loser'],
  },
];
export default (state = initialState, action) => {
  const { data } = action;

  console.log('@ : action ', action);
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, ...action.data];
    case DELETE_REVIEW:
      return state.filter((el) => el.key !== data.key);
    default:
      return state;
  }
};
