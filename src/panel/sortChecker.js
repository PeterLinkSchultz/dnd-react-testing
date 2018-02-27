import React from 'react';
import PropTypes from 'prop-types';
import Checker from './checker';

class SortChecker extends Checker {
    constructor(props) {
        super(props);
        this.state = {
            values: props.values,
            name: props.name,
            index: props.index,
            value: props.default,
            checked: props.values.indexOf(props.default) === 1 ? true : false
        }
    }

    handleChange = (e) => {
        let value;
        if ( this.state.value !== undefined && this.state.value !== false ) {
            value = this.state.values.filter( item => {
                return item !== this.state.value;
            });
            value = value[0];
        } else {
            value = this.state.values[0];
        }
        let checked = this.state.checked ? false : true;
        this.setState({ value, checked });
        this.props.handleChange(this.state.name, value, this.state.index);
    }
    render() {
        return super.render();
    }
}

SortChecker.prototypes = {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired
}

export default SortChecker;