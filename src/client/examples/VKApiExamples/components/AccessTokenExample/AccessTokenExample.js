import React, { Component } from 'react';
import ImplicitFlow from './ImplicitFlow';
import AuthorizationCodeFlow from './AuthorizationCodeFlow';

export default class AccessTokenExample extends Component {
    render() {
        return (
            <div>
                <ImplicitFlow />
                <AuthorizationCodeFlow />
            </div>
        );
    }
}
