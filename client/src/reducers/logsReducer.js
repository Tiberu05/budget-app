const INITIAL_STATE = {
    isLoading: false,
    totalIncome: null,
    totalExpense: null,
    budget: null,
    logs: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "DATA_LOADING":
            return { ...state, isLoading: true}
        case "GET_DATA":
            return action.payload;
        default:
            return state;
    }
};