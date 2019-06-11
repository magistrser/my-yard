import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedComment: null,
        };
    }

    highlightComment = commentId => {
        this.setState({ highlightedComment: commentId });
        // TODO: Roll to the comment
        // TODO: Make selection disappear
    };

    render() {
        return (
            <List
                component="nav"
                aria-label="aria-label"
                style={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                }}
            >
                {this.props.comments.map(comment => (
                    <Comment
                        comment={comment}
                        selected={this.state.highlightedComment == comment.id}
                        highlightComment={this.highlightComment}
                    />
                ))}
            </List>
        );
    }
}
