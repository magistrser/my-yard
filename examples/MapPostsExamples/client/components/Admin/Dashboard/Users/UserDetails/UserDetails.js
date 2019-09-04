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

const panels = {
    USER_PANEL: 'USER_PANEL',
    POSTS_PANEL: 'POSTS_PANEL',
    COMMENTS_PANEL: 'COMMENTS_PANEL',
};

class UserDetails extends Component {
    state = {
        selectedPanel: panels.USER_PANEL,
    };

    onPanelChange = panel => ev => this.props.userInfo && this.setState({ selectedPanel: panel });

    isExpanded(panel) {
        return !!this.props.userInfo && this.state.selectedPanel === panel;
    }

    render() {
        const { userInfo } = this.props;
        return (
            <>
                <ExpansionPanel expanded={this.isExpanded(panels.USER_PANEL)} onChange={this.onPanelChange(panels.USER_PANEL)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>User</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <p>
                            foo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo
                            barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo
                            barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo
                            barfoo barfoo barfoo bar foo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo ba
                        </p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.isExpanded(panels.POSTS_PANEL)} onChange={this.onPanelChange(panels.POSTS_PANEL)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Posts</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <p>foo bar</p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.isExpanded(panels.COMMENTS_PANEL)} onChange={this.onPanelChange(panels.COMMENTS_PANEL)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Comments</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <p>
                            foo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo
                            barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo
                            barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barfoo barf
                        </p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </>
        );
    }
}

export default withRouter(UserDetails);
