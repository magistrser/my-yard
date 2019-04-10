import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AuthorizationExample from './components/Authorization/Authorization';
import './index.css';

ReactDOM.render(
    <Router>
        <>
            <header />
            <Switch>
                <Route exact path="/" component={AuthorizationExample} />
                <Route component={AuthorizationExample} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
