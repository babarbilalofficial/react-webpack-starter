import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducer';
let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // let loggerMiddleware = require('redux-logger');
  // middleware = [...middleware, loggerMiddleware.createLogger()];
}

const composeEnhancers = (module.hot && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : compose;

const configureStore = (predefinedState) => {
  return createStore(
    rootReducer,
    predefinedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );
};

export default configureStore;
