import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Send as SendIcon } from '@material-ui/icons';
import { Cancel as CancelIcon } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';

export default class CommentReplyField extends Component {
    constructor(props) {
        super(props);
        this.commentTextRef = null;
    }

    onSendButtonClick = async ev => {
        ev.preventDefault();

        const comment = {
            postid: this.props.postId,
            text: this.commentTextRef.value,
            'reply-to-comment-id': this.props.replyTo.id,
        };
        if (!this.validateComment(comment)) {
            // fuck off
            return;
        }
        try {
            await Axios.post('/api/create-comment/', comment);
        } catch (e) {
            console.error(e);
            // Server said to fuck off
        }
    };

    validateComment(comment) {
        // TODO: Validation
        return true;
    }

    render() {
        return (
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
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton variant="contained" color="primary" onClick={this.onSendButtonClick}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
