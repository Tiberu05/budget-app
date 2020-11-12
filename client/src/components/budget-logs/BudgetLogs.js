import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';

import './BudgetLogs.css';

import 'react-datepicker/dist/react-datepicker.css';

import CreateLogButton from '../CreateLogButton';
import Pagination from '../pagination/Pagination';
import Log from '../log/Log';
import Spinner from '../spinner/Spinner';


import { 
    getData,
    filterByDate,
    filterByType,
    filterByMonth
} from '../../actions';

const options = {
    method: "GET",
    url: "https://fixer-fixer-currency-v1.p.rapidapi.com/convert",
    params: {from: "USD", to: "EUR", amount: "1100"},
    headers: {
      "x-rapidapi-key": "3e4c2b32e1mshe96d706c5fef168p16fb6bjsn7e3f74935e33",
      "x-rapidapi-host": "fixer-fixer-currency-v1.p.rapidapi.com"
    }
};
  
  


const BudgetLogs = props => {


    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage, setLogsPerPage] = useState(10);
    const [rates, setRates] = useState({});
    const currency = useSelector(state => state.exchange.preferredCurrency);

    const [displayActions, setDisplayActions] = useState(false);

    useEffect(() => {

        props.getData(props.email, props.filters.filterByType, props.filters.filterByDate, props.filters.filterByMonth);
        
    }, [props.filters]);


    // PAGINATION
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    
    const goToPage = (which, pageNumber) => {
        if (which !== null) {
            if (which === 'right') setCurrentPage(currentPage + 1);
            if (which === 'left') setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(pageNumber);
        }

        window.scrollTo(0, 0);
    }


    const renderLogs = () => {

        if (props.loading && props.isSignedIn) {
            return <Spinner />
        } else {
            if (props.logs.length > 0) {

                props.logs.sort((a, b) => new Date(b.date) - new Date(a.date));

                const currentLogs = props.logs.slice(indexOfFirstLog, indexOfLastLog);

                const render = currentLogs.map(el => {
    
                    const classToggle = el.type === 'expense' ? 'expense' : 'income';
                    return (
                        <Log rates={rates} currency={currency} key={el._id} rowClass={classToggle} el={el} />
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
            <div className='table'>
                <div className='table-active table-head'>
                    <div className='table-item__date'>Date</div>
                    {/* <div className='table-item__type'>Type</div> */}
                    <div className='table-item__description'>Description</div>
                    <div className='table-item__sum'>Sum</div>
                    {/* <div className='table-item__actions'>Actions</div> */}
                </div>
                <div className={`table-body ${props.logs.length > 0 ? 'full-height' : ''}`}>
                    {renderLogs()}
                </div>
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