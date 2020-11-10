import React from 'react';

import './Log.css';

import ActionButtons from '../action-buttons/ActionButtons';

import { formatNumber, limitTitle } from '../../actions/utility';

const Log = props => {

    const { rowClass, el } = props

    return (
        <tr className={`${rowClass} table-item`} key={el._id}>
            <td className='align-middle'>{el.date.substring(0, 10)}</td>
            <td className='type-field align-middle'>{el.type}</td>
            <td className='item-description align-middle'>{limitTitle(el.description)}</td>
            <td className='align-middle'>{formatNumber(el.sum)}</td>
            <td className='actions'><ActionButtons log={el} /></td>
        </tr>
    )
};

export default Log;