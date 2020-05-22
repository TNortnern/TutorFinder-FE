import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/";
import { createWrapper} from "next-redux-wrapper";


const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const makeStore = context => {
  const store = createStore(rootReducer, composeEnhancers());
  return store;
};

export const wrapper = createWrapper (makeStore, { debug: true });
