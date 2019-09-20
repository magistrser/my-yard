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
import axios from 'axios';

class Users extends Component {
    state = {
        users: null,
    };

    async componentDidMount() {
        await this.loadUser();
    }

    loadUser = async () => {
        console.log('-----');
        const { data: users } = await axios.get('/api/get-users');
        this.setState({ users });
    };

    render() {
        const { id } = this.props;

        return (
            this.state.users && (
                <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                    <Grid item xs={4} style={{ height: '100%' }}>
                        <Paper style={{ height: '80%' }}>
                            <UserList selectedUserId={id} users={this.state.users} />
                        </Paper>
                    </Grid>

                    <Grid item xs={8} style={{ height: '100%' }}>
                        <Paper style={{ height: '80%', position: 'relative' }}>
                            <UserDetails user={this.state.users.find(u => u.id === id)} updateUserInfo={() => this.loadUser()} />
                        </Paper>
                    </Grid>
                </Grid>
            )
        );
    }
}

export default Users;
