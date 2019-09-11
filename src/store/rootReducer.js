import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  root: (state = [], action) => state
});
export default rootReducer;
