import Axios from 'axios';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { logIn } from '../actions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import history from '../history';

import axios from 'axios';

const LoginForm = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const wrongCredentials = () => {
        if (error) {
            return (
                <div>
                    <p className='exercise-form-container red-color-text'>Your credentials are incorrect</p>
                </div>
            )
        }

    };


    const onSubmit = e => {
        e.preventDefault();

        props.logIn(email, password);

        setTimeout(() => {
            window.location = '/';
        }, 500)


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
            {wrongCredentials()}
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps, { logIn }) (LoginForm);