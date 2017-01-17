'use strict'
const path = require('path')
const webpack = require('webpack')
const webpack_base = require('./webpack.base')
const config = require('./config')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
  new webpack.NoErrorsPlugin(), // Ne recompile pas les sources si on a une erreur
  new BrowserSyncPlugin(
    // BrowserSync options 
    {
      // browse to http://localhost:3000/ during development 
      host: 'localhost',
      port: 3000,
      // proxy the Webpack Dev Server endpoint 
      // (which should be serving on http://localhost:3100/) 
      // through BrowserSync 
      proxy: 'http://localhost:3003/'
    },
    // plugin options 
    {
      // prevent BrowserSync from reloading the page 
      // and let Webpack Dev Server take care of this 
      reload: false
    }
  )
)

module.exports = webpack_base
