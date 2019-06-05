'use strict'
const benchmark = require('benchmark')

module.exports = function createBenchmarks (Router, opts, done) {
  const suite = new benchmark.Suite()
  const constructorArgs = opts.constructorArgs || []
  const router = new Router(...constructorArgs)
  router.get('/', createHandler())

  suite.add('route a single exact match', {
    defer: true,
    fn: (defer) => {
      router.handle({
        method: 'GET',
        url: '/'
      }, {}, (req, res) => {
        defer.resolve()
      })
    }
  })

  suite.on('complete', function () {
    done(null, this.filter('fastest').map('name'))
  })

  suite.run({
    async: true
  })
}

function createHandler () {
  return function (req, res, next) {
    next()
  }
}
