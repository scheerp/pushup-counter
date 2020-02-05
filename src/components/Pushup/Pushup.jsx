import React from 'react';
import { GetData } from '../../services/GetData';
import { PostPushupData, PostGoal } from '../../services/PostData';
import PushupButton from '../PushupButton/PushupButton'
import { Redirect } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Modal from 'react-modal';

export default class Pushup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pushupCount: 0,
            goal: 0,
            text: 'PUSH BITCH!',
            disableButton: false,
            sessionIsActive: true,
            logout: false,
            showMultipleInputModal: false,
            pushupAmount: 0,
            showGoalModal: false,
            displayNotification: false,
            notificationType: '',
            notificationText: ''
        }

        this.doPushup = this.doPushup.bind(this);
        this.doMultiplePushups = this.doMultiplePushups.bind(this);
        this.logout = this.logout.bind(this);
        this.closeMultipleInputModal = this.closeMultipleInputModal.bind(this);
        this.openMultipleInputModal = this.openMultipleInputModal.bind(this);
        this.closeGoalModal = this.closeGoalModal.bind(this);
        this.openGoalModal = this.openGoalModal.bind(this);
        this.setGoal = this.setGoal.bind(this);
        this.displayNotifications = this.displayNotifications.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.updateGoal = this.updateGoal.bind(this);
        this.updatePushupAmount = this.updatePushupAmount.bind(this);
    }

    displayNotifications(text, type) {
        this.setState({
            displayNotification: true,
            notificationType: type,
            notificationText: text
        });
    }

    closeNotification() {
        this.setState({ display: false });
    }

    componentWillMount() {
        GetData().then((result) => {
            let responseJson = result;

            if (responseJson) {
                this.setState({ pushupCount: result.pushupsDone, goal: result.goal });
                if (result.goal == 0) {
                    this.setState({ showGoalModal: true });
                }
            }
        }, (error) => {
            this.displayNotifications(`Something went wrong: ${error}`, 'error');
            console.error("Something went wrong:", error);
        });
    }

    closeMultipleInputModal() {
        this.setState({ showMultipleInputModal: false });
    }

    openMultipleInputModal() {
        this.setState({ showMultipleInputModal: true });
    }

    closeGoalModal() {
        this.setState({ showGoalModal: false });
    }

    openGoalModal() {
        this.setState({ showGoalModal: true });
    }

    logout() {
        sessionStorage.removeItem('userData');
        this.setState({ logout: true });
    }

    doPushup() {
        PostPushupData(1).then((result) => {
            this.setState({ sessionIsActive: false });
        }, (error) => {
            this.displayNotifications(`Something went wrong: ${error}`, 'error');
            console.error("Something went wrong:", error);
        });

        let pushupCount = this.state.pushupCount;

        pushupCount++;

        this.setState({
            pushupCount,
            disableButton: true
        })

        setTimeout(function () { this.setState({ disableButton: false }) }.bind(this), 1000);
    }

    doMultiplePushups() {
        PostPushupData(this.state.pushupAmount);
        this.setState({ pushupCount: Number(this.state.pushupCount) + Number(this.state.pushupAmount) });
        this.setState({ showMultipleInputModal: false });
    }

    updatePushupAmount(e) {
        this.setState({ pushupAmount: e.target.value });
    }

    updateGoal(e) {
        this.setState({ goal: e.target.value });
    }

    setGoal() {
        PostGoal(this.state.goal);
        this.setState({ showGoalModal: false });
        this.setState({ showMultipleInputModal: false });
    }

    render() {
        if (this.state.logout) {
            this.setState({ logout: false });
            return (<Redirect to={'/'} />)
        }
        if (!sessionStorage.getItem('userData')) {
            return (<Redirect to={'/'} />)
        }
        return (
            <>
                <Modal
                    isOpen={this.state.showMultipleInputModal}
                    contentLabel="Add pushups"
                >
                    <div className="modal">
                        <h3 className="modal-title">ENTER AMOUNT</h3>
                        <input className="input" type="number" onChange={this.updatePushupAmount} placeholder={this.props.placeholder}></input>
                        <button className='amount-button' onClick={this.doMultiplePushups}>SUBMIT</button>
                        <button className='amount-button' onClick={this.closeMultipleInputModal}>Cancel</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.showGoalModal}
                    contentLabel="set goal"
                >
                    <div className="modal">
                        <h3 className="modal-title">SET GOAL</h3>
                        <input className="input" type="number" onChange={this.updateGoal} placeholder={this.props.placeholder}></input>
                        <button className='amount-button' onClick={() => this.setGoal(this.state.pushups)}>Submit</button>
                        <button className='amount-button' onClick={this.closeGoalModal}>Close Modal</button>
                    </div>
                </Modal>

                <div className="header-bar">
                    <a href='/ranking' className='header-item ranking-button'>🥇 RANKING</a>
                    <button className='header-item logout-button' onClick={this.logout}>Logout</button>
                </div>

                <h1>PUSHUPS<br /> {this.state.pushupCount} / {this.state.goal}</h1>
                <PushupButton doPushupAction={this.doPushup} isEnalbed={this.state.disableButton} />
                <button onClick={this.openMultipleInputModal} className='amount-button'>ENTER AMOUNT</button>
            </>
        );
    }
}
