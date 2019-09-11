const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Loadable = require('react-loadable/webpack');
const ReactLoadablePlugin = Loadable.ReactLoadablePlugin;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

let pathsToClean = [
  // 'dist'
];

let cleanOptions = {
  root: __dirname,
  verbose: true,
  beforeEmit: true
};

const extractSass = new ExtractTextPlugin({
  filename: "app.[chunkhash].css",
  disable: false
});

module.exports = {
  name: "app",
  devtool: false,
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    /* Extract manifest into its own bundle */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      sourceMap: false
    }),
    HtmlWebpackPluginConfig,
    extractSass,
    new CopyWebpackPlugin([
      {from: './src/assets', to: './assets'}
    ])
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
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
      src: path.resolve(__dirname, 'src')
    }
  }
};
