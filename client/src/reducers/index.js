import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import logsReducer from './logsReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    userData: logsReducer
});