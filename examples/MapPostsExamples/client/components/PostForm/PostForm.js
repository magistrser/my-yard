import React from 'react';
import styles from './PostForm.module.css';
import MenuItem from '@material-ui/core/MenuItem';

export default function PostForm(props) {
    console.log(props);
    return (
        <>
            <form className={styles.form} action="/api/create-post" encType="multipart/form-data" method="post">
                <h1>Create post</h1>
                <input placeholder="Title..." type="text" name="title" />
                <textarea placeholder="Enter post text..." type="text" name="text" />
                <input accept="image/*" multiple type="file" name="images" />
                <input type="text" placeholder="Whitespace separated list of tags..." name="tags" />
                <input type="hidden" name="latitude" value={props.coords[0]} />
                <input type="hidden" name="longitude" value={props.coords[1]} />
                <button type="submit">Send</button>
            </form>
        </>
    );
}
