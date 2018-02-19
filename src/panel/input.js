import React from 'react';
import PropTypes from 'prop-types';

const Input = function (props) {

    return (
        <input 
            type="text"
            name={props.name}
            placeholder={props.text}
            onChange={ (e) => props.HandleChange(e) }/>
    );
}

Input.prototypes = {
    handleChange: PropTypes.func.isRequired
}

export default Input;