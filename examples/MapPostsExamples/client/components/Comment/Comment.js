import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
    }

    render() {
        // Not sure which one to use
        const commentOnGrids = (
            <Grid container justify="flex-start" alignItems="stretch" style={{ margin: 10 }}>
                <Grid item xs={3}>
                    <Avatar style={styles.avatar} src={this.props.comment.avatar}>
                        AVA
                    </Avatar>
                </Grid>
                <Grid item container direction="column" xs={9}>
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
        const commentOnListItem = (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar style={styles.avatar} src={this.props.comment.avatar}>
                        AVA
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            <Typography
                                component="span"
                                color="textPrimary"
                                variant="subtitle2"
                                style={{ paddingRight: 10, display: 'inline' }}
                            >
                                {this.props.comment.author}
                            </Typography>
                            <Typography component="span" color="textSecondary" variant="subtitle2" style={{ display: 'inline' }}>
                                {this.props.comment.date}
                            </Typography>
                            {this.props.comment.replyTo ? (
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    <a href={this.props.comment.replyTo.commentId} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Reply to: {this.props.comment.replyTo?.author}
                                    </a>
                                </Typography>
                            ) : null}
                        </>
                    }
                    secondary={<Typography variant="body1">{this.props.comment.text}</Typography>}
                />
            </ListItem>
        );
        return commentOnListItem;
    }
}
