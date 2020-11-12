import React from 'react';
import { Link } from 'react-router-dom';

const CreateLogButton = () => {

    return (
        <Link to='/create'>
            <button className='ui secondary basic button'>Add new budget log</button>
        </Link>
    )
};

export default CreateLogButton;