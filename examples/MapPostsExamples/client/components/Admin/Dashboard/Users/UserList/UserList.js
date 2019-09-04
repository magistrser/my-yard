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
        return (
            <List dense>
                {this.props.users.map(val => {
                    return (
                        <Link key={val} to={`/admin/users/${val}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {}
                            <MenuItem button selected={val == this.props.location.pathname.split('/').slice(-1)[0]}>
                                <ListItemAvatar>
                                    <Avatar>AVA</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'%USERNAME%'} />
                            </MenuItem>
                        </Link>
                    );
                })}
            </List>
        );
    }
}

export default withRouter(UserList);
