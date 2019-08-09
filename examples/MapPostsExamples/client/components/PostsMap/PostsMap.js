import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import jsxToString from 'jsx-to-string';
import axios from 'axios';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import styles from './PostsMap.module.css';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { BrushTwoTone } from '@material-ui/icons';

const defaultYMapState = {
    center: [55.771707, 37.678784],
    zoom: 7,
    controls: ['zoomControl', 'fullscreenControl'],
};

export default class PostsMap extends Component {
    constructor(props) {
        super(props);
        this.apikey = `9d4c59f1-72a1-418f-a219-a1734042cd50`; // TODO: move it to some kind of config
        this.state = {
            posts: [],
            currentPostIdx: 0,
            inPostAddingMode: false,
            isPostOpen: false,
            showEndedEvents: false,
        };

        this.ymapsAPI = null;
        this.mapInstance = null;
        this.circle = null;
    }

    async componentDidMount() {
        console.log('This method is called twice every time'); // TODO: WHY componentDidMount is called twice? Because of redirect?
        await this.loadPosts();
    }

    componentDidUpdate(prevProps) {
        const { selectedPostId } = this.props;
        if (selectedPostId && prevProps.selectedPostId !== selectedPostId && this.mapInstance) {
            const selectedPost = this.state.posts.find(p => p.id === selectedPostId);
            const coords = [selectedPost.latitude, selectedPost.longitude];
            this.mapInstance.panTo(coords, { flying: true });
        }
        if (this.mapInstance) {
            const { distanceInfo } = this.props;
            let radius = 0;
            let coords = [0, 0];
            if (distanceInfo) {
                radius = distanceInfo.radius;
                coords = [distanceInfo.currentPosition.latitude, distanceInfo.currentPosition.longitude];
            }
            this.circle.geometry.setRadius(radius);
            this.circle.geometry.setCoordinates(coords);
        }
    }

    async loadPosts() {
        const posts = await axios.get('/api/get-post-positions');
        this.setState({ posts: posts.data });
    }

    handleMapClick = async ev => {
        ev.preventDefault();
        if (!this.state.inPostAddingMode || !this.props.isAuthenticated || !this.ymapsAPI || !this.mapInstance) {
            return;
        }
        this.togglePostAddingMode();
        const coords = ev.get('coords');
        // TODO: Give this balloon up and use modal instead? It sucks
        await this.mapInstance.balloon.open(coords, ReactDOMServer.renderToString(<PostForm coords={coords} />));
        // This is the only way to add some interaction to html inside balloon:
        const today = new Date();
        const minDateTimeString = this.getDateTimeString(today);
        const maxDateTimeString = this.getDateTimeString(today, 90); // Skip 90 days
        // Set min and max date values on datetime input
        document.getElementById('event_date_input').setAttribute('min', minDateTimeString);
        document.getElementById('event_date_input').setAttribute('max', maxDateTimeString);
    };

