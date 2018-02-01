const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
var packCSS = new extractTextPlugin('./css/[name].css');

module.exports = {
    entry: {
        'js/vendor': ['zepto-webpack', 'axios', 'vanilla-lazyload'],
        'js/app': path.resolve(__dirname, 'assets/js/app.js'),
        'js/mobile': path.resolve(__dirname, 'assets/js/mobile.js'),
        'js/mobile-list': path.resolve(__dirname, 'assets/js/mobile-list.js'),
        'js/mobile-k': path.resolve(__dirname, 'assets/js/mobile-k.js'),
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => {
                                require('autoprefixer')({
                                    browsers: ['last 5 versions']
                                })
                            }
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => {
                                require('autoprefixer')({
                                    browsers: ['last 5 versions']
                                })
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        packCSS
    ]
}