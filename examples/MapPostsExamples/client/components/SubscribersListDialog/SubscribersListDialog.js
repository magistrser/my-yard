import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default class SubscribersListDialog extends Component {
    render() {
        return this.props.open ? (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Subscribed users:</DialogTitle>
                <DialogContent>
                    <List>
                        {['a', 'b', 'c'].map(user => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src="http://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText primary={user} secondary="email@example.com" />
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        ) : null;
    }
}
