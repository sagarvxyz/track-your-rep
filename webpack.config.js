const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './ui/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'http://localhost:8080/dist/',
    filename:'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public/'),
    },
    proxy: {
      '/api': 'http://localhost:3000'
    },
    port: 8080,
    hot: true
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}