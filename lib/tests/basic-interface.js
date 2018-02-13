'use strict'
const assert = require('assert')
const methods = require('../methods')

module.exports = function basicInterfaceTest (Router, opts, done) {
  const constructorArgs = opts.constructorArgs || []

  // constructor
  assert(Router(...constructorArgs) instanceof Router)
  assert(new Router(...constructorArgs) instanceof Router)

  // methods
  let router = new Router(...constructorArgs)
  assert.strictEqual(typeof router.handle, 'function')
  methods.forEach((method) => {
    assert.strictEqual(typeof router[method], 'function')
  })

  done()
}
