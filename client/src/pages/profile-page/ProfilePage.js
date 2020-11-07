import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CurrencyButtons from '../../components/CurrencyButtons';

const ProfilePage = props => {

    return (
        <div className='exercises-list'>

            <h2>User: {props.name}</h2>
            <h5>Total Incomes: {props.userData.totalIncome}</h5>
            <h5>Total Expenses: {props.userData.totalExpense}</h5>
            <h5>Budget: {props.userData.budget}</h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <h5 style={{ margin: '0'}}>Currency:</h5>
                <CurrencyButtons />
            </div>

            <Link to='/changepassword'>
                <button className='btn btn-secondary' type='button'>Change Password</button>
            </Link>

        </div>
    )
};

const mapStateToProps = state => {
    return {
        name: state.auth.user.name,
        email: state.auth.user.email,
        user: state.auth.user,
        userData: state.userData
    }
}

export default connect(mapStateToProps, {})(ProfilePage);
