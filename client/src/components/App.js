import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import { connect } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';
import "jquery/dist/jquery.min.js";
import './App.css';

import HomePage from './HomePage';
import Navbar from './Navbar';
import CreateBudgetLog from './CreateBudgetLog';
import Statistics from './Statistics';
import CreateUser from './CreateUser';
import EditLog from './EditLog';
import BudgetLogs from './BudgetLogs';
import LoginForm from './LoginForm';
import Footer from './Footer';
import FiltersArea from './FiltersArea';
import FiltersAreaRmk from './FiltersAreaRmk';
import ChangePassword from './ChangePassword';

import { loadUser, getData, setFilters } from '../actions';

const App = props => {

    const [propsEmail, setPropsEmail] = useState('');

    useEffect(() => {

        props.loadUser();

    }, [])

    useEffect(() => {

        setPropsEmail(props.email);

        props.setFilters(props.email);

    }, [props.email])

    console.log('RERENDERED');

    return(
        <Router history={history}>
            
                <header>
                    <Navbar />
                </header>
                <div className='container container-main'>
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/logs' exact component={BudgetLogs} mail={propsEmail} />
                        <Route path='/logs/edit/:id' exact component={EditLog} />
                        <Route path='/create' exact component={CreateBudgetLog} />
                        <Route path='/statistics' exact component={Statistics} />
                        <Route path='/register' exact component={CreateUser} />
                        <Route path='/login' exact component={LoginForm} />
                        <Route path='/changepassword' exact component={ChangePassword} />
                        <Route path='/filtersarea' exact component={FiltersArea} />
                        
                        <Route path='/rmk' exact component={FiltersAreaRmk} />
                        
                    </Switch>
                </div>
                <footer>
                    <Footer />
                </footer>
        </Router>
    );
};

const mapStateToProps = state => {
    return {
        email: state.auth.user.email,
        filters: state.filters
    };
}

export default connect(mapStateToProps, { loadUser, getData, setFilters })(App);