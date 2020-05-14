import testReducer from './testReducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  testing: testReducer,
});

export default rootReducer;
