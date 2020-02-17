import React from 'react';
import { GetRanking } from '../../services/GetData';
import { Redirect } from 'react-router-dom';

export default class Ranking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionIsActive: true,
            logout: false,
            daysInChallenge: 0
        }

        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        GetRanking().then((result) => {
            let responseJson = result;
            result.forEach((element, index) => {
                let date = new Date(element.daily[0].date);
                let today = new Date();
                result[index].daysInChallenge = 29 - date.getDate() + 1;
                result[index].dailyGoal = Math.ceil(result[index].goal / result[index].daysInChallenge);
                result[index].dailyGoalReached = result[index].dailyGoal * today.getDate() - result[index].pushups <= 0;
            });

            console.log(result);
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
                    <a href='/pushup' className='header-item ranking-button'>💪🏻 PUSHUPS</a>
                    <button className='header-item logout-button' onClick={this.logout}>Logout</button>
                </div>
                <h3 className="ranking">RANKING</h3>
                <ul className="ranking-list">
                    {!!this.state.ranking && this.state.ranking.map((user, index) => (
                        user.username != 'Admin' && (
                            <li className="ranking-list-item" id={index}>
                                <span>
                                    {index === 0 && <span>🥇</span>}
                                    {index === 1 && <span>🥈</span>}
                                    {index === 2 && <span>🥉</span>}
                                    <a className="bold" href={`/stats?id=${user.id}`}>{user.username}</a>
                                </span>
                                <span className="ranking-numbers"><span style={{ color: !user.dailyGoalReached && 'red' }}>{user.pushups}</span> / {user.goal}</span>
                            </li>
                        )
                    )
                    )}
                </ul>
            </>
        );
    }
}
