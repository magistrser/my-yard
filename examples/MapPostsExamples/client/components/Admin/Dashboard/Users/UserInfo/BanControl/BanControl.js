import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

export default class BanControl extends Component {
    async banRequest(isBanned, bannedUntil) {
        axios.put('/api/ban-user', {
            isBanned,
            bannedUntil,
            userId: this.props.userId,
        });
        this.props.updateUserInfo();
    }

    render() {
        const { bannedUntil } = this.props;
        return <Button onClick={() => this.banRequest(!bannedUntil)}>{bannedUntil ? 'UNBAN' : 'BAN'}</Button>;
    }
}
