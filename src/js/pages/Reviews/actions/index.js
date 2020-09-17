import { ADD_REVIEW, DELETE_REVIEW } from './types';

// const initialState = [];
// const REVIEW_TEMPLATE = {
//   id: 'rev-id-1',
//   requestId: 'rev-req-1',
//   author: 'ButterBrot777',
//   state: 'DISPUTED', // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
//   grade: { },
// };

const generateId = () => `review-${Date.now()}`;

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review: {
    id: generateId(),
    ...review,
  },
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  data: review,
});
