/**
 * Docs on the topic:
 * https://vk.com/dev/access_token
 * VK uses OAuth 2.0 authentication protocol:
 * https://habr.com/ru/company/mailru/blog/115163/
 */

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AccessTokenExample from './components/AccessTokenExample/AccessTokenExample';
import WidgetExample from './components/WidgetExample/WidgetExample';
import OpenApiExample from './components/OpenApiExample/OpenApiExample';
import PassportExample from './components/PassportExample/PassportExample';
import './index.css';

ReactDOM.render(
    <Router>
        <>
            <header className="vk-examples-header">
                <ul className="vk-examples-main-nav">
                    <li>
                        <Link className="vk-examples-link" to="/">
                            Access Token
                        </Link>
                    </li>
                    <li>
                        <Link className="vk-examples-link" to="/widgets">
                            Widgets
                        </Link>
                    </li>
                    <li>
                        <Link className="vk-examples-link" to="/open-api">
                            Open API
                        </Link>
                    </li>
                    <li>
                        <Link className="vk-examples-link" to="/passport">
                            Passport.js
                        </Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route exact path="/" component={AccessTokenExample} />
                <Route exact path="/widgets" component={WidgetExample} />
                <Route exact path="/open-api" component={OpenApiExample} />
                <Route exact path="/passport" component={PassportExample} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
