import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Panel = function (props) {
    const renderChild = () => {
        return React.Children.map(props.children, item => {
            if ( item.type.name === "Filter" ) {
                return React.cloneElement(item,
                    {
                        handleChange: props.handleFilter
                    }
                )
            } 
            if ( item.type.name === "Sort" ) {
                return React.cloneElement(item,
                    {
                        handleChange: props.handleSort
                    }
                )
            }
        });
    };
    return (
        <div className="list_filter">
            { renderChild() }
        </div>
    );

};
Panel.prototypes = {
    handleFilter: PropTypes.func,
    handleSort: PropTypes.func
};
export default Panel;

