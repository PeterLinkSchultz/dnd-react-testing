import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Panel = function (props) {
    const renderChild = () => {
        return React.Children.map(props.children, item => {
            if ( item.type.name === "Filter" ) {
                return React.cloneElement(item,
                    {
                        handlerChange: props.handlerFilter,
                    }
                )
            } 
            if ( item.type.name === "Sort" ) {
                return React.cloneElement(item,
                    {
                        handlerChange: props.handlerSort,
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
    handlerFilter: PropTypes.func,
    handlerSort: PropTypes.func
};
export default Panel;

