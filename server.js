const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { keystone, apps } = require('./index.js');
const webpackConfig = require('./webpack.config');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;
const compiler = webpack(webpackConfig);

keystone
  .prepare({ apps, dev })
  .then(async ({ middlewares }) => {
    await keystone.connect();
    const app = express();

    if (dev) {
      console.log('✔ Starting Webpack build...');
      app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath: webpackConfig.output.publicPath,
      }));

      app.use(webpackHotMiddleware(compiler, {
        // Use custom HMR path so we don't conflict with Keystone's HMR
        path: '/__react_webpack_hmr',
      }));
    }

    app.use(middlewares);

    app.listen(port, () => {
      console.log(`✔ Keystone instance is ready at http://localhost:${port} 🚀`);
      console.log(`🔗 Keystone Admin UI:   http://localhost:${port}/admin`);
      console.log(`🔗 GraphQL Playground:  http://localhost:${port}/admin/graphiql`);
      console.log(`🔗 GraphQL API:         http://localhost:${port}/admin/api`);
    });
  });
