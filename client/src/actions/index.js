import axios from 'axios';
import { sortLogs } from './utility';




export const getData = (email, type='', date='', month='') => dispatch => {

    dispatch({ type: "DATA_LOADING" });

    axios.get(`http://localhost:5000/logs/${email}?type=${type}&date=${date}&monthfilter=${month}`)
        .then(res => dispatch({
            type: "GET_DATA_SUCCES",
            payload: res.data,
        }))
        .catch(err => dispatch({type: "GET_DATA_FAILURE"}))
}

//
// ERROR actions
//

export const returnErrors = (msg, status, id = null) => {
    return {
        type: 'GET_ERRORS',
        payload: {
            msg,
            status,
            id
        }
    };
};

export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS'
    };
};


// AUTH actions

// Check user and load user
export const loadUser = () => (dispatch, getState) => {
    
    // User loading
    dispatch({ type: 'USER_LOADING' });


    axios.get('http://localhost:5000/users/user', tokenConfig(getState))
        .then(res => {
            dispatch({ type: 'USER_LOADED', payload: res.data});
            console.log(res.data);
            dispatch({ type: 'SET_CURRENCY', payload: res.data.preferredCurrency})
            dispatch(getRatesRON());
            dispatch(getRatesUSD());
            //dispatch(getData(res.data.email));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'AUTH_ERROR'})
        })
}


export const setCurrency = (email, currency) => dispatch => {

    const config = {
        email,
        currency
    }

    axios.post('http://localhost:5000/users/changecurrency', config)
        .then(res => dispatch({ type: 'SET_CURRENCY', payload: res.data}))
        .catch(err => console.log(err))
};

export const getRatesRON = () => dispatch => {
    fetch(`https://api.exchangeratesapi.io/latest?base=RON`)
                .then((resp) => resp.json())
                .then((data) => dispatch({ type: 'GET_RATES_RON', payload: data.rates}))
                .catch(err => console.log(err))
}

export const getRatesUSD = () => dispatch => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
                .then((resp) => resp.json())
                .then((data) => dispatch({ type: 'GET_RATES_USD', payload: data.rates}))
                .catch(err => console.log(err))
}


export const createUser = (name, email, password) => dispatch => {

    const config = {
        name,
        email,
        password
    };

    axios.post('http://localhost:5000/users/add', config)
        .then(res => {
            clearErrors();
            dispatch({
               type: 'REGISTER_SUCCES',
               payload: res.data
           }) 
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'REGISTER_FAIL'})
        })
};

export const logIn = (email, password) => dispatch => {

    const config = {
        email,
        password
    };

    axios.post('http://localhost:5000/users/login', config, { header: { "Content-Type": "application/json" }})
        .then(res => {
            clearErrors();
            dispatch({
                type: 'LOGIN_SUCCES',
                payload: res.data
            })
            dispatch({ type: 'SET_CURRENCY', payload: res.data.user.preferredCurrency})

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'LOGIN_FAIL'})
        })
};

export const logOut = () => dispatch => {

    dispatch({ type: 'LOGOUT_SUCCES' });
}



export const tokenConfig = getState => {
        // Get token
        const token = getState().auth.token;

        // Headers
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };
    
        // If token, add to headers
        if (token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}



// FILTER ACTIONS

export const setFilters = (email) => dispatch => {
    
    axios.get(`http://localhost:5000/logs/${email}`)
        .then(res => dispatch({
            type: "SET_FILTERS",
            payload: {
                lastLog: sortLogs(res.data.logs)[0].date
            }
        }))
        .catch(err => console.log(err))
}

export const filterByType = (type) => {
    return {
        type: "SET_FILTER_BY_TYPE",
        payload: type
    }
};

export const filterByMonth = (month) => {
    return {
        type: "SET_FILTER_BY_MONTH",
        payload: month
    }
};

export const filterByDate = (date) => {
    return {
        type: "SET_FILTER_BY_DATE",
        payload: date
    }
};

export const clearFilters = () => {
    return {
        type: "CLEAR_FILTERS"
    }
}
