import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getData } from '../actions';

import history from '../history';

import axios from 'axios';

const CreateBudgetLog = props => {

    //const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('income');
    const [date, setDate] = useState(new Date());
    const [sum, setSum] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(date);
    }, [date])


    const onSubmit = e => {

        e.preventDefault();

        const createLog = {
            email: props.email,
            type,
            description,
            sum,
            date
        }

        console.log(createLog);

        axios.post(`http://localhost:5000/logs/add/`, createLog, { headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(result => {
                props.getData(props.email);

                history.push('/logs');
            })
            .catch(err => console.log(err));


    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Create Log</h2>
            <form className='exercise-form' onSubmit={onSubmit}>


                {/* <div className='form-group'>
                    <label for='username'>Username</label>
                    <input className='form-control' type='text' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
                </div> */}

                {/* <div className='form-group'>
                    <select onChange={e => setType(e.target.value)}>
                        <option value='income'>Income</option>
                        <option value='expense'>Expense</option>
                    </select>
                </div> */}

                <div className="form-group">
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for='description'>Description</label>
                    <input className='form-control' type='text' name='description' autoComplete='off' value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='duration'>Value</label>
                    <input className='form-control' type='text' name='duration' autoComplete='off' value={sum} onChange={e => setSum(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label for='date'>Choose date:  </label>
                    <DatePicker
                        className='form-control date-input'
                        onChange={newDate => setDate(newDate)}
                        selected={date}
                        name='date'
                    />
                </div>
                <br />
                <button className='btn btn-secondary' type='submit'>Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        email: state.auth.user.email,
        userID: state.auth.user._id,
        email: state.auth.user.email
    };
}

export default connect(mapStateToProps, { getData } )(CreateBudgetLog);