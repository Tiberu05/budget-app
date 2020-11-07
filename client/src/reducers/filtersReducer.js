const INITIAL_STATE = {
    filterByMonth: '',
    filterByDate: '',
    filterByType: '',
    lastLog: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_FILTERS":
            return { ...state, ...action.payload};
        case "SET_FILTER_BY_MONTH":
            return { ...state, filterByMonth: action.payload, filterByDate: '' };
        case "SET_FILTER_BY_DATE":
            return { ...state, filterByDate: action.payload, filterByMonth: '' };
        case "SET_FILTER_BY_TYPE":
            return { ...state, filterByType: action.payload };
        case "CLEAR_FILTERS":
            return { ...state, filterByType: '', filterByMonth: '', filterByDate: ''}
        default:
            return state;
    }
};