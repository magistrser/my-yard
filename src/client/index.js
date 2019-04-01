import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import App1 from './components/App1/App1';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <>
            <div hidden>There might be navigation bar for all views or smth</div>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/App1" component={App1} />
                <Route component={App /* Redirect to 404 page for instance */} />
            </Switch>
        </>
    </Router>,
    document.getElementById('root')
);
