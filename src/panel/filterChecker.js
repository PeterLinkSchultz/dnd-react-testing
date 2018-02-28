import PropTypes from 'prop-types';
import Checker from './checker';

class FilterChecker extends Checker {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            checked: props.default,
            type: props.type
        }
    }
    handleChange = (e) => {
        let checked = this.state.checked ? false : true;
        this.props.handleChange(this.state.name, this.state.value, this.state.type);
        this.setState({ checked });
    }
    render() {
        return super.render(this.props.value);
    }
}

FilterChecker.prototypes = {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired
}

export default FilterChecker;