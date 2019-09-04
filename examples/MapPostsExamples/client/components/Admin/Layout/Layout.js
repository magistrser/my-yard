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
import { withRouter, Link, NavLink, Route } from 'react-router-dom';
import Admin from '../Admin';

const DRAWER_WIDTH = 180;

class Layout extends Component {
    constructor(props) {
        super(props);

        const path = props.location.pathname.split('/');
        //console.log(path); // ["", "admin", "users", "1"]

        this.state = {
            selectedDrawerItem: path[2],
            selectedTabValue: 0,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
        }
    }

    onDrawerButtonClick = ({ currentTarget: { id } }) => {
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
                    <main style={{ flexGrow: 1, padding: 10, height: '100%' }}>
                        {React.Children.map(this.props.children, child =>
                            React.cloneElement(child, {
                                ...this.state,
                            })
                        )}
                    </main>
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
                    <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem button id="users" selected={this.state.selectedDrawerItem == 'users'} onClick={this.onDrawerButtonClick}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem button id="posts" selected={this.state.selectedDrawerItem == 'posts'} onClick={this.onDrawerButtonClick}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Posts" />
                        </ListItem>
                    </Link>
                    <Link to="/admin/comments" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    </Link>
                </List>
                <Divider />
            </Drawer>
        );
    }

    getTabs(currentDrawerOption) {
        let tabs = null;

        switch (currentDrawerOption) {
            case 'users':
                break;
            case 'posts':
                break;
            case 'comments':
                break;
        }

        return (
            currentDrawerOption && (
                <Tabs
                    value={this.state.selectedTabValue}
                    onChange={(ev, tabVal) => this.setState({ selectedTabValue: tabVal })}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    {tabs}
                </Tabs>
            )
        );
    }
}

export default withRouter(Layout);
