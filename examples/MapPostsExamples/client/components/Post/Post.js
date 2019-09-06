import React, { Component } from 'react';
import ImageBox from '../ImageBox/ImageBox';
import img from '../ImageBox/exampleImg.png';
import ImageGallery from '../ImageGallery/ImageGallery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Comment from '../Comment/Comment';
import CommentBox from '../CommentBox/CommentBox';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import PostTitle from './PostTitle/PostTitle';
import PostText from './PostText/PostText';
import styles from './Post.module.css';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            isLoaded: false,
        };
    }

    async componentDidMount() {
        await this.updatePost();
    }

    updatePost = async () => {
        await new Promise(resolve => this.setState({ isLoaded: false }, resolve)); // Can be outsourced into util function
        let post;
        let comments;
        try {
            post = await this.loadPost(this.props.postId);
            comments = await this.loadPostComments(this.props.postId);
        } catch (err) {
            console.error(err);
        }
        if (post && comments) {
            this.setState({
                post,
                comments,
                isLoaded: true,
            });
        }
    };

    loadPost = async postId => {
        const postInfo = await axios.get('/api/get-post-info', {
            params: {
                id: postId,
            },
        });
        return postInfo.data;
    };

    loadPostComments = async postId => {
        const comments = await axios.get('/api/get-comments/', {
            params: {
                postid: postId,
            },
        });
        return comments.data;
    };

    deletePost = async () => {
        const { id } = this.state.post;
        try {
            await axios.delete('/api/delete-post', {
                data: {
                    id,
                },
            });
            this.props.closePost();
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return this.state.isLoaded ? (
            // <div className={styles.post}>
            <Grid container>
                <Grid container direction="column" justify="center" alignItems="flex-start">
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        <Grid item>
                            <Avatar src={this.state.post.avatar} className={styles.profileThumbnail} />
                        </Grid>
                        <Grid item>
                            <h3>{this.state.post.author}</h3>
                            <Typography variant="subtitle2" color="textSecondary">{`Posted: ${this.state.post.timestamp}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="textPrimary">{`Event date: ${this.state.post.eventDateTime}`}</Typography>
                    </Grid>
                    <Grid item container>
                        <SubscribeButton
                            isAuthenticated={this.props.isAuthenticated}
                            postId={this.props.postId}
                            subCount={this.state.post.subCount}
                            onSubscribeButtonClick={this.updatePost}
                        />
                    </Grid>
                    <Grid item>
                        <ImageGallery
                            images={this.state.post.images.map(imgName => {
                                return {
                                    src: `/api/img/${imgName}.jpg`,
                                    width: 4,
                                    height: 3,
                                };
                            })}
                        />
                    </Grid>
                    <Grid item container direction="column" className={styles.inner}>
                        <hr />
                        <PostTitle postId={this.state.post.id} authorId={this.state.post.authorId} onUpdate={this.updatePost}>
                            {this.state.isLoaded ? this.state.post.title : <CircularProgress />}
                        </PostTitle>
                        <PostText postId={this.state.post.id} authorId={this.state.post.authorId} onUpdate={this.updatePost}>
                            {this.state.isLoaded ? this.state.post.text : <CircularProgress />}
                        </PostText>
                        <hr />
                    </Grid>
                    <Grid item container>
                        {this.state.post.tags.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                variant="default"
                                size="small"
                                color="primary"
                                style={{ marginRight: 10, marginBottom: 10 }}
                            />
                        ))}
                    </Grid>
                    <Grid item container>
                        <CommentBox
                            postId={this.props.postId}
                            comments={this.state.comments}
                            onCommentsUpdate={this.updatePost}
                            isAuthenticated={this.props.isAuthenticated}
                        />
                    </Grid>
                </Grid>
                {this.props.isAuthenticated && (
                    <Fab
                        color="default"
                        size="small"
                        onClick={this.deletePost}
                        style={{
                            position: 'absolute',
                            right: '40px',
                            top: '40px',
                        }}
                    >
                        <DeleteIcon />
                    </Fab>
                )}

                <Fab
                    color="default"
                    size="small"
                    onClick={this.props.closePost}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                    }}
                >
                    X
                </Fab>
            </Grid>
        ) : (
            // </div>
            <div className={styles.post}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            </div>
        );
    }
}
