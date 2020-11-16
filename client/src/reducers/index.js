import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import logsReducer from './logsReducer';
import filtersReducer from './filtersReducer';
import exchangeReducer from './exchangeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    userData: logsReducer,
    filters: filtersReducer,
    exchange: exchangeReducer,
});

export default rootReducer;
