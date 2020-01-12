import React from 'react';
import {GetRanking} from '../../services/GetData';
import {Redirect} from 'react-router-dom';

export default class Ranking extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            sessionIsActive: true,
            logout: false
        }
        
        this.logout = this.logout.bind(this);
    }
    componentWillMount(){
        GetRanking().then ((result) => {
            let responseJson = result;
            this.setState({ranking: result});
            console.log(result);
        }, (error) => {
            // this.displayNotifications(`Something went wrong: ${error}`, 'error');
            // console.error("Something went wrong:", error);
        });
    }

    logout () {
        sessionStorage.removeItem('userData');
        this.setState({logout: true});
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
                <ul className="ranking-list">
                    {!!this.state.ranking && this.state.ranking.map(user => (
                        user.username != 'Admin' && (
                                <li className="ranking-list-item">
                                    <span>{user.username}</span>
                                    <span>{user.pushups} / {user.goal}</span>
                                </li>
                        )
                    )
                    )}
                </ul>
                <button onClick={this.logout}>Logout</button>
                <a href='/pushup' class='button'>Pushup</a>
                {/* <h1>Pushups: <br/> {this.state.pushupCount} / {this.state.goal}</h1> */}
            </>
        );
    }
}