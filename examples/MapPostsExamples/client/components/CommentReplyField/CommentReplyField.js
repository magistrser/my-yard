import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import { basename } from 'path';

export default class CommentReplyField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container direction="row" justify="space-around" alignItems="stretch">
                <Grid item xs={2} justify="center">
                    <Avatar style={{ margin: 'auto' }}>AVA</Avatar>
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
                        <TextField label={this.props.replyTo ? `Reply to: ${this.props.replyTo.fullName}` : null} fullWidth />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton variant="contained" color="primary">
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
