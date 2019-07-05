import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import './App.css';
import PostsMap from '../PostsMap/PostsMap';
import { withStyles } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { Provider } from '../../context';

const useStyles = theme => {
    console.log('theme>>', theme);
    return {
        cssClass: {
            cssProp1: 23,
        },
    };
};

class App extends Component {
    constructor(props) {
        super(props);
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
            this.setState({ isAuthenticated: false, user: null });
        }
    }

    getContext = () => {
        return { ...this.state };
    };

    render() {
        const { classes } = this.props;
        return (
            <Provider value={this.getContext()}>
                <Header {...this.state}>
                    <PostsMap {...this.state} />
                </Header>
            </Provider>
        );
    }
}

export default withStyles(useStyles)(App);
