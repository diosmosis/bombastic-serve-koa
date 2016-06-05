'use strict'

const koa = require('koa')
const koaRouter = require('koa-router')
const http = require('http')

const DEFAULT_PORT = 3000

module.exports = serveWithKoa

// TODO: need to switch to supporting koa v2 eventually (using babel)
function* serveWithKoa(project, options = {}) {
  const port = options.port || DEFAULT_PORT

  const swagger = yield project.swagger()

  const app = koa()
  const router = koaRouter({
    prefix: swagger.basePath,
  })

  setupKoaRouter(project, router, swagger)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  let server
  if (options.useSsl) {
    throw new Error('SSL server not yet supported')
  } else {
    server = http.createServer(app.callback()).listen(port)
  }

  project.log('info', `Listening on 127.0.0.1:${port}...`)

  return server
}

function setupKoaRouter(project, router, swagger) {
  Object.keys(swagger.paths).forEach(function eachPath(path) {
    Object.keys(swagger.paths[path]).forEach(function eachMethod(method) {
      addRoute(method, path)
    })
  })

  function addRoute(method, urlPath) {
    if (!router[method]) {
      throw new Error(`Unknown HTTP method '${method}' found for path ${urlPath}.`)
    }

    let handler = swagger.paths[urlPath][method]['x-route-handler']
    handler = handler.getActual(project.path)

    router[method](convertSwaggerPath(urlPath), handler)
  }
}

function convertSwaggerPath(urlPath) {
  return urlPath.replace(/\{([a-zA-Z0-9_-]+)\}/g, ':$1')
}
