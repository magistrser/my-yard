import React from 'react';
import styles from './PostForm.module.css';
import MenuItem from '@material-ui/core/MenuItem';

export default function PostForm(props) {
    console.log(props);
    return (
        <>
            <form className={styles.form} action="/api/create-post" enctype="multipart/form-data" method="post">
                <h1>Create post</h1>
                <textarea placeholder="Enter post text..." type="text" placeholder="Text" name="text" />
                <input accept="image/*" multiple type="file" name="images" />
                <input type="hidden" name="latitude" value={props.coords[0]} />
                <input type="hidden" name="longitude" value={props.coords[1]} />
                <button type="submit">Send</button>
            </form>
        </>
    );
}
