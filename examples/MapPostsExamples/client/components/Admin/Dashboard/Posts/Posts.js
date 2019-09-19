import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import Post from '../../../Post/Post';
import PostList from './PostList/PostList';

export default class Posts extends Component {
    state = {
        posts: null,
    };

    async componentDidMount() {
        const { data: posts } = await axios.get('/api/get-posts');
        this.setState({ posts });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!this.state.posts) {
            const { data: posts } = await axios.get('/api/get-posts');
            this.setState({ posts });
        }
    }

    render() {
        const { id } = this.props;
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', overflowY: 'auto' }}>
                        <PostList selectedPostId={id} posts={this.state.posts} />
                    </Paper>
                </Grid>
                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative', padding: 5, overflowY: 'auto', overflowX: 'hidden' }}>
                        {id ? (
                            <Post
                                key={id}
                                postId={id}
                                isAuthenticated
                                closePost={() => console.log('close post')}
                                deletePost={() => console.log('delete post')}
                            />
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
