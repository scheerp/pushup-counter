import React from 'react';
import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Pushup from './components/Pushup/Pushup'
import Ranking from './components/Ranking/Ranking'
import NotFound from './components/NotFound/NotFound'

let Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Welcome}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/pushup' component={Pushup}></Route>
            <Route path='/ranking' component={Ranking}></Route>
            <Route path='*' component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;