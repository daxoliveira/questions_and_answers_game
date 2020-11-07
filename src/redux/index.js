import { createStore } from 'redux'
import dbQuestions from '../db.json'

//Action creators
export function shuffleQuestions() {
  return {
    type: "SHUFFLE_QUESTIONS",
  }
}

// export function displaySingleQuestion() {
//   return {
//     type: "DISPLAY_SINGLE_QUESTION"
//   }
// }

// export function displayQuestionAnswers() {
//   return {
//     type: "DISPLAY_QUESTION_ANSWERS"
//   }
// }

//Initial State
const initialState = {
  questions: dbQuestions
}

//Reducer
function reducer(state = initialState, action) {
  switch(action.type) {

    case "SHUFFLE_QUESTIONS": {
        const shuffle = (ar) => {
          //fisher-yates shuffle
          let shuffledAr = [...ar];
          let i = ar.length -1
          while(i > 0) {
            let swap = Math.floor(Math.random() * i);
            let tmp = shuffledAr[swap]
            shuffledAr[swap] = shuffledAr[i]
            shuffledAr[i] = tmp
            i--
          }
          return shuffledAr
        }
        const questionsShuffled = shuffle(state.questions)
        return {
        ...state,
        questions: questionsShuffled,
        answers: state.questions.answer

        }
    }
    default:
      return state
  }
}

//Store
const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store

store.dispatch(shuffleQuestions())
