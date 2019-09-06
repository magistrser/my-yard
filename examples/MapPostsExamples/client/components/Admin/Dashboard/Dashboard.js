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
import Users from './Users/Users';
import Posts from './Posts/Posts';

export default class Dashboard extends Component {
    render() {
        console.log('---Dashboard renders');
        const { selectedDrawerItem } = this.props;
        return this.getBody(selectedDrawerItem);
    }

    getBody(selectedDrawerItem) {
        switch (selectedDrawerItem) {
            case 'users':
                return <Users />;
                break;
            case 'posts':
                return <Posts />;
                break;
            default:
                return <div />;
        }
    }
}
