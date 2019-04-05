/**
 * https://vk.com/dev/openapi
 * https://vk.com/dev/openapi_2
 */

import React, { Component } from 'react';
import './OpenApiExample.css';

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
            // To validate authorization (on server side) we need to do the following:
            // (https://vk.com/dev/openapi_2?f=3.6.%20Авторизация%20на%20удаленной%20стороне)
            const hash =
                `expire=${status.session.expire}` +
                `mid=${status.session.mid}` +
                `secret=${status.session.secret}` +
                `sid=${status.session.sid}` +
                `${'zf6g1HUZdbqJCzbqtq0N'}`; // TODO: Secret key

            const md5hash = VK.MD5(hash); // md5 of incoming parameters + API secret key
            const sig = status.session.sig; // ...should be equal to this signature
            alert(`${md5hash} = ${sig}`); // true
        });
    };

    handleFormSubmit = ev => {
        ev.preventDefault();
    };

    render() {
        return (
            <>
                <div id="openapi-header" hidden={!this.state.loaded}>
                    <h1>Работа с OpenApi</h1>
                    <div id="opebapi-login-buttons">
                        <button onClick={this.handleLoginBtnClick}>{!this.state.loggedIn ? 'Войти через ВК' : 'Выйти'}</button>
                        <button onClick={this.handleCheckLoginStatusBtnClick}>Check Login Status</button>
                    </div>
                </div>
                {this.state.loggedIn ? (
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
