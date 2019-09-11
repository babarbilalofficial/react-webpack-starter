/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import config from '../src/config';
import Loadable from 'react-loadable';

const production = process.env.NODE_ENV == 'production' ? true : false;

// Raven.config('https://a8f8ff6e9dcc4f6a8ace4829c477018e@sentry.io/1199080').install();

const port = config.port;
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.resolve(__dirname, '..', 'dist')));


Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(
      `
      =====================================================
      -> Production Server Running at port ${port}...
      =====================================================
    `
    );
  }).on('error', (err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log('Unable to preload', err);
});