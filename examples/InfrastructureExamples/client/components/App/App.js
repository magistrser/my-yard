import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import './App.css';

export default class App extends Component {
    constructor() {
        super();
    }
    state = {
        isAuthorized: false,
    };

    componentDidMount() {
        axios
            .get('/api/check-authentication') // How secure is this?
            .then(res => {
                console.log(res);
                this.setState({ isAuthorized: res.data.isAuthenticated });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isAuthorized: false });
            });
    }

    render() {
        return (
            <Router>
                <>
                    <Header {...this.state} />
                    <Switch>
                        <Route component={Posts} />
                    </Switch>
                </>
            </Router>
        );
    }
}
