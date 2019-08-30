import React, { Component } from 'react';
import Layout from './Layout/Layout';
import { Grid } from '@material-ui/core';

export default class Admin extends Component {
    render() {
        console.log(this.props);

        return (
            <Layout>
                <Grid container justify="flex-start" spacing={3} style={{ height: '100%' }}>
                    <Grid item style={{ borderRight: '2px solid gray' }} xs={7}>
                        <h1>Content</h1>
                    </Grid>
                    <Grid item xs={5}>
                        <p>Selected user info, post preview, etc...</p>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}
