import React from 'react';

import './Pagination.css';

import Arrow from './Arrow';


const Pagination = ({ logsPerPage, totalLogs, currentPage, goToPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageArrows = () => {
        if (currentPage === pageNumbers[0] && pageNumbers.length > 1) {
            return (
                <React.Fragment>
                    <Arrow currentPage={currentPage} hidden={true} pageNumbers={pageNumbers} direction={'left'} goToPage={goToPage}/>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <Arrow currentPage={currentPage} hidden={false} pageNumbers={pageNumbers} direction={'right'} goToPage={goToPage} />
                </React.Fragment>
            )
        } else if (currentPage === pageNumbers[pageNumbers.length - 1] && pageNumbers.length > 1) {
            return (
                <React.Fragment>
                    <Arrow currentPage={currentPage} hidden={false} pageNumbers={pageNumbers} direction={'left'} goToPage={goToPage}/>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <Arrow currentPage={currentPage} hidden={true} pageNumbers={pageNumbers} direction={'right'} goToPage={goToPage}/>
                </React.Fragment>
            )
        } else if (currentPage < pageNumbers[pageNumbers.length - 1] && currentPage > pageNumbers[0]) {
            return (
                <React.Fragment>
                    <Arrow currentPage={currentPage} hidden={false} pageNumbers={pageNumbers} direction={'left'} goToPage={goToPage}/>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <Arrow currentPage={currentPage} hidden={false} pageNumbers={pageNumbers} direction={'right'} goToPage={goToPage}/>
                </React.Fragment>
            )
        } else if (pageNumbers.length === 1) {
             return (
                <React.Fragment>
                    <Arrow currentPage={currentPage} hidden={true} pageNumbers={pageNumbers} direction={'left'} goToPage={goToPage}/>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <Arrow currentPage={currentPage} hidden={true} pageNumbers={pageNumbers} direction={'right'} goToPage={goToPage}/>
                </React.Fragment>
             )
        }
    }

    return (
        <div className='pagination-flex'>
            {renderPageArrows()}
        </div>
        
    )
};

export default Pagination;