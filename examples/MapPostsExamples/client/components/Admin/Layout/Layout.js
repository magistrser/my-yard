import React, { Component } from 'react';
import { CssBaseline, Toolbar, Drawer, ListItemIcon, ListItem, List, AppBar, Typography, ListItemText } from '@material-ui/core';
import { Group as GroupIcon, Comment as CommentIcon, Assignment as AssignmentIcon } from '@material-ui/icons';

const DRAWER_WIDTH = 180;

export default class Layout extends Component {
    state = {
        selectedMainDrawerItem: null,
    };

    onMainDrawerButtonClick = ev => {
        const { id } = ev.currentTarget;
        this.setState({
            selectedMainDrawerItem: id,
        });
    };

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                {this.appBar}
                {this.mainDrawer}
                <main style={{ flexGrow: 1, padding: 10 }}>
                    <div style={{ width: DRAWER_WIDTH, height: 64 }} />
                    {this.props.children}
                </main>
            </div>
        );
    }

    get appBar() {
        return (
            <AppBar position="fixed" style={{ zIndex: 2 }}>
                <Toolbar>
                    <Typography variant="h6">Admin panel</Typography>
                </Toolbar>
            </AppBar>
        );
    }

    get mainDrawer() {
        return (
            <Drawer variant="permanent" style={{ width: DRAWER_WIDTH, flexShrink: 0, zIndex: 1 }}>
                <div style={{ width: DRAWER_WIDTH, height: 64 }} />
                <List>
                    <ListItem
                        button
                        id="users"
                        selected={this.state.selectedMainDrawerItem == 'users'}
                        onClick={this.onMainDrawerButtonClick}
                    >
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem
                        button
                        id="posts"
                        selected={this.state.selectedMainDrawerItem == 'posts'}
                        onClick={this.onMainDrawerButtonClick}
                    >
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                    <ListItem
                        button
                        id="comments"
                        selected={this.state.selectedMainDrawerItem == 'comments'}
                        onClick={this.onMainDrawerButtonClick}
                    >
                        <ListItemIcon>
                            <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}
