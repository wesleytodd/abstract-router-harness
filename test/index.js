'use strict'
const { describe, it } = require('mocha')
const assert = require('assert')
const abstractRouterHarnes = require('../')
const Router = require('router')

describe('abstract-router-harnes', () => {
  it('has tests', () => {
    assert.strictEqual(typeof abstractRouterHarnes.tests, 'function')
  })
  it('tests pass on `router`', (done) => {
    abstractRouterHarnes.tests(Router, {}, done)
  })
})
