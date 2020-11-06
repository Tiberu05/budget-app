import React from 'react';


const Pagination = ({ logsPerPage, totalLogs, currentPage, goToPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageArrows = () => {
        if (currentPage === pageNumbers[0] && pageNumbers.length > 1) {
            return (
                <React.Fragment>
                    <div className='hidden-arrow'>
                        <i className='arrow left big icon'></i>
                        Previous Page
                    </div>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <div onClick={() => goToPage('next')}>
                        Next Page
                        <i className='arrow right big icon'></i>
                    </div>
                </React.Fragment>
            )
        } else if (currentPage === pageNumbers[pageNumbers.length - 1] && pageNumbers.length > 1) {
            return (
                <React.Fragment>
                    <div onClick={() => goToPage('prev')}>
                        <i className='arrow left big icon'></i>
                        Previous Page
                    </div>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <div className='hidden-arrow'>
                        Next Page
                        <i className='arrow right big icon'></i>
                    </div>
                </React.Fragment>
            )
        } else if (currentPage < pageNumbers[pageNumbers.length - 1] && currentPage > pageNumbers[0]) {
            return (
                <React.Fragment>


                    <div onClick={() => goToPage('prev')}>
                        <i className='arrow left big icon'></i>
                        Previous Page
                    </div>
                    <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                    <div onClick={() => goToPage('next')}>
                        Next Page
                        <i className='arrow right big icon'></i>
                    </div>
                </React.Fragment>
            )
        } else if (pageNumbers.length === 1) {
             return (
                 <React.Fragment>
                     <div onClick={() => goToPage('next')} className='hidden-arrow'>
                         Next Page
                         <i className='arrow right big icon'></i>
                     </div>
                     <div>Page {currentPage} / {pageNumbers[pageNumbers.length - 1]}</div>
                     <div onClick={() => goToPage('prev')} className='hidden-arrow'>
                         <i className='arrow left big icon'></i>
                         Previous Page
                     </div>
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