import React from 'react';
import PropTypes from 'prop-types';

const Input = function (props) {

    const handleChange = (e) => {
        props.handleChange(props.name, e.target.value);
    }
    return (
        <input 
            type="text"
            name={props.name}
            placeholder={props.text}
            onChange={ (e) => handleChange(e) }/>
    );
}

Input.prototypes = {
    handleChange: PropTypes.func.isRequired
}

export default Input;