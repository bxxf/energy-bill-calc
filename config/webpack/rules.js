const path = require('path');
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
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
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
          cacheCompression: false,
          compact: false,
        },
      },
    ],
  },

  {
    test: /\.wasm$/, // only load WASM files (ending in .wasm)
    // only files in our src/ folder
    include: path.resolve(__dirname, 'src'),
    use: [
      {
        // load and use the wasm-loader dictionary
        loader: require.resolve('wasm-loader'),
        options: {},
      },
    ],
  },
];
