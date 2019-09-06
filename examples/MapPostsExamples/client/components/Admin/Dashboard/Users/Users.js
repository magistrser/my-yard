import React, { Component } from 'react';
import {
    Grid,
    Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import UserList from './UserList/UserList';
import UserDetails from './UserDetails/UserDetails';

class Users extends Component {
    render() {
        console.log('---Users render');
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <UserList />
                    </Paper>
                </Grid>

                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        <UserDetails />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Users;
