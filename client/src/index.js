import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import modules from './modules';
//미들웨어를 적용해보자
import listMiddleware from './lib/listMiddleware';
import penderMiddleware from 'redux-pender';
import ReduxThunk from 'redux-thunk';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';



const store = createStore(modules, applyMiddleware(ReduxThunk));
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
