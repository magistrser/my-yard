import React from 'react';
import styles from './Post.module.css';

export default function Post(props) {
    return (
        <div className={styles.post}>
            <p>
                <b>{props.post.author}> </b>
                {props.post.text}
            </p>
        </div>
    );
}
