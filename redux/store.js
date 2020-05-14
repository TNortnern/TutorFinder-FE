import { createStore } from "redux";
import rootReducer from "./reducers/";
import { createWrapper} from "next-redux-wrapper";


const store = createStore(rootReducer);

const makeStore = context => {
  const store = createStore(rootReducer);
  return store;
};

export const wrapper = createWrapper (makeStore, { debug: true });
