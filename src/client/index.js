import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MapUsingApiDirectly from '../examples/MapUsingApiDirectly/MapUsingApiDirectly';
import MapUsingApiLibrary from '../examples/MapUsingApiLibrary/MapUsingApiLibrary';
import styles from './index.css';
import { PlacemarkMap } from '../examples/PlacemarkMap/PacemarkMap';
import { GeolocationMap } from './components/GeolocationMap/GeolocationMap'

ReactDOM.render(
    <Router>
        <>
            <Route exact path="/" component={MapUsingApiLibrary} />
            <Route exact path="/app" component={MapUsingApiDirectly} />
            <Route exact path="/placemark-map" component={PlacemarkMap} />
            <Route exact path="/geolocation-map" component={GeolocationMap} />
        </>
    </Router>,
    document.getElementById('root')
);
