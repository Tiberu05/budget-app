import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { logIn, clearErrors } from '../actions';

import 'react-datepicker/dist/react-datepicker.css';


const LoginForm = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.isSignedIn) props.history.push('/');
    }, [props.isSignedIn])

    useEffect(() => {
        props.clearErrors()
    }, [])

    const wrongCredentials = () => {
        if (!props.errorMsg.msg) {
            return (
                <div>
                    <p className='exercise-form-container red-color-text'>{props.errorMsg.msg}</p>
                </div>
            )
        }

    };


    const onSubmit = e => {
        e.preventDefault();

        props.logIn(email, password); 
        
    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Login</h2>
            <form className='exercise-form' onSubmit={onSubmit} >

                <div className='form-group'>
                    <label for='email'>Email</label>
                    <input className='form-control' type='text' name='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='password'>Password</label>
                    <input className='form-control' type='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <br />
                <button className='btn btn-secondary' type='submit'>Login</button>
            </form>
            <p className='exercise-form-container red-color-text'>{props.errorMsg.msg}</p>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        errorMsg: state.error.msg
    }
}

export default connect(mapStateToProps, { logIn, clearErrors }) (LoginForm);