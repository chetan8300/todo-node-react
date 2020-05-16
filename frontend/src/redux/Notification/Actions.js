import {
  ADDED_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './Constants';

export const sendNotificationAction = (type, message) => dispatch => {
  dispatch({
    type: ADDED_NOTIFICATION,
    data: {
      type,
      message,
    },
  })
}

export const changeFlagAction = () => dispatch => {
  dispatch({
    type: REMOVE_NOTIFICATION
  })
}
