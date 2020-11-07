import React, {useState} from 'react';

import './CurrencyButtons.css';

const CurrencyButtons = props => {

    const [activeButton, setActiveButton] = useState('LEI');

    return (
        <div className='currency-buttons'>
            <button class={`ui black basic button ${activeButton === 'USD' ? 'active' : null}`} onClick={() => setActiveButton('USD')}>USD</button>
            <button class={`ui black basic button ${activeButton === 'LEI' ? 'active' : null}`} onClick={() => setActiveButton('LEI')}>LEI</button>
        </div>
    )
};

export default CurrencyButtons;