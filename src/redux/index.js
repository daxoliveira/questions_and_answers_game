import { createStore } from 'redux'
import dbQuestions from '../db.json'
//Action creators
export function showNameForm() {
  return {
    type: "SHOW_NAME_FORM"
  }
}
export function playerNameInput(keyboardHits) {
  return {
    type: "PLAYER_NAME_INPUT",
    payload: keyboardHits
  }
}
export function hideNameForm() {
  return {
    type: "HIDE_NAME_FORM"
  }
}
export function startGame() {
  return {
    type: "START_GAME"
  }
}
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
export function restartGame() {
  return {
    type: "RESTART_GAME"
  }
}
export function resetGame() {
  return {
    type: "RESET_GAME"
  }
}
//Initial State
const initialState = {
  nameFormDisplayed: false,
  playerName: "",
  questions: dbQuestions,
  index: 0,
  correct: false,
  correctCount: 0,
  incorrect: false
}
//Reducer
function reducer(state = initialState, action) {
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
  switch(action.type) {
    case "SHOW_NAME_FORM": {
      return {
        ...state,
        nameFormDisplayed: true
      }
    }
    case "HIDE_NAME_FORM": {
      return {
        ...state,
        nameFormDisplayed: false
      }
    }
    case "PLAYER_NAME_INPUT": {
      return {
        ...state,
        playerName: action.payload
      }
    }
    case "START_GAME": {
      return {
        ...state,
        questions: shuffle(state.questions),
        index: 0,
        correct: false,
        correctCount: 0,
        incorrect: false
      }
    }
    case "SHUFFLE_QUESTIONS": {
        // const questionsShuffled = shuffle(state.questions)
        return {
        ...state,
        questions: shuffle(state.questions)
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
    case "RESTART_GAME": {
      return {
        ...state,
        questions: shuffle(state.questions),
        index: 0,
        correct: false,
        correctCount: 0,
        incorrect: false
      }
    }
    case "RESET_GAME": {
      return {
        ...state,
        playerName: "",
        questions: shuffle(state.questions),
        index: 0,
        correct: false,
        correctCount: 0,
        incorrect: false
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
