import {
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  RESET_CHANGE_PASSWORD_PARAMS,
} from './Constants';
import Api from '../../helpers/ApiHandler';

const api = new Api();

export const setNewPasswordAction = (payload) => dispatch => {
  api.post(`user/change-password`, { data: payload })
    .then((result) => {
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        data: {
          message: result.msg
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: PASSWORD_CHANGE_FAILURE,
        data: {
          errorMessage: err.validationErrors ? err.validationErrors[0].message : err.data ? err.data.message || '' : ''
        }
      })
    });
}

export const resetChangePasswordParamsAction = () => dispatch => {
  dispatch({
    type: RESET_CHANGE_PASSWORD_PARAMS
  })
}