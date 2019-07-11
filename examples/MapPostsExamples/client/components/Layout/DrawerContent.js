import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Paper, Card, CardContent } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Autorenew } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = theme => ({
    searchResultsCard: {
        cursor: 'pointer',
    },
});

class DrawerContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
        };
    }

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
                            <Tabs value={this.state.currentTab} centered onChange={(ev, tab) => this.setState({ currentTab: tab })}>
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
                            <TextField fullWidth placeholder="Comma separated list" onChange={ev => console.log(ev.target.value)} />
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
                    </Grid>
                ) : (
                    <Grid item xs={12} container style={{ maxHeight: 'calc(100% - 64px)', overflow: 'auto' }}>
                        <Grid item container xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Results:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {new Array(10).fill(0).map(item => (
                                <Card className={classes.searchResultsCard} onClick={() => alert('onSearchResultClick')}>
                                    <CardContent>
                                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                            Title
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            Bla bla bla bla bla bla
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(DrawerContent);
