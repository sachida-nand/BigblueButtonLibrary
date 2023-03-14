'use strict'

const util = require('./utils')

const recording = (options) => {
  const getRecordings =(kwparams) => {
    kwparams = { ...kwparams }

    return util.constructUrl(options, 'getRecordings', kwparams)
  }

  const publishRecordings = (recordID, publish) => {
    let qparams = {
      recordID: recordID,
      publish: publish,
    }

    return util.constructUrl(options, 'publishRecordings', qparams)
  }

  const deleteRecordings = (recordID) => {
    let qparams = {
      recordID: recordID,
    }

    return util.constructUrl(options, 'deleteRecordings', qparams)
  }

  const updateRecordings = (recordID, kwparams) => {
    kwparams = { ...kwparams }

    kwparams.recordID = recordID

    return util.constructUrl(options, 'updateRecordings', kwparams)
  }
  
  return {
    getRecordings,
    publishRecordings,
    deleteRecordings,
    updateRecordings,
  }
}

module.exports = recording
