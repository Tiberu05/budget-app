import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn, clearErrors } from '../../actions';

import './LoginForm.css';

import FormInput from '../FormInput';

import 'react-datepicker/dist/react-datepicker.css';


const LoginForm = props => {

    const { isSignedIn, history, clearErrors } = props

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (isSignedIn) history.push('/');
    }, [isSignedIn, history])


    useEffect(() => {
        return () => {
            clearErrors();
        }
    }, [clearErrors])


    const onChange = (e, type) => {
        if (type === 'email') setEmail(e.target.value);
        if (type === 'password') setPassword(e.target.value);
    }


    const onSubmit = e => {
        e.preventDefault();

        props.logIn(email, password); 
        
    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Login</h2>
            <form className='exercise-form' onSubmit={onSubmit} >

                <FormInput type='email' value={email} onChange={onChange} />

                <FormInput type='password' value={password} onChange={onChange} />

                <br />
                <button className='btn btn-secondary' type='submit'>Login</button>
                <Link to='/resetpassword'>
                    <div className="forgot-password">Forgot password?</div>
                </Link>

                {
                    !props.errorMsg ? null : (
                        props.errorMsg.msg === "Authorization denied" ? null : (
                            <p className='exercise-form-container red-color-text'>{props.errorMsg.msg}</p>
                        )
                    )    
                }
                
            </form>
            
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