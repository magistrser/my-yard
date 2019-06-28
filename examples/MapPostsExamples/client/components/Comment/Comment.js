import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import deepPurple from '@material-ui/core/colors/deepPurple';
import card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
        return (
            <ListItem alignItems="flex-start" selected={this.props.selected}>
                <ListItemAvatar>
                    <Avatar style={styles.avatar} src={this.props.comment.photoUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            <Typography
                                component="span"
                                color="textPrimary"
                                variant="subtitle2"
                                style={{ paddingRight: 10, display: 'inline', cursor: 'pointer' }}
                                onClick={() => this.props.onAuthorNameClick(this.props.comment)}
                            >
                                {this.props.comment.fullName}
                            </Typography>

                            <Typography component="span" color="textSecondary" variant="subtitle2" style={{ display: 'inline' }}>
                                {this.props.comment.timestamp}
                            </Typography>
                            {this.props.comment.replyToCommentId ? (
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    <a
                                        onClick={ev => {
                                            ev.preventDefault();
                                            this.props.highlightComment(this.props.comment.replyToCommentId);
                                        }}
                                        href=""
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        Reply to: {this.props.comment.replyToName}
                                    </a>
                                </Typography>
                            ) : null}
                        </>
                    }
                    secondary={<Typography variant="body1">{this.props.comment.text}</Typography>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}
