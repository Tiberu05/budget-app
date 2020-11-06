import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import logsReducer from './logsReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    userData: logsReducer,
    filters: filtersReducer
});

export default rootReducer;
