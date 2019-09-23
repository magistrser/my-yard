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
                            <Grid>
                                <TextField
                                    label="Name"
                                    value={filters.name}
                                    onChange={e => onChange({ ...filters, name: e.target.value })}
                                />
                            </Grid>
                            <Grid>
                                <TextField label="ID" value={filters.id} onChange={e => onChange({ ...filters, id: e.target.value })} />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Email"
                                    value={filters.email}
                                    onChange={e => onChange({ ...filters, email: e.target.value })}
                                />
                            </Grid>
                            <Grid>
                                <TextField label="VK" value={filters.vk} onChange={e => onChange({ ...filters, vk: e.target.value })} />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </>
        );
    }
}
