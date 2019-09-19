import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MenuItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import CommentList from '../../../../CommentList/CommentList';
import { withRouter } from 'react-router-dom';
import CommentsFilters from '../CommentsFilters/CommentsFilters';

class CommentsList extends Component {
    render() {
        const { highlightedCommentId } = this.props;

        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    <CommentsFilters />
                </Grid>
                <Grid item container style={{ overflowY: 'auto' }}>
                    <CommentList
                        comments={this.props.comments}
                        onAuthorNameClick={({ authorId }) => this.props.history.push('/admin/users/' + authorId)}
                        highlightedComment={highlightedCommentId}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(CommentsList);
