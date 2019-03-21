import React, { Component } from 'react';

export default class AuthExample extends Component {
    componentDidMount() {
        // TODO: Make this thing loading like with yandex maps api:
        <script type="text/javascript" src="https://vk.com/js/api/openapi.js?160" />;
        VK.init({ apiId: 6907668 });
        VK.Widgets.Auth('vk_auth', { onAuth: "function(data) {alert('user '+data['uid']+' authorized');}" });
    }
    render() {
        return (
            <div>
                <h1>Authentication vidget</h1>
                <div id="vk_auth" />
            </div>
        );
    }
}
