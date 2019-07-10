import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Paper, Card, CardContent } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Autorenew } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

const drawerWidth = 500;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        width: '100%',
        height: '100%',
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    searchResultsCard: {
        cursor: 'pointer',
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false); // React hooks. Hipster shit imo
    const suka = [0, 0];

    function onDrawerOpen() {
        setOpen(true);
    }

    function onDrawerClose() {
        setOpen(false);
    }

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
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                        color="inherit"
                        onClick={onDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Map with posts
                    </Typography>
                    <div className={classes.userInfo}>
                        {props.isAuthenticated && (
                            <>
                                <Typography style={{ paddingRight: 5 }}>{props.user.fullName}</Typography>
                                <Avatar src={props.user.photoUrl}>D:</Avatar>
                            </>
                        )}
                        {props.isAuthenticated ? (
                            <Button color="inherit" href="/api/logout" className={classes.loginButton}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" href="/api/auth/vkontakte" className={classes.loginButton}>
                                Login
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h6">Search posts</Typography>
                    <IconButton onClick={onDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Grid container justify="flex-start" alignItems="flex-start">
                    <Grid
                        item
                        xs={9}
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
                    <Grid item xs={3} container style={{ maxHeight: '100%', overflow: 'auto' }}>
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
                </Grid>
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: open })}>{props.children}</main>
        </div>
    );
}
