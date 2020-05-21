import testReducer from './testReducer'
import { combineReducers } from "redux";
import authReducer from './authReducer';

const rootReducer = combineReducers({
  testing: testReducer,
  auth: authReducer
});

export default rootReducer;
