import React, { Component } from 'react';
import axios from 'axios';

export default class WidgetExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://vk.com/js/api/openapi.js?160';
        document.head.appendChild(script);
        // HACK: This one kinda bad, need to check if VK api loaded somehow instead of waiting for 0.5 sec
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }
    componentDidUpdate() {
        console.log(VK);
        VK.init({ apiId: 6907668 });
        VK.Widgets.Auth('vk_auth', {
            onAuth: function(data) {
                alert('user ' + data['uid'] + ' authorized');
            },
        });
    }

    render() {
        return (
            <div>
                <h1>Authentication vidget</h1>
                <p>It won't work on localhost for some reason</p>
                {this.state.loading ? <h2>Loading...</h2> : <div id="vk_auth" />}
            </div>
        );
    }
}
