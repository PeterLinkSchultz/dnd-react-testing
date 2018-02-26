import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checker extends Component {
    constructor(props) {
        super(props);
    }
    handleChange = () => {
        console.log("change checker");
        this.props.handleChange();
    }
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    value={this.props.value}
                    checked={this.state.checked}
                    name={this.props.name}
                    onChange={(e) => this.handleChange(e)} />
                <span>
                    {this.props.text}
                </span>
            </label>
        );
    }
}


Checker.prototypes = {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired
}

export default Checker;