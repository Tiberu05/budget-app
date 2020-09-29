import React, { useState, useEffect, useReducer } from 'react';
import { setDefaultLocale } from 'react-datepicker';
import { connect } from 'react-redux';

const options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Statistics = props => {

    const [state, setState] = useState({ startMonth: undefined, year: undefined })

    const [today, setToday] = useState(new Date());

    const [currentMonth, setCurrentMonth] = useState('');

    const [filterMonth, setFilterMonth] = useState('');

    useEffect(() => {
        if (props.user.createdAt) {
            const index = parseInt(props.user.createdAt.substring(5, 7));

            const year = props.user.createdAt.substring(0, 4);

            setState({ startMonth: options[index - 1], year})
        }
    }, [])


    const renderSelectOptions = () => {

        let year;

        if (props.user.createdAt) {
            year = parseInt(props.user.createdAt.substring(0, 4));
        }

        const dates = [];

        let index;

        const todayMonthIndex = today.getMonth();

        const todayYear = today.getFullYear();

        const currentMonth = options[todayMonthIndex];

        if(state.startMonth) {
            index = options.indexOf(state.startMonth);
        }


        for (var i = index; i < 12; i++) {

            if (year < todayYear) {
                dates.push({ month: options[i], year});

                if (i === 11) {
                    year += 1;
                    i = 0;
                }
            } else if (year === todayYear && i === todayMonthIndex) {
                dates.push({ month: options[i], year});
                break;
            } else if (year === todayYear && i !== todayMonthIndex + 1) {
                dates.push({ month: options[i], year});
            }

        }    

        const render = dates.map(el => {
            return <option>{el.month} {el.year}</option>
        })

        return render;

    }
        


    return (
        <div className='exercises-list'>
            <select className='custom-select mr-sm-2'>
                {renderSelectOptions()}
            </select>

            <h2>User: {props.name}</h2>
            <h5>Total Incomes: {props.userData.totalIncome}</h5>
            <h5>Total Expenses: {props.userData.totalExpense}</h5>
            <h5>Budget: {props.userData.budget}</h5>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        name: state.auth.user.name,
        email: state.auth.user.email,
        user: state.auth.user,
        userData: state.userData
    }
}

export default connect(mapStateToProps, {})(Statistics);