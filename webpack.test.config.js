const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Loadable = require('react-loadable/webpack');
const ReactLoadablePlugin = Loadable.ReactLoadablePlugin;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  name: "app",
  devtool: 'eval-source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin([
      'dist'
    ], {
      root: __dirname,
      verbose: true,
      beforeEmit: true
    }),
    /* Extract manifest into its own bundle */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2,
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    HtmlWebpackPluginConfig,
    new CopyWebpackPlugin([
      { from: './src/assets', to: './assets' }
    ])
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(?:png|jpg|svg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, 'src')
    }
  }
};
