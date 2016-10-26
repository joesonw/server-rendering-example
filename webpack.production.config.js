const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [

/*****  client ******/

{
  plugins: [
    new ExtractTextPlugin('client.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
  name: 'client',
  entry: path.resolve(__dirname, 'src/client.js'),
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/styles'),
    ],
  },
  cache: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'client.js',
  },
},

/****  server ******/

{
  name:' server',
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/styles'),
    ],
  },
  devtool: ['source-map'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'null',
      },
      {
        test: /\.scss$/,
        loader: 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass',
      },
    ],
  },
  entry: path.resolve(__dirname, 'src/server.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'dist/',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals(),
  ],
}];
