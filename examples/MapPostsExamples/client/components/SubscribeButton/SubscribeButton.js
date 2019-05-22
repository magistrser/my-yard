import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class SubscribeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: true,
        };
    }

    render() {
        const buttonColor = this.state.subscribed ? 'secondary' : 'primary';
        return (
            <Grid container justify="flex-end">
                {this.props.isAuthorized ? (
                    <Button variant="contained" color={buttonColor}>
                        {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </Button>
                ) : null}
            </Grid>
        );
    }
}
