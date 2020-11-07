import React from 'react';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';


import TypeFilter from './TypeFilter';
import MonthFilter from './MonthFilter';
import DateFilter from './DateFilter';
import RemoveFilters from './RemoveFilters';


const FiltersArea = props => {

    return (

        <div className='filters-area'>

            <TypeFilter />

            <MonthFilter />

            <DateFilter />

            <RemoveFilters />
                
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
}

export default React.memo(connect(mapStateToProps, {} )(FiltersArea));