import React from 'react';
import {PostUserData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        PostUserData('login', this.state).then ((result) => {
            let responseJson = result;
            if(responseJson){
                sessionStorage.setItem('userData', JSON.stringify(responseJson.data));
                this.setState({redirectToReferrer: true});
                }
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