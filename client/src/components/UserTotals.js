import React, { useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import './UserTotals.css';

const UserTotals = props => {

    const userData = useSelector(state => state.userData);
    const [hide, setHide] = useState(true);
    const hideButtonRef = useRef();

    return (
        <div className={`user-totals ${!hide ? 'border' : ''}`}>
            <div className='hide-button' onClick={() => setHide(!hide)}>{ !hide ? 'Hide' : 'Show'}</div>
            <div className='table-header'>
                <h3 className='table-data'>Totals For Selected Period</h3>
            </div>
            {
                hide ? null : ( 

                    <div className='table-body'>
                        <h5 className='table-data'>Total Incomes: {userData.totalIncome}</h5>
                        <h5 className='table-data'>Total Expenses: {userData.totalExpense}</h5>
                        <h5 className='table-data'>Budget: {userData.budget}</h5>
                    </div>
                )   
            }

        </div>
    )
};

export default UserTotals;