'use strict'
const path = require('path')
const webpack = require('webpack')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.devtool = 'cheap-module-eval-source-map' // https://webpack.js.org/guides/development/#source-maps
webpack_base.output.publicPath = 'http://localhost:' + config.port + config.assets_url
webpack_base.output.path = '/tmp/'

/* On ajoute au entrypoint le serveur-client */
for (var name in webpack_base.entry) {
  webpack_base.entry[name] = [path.resolve(__dirname, './server-client'), ...webpack_base.entry[name]]
}

console.log('Entry points :', webpack_base.entry)

webpack_base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin() // Ne recompile pas les sources si on a une erreur
)

module.exports = webpack_base
