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
    render(icon = false, text = false) {
        return (
            <div className="checker">
                <input
                    type="checkbox"
                    id={this.props.name+"-"+this.props.value}
                    value={this.props.value}
                    checked={this.state.checked}
                    name={this.props.name}
                    onChange={(e) => this.handleChange(e)} />
                <label 
                    htmlFor={this.props.name+"-"+this.props.value}
                    className={`label ${icon ? "label-icon icon icon-" + icon : "label-default"}`}>
                    {text ? this.props.text : ""}
                </label>
            </div>
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