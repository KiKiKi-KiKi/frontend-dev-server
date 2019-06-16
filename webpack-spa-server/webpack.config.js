const path = require('path');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// CSS libs
const postcssNormalize = require('postcss-normalize');
const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

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
  const enabledSourceMap = isProduction || false;
  const isOpenDevServer = !!env && env.open;

  const getStyleLoaders = () => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: enabledSourceMap,
          importLoaders: 2
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            isProduction && cssnano({ preset: 'default' }),
            cssMqpacker({
              sort: true
            }),
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize({
              browsers: [">0.25% in JP", "not ie <= 10", "not op_mini all"],
            }),
          ].filter(Boolean),
          sourceMap: enabledSourceMap,
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: false,
        },
      },
    ];
    return loaders;
  };

  return {
    mode: 'development',
    entry: entrypoint,
    output: {
      path: output,
      publicPath: ASSET_PATH,
      filename: '[name].js',
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.json', '.js', '.jsx', 'svg', '.styl'],
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
        {
          test: /\.styl$/,
          use: getStyleLoaders(),
          sideEffects: true,
        },
      ],
    },
    devtool: enabledSourceMap && 'source-map',
    plugins: [
      new CleanWebpackPlugin({
        dry: false,
        verbose: true,
        cleanOnceBeforeBuildPatterns: ['**/*', '!img', '!img/*']
      }),
      new HtmlWebpackPlugin({
        template: htmlTemplate,
      }),
      new MiniCssExtractPlugin({
        filename: "stylesheets/[name].css",
      }),
    ],
    devServer: {
      open: isOpenDevServer,
      port: 3000,
      watchContentBase: true,
    },
  };
};
