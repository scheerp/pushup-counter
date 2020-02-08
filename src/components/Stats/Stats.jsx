import React from 'react';
import { GetData } from '../../services/GetData';
import { PostPushupData, PostGoal } from '../../services/PostData';
import PushupButton from '../PushupButton/PushupButton'
import { Redirect } from 'react-router-dom';
import Notification from '../Notification/Notification';
import Modal from 'react-modal';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionIsActive: true,
            logout: false,
        }

        this.logout = this.logout.bind(this);
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

    logout() {
        sessionStorage.removeItem('userData');
        this.setState({ logout: true });
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
                <div className="header-bar">
                    <a href='/ranking' className='header-item ranking-button'>🥇 RANKING</a>
                    <button className='header-item logout-button' onClick={this.logout}>Logout</button>
                </div>

                <h1>STATS</h1>
            </>
        );
    }
}
