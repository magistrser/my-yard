import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export default class SubscribersListDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribers: [],
            subscribersLoaded: false,
        };
    }

    loadSubscribers = async () => {
        const { data: subs } = await axios.get('/api/get-subscribers', {
            params: {
                postid: this.props.postId,
            },
        });
        return subs;
    };

    async componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            const subscribers = await this.loadSubscribers();
            this.setState({
                subscribers,
                subscribersLoaded: true,
            });
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Subscribed users:</DialogTitle>
                <DialogContent>
                    {this.state.subscribersLoaded ? (
                        <List>
                            {this.state.subscribers.map(user => {
                                return (
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar src={user.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.fullName} secondary={user.email} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <Grid container direction="row" justify="center" alignItems="center">
                            <CircularProgress />
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        );
    }
}
