import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n'; // Load locale translations
import { AuthProvider } from './auth/AuthProvider';

import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Router>
            <AuthProvider>
               <App />
            </AuthProvider>
         </Router>
      </ThemeProvider>
   </React.StrictMode>,
   document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
