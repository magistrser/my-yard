import React, { Component } from 'react';
import {
    Grid,
    Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import axios from 'axios';

import CommentsList from './CommentsList/CommentsList';
import CommentsDetails from './CommentsDetails/CommentsDetails';

class Comments extends Component {
    state = {
        comments: null,
    };

    async componentDidMount() {
        const { data: comments } = await axios.get('/api/get-comments');
        this.setState({ comments });
    }

    render() {
        const { id } = this.props;

        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <CommentsList highlightedCommentId={id} comments={this.state.comments} />
                    </Paper>
                </Grid>

                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative', padding: 10 }}>
                        <CommentsDetails comment={this.state.comments?.find(c => c.id === id)} />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Comments;
