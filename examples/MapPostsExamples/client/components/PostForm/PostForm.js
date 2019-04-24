import React from 'react';
import styles from './PostForm.module.css';
export default function PostForm() {
    return (
        <>
            <form className={styles.form} action="/api/create-post" method="post">
                <h1>Create post</h1>
                <textarea type="text" placeholder="Text" name="text" />
                <button type="submit">Send</button>
            </form>
        </>
    );
}
