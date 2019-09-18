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
                        comments={[
                            'a19a1772-fd7e-4dee-9023-66597b47dcec',
                            '5de7a700-0a5a-4000-8b29-8c98fa89ba5d',
                            '0b576399-105e-4016-b35d-621f28a42c26',
                            'd710ec7e-0d31-4a95-b6da-3fc3126cebf1',
                            'ad785059-4a5d-41d1-90f9-150470bc45b6',
                            '9c53769d-6cb7-4029-81af-a66f5a3e3947',
                        ].map(commentId => ({
                            id: commentId,
                            fullName: 'full namme',
                            timestamp: new Date().toDateString(),
                            authorId: 1,
                        }))}
                        onAuthorNameClick={({ authorId }) => this.props.history.push('/admin/users/' + authorId)}
                        highlightedComment={highlightedCommentId}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(CommentsList);
