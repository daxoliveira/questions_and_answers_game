import { createStore } from 'redux'

//Action creators
export function increment() {
  return {
    type: "INCREMENT"
  }
}

export function decrement() {
  return {
    type: "DECREMENT"
  }
}

//Reducer
function reducer(count = 0, action) {
  switch(action.type) {
    case "INCREMENT":
      return count + 1
    case "DECREMENT":
      return count - 1
    default:
      return count
  }
}

//Store
const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store
 