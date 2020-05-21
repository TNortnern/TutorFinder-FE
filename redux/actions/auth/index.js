import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_USER,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  REGISTER_FAIL,
  CLEAR_ERRORS
} from "./constants";

export const register = (result) => {
  if (result.errors) {
    return {
      type: AUTH_ERROR,
      payload: { id: "register", items: result.errors },
    };
  }
  return {
    type: REGISTER_SUCCESS,
    payload: result.success,
  };
};
export const login = (result) => {
  // temporary error display
  if (result.errors.includes("GraphQL error:")) {
    result.errors = result.errors.split(":")[1]
  }
  if (result.errors) {
    return {
      type: AUTH_ERROR,
      payload: { id: "login", items: [result.errors] },
    };
  }
  return {
    type: LOGIN_SUCCESS,
    payload: result.success,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: []
  }
}
