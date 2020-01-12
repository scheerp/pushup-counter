import React from 'react';
import Routes from '../../routes';

export default class Notification extends React.Component {
    render () {
        return (
            <>
                <div className={`modal-overlay notification-${this.props.type}`}>
                    <p>{this.props.text}</p>
                    <a onClick={this.props.close}>Close</a>
                </div>
            </>
        )
    }
}