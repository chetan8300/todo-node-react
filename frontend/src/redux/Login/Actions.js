import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  RESET_LOGIN_PARAMS,
} from './Constants';

import Api from '../../helpers/ApiHandler';

const api = new Api();

export const handleLoginRequestAction = (payload) => dispatch => {
  api.post('user/login', { data: payload })
    .then((result) => {
      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          user: {
            id: result.id,
            email: result.email
          },
          token: result.accessToken
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: LOGIN_FAILURE,
        data: {
          errorMessage: err.validationErrors ? err.validationErrors[0].message : err.data ? err.data.message || '' : ''
        }
      })
    });
}

export const handleLogoutRequestAction = () => dispatch => {
  dispatch({
    type: LOGOUT_REQUEST
  })
}

export const resetLoginParamsAction = () => dispatch => {
  dispatch({
    type: RESET_LOGIN_PARAMS
  })
}