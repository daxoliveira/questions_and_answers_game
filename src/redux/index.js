import { createStore } from 'redux'
import dbQuestions from '../db.json'

//Action creators
export function shuffleQuestions() {
  return {
    type: "SHUFFLE_QUESTIONS",
  }
}

export function correctAnswer() {
  return {
    type: "CORRECT_ANSWER"
  }
}

export function incorrectAnswer() {
  return {
    type: "INCORRECT_ANSWER"
  }
}

export function nextQuestion() {
  return {
    type: "NEXT_QUESTION"
  }
}

//Initial State
const initialState = {
  questions: dbQuestions,
  index: 0,
  correct: false,
  correctCount: 0,
  incorrect: false
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
        questions: questionsShuffled
        }
    }
    case "CORRECT_ANSWER": {
      return {
        ...state,
        correct: true,
        correctCount: state.correctCount + 1
      }
    }
    case "INCORRECT_ANSWER": {
      return {
        ...state,
        incorrect: true
      }
    }
    case "NEXT_QUESTION": {
      return {
        ...state,
        index: state.index + 1,
        correct: false
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
