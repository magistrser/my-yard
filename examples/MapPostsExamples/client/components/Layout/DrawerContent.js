import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Paper, Checkbox } from '@material-ui/core';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { Autorenew } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResultList from './ResultList';
import axios from 'axios';
import DistancePicker from '../DistancePicker/DistancePicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withContext from '../../context';

const useStyles = theme => ({
    searchResultsCard: {
        cursor: 'pointer',
    },
    resultListSubheader: {
        background: theme.palette.background.default,
    },
    progress: {
        margin: 'auto',
        paddingTop: '50%',
    },
});

class DrawerContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            isSearchResultsLoaded: false,
            searchFormData: {
                tags: '',
                date: '',
                timeRange: [0, 24],
                participantsFrom: '',
                participantsTo: '',
                distanceInfo: null,
                searchResults: [], // TODO: Why is it here?
                showEndedSearchResults: false,
                ownEventsOnly: false,
                subscribedToEventsOnly: false,
            },
            searchResults: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.distanceInfo !== this.props.distanceInfo) {
            this.setState({
                searchFormData: {
                    ...prevState.searchFormData,
                    distanceInfo: this.props.distanceInfo,
                },
            });
        }
        if (prevProps.showEndedSearchResults !== this.props.showEndedSearchResults) {
            this.setState({
                searchFormData: {
                    ...prevState.searchFormData,
                    showEndedSearchResults: this.props.showEndedSearchResults,
                },
            });
        }
    }

    onTabChange = async (ev, tab) => {
        let searchResults = null;
        if (tab != 0) {
            const { data: result } = await this.loadSearchResults();
            console.log(result);
            searchResults = result.map(item => ({ ...item, description: item.text.slice(0, 50) }));
        }
        this.setState({ isSearchResultsLoaded: true, currentTab: tab, searchResults }, () => {
            this.props.onSearchResultsLoaded(searchResults);
        });
    };

    loadSearchResults = async () => {
        return axios.post('/api/search-posts', {
            ...this.state.searchFormData,
        });
    };

    render() {
        return (
            <Grid container justify="flex-start" alignItems="flex-start" style={{ overflow: 'hidden' }}>
                <Grid item xs={12} container>
                    <AppBar position="sticky">
                        <Toolbar>
                            <Tabs value={this.state.currentTab} centered onChange={this.onTabChange}>
                                <Tab label="Options" />
                                <Tab label="Results" />
                            </Tabs>
                            <div style={{ flexGrow: 1 }} />
                            <IconButton onClick={this.props.onDrawerClose}>
                                <ChevronLeftIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Grid>
                {this.state.currentTab === 0 ? this.optionsTab : this.resultsTab}
            </Grid>
        );
    }

    get optionsTab() {
        const marks = [
            {
                value: 1, // HACK: if 0, label centers itself on zero and overflows the container
                label: '00:00',
            },
            {
                value: 12,
                label: '12:00',
            },
            {
                value: 23,
                label: '23:59',
            },
        ];

        return (
            <Grid
                item
                xs={12}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
                style={{ padding: '5% 0 0 5%', flexWrap: 'nowrap', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto', width: '100%' }}
            >
                <Grid item container direction="column" justify="flex-start">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.searchFormData.showEndedSearchResults}
                                    onChange={(_, checked) => {
                                        this.props.onShowEndedSearchResults(checked);
                                        this.setState({
                                            searchFormData: { ...this.state.searchFormData, showEndedSearchResults: checked },
                                        });
                                    }}
                                />
                            }
                            label="Include ended events"
                        />
                    </Grid>
                    <Grid item hidden={!this.props.isAuthenticated}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.searchFormData.ownEventsOnly}
                                    onChange={(_, checked) => {
                                        this.setState({
                                            searchFormData: { ...this.state.searchFormData, ownEventsOnly: checked },
                                        });
                                    }}
                                />
                            }
                            label="My events"
                        />
                    </Grid>
                    <Grid item hidden={!this.props.isAuthenticated}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.searchFormData.subscribedToEventsOnly}
                                    onChange={(_, checked) => {
                                        this.setState({
                                            searchFormData: { ...this.state.searchFormData, subscribedToEventsOnly: checked },
                                        });
                                    }}
                                />
                            }
                            label="Events I'm subscribed to"
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Tags:</Typography>
                </Grid>
                <Grid item container>
                    <TextField
                        fullWidth
                        placeholder="Whitespace separated list"
                        value={this.state.searchFormData.tags}
                        onChange={ev =>
                            this.setState({
                                searchFormData: {
                                    ...this.state.searchFormData,
                                    tags: ev.target.value,
                                },
                            })
                        }
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Date:
                    </Typography>
                </Grid>
                <Grid item container>
                    <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.searchFormData.date}
                        onChange={ev =>
                            this.setState({
                                searchFormData: {
                                    ...this.state.searchFormData,
                                    date: ev.target.value,
                                },
                            })
                        }
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h6">Time:</Typography>
                </Grid>
                <Grid item container>
                    <Slider
                        value={this.state.searchFormData.timeRange}
                        step={1}
                        min={0}
                        max={24}
                        component={'div'}
                        marks={marks}
                        valueLabelDisplay="auto"
                        onChange={(ev, newValue) =>
                            this.setState({
                                searchFormData: {
                                    ...this.state.searchFormData,
                                    timeRange: newValue,
                                },
                            })
                        }
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h6">Distance:</Typography>
                </Grid>
                <Grid item container>
                    <DistancePicker
                        value={this.state.searchFormData.distanceInfo}
                        onChange={value => {
                            this.props.onDistanceInfoChange(value);
                            this.setState({
                                searchFormData: { ...this.state.searchFormData, distanceInfo: value },
                            });
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h6">Number of participants:</Typography>
                </Grid>
                <Grid item container>
                    <Grid item container alignItems="flex-end">
                        <Typography variant="subtitle2">More than:</Typography>
                        <TextField
                            value={this.state.searchFormData.participantsFrom}
                            onChange={ev =>
                                this.setState({
                                    searchFormData: { ...this.state.searchFormData, participantsFrom: ev.target.value },
                                })
                            }
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item container alignItems="flex-end">
                        <Typography variant="subtitle2">Less than:</Typography>
                        <TextField
                            value={this.state.searchFormData.participantsTo}
                            onChange={ev =>
                                this.setState({ searchFormData: { ...this.state.searchFormData, participantsTo: ev.target.value } })
                            }
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Button variant="contained" color="primary" onClick={ev => this.onTabChange(ev, 1)}>
                        search
                    </Button>
                </Grid>
            </Grid>
        );
    }

    get resultsTab() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} container style={{ maxHeight: 'calc(100% - 64px)', overflowY: 'scroll', width: '100%' }}>
                {this.state.isSearchResultsLoaded ? (
                    <Grid container item direction="column" style={{ width: '100%' }}>
                        <ResultList searchResults={this.state.searchResults} onSearchResultClick={this.props.onSearchResultClick} />
                    </Grid>
                ) : (
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div>
                )}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(DrawerContent);
