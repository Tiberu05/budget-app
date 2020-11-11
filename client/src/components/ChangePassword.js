import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

//import { changePassword } from '../actions';

const ChangePassword = (props) => {

    //const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');

    console.log(props);

    const onSubmit = e => {

        e.preventDefault();

        if (newPassword !== newPasswordCheck) {
            setError('New password fields does not match');
        }

        const config = {
            newPassword: newPassword,
            email: props.match.params.email,
            token: props.match.params.token,
            date: Date.now()
        }

        axios.post('http://localhost:5000/users/changepassword', config)
            .then(res => {
                setSuccesMessage('Password has been changed succesfully');
            })
            .catch(err => setError(err));
    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Change Password</h2>
            <form className='exercise-form' onSubmit={onSubmit} >

                {/* <div className='form-group'>
                    <label htmlFor='email'>Current Password</label>
                    <input className='form-control' type='password' name='password' autoComplete='off' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div> */}

                <div className='form-group'>
                    <label htmlFor='password'>New Password</label>
                    <input className='form-control' type='password' name='password' autoComplete='off' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>New Password</label>
                    <input className='form-control' type='password' name='password' autoComplete='off' value={newPasswordCheck} onChange={e => setNewPasswordCheck(e.target.value)} />
                </div>

                <br />
                <button className='btn btn-secondary' type='submit'>Change Password</button>
                <p>{succesMessage}</p>
                <p className='exercise-form-container red-color-text'>{error}</p>
            </form>

        </div>
    )
};

const mapStateToProps = state => {
    return {
        userId: state.auth.user._id
    }
}

export default connect(mapStateToProps, {  })(ChangePassword);