'use strict'

const util = require('./utils')

const meetings = (options) => {
    const createMeeting = (name, id, kwparams) => {
      kwparams = { ...kwparams }
      kwparams.name = name
      kwparams.meetingID = id
        
      return util.constructUrl(options, 'create', kwparams)
    }

    const joinMeeting = (fullName, meetingID, kwparams) => {
        kwparams = { ...kwparams }
        kwparams.fullName = fullName
        kwparams.meetingID = meetingID
        // kwparams.password = password
        return util.constructUrl(options, 'join', kwparams)
      }

    const endMeeting = (meetingID, password) => {
        let kwparams = {
          meetingID: meetingID,
          password: password,
        }
        return util.constructUrl(options, 'end', kwparams)
      }

    return {
      createMeeting,
      joinMeeting,
      endMeeting
    }
}

module.exports = meetings