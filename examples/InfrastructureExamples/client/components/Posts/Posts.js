import React, { Component } from 'react';
import PostForm from '../PostForm/PostForm';
import Post from '../Post/Post';
import styles from './Posts.module.css';
import axios from 'axios';

export default class Posts extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        posts: [],
    };

    loadPosts = () => {
        axios.get('/api/get-posts').then(res => {
            console.log('asdasd');
            this.setState({ posts: res.data });
        });
    };

    componentDidMount() {
        this.loadPosts();
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                <div className={styles.container}>
                    {this.props.isAuthorized ? <PostForm /> : null}
                    <button className={styles.button} onClick={this.loadPosts}>
                        Refresh comments
                    </button>
                    <div className={styles.innerContainer}>
                        {this.state.posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
