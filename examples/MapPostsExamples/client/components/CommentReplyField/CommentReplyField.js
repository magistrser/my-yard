import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';

export default class CommentReplyField extends Component {
    render() {
        return (
            <Grid container direction="row" justify="space-around" alignItems="stretch">
                <Grid item xs={3} justify="center">
                    <Avatar style={{ margin: 'auto' }}>AVA</Avatar>
                </Grid>
                <Grid item container xs={9} direction="row" justify="flex-end" alignItems="stretch">
                    <Grid item xs={10}>
                        <TextField fullWidth />
                    </Grid>
                    <Grid item>
                        <IconButton variant="contained" color="primary">
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
