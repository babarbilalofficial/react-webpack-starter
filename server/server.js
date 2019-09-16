/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import fs from 'fs';
import config from '../src/config';
import Loadable from 'react-loadable';

const production = process.env.NODE_ENV == 'production' ? true : false;

// Raven.config('https://a8f8ff6e9dcc4f6a8ace4829c477018e@sentry.io/1199080').install();

const port = config.port;
const app = express();
const filename = path.resolve(__dirname, '..', 'dist', 'index.html');
let appHtml = '';

try {
  appHtml = fs.readFileSync(filename, 'utf8');
} catch (err){
  console.log('Unable to read html file', err);
  process.exit();
}

app.use("/assets", express.static(path.resolve(__dirname, '..', 'dist/assets')));
app.use('/', express.static(path.resolve(__dirname, '..', 'dist')));

app.get('/*', (req, res, next) => {
  res.send(appHtml);
});

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