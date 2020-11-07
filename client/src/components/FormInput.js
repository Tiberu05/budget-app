import React from 'react';

const FormInput = props => {

    const { type, value, onChange } = props;

    return (
        <div className='form-group'>
            <label htmlFor={type}>{type.slice(0, 1).toUpperCase() + type.slice(1, type.lentgh).toLowerCase()}</label>
            <input className='form-control' type={type} name={type} autoComplete='off' value={value} onChange={e => onChange(e, type)} />
        </div>
    )
}

export default FormInput;