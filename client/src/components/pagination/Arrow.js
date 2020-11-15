import React from 'react';

const Arrow = props => {

    const { hidden, direction, currentPage, pageNumbers, goToPage } = props;

    return (
            <div className={`${direction}-pointer ${hidden ? 'hidden-arrow' : ''}`} onClick={() => goToPage(direction)}>
                {
                    direction === 'left' ? (
                        <div>
                            <i className={`arrow ${direction} big icon`}></i>
                            {direction === 'left' ? 'Previous' : 'Next'} Page
                        </div>
                    ) : (
                        <div> 
                            {direction === 'left' ? 'Previous' : 'Next'} Page
                            <i className={`arrow ${direction} big icon`}></i>
                        </div> 
                    )
                }
                
            </div>

    )
};

export default Arrow;