import React, { Component } from 'react';
import Comment from '../Comment/Comment';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.comments.map(comment => <Comment comment={comment} />);
    }
}
