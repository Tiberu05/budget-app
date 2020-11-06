import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { filterByMonth } from '../actions/index';

const options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthFilter = (props) => {

    const [dropdown, setDropdown] = useState(false);

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

        const lastDate = new Date(props.lastLog);

        const todayMonthIndex = lastDate.getMonth();

        const todayYear = lastDate.getFullYear();

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
                <div key={el.value} className="item" data-value={`${el.value}`} onClick={e => handleFilter(e)}>
                    {el.month} {el.year}
                </div>
            )

        })

        return render;

    }

    const handleFilter = (e) => {

        props.filterByMonth(e.target.getAttribute('data-value'));
    };

    return (
        <div className='filters-flex-item'>
            <div  aria-expanded='true' onClick={() => setDropdown(!dropdown)} className="ui floating dropdown labeled icon button" >
                <i className="filter icon"></i>
                <span className="text"> {props.filterMonth === '' ? 'Month' : options[Number(props.filterMonth.split('-')[0]) - 1] + ' ' + state.year} </span>
                <div className={`menu ${dropdown ? 'transition visible' : ''}`}>
                    <div className="scrolling menu">
                        <div className="item" data-value={``} onClick={e => handleFilter(e)}>
                            All time
                        </div>
                        {renderSelectOptions()}
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        filterMonth: state.filters.filterByMonth,
        createdAt: state.auth.user.createdAt,
        lastLog: state.filters.lastLog
    }
}

export default connect(mapStateToProps, { filterByMonth })(MonthFilter);