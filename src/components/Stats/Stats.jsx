import React from 'react';
import { GetData } from '../../services/GetData';
import { Redirect } from 'react-router-dom';
import Notification from '../Notification/Notification';
import { Line } from 'react-chartjs-3';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            sessionIsActive: true,
            lineGraphData: {
                labels: [],
                datasets: [
                ]
            }
        }

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search)

        GetData(params.get('id')).then((result) => {
            let responseJson = result;

            if (responseJson) {
                let days = [];
                let pushups = [];
                let data =
                    [{
                        label: 'Pushups by day',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: 0
                    }];
                result.daily.forEach(element => {
                    let date = new Date(element.date);
                    days.push(`${date.getDate()} Feb`);

                    pushups.push(element.pushups);
                });

                data[0].data = pushups;
                this.setState({ lineGraphData: { labels: days, datasets: data } });
            }
        }, (error) => {
            this.displayNotifications(`Something went wrong: ${error}`, 'error');
            console.error("Something went wrong:", error);
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
                    <a href='/ranking' className='header-item ranking-button'>🥇 RANKING</a>
                    <button className='header-item logout-button' onClick={this.logout}>Logout</button>
                </div>

                <h1>STATS</h1>
                <div className='stats-wrapper'>
                    <Line data={this.state.lineGraphData} legend={{
                        display: true,
                        position: 'bottom'
                    }} />
                </div>
            </>
        );
    }
}
