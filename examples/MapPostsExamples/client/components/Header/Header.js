import React, { Component } from 'react';
import styles from './Header.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();

    const handmadeHeader = (
        <header className={styles.header}>
            <h1>Posts and comments</h1>
            {!props.isAuthenticated ? (
                <a className={styles.btn} href="/api/auth/vkontakte">
                    Login
                </a>
            ) : (
                <a className={styles.btnRed} href="/api/logout">
                    Logout
                </a>
            )}
        </header>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Map with posts
                    </Typography>
                    {props.isAuthenticated && (
                        <>
                            <Typography style={{ paddingRight: 5 }}>{props.user.fullName}</Typography>
                            <Avatar src={props.user.photoUrl}>D:</Avatar>
                        </>
                    )}
                    {props.isAuthenticated ? (
                        <Button color="inherit" href="/api/logout">
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" href="/api/auth/vkontakte">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
