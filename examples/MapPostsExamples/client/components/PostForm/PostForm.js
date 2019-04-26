import React from 'react';
import styles from './PostForm.module.css';

export default function PostForm(props) {
    console.log(props);
    return (
        <>
            <form className={styles.form} action="/api/create-post" method="post">
                <h1>Create post</h1>
                <textarea type="text" placeholder="Text" name="text" />
                <input type="hidden" name="latitude" value={props.coords[0]} />
                <input type="hidden" name="longitude" value={props.coords[1]} />
                <button type="submit">Send</button>
            </form>
        </>
    );
}
