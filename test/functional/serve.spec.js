'use strict'

const path = require('path')
const expect = require('chai').expect
const request = require('request-promise')
const Bombastic = require('bombastic').Bombastic
const serveKoa = require('../../lib')

const TEST_PROJECT_PATH = path.join(__dirname, '../app')
const TEST_URL = 'http://localhost:3000'

// TODO: should execute bombastic command instead of going directly through serveKoa
describe('serve-koa', function () {
  let app
  beforeEach(function () {
    app = new Bombastic(TEST_PROJECT_PATH)
  })

  let server
  beforeEach(function* () {
    server = yield serveKoa(app)
  })
  afterEach(function () {
    server.close()
  })

  it('should expose swagger routes correctly', function * () {
    let response = yield request({
      method: 'get',
      uri: `${TEST_URL}/v1/pets`,
      simple: false
    })
    expect(response).to.equal('getAll called')

    response = yield request({
      method: 'post',
      uri: `${TEST_URL}/v1/pets`,
      simple: false
    })
    expect(response).to.equal('create called')

    response = yield request({
      method: 'get',
      uri: `${TEST_URL}/v1/pets/123`,
      simple: false
    })
    expect(response).to.equal('get called')
  })
})
