import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createUser, clearErrors } from '../../actions';

const CreateUser = props => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmit = e => {
        e.preventDefault();

        props.createUser(name, email, password);

        props.history.push('/');

    }


    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Register</h2>
            <form className='exercise-form' onSubmit={onSubmit}>

                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input className="form-control" type='text' name='name' autoComplete='off' value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input className="form-control" type='email' name='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input className="form-control" type='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                
                <br />
                <button className='btn btn-secondary' type='submit'>Register</button>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { createUser, clearErrors })(CreateUser);