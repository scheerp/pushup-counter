import React from 'react';

export default class Welcome extends React.Component {
    render () {
        return (
            <>
                <h2>Welcome!</h2>
                <a href='/login' class='button'>Login</a>
                <a href='/signup' class='button primary'>Signup</a>
            </>
        )
    }
}