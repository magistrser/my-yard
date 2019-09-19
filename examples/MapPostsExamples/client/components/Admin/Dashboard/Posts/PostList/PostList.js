import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MenuItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@material-ui/core';
import PostFilters from '../PostFilters/PostFilters';

export default class PostList extends Component {
    render() {
        const selectedPostId = this.props.id;
        return (
            <Paper style={{ width: '100%' }}>
                <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                    <Grid item>
                        <PostFilters />
                    </Grid>
                    <Grid item style={{ overflowY: 'auto' }}>
                        <List dense>
                            {this.props.posts?.map(post => {
                                return (
                                    <Link key={post.id} to={`/admin/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem button selected={post.id == selectedPostId}>
                                            <ListItemText primary={'Title ' + post.title} secondary={post.text.slice(0, 50)} />
                                        </MenuItem>
                                    </Link>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
