#!/usr/bin/env node

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config.js')
const config = require('./config')
const proxy = require('http-proxy-middleware')

const routes = require('./routes')

const backendApiUrl = `${config.backendApi.host}:${config.backendApi.port}`
const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : (process.env.PORT ? process.env.PORT : 3000)
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use('/api', proxy({ target: backendApiUrl, changeOrigin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if (isDeveloping) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use('/auth', routes.api)
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    res.end()
  })
} else {
  app.use(express.static(path.join(__dirname, '/dist')))
  app.use('/auth', routes.api)
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
if (isDeveloping) {
  app.use( (err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err,
    })
  })
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
    res.json('error', {
      message: err.message,
      error: {},
    })
  })
}

if (!module.parent) {
  app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err)
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
    console.info(`==> 🌎 Proxying /api to ${backendApiUrl}/api.`)
  })
} else {
  module.exports = app
}
