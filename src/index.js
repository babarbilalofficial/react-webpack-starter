import 'core-js/fn/object/assign';
import 'core-js/fn/array/includes';
import 'core-js/fn/string/trim';
import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/map';
import React from 'react';
import { hydrate, render } from 'react-dom';

const isBrowser = (typeof window != 'undefined') ? true : false;

// if(isBrowser){
//   require('./theme-assets/styles.scss');
// }
import configureStore from './store/configureStore';
import Root from './Root.jsx';

let renderApp = hydrate;

if (module.hot) {
  module.hot.accept();
  renderApp = render;
}


const preloadedState = (isBrowser) ? window.__PRELOADED_STATE__ : {};

const store = configureStore(preloadedState);

if (isBrowser){
  delete window.__PRELOADED_STATE__;
}

renderApp(
  <Root store={store} />, document.getElementById('root')
);
