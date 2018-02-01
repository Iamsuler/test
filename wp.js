const Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


Encore
    .setOutputPath('public/build/')
    .setPublicPath('/')
    .cleanupOutputBeforeBuild()
    .addPlugin(new CopyWebpackPlugin([{
        from: './assets/img',
        to: 'images'
    }]))
    .enableSassLoader()
    .enablePostCssLoader()
    .enableVersioning(false)
    .createSharedEntry('js/vendor', ['zepto-webpack', 'axios', 'vanilla-lazyload'])
    .addEntry('js/app', './assets/js/app.js')
    .addEntry('js/mobile', './assets/js/mobile.js')
    .addEntry('js/mobile-list', './assets/js/mobile-list.js')
    .addEntry('js/mobile-k', './assets/js/mobile-k.js')
    .addStyleEntry('css/app', ['./assets/scss/app.scss'])
    .addStyleEntry('css/mobile', ['./assets/scss/mobile.scss'])
    .addStyleEntry('css/mobile-list', ['./assets/scss/mobile-list.scss'])
    ;

const webpackConfig = Encore.getWebpackConfig();

// Remove the old version first
webpackConfig.plugins = webpackConfig.plugins.filter(
    plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin)
);

// Add the new one
webpackConfig.plugins.push(new UglifyJsPlugin());

module.exports = webpackConfig;