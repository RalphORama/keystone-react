const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { keystone, apps } = require('./index.js');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

keystone
  .prepare({ apps, dev })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = express();

    if (dev) {
      console.log('> Setting up webpack-dev-middleware');
      app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath: webpackConfig.output.publicPath,
      }));

      console.log('> Setting up webpack-hot-middleware');
      app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
        reload: false,
      }));
    }

    console.log('> Setting up other middleware');
    app.use(middlewares);

    app.listen(port, () => {
      console.log(`> Listening on http://localhost:${port}`);
    });
  });
