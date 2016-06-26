
var envvar = require('envvar')

module.exports = {
  backendApi: {
    host: envvar.string('BACKEND_API_HOST', 'http://localhost'),
    port: envvar.number('BACKEND_API_PORT', 5000),
  },
}
