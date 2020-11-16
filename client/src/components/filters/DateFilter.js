import React from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';

import { filterByDate } from '../../actions/index';

const DateFilter = (props) => {


    const handleFilter = (newDate) => {

        props.filterByDate(newDate);
    };

    return (
        <div className='filters-flex-item'>
            <div className='form-group'>
                <div className="ui left icon input">
                    <DatePicker
                        className='form-control'
                        onChange={(newDate, e) => newDate !== null ? handleFilter(newDate) : handleFilter('')}
                        name='date'
                        selected={props.filterDate}
                        autoComplete='off'
                    />
                    <i className="calendar icon"></i>         
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        filterDate: state.filters.filterByDate
    }
}

export default connect(mapStateToProps, { filterByDate })(DateFilter);