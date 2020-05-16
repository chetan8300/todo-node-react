import {
  PASSWORD_CHANGE_FAILURE,
  RESET_CHANGE_PASSWORD_PARAMS,
  PASSWORD_CHANGE_SUCCESS,
} from './Constants';

const initialState = {
  isLoading: false,
  isTokenVerified: true,
  hasError: false,
  hasSuccess: false,
  successMessage: '',
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.data.message,
        hasSuccess: false,
        successMessage: '',
        isLoading: false,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        hasSuccess: true
      }
    case RESET_CHANGE_PASSWORD_PARAMS:
      return initialState;
    default:
      return state;
  }
}