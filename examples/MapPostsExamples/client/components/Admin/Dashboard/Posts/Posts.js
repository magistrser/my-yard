import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import Post from '../../../Post/Post';
import PostList from './PostList/PostList';
import { withRouter } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: null,
    };

    async componentDidMount() {
        const { data: posts } = await axios.get('/api/get-posts');
        this.setState({ posts });
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log('suka');
        if (!this.state.posts) {
            const { data: posts } = await axios.get('/api/get-posts');
            this.setState({ posts });
        }
    }

    deletePost = async postId => {
        try {
            await axios.delete('/api/delete-post', {
                data: {
                    id: postId,
                },
            });
            this.setState({ posts: null }, () => this.props.history.push('/admin/posts'));
        } catch (err) {
            console.error(err);
        }
    };

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
                                deletePost={this.deletePost}
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

export default withRouter(Posts);
