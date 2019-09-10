import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MenuItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

export default class PostList extends Component {
    render() {
        const selectedPostId = this.props.id;
        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    {/* <PostFilters /> */} <p>PostFilters</p>
                </Grid>
                <Grid item style={{ overflowY: 'auto' }}>
                    <List dense>
                        {[
                            'b07a0157-df23-4839-8116-13b73807ade2',
                            'f24c4380-7cb6-4f6b-b3e6-e0df34fcdc09',
                            '22421e2c-beb6-4e02-9d24-146c81eb9f7e',
                        ].map(val => {
                            return (
                                <Link key={val} to={`/admin/posts/${val}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem button selected={val == selectedPostId}>
                                        <ListItemText primary={'Title ' + val} secondary={'Text preview...'} />
                                    </MenuItem>
                                </Link>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>
        );
    }
}
