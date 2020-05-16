import { SET_HEADER_NAME } from './Constants';

export const setHeaderNameAction = (name) => dispatch => {
  dispatch({
    type: SET_HEADER_NAME,
    data: name
  })
}