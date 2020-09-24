import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import logsReducer from './logsReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    userData: logsReducer,
    filters: filtersReducer
});