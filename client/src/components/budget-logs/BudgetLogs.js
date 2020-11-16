import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// CSS
import './BudgetLogs.css';

// REACT DATEPICKER CSS
import 'react-datepicker/dist/react-datepicker.css';

// COMPONENTS IMPORTS
import CreateLogButton from '../CreateLogButton';
import Pagination from '../pagination/Pagination';
import Log from '../log/Log';
import Spinner from '../spinner/Spinner';

// ACTIONS IMPORTS
import { 
    getData,
    filterByDate,
    filterByType,
    filterByMonth
} from '../../actions';
  

const BudgetLogs = props => {

    // PROPS DESTRUCTURING
    const { email, filters, getData } = props;

    console.log('BUDGET LOGS RENDER');


    // FRONTEND PAGINATION VARIABLES
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;


    // EXTRACTING THE USER PREFERRED CURRENCY
    const currency = useSelector(state => state.exchange.preferredCurrency);


    // GETTING THE DATA FROM THE BACKEND BASED ON USERS EMAIL
    // FILTERS SHOULD BE ON THE FRONTEND IN THIS CASE BECAUSE THERE IS NO IMPROVEMENT ON PERFOMANCE
    useEffect(() => {

        getData(email, filters.filterByType, filters.filterByDate, filters.filterByMonth);

        // SETTING THE CURRENT PAGE TO 1 EVERY TIME NEW FILTERS ARE SET
        setCurrentPage(1);
        
    }, [filters, email, getData]);


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


    // FUNCTION FOR RENDERING THE LOGS BASED ON CONDITIONS
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
                        <Log currency={currency} key={el._id} rowClass={classToggle} el={el} />
                    )
                });
    
                return render;      
    
            } else {
    
                return null;
            }
        }
        
    };

    // FUNCTION FOR RENDERING TEXT BASED ON CONDITIONS
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