import React from 'react';
import {PostData} from '../../services/PostData';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    register(){
        PostData('register', this.state).then ((result) => {
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
                <h1>Signup</h1>
                <label>Username</label>
                <input type='text' name='username' placeholder='Username' onChange={this.onChange} />
                <label>Email</label>
                <input type='email' name='email' placeholder='Email' onChange={this.onChange} />
                <label>Password</label>
                <input type='password' name='password' placeholder='Password' onChange={this.onChange}/>
                <input type='submit' value='register' className='button' onClick={this.register}/>
            </>
        )
    }
}