import React from 'react';
import styles from './Post.module.css';

export default function Post(props) {
    return (
        <div className={styles.post}>
            <header>
                <img src={props.post.userPic} className={styles.profileThumbnail} />
                <div className={styles.profileName}>
                    <h3>{props.post.author}</h3>
                </div>
            </header>
            <div className={styles.inner}>
                <hr />
                <p>{props.post.text}</p>
                <span className={styles.date}>{props.post.date}</span>
            </div>
        </div>
    );
}
