import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';

export default class UserPosts extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Paper>
                        <p>{'<PostFilters />'}</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <p>{'<PostList />'}</p>
                </Grid>
            </Grid>
        );
    }
}
