import {
  RESET_DASHBOARD,
  LOAD_TODOS,
  LOAD_TODOS_ERROR,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './Constants';

const initialState = {
  isLoading: true,
  todos: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        isLoading: false,
        todos: action.data,
      }
    case LOAD_TODOS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case ADD_TODO:
      return {
        ...state,
        isLoading: false,
        todos: [action.data, ...state.todos]
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(x => {
          if(x.id === action.id) {
            return action.data
          }
          return x;
        })
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(x => x.id !== action.id)
      }
    case RESET_DASHBOARD:
      return initialState;
    default:
      return state;
  }
}