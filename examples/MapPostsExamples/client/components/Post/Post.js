import React, { Component } from 'react';
import styles from './Post.module.css';
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
        const post = await this.loadPost(this.props.postId);
        const comments = await this.loadPostComments(this.props.postId);
        this.setState({
            post,
            comments,
            isLoaded: true,
        });
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

    render() {
        return this.state.isLoaded ? (
            <div className={styles.post}>
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
                        <PostTitle onUpdate={() => console.log('Title has been updated')}>{this.state.post.title}</PostTitle>
                        <PostText>{this.state.post.text}</PostText>
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
                        onClick={() => console.log('Delete post')}
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
            </div>
        ) : (
            <div className={styles.post}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            </div>
        );
    }
}
