import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import './styles/styles.scss';

const context = {};

const Root = ({store, req}) => (
  <Provider store={store}>
    <StaticRouter context={context} location={req.url}>
      <h1>App is running...</h1>
    </StaticRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
