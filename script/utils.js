'use strict'

const axios = require('axios')
const querystring = require('querystring')
const crypto = require('hash.js')
// const parser = require('fast-xml-parser')
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const normalizeUrl = (url) => {
    return /\/$/.test(url) ? url.slice(0, -1) : url
}

const getChecksum = (callName, queryParams, sharedSecret, hashMethod = 'sha1') => {
    return crypto[hashMethod]()
      .update(`${callName}${querystring.encode(queryParams)}${sharedSecret}`)
      .digest('hex')
}

const constructUrl = (options, action, params) => {
    params.checksum = getChecksum(action, params, options.salt, options.hashMethod)
    return `${options.host}/api/${action}?${querystring.encode(params)}`
}

const httpClient = (url) => {
  return axios(url, {
    headers: { Accept: 'text/xml, application/json, text/plain, */*' },
  })
    .then((response) => {
      return response.data
    })
    .then(function (xml) {
      return parseXml(xml)
    })
}


const getPathname = (url, host) => {
  return url.replace(host, '')
}

const parseXml = (xml) => {
    console.log(xml);
  const json = parser.parse(xml).response

  if(json.meetings) {
    let meetings = json.meetings ? json.meetings.meeting : []
    meetings = Array.isArray(meetings) ? meetings : [meetings]
    json.meetings = meetings
  }
  if (json.recordings) {
    let recordings = json.recordings ? json.recordings.recording : []
    recordings = Array.isArray(recordings) ? recordings : [recordings]
    json.recordings = recordings
  }
  return json
}

module.exports = {
    httpClient,
    getChecksum,
    constructUrl,
    normalizeUrl,
    getPathname,
    parseXml,
  }