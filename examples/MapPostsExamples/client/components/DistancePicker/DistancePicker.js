import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import { Checkbox, TextField, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { positions } from '@material-ui/system';

export default class DistancePicker extends Component {
    defaultValue = {
        radius: 0,
        currentPosition: {
            latitude: 0,
            longitude: 0,
        },
    };

    onCheckboxChange = async (ev, checked) => {
        if (!checked) {
            return this.props.onChange(null);
        }
        try {
            const pos = await this.getCurrentPosition();
            this.props.onChange({
                radius: this.props?.value?.radius || this.defaultValue.radius,
                currentPosition: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                },
            });
        } catch (err) {
            console.error(err);
            alert('Cannot get your position using Geolocation API');
            this.props.onChange(null);
        }
    };

    onSliderChange = (ev, newValue) =>
        this.props.onChange({
            radius: newValue,
            currentPosition: {
                latitude: this.props.value.currentPosition.latitude,
                longitude: this.props.value.currentPosition.longitude,
            },
        });

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    pos => {
                        return resolve(pos);
                    },
                    err => {
                        return reject(err);
                    }
                );
            } else {
                reject(new Error('No geolocation API supported'));
            }
        });
    }

    render() {
        return (
            <Grid item container>
                <Checkbox checked={!!this.props.value} onChange={this.onCheckboxChange} color="primary" />
                <TextField
                    value={this.props.value?.radius || this.defaultValue.radius}
                    label="From your location"
                    placeholder="in meters"
                    disabled={!this.props.value}
                    readOnly
                />
                <Slider
                    value={this.props.value?.radius || this.defaultValue.radius}
                    step={100}
                    min={0}
                    max={25000}
                    component={'div'}
                    disabled={!this.props.value}
                    onChange={this.onSliderChange}
                />
            </Grid>
        );
    }
}
