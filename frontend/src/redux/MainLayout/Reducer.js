import {
  SET_HEADER_NAME,
} from './Constants';

const initialState = {
  name: 'Dashboard',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER_NAME:
      return {
        ...state,
        name: action.data
      }
    default:
      return state
  }
}