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
    TextField,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

export default class UserFilters extends Component {
    render() {
        const { filters, onChange } = this.props;
        return (
            <>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Filters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container direction="column">
                            {Object.entries(filters).map(([key, val]) => (
                                <Grid key={key}>
                                    <TextField label={key} value={val} onChange={e => onChange({ ...filters, [key]: e.target.value })} />
                                </Grid>
                            ))}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </>
        );
    }
}
