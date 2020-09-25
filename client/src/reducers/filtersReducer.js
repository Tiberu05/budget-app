const INITIAL_STATE = {
    date: '',
    type: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FILTER_DATE":
            return {
                ...state,
                date: action.payload
            };
        case "FILTER_TYPE":
            return {
                ...state,
                type: action.payload
            };
        case "NO_FILTERS":
            return {
                date: '',
                type: ''
            }
        default:
            return {
                date: '',
                type: ''
            }
    }
};