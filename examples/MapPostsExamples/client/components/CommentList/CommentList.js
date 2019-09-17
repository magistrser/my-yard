import React, { Component } from 'react';
import { List } from '@material-ui/core';

import Comment from '../Comment/Comment';

export default class CommentList extends Component {
    render() {
        const { comments, highlightedComment, highlightComment, onAuthorNameClick, onCommentsUpdate } = this.props;

        return (
            <List
                component="nav"
                aria-label="aria-label"
                style={{
                    width: '100%',
                }}
            >
                {comments.map(comment => (
                    <div key={comment.id}>
                        <hr ref={comment.ref} />
                        <Comment
                            comment={comment}
                            selected={highlightedComment === comment.id}
                            highlightComment={highlightComment}
                            onAuthorNameClick={onAuthorNameClick}
                            onUpdate={onCommentsUpdate}
                        />
                    </div>
                ))}
            </List>
        );
    }
}
