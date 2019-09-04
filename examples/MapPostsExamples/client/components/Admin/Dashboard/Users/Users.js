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
import UserFilters from './UserFilters/UserFilters';
import UserList from './UserList/UserList';
import UserDetails from './UserDetails/UserDetails';

class Users extends Component {
    render() {
        console.log('---Users render');
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={7} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                            <Grid item>
                                <UserFilters />
                            </Grid>
                            <Grid item style={{ overflowY: 'auto' }}>
                                <UserList users={[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 134]} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        <UserDetails userInfo={{ foo: 1 }} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Users;
