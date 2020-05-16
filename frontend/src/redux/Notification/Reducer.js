import {
  ADDED_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './Constants';

const initialState = {
  type: '',
  message: '',
  isNew: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDED_NOTIFICATION:
      return {
        ...action.data,
        isNew: true,
      }
    case REMOVE_NOTIFICATION:
      return initialState;
    default:
      return state
  }
}