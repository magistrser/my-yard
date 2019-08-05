import React from 'react';

import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
