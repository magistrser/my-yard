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

    render() {
        return (
            <>
                <div className="auth-header">
                    <h1>Authorization via passport</h1>
                    <div style={{ margin: 'auto' }}>
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
                </div>
            </>
        );
    }
}
