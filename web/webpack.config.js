const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const chalk = require('chalk')
const Dotenv = require('dotenv-webpack');

module.exports = () => {

  // CONFIG
  const entry = ['./resources/scripts/index.js', './resources/styles/main.sass']
  const distPath = 'resources/dist'
  const styleFile = 'styles.css' // RELATIVE TO distPath!

  const env =  process.env.NODE_ENV || 'dev'
  console.info(chalk.blue('Environment is ' + env))
  let webpackPlugins = [
    new ExtractTextPlugin(styleFile),
    new Dotenv()
  ]
  let postcssPlugins = [
    require('autoprefixer')() // create .browserlistrc to modify browser targets
  ]

  if (env === 'dev') {
    console.info(chalk.green('■ Using dev config'))
    // webpackPlugins.push(new LiveReloadPlugin())
  }

  if (env !== 'dev') {
    console.info(chalk.yellow('■ Using production/stage shared config'))
    postcssPlugins.push(require('cssnano')())
    webpackPlugins.push(new UglifyJsPlugin())
  }

  return {
    entry: entry,
    resolve: {
      extensions: ['*', '.js', '.sass', '.scss']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, distPath)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules\/(?!@modulr)|bower_components)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }]
        },
        {
            test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/,
            loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"
        },
        // {
        //     test: /\.css?$/,
        //     use: [
        //         "style-loader",
        //         "css-loader",
        //         "postcss"
        //     ]
        // },
        {
          test: /\.sass$/,
          exclude: /(node_modules\/(?!@modulr)|bower_components)/,
          use: ExtractTextPlugin.extract([
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: (loader) => postcssPlugins
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ])
        }
      ]
    },
    plugins: webpackPlugins,
    stats: {
      colors: true
    },
    devtool: 'source-map'
  }
}
