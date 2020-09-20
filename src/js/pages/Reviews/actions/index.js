import {
  ADD_REVIEW, DELETE_REVIEW, FILTER, SET_STATE,
} from './types';

// const initialState = [];
// const REVIEW_TEMPLATE = {
//   id: 'rev-id-1',
//   requestId: 'rev-req-1',
//   author: 'ButterBrot777',
//   state: 'DISPUTED', // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
//   grade: { },
// };

const generateId = () => `review-${Date.now()}`;

<<<<<<< HEAD

=======
>>>>>>> feat: loading
export const addReview = (data) => ({
  type: ADD_REVIEW,
  data: {
    id: generateId(),
    ...data,
  },
});

export const setState = (inData) => {
  const data = (Array.isArray(inData) ? inData : [inData]).map((el) => ({
    key: el.id,
    ...el,
  }));

  return {
    type: SET_STATE,
    data,
  };
};

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  data: review,
});

export const filter = (review) => ({
  type: FILTER,
  data: review,
});
