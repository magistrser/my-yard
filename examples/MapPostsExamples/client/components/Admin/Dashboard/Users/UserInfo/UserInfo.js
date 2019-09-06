import React, { Component } from 'react';
import { Grid, Avatar, Typography, TextField, Button } from '@material-ui/core';
import UserInput from './UserInput/UserInput';

export default class UserInfo extends Component {
    render() {
        return (
            <Grid container direction="column">
                <Grid item container alignItems="center" justify="center">
                    <Grid item>
                        <Avatar style={{ margin: 10, width: 80, height: 80 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Ivan Ivanovich</Typography>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item>
                        <UserInput name="Email" value="fffff@aaaaa.com" onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                    <Grid item>
                        <Typography display="inline">Email: </Typography>
                        <TextField />
                        <Button style={{ visibility: '' && 'hidden' }}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Typography display="inline">Email: </Typography>
                        <TextField />
                        <Button style={{ visibility: '' && 'hidden' }}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
