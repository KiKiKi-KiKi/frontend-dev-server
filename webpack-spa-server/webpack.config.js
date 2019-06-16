const path = require('path');
// PATH
const ASSET_PATH = process.env.ASSET_PATH || '/';
const src = path.join(__dirname, 'src');
const entrypoint = {
  app: path.join(src, 'index.js'),
};
const output = path.resolve(__dirname, 'build');

module.exports = (env, argv) => {
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
      ],
    },
    devtool: 'source-map',
  };
};