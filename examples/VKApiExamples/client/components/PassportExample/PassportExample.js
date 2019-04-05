import React, { Component } from 'react';
import axios from 'axios';
import './PassportExample.css';

export default class PassportExample extends Component {
    constructor() {
        super();
    }
    state = {
        isAuthorized: false,
    };

    componentDidMount() {
        axios
            .get('/api/check-authentication') // How secure is this?
            .then(res => {
                console.log(res);
                this.setState({ isAuthorized: res.data.isAuthenticated });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isAuthorized: false });
            });
    }

    handleFormSubmit = ev => {
        ev.preventDefault();

        const content = this.refs.postContent.value;

        if (confirm('Are you sure?')) {
            axios
                .post('/api/create-post-in-group', {
                    content,
                })
                .then(val => console.log(val))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <>
                <div className="auth-header">
                    <h1>Authorization via passport</h1>
                    {!this.state.isAuthorized ? (
                        <a className="btn" href="/api/auth/vkontakte">
                            Login
                        </a>
                    ) : (
                        <a className="btn btn-red" href="/api/logout">
                            Logout
                        </a>
                    )}
                </div>
                {this.state.isAuthorized ? (
                    <div>
                        <form id="post-form">
                            <label>Add post to vk group</label>
                            <textarea placeholder="Post content" ref="postContent" />
                            <button text="Submit" onClick={this.handleFormSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                ) : null}
            </>
        );
    }
}
