'use strict'
const benchmark = require('benchmark')

module.exports = function createBenchmarks (Router, opts, done) {
  const constructorArgs = opts.constructorArgs || []
  const suite = new benchmark.Suite()

  suite.add('create a router and add a static route', () => {
    const router = new Router(...constructorArgs)
    router.get('/', () => {})
  })

  suite.add('create a router and add a parameterized route', () => {
    const router = new Router(...constructorArgs)
    router.get('/:foo', () => {})
  })

  suite.add('create a router and add 20 routes', () => {
    const router = new Router(...constructorArgs)
    for (let i = 0; i < 20; i++) {
      router.get('/' + i, () => {})
    }
  })

  suite.on('complete', function () {
    done(null, suite)
  })

  suite.run({
    async: true
  })
}
