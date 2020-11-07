import React from 'react';

import './BudgetPage.css';

import BudgetLogs from '../../components/BudgetLogs';
import FiltersArea from '../../components/FiltersArea';

const BudgetPage = () => {


    return (
        <div className='budget-page'>

            <FiltersArea />

            <BudgetLogs />

        </div>

    )
};

export default BudgetPage;