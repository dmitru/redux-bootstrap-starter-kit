const context = require.context('./app/', true, /.+\.test\.jsx?$/)

require('core-js/es6')

context.keys().forEach(context)
module.exports = context
