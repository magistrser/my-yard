import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import './App.css';
import PostsMap from '../PostsMap/PostsMap';

export default class App extends Component {
    constructor() {
        super();
    }
    state = {
        isAuthenticated: false,
        user: null,
        // TODO: Maybe add isLoaded here to prevent redundant rendering
    };

    async componentDidMount() {
        try {
            const { data: authResult } = await axios.get('/api/check-authentication');
            this.setState({ ...authResult });
        } catch (err) {
            console.error(err);
            this.setState({ isAuthenticated: false });
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
