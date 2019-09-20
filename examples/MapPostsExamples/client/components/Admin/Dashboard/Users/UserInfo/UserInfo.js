import React, { Component } from 'react';
import { Grid, Avatar, Typography, TextField, Button, Switch } from '@material-ui/core';
import UserInput from './UserInput/UserInput';
import BanControl from './BanControl/BanControl';

export default class UserInfo extends Component {
    render() {
        const { userInfo } = this.props;
        console.log('---userInfo', userInfo);
        return (
            <Grid container direction="column">
                <Grid item container justify="flex-end">
                    <Grid item>
                        <BanControl bannedUntil={userInfo.bannedUntil} userId={userInfo.id} updateUserInfo={this.props.updateUserInfo} />
                    </Grid>
                </Grid>
                <Grid item container alignItems="center" justify="center">
                    <Grid item>
                        <Avatar style={{ margin: 10, width: 80, height: 80 }} src={userInfo.userPic} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{userInfo.fullName}</Typography>
                    </Grid>
                    {!!userInfo.isAdmin && (
                        <Grid item>
                            <Typography variant="h6" color="secondary">
                                (admin)
                            </Typography>
                        </Grid>
                    )}
                </Grid>
                <Grid item container direction="column" alignItems="center">
                    <Grid item>
                        <Typography display="inline">ID: </Typography>
                        <TextField disabled value={userInfo.id} />
                    </Grid>
                    <Grid item>
                        <UserInput name="Name" value={userInfo.fullName} onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                    <Grid item>
                        <UserInput name="Email" value={userInfo.email} onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                    <Grid item>
                        <UserInput name="VK" value={userInfo.vkProfileUrl} onSubmit={newVal => console.log(newVal)} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
