import {
  RESET_DASHBOARD,
  LOAD_TODOS,
  LOAD_TODOS_ERROR,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './Constants';

import { ADDED_NOTIFICATION } from "./../Notification/Constants";
import Api from './../../helpers/ApiHandler';
const api = new Api();

export const fetchAllTodosAction = () => dispatch => {
  api.get('todo')
    .then((result) => {
      dispatch({
        type: LOAD_TODOS,
        data: result,
      })
    })
    .catch((err) => {
      console.log('err', err);
    });
}

export const addTodoAction = (payload) => dispatch => {
  api.post('todo', { data: payload })
    .then((result) => {
      dispatch({
        type: ADD_TODO,
        data: result.data
      })
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'success',
          message: 'Todo added successfully',
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: LOAD_TODOS_ERROR
      })
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'error',
          message: err.validationErrors ? err.validationErrors[0].message : err.data ? err.data.message || '' : ''
        }
      })
    });
}

export const updateTodoAction = (payload) => dispatch => {
  api.put('todo', { data: payload })
    .then((result) => {
      dispatch({
        type: UPDATE_TODO,
        data: result.data,
        id: payload.id
      })
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'success',
          message: 'Todo updated successfully',
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'error',
          message: err.validationErrors ? err.validationErrors[0].message : err.data ? err.data.message || '' : ''
        }
      })
    });
}

export const deleteTodoAction = (payload) => dispatch => {
  api.delete(`todo`, { data: payload })
    .then((result) => {
      dispatch({
        type: DELETE_TODO,
        id: payload.id
      })
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'success',
          message: 'Todo deleted successfully',
        }
      })
    })
    .catch((err) => {
      console.log('err', err);
      dispatch({
        type: ADDED_NOTIFICATION,
        data: {
          type: 'error',
          message: err.validationErrors ? err.validationErrors[0].message : err.data ? err.data.message || '' : ''
        }
      })
    });
}

export const resetDashboardAction = () => dispatch => {
  dispatch({
    type: RESET_DASHBOARD
  })
}