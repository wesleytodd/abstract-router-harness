'use strict'
const assert = require('assert')

module.exports = {
  testBasicMethod,
  testMultipleCalls,
  testMultipleArgs
}

function testBasicMethod (Router, method, opts, done) {
  const constructorArgs = opts.constructorArgs || []
  const router = new Router(...constructorArgs)

  // Should throw on non-function/non-array arguments
  assert.throws(router[method].bind(router, '/', 'hello'))
  assert.throws(router[method].bind(router, '/', 5))
  assert.throws(router[method].bind(router, '/', null))
  assert.throws(router[method].bind(router, '/', new Date()))

  // Should be chainable
  assert.strictEqual(router[method]('/', (req, res) => {
    assert.strictEqual(req.url, '/', '.' + method + '() should respond to a request')
    done()
  }), router, '.' + method + '() should be chainable')

  // Should handle requests and not call final when matched
  router.handle({
    url: '/',
    method: method.toUpperCase()
  }, {}, (err, req) => {
    assert(!err, `Route not handled: ${method} ${req.url}`)
    assert.fail('should not be reached')
  })
}

function testMultipleCalls (Router, method, opts, done) {
  const constructorArgs = opts.constructorArgs || []
  const router = new Router(...constructorArgs)

  let calls = 0
  router[method]('/', (req, res) => {
    calls++
    calls === 3 && done()
  })

  // Should handle requests and not call final when matched
  function call () {
    router.handle({
      url: '/',
      method: method.toUpperCase()
    }, {}, (err, req) => {
      assert(!err, `Route not handled: ${method} ${req.url}`)
      assert.fail('should not be reached')
    })
  }

  call()
  call()
  call()
}

function testMultipleArgs (Router, method, opts, done) {
  const constructorArgs = opts.constructorArgs || []
  const router = new Router(...constructorArgs)
  router[method]('/foobar', createHandler('foo'), createHandler('bar'), function (req, res) {
    assert.strictEqual(req.url, '/foobar', '.' + method + '() should process multiple handlers')
    assert(res.foo)
    assert(res.bar)
    done()
  })

  router.handle({
    url: '/foobar',
    method: method.toUpperCase()
  }, {}, (err, req) => {
    assert(!err, `Route not handled: ${method} ${req.url}`)
    assert.fail('should not be reached')
  })
}

function createHandler (prop) {
  return function (req, res, next) {
    res[prop] = true
    next()
  }
}
