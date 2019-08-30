import React, { Component } from 'react';
import {
    CssBaseline,
    Toolbar,
    Drawer,
    ListItemIcon,
    ListItem,
    List,
    AppBar,
    Typography,
    ListItemText,
    Tabs,
    Tab,
    Divider,
} from '@material-ui/core';
import { Group as GroupIcon, Comment as CommentIcon, Assignment as AssignmentIcon } from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';

const DRAWER_WIDTH = 180;

class Layout extends Component {
    constructor(props) {
        super(props);

        const path = props.location.pathname.split('/');
        console.log(path); // TODO: deal with paths

        this.state = {
            selectedDrawerItem: null,
            selectedTabValue: 0,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            console.log('location updated ', this.props.location);
        }
    }

    onDrawerButtonClick = ev => {
        const { id } = ev.currentTarget;
        console.log(id);
        this.setState({ selectedDrawerItem: id, selectedTabValue: 0 });
    };

    render() {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <CssBaseline />
                {this.appBar}
                {this.drawer}
                <div style={{ width: '100%', height: '100%' }}>
                    <div style={{ width: DRAWER_WIDTH, height: 64 }} />
                    <div style={{ height: 64 }}>{this.getTabs(this.state.selectedDrawerItem)}</div>
                    <Divider />
                    <main style={{ flexGrow: 1, padding: 10, height: '100%' }}>{this.props.children}</main>
                </div>
            </div>
        );
    }

    get appBar() {
        return (
            <AppBar position="fixed" style={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6">Admin panel</Typography>
                </Toolbar>
            </AppBar>
        );
    }

    get drawer() {
        return (
            <Drawer variant="permanent" style={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
                <div style={{ width: DRAWER_WIDTH, height: 64 }} />
                <List>
                    <ListItem button id="users" selected={this.state.selectedDrawerItem == 'users'} onClick={this.onDrawerButtonClick}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button id="posts" selected={this.state.selectedDrawerItem == 'posts'} onClick={this.onDrawerButtonClick}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                    <ListItem
                        button
                        id="comments"
                        selected={this.state.selectedDrawerItem == 'comments'}
                        onClick={this.onDrawerButtonClick}
                    >
                        <ListItemIcon>
                            <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        );
    }

    getTabs(currentDrawerOption) {
        let label;

        switch (currentDrawerOption) {
            case 'users':
                label = 'user';
                break;
            case 'posts':
                label = 'post';
                break;
            case 'comments':
                label = 'comment';
                break;
        }
        console.log(label);

        return (
            label && (
                <Tabs
                    value={this.state.selectedTabValue}
                    onChange={(ev, tabVal) => this.setState({ selectedTabValue: tabVal })}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label={label + ' option 1'} />
                    <Tab label={label + ' option 2'} />
                    <Tab label={label + ' option 3'} />
                    <Tab label={label + ' option 4'} />
                    <Tab label={label + ' option 5'} />
                </Tabs>
            )
        );
    }
}

export default withRouter(Layout);
