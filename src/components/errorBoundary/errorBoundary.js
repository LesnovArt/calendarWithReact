import { Component } from 'react';
import PropTypes from "prop-types";

export default class  ErrorBoundary extends Component {

    constructor(props) {
        super(props);
            this.showError = props.showError;
            this.togglePopup = props.togglePopup;
    };

    componentDidCatch(error, errorInfo) {
        this.props.showError();
        this.props.togglePopup();
    };

    render() {
        return  this.props.children
    }
};

ErrorBoundary.propTypes = {
    children: PropTypes.object,
    showError: PropTypes.func,
    togglePopup: PropTypes.func
};

ErrorBoundary.defaultProps = {
  children: {},
  showError: () => {},
  togglePopup: () => {}
};
