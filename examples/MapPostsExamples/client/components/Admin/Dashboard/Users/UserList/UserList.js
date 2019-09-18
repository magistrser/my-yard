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
    MenuItem,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';
import UserFilters from '../UserFilters/UserFilters';

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedUserId, users } = this.props;
        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    <UserFilters />
                </Grid>
                <Grid item style={{ overflowY: 'auto' }}>
                    <List dense>
                        {users.map(user => {
                            return (
                                <Link key={user.id} to={`/admin/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem button selected={user.id == selectedUserId}>
                                        <ListItemAvatar>
                                            <Avatar src={user.userPic}>AVA</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.fullName} />
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

export default UserList;
