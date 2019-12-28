import React from 'react';
import PushupButton from '../PushupButton/PushupButton'

export default class Pushup extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            pushupCountToday: 0,
            pushupCountTotal: 1500,
            text: 'Push Bitch!!!',
            disableButton: false
        }

        this.doPushup = this.doPushup.bind(this);
    }

    doPushup(){
        let pushupCountToday = this.state.pushupCountToday;
        let pushupCountTotal = this.state.pushupCountTotal;

        pushupCountToday ++;
        pushupCountTotal ++;

        this.setState({
            pushupCountToday,
            pushupCountTotal,
            disableButton: true
        })
        
        setTimeout(function() {this.setState({disableButton: false})}.bind(this), 1000);

    }

    render () {
        return (
            <>
                <h1>Pushups Today: {this.state.pushupCountToday}</h1>
                <PushupButton doPushupAction={this.doPushup} isEnalbed={this.state.disableButton}/>
            </>
        );
    }
}