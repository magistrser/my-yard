import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CommentReplyField from '../CommentReplyField/CommentReplyField';
import CommentList from '../CommentList/CommentList';

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
            <Grid item container direction="column">
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
                <Grid item container>
                    <CommentList
                        comments={this.props.comments}
                        highlightedComment={this.state.highlightedComment}
                        highlightComment={this.highlightComment}
                        onAuthorNameClick={comment => this.setState({ replyTo: comment })}
                        onCommentsUpdate={this.props.onCommentsUpdate}
                    />
                </Grid>
            </Grid>
        );
    }
}
