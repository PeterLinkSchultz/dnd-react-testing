import React from 'react';
import PropTypes from 'prop-types';
import FilterChecker from './filterChecker';
import Input from './input';
const Filter = (props) => {
    const renderFilter = function () {
        if (props.type === "L") {
            return props.values.map((item, key) => {
                return <FilterChecker
                    text={props.name}
                    value={item}
                    name={props.name}
                    type={props.type}
                    key={key}
                    default={props.default.indexOf(item) !== -1 ? true : false}
                    handleChange={props.handleChange}
                />
            });
        }
        if (props.type === "S") {
            return React.createElement(Input, {
                text: props.text,
                default: props.default ? props.default : false,
                name: props.name,
                handleChange: props.handleChange
            });
        }
    }
    const toString = () => {
        return "sort";
    }
    return (
        <div className="panel_item">
            <p className="panel_title">{props.text}</p>
            {renderFilter()}
        </div>

    );
}
Filter.prototype.getName = () => {
    return "filter";
}
Filter.proptypes = {
    handlerChange: PropTypes.func,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
export default Filter;