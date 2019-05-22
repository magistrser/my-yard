import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class SubscribeButton extends Component {
    render() {
        return (
            <Grid container justify="flex-end">
                <Button variant="contained" color="primary">
                    Subscribe
                </Button>
            </Grid>
        );
    }
}
