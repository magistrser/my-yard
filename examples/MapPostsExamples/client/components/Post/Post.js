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

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            isLoaded: false,
        };
    }

    async componentDidMount() {
        await this.updatePost();
    }

    updatePost = async () => {
        const post = await this.loadPost(this.props.postId);
        this.setState({
            post: post.data,
            isLoaded: true,
        });
    };

    loadPost = async postId => {
        const postInfo = await axios.get('/api/get-post-info', {
            params: {
                id: postId,
            },
        });
        return postInfo;
    };

    render() {
        // Test variable with comments
        // Guarantee comments sorted by date in reversed order
        const comments = [
            {
                id: 'guid-guid-guid-guid-1',
                author: 'Username 1',
                avatar: null,
                date: '00:00:00 01.01.2007',
                replyTo: null,
                text: 'Bla bla bla bla bla bla bla bla bla bla bla bla bla',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
            {
                id: 'guid-guid-guid-guid-2',
                author: 'Username 2',
                avatar: 'https://pp.userapi.com/c841529/v841529614/3c85c/fjMZYRTxIgI.jpg',
                date: '00:00:00 01.01.2007',
                replyTo: {
                    author: 'Username 1',
                    commentId: 'guid-guid-guid-guid-1',
                },
                text: 'Big red fox jumps over french bulochki',
            },
        ];

        return this.state.isLoaded ? (
            <div className={styles.post}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        <Grid item>
                            <Avatar src={this.state.post.avatar} className={styles.profileThumbnail} />
                        </Grid>
                        <Grid item>
                            <h3>{this.state.post.author}</h3>
                            <Typography>{`Posted: ${this.state.post.timestamp}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <SubscribeButton
                            isAuthorized={this.props.isAuthorized}
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
                        <Typography align="justify" className={styles.postText}>
                            {this.state.post.text}
                        </Typography>
                        <hr />
                    </Grid>
                    <Grid item container>
                        <CommentBox comments={comments} />
                    </Grid>
                </Grid>
                <Fab
                    color="secondary"
                    size="small"
                    onClick={this.props.closePost}
                    style={{
                        position: 'absolute',
                        right: '2%',
                        top: '2%',
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
