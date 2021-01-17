import { Component } from 'react';

export default class  ErrorBoundary extends Component {

    constructor(props) {
        super(props);
    }

    componentDidCatch(error, errorInfo) {
        this.props.showError();
        this.props.togglePopup();
    }

    render() {
        return  this.props.children
    }
}
