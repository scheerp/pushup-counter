import React from 'react';
import { GetRanking } from '../../services/GetData';
import { Redirect } from 'react-router-dom';

export default class Ranking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionIsActive: true,
            logout: false
        }

        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        GetRanking().then((result) => {
            let responseJson = result;
            this.setState({ ranking: result });
        }, (error) => {
            // this.displayNotifications(`Something went wrong: ${error}`, 'error');
            // console.error("Something went wrong:", error);
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
                    <a href='/pushup' className='header-item ranking-button'>💪🏻PUSHUPS</a>
                    <button className='header-item logout-button' onClick={this.logout}>Logout</button>
                </div>
                <h3 className="ranking">RANKING</h3>
                <ul className="ranking-list">
                    {!!this.state.ranking && this.state.ranking.map((user, index) => (
                        user.username != 'Admin' && (
                            <li className="ranking-list-item" id={index}>
                                <span>
                                    {index === 1 && <span>🥇</span>}
                                    {index === 2 && <span>🥈</span>}
                                    {index === 3 && <span>🥉</span>}
                                    <span className="bold">{user.username}</span>
                                </span>
                                <span>{user.pushups} / {user.goal}</span>
                            </li>
                        )
                    )
                    )}
                </ul>
            </>
        );
    }
}
