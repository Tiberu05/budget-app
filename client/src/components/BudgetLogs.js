import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FiltersArea from './FiltersArea';

import { 
    getData,
    filterByDate,
    filterByType,
    noFilters
} from '../actions';

import history from '../history';
import { post } from 'jquery';


const BudgetLogs = props => {


    const [state, setState] = useState({
        filtersShow: true,
        filterType: '',
        filterMonth: '',
        filterDate: ''
    });



    useEffect(() => {


        props.getData(props.email, state.filterType, state.filterDate, state.filterMonth);


        return () => {
            props.getData(props.email);
        }
        
    }, [state]);

    useEffect(() => {
        console.log(state);
    })



    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/logs/${id}`)
            .then(result => {
                console.log(result.data);

                props.getData(props.email, state.filterType, state.filterDate, state.filterMonth);
            })
            .catch(err => console.log(err));

    }

    const renderButtons = log => {
 
            return (
                <td>
                    <Link to={`logs/edit/${log._id}`}>
                        <button className='btn btn-outline-secondary btn-sm' href={`logs/edit/${log._id}`}>Edit</button>
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



    const renderExercises = () => {

        if (props.logs.length > 0) {

            const render = props.logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(el => {

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

    const toggleFilters = () => {
        state.filtersShow === true ? setState({...state, filtersShow: false}) : setState({...state, filtersShow: true});
    }

    const renderFiltersButton = () => {

        if (props.isSignedIn) {
            return (
                <button className='btn btn-secondary' onClick={() => toggleFilters()} >Filters</button>
            )

            // return (
            //     <div className='filters-area'>

            //         <div className="form-group">
            //             <label htmlFor='mr-sm-2'>Show</label>
            //             <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => setFtype(e.target.value)}>
            //                 <option value="">All</option>
            //                 <option value="income">Only Incomes</option>
            //                 <option value="expense">Only Expenses</option>
            //             </select>
            //         </div>

            //         <div className='form-group'>
            //             <label htmlFor='mr-sm-2'>Show by month</label>
            //                 <select className='custom-select mr-sm-2'>
            //                     <option>January</option>
            //                 </select>
            //         </div>

            //         <div className='form-group'>
            //             <label>
            //                 <DatePicker
            //                     className='form-control'
            //                     onChange={newDate => newDate !== null ? setFdate(newDate) : setFdate('')}
            //                     selected={fDate}
            //                     name='date'
            //                     autoComplete='off'
            //                 />
            //                 <i class="calendar big grey icon"></i>
            //             </label>

            //         </div>
            //     </div>
            // )
        }
    }


    const changeFilterState = (e, type, newDate) => {
        if (type === 'type') setState({...state, filterType: e.target.getAttribute('data-value')});
        if (type === 'month') setState({...state, filterDate: '', filterMonth: e.target.getAttribute('data-value')})
        if (type === 'date') setState({...state, filterMonth: '', filterDate: newDate})
    }

    const displayFiltersArea = () => {
        if (state.filtersShow) {
            return (
                <FiltersArea 
                    changeFilterState={changeFilterState}
                    type={state.filterType}
                    month={state.filterMonth}
                    date={state.filterDate}
                    createdAt={props.user.createdAt}
                />
            )
        } else {
            return null;
        }
    }


    return (
        // <div className='exercises-container'>{renderExercises()}</div>
        <div className='exercises-list'>

            {/* {renderFiltersButton()} */}

            {displayFiltersArea()}

            <div className='table-info'>
                <div>
                    <h2>Your Budget Logs</h2>
                </div>
                <div>
                    {renderCreateButton()} 
                </div>
     
            </div>
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
        </div>
    )
};

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn, 
        email: state.auth.user.email,
        userID: state.auth.user._id,
        user: state.auth.user,
        token: state.auth.token,
        logs: state.userData.logs,
        budget: state.userData.budget,
        filters: state.filters,
    };
}

export default connect(mapStateToProps, { getData, filterByType, filterByDate } )(BudgetLogs);