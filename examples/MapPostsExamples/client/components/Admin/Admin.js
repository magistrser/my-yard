import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';

import Users from './Dashboard/Users/Users';
import Posts from './Dashboard/Posts/Posts';
//import Comments from "./Dashboard/Comments/Comments";

export default class Admin extends Component {
    routeComponent(component) {
        return ({ match }) => {
            const id = match?.params?.id;
            return React.cloneElement(component, {
                id,
            });
        };
    }

    render() {
        console.log('---Admin renders');
        return (
            <Layout>
                <Route path="/admin/users/:id?" exact render={this.routeComponent(<Users />)} />
                <Route path="/admin/posts/:id?" exact render={this.routeComponent(<Posts />)} />
                <Route
                    path="/admin/comments/:id?"
                    exact
                    render={({ match }) => {
                        const id = match?.params?.id;
                        return <h1>comments {id}</h1>;
                    }}
                />
            </Layout>
        );
    }
}
