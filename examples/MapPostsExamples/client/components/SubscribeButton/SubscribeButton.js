import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';

export default class SubscribeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribed: false,
            subscribedUsers: [],
            isSubscribersModalOpen: false,
        };
    }

    componentDidMount() {
        const newUsers = this.getSubscribedUsers();
        this.setState({
            subscribedUsers: newUsers,
        });
    }

    handleSubscribeButtonClick = async ev => {
        ev.preventDefault();
        const endpoint = `/api/${this.state.subscribed ? 'unsubscribe' : 'subscribe'}`;
        const result = await axios.post(endpoint, {
            postId: this.props.post.id,
        });
        const newUsers = this.getSubscribedUsers();
        newUsers.push({
            userName: '*YOU*',
        });
        this.setState({
            subscribedUsers: newUsers,
        });
    };

    handleCurrentSubscribersClick = ev => {
        ev.preventDefault();
        this.setState({
            isSubscribersModalOpen: true,
        });
    };

    getSubscribedUsers = () => {
        // TODO: Talk to api, get subscribers
        const newUsers = [
            {
                userName: 'JOHN DOE',
            },
            {
                userName: 'DOHN JOE',
            },
            {
                userName: 'FOO BAR',
            },
        ];
        return newUsers;
    };

    render() {
        const buttonColor = this.state.subscribed ? 'secondary' : 'primary';
        return (
            <Grid container justify="flex-end">
                <Dialog
                    open={this.state.isSubscribersModalOpen}
                    onClose={() => {
                        this.setState({ isSubscribersModalOpen: false });
                    }}
                >
                    <DialogTitle>Subscribed users:</DialogTitle>
                    <List>
                        {this.state.subscribedUsers.map(user => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src="http://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.userName} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Dialog>
                <Grid item>
                    <Button onClick={this.handleCurrentSubscribersClick}>
                        Subscribed users: {this.state.subscribedUsers.length}
                        <DirectionsWalkIcon />
                    </Button>
                </Grid>
                <Grid item>
                    {this.props.isAuthorized ? (
                        <Button variant="contained" color={buttonColor} onClick={this.handleSubscribeButtonClick}>
                            {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
        );
    }
}
