import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';

import { Dropdown, Input, Menu } from 'react-semantic-ui';



const options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const typeOptions = [
    {
        key: 'all',
        text: 'All',
        value: ''
    },
    {
        key: 'income',
        text: 'Only Incomes',
        value: 'income'
    },
    {
        key: 'expense',
        text: 'Only Expenses',
        value: 'expense'
    },
];

const FiltersArea = props => {

    const [today, setToday] = useState(new Date('2021-10-08'));

    const [dropdowns, setDropdowns] = useState({
        typeDropdown: false,
        monthsDropdown: false,
    })

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

    useEffect(() => {
        console.log(dropdowns)
    }, [dropdowns])

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
            // return <option key={el.value} value={el.value}>{el.month} {el.year}</option>
            return (
                <div key={el.value} className="item" data-value={`${el.value}`} onClick={e => props.changeFilterState(e, 'month')}>
                    {el.month} {el.year}
                </div>
            )

        })

        return render;

    }


    const toggleDropdown = (filter) => {
        if (filter === 'type') dropdowns.typeDropdown ? setDropdowns({ ...dropdowns, typeDropdown: false }) : setDropdowns({ ...dropdowns, typeDropdown: true })
        if (filter === 'months') dropdowns.monthsDropdown ? setDropdowns({ ...dropdowns, monthsDropdown: false }) : setDropdowns({ ...dropdowns, monthsDropdown: true })
    }

    const displayDropdown = dropdowns.typeDropdown ? 'transition visible' : '';



    return (

        <div className='filters-area'>

            <div className='filters-flex-item'>
                <div  aria-expanded='true' onClick={() => toggleDropdown('type')} class="ui floating dropdown labeled icon button" >
                    <i class="filter icon"></i>
                    <span class="text">{props.type === '' ? 'Show All' : props.type.slice(0, 1).toUpperCase() + props.type.slice(1, props.type.length) + 's'  } </span>
                    <div class={`menu ${dropdowns.typeDropdown ? 'transition visible' : ''}`}>
                        <div class="scrolling menu">
                            <div class="item" data-value='' onClick={e => props.changeFilterState(e, 'type')}>
                                <div class="ui black empty circular label"></div>
                                All
                            </div>
                            <div class="item" data-value='income' onClick={e => props.changeFilterState(e, 'type')}>
                                <div class="ui green empty circular label"></div>
                                Only Incomes
                            </div>
                            <div class="item" data-value='expense' onClick={e => props.changeFilterState(e, 'type')}>
                                <div class="ui red empty circular label"></div>
                                Only Expenses
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='filters-flex-item'>
                <div  aria-expanded='true' onClick={() => toggleDropdown('months')} class="ui floating dropdown labeled icon button" >
                    <i class="filter icon"></i>
                    <span class="text"> {props.month === '' ? 'Month' : options[Number(props.month.split('-')[0]) - 1] + ' ' + state.year} </span>
                    <div class={`menu ${dropdowns.monthsDropdown ? 'transition visible' : ''}`}>
                        <div class="scrolling menu">
                            <div className="item" data-value={``} onClick={e => props.changeFilterState(e, 'month')}>
                                All time
                            </div>
                            {renderSelectOptions()}
                        </div>
                    </div>
                </div>
            </div>
           

            <div className='filters-flex-item'>
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


                    {/* <div className="form-group">
                        <label htmlFor='mr-sm-2'>Show</label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => props.changeFilterState(e, 'type')}>
                            <option value="">All</option>
                            <option value="income">Only Incomes</option>
                            <option value="expense">Only Expenses</option>
                        </select>
                    </div> */}

                    {/* <div className='form-group'>
                        <label htmlFor='mr-sm-2'>Show by month</label>
                            <select className='custom-select mr-sm-2' onChange={e => props.changeFilterState(e, 'month')}>
                                <option value=''>All time</option>
                                {renderSelectOptions()}
                            </select>
                    </div> */}

                    
                </div>
    )
};

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps, {} )(FiltersArea);