import nodemailer from 'nodemailer';

interface TransfereSuccessTerminE {
  email: string;
  object: string;
  data: any;
}

export const transfereSuccessTerminE = (data: TransfereSuccessTerminE) => {
  const mailEmetteur = 'no-reply@flashlly.com';
  const MDP = process.env.MDP;

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
    to: data.email,
    subject: data.object,
    html: `
        <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>deleted</title>
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
          padding-top: 5px;
          padding-bottom: 5px;
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
          <div style="width: 40vh; margin: auto">
            <table
              style="
                border-collapse: collapse;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
              "
            >
              <tbody>
                <tr>
                  <td colspan="2" align="center" style="padding: 20px;">
                    <h1 style="font-size: 1.5rem">Transaction annulée</h1>
                    <br />
                    <p style="font-size: 14px">
                        Nous avons le regret de vous informer que votre récente commande de
                        crypto-monnaie ref: ${data.data.idOrders} sur notre plateforme a été annulée.
                      <br />
                    </p>
                    <p style="font-size: 14px">
                        Si vous avez des questions concernant votre commande annulée,
            n'hésitez pas à nous contacter. Nous serons heureux de vous aider de
            quelque manière que ce soit.
                      <br />
                    </p>
                    <p style="font-size: 14px">
                        Nous vous remercions d'avoir choisi notre plateforme de
            crypto-monnaies pour répondre à vos besoins. Nous nous excusons à
            nouveau pour tout inconvénient, et nous espérons avoir l'occasion de
            vous servir à l'avenir.
                      <br />
                    </p>
                  </td>
                </tr>
                <br />
                <tr>
                  <td colspan="2" align="center" style="padding: 20px;">
                    <p style="font-size: 14px">
                      Team Flashlly<br />
                      <a href="www.flashlly.com">www.flashlly.com</a> <br />
                      PS: Ceci est un message automatique, merci de ne pas y
                      répondre directement.
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

  transporter.sendMail(mailOptions, function (err: any, info: any) {
    console.log('info err', info, err);
  });
};
