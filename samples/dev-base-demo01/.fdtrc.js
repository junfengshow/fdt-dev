const path = require('path');
module.exports = {
  htmlOptions: './',
  cssLoader: {
    modules: false,
  },
  entry: path.resolve(__dirname, '/src/entry.jsx'),
  outputPath: 'dist',
  useHash: true,
  rules: [
    {
      test: /\.jsx/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      ],
    },
  ],

  port: 8088,
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
