import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  RESET_LOGIN_PARAMS,
} from './Constants';
import { hasToken, deleteSession, persistSession, getUserData } from './../../helpers/session';

const initialState = {
  isFetching: true,
  isAuthenticated: hasToken(),
  hasError: false,
  errorMessage: '',
  user: getUserData()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      persistSession(action.data.token);
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.data.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        hasError: true,
        ...action.data,
      };
    case LOGOUT_REQUEST:
      deleteSession();
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: undefined,
      };
    case RESET_LOGIN_PARAMS:
      return initialState
    default:
      return state;
  }
}