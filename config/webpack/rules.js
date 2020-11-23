const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV !== 'development';

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-solid'],
        plugins: ['@babel/plugin-syntax-jsx'],
      },
    },
  },
  {
    test: /\.module\.s(a|c)ss$/,
    use: [
      !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: !isProd,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProd,
        },
      },
    ],
  },
  {
    test: /\.s(a|c)ss$/,
    exclude: /\.module.(s(a|c)ss)$/,
    use: [
      !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProd,
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          presets: [['@babel/preset-env'], 'solid', '@babel/preset-typescript'],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            '@babel/plugin-syntax-jsx',
          ],
          cacheDirectory: true,
          cacheCompression: isProd,
          compact: isProd,
        },
      },
    ],
  },
  {
    test: /\.wasm$/,
    include: path.resolve(__dirname, 'src'),
    use: [
      {
        loader: require.resolve('wasm-loader'),
        options: {},
      },
    ],
  },
];
