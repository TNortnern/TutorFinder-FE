//Action Types
export const INCREMENT = "INCREMENT_COUNTER";
export const DECREMENT = "DECREMENT_COUNTER";

//Action Creator
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
