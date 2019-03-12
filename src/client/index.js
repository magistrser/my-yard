import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import App_1 from './components/App/App_1';
import styles from './index.css';
import { PlacemarkMap } from './components/PlacemarkMap/PacemarkMap';

ReactDOM.render(
    <Router>
        <>
            <Route exact path="/" component={App_1} />
            <Route exact path="/app" component={App} />
            <Route exact path="/PlacemarkMap" component={PlacemarkMap} />
        </>
    </Router>,
    document.getElementById('root')
);
