import React from 'react';
import { connect, useSelector } from 'react-redux';

import './RemoveFilters.css';

import { clearFilters } from '../../actions/index';

const RemoveFilters = props => {

    const typeFilter = useSelector(state => state.filters.filterByType);
    const monthFilter = useSelector(state => state.filters.filterByMonth);
    const dateFilter = useSelector(state => state.filters.filterByDate);

    const showButton = () => {
        if (typeFilter !== '' || monthFilter !== '' || dateFilter !== '') {
            return <button onClick={() => props.clearFilters()} className="ui negative basic button">Remove filters</button>
        }
    }

    return (
        <div>   
            {showButton()}
        </div>

    )
};

export default connect(null, { clearFilters })(RemoveFilters);
