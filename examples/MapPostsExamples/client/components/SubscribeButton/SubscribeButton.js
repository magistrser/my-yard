import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import SubscribersListDialog from '../SubscribersListDialog/SubscribersListDialog';
import axios from 'axios';

export default class SubscribeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
            isSubscribersModalOpen: false,
            subscriptionStatusLoaded: false,
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        const response = await axios.get('/api/check-subscription-status', {
            params: {
                postid: this.props.postId,
            },
        });
        this.setState({
            subscribed: response.data.subscribed,
            subscriptionStatusLoaded: true,
        });
    }

    handleSubscribeButtonClick = async ev => {
        ev.preventDefault();
        const endpoint = `/api/${this.state.subscribed ? 'unsubscribe' : 'subscribe'}`;
        const result = await axios.post(endpoint, {
            postid: this.props.postId,
        });
        if ((result.status = 200)) {
            this.props.onSubscribeButtonClick();
            this.setState({
                subscribed: !this.state.subscribed,
            });
        }
    };

    handleCurrentSubscribersClick = ev => {
        ev.preventDefault();
        this.setState({
            isSubscribersModalOpen: true,
        });
    };

    render() {
        const buttonColor = this.state.subscribed ? 'secondary' : 'primary';
        return (
            <Grid container justify="space-between" style={{ padding: '10px 0' }}>
                <SubscribersListDialog
                    open={this.state.isSubscribersModalOpen}
                    onClose={() => {
                        this.setState({ isSubscribersModalOpen: false });
                    }}
                    postId={this.props.postId}
                />
                <Grid item>
                    <Button onClick={this.handleCurrentSubscribersClick}>
                        Subscribed users: {this.props.subCount}
                        <DirectionsWalkIcon />
                    </Button>
                </Grid>
                <Grid item>
                    {this.props.isAuthenticated && this.state.subscriptionStatusLoaded ? (
                        <Button variant="contained" color={buttonColor} onClick={this.handleSubscribeButtonClick}>
                            {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
        );
    }
}
