import React from 'react';
import {PostData} from '../../services/PostData';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        PostData('login', this.state).then ((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        });
    }

    
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
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