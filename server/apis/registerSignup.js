import mandrill from 'mandrill-api/mandrill';
import React from 'react';
const mandrillClient = new mandrill.Mandrill('0HhFoz-B1KNKuCOI2V2mNA');

export default function registerSignup(req, res) {
  console.log(<confirmationEmail/>);
  console.log(req.body);
  /*mandrillClient.messages.send({
    message: {
      html:
        '<body style="background-color: #E2E2E2; font-family: Helvetica, sans-serif;">' +
          '<div style="width: 100%; background-color: #fff; padding: 20px;">' +
            '<div style="font-size: 26px; color: rgba(0, 0, 0, 0.4);">' +
              'Thank you for your registration!' +
            '</div>' +
            '<span style="color: #333; font-size: 16px; margin-top: 10px; display: inline-block;">' +
              'Your registration is is confirmed' +
            '</span>' +
          '</div>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<h4>Registration details</h4>' +
          '<table>' +
            '<tr>' +
              '<td>Name</td>' +
              '<td>:</td>' +
              '<td>Tommy</td>' +
            '</tr>' +
            '<tr>' +
              '<td>E-mail</td>' +
              '<td>:</td>' +
              '<td>tommy@tommyostgaard.com</td>' +
            '</tr>' +
            '<tr>' +
              '<td>Number</td>' +
              '<td>:</td>' +
              '<td>41515350</td>' +
            '</tr>' +
            '<tr>' +
              '<td>Location</td>' +
              '<td>:</td>' +
              '<td>Trondheim</td>' +
            '</tr>' +
          '</table>' +
          'Best regards, <br/>' +
          'Learncode' +
        '</body>',
      subject: 'Registration confirmation',
      from_email: 'noreply@learncode.com',
      from_name: 'Learncode',
      to: [{
        email: 'tommy.ostgaard@gmail.com',
        name: 'Tommy Østgaard'
      }]
    },
    async: true
  }, (result) => {
    console.log(result);
    res.send({
      success: 'Confirmation emails sent'
    });
  }, (e) => {
    console.log('Mandrill error: ' + e.name + ' ' + e.message);
    res.send({
      error: e.name + ' - ' + e.message
    });
  });*/
  res.send([]);
}
