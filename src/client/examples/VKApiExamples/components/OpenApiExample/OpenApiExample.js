import React, { Component } from 'react';

export default class OpenApiExample extends Component {
    constructor() {
        super();
        this.state = {
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
            // Init VK
            VK.init({
                apiId: 6907668,
            });
            // Subscribe to events in OpenAPI event model
            VK.Observer.subscribe('auth.login', e => console.log('User just loged in', e));
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

    render() {
        return (
            <div>
                <h1>Работа с OpenApi</h1>
                <button onClick={this.handleLoginBtnClick}>{!this.state.loggedIn ? 'Войти через ВК' : 'Выйти'}</button>
            </div>
        );
    }
}
