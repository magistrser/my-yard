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
import { withRouter } from 'react-router-dom';
import UserPosts from '../UserPosts/UserPosts';
import UserComments from '../UserComments/UserComments';
import UserInfo from '../UserInfo/UserInfo';

const panels = {
    USER_PANEL: 'USER_PANEL',
    POSTS_PANEL: 'POSTS_PANEL',
    COMMENTS_PANEL: 'COMMENTS_PANEL',
};

class UserDetails extends Component {
    state = {
        selectedPanel: panels.USER_PANEL,
        userInfo: null,
    };

    componentDidMount() {
        this.loadUserInfo();
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.location.pathname !== prevProps.location.pathname) this.loadUserInfo();
    // }

    loadUserInfo() {
        const userId = this.props.id;

        // ...load user info ....
        if (userId) {
            this.setState({
                userInfo: {
                    id: userId,
                },
            });
        }
    }

    onPanelChange = panel => ev => this.state.userInfo && this.setState({ selectedPanel: panel });

    isExpanded(panel) {
        return !!this.state.userInfo && this.state.selectedPanel === panel;
    }

    render() {
        const { userInfo } = this.state;
        console.log('userInfo', userInfo);
        return (
            userInfo && (
                <>
                    <ExpansionPanel expanded={this.isExpanded(panels.USER_PANEL)} onChange={this.onPanelChange(panels.USER_PANEL)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>User</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <UserInfo userInfo={userInfo} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.isExpanded(panels.POSTS_PANEL)} onChange={this.onPanelChange(panels.POSTS_PANEL)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Posts</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <UserPosts />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.isExpanded(panels.COMMENTS_PANEL)} onChange={this.onPanelChange(panels.COMMENTS_PANEL)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Comments</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <UserComments />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </>
            )
        );
    }
}

export default UserDetails;
