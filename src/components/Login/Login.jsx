import React from 'react';
import {PostUserData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import Notification from '../Notification/Notification'

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false,
            showGoalModal: false,
            displayNotification: false,
            notificationType: '',
            notificationText: ''
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.displayNotifications = this.displayNotifications.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    displayNotifications(text, type) {
        this.setState({
            displayNotification: true,
            notificationType: type,
            notificationText: text
        });
    }

    closeNotification(){
        this.setState({display: false});
    }

    login(){
        PostUserData('login', this.state).then ((result) => {
            let responseJson = result;
                sessionStorage.setItem('userData', JSON.stringify(responseJson.data));
                this.setState({redirectToReferrer: true});
        }, (error) => {
            this.displayNotifications(`Something went wrong: ${error}`, 'error');
            console.error("Something went wrong:", error);
        });
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')){
            return (<Redirect to={'/pushup'}/>)
        }
        return (
            <>
                {this.state.displayNotification && 
                <Notification
                    text={this.state.notificationText}
                    type={this.state.notificationType}
                    close={this.closeNotification}
                />}
                <h1>Login</h1>
                <label>Username</label>
                <input type='text' name='username' placeholder='Username' onChange={this.onChange} />
                <label>Password</label>
                <input type='password' name='password' placeholder='Password' onChange={this.onChange}/>
                <input type='submit' value='login' className='button' onClick={this.login}/>
            </>
        )
    }
}