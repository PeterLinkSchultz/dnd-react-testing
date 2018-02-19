import React from 'react';
import PropTypes from 'prop-types';

const Checker = function (props) {
    const handlerChange = (e) => {
        console.log(props);
        props.handlerChange(props.value);
    }
    return (
        <label>
            <input
                type="checkbox"
                name={props.name}
                onChange={(e) => handlerChange(e) } />
            <span>
                {props.text}
            </span>
        </label>
    );
}

Checker.prototypes = {
    handlerChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired
}

export default Checker;