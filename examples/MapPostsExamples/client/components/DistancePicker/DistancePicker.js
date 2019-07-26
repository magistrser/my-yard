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
            radius: 0,
        };
    }

    onCheckboxChange = async (ev, checked) => {
        try {
            const pos = await this.getCurrentPosition();
            this.setState({
                checked: !this.state.checked,
                currentPosition: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                },
            });
            this.onChange();
        } catch {
            this.setState({
                checked: false,
                currentPosition: null,
            });
            this.onChange();
            alert('Cannot get your position using Geolocation API');
        }
    };

    onTextFieldChange = ev => {
        if (ev.target.value < 0) ev.target.value = 0;
        this.setState({ radius: ev.target.value });
        this.onChange();
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

    onChange() {
        this.props.onChange &&
            this.props.onChange(
                this.state.checked
                    ? {
                          currentPosition: this.state.currentPosition,
                          radius: this.state.radius,
                      }
                    : null
            );
    }

    render() {
        return (
            <Grid item container>
                <Checkbox checked={this.state.checked} onChange={this.onCheckboxChange} color="primary" />
                <TextField
                    value={this.state.radius}
                    type="number"
                    label="From your location"
                    placeholder="in meters"
                    disabled={!this.state.checked}
                    onChange={this.onTextFieldChange}
                />
            </Grid>
        );
    }
}
