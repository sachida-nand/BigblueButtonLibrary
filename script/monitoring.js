'use strict'

const util = require('./utils')

const monitoring = (options) => {
  const getMeetingInfo = (meetingID) => {
    let qparams = {
      meetingID: meetingID,
    }

    return util.constructUrl(options, 'getMeetingInfo', qparams)
  }

  const isMeetingRunning = (meetingID) => {
    let qparams = {
      meetingID: meetingID,
    }

    return util.constructUrl(options, 'isMeetingRunning', qparams)
  }

  const getMeetings = () => {
    let qparams = {}

    return util.constructUrl(options, 'getMeetings', qparams)
  }

  return {
    getMeetingInfo,
    isMeetingRunning,
    getMeetings,
  }
  
}

module.exports = monitoring
