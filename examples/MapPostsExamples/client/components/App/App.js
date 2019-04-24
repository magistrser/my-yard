import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import './App.css';
import PostsMap from '../PostsMap/PostsMap';

export default class App extends Component {
    constructor() {
        super();
    }
    state = {
        isAuthorized: false,
        // TODO: Maybe add isLoaded here to prevent redundant rendering
    };

    async componentDidMount() {
        try {
            const authResult = await axios.get('/api/check-authentication');
            this.setState({ isAuthorized: authResult.data.isAuthenticated });
        } catch (err) {
            console.log(err);
            this.setState({ isAuthorized: false });
        }
    }

    render() {
        return (
            <Router>
                <>
                    <Header {...this.state} />
                    <Switch>
                        <Route component={() => <PostsMap {...this.state} />} />
                    </Switch>
                </>
            </Router>
        );
    }
}
