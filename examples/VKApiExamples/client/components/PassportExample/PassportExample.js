import React, { Component } from 'react';

export default class PassportExample extends Component {
    render() {
        return (
            <div>
                <h1>Authorize via passport</h1>
                <a href="/api/auth/vkontakte">Login</a>
            </div>
        );
    }
}