    getDateTimeString(date, offset) {
        if (offset) {
            const tempDate = new Date();
            tempDate.setDate(date.getDate() + offset);
            date = tempDate;
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth returns month number starting from 0
        const day = date.getDate(); // Returns day of month starting from 1
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${date.toLocaleTimeString()}`;
    }

    handleYmapsAPILoaded = ymaps => {
        this.ymapsAPI = ymaps;
        // Add "add post" button
        if (this.props.isAuthenticated) {
            const addPostBtn = new ymaps.control.Button({
                data: {
                    content: 'Add Event',
                },
                options: {
                    maxWidth: [30, 100, 150],
                    selectOnClick: false,
                    position: {
                        // 'auto' not working
                        right: '10px',
                        top: '100px',
                    },
                },
            });
            addPostBtn.events.add('click', this.togglePostAddingMode);
            this.mapInstance.controls.add(addPostBtn /*, { float: 'right' }*/); // float right not working for reason unclear
        }
        // Add "Show ended events" button
        const showEndedEventsBtn = new ymaps.control.Button({
            data: {
                content: 'Show Ended Events',
            },
            options: {
                maxWidth: [30, 100, 150],
                selectOnClick: true,
                position: {
                    right: '10px',
                    top: '150px',
                },
            },
            state: {
                selected: this.state.showEndedEvents,
            },
        });
        // To get button to do something on check-uncheck, we should do following:
        showEndedEventsBtn.events.add(
            'click', // No 'changestate' event or something similar
            ev => {
                const btn = ev.get('target'); // Get button instance
                const manager = btn.state; // Get data.Manager instance (representing state obviously)
                const isSelected = !!manager.get('selected'); // Get 'selected' field. Returns true if selected, undefined othervise
                this.setState({
                    showEndedEvents: !isSelected, // ...and it also returns PREVIOUS state
                });
            }
        ); // Yes, yandex maps are this fucked up
        // We can just switch state on every click, but the only way to wire up our state and this button state is like this/
        this.mapInstance.controls.add(showEndedEventsBtn);

        // Add initial circle
        const coords = [0, 0];
        const radius = 0;
        this.circle = new this.ymapsAPI.Circle(
            [coords, radius],
            { hintContent: 'Drag to change search zone' },
            { draggable: true, fillOpacity: 0.3 }
        );
        this.circle.events.add('dragend', () => {
            const coords = this.circle.geometry.getCoordinates();
            this.props.onCurrentPositionChange({
                latitude: coords[0],
                longitude: coords[1],
            });
        });
        this.mapInstance.geoObjects.add(this.circle);
    };

    togglePostAddingMode = ev => {
        ev?.preventDefault();
        if (!this.state.inPostAddingMode) {
            this.mapInstance.cursors.push('crosshair');
            this.setState({ inPostAddingMode: true });
        } else {
            this.mapInstance.cursors.push('grab');
            this.setState({ inPostAddingMode: false });
        }
    };

    handleMapLoaded = map => {
        this.mapInstance = map;
    };

    handlePlacemarkClick = postIdx => ev => {
        ev.preventDefault();
        this.setState({ isPostOpen: !this.state.isPostOpen, currentPostIdx: postIdx });
    };

    handlePostClose = ev => {
        this.setState({ isPostOpen: false });
    };

    render() {
        return (
            <div className={styles.mapContainer}>
                <Modal open={this.state.isPostOpen} onClose={this.handlePostClose}>
                    {this.state.isPostOpen ? ( // TODO: Use shouldComponentUpdate instead of this
                        <Post
                            postId={this.state.posts[this.state.currentPostIdx].id}
                            isAuthenticated={this.props.isAuthenticated}
                            closePost={this.handlePostClose}
                        />
                    ) : (
                        // For PropTypes of Modal to fuck off
                        <div />
                    )}
                </Modal>
                <YMaps query={{ apikey: this.apikey, load: 'package.full' }}>
                    <Map
                        onClick={this.handleMapClick}
                        onLoad={this.handleYmapsAPILoaded}
                        instanceRef={this.handleMapLoaded}
                        defaultState={defaultYMapState}
                        width="100%"
                        height="100%"
                    >
                        {this.state.posts.map((post, postIdx) => {
                            const eventHasEnded = new Date(post.eventDateTime) < new Date();
                            if (!this.state.showEndedEvents && eventHasEnded) {
                                return;
                            }
                            const iconColor = post.id === this.props.selectedPostId ? 'red' : eventHasEnded ? 'black' : 'blue';
                            const preset = this.props.searchResults?.some(r => r.postId === post.id) ? 'islands#blueDotIcon' : undefined;
                            return (
                                <Placemark
                                    key={post.id}
                                    defaultGeometry={[post.latitude, post.longitude]}
                                    onClick={this.handlePlacemarkClick(postIdx)}
                                    options={{
                                        iconColor,
                                        preset,
                                    }}
                                />
                            );
                        })}
                    </Map>
                </YMaps>
            </div>
        );
    }
}
