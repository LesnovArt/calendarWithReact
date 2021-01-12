import React, { Component } from 'react';
import styles from './errorBoundary.module.scss';

export default class  ErrorBoundary extends Component {

    constructor(props) {
        super(props);
    }

    componentDidCatch(error, errorInfo) {
        this.props.toggleError();
        this.props.togglePopup();
    }

    render() {
        // if(this.props.hasError){
        //     return (
        //         <div className="error-wrapper">
        //             {/*<img src="https://images.app.goo.gl/oUrTssJQU5sNgnKy7" alt=""/>*/}
        //             Вай мэээ.... Братан, всё сломалось
        //         </div>
        //     )
        // }

        return  this.props.children
    }
}
