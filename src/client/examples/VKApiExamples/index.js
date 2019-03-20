import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AuthExample from './components/AuthExample/AuthExample';
import styles from './index.css';

ReactDOM.render(
    <Router>
        <>
            <nav className={styles.vknav}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" component={AuthExample} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
