const INITIAL_STATE = {
    preferredCurrency: '',
    ratesRON: {},
    ratesUSD: {},
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENCY':
            return {
                ...state,
                preferredCurrency: action.payload
            }
        case 'GET_RATES_RON':
            return {
                ...state,
                ratesRON: action.payload
            }
        case 'GET_RATES_USD':
            return {
                ...state,
                ratesUSD: action.payload
            }
        default:
            return state;
    }
}