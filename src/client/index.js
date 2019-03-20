import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import App1 from './components/App1/App1';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <>
            <Route path="/" exact component={App} />
            <Route path="/App" component={App1} />
        </>
    </Router>,
    document.getElementById('root')
);
