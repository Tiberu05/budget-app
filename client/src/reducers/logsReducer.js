const INITIAL_STATE = {
    
    totalIncome: null,
    totalExpense: null,
    budget: null,
    logs: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "GET_DATA":
            return action.payload;
        default:
            return state;
    }
};