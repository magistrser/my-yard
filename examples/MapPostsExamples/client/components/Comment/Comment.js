import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import card from '@material-ui/core/Card';
const avatarStyles = {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
};

export default class Comment extends Component {
    render() {
        return (
            <>
                <Grid container justify="flex-start" alignItems="stretch" style={{ margin: 10 }}>
                    <Grid item xs={2}>
                        <Avatar style={avatarStyles}>AVA</Avatar>
                    </Grid>
                    <Grid item container direction="column" xs={10}>
                        <Grid item container>
                            <Typography color="textPrimary" variant="subtitle2" style={{ paddingRight: 10 }}>
                                Username
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle2">
                                00:00:00 01.01.2007
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="textSecondary" variant="caption" gutterBottom>
                                <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Reply to: User
                                </a>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Typography API The API documentation of the Typography React component. Learn more about the properties and
                                the CSS customization pointpography React component. Learn more about the properties and the CSS
                                customization points. Typography API The API documentation of the Typography React component. Learn more
                                about the properties and the CSS customization points. Typography API The API documentation of the
                                Typography React component. Learn more about the properties and the CSS customization points. properties and
                                the CSS
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" alignItems="stretch" style={{ margin: 10 }}>
                    <Grid item xs={2}>
                        <Avatar style={avatarStyles}>AVA</Avatar>
                    </Grid>
                    <Grid item container direction="column" xs={10}>
                        <Grid item container>
                            <Typography color="textPrimary" variant="subtitle2" style={{ paddingRight: 10 }}>
                                Username
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle2">
                                00:00:00 01.01.2007
                            </Typography>
                        </Grid>
                        <Grid item>
                            {/*
                            <Typography color="textSecondary" variant="caption" gutterBottom>
                                <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Reply to: User
                                </a>
                            </Typography>
                            */}
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Typography API The API documentation of the Typography React component. Learn more about the properties and
                                the CSS customization pointpography React component. Learn more about the properties and the CSS
                                customization points. Typography API The API documentation of the Typography React component. Learn more
                                about the properties and the CSS customization points. Typography API The API documentation of the
                                Typography React component. Learn more about the properties and the CSS customization points. properties and
                                the CSS
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}
