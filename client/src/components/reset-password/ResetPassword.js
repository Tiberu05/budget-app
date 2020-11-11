import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = props => {

    const [email, setEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const config = {
            email
        }

        axios.post('http://localhost:5000/users/resetpassword', config)
            .then(res => props.history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <div className='exercise-form-container'>
            <form className='exercise-form' onSubmit={onSubmit} >

                    <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input className='form-control' type='text' name='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <br />
                <button className='btn btn-secondary' type='submit'>Send</button>
                
            </form>
        </div>
    )
};

export default ResetPassword;