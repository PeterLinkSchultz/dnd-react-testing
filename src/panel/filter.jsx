import React from 'react';
import PropTypes from 'prop-types';
import Checker from './checker';
import Input from './input';

const Filter = (props) => {
    const setValue = (e, value) => {
        e.preventDefault;
    }
    const renderFilter = function() {
        if ( props.type === "L" ) {
            return props.value.map( (item, key) => {
                return React.createElement(Checker, {
                    text: item,
                    value: item,
                    key,
                    handlerChange: props.handlerChange
                });
            });
        }
        if ( props.type === "S" ) {
            return React.createElement(Input, {
                text: "name",
                handlerChange: props.handlerChange
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
}
export default Filter;