import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';

export default class Dashboard extends Component {
    render() {
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={7} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', overflowY: 'auto' }}>
                        <h1>Content</h1>
                        <p>bla bla ba</p>
                    </Paper>
                </Grid>
                <Grid item xs={5} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <p>Selected user info, post preview, etc...</p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
