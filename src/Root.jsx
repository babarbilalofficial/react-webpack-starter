import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.scss';

const Root = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <h1>App is running...</h1>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
