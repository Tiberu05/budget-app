import React from 'react';
import { useSelector } from 'react-redux';

import './BudgetPage.css';

import BudgetLogs from '../../components/budget-logs/BudgetLogs';
import FiltersArea from '../../components/filters/FiltersArea';
import CurrencyButtons from '../../components/currency-buttons/CurrencyButtons';

const BudgetPage = () => {

    const isSignedIn = useSelector(state => state.auth.isSignedIn);

    return (
        <div className='budget-page'>

            {
                !isSignedIn ? null : (

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