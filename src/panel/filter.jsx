import React from 'react';
import PropTypes from 'prop-types';
import FilterChecker from './filterChecker';
import Input from './input';
const R = require('ramda');
const Filter = (props) => {
    const setValue = (e, value) => {
        e.preventDefault;
    }
    const renderFilter = function() {
        if ( props.type === "L" ) {
            return props.values .map( (item, key) => {
                return <FilterChecker
                    text={props.name}
                    name={item}
                    value={item}
                    name={props.name}
                    key={key}
                    default={props.default.indexOf(item) != -1 ? true : false}
                    handleChange={props.handleChange}
                />
            });
        }
        if ( props.type === "S" ) {
            return React.createElement(Input, {
                text: "name",
                handleChange: props.handleChange
            });
        }
    }
    return(
        <div>
            {renderFilter()}
        </div>
        
    );
}

Filter.prototypes = {
    handlerChange: PropTypes.func
};
export default Filter;