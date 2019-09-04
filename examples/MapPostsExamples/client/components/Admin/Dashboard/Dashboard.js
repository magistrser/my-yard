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

export default class Dashboard extends Component {
    render() {
        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={7} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                            <Grid item>
                                {/* Filters */}
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Filters</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <input />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                            <Grid item style={{ overflowY: 'auto' }}>
                                {/* List of users */}
                                <List dense style={{ height: '40%' }}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(val => {
                                        return (
                                            <ListItem key={val} button selected={val === 2}>
                                                <ListItemAvatar>
                                                    <Avatar>AVA</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={'%USERNAME%'} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', overflowY: 'auto' }}>
                        <p>Selected user info, post preview, etc...</p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
