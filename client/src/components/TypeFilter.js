import React, { useState } from 'react';
import { connect } from 'react-redux';

import { filterByType } from '../actions/index';

const TypeFilter = (props) => {

    const [dropdown, setDropdown] = useState(false);

    const handleFilter = (e) => {

        props.filterByType(e.target.getAttribute('data-value'));
    };

    return (
        <div className='filters-flex-item'>
            <div  aria-expanded='true' onClick={() => setDropdown(!dropdown)} className="ui floating dropdown labeled icon button" >
                <i className="filter icon"></i>
                <span className="text">{props.filterType === '' ? 'Show All' : props.filterType.slice(0, 1).toUpperCase() + props.filterType.slice(1, props.filterType.length) + 's'  } </span>
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

const mapStateToProps = state => {
    return {
        filterType: state.filters.filterByType
    }
}

export default connect(mapStateToProps, { filterByType })(TypeFilter);