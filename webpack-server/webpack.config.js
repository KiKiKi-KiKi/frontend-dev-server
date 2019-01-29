const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '/dist'),
  },
  devtool: 'source-map',
  // dev-server
  devServer: {
    // open browser
    open: true,
    port: 3000,
    // dev-server public dir name
    contentBase: [
      path.join(__dirname, 'dist'),
      //path.join(__dirname, 'assets'),
    ],
    // bundle file dir
    // ./dist/assets/[name].js
    publicPath: '/assets/',
    // watch the files served by the devServer.contentBase
    // file changes will trigger a full page reload.
    watchContentBase: true
  }
};
