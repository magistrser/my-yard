import React, { Component } from 'react';
import { Typography, Grid, IconButton, TextField, Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { Consumer } from '../../../context';
import styles from './PostText.module.css';

export default class PostText extends Component {
    constructor() {
        super();
        this.state = {
            isEditorOpen: false,
        };
        this.editFieldRef = React.createRef();
    }

    onEditorClose = isCancelled => {
        if (!isCancelled) {
            const text = this.editFieldRef.current.value;
            try {
                // Axios.put('/api/update-comment/', {
                //     id: this.props.comment.id,
                //     text,
                // });
                console.log('Edited text: ', text);
            } catch (err) {
                console.error(err);
            }
            this.props.onUpdate();
        }
        this.setState({ isEditorOpen: false });
    };

    onEditClick = () => {
        this.setState({ isEditorOpen: true });
    };

    render() {
        return this.state.isEditorOpen ? (
            <>
                <TextField
                    autoFocus
                    multiline
                    margin="dense"
                    fullWidth
                    defaultValue={this.props.children.toString()}
                    inputRef={this.editFieldRef}
                />
                <Button onClick={() => this.onEditorClose(false)} color="primary">
                    OK
                </Button>
                <Button onClick={() => this.onEditorClose(true)} color="primary">
                    Cancel
                </Button>
            </>
        ) : (
            <Consumer>
                {({ user }) => (
                    <Grid container direction="column">
                        <Grid item>
                            <Typography component={'span'} align="justify" className={styles.postText}>
                                {this.props.children}
                            </Typography>
                        </Grid>
                        {this.props.authorId === user?.id && (
                            <Grid item container justify="flex-end">
                                <Grid item>
                                    <IconButton edge="end" onClick={this.onEditClick}>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Consumer>
        );
    }
}
