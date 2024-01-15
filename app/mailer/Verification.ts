import moment from 'moment';
import nodemailer from 'nodemailer';
import { LngMail } from './TextMail';

export const verification = (req: any, cbretourneur?: any) => {
  var goodlng;

  var lngString = req.lng.toString();

  switch (lngString) {
    case 'fr':
      goodlng = LngMail.fr;
      break;
    case 'al':
      goodlng = LngMail.al;
      break;
    case 'ch':
      goodlng = LngMail.ch;
      break;
    case 'en':
      goodlng = LngMail.en;
      break;
    case 'es':
      goodlng = LngMail.es;
      break;
    case 'ho':
      goodlng = LngMail.ho;
      break;
    case 'in':
      goodlng = LngMail.in;
      break;
    case 'it':
      goodlng = LngMail.it;
      break;
    case 'ja':
      goodlng = LngMail.ja;
      break;
    case 'ko':
      goodlng = LngMail.ko;
      break;
    case 'pl':
      goodlng = LngMail.pl;
      break;
    case 'si':
      goodlng = LngMail.si;
      break;
    case 'tu':
      goodlng = LngMail.tu;
      break;
    default:
      goodlng = LngMail.en;
  }

  const mailEmetteur = 'compliance@flashlly.com';
  const MDP = 'Habad148@';

  // traitement pour avoir la date du jour // processing to get the current date
  const date = moment().format('DD/MM/YYYY');

  // traitement pour avoir la date dans trois jours // processing to have the date in three days
  let today = moment();
  const dateDansTroisJours = today.add(4, 'days');
  const dateFormateeDansTroisJours = dateDansTroisJours.format('DD/MM/YYYY');
  let numberMailSend = 0;

  // traiement pour avoir la date dans trois mois ouvrables // processing to have the date in three working months
  var d = new Date();
  d.setMonth(d.getMonth() - 3);
  var options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };
  let perfectDateInThreeMonth = d.toLocaleDateString('fr-FR', options);

  for (let index = 0; index < 2; index++) {
    let goodMail = req.email;
    if (index === 1) {
      goodMail = 'flashlly23@gmail.com';
    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: mailEmetteur,
        pass: MDP,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: mailEmetteur,
      to: goodMail,
      subject: req.object,
      html: `
          <!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <title>confirm</title>
    </head>
    <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
      <div style="background-color: #f5f5f5; border-radius: 20px; border: none">
        <div style="text-align: center; padding: 30px">
          <a
            style="
              color: #3570bc;
              display: inline-block;
              font-family: Graphik, Arial, sans-serif;
              font-weight: 400;
              line-height: 130%;
              padding: 0;
              text-align: center;
              background-color: none;
            "
            ses:no-track=""
            href="https://flashlly.com"
          >
            <img
              class="atm-logo"
              alt="flashlly logo"
              style="
                -ms-interpolation-mode: bicubic;
                clear: both;
                display: block;
                outline: 0;
                text-decoration: none;
              "
              src="https://www.flashlly.com/_next/static/media/logo-dark.e7576dbd.png"
              width="143"
            />
          </a>
        </div>
        <div
          style="
            width: 41vh;
            margin: auto;
            background-image: linear-gradient(to bottom, #fec5c8, #6e40c9);
            border-radius: 20px;
            padding: 5px 0px 5px 0px;
          "
        >
          <div
            style="
              width: 40vh;
              margin: auto;
              background-color: white;
              border-radius: 20px;
            "
          >
            <div>
              <table>
                <tbody>
                  <tr>
                    <td colspan="2" align="center" style="padding: 20px;">
                      <h1 style="font-size: 1.5rem">${goodlng?.sof?.bonjour} ${
        req.prenom
      } ${' '} ${req.nom}👋,</h1>
                      <br />
                      <p style="font-size: 14px">
                      ${goodlng?.sof?.esperons} <b> ${dateFormateeDansTroisJours} </b> :
                      </p>
  
                      <p style="font-size: 14px">
                      👉 ${
                        goodlng?.sof?.releves
                      }<b> ${perfectDateInThreeMonth}</b> > <b>  ${date} </b> .
                      </p>

                      <p style="font-size: 14px">
                      👉 ${goodlng?.sof?.acces}</b> .
                      </p>

                      <p style="font-size: 14px">
                      👉 ${goodlng?.sof?.décrire}</b> .
                      </p>
  
                      <p style="font-size: 14px">
                      👉 ${
                        goodlng?.sof?.veuillez
                      }<b> ${perfectDateInThreeMonth} </b> > <b>  ${date} ]</b>.
                      </p>
                      
                      <p style="font-size: 14px">
                      ${goodlng?.sof?.cooperation}
                      </p>
  
                      <p style="font-size: 14px">
                      ${goodlng?.sof?.agreer}
                      </p>
  
                      <p style="font-size: 14px">
                      <b>  Compliance & Support Manager | Flashlly </b>
                        <br />
                      </p>
  
                      </p>
                      
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td colspan="2" align="center" style="padding: 10px;">
                      <p style="font-size: 14px">
                        Team Flashlly<br />
                        <a href="www.flashlly.com">www.flashlly.com</a> <br />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <table align="center">
          <tbody>
            <tr>
              <td
                style="
                  border: none;
                  color: grey;
                  font-size: 14px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                Flashlly 2023
                <br />
                22B Bartycka Street
                <br />
                00-716 Warsaw, Poland
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
          `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        cbretourneur('ko');
        return;
      } else {
        numberMailSend += 1;
        if (numberMailSend === 2) {
          cbretourneur('ok');
          return;
        }
      }
    });
  }
};
