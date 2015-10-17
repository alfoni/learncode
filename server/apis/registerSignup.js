import mandrill from 'mandrill-api/mandrill';
const mandrillClient = new mandrill.Mandrill('0HhFoz-B1KNKuCOI2V2mNA');

export default function registerSignup(req, res) {
  mandrillClient.messages.send({
    message: {
      html: `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            .wrapper {
              max-width: 600px;
              margin: 0 auto;
            }

            .grayBg a {
              color: rgba(0, 0, 0, 0.5);
            }

            a {
              color: #fff;
            }
          </style>
        </head>
        <body style="background-color: #F7F7F7; font-family: Helvetica, sans-serif; margin: 0; padding: 0; color: rgba(0, 0, 0, 0.8);">
          <div class="wrapper" style="padding: 20px;">
            <div style="font-size: 18px;">
              <h1>Takk for din interesse!</h1>
            </div>
            </div>
            <div style="padding: 20px; background-color: #ECECEC; border-top: 1px solid #cacaca; border-bottom: 1px solid #cacaca;">
              <div class="wrapper">
                <div class="grayBg">
                  <p style="color: rgba(0, 0, 0, 0.5); line-height: 24px;">
                    Takk for din interesse. Vi jobber nå med å fullføre første versjon av tjenesten.
                    Du vil motta en ny epost senere i år der vi inviterer deg til å delta videre i Kodeboksen.
                    Bor du i <strong>Oslo</strong> eller <strong>Trondheim</strong> vil du også bli invitert til kurs med andre brukere og skaperne av tjenesten.
                  </p>
                </div>
                <br/>
              </div>
            </div>
            <div class="wrapper" style="padding: 20px; margin-top: 20px;">

            </div>
            <div style="background-color: #ff4081; padding: 20px; color: #fff; font-size: 28px; margin-top: 20px; margin-bottom: 20px;">
              <div class="wrapper">
                <span style="font-size: 16px; color: rgba(255, 255, 255, 0.6)">Med vennlig hilsen,</span> <br/>
                Kodeboksen.no
              </div>
            </div>
            <div class="wrapper" style="font-size: 12px; color: rgba(0, 0, 0, 0.4); padding: 0 20px; margin-bottom: 20px; margin-bottom: 20px;">
              Din e-post sendes ikke videre og vil kun motta e-poster knyttet til lanseringen av Kodeboksen.
              <br/>
              Dersom du ikke ønsker å motte flere e-poster fra oss, kontakt oss på <a style="color: rgba(0, 0, 0, 0.4);" href="mailto:post@kodeboksen.no">post@kodeboksen.no</a>
            </div>
        </body>
      </html>
      `,
      subject: 'Registration confirmation',
      from_email: 'noreply@kodeboksen.no',
      from_name: 'Kodeboksen',
      to: [{
        email: 'christianalfoni@gmail.com',
        name: 'Christian Jørgensen'
      }, {
        email: 'tommy.ostgaard@gmail.com',
        name: 'Tommy Østgaard'
      }, {
        email: req.body.email,
        name: req.body.email
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
  });
}
