import React, {  useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import { connect } from 'react-redux';

// CSS IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';
import "jquery/dist/jquery.min.js";
import './App.css';

// PAGES IMPORTS
import HomePage from '../pages/homepage/HomePage';
import BudgetPage from '../pages/budget-page/BudgetPage';
import ProfilePage from '../pages/profile-page/ProfilePage';

// COMPONENTS IMPORTS
import Navbar from './navbar/Navbar';
import CreateLog from './create-log/CreateLog';
import RegisterForm from './register-form/RegisterForm';
import EditLog from './edit-log/EditLog';
import LoginForm from './login-form/LoginForm';
import Footer from './Footer';
import ChangePassword from './ChangePassword';
import ResetPassword from './reset-password/ResetPassword';

// ACTIONS IMPORTS
import { loadUser, getData, setFilters } from '../actions';

const App = props => {

    // PROPS DESTRUCTURING
    const { email, loadUser, setFilters } = props;


    // CHECK IF THE USER IS LOADED BASED ON TOKEN
    useEffect(() => {

        loadUser();

    }, [loadUser])


    // GETTING THE LAST LOG IN ORDER TO SET MONTHLY FILTER
    // NOT THE BEST PRACTICE
    useEffect(() => {

        setFilters(email);

    }, [email, setFilters])



    return(
        <Router history={history}> 

            <header>
                <Navbar />
            </header>

            <div className='container container-main'>
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/logs' exact component={BudgetPage} />
                    <Route path='/logs/edit/:id' exact component={EditLog} />
                    <Route path='/create' exact component={CreateLog} />
                    <Route path='/profile' exact component={ProfilePage} />
                    <Route path='/register' exact component={RegisterForm} />
                    <Route path='/login' exact component={LoginForm} />
                    <Route path='/changepassword/:token/:email' exact component={ChangePassword} />
                    <Route path='/resetpassword' exact component={ResetPassword} />                                     
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
    };
}

export default connect(mapStateToProps, { loadUser, getData, setFilters })(App);