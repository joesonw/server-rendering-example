const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8080';
const REMOTE = 'http://localhost:3000';

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/styles'),
    ],
  },
  devtool: 'source-map',
  cache: true,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
    ],
  },
  devServer: {
    quiet: false,
    historyApiFallback: true,
    hot: true,
    port: PORT,
    host: HOST,
    noInfo: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/*': {
        target: REMOTE,
        secure: false,
        bypass(req) {
          console.log(req.path);
          if (req.path === '/') {
            return '/www/index.html';
          } else if (req.path.substr(0, 4) === '/www') {
            return true;
          }
        }
      },
    },
  },
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/client.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'www'),
    publicPath: '/www/',
    filename: 'app.js',
  },
  /*
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  */
};
