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
import Filters from '../../../Filters/Filters';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                name: '',
                id: '',
                email: '',
                vk: '',
            },
        };
    }

    filterUsers(users) {
        if (!users) return users;
        const { name, id, email, vk } = this.state.filters;
        return users
            .filter(u => u.fullName.toLowerCase().includes(name.toLowerCase()))
            .filter(u => u.id.includes(id))
            .filter(u => u.email.toLowerCase().includes(email.toLowerCase()))
            .filter(u => u.vkProfileUrl.toLowerCase().includes(vk.toLowerCase()));
    }

    render() {
        const { selectedUserId, users } = this.props;
        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    <Filters filters={this.state.filters} onChange={filters => this.setState({ filters })} />
                </Grid>
                <Grid item style={{ overflowY: 'auto' }}>
                    <List dense>
                        {this.filterUsers(users).map(user => {
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
