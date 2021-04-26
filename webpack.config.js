const path = require('path');

const webpack = require('webpack');

const WebpackNodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    server: [
      // 'webpack/hot/poll?1000',
      './src/index.ts',
    ],
  },
  output: {
    path: path.resolve('build'),
    filename: 'api.js',
    // https://github.com/webpack/webpack/pull/8642
    futureEmitAssets: true,
  },
  watch: true,
  target: 'node',
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
        exclude: [/node_modules/],
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
    fs: 'empty',
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'nebula-api.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
