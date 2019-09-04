import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Grid } from '@material-ui/core';
import Dashboard from './Dashboard/Dashboard';

export default class Admin extends Component {
    render() {
        console.log(this.props);

        return (
            <Layout>
                <Dashboard />
            </Layout>
        );
    }
}
