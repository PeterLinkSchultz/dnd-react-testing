import React from 'react';
import PropTypes from 'prop-types';
import FilterChecker from './filterChecker';
import Input from './input';
const R = require('ramda');
const Filter = (props) => {
    const setValue = (e, value) => {
        e.preventDefault;
    }
    const renderFilter = function () {
        if (props.type === "L") {
            return props.values.map((item, key) => {
                return <FilterChecker
                    text={props.name}
                    name={item}
                    value={item}
                    name={props.name}
                    type={props.type}
                    key={key}
                    default={props.default.indexOf(item) != -1 ? true : false}
                    handleChange={props.handleChange}
                />
            });
        }
        if (props.type === "S") {
            return React.createElement(Input, {
                text: props.text,
                name: props.name,
                handleChange: props.handleChange
            });
        }
    }
    return (
        <div>
            {props.text}
            {renderFilter()}
        </div>

    );
}

Filter.prototypes = {
    handlerChange: PropTypes.func,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
export default Filter;