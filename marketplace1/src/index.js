import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'mobx-react';
import rootStores from './stores';
ReactDOM.render(
    // <Provider store = {store} AuthStore = {authStore} CurrentUserStore = {currentUserStore}>
    <Provider {...rootStores}>
    <App></App>
    </Provider>
            , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
