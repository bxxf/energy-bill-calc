/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV !== 'development';

const paths = require('./paths');
const rules = require('./rules');

module.exports = {
  entry: paths.entryPath,
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.scss', '.css', '.tsx', '.ts'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/assets/icons/favicon.png',
      template: paths.templatePath,
      inject: 'head',
      minify: isProd
        ? {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            minifyURLs: true,
            removeComments: true,
            removeAttributeQuotes: true,
          }
        : undefined,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/static' }],
    }),
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : 'css/[hash].css',
      chunkFilename: !isProd ? '[id].css' : 'css/[id].[hash].css',
    }),
  ],
};
