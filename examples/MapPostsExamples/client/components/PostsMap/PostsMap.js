import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';

export default class PostsMap extends Component {
    constructor(props) {
        super(props);
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl'],
            isYmapsAPILoaded: false,
            posts: [],
        };
    }

    componentDidMount() {
        console.log('This method is called twice every time'); // TODO: WHY componentDidMount is called twice? Because of redirect?
        this.loadPosts();
    }

    async loadPosts() {
        const posts = await axios.get('/api/get-posts');
        this.setState({ posts: posts.data });
    }

    render() {
        return (
            <div className="map-container">
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        onClick={this.handleMapClick}
                        onLoad={ymaps => {
                            this.ymapsAPI = ymaps;
                            this.setState({ isYmapsAPILoaded: true });
                        }}
                        state={this.state}
                        width="100%"
                        height="90vh"
                    >
                        {this.state.posts.map((post, i) => (
                            <Placemark key={i} defaultGeometry={[post.latitude, post.longitude]} />
                        ))}
                    </Map>
                </YMaps>
            </div>
        );
    }
}
