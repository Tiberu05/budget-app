import history from '../history';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isSignedIn: null,
    isLoading: false,
    user: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isSignedIn: true,
                isLoading: false,
                user: action.payload
            }
        case 'LOGIN_SUCCES':
        case 'REGISTER_SUCCES':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isSignedIn: true,
                isLoading: false,
            }
        case "PASSWORD_CHANGE_SUCCES":
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isSignedIn: true,
                isLoading: false
            }
        case "PASSWORD_CHANGE_FAIL":
            return {
                ...state,
            }
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCES':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isSignedIn: false,
                isLoading: false,
                user: {}
            }
        // case 'SIGN_IN':
        //      return { ...state, isSignedIn: true, userID: action.payload.userID, username: action.payload.username };
        // case 'SIGN_OUT': 
        //     return { ...state, isSignedIn: false, userID: null, username: null };
        default:
            return state;
    }
}