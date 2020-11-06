import React, { useState } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';

import { filterByDate } from '../actions/index';

const DateFilter = (props) => {

    const [dropdown, setDropdown] = useState(false);

    const handleFilter = (newDate) => {

        console.log(newDate);

        props.filterByDate(newDate);
    };

    return (
        <div className='filters-flex-item'>
            <div className='form-group'>
                <label>
                    <DatePicker
                        className='form-control'
                        onChange={(newDate, e) => newDate !== null ? handleFilter(newDate) : handleFilter('')}
                        name='date'
                        selected={props.filterDate}
                        autoComplete='off'
                    />
                    <i className="calendar big grey icon"></i>
                </label>
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