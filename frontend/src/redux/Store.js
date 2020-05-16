import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './Reducers'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export { store }
