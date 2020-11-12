import React from 'react';
import { useSelector } from 'react-redux';

import './Log.css';

import ActionButtons from '../action-buttons/ActionButtons';

import { formatNumber, limitTitle } from '../../actions/utility';

const Log = props => {

    const { rowClass, el, rates } = props;
    const exchange = useSelector(state => state.exchange);

    const exchangeAction = (el, exchangeTo) => {
        let total;
        if (el.currency === exchangeTo) {
            return el.sum;
        } else {
            if (exchangeTo === 'RON') {
                total = el.sum * exchange.ratesUSD.RON
                return formatNumber(total);
            } else if (exchangeTo === 'USD') {
                total = el.sum * exchange.ratesRON.USD;
                return formatNumber(total);
            }
        }
    }

    return (
        <div className={`${rowClass} table-item`} key={el._id}>
            <div className='table-item__date'>{el.date.substring(0, 10)}</div>
            {/* <div className='tab;e-item__type'>{el.type}</div> */}
            <div className='table-item__description'>{limitTitle(el.description)}</div>
            <div className='table-item__sum'>{exchangeAction(el, exchange.preferredCurrency)} {exchange.preferredCurrency}</div>
            <div className='table-item__actions'><ActionButtons log={el} /></div>
        </div>
    )
};

export default Log;