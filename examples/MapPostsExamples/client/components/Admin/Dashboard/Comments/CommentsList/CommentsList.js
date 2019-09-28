import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MenuItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import CommentList from '../../../../CommentList/CommentList';
import { withRouter } from 'react-router-dom';
import Filters from '../../../Filters/Filters';

class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                authorId: '',
                fullName: '',
                id: '',
                text: '',
                timestamp: '',
            },
        };
    }

    filterComments(comments) {
        if (!comments) return comments;
        const { authorId, fullName, id, replyToCommentId, replyToName, text, timestamp } = this.state.filters;
        return comments
            .filter(c => c.authorId.toLowerCase().includes(authorId.toLowerCase()))
            .filter(c => c.fullName.toLowerCase().includes(fullName.toLowerCase()))
            .filter(c => c.id.toLowerCase().includes(id.toLowerCase()))
            .filter(c => c.text.toLowerCase().includes(text.toLowerCase()))
            .filter(c => c.timestamp.toLowerCase().includes(timestamp.toLowerCase()));
    }

    render() {
        const { highlightedCommentId } = this.props;

        return (
            <Grid container direction="column" style={{ height: '100%', flexWrap: 'nowrap' }}>
                <Grid item>
                    <Filters filters={this.state.filters} onChange={filters => this.setState({ filters })} />
                </Grid>
                <Grid item container style={{ overflowY: 'auto' }}>
                    <CommentList
                        comments={this.filterComments(this.props.comments)}
                        onAuthorNameClick={({ authorId }) => this.props.history.push('/admin/users/' + authorId)}
                        highlightedComment={highlightedCommentId}
                        onCommentsUpdate={this.props.onCommentsUpdate}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(CommentsList);
