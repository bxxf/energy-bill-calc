const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      template: paths.templatePath,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: !isProd ? '[id].css' : 'css/[id].[hash].css',
    }),
  ],
};
