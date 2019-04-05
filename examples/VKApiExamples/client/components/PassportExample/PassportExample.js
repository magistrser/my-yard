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
                this.setState({ isAuthorized: res.data });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <div className="auth-header">
                    <h1>Authorize via passport</h1>
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
                        <h1>hi</h1>
                    </div>
                ) : null}
            </>
        );
    }
}
