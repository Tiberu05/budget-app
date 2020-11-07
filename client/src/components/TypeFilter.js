import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { filterByType } from '../actions/index';


const TypeFilter = (props) => {

    const [dropdown, setDropdown] = useState(false);
    const filterType = useSelector(state => state.filters.filterByType);

    const handleFilter = (e) => {

        props.filterByType(e.target.getAttribute('data-value'));
    };

    return (
        <div className='filters-flex-item type-filter'>
            <div  aria-expanded='true' onClick={() => setDropdown(!dropdown)} className="ui floating dropdown labeled icon button" >
                <i className="filter icon"></i>
                <span className="text">{filterType === '' ? 'Show All' : filterType.slice(0, 1).toUpperCase() + filterType.slice(1, filterType.length) + 's'  } </span>
                <div className={`menu ${dropdown ? 'transition visible' : ''}`}>
                    <div className="scrolling menu">
                        <div className="item" data-value='' onClick={e => handleFilter(e)}>
                            <div className="ui black empty circular label"></div>
                            All
                        </div>
                        <div className="item" data-value='income' onClick={e => handleFilter(e)}>
                            <div className="ui green empty circular label"></div>
                            Only Incomes
                        </div>
                        <div className="item" data-value='expense' onClick={e => handleFilter(e)}>
                            <div className="ui red empty circular label"></div>
                            Only Expenses
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default connect(null, { filterByType })(TypeFilter);