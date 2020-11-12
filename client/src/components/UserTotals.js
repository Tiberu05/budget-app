import React, { useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import './UserTotals.css';

const UserTotals = props => {

    const userData = useSelector(state => state.userData);
    const [hide, setHide] = useState(true);
    const hideButtonRef = useRef();

    return (
        <div className={`user-totals ${!hide ? 'border' : ''}`}>
            <div onClick={() => setHide(!hide)} className='table-header'>
                <h5 className='table-data'>Available Budget: {userData.budget} LEI (Show more)</h5>
            </div>
            {
                hide ? null : ( 

                    <div className='stats-body'>
                        <div className='all-time-stats'>
                            <h3>All time</h3>
                            <h5 className='table-data'>Total Incomes: {userData.totalIncome}</h5>
                            <h5 className='table-data'>Total Expenses: {userData.totalExpense}</h5>
                            <h5 className='table-data'>Budget: {userData.budget}</h5>
                        </div>
                        <div className='selected-period-stats'>
                            <h3>Selected Period</h3>
                            <h5 className='table-data'>Total Incomes: {userData.totalIncome}</h5>
                            <h5 className='table-data'>Total Expenses: {userData.totalExpense}</h5>
                            <h5 className='table-data'>Budget: {userData.budget}</h5>
                        </div>
                    </div>
                )   
            }

        </div>
    )
};

export default UserTotals;