import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import ShortPull from "./components/ShortPull";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LongPull from "./components/LongPull";
import ShortPull from "./components/ShortPull";
const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/' component={ShortPull}/>
            <Route path='/longPull' component={LongPull}/>
        </Switch>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
