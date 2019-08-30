import React, { Component } from 'react';
import Layout from './Layout/Layout';

export default class Admin extends Component {
    render() {
        console.log(this.props);

        return (
            <Layout>
                <h1>Content</h1>
            </Layout>
        );
    }
}
