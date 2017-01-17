'use strict'
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpack_dev = require('./webpack.dev')
const config = require('./config')
const compiler = webpack(webpack_dev)
const hotMiddleware = require('webpack-hot-middleware')(compiler) // Ce plugin a le "overlay" qui affiche les erreurs eslint ect sur le navigateur directement
const chokidar = require('chokidar')

// Force le rafraichissement du navigateur
let refresh = function (path) {
  console.log('* ' + path + ' changed')
  hotMiddleware.publish({action: 'reload'}) // Dit au clien de refresh le navigateur (partie server-client catch ça)
}

let server = new WebpackDevServer(compiler, { // compiler = instance de webpack avec les configurations de dev ici
  hot: true,
  historyApiFallback: config.historyApiFallback,
  quiet: false,
  noInfo: false,
  publicPath: webpack_dev.output.publicPath, // Dossier où se trouvent nos != assets
  stats: {
    colors: true,
    chunks: false
  }
})
server.use(hotMiddleware)
server.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  chokidar.watch(config.refresh).on('change', refresh)
  console.log('==> Listening on http://localhost:' + config.port)
})
