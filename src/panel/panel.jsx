import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getNameProto } from '../constants/index';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.renderChild = this.renderChild.bind(this);

        this.params = {
            filter: [],
            sort: []
        }
    }
    componentDidMount() {
        this.defaulter.update();
    }
    panelDefault = (updater) => {
        let params = {
            filter: [],
            sort: [],
        }
        const setParams = (type, name, values, index = 0) => {
            if (values) {
                switch (type) {
                    case "filter":
                        params[type].push({ name, values });
                        break;
                    case "sort":
                        params[type][index] = { name, value: values };
                        break;
                    default:
                    break;
                }

            }
        }
        const update = () => {
            updater(params);
        }
        return {
            setParams,
            update,
            params
        }
    }
    renderChild = () => {
        this.defaulter = this.panelDefault(this.props.handleDefault);
        return React.Children.map(this.props.children, item => {
            if (getNameProto.apply(item) === "filter") {
                this.defaulter.setParams("filter", item.props.name, item.props.default);
                return React.cloneElement(item,
                    {
                        handleChange: this.props.handleFilter
                    }
                )
            }
            if (getNameProto.apply(item) === "sort") {
                this.defaulter.setParams("sort", item.props.name, item.props.default, item.props.index);
                return React.cloneElement(item,
                    {
                        handleChange: this.props.handleSort
                    }
                )
            }
        });
    };
    render() {
        return (
            <div className="panel">
                {this.renderChild()}
            </div>
        );
    }

};
Panel.prototype.getName = () => {
    return "panel";
}
/*
const Panel = function (props) {
    let params = {
        filter: [],
        sort: []
    }
    const panelDefault = () => {
        let params = {
            filter: [],
            sort: [],
        }

        const setParams = (type, data) => {
            params[type].push(data);
        }

        const update = (updater) => {
            update(params);
        }
        return {
            setParams,
            update
        }
    }
    const defaulter = panelDefault();
    const renderChild = () => {
        console.log(props.children);
        return React.Children.map(props.children, item => {
            if ( item.type.name === "Filter" ) {
                defaulter.setParams("filter", props.default);
                return React.cloneElement(item,
                    {
                        handleChange: props.handleFilter
                    }
                )
            } 
            if ( item.type.name === "Sort" ) {
                defaulter.setParams("sort", props.default);
                return React.cloneElement(item,
                    {
                        handleChange: props.handleSort
                    }
                )
            }
            console.log(defaulter)
        });
    };
    return (
        <div className="list_filter">
            { renderChild() }
        </div>
    );

};*/
Panel.prototypes = {
    handleFilter: PropTypes.func,
    handleSort: PropTypes.func
};
export default Panel;

