import React, { Component } from 'react';
import axios from 'axios';
import './Authorization.css';

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
                <div>
                    <h1>Authorization via passport</h1>
                    <div>{!this.state.isAuthorized ? <a href="/api/auth/vkontakte">Login</a> : <a href="/api/logout">Logout</a>}</div>
                </div>
            </>
        );
    }
}
