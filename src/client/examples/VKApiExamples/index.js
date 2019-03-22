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
                </ul>
            </header>
            <Switch>
                <Route exact path="/" component={AccessTokenExample} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
