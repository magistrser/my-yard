import React, { Component } from 'react';
import PostForm from '../PostForm/PostForm';
import Post from '../Post/Post';
import styles from './Posts.module.css';

export default class Posts extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        posts: [
            {
                id: 'guid',
                author: 'test',
                text: 'test',
            },
        ],
    };
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <div className={styles.container}>
                    {this.props.isAuthorized ? <PostForm /> : null}
                    {this.state.posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        );
    }
}
