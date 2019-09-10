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
        const { id } = this.props;

        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <UserList id={id} />
                    </Paper>
                </Grid>

                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        <UserDetails id={id} key={id} /> {/* change key to rerender */}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Users;
