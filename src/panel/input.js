import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.default ? props.default : ""
        };
    }
    handleChange = (e) => {
        let value = e.target.value;
        this.props.handleChange(this.state.name, value);
        this.setState({ value });
    }
    render() {
        return (
            <input
                type="text"
                name={this.state.name}
                value={this.state.value}
                placeholder={this.props.text}
                onChange={(e) => this.handleChange(e)} />
        );
    }
}
Input.prototypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    default: PropTypes.string,
    text: PropTypes.string,
}

export default Input;