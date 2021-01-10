import React, { Component } from 'react';
import styles from './errorBoundary.module.scss';

export default class  ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render() {
        if(this.state.hasError){
            return (
                <div className="error-wrapper">

                </div>
            )
        }

        return  this.props.children
    }
}
