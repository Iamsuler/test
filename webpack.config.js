const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'js/vendor': ['zepto-webpack', 'axios', 'vanilla-lazyload'],
    'js/app': path.resolve(__dirname, 'assets/js/app.js'),
    'js/mobile': path.resolve(__dirname, 'assets/js/mobile.js'),
    'js/mobile-list': path.resolve(__dirname, 'assets/js/mobile-list.js'),
    'js/mobile-k': path.resolve(__dirname, 'assets/js/mobile-k.js')
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.resolve(__dirname, 'src'),
      query: {
        presets: ['env']
      }
    }, {
      test: /\.css$/,
      use: extractTextPlugin.extract(['css-loader', 'postcss-loader'])
    }, {
      test: /\.scss$/,
      use: extractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
          // options: {
          //   minimize: true
          // }
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }, {
      test: /\.(png|jpg|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/images/[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new extractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    // new uglify(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['js/vendor', 'manifest']
    })
  ]
}