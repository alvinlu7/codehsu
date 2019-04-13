import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#60ad5e',
        main: '#2e7d32',
        dark: '#005005',
        contrastText: '#ffffff'
      },
      secondary: {
        light: '#fff263',
        main: '#fbc02d',
        dark: '#c49000',
        contrastText: '#000000',
      },
      // error: will use the default color
    },
  });

const app = (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MuiThemeProvider>
  );

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
