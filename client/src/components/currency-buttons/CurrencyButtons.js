import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import './CurrencyButtons.css';

import { setCurrency } from '../../actions';

const CurrencyButtons = props => {

    const currency = useSelector(state => state.exchange.preferredCurrency);
    const email = useSelector(state => state.auth.user.email);
    const [activeButton, setActiveButton] = useState(currency);

    useEffect(() => {
        setActiveButton(currency)
    }, [currency])

    const handleCurrencyChange = curr => {
        setActiveButton(curr);
        props.setCurrency(email, curr);
    }

    return (
        <div className='currency-buttons'>
            <div className='currency-div'>Currency: </div>
            <button className={`ui black basic button ${activeButton === 'USD' ? 'active-currency' : null}`} onClick={() => handleCurrencyChange('USD')}>USD</button>
            <button className={`ui black basic button ${activeButton === 'RON' ? 'active-currency' : null}`} onClick={() => handleCurrencyChange('RON')}>RON</button>
        </div>
    )
};

export default connect(null, { setCurrency })(CurrencyButtons);