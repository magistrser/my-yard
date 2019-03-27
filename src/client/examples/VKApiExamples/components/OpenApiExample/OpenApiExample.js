/**
 * https://vk.com/dev/openapi
 * https://vk.com/dev/openapi_2
 */

import React, { Component } from 'react';

export default class OpenApiExample extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            loggedIn: false,
        };
    }

    componentWillMount() {
        // Asyncronous way to init VK api

        // Create api transport div
        const vkDiv = document.createElement('div');
        vkDiv.id = 'vk_api_transport';
        document.body.appendChild(vkDiv); // This div required for openApi to work
        // Create callback vkAsyncInit callback (fired when api is loaded)
        window.vkAsyncInit = () => {
            console.log('VK api is loaded', VK);
            this.setState({ loaded: true });
            // Init VK
            VK.init({
                apiId: 6907668,
            });
            // Subscribe to events in OpenAPI event model
            VK.Observer.subscribe('auth.login', e => console.log('User just loged in', e));
            // Create login button using vk api
            // VK.UI.button('fancy_login_button'); // Unclear how it works
        };
        // Append vk api script to transport div
        setTimeout(() => {
            const el = document.createElement('script');
            el.type = 'text/javascript';
            el.src = 'https://vk.com/js/api/openapi.js?160';
            el.async = true;
            document.getElementById('vk_api_transport').appendChild(el);
        }, 0);
    }
    componentWillUnmount() {
        // Clean up so other examples work properly
        const vkDiv = document.getElementById('vk_api_transport');
        document.body.removeChild(vkDiv);
        window.vkAsyncInit = null;
    }

    handleLoginBtnClick = ev => {
        if (!this.state.loggedIn) {
            VK.Auth.login(data => {
                console.log('Loged in via VK.Auth.login', data);
                // To validate authorization we need to do the following:

                // HACK: HOW IS THAT TWO DIFFERENT VALUES FFS!?
                // https://vk.com/dev/openapi_2?f=3.6.%20%D0%90%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%20%D1%83%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9%20%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D0%B5
                const md5hash = VK.MD5(
                    `expire=${data.session.expire}mid=${data.session.mid}secret=${'zf6g1HUZdbqJCzbqtq0N'}sid=${data.session.sid}`
                );
                const sig = data.session.sig;
                alert(`${md5hash} = ${sig}`); // These two must be equal if I understand everything correctly
                this.setState({ loggedIn: data?.status === 'connected' });
            });
        } else {
            VK.Auth.logout(data => console.log('Logged out via VK.Auth.logout', data));
            this.setState({ loggedIn: false });
        }
    };

    handleCheckLoginStatusBtnClick = ev => {
        // Get login status and session data
        VK.Auth.getLoginStatus(status => {
            console.log('VK.Auth.getLoginStatus', status);
        });
    };

    render() {
        return (
            <div>
                <h1>Работа с OpenApi</h1>
                <div hidden={!this.state.loaded}>
                    <button onClick={this.handleLoginBtnClick}>{!this.state.loggedIn ? 'Войти через ВК' : 'Выйти'}</button>
                    <div id="fancy_login_button" />
                    <button onClick={this.handleCheckLoginStatusBtnClick}>Check Login Status</button>
                </div>
            </div>
        );
    }
}
