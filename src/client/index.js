import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MapUsingApiDirectly from '../examples/MapUsingApiDirectly/MapUsingApiDirectly';
import MapUsingApiLibrary from '../examples/MapUsingApiLibrary/MapUsingApiLibrary';
import styles from './index.css';
import { PlacemarkMap } from '../examples/PlacemarkMap/PacemarkMap';

ReactDOM.render(
    <Router>
        <>
            <Route exact path="/" component={MapUsingApiLibrary} />
            <Route exact path="/app" component={MapUsingApiDirectly} />
            <Route exact path="/PlacemarkMap" component={PlacemarkMap} />
        </>
    </Router>,
    document.getElementById('root')
);
