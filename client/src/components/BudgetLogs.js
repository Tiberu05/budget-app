import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

import { 
    getData,
    filterByDate,
    filterByType,
    noFilters
} from '../actions';

import history from '../history';
import { post } from 'jquery';


const BudgetLogs = props => {

    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    // const [incomes, setIncomes] = useState([]);
    // const [expenses, setExpenses] = useState([]);
    const [logs, setLogs] = useState([]);

    const [total, setTotal] = useState(0);



    // useEffect(() => {
    //     setLogs(props.logs);

        
    // }, [logs])

    // useEffect(() => {
    //     console.log(logs);
    // })

    // useEffect(() => {

    //     axios.get(`http://localhost:5000/users/user`, tokenConfig())
    //     .then(results => {
    //         setIncomes(results.data.data.incomes);
    //         setExpenses(results.data.data.expenses);
    //         setLogs(incomes.concat(expenses));
    //         logs.sort((a, b) => (a.sum > b.sum ? -1 : 1));
    //     })
    //     .catch(err => console.log(err));

        
    // }, [logs]);

    // useEffect(() => [
    //     setLogs(props.incomes.concat(props.expenses))
    // ], [])


    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/logs/${id}`)
            .then(result => {
                console.log(result.data);

                props.getData(props.email);
            })
            .catch(err => console.log(err));

    }

    const renderButtons = log => {
 
            return (
                <td>
                    <Link to={`logs/edit/${log._id}`}>
                        <button className='btn btn-outline-primary btn-sm' href={`logs/edit/${log._id}`}>Edit</button>
                    </Link>
                    <button className='btn btn-outline-danger btn-sm' onClick={() => deleteExercise(log._id)}>Delete</button>
                </td>
            )
        
    };

    const toggleChecked = el => {
        console.log(el);

        const toggleBetween = el.checked ? false : true;

        console.log(toggleBetween);

        axios.post(`http://localhost:5000/exercises/update/${el._id}`, { ...el, checked: toggleBetween }, { headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }


    const renderChecked = el => {
        if (!el.checked) {
            return <i onClick={() => toggleChecked(el)} className="thumbs up outline icon"></i>
        } else {
            return <i onClick={() => toggleChecked(el)} className="thumbs up icon green"></i>
        }
    }



    const renderExercises = () => {

        if (props.logs.length > 0) {

            if (!props.filters.byType.incomes && !props.filters.byType.expenses) {

                let totalFiltered = 0;

                const render = props.logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(el => {

                    totalFiltered += el.sum;

                    const classToggle = el.type === 'expense' ? 'expense' : 'income';
                    return (
                        <tr className={`${classToggle}`} key={el._id}>
                            <td>{el.date.substring(0, 10)}</td>
                            <td>{el.type}</td>
                            <td>{el.description.slice(0, 1).toUpperCase() + el.description.slice(1, el.description.length).toLowerCase()}</td>
                            <td>{el.sum}</td>
                            {renderButtons(el)}
                        </tr>
                    )
                });

                return render;

            } else if (props.filters.byType.incomes && !props.filters.byType.expenses) {

                let totalFiltered = 0;

                const filteredArray = props.logs.filter(el => el.type !== 'expense');

                const render = filteredArray.sort((a, b) => new Date(b.date) - new Date(a.date)).map(el => {

                    totalFiltered += el.sum;

                    const classToggle = el.type === 'expense' ? 'expense' : 'income';
                    return (
                        <tr className={`${classToggle}`} key={el._id}>
                            <td>{el.date.substring(0, 10)}</td>
                            <td>{el.type}</td>
                            <td>{el.description.slice(0, 1).toUpperCase() + el.description.slice(1, el.description.length).toLowerCase()}</td>
                            <td>{el.sum}</td>
                            {renderButtons(el)}

                        </tr>
                    )
                })

                return render;

            } else if (!props.filters.byType.incomes && props.filters.byType.expenses) {

                let totalFiltered = 0;

                const filteredArray = props.logs.filter(el => el.type !== 'income');

                const render = filteredArray.sort((a, b) => new Date(b.date) - new Date(a.date)).map(el => {

                    totalFiltered += el.sum;

                    const classToggle = el.type === 'expense' ? 'expense' : 'income';
                    return (
                        <tr className={`${classToggle}`} key={el._id}>
                            <td>{el.date.substring(0, 10)}</td>
                            <td>{el.type}</td>
                            <td>{el.description.slice(0, 1).toUpperCase() + el.description.slice(1, el.description.length).toLowerCase()}</td>
                            <td>{el.sum}</td>
                            {renderButtons(el)}

                        </tr>
                    )
                });

                console.log(totalFiltered);

                return render;
            }

        } else {
            return null;
        }
        
    };

    const renderText = () => {
        if (!props.isSignedIn) {
            return (
                <div className="d-flex justify-content-center">
                    <h3><a href='/login'>Login</a> or <a href='/register'>Register</a> to add logs</h3>
                </div>
            )
        } else if (props.isSignedIn && props.logs.length === 0) {
            return (
                <div className="d-flex justify-content-center">
                    <h3>You don't have any logs added</h3>
                </div>
            ) 
        }
    };

    const renderCreateButton = () => {
        if (props.isSignedIn) {
            return (
                <Link to='/create'>
                    <button className='btn btn-secondary'>Add new budget log</button>
                </Link>
            )
        }

    }


    const rendertableTotal = () => {
        if (props.isSignedIn) {
            return (
                    <tr className='table-ending'>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td>{props.budget}</td>
                        <td></td>
                    </tr>
            )
        }
    }

    const changeFilters = (value) => {
        props.filterByType(value);
    }


    return (
        // <div className='exercises-container'>{renderExercises()}</div>
        <div className='exercises-list'>

            <div className='filters-area'>
                <div className="form-group">
                    <label for='mr-sm-2'>Show</label>
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => changeFilters(e.target.value)}>
                        <option value="0">All</option>
                        <option value="incomes">Only Incomes</option>
                        <option value="expenses">Only Expenses</option>
                    </select>
                </div>
            </div>


            <h2>Your Budget Logs</h2>
            <table className='table'>
                <thead className='table-active'>
                    <tr>
                        <td>Date</td>
                        <td>Type</td>
                        <td>Description</td>
                        <td>Sum</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderExercises()}
                    {rendertableTotal()}
                </tbody>
            </table>
            {renderText()}
            {renderCreateButton()}
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return { 
        isSignedIn: state.auth.isSignedIn, 
        email: state.auth.user.email,
        userID: state.auth.user._id, 
        token: state.auth.token,
        logs: state.userData.logs,
        budget: state.userData.budget,
        filters: state.filters
    };
}

export default connect(mapStateToProps, { getData, filterByType } )(BudgetLogs);