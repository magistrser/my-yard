import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import jsxToString from 'jsx-to-string';
import axios from 'axios';
import Post from '../Post/Post';
import styles from './PostsMap.module.css';

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
        console.log(ReactDOMServer);
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
        const postForm = (
            <form action="/api/create-post" method="post">
                <h1>Create post</h1>
                <textarea type="text" placeholder="Text" name="text" />
                <input type="hidden" name="latitude" value={coords[0]} />
                <input type="hidden" name="longitude" value={coords[1]} />
                <button type="submit">Send</button>
            </form>
        );
        this.mapInstance.balloon.open(coords, ReactDOMServer.renderToString(postForm));
    };

    render() {
        return (
            <div className={styles.mapContainer}>
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
                        height="100%"
                    >
                        {this.state.posts.map((post, i) => (
                            <Placemark
                                key={post.id}
                                defaultGeometry={[post.latitude, post.longitude]}
                                properties={{
                                    balloonContentBody: ReactDOMServer.renderToString(
                                        <>
                                            <img src={post.userPic} />
                                            <Post post={post} />
                                        </>
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
