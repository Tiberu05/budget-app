import React from 'react';
import { connect } from 'react-redux';


import TypeFilter from './TypeFilter';
import MonthFilter from './MonthFilter';
import DateFilter from './DateFilter';


const FiltersArea = props => {

    return (

        <div className='filters-area'>

            <TypeFilter />

            <MonthFilter />

            <DateFilter />
                
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
}

export default React.memo(connect(mapStateToProps, {} )(FiltersArea));