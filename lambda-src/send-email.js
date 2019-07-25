const SparkPost = require('sparkpost');
const client = new SparkPost('02f5d1423bf05ee45cf8eac69d2e21dbb1e8326a');

exports.handler = function(event, context, callback) {
  console.log(event)
  client.transmissions
    .send({
      content: {
        from: 'asa@backroom.io',
        subject: 'Hello, World!',
        html:
          "<html><body><p>My cool email.</p></body></html>"
      },
    recipients: [{ address: 'smith.asa.la@gmail.com' }]
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
