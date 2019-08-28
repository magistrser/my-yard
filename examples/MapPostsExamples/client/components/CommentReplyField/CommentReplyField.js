import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send as SendIcon } from '@material-ui/icons';
import { Cancel as CancelIcon } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';
import Popover from '@material-ui/core/Popover';
import { Typography } from '@material-ui/core';

export default class CommentReplyField extends Component {
    constructor(props) {
        super(props);
        this.commentTextRef = null;

        this.state = {
            validationError: null, // or object with message field (if only we had typescript)
        };
    }

    onSendButtonClick = async ev => {
        ev.preventDefault();
        this.setState({
            validationError: null,
        });

        const comment = {
            postid: this.props.postId,
            text: this.commentTextRef.value,
            'reply-to-comment-id': this.props.replyTo?.id,
        };
        if (!this.validateComment(comment)) {
            return;
        }
        try {
            await Axios.post('/api/create-comment/', comment);
        } catch (e) {
            console.error(e);
            this.setState({
                validationError: {
                    message: 'Server error',
                },
            });
        }

        this.commentTextRef.value = '';
        this.props.onCommentSent();
        this.forceUpdate(); // Because value of input was changed. Consider use state instead of ref?
    };

    validateComment(comment) {
        // TODO: some other validaton
        let messages = [];
        if (comment.text.length === 0) {
            messages.push('Comment cannot be empty\n');
        } else if (comment.text.length > 4000) {
            messages.push('Comment cannot be more than 4000 characters long\n');
        }
        if (messages.length > 0) {
            this.setState({
                validationError: {
                    messages,
                },
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                <Grid container direction="row" justify="space-around" alignItems="stretch">
                    <Grid item container xs={2} justify="flex-end">
                        <Avatar src={'/api/get-userpic/' /* Is that ok? */} />
                    </Grid>
                    <Grid xs={10} item container direction="row" justify="flex-end" alignItems="flex-end">
                        {this.props.replyTo ? (
                            <Grid item xs={1}>
                                <IconButton size="small" onClick={this.props.cancelReplyTo}>
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        ) : null}
                        <Grid item xs={10}>
                            <TextField
                                label={this.props.replyTo ? `Reply to: ${this.props.replyTo.fullName}` : null}
                                fullWidth
                                inputRef={input => (this.commentTextRef = input)}
                                error={this.state.validationError ? true : false}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton variant="contained" color="primary" onClick={this.onSendButtonClick}>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {this.state.validationError ? (
                        <Typography color="error">
                            <ul>{this.state.validationError.messages?.map(msg => <li key={msg /* Is this legal? */}>{msg}</li>)}</ul>
                        </Typography>
                    ) : null}
                </Grid>
            </Grid>
        );
    }
}
