import React from 'react';

import './Log.css';

import ActionButtons from '../action-buttons/ActionButtons';

import { formatNumber, limitTitle } from '../../actions/utility';

const Log = props => {

    const { rowClass, el } = props

    return (
        <div className={`${rowClass} table-item`} key={el._id}>
            <div className='table-item__date'>{el.date.substring(0, 10)}</div>
            {/* <div className='tab;e-item__type'>{el.type}</div> */}
            <div className='table-item__description'>{limitTitle(el.description)}</div>
            <div className='table-item__sum'>{formatNumber(el.sum)}</div>
            <div className='table-item__actions'><ActionButtons log={el} /></div>
        </div>
    )
};

export default Log;