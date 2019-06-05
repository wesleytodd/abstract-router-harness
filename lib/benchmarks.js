'use strict'
const series = require('run-series')
const createBenchmarks = require('./benchmarks/create')
const routeBenchmarks = require('./benchmarks/route')

module.exports = function (Router, opts, done) {
  // Run the tests
  series([
    createBenchmarks.bind(null, Router, opts),
    routeBenchmarks.bind(null, Router, opts)
  ], (err, stats) => {
    console.log(err, stats)
    done()
  })
}
