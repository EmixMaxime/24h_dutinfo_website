'use strict'
const webpack = require('webpack')
const ExtractCSSPlugin = require('./extractCSSPlugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // I don't know
const AssetsPlugin = require('assets-webpack-plugin') // Génère le fichier de "map" assets.json

const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.devtool = false
webpack_base.output.filename = '[name].[chunkhash:8].js' // On ajoute le hash pcq il n'y est pas par défaut (pas bsn en dev)
webpack_base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractCSSPlugin('[name].[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new AssetsPlugin({filename: config.assets_path + 'assets.json'})
)

// VueJS extract
let vuePlugin = webpack_base.plugins[0].options.options.vue 
vuePlugin.loaders.scss = ExtractCSSPlugin.extract({ 
  loader: ['css-loader', 'postcss-loader', 'sass-loader']
}) 

// Extract SCSS / CSS
// On supprime tous les "loader" pour le css/scss pour mettre seulement le extractPlugin ;)
webpack_base.module.rules.forEach(function (rule, k) {
  if (
    ".scss".match(rule.test) || 
    ".css".match(rule.test)
  ) {
    rule.loader.shift()
    webpack_base.module.rules[k].loader = ExtractCSSPlugin.extract({
      loader: rule.loader
    })
  }
})

module.exports = webpack_base
