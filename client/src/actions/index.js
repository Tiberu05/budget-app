import axios from 'axios';
import { getDefaultLocale } from 'react-datepicker';
import history from '../history';


// export const getData = email => dispatch => {
//     axios.get(`http://localhost:5000/logs/${email}`)
//         .then(res => dispatch({
//             type: "GET_DATA",
//             payload: res.data,
//         }))
//         .catch(err => console.log(err))
// }

export const getData = (email, type='', date='', month='') => dispatch => {
    axios.get(`http://localhost:5000/logs/${email}?type=${type}&date=${date}&monthfilter=${month}`)
        .then(res => dispatch({
            type: "GET_DATA",
            payload: res.data,
        }))
        .catch(err => console.log(err))
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
        .then(res => dispatch({ 
            type: 'USER_LOADED',
            payload: res.data
        }))
        .catch(err => {
            console.log(err);
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: 'AUTH_ERROR'})
        })
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

export const filterByDate = (date) => {
    return {
        type: "FILTER_DATE",
        payload: date
    }
};

export const filterByType = (filtertype) => {
    return {
        type: "FILTER_TYPE",
        payload: filtertype
    }
};

const noFilters = () => {
    return { type: "NO_FILTERS"};
}