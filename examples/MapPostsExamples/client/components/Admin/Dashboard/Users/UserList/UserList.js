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
        this.state = {
            selectedId: props.match?.params?.id,
            isLoading: true,
        };
        console.log('---ctor', this.state.selectedId);
    }

    componentDidMount() {
        console.log('--UserList mount', this.props.match.params);
    }

    render() {
        console.log('-----UserList render', this.props.match.params.id);

        const selectedUserId = this.props.match.params.id;
        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    <UserFilters />
                </Grid>
                <Grid item style={{ overflowY: 'auto' }}>
                    <List dense>
                        {[1, 2, 3, 4].map(val => {
                            return (
                                <Link key={val} to={`/admin/users/${val}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem button selected={val == selectedUserId}>
                                        <ListItemAvatar>
                                            <Avatar>AVA</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={'%USERNAME%'} />
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

export default withRouter(UserList);
