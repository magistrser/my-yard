import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AuthExample from './components/AuthExample/AuthExample';
import './index.css';

ReactDOM.render(
    <Router>
        <>
            <header className="vk-examples-header">
                <ul className="vk-examples-main-nav">
                    <li>
                        <Link className="vk-examples-link" to="/">
                            Simple Auth
                        </Link>
                    </li>
                </ul>
            </header>
            <Switch>
                <Route exact path="/" component={AuthExample} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
