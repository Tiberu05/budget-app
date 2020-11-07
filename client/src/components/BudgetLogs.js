import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

import ActionButtons from './ActionButtons';

import FiltersArea from './FiltersArea';
import CreateLogButton from './CreateLogButton';
import Pagination from './Pagination';

import { formatNumber, limitTitle } from '../actions/utility';

import { 
    getData,
    filterByDate,
    filterByType,
    filterByMonth
} from '../actions';


const BudgetLogs = props => {


    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage, setLogsPerPage] = useState(10);


    useEffect(() => {

        props.getData(props.email, props.filters.filterByType, props.filters.filterByDate, props.filters.filterByMonth);
        
    }, [props.filters]);

    console.log('BUDGET LOGS AREA rerendered');


    // PAGINATION
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    
    const goToPage = (which) => {
        if (which === 'next') setCurrentPage(currentPage + 1);
        if (which === 'prev') setCurrentPage(currentPage - 1);

        window.scrollTo(0, 0);
    }


    const renderExercises = () => {

        if (props.loading && props.isSignedIn) {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>

            )
        } else {
            if (props.logs.length > 0) {

                props.logs.sort((a, b) => new Date(b.date) - new Date(a.date));

                const currentLogs = props.logs.slice(indexOfFirstLog, indexOfLastLog);

                const render = currentLogs.map(el => {
    
                    const classToggle = el.type === 'expense' ? 'expense' : 'income';
                    return (
                        <tr className={`${classToggle}`} key={el._id}>
                            <td className='align-middle'>{el.date.substring(0, 10)}</td>
                            <td className='type-field align-middle'>{el.type}</td>
                            <td className='item-description align-middle'>{limitTitle(el.description)}</td>
                            <td className='align-middle'>{formatNumber(el.sum)}</td>
                            <ActionButtons log={el} />
                        </tr>
                    )
                });
    
                return render;      
    
            } else {
    
                return null;
            }
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

    return (
        <div className='exercises-list'>

            <div className='table-info'>
                <div>
                    <h2>Your Budget Logs</h2>
                </div>
                <div>
                    {props.isSignedIn ? <CreateLogButton /> : null} 
                </div>
     
            </div>
            <div class="table-responsive">
            <table className='table'>
                <thead className='table-active'>
                    <tr>
                        <td>Date</td>
                        <td className='type-field'>Type</td>
                        <td>Description</td>
                        <td>Sum</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderExercises()}
                </tbody>
            </table>
            </div>
            
            <Pagination logsPerPage={logsPerPage} totalLogs={props.logs.length} currentPage={currentPage} goToPage={goToPage} />
            {renderText()}
        </div>
    )
};

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn, 
        email: state.auth.user.email,
        logs: state.userData.logs,
        filters: state.filters,
        loading: state.userData.isLoading,
    };
}

export default connect(mapStateToProps, { getData, filterByType, filterByMonth, filterByDate } )(BudgetLogs);