import React from 'react';
import {GetData} from '../../services/GetData';
import {PostPushupData, PostGoal} from '../../services/PostData';
import PushupButton from '../PushupButton/PushupButton'
import {Redirect} from 'react-router-dom';
import Modal from '../Modal/Modal';

export default class Pushup extends React.Component{
    constructor (props) {
        super(props);

        console.log(JSON.parse(sessionStorage.getItem('userData')).goal);

        this.state = {
            pushupCount: 0,
            goal: 0,
            text: 'Push Bitch!!!',
            disableButton: false,
            sessionIsActive: true,
            logout: false,
            showMultipleInputModal: false,
            showGoalModal: false
        }

        this.doPushup = this.doPushup.bind(this);
        this.doMultiplePushups = this.doMultiplePushups.bind(this);
        this.logout = this.logout.bind(this);
        this.closeMultipleInputModal = this.closeMultipleInputModal.bind(this);
        this.setGoal = this.setGoal.bind(this);
    }

    componentWillMount(){
        GetData().then ((result) => {
            let responseJson = result;
        
            if(responseJson){
                this.setState({pushupCount: result.pushupsDone, goal: result.goal});
                if(result.goal == 0){
                    this.setState({showGoalModal: true});
                }
            }
        });
    }

    closeMultipleInputModal() {
        this.setState({showMultipleInputModal: false});
    }
    
    logout () {
        sessionStorage.removeItem('userData');
        this.setState({logout: true});
    }

    doPushup(){
        PostPushupData(1).then ((result) => {
            if(typeof result == 'string'){
                this.setState({sessionIsActive: false});
            }
        });

        let pushupCount = this.state.pushupCount;

        pushupCount ++;

        this.setState({
            pushupCount,
            disableButton: true
        })
        
        setTimeout(function() {this.setState({disableButton: false})}.bind(this), 1000);
    }

    doMultiplePushups(PushupCount){
        PostPushupData(PushupCount);
        this.setState({showMultipleInputModal: false});
    }

    setGoal(goal) {
  console.log(goal);
        PostGoal(goal);
        this.setState({showGoalModal: false});
    }

    render () {
        if (this.state.logout){
            this.setState({logout: false});
            return (<Redirect to={'/'}/>)
        }
        if (!sessionStorage.getItem('userData')){
            return (<Redirect to={'/'}/>)
        }
        return (
            <>
                {this.state.showMultipleInputModal && 
                <Modal
                    text="Add pushups"
                    placeholder='Pushups'
                    submit={this.doMultiplePushups}
                    cancel={this.closeMultipleInputModal}
                />}
                {this.state.showGoalModal && 
                <Modal
                    text="Set your Goal"
                    placeholder='Pushups'
                    submit={this.setGoal}
                />
                }
                <button onClick={this.logout}>Logout</button>
                <h1>Pushups done: {this.state.pushupCount}</h1>
                <PushupButton doPushupAction={this.doPushup} isEnalbed={this.state.disableButton}/>
            </>
        );
    }
}