import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CommentReplyField from '../CommentReplyField/CommentReplyField';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedComment: null,

            replyTo: null,
        };
        this.highlightedRef = null;
    }

    highlightComment = commentId => {
        const highlightedRef = React.createRef();
        this.props.comments.filter(comment => comment.id === commentId)[0].ref = highlightedRef;
        this.setState({ highlightedComment: commentId });
        this.highlightedRef = highlightedRef;
        // TODO: Make selection disappear
    };

    componentDidUpdate() {
        this.highlightedRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        this.highlightedRef = null;
    }

    cancelReplyTo = () => {
        this.setState({ replyTo: null });
    };

    onCommentSent = () => {
        this.cancelReplyTo();
        this.props.onCommentsUpdate();
    };

    render() {
        return (
            <Grid container direction="column">
                {this.props.isAuthenticated ? (
                    <Grid item container>
                        <CommentReplyField
                            postId={this.props.postId}
                            replyTo={this.state.replyTo}
                            cancelReplyTo={this.cancelReplyTo}
                            onCommentSent={this.onCommentSent}
                        />
                    </Grid>
                ) : null}
                <Grid item>
                    <List // TODO: Move this list into its own component (like CommentList) ?
                        component="nav"
                        aria-label="aria-label"
                        style={{
                            width: '100%',
                            position: 'relative',
                            //overflow: 'auto',
                            maxHeight: 300,
                        }}
                    >
                        {this.props.comments.map(comment => (
                            <>
                                <hr ref={comment.ref} />
                                <Comment
                                    comment={comment}
                                    selected={this.state.highlightedComment === comment.id}
                                    highlightComment={this.highlightComment}
                                    onAuthorNameClick={comment => this.setState({ replyTo: comment })}
                                />
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
        );
    }
}
