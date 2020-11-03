import { SHUFFLE_QUESTIONS } from './types';

const questionActions = () => dispatch => {
  fetch('../db.json')
    .then(res => res.json())
    .then(questions => 
      dispatch({
        type: SHUFFLE_QUESTIONS,
        payload: questions
      }))
}
  
export default questionActions;