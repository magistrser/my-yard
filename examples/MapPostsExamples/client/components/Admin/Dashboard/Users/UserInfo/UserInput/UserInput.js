import React, { Component } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

export default class UserInput extends Component {
    constructor() {
        super();

        this.state = {
            isSubmitBtnVisible: false,
        };
    }

    textFieldRef = React.createRef();

    onSubmitClick = () => this.setState({ isSubmitBtnVisible: false }, () => this.props.onSubmit(this.textFieldRef.current.value));
    onTextFieldChange = () => this.state.isSubmitBtnVisible || this.setState({ isSubmitBtnVisible: true });

    render() {
        const { name, value } = this.props;
        const { isSubmitBtnVisible } = this.state;
        return (
            <>
                <Typography display="inline">{name}: </Typography>
                <TextField inputRef={this.textFieldRef} defaultValue={value} onChange={this.onTextFieldChange} />
                <Button onClick={this.onSubmitClick} style={{ visibility: isSubmitBtnVisible || 'hidden' }}>
                    Submit
                </Button>
            </>
        );
    }
}
