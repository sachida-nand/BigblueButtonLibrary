JavaScript layer to interact with BigBlueButton [API](https://docs.bigbluebutton.org/dev/api). Supports [WebHooks](https://docs.bigbluebutton.org/dev/webhooks.html).

## [Read the Official Documentation](https://bigbluebutton.org/)

## [Follow the Changelog](https://github.com/aakatev/bigbluebutton-js/tree/master/CHANGELOG.md)

## Features

- Supports BBB API, and WebHooks
- Provides methods to construct URLs, and calculate SHA checksum
- Provides HTTP client that converts XML responses to JS objects
- Works with Node 10 or newer

## Installation

```bash
npm i s-bigbluebutton
```

## Usage

You will need to provide BigBlueButton URL and secret to the script. You can obtain them by logging into you BBB server, and running:

```bash
bbb-conf --secret
```

Use the obtained values in your script:

```javascript
const bbb = require('s-bigbluebutton')
let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )
```

## Examples

The following example shows how to create a room, and links for moderator and attendee to join:

```javascript
const bbb = require('s-bigbluebutton')
 
// BBB_URL and BBB_SECRET can be obtained
// by running bbb-conf --secret on your BBB server
// refer to Getting Started for more information
let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )

 
// api module itself is responsible for constructing URLs
let meetingCreateUrl = api.administration.createMeeting('My Meeting', '1', {
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})
 
// http method should be used in order to make calls
api.httpClientCall(meetingCreateUrl).then((result) => {
  console.log(result)
 
  let moderatorUrl = api.administration.joinMeeting('moderator', '1', 'supersecret')
  let attendeeUrl = api.administration.joinMeeting('attendee', '1', 'secret')
  console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
 
  let meetingEndUrl = api.administration.endMeeting('1', 'supersecret')
  console.log(`End meeting link: ${meetingEndUrl}`)
})
```

## Reference

Our reference is divided into two sections: [API](https://docs.bigbluebutton.org/dev/api.html#API_) and [WebHooks](https://docs.bigbluebutton.org/dev/webhooks.html).

## Tests

To run the test suites some prior configuration is required. First, create a `.env` file in library root. The file should have the following content:

```
BBB_URL=https://mysite.com/bigbluebutton
BBB_SECRET=MySuperSecretSharedToken
```
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Project started as a fork of [bbb-promise](https://www.npmjs.com/package/bigbluebutton-js)
