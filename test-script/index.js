const bbb = require('s-bigbluebutton');

ss = bbb.api(
    'https://session.xaphal.com/bigbluebutton/', 
    'Hfb5jiQn5ZY6EbUnLYYtiS5ABxz8FzsHJOzJ748Y'
)

// console.log(ss);

let meetingLink = ss.meetings.createMeeting('Web Development', '152', {
    attendeePW: 'studentpass',
    moderatorPW: 'councelorpass',
    allowStartStopRecording: true,
    autoStartRecording: false,
    record : true,
    welcome : "hello everyone this is test meeting"
})

// let moderatorUrl
// let attendeeUrl

ss.httpClientCall(meetingLink).then((result) => {
    console.log(result)
   
    moderatorUrl = ss.meetings.joinMeeting('bhardhavar', '152',{
        password: 'councelorpass'
    })
    attendeeUrl = ss.meetings.joinMeeting('sachida Nand', '152', 'studentpass')
    console.log(`Moderator link: ${moderatorUrl}\nAttendie link: ${attendeeUrl}`)
   
    let meetingEndUrl = ss.meetings.endMeeting('152', 'councelorpass')
    console.log(`End meeting link: ${meetingEndUrl}`)
})


let getMeeting = ss.monitoring.getMeetingInfo(152);
let publishRecordings = ss.recording.publishRecordings('183f0bf3a0982a127bdb8161e0c44eb696b3e75c-1678432600200',true);
let getRecordings = ss.recording.getRecordings({
    meetingID : 152
});

ss.httpClientCall(getMeeting).then((result) => {
    console.log(result)
})

// console.log(getMeeting);
