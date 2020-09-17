/* eslint-disable no-unused-vars */
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
