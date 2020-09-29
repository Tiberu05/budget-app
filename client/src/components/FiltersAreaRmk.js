import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';



const options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const FiltersArea = props => {

    const [today, setToday] = useState(new Date());

    const [state, setState] = useState({
        month: undefined,
        year: undefined
    });


    useEffect(() => {
        if (props.createdAt) {
            const index = parseInt(props.createdAt.substring(5, 7));

            const year = props.createdAt.substring(0, 4);

            setState({ startMonth: options[index - 1], year})
        }
    }, []);

    const renderSelectOptions = () => {

        let year;

        if (props.createdAt) {
            year = parseInt(props.createdAt.substring(0, 4));
        }

        const dates = [];

        let index;

        const todayMonthIndex = today.getMonth();

        const todayYear = today.getFullYear();

        if(state.startMonth) {
            index = options.indexOf(state.startMonth);
        }


        for (var i = index; i < 12; i++) {

            if (year < todayYear) {
                dates.push({ month: options[i], year , value: `${i + 1}-${year}`});

                if (i === 11) {
                    year += 1;
                    i = 0;
                }
            } else if (year === todayYear && i === todayMonthIndex) {
                dates.push({ month: options[i], year , value: `${i + 1}-${year}`});
                break;
            } else if (year === todayYear && i !== todayMonthIndex + 1) {
                dates.push({ month: options[i], year , value: `${i + 1}-${year}`});
            }

        }    

        const render = dates.map(el => {
            return <option key={el.value} value={el.value}>{el.month} {el.year}</option>
        })

        return render;

    }


    return (

        <div className='filters-area'>

                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Type
                        </button>
                        <div class="dropdown-menu show" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button">All</button>
                            <button class="dropdown-item" type="button">Incomes</button>
                            <button class="dropdown-item" type="button">Expenses</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor='mr-sm-2'>Show</label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => props.changeFilterState(e, 'type')}>
                            <option value="">All</option>
                            <option value="income">Only Incomes</option>
                            <option value="expense">Only Expenses</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='mr-sm-2'>Show by month</label>
                            <select className='custom-select mr-sm-2' onChange={e => props.changeFilterState(e, 'month')}>
                                <option value=''>All time</option>
                                {renderSelectOptions()}
                            </select>
                    </div>

                    <div className='form-group'>
                        <label>
                            <DatePicker
                                className='form-control'
                                onChange={(newDate, e) => newDate !== null ? props.changeFilterState(e, 'date', newDate) : props.changeFilterState(e, 'date', '')}
                                name='date'
                                selected={props.date}
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
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps, {} )(FiltersArea);