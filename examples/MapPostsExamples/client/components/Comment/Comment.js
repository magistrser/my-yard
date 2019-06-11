import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import card from '@material-ui/core/Card';

const styles = {
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
};

export default class Comment extends Component {
    constructor(props) {
        super(props);
        console.log('__', props);
    }

    render() {
        return (
            <Grid container justify="flex-start" alignItems="stretch" style={{ margin: 10 }}>
                <Grid item xs={2}>
                    <Avatar style={styles.avatar} src={this.props.comment.avatar}>
                        AVA
                    </Avatar>
                </Grid>
                <Grid item container direction="column" xs={10}>
                    <Grid item container>
                        <Typography color="textPrimary" variant="subtitle2" style={{ paddingRight: 10 }}>
                            {this.props.comment.author}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                            {this.props.comment.date}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {this.props.comment.replyTo ? (
                            <Typography color="textSecondary" variant="caption" gutterBottom>
                                <a href={this.props.comment.replyTo.commentId} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Reply to: {this.props.comment.replyTo?.author}
                                </a>
                            </Typography>
                        ) : null}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{this.props.comment.text}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
