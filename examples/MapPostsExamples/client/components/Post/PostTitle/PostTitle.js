import React, { Component } from 'react';
import { Typography, Grid, IconButton, TextField, Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { Consumer } from '../../../context';

export default class PostTitle extends Component {
    constructor() {
        super();
        this.state = {
            isEditorOpen: false,
        };
        this.editFieldRef = React.createRef();
    }

    onEditorClose = isCancelled => {
        if (!isCancelled) {
            const title = this.editFieldRef.current.value;
            try {
                // Axios.put('/api/update-comment/', {
                //     id: this.props.comment.id,
                //     text,
                // });
                console.log('Edited title: ', title);
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
                <TextField autoFocus margin="dense" fullWidth defaultValue={this.props.children.toString()} inputRef={this.editFieldRef} />
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
                    <Grid container justify="flex-start" alignItems="baseline">
                        <Grid item>
                            <Typography component={'span'} align="justify" variant="h5">
                                {this.props.children}
                            </Typography>
                        </Grid>
                        {this.props.authorId === user?.id && (
                            <Grid item>
                                <IconButton edge="end" onClick={this.onEditClick}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Consumer>
        );
    }
}
