import { INCREMENT, DECREMENT } from "../actions/testActions";

const testReducer = (state = { value: 0 }, { type, payload }) => {
     switch (type) {
        case INCREMENT:
            return {...state, value: state.value + 1};
        case DECREMENT:
            return {...state, value: state.value - 1};
        default:
            return {...state};
    }
};

export default testReducer;