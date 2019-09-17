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

class Comments extends Component {
    render() {
        const { id } = this.props;

        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={4} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>Comment list</Paper>
                </Grid>

                <Grid item xs={8} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>Comment details</Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Comments;
