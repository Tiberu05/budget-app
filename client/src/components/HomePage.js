import React from 'react';
import { connect } from 'react-redux';

const HomePage = props => {

    const renderHome = () => {
        if (props.isSignedIn) {
            return <h2>Welcome, {props.name}</h2>
        } else {
            return <h2>Welcome to React App</h2>
        }
    };

    return (
        <div className='welcome'>
            {renderHome()}
        </div>

    )
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, name: state.auth.user.name };
};

export default connect(mapStateToProps, {})(HomePage);