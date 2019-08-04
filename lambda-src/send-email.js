require ('dotenv').config({ silent: true })

const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_API_KEY);
import EmailTemplate from '../assets/js/email-template'

exports.handler = function(event, context, callback) {
  // console.log(`this is the event: ${ event }`)
  // console.log(`this is the event body: JSON.parse(${event.body})`)
  const responseBody = JSON.parse(event.body)
  const { message, name, email, address_line1, city, state, zip, items } = responseBody
  console.log(items)

  client.transmissions
    .send({
      content: {
        from: 'asa@backroom.io',
        subject: `Hello, ${name}!`,
        html: EmailTemplate(message, address_line1, city, state, zip, items),
      },
    recipients: [{ address: email }]
  })
  .then(data => {
    console.log('success')
    console.log(data)
    callback(null, {
      statusCode: 200,
      body: 'wow',
    })
  })
  .catch(err => {
    console.log('fail')
    console.log(err)
  })
}
