import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';


const Statistics = props => {

    return (
        <div className='exercises-list'>
            <h2>User: {props.name}</h2>
            <h5>Total Incomes: {props.userData.totalIncome}</h5>
            <h5>Total Expenses: {props.userData.totalExpense}</h5>
            <h5>Budget: {props.userData.budget}</h5>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        name: state.auth.user.name,
        email: state.auth.user.email,
        userData: state.userData
    }
}

export default connect(mapStateToProps, {})(Statistics);