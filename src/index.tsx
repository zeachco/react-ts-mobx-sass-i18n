import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './App';
import * as serviceWorker from './serviceWorker';
import { app } from './models/App';

(window as any).app = app;

const hook = () => {
    const App = require('./App').default;
    ReactDOM.render(<App />, document.getElementById('root'));
};

hook();

if (module.hot) {
    module.hot.accept('./App', hook)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

