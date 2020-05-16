import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_REGISTER_PARAMS,
} from './Constants';

const initialState = {
  hasSuccess: false,
  successMessage: '',
  hasError: false,
  errorMessage: '',
  user: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        hasSuccess: true,
        successMessage: action.data.message,
        hasError: false,
        errorMessage: ''
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.data.message
      }
    case RESET_REGISTER_PARAMS:
      return initialState
    default:
      return state
  }
}
