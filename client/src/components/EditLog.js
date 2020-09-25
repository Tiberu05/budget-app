import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getData } from '../actions';

import history from '../history';

const EditLog = props => {

    const [log, setLog] = useState({});
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`http://localhost:5000/logs/find/log/${props.match.params.id}`)
            .then(result => {
                setLog(result.data.log);  
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        console.log(log);
        console.log(date);
    }, [log, date])



    const onSubmit = e => {
        e.preventDefault();


        const newLog = {
            email: log.email,
            description: log.description,
            type: log.type,
            sum: log.sum,
            date: log.date,
        };

        axios.post(`http://localhost:5000/logs/update/${props.match.params.id}`, newLog)
            .then(res => {
                props.getData(log.email);
                history.push('/logs');
            })
            .catch(err => console.log(err));


    };


    const createForm = () => {
        if (log) {
            return (
                <form className='exercise-form' onSubmit={onSubmit}>


                {/* <div className='form-group'>
                    <label for='username'>Username</label>
                    <input className='form-control' type='text' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
                </div> */}

                {/* <div className='form-group'>
                    <select onChange={e => setLog({ ...log, type: e.target.value})} value={log.type}>
                        <option value='income'>Income</option>
                        <option value='expense'>Expense</option>
                    </select>
                </div> */}

                <div className="form-group">
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => setLog( {...log, type: e.target.value} )} value={log.type}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for='description'>Description</label>
                    <input className='form-control' type='text' name='description' autoComplete='off' value={log.description || ''} onChange={e => setLog( {...log, description: e.target.value })} />
                </div>

                <div className='form-group'>
                    <label for='duration'>Value</label>
                    <input className='form-control' type='text' name='duration' autoComplete='off' value={log.sum || ''} onChange={e => setLog( {...log, sum: e.target.value })} />
                </div>

                <div className='form-group'>
                    <label for='date'>Choose date:  </label>
                    <DatePicker
                        className='form-control date-input'
                        onChange={newDate => setLog({ ...log, date: newDate })}
                        selected={Date.parse(log.date)}
                        name='date'
                    />
                </div>
                <br />
                <button className='btn btn-secondary' type='submit'>Submit</button>
            </form>
            )

        }
    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Edit Log</h2>
            {createForm()}
        </div>
    )
};

const mapStateToProps = state => {
    return {};
}

export default connect(mapStateToProps, { getData })(EditLog);