'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const StyleLintPlugin = require('stylelint-webpack-plugin') // csslinter

const postcss = {
  plugins: [
    require('autoprefixer')({
      browsers: config.browsers
    })
  ]
}

let webpack_base = {
  entry: config.entry,
  output: {
    path: config.assets_path, // Où build ?
    filename: '[name].js',
    publicPath: config.assets_url // Url dans le fichier final
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../js'),
      components: path.join(__dirname, '../js/components'),
      foundation: path.join(__dirname, '../libs/bower_components/foundation-sites/scss/foundation.scss') // pq ça marche po?
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /libs/],
        enforce: 'pre' // preLoader de webpack1
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /libs/],
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: [
          'style-loader',
          'css-loader',
          'postcss-loader', // Juste pour les préfixes ?
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ['css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10,
            name: '[name].[hash:7].[ext]'
          }
        }],

      },
      {
        test: /\.twig/,
        loader: ['twig-loader']
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcss,
      }
    })
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  }
}

if (config.stylelint) {
  webpack_base.plugins.push(
    new StyleLintPlugin({
      files: config.stylelint
    })
  )
}

if (config.html) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'index.html',
      template: 'resources/views/index.twig',
      chunks: ['app', 'home'],
      inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'inscription.html',
      template: 'resources/views/inscription.twig',
      chunks: ['app', 'inscription'],
      // inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'prepare.html',
      template: 'resources/views/prepare.twig',
      chunks: ['app', 'prepare'],
      // inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'participant.html',
      template: 'resources/views/participant.twig',
      chunks: ['app', 'participant'],
      // inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'epreuve.html',
      template: 'resources/views/epreuve.twig',
      chunks: ['app', 'epreuve'],
      // inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({ // What is this ??
      filename: 'planning.html',
      template: 'resources/views/planning.twig',
      chunks: ['app', 'planning'],
      // inject: true // true | 'body' | 'head' | false -> true | body -> inclus les js en fin du body
    })
  )
}

module.exports = webpack_base
