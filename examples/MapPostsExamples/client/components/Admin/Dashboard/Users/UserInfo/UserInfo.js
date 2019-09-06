import React, { Component } from 'react';
import { Grid, Avatar, Typography, TextField, Button, Switch } from '@material-ui/core';
import UserInput from './UserInput/UserInput';
import BanControl from './BanControl/BanControl';

export default class UserInfo extends Component {
    render() {
        return (
            <Grid container direction="column">
                <Grid item container justify="flex-end">
                    <Grid item>
                        <BanControl />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" justify="center">
                    <Grid item>
                        <Avatar style={{ margin: 10, width: 80, height: 80 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Ivan Ivanovich</Typography>
                    </Grid>
                </Grid>
                <Grid item container justify="flex-end">
                    <Grid item>
                        <Typography variant="caption" display="inline">
                            admin:
                        </Typography>
                        <Switch value="isAdmin" onChange={ev => console.log(ev.target.checked)} size="small" />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <UserInput name="Name" value="IvanIvanovich" onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                    <Grid item>
                        <UserInput name="Email" value="fffff@aaaaa.com" onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
