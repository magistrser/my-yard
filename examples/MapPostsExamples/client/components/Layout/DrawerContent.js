import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Paper } from '@material-ui/core';
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
        };
        this.searchResults = [];
    }

    onTabChange = async (ev, tab) => {
        this.setState({ currentTab: tab });
        setTimeout(() => {
            this.searchResults = new Array(10).fill(0).map((item, idx) => ({ title: 'Title ' + idx, description: 'bla bla bla bla' }));
            this.setState({ isSearchResultsLoaded: true });
        }, 3000);
    };

    loadSearchResults = async () => {};

    render() {
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
                value: 22,
                label: '23:00',
            },
        ];

        const { classes } = this.props;

        return (
            <Grid container justify="flex-start" alignItems="flex-start">
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
                {this.state.currentTab === 0 ? (
                    <Grid
                        item
                        xs={12}
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        spacing={2}
                        style={{ padding: '5%' }}
                    >
                        <Grid item>
                            <Typography variant="h6">Tags:</Typography>
                        </Grid>
                        <Grid item container>
                            <TextField fullWidth placeholder="Whitespace separated list" onChange={ev => console.log(ev.target.value)} />
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
                                onChange={ev => console.log(ev.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Time:</Typography>
                        </Grid>
                        <Grid item container>
                            <Slider
                                defaultValue={[0, 23]}
                                step={1}
                                min={0}
                                max={23}
                                component={'div'}
                                marks={marks}
                                valueLabelDisplay="auto"
                                onChangeCommitted={(ev, newValue) => console.log(newValue)}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">Distance:</Typography>
                        </Grid>
                        <Grid item>WHAT DISTANCE?</Grid>
                        <Grid item>
                            <Typography variant="h6">Number of participants:</Typography>
                        </Grid>
                        <Grid item container>
                            <Grid item container alignItems="flex-end">
                                <Typography variant="subtitle2">More than:</Typography>
                                <TextField
                                    onChange={ev => console.log(ev.target.value)}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item container alignItems="flex-end">
                                <Typography variant="subtitle2">Less than:</Typography>
                                <TextField
                                    onChange={ev => console.log(ev.target.value)}
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
                ) : (
                    <Grid item xs={12} container style={{ maxHeight: 'calc(100% - 64px)', overflow: 'auto' }}>
                        {this.state.isSearchResultsLoaded ? (
                            <ResultList searchResults={this.searchResults} />
                        ) : (
                            <div className={classes.progress}>
                                <CircularProgress />
                            </div>
                        )}
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(DrawerContent);
