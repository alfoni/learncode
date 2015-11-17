import mandrill from 'mandrill-api/mandrill';
const mandrillClient = new mandrill.Mandrill('0HhFoz-B1KNKuCOI2V2mNA');

export default function(message) {
  return new Promise((resolve, reject) => {
    mandrillClient.messages.send({
      message: message,
      async: true
    }, (result) => {
      console.log(result);
      resolve(result);
    }, (e) => {
      console.log('Mandrill error: ' + e.name + ' ' + e.message);
      reject(e);
    });
  });
}
