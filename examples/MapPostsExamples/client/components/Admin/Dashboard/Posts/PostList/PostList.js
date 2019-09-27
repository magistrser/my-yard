import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MenuItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@material-ui/core';
import Filters from '../../../Filters/Filters';

export default class PostList extends Component {
    state = {
        filters: {
            author: '',
            userId: '',
            eventDateTime: '',
            id: '',
            latitude: '',
            longitude: '',
            text: '',
            timestamp: '',
        },
    };
    // TODO: I was doing something here
    filterPosts(posts) {
        if (!posts) return posts;
        const { author, userId, eventDateTime, id, latitude, longitude, text, timestamp } = this.state.filters;
        return posts
            .filter(p => p.author.toLowerCase().includes(author.toLowerCase()))
            .filter(p => p.userId.includes(userId))
            .filter(p => p.eventDateTime.includes(eventDateTime))
            .filter(p => p.id.includes(id))
            .filter(p => Math.abs(p.latitude - latitude) < 100)
            .filter(p => Math.abs(p.longitude - longitude) < 100)
            .filter(p => p.text.toLowerCase().includes);
    }

    render() {
        const selectedPostId = this.props.selectedPostId;
        return (
            <Paper style={{ width: '100%' }}>
                <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                    <Grid item>
                        <Filters filters={this.state.filters} onChange={filters => this.setState({ filters })} />
                    </Grid>
                    <Grid item style={{ overflowY: 'auto' }}>
                        <List dense>
                            {this.filterPosts(this.props.posts)?.map(post => {
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
