import React from 'react';
import { GetData, GetRanking } from '../../services/GetData';
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
            },
            lineGraphDataAll: {
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
                result.daily.forEach((element, index) => {
                    let date = new Date(element.date);

                    days.push(`${date.getDate()} Feb`);

                    if (date.getDate() === index + 1) {
                        pushups.push(element.pushups);
                    } else {
                        pushups.push(0);
                    }
                });

                data[0].data = pushups;
                this.setState({ lineGraphData: { labels: days, datasets: data } });
            }
        }, (error) => {
            this.displayNotifications(`Something went wrong: ${error}`, 'error');
            console.error("Something went wrong:", error);
        });

        GetRanking(params.get('id')).then((result) => {
            let responseJson = result;
            let days = [];
            let dataArray = [];
            if (responseJson) {
                result.forEach(user => {
                    let pushups = [];
                    let data =
                    {
                        label: user.username,
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 1,
                        data: []
                    };
                    user.daily.forEach((element, index) => {
                        let date = new Date(element.date);

                        index === 0 && days.push(`${date.getDate()} Feb`);
                        console.log('index + 1:', index + 1)
                        console.log('date:', element.date.slice(-2))

                        if (element.date.slice(-2) == index + 1) {
                            pushups.push(element.pushups);
                        } else {
                            pushups[index] = {};
                            pushups.push(0);
                        }

                        data.data = pushups;
                    });
                    dataArray.push(data);

                })
                console.log('dataArray', dataArray)
                this.setState({ lineGraphDataAll: { datasets: dataArray, labels: days } });

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
                    {console.log('tableDataAll:', this.state.lineGraphDataAll)}
                    {console.log('tableData:', this.state.lineGraphData)}

                    <Line data={this.state.lineGraphDataAll} legend={{
                        display: true,
                        position: 'bottom'
                    }} />

                </div>
            </>
        );
    }
}
