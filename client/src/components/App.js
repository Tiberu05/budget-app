import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import { connect } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import './App.css';

import HomePage from './HomePage';
import Navbar from './Navbar';
import CreateBudgetLog from './CreateBudgetLog';
import CreateUser from './CreateUser';
import EditLog from './EditLog';
import BudgetLogs from './BudgetLogs';
import LoginForm from './LoginForm';

import { loadUser, getData } from '../actions';

const App = props => {

    useEffect(() => {

        props.getData(props.email);
        
        props.loadUser();

        
    })

    return(
        <Router history={history}>
            
                <header>
                    <Navbar />
                </header>
                <div className='container container-main'>
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/logs' exact component={BudgetLogs} />
                        <Route path='/logs/edit/:id' exact component={EditLog} />
                        <Route path='/create' exact component={CreateBudgetLog} />
                        <Route path='/register' exact component={CreateUser} />
                        <Route path='/login' exact component={LoginForm} />
                    </Switch>
                </div>
        </Router>
    );
};

const mapStateToProps = state => {
    return {
        email: state.auth.user.email
    };
}

export default connect(mapStateToProps, { loadUser, getData })(App);