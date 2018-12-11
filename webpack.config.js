/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:08:50
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by: wadejs
 * @Last Modified time: 2018-12-11 16:52:51
 */

const path = require('path')
// const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const PurifyCssPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const devConf = require('./config')
const utils = require('./config/utils.js')
module.exports = {
  devtool: 'inline-source-map',
  entry: utils.entries(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl', '.css', '.scss', '.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'js': path.resolve(__dirname, './src/assets/js/'),
      'css': path.resolve(__dirname, './src/assets/css/'),
      'img': path.resolve(__dirname, './src/assets/img/'),
      '@': path.resolve(__dirname, './src/')
    }
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   }, {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }, {
            loader: 'stylus-loader'
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      // {
      //   test: /\.(htm|html)$/i,
      //   use: ['html-withimg-loader']
      // },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'static/imgs/'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/imgs/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/fonts/'
        }
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(html|js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${devConf.dev.devServer.host}:${devConf.dev.devServer.port}`]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    //   // Vue: ['vue/dist/vue.esm.js', 'default']
    // }),
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    // new PurifyCssPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // }),
    new webpack.BannerPlugin('by wadejs'),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '/src/static'),
      to: './static',
      ignore: ['.*']
    }])
  ].concat(utils.htmlPlugin()),
  devServer: devConf.dev.devServer
}