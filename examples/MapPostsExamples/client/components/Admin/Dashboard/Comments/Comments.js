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

import CommentsList from './CommentsList/CommentsList';
import CommentsDetails from './CommentsDetails/CommentsDetails';

class Comments extends Component {
    render() {
        const { id } = this.props;

        return (
            <Grid container justify="flex-start" spacing={3} style={{ height: '100%', position: 'relative' }}>
                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%' }}>
                        <CommentsList highlightedCommentId={id} />
                    </Paper>
                </Grid>

                <Grid item xs={6} style={{ height: '100%' }}>
                    <Paper style={{ height: '80%', position: 'relative' }}>
                        <CommentsDetails />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Comments;
