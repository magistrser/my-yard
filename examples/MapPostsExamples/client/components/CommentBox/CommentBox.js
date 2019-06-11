import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List component="nav" aria-label="aria-label">
                {this.props.comments.map(comment => (
                    <ListItem selected={true}>
                        <Comment comment={comment} />
                    </ListItem>
                ))}
            </List>
        );
    }
}
