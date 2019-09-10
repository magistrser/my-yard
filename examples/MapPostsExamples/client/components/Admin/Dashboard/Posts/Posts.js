import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Post from '../../../Post/Post';

export default class Posts extends Component {
    render() {
        const { id } = this.props;
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>{/* <PostList /> */}</Paper>
                </Grid>
                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        {id ? (
                            <Post postId={id} />
                        ) : (
                            <Typography
                                variant="h4"
                                color="textSecondary"
                                style={{ position: 'relative', textAlign: 'center', top: '50%' }}
                            >
                                Select post to preview...
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
