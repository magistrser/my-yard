import React, { Component } from 'react';

export default class OpenApiExample extends Component {
    constructor() {
        super();
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
            VK.init({
                apiId: 6907668,
            });
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
    render() {
        return (
            <div>
                <h1>hi</h1>
            </div>
        );
    }
}
