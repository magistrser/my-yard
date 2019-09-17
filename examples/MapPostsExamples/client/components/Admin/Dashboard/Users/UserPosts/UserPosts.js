import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import PostFilters from '../../Posts/PostFilters/PostFilters';
import PostList from '../../Posts/PostList/PostList';

export default class UserPosts extends Component {
    render() {
        return (
            <Paper style={{ width: '100%' }}>
                <PostList />
            </Paper>
        );
    }
}
