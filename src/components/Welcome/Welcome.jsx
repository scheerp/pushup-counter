import React from 'react';
import {Redirect} from 'react-router-dom';

export default class Welcome extends React.Component {
    render () {
        if (sessionStorage.getItem('userData')){
            return (<Redirect to={'/pushup'}/>)
        }

        return (
            <>
                <h2>Welcome!</h2>
                <a href='/login' class='button'>Login</a>
                <a href='/signup' class='button primary'>Signup</a>
            </>
        )
    }
}