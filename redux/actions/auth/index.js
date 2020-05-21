import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_USER,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  REGISTER_FAIL,
} from "./constants";

export const register = (result) => {
  if (result.errors) {
    return {
      type: AUTH_ERROR,
      payload: { id: "register", message: result.errors },
    };
  }
  return {
    type: REGISTER_SUCCESS,
    payload: result.success,
  };
};
export const login = (result) => {
  console.log(result)
  if (result.errors) {
    return {
      type: AUTH_ERROR,
      payload: { id: "login", message: result.errors },
    };
  }
  return {
    type: LOGIN_SUCCESS,
    payload: result.success,
  };
};
