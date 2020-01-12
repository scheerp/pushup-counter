import React from 'react';

export default class PushupButton extends React.Component{
    render () {
        return (
            <>
                <button className="pushupButton" onClick={this.props.doPushupAction} disabled={this.props.isEnalbed}>
                    <p>Push Bitch!!!</p>
                </button>
            </>
        );
    }
}