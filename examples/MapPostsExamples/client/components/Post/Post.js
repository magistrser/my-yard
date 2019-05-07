import React from 'react';
import styles from './Post.module.css';
import ImageBox from '../ImageBox/ImageBox';
import img from '../ImageBox/exampleImg.png';

export default function Post(props) {
    return (
        <div className={styles.post}>
            <header>
                <img src={props.post.userPic} className={styles.profileThumbnail} />
                <div className={styles.profileName}>
                    <h3>{props.post.author}</h3>
                </div>
            </header>
            <ImageBox images={[img, img, img, img, img]} />
            <div className={styles.inner}>
                <hr />
                <p>{props.post.text}</p>
                <span className={styles.date}>{props.post.date}</span>
            </div>
        </div>
    );
}
