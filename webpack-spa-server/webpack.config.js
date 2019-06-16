const path = require('path');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PATH
const ASSET_PATH = process.env.ASSET_PATH || '/';
const src = path.join(__dirname, 'src');
const entrypoint = {
  app: path.join(src, 'index.js'),
};
const output = path.resolve(__dirname, 'build');

// html template
const htmlTemplate = path.join(src, 'index.pug');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isOpenDevServer = !!env && env.open;

  return {
    mode: 'development',
    entry: entrypoint,
    output: {
      path: output,
      publicPath: ASSET_PATH,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader", }
          ],
        },
        {
          test: /\.pug$/,
          use: {
            loader: 'pug-loader',
            options: !isProduction ? {
              pretty: true
            } : {}
          }
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
      }),
    ],
    devServer: {
      open: isOpenDevServer,
      port: 3000,
      watchContentBase: true,
    },
  };
};