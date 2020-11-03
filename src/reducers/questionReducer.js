import { SHUFFLE_QUESTIONS } from '../actions/types';

const initialState = {
  questions: [],
}

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case SHUFFLE_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      }
    default:
      return state;
  }
}