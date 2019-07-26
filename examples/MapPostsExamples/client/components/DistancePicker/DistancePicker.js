import React, { Component } from 'react';
import { Checkbox, TextField, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { positions } from '@material-ui/system';

export default class DistancePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            currentPosition: null,
        };
    }

    onCheckboxChange = async (ev, checked) => {
        try {
            const pos = await this.getCurrentPosition();
            console.log('pos ', pos);
            this.setState({
                checked: !this.state.checked,
                currentPosition: pos,
            });
        } catch {
            this.setState({
                checked: false,
                currentPosition: null,
            });
            alert('Cannot get your position using Geolocation API');
        }
    };

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        resolve(pos);
                    },
                    err => {
                        reject(err);
                    }
                );
            }
        });
    }

    render() {
        return (
            <Grid item container>
                <Checkbox checked={this.state.checked} onChange={this.onCheckboxChange} color="primary" />
                <TextField type="number" label="From your location" placeholder="in meters" disabled={!this.state.checked} />
            </Grid>
        );
    }
}
