'use strict'

let { normalizeUrl } = require('./utils')
const httpClientCall = require('./utils').httpClient

const api = (host, salt, options = {}) => {
  options.host = normalizeUrl(host)
  options.salt = salt

  let meetings = require('./administration')(options)
  let monitoring = require('./monitoring')(options)
  let recording = require('./recording')(options)
  let hooks = require('./hooks')(options)

  return {
      meetings,
      monitoring,
      recording,
      hooks,
      httpClientCall
  }
}

module.exports = {
  api,
}