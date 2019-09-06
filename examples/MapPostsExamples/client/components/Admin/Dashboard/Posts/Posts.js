import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Post from '../../../Post/Post';

export default class Posts extends Component {
    render() {
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>{/* <PostList /> */}</Paper>
                </Grid>

                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        {
                            /* <PostPreview /> */
                            <Post postId="69b7c7eb-8e44-4f24-9fa1-fcdf3e3773dc" />
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
