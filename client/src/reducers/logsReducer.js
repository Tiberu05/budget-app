const INITIAL_STATE = {
    isLoading: false,
    totalIncome: null,
    totalExpense: null,
    budget: null,
    dataError: '',
    logs: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "DATA_LOADING":
            return { ...state, isLoading: true}
        case "GET_DATA_SUCCES":
            return action.payload;
        case "GET_DATA_FAILURE":
            return { ...state, dataError: 'There was a problem getting the data', isLoading: false }
        default:
            return state;
    }
};