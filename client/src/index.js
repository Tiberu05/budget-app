import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App';
import reducers from './reducers';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
const store = createStore(
    reducers, 
    /* preloadedState, */ 
    composeEnhancers(
    applyMiddleware(ReduxThunk)
));




ReactDOM.render(
        <Provider store={store}>
                <App />
        </Provider>,
    document.querySelector('#root')
)