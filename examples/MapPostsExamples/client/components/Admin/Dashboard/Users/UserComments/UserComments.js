import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';

export default class UserComments extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Paper>
                        <p>{'<CommentFilters />'}</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <p>{'<CommentFilters />'}</p>
                </Grid>
            </Grid>
        );
    }
}
