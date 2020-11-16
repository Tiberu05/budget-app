import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import "./ActionButtons.css";

import { getData } from '../../actions';

const ActionButtons = (props) => {

    const { log } = props;

    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/logs/${id}`)
            .then(result => {
                props.getData(props.email, props.filters.filterByType, props.filters.filterByDate, props.filters.filterByMonth);
            })
            .catch(err => console.log(err));

    }

    return (
        <div className='action-buttons'>
            <Link to={`logs/edit/${log._id}`}>
                <button className='btn btn-outline-secondary btn-sm' href={`logs/edit/${log._id}`}>Edit</button>
            </Link>
            <button className='btn btn-outline-danger btn-sm' onClick={() => deleteExercise(log._id)}>Delete</button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        email: state.auth.user.email,
        filters: state.filters
    }
}

export default connect(mapStateToProps, { getData })(ActionButtons);