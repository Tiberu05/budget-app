import React from 'react';
import { useSelector } from 'react-redux';

import './BudgetPage.css';

import BudgetLogs from '../../components/budget-logs/BudgetLogs';
import UserTotals from '../../components/UserTotals';
import FiltersArea from '../../components/FiltersArea';
import CurrencyButtons from '../../components/CurrencyButtons';

const BudgetPage = () => {

    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const isLoading = useSelector(state => state.userData.isLoading);

    return (
        <div className='budget-page'>

            {
                !isSignedIn && isLoading ? null : (

                    <div>
                        <FiltersArea />
                        <CurrencyButtons />
                    </div>                    
                )
            }

            <BudgetLogs />


        </div>

    )
};

export default BudgetPage;