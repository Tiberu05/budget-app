import React from 'react';
import { Link } from 'react-router-dom';

const CreateLogButton = () => {

    return (
        <Link to='/create'>
            <button className='btn btn-secondary'>Add new budget log</button>
        </Link>
    )
};

export default CreateLogButton;