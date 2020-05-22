import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_USER,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../actions/auth/constants";
const initialState = {
  user: null,
  token: null,
  errors: [],
  loading: false,
  isAuthenticated: false
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
        errors: [],
        isAuthenticated: true,
      };
    case GET_USER:
      return {
        ...state,
        loading: false,
        user: payload,
        errors: [],
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      console.log('happened')
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        token: null,
        errors: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
};

export default authReducer;
