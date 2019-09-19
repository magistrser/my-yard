import React, { Component } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

export default class CommentsDetails extends Component {
    getCommentDetailsList(comment) {
        return Object.entries(comment).map(([key, val]) => (
            <Grid key={key} direction="column" item container justify="space-between">
                <Grid item>
                    <Typography>{key}</Typography>
                </Grid>
                <Grid item>
                    <TextField style={{ width: '100%' }} value={val || ''} onChange={null} />
                </Grid>
            </Grid>
        ));
    }

    render() {
        const { comment } = this.props;
        console.log('---comments', comment);
        return (
            !comment || (
                <Grid container direction="column" spacing={2} style={{ overflowY: 'auto' }}>
                    {this.getCommentDetailsList(comment)}
                </Grid>
            )
        );
    }
}
