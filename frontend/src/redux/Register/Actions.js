import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_REGISTER_PARAMS,
} from './Constants';
import Api from '../../helpers/ApiHandler';

const api = new Api();

export const handleRegisterRequestAction = (payload) => dispatch => {
  api.post('user/register', { data: payload })
    .then((result) => {
      dispatch({
        type: REGISTER_SUCCESS,
        data: {
          message: result.message
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: REGISTER_FAILURE,
        data: {
          message: 'Something went wrong'
        }
      })
    });
}

export const resetRegisterParamsAction = () => dispatch => {
  dispatch({
    type: RESET_REGISTER_PARAMS
  })
}