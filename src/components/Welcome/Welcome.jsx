import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        if (sessionStorage.getItem('userData')) {
            return (<Redirect to={'/pushup'} />)
        }

        return (
            <div className="welcome-screen">
                <h2>WELCOME</h2>
                <h3>PUSHUPS-CREW</h3>
                <h4>🏋🏻‍♂️</h4>
                <div className="welcome-buttons">
                    <a className='amount-button' href='/login'>Login</a>
                    <a className='amount-button' href='/signup'>Signup</a>
                </div>
            </div>
        )
    }
}
