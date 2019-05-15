import React from 'react';
import styles from './Post.module.css';
import ImageBox from '../ImageBox/ImageBox';
import img from '../ImageBox/exampleImg.png';
import ImageGallery from '../ImageGallery/ImageGallery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

export default function Post(props) {
    return (
        <div className={styles.post}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item container direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                        <Avatar src={props.post.userPic} className={styles.profileThumbnail} />
                    </Grid>
                    <Grid item>
                        <h3>{props.post.author}</h3>
                        <Typography>{`Posted: ${props.post.date}`}</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <ImageGallery />
                </Grid>
                <Grid item container direction="column" className={styles.inner}>
                    <hr />
                    <Typography>{props.post.text}</Typography>
                </Grid>
                <Grid item container justify="flex-end">
                    <Button variant="contained" color="primary">
                        Subscribe
                    </Button>
                </Grid>
            </Grid>
            <Fab
                color="secondary"
                size="small"
                onClick={props.closePost}
                style={{
                    position: 'absolute',
                    right: '2%',
                    top: '2%',
                }}
            >
                X
            </Fab>
        </div>
    );

    /*
        <div className={styles.post}>
            <header>
                <img src={props.post.userPic} className={styles.profileThumbnail} />
                <div className={styles.profileName}>
                    <h3>{props.post.author}</h3>
                </div>
            </header>
            <ImageGallery />
            <div className={styles.inner}>
                <hr />
                <p>{props.post.text}</p>
                <span className={styles.date}>{props.post.date}</span>
            </div>
        </div>
     */
}
