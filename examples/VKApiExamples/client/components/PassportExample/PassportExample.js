import React, { Component } from 'react';
import axios from 'axios';

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
            <div>
                <h1>Authorize via passport</h1>
                {!this.state.isAuthorized ? <a href="/api/auth/vkontakte">Login</a> : <a href="/api/logout">Logout</a>}
            </div>
        );
    }
}
