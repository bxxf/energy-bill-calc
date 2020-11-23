const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    filename: `${paths.jsFolder}/[hash].js`,
    path: paths.outputPath,
    chunkFilename: '[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
      root: paths.root,
    }),
  ],
};
