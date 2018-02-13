'use strict'
const series = require('run-series')
const methods = require('./methods')
const basicInterfaceTest = require('./tests/basic-interface')
const methodTests = require('./tests/methods')

module.exports = function (Router, opts, done) {
  // Built tests array
  var tests = [
    basicInterfaceTest.bind(null, Router, opts)
  ]

  methods.forEach((m) => {
    tests.push(methodTests.testBasicMethod.bind(null, Router, m, opts))
    tests.push(methodTests.testMultipleCalls.bind(null, Router, m, opts))
    if (opts.supportsMultipleArgs) {
      tests.push(methodTests.testMultipleArgs.bind(null, Router, m, opts))
    }
  })

  // Run the tests
  series(tests, done)
}
