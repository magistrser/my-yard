import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import styles from './PostText.module.css';

export default class PostText extends Component {
    render() {
        return (
            <Typography component={'span'} align="justify" className={styles.postText}>
                {this.props.children}
            </Typography>
        );
    }
}
