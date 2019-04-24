import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import jsxToString from 'jsx-to-string';
import axios from 'axios';
import Post from '../Post/Post';

export default class PostsMap extends Component {
    constructor(props) {
        super(props);
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`;
        this.state = {
            center: [55.771707, 37.678784],
            zoom: 7,
            controls: ['zoomControl', 'fullscreenControl'],
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

    handleMapClick = async ev => {
        ev.preventDefault();
        if (!this.ymapsAPI || !this.mapInstance || !this.props.isAuthorized) {
            return;
        }
        const coords = ev.get('coords');
        // Open balloon
        this.mapInstance.balloon.open(coords, '<h1>hi</h1>');
    };

    render() {
        return (
            <div className="map-container">
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        onClick={this.handleMapClick}
                        onLoad={ymaps => {
                            this.ymapsAPI = ymaps;
                        }}
                        instanceRef={map => {
                            this.mapInstance = map;
                        }}
                        state={this.state}
                        width="100%"
                        height="90vh"
                    >
                        {this.state.posts.map((post, i) => (
                            <Placemark
                                key={post.id}
                                defaultGeometry={[post.latitude, post.longitude]}
                                properties={{
                                    balloonContentBody: jsxToString(
                                        <div>
                                            <img src={post.userPic} />
                                            <h2>{post.author}</h2>
                                            <section>{post.text}</section>
                                        </div>
                                    ),
                                }}
                            />
                        ))}
                    </Map>
                </YMaps>
            </div>
        );
    }
}
