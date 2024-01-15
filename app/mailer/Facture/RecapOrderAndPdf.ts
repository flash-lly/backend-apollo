import moment from 'moment';
const pdfmake = require('pdfmake/build/pdfmake.js');
const vfsFonts = require('pdfmake/build/vfs_fonts.js');
const nodemailer = require('nodemailer');
const { DateTimeShort } = require('../../utils/utils');
var fs = require('fs');
const bank = require('../../utils/bank');
const utils = require('../../utils/utils');

require('dotenv').config();

pdfmake.vfs = vfsFonts.pdfMake.vfs;

const pdfObject = (objFacture: any) => {
  return {
    content: [
      {
        columns: [
          {
            image:
              'data:image/png;base64,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',
            width: 150,
          },
          [
            {
              text: 'Invoice',
              color: '#333333',
              width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'Receipt No.',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: objFacture.order,
                      bold: true,
                      color: '#333333',
                      fontSize: 8,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Date',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: DateTimeShort(),
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Status',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: `${objFacture.statutCommande}`,
                      bold: true,
                      fontSize: 14,
                      alignment: 'right',
                      color: objFacture.statutCommande === 'PAID' ? 'green' : 'orange',
                      width: 100,
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
      {
        columns: [
          {
            text: 'From',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          },
          {
            text: 'To',
            color: '#aaaaab',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 20, 0, 5],
          },
        ],
      },
      {
        columns: [
          {
            text: 'Flashlly',
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
          {
            text: `${objFacture.nomClient} ${objFacture.prenomClient} \n `,
            bold: true,
            color: '#333333',
            alignment: 'left',
          },
        ],
      },
      {
        columns: [
          {
            text: 'Address',
            color: '#aaaaab',
            bold: true,
            margin: [0, 7, 0, 3],
            alignment: 'left',
          },
        ],
      },
      {
        columns: [
          {
            text: '22B Bartycka Street, Office 21A \n 00-716 Warsaw \n   Poland',
            style: 'invoiceBillingAddress',
            alignment: 'left',
          },
        ],
      },
      '\n\n\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function () {
            return 1;
          },
          vLineWidth: function () {
            return 1;
          },
          hLineColor: function (i: any, node: any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function () {
            return '#eaeaea';
          },
          hLineStyle: function () {
            // if (i === 0 || i === node.table.body.length) {
            return null;
            //}
          },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          paddingLeft: function () {
            return 10;
          },
          paddingRight: function () {
            return 10;
          },
          paddingTop: function () {
            return 2;
          },
          paddingBottom: function () {
            return 2;
          },
          fillColor: function (rowIndex: any, node: any, columnIndex: any) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['25%', '25%', '25%', '25%'],
          body: [
            [
              {
                text: 'Devise',
                fillColor: '#9f73f5',
                border: [true, true, true, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
                fontSize: 16,
                alignment: 'center',
              },
              {
                text: 'Qty',
                border: [true, true, true, true],
                alignment: 'center',
                fillColor: '#9f73f5',
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
                fontSize: 16,
              },
              {
                text: 'UP',
                border: [true, true, true, true],
                alignment: 'center',
                fillColor: '#9f73f5',
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
                fontSize: 16,
              },
              {
                text: 'Total Price',
                border: [true, true, true, true],
                alignment: 'center',
                fillColor: '#9f73f5',
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
                fontSize: 16,
              },
            ],
            [
              {
                text: objFacture.o_currency,
                border: [true, true, true, true],
                margin: [0, 5, 0, 5],
                alignment: 'center',
              },
              {
                border: [true, true, true, true],
                text: objFacture?.montantTransfert,
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                border: [true, true, true, true],
                text:
                  parseFloat(objFacture?.montantTransfert) /
                  parseFloat(objFacture.amount),
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                border: [true, true, true, true],
                text: `${
                  objFacture.amount +
                  (objFacture.currency?.toUpperCase() === 'EUR' ? '€' : '$')
                }`,
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: ``,
                border: [false, false, false, false],
                margin: [0, 5, 0, 5],
                alignment: 'center',
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: ``,
                border: [false, false, false, false],
                margin: [0, 5, 0, 5],
                alignment: 'center',
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                text: `Payment Subtotal`,
                border: [true, true, true, true],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                border: [true, true, true, true],
                text: `${
                  objFacture.amount +
                  (objFacture.currency?.toUpperCase() === 'EUR' ? '€' : '$')
                }`,
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: ``,
                border: [false, false, false, false],
                margin: [0, 5, 0, 5],
                alignment: 'center',
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                text: `Taxes`,
                border: [true, true, true, true],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                text: `0,00 %`,
                border: [true, true, true, true],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: ``,
                border: [false, false, false, false],
                margin: [0, 5, 0, 5],
                alignment: 'center',
              },
              {
                text: ``,
                border: [false, false, false, false],
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                border: [true, true, true, true],
                text: `Total Amount`,
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
              {
                border: [true, true, true, true],
                text: `${
                  objFacture.amount +
                  (objFacture.currency?.toUpperCase() === 'EUR' ? '€' : '$')
                }`,
                alignment: 'center',
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
      },
      '\n',
      {
        text: `${
          objFacture.statutCommande === 'PAID'
            ? ''
            : 'The amount of currency will be official receipts of your payment by our services. \n You will be notified with a next bill identified as paid'
        }   `, // cette phrase n'existe que si la facture est en stade impaye
        style: 'notesTitle',
        alignment: 'left',
      },
      '\n',
      {
        text: `${objFacture.address ? objFacture.address : ''}`,
        style: 'notesText',
        alignment: 'left',
      },
      '\n',
      {
        text: `Bénéficiaire : ${objFacture.beneficiaire}`,
        alignment: 'left',
        style: 'notesText',
      },
      {
        text: `Adresse du bénéficaire : ${objFacture.addressFlashhly}`,
        alignment: 'left',
        style: 'notesText',
      },
      {
        text: `Référence Bancaire : ${objFacture.reference}`,
        alignment: 'left',
        style: 'notesText',
      },

      '\n\n',
      ,
      '\n\n',
      {
        text: `KRS : 0001005598 - licence : RDWW-576`,
        alignment: 'center',
        style: 'notesText',
      },
    ],
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
      //font: 'Quicksand',
    },
  };
};

// Définir la structure de la facture
export const CreateRecapOrderAndPdf = (objFacture: any, cbretourneur: any) => {
  console.log('Object qui sera dans le mail : ', objFacture);
  for (let index = 0; index < 2; index++) {
    let goodMail = objFacture.e_courriel;
    if (index === 1) {
      goodMail = 'flashlly23@gmail.com';
    }

    const pdfDoc = pdfmake.createPdf(pdfObject(objFacture));
    pdfDoc.getBuffer((buffer: any) => {
      fs.writeFileSync(objFacture.path, buffer); // c'est le path de celui qui l'appel , et non de lui meme

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
        from: `Flashlly Team <${mailEmetteur}>`,
        to: goodMail,
        subject: '👋 Confirmation de votre ordre',
        attachments: [
          {
            filename: `Invoice-Flashlly-${objFacture.order}.pdf`,
            path: objFacture.path,
            contentType: 'application/pdf',
          },
        ],
        html: `
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
      
          <!--[if gte mso 9]><xml>
      
      <o:OfficeDocumentSettings>
      
      <o:AllowPNG/>
      
      <o:PixelsPerInch>96</o:PixelsPerInch>
      
      </o:OfficeDocumentSettings>
      
      </xml><![endif]-->
      
          <!-- fix outlook zooming on 120 DPI windows devices -->
      
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      
          <meta name="viewport" content="width=device-width, initial-scale==
      1"> <!-- So that mobile will display zoomed in -->
      
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable m=
      edia queries for windows phone 8 -->
      
          <meta name="format-detection" content="date=no"> <!-- disable auto =
      date linking in iOS 7-9 -->
      
          <meta name="format-detection" content="telephone=no"> <!-- disable =
      auto telephone linking in iOS 7-9 -->
      
      
      
          <style type="text/css">
              body {
      
                  margin: 0;
      
                  padding: 0;
      
                  -ms-text-size-adjust: 100%;
      
                  -webkit-text-size-adjust: 100%;
      
              }
      
              table {
      
                  border-spacing: 0;
      
              }
      
              table td {
      
                  border-collapse: collapse;
      
              }
      
              .ExternalClass {
      
                  width: 100%;
      
              }
      
      
              .ExternalClass,
      
              .ExternalClass p,
      
              .ExternalClass span,
      
              .ExternalClass font,
      
              .ExternalClass td,
      
              .ExternalClass div {
      
                  line-height: 100%;
      
              }
      
              .ReadMsgBody {
      
                  width: 100%;
      
                  background-color: #ffffff;
      
              }
      
              table {
      
                  mso-table-lspace: 0pt;
      
                  mso-table-rspace: 0pt;
      
              }
      
              img {
      
                  -ms-interpolation-mode: bicubic;
      
              }
      
              .yshortcuts a {
      
                  border-bottom: none !important;
      
              }
      
      
      
              @media screen and (max-width: 788px) {
      
                  .force-row,
      
                  .container {
      
                      width: 100% !important;
      
                      max-width: 100% !important;
      
                  }
      
                  /*   .logo {
      
              display: none ! important;
      
            }
      
             */
              }
      
              @media screen and (max-width: 400px) {
      
                  .container-padding {
      
                      padding-left: 12px !important;
      
                      padding-right: 12px !important;
      
                  }
      
                  /*  .logo {
      
              display: none ! important;
      
            } */
      
              }
      
              .ios-footer a {
      
                  color: #aaaaaa !important;
      
                  text-decoration: underline;
      
              }
      
              a[href^="x-apple-data-detectors:"],
      
              a[x-apple-data-detectors] {
      
                  color: inherit !important;
      
                  text-decoration: none !important;
      
                  font-size: inherit !important;
      
                  font-family: inherit !important;
      
                  font-weight: inherit !important;
      
                  line-height: inherit !important;
      
              }
      
              .btn {
      
                  box-sizing: border-box;
      
                  width: 100%;
      
              }
      
              .btn>tbody>tr>td {
      
                  padding-bottom: 15px;
      
              }
      
              .btn table {
      
                  width: auto;
      
              }
      
              .btn table td {
      
                  background-color: #ffffff;
      
                  border-radius: 5px;
      
                  text-align: center;
      
              }
      
              .btn a {
      
                  margin-top: 300px;
      
                  background-color: #1652F0;
      
                  border: solid 1px #1652F0;
      
                  border-radius: 5px;
      
                  box-sizing: border-box;
      
                  color: #1652F0;
      
                  cursor: pointer;
      
                  display: inline-block;
      
                  font-size: 25px;
      
                  font-weight: 500;
      
                  font-style: normal;
      
                  margin: 0;
      
                  min-width: 453px;
      
                  padding: 21px 21px;
      
                  text-decoration: none;
      
                  font-family: Avenir Next, Graphik, Helvetic, Arial, sans-serif;
      
                  line-height: 34px;
      
              }
      
      
      
              .btn-primary table td {
      
                  background-color: #1652F0;
      
              }
      
      
      
              .btn-primary a {
      
                  font-family: "Graphik", sans-serif;
      
                  background-color: #652fdc;
      
                  border-color: #652fdc;
      
                  color: #ffffff;
      
              }
          </style>
      
      </head>
      
      
      
      <body style="margin:0; padding:0;" bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
      
      
      
          <!-- 100% background wrapper (grey background) -->
      
          <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
      
              <tr>
      
                  <td align="center" valign="top" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
      
      
      
                      <br>
      
      
      
                      <!-- 788px container (white background) -->
      
                      <table border="0" width="788" cellpadding="0" cellspacing="0" class="container"
                          style="width:788px;max-width:788px">
      
                          <tr>
      
                              <td class="container-padding content" align="left" style="padding:0;background-color:#ffffff">
      
                                  <div class="title" style="padding-left: 10px;">
      
                                      <a style="color:#4e5c6e;display:inline-block;font-family:Graphik,Arial,sans-serif;font-weight:400;line-height:130%;padding:0;text-align:left;text-decoration:underline"
                                          ses:no-track href="https://flashlly.com">
                                          <img class="atm-logo" alt="" style="-ms-interpolation-mode:bicubic;clear:both;display:block;outline:0;text-decoration:none;" src="https://www.flashlly.com/_next/static/media/logo-dark.e7576dbd.png"   width="143" />
                                      </a>
      
                                      <br>
      
                                  </div>
      
      
      
                                  <!--[if mso]>  <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr><td width="50%" valign="top"><![endif]-->
      
      
      
                                  <table width="550" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row"
                                      style="white-space: wrap;">
      
                                      <tr>
      
                                          <td class="col" valign="top"
                                              style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333;width:100%; padding: 10px;">
      
                                              <h1 style="font-size: 24px;font-weight: 500; line-height: 50px; text-align: left;color: #0B3466;">
                                                  Récapitulatif de votre commande
                                              </h1>
  
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Vous envoyez :  <b> ${objFacture.amount}${objFacture.currency}</b> </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Numéro de transaction: <b>  ${objFacture.order} </b> </p>
  
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Méthode de paiement:<b>  ${objFacture.type}  </b> </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Adresse de réception: <b> ${objFacture.address}  </b>  </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Bénéficiaire: <b>Flashlly SP ZOO </b></p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Adresse du bénéficaire: <b>22B Bartycka Street, Office 21A, 00-716 Warsaw, Poland</b></p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">COMPTE SEPA (IBAN): <b>${objFacture.iban}</b></p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Référence bancaire: <b> <a style="pointer-events: none; color: inherit">${objFacture.reference}</a></b></p>
                                              
                                          
                                          </td>
      
                                      </tr>
      
                                  </table>
      
      
      
                                  <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
      
                                  <table class="logo" width="229" border="0" cellpadding="0" cellspacing="0" align="center" class="force-row">
      
                                      <tr>
                                          <td class="col" valign="top" style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333;width:100%; padding-bottom:20px;">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="#4fc172" class="bi bi-receipt-cutoff" viewBox="0 0 16 16">
                                          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                                          <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293 2.354.646zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118l.137-.274z"/>
                                        </svg>
                                          </td>
                                      </tr>
      
                                  </table>
      
                                  <!--[if mso]></td></tr></table><![endif]-->
      
      
      
      
      
                                  <!--/ end example -->
      
      
      
                                  <div class="hr" style="height:1px;border-bottom:1px solid #DBE1E8;clear: both;">&nbsp;</div>
      
      
      
                              </td>
      
                          </tr>
      
                          <tr>
      
                              <td class="container-padding footer-text" align="left"
                                  style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:18px;line-height:25px;color:#aaaaaa;padding-left:24px;padding-right:24px;color:#B8C2CC; padding-top: 25px">
      
                                  Flashlly 2023<br>
      
                                  <span class="ios-footer">
      
                                      22B Bartycka Street
      
                                      <br>
      
                                      00-716 Warsaw, Poland
      
                                      <br>
      
                                  </span>
      
                              </td>
      
                          </tr>
      
                      </table>
      
                      <!--/788px container -->
      
      
      
      
      
                  </td>
      
              </tr>
      
          </table>
      
          <!--/100% background wrapper-->
      
      
      
      </body>
      
      </html>
  
                  `,
      };

      transporter.sendMail(mailOptions, function (err: any, info: any) {
        if (err) {
          console.log('mail ko');
          console.log('err =========>', err);
          cbretourneur('ko');
          // res.send(err)
        } else {
          console.log('mail envoyE');
          cbretourneur('pl');
          return;
        }
      });
    });
  }
};

export const CreateRecapOrderAndPdfIBAN = (objFacture: any, cbretourneur?: any) => {
  console.log('Object qui sera dans le mail : ', objFacture);
  for (let index = 0; index < 2; index++) {
    let goodMail = objFacture.email;
    if (index === 1) {
      goodMail = 'flashlly23@gmail.com';
    }

    const pdfDoc = pdfmake.createPdf(pdfObject(objFacture));
    pdfDoc.getBuffer((buffer: any) => {
      fs.writeFileSync(objFacture.path, buffer); // c'est le path de celui qui l'appel , et non de lui meme

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
        from: `Flashlly Team <${mailEmetteur}>`,
        to: goodMail,
        subject: '👋 Confirmation de votre ordre',
        attachments: [
          {
            filename: `Invoice-Flashlly-${objFacture.order}.pdf`,
            path: objFacture.path,
            contentType: 'application/pdf',
          },
        ],
        html: `
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
      
          <!--[if gte mso 9]><xml>
      
      <o:OfficeDocumentSettings>
      
      <o:AllowPNG/>
      
      <o:PixelsPerInch>96</o:PixelsPerInch>
      
      </o:OfficeDocumentSettings>
      
      </xml><![endif]-->
      
          <!-- fix outlook zooming on 120 DPI windows devices -->
      
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      
          <meta name="viewport" content="width=device-width, initial-scale==
      1"> <!-- So that mobile will display zoomed in -->
      
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable m=
      edia queries for windows phone 8 -->
      
          <meta name="format-detection" content="date=no"> <!-- disable auto =
      date linking in iOS 7-9 -->
      
          <meta name="format-detection" content="telephone=no"> <!-- disable =
      auto telephone linking in iOS 7-9 -->
      
      
      
          <style type="text/css">
              body {
      
                  margin: 0;
      
                  padding: 0;
      
                  -ms-text-size-adjust: 100%;
      
                  -webkit-text-size-adjust: 100%;
      
              }
      
              table {
      
                  border-spacing: 0;
      
              }
      
              table td {
      
                  border-collapse: collapse;
      
              }
      
              .ExternalClass {
      
                  width: 100%;
      
              }
      
      
              .ExternalClass,
      
              .ExternalClass p,
      
              .ExternalClass span,
      
              .ExternalClass font,
      
              .ExternalClass td,
      
              .ExternalClass div {
      
                  line-height: 100%;
      
              }
      
              .ReadMsgBody {
      
                  width: 100%;
      
                  background-color: #ffffff;
      
              }
      
              table {
      
                  mso-table-lspace: 0pt;
      
                  mso-table-rspace: 0pt;
      
              }
      
              img {
      
                  -ms-interpolation-mode: bicubic;
      
              }
      
              .yshortcuts a {
      
                  border-bottom: none !important;
      
              }
      
      
      
              @media screen and (max-width: 788px) {
      
                  .force-row,
      
                  .container {
      
                      width: 100% !important;
      
                      max-width: 100% !important;
      
                  }
      
                  /*   .logo {
      
              display: none ! important;
      
            }
      
             */
              }
      
              @media screen and (max-width: 400px) {
      
                  .container-padding {
      
                      padding-left: 12px !important;
      
                      padding-right: 12px !important;
      
                  }
      
                  /*  .logo {
      
              display: none ! important;
      
            } */
      
              }
      
              .ios-footer a {
      
                  color: #aaaaaa !important;
      
                  text-decoration: underline;
      
              }
      
              a[href^="x-apple-data-detectors:"],
      
              a[x-apple-data-detectors] {
      
                  color: inherit !important;
      
                  text-decoration: none !important;
      
                  font-size: inherit !important;
      
                  font-family: inherit !important;
      
                  font-weight: inherit !important;
      
                  line-height: inherit !important;
      
              }
      
              .btn {
      
                  box-sizing: border-box;
      
                  width: 100%;
      
              }
      
              .btn>tbody>tr>td {
      
                  padding-bottom: 15px;
      
              }
      
              .btn table {
      
                  width: auto;
      
              }
      
              .btn table td {
      
                  background-color: #ffffff;
      
                  border-radius: 5px;
      
                  text-align: center;
      
              }
      
              .btn a {
      
                  margin-top: 300px;
      
                  background-color: #1652F0;
      
                  border: solid 1px #1652F0;
      
                  border-radius: 5px;
      
                  box-sizing: border-box;
      
                  color: #1652F0;
      
                  cursor: pointer;
      
                  display: inline-block;
      
                  font-size: 25px;
      
                  font-weight: 500;
      
                  font-style: normal;
      
                  margin: 0;
      
                  min-width: 453px;
      
                  padding: 21px 21px;
      
                  text-decoration: none;
      
                  font-family: Avenir Next, Graphik, Helvetic, Arial, sans-serif;
      
                  line-height: 34px;
      
              }
      
      
      
              .btn-primary table td {
      
                  background-color: #1652F0;
      
              }
      
      
      
              .btn-primary a {
      
                  font-family: "Graphik", sans-serif;
      
                  background-color: #652fdc;
      
                  border-color: #652fdc;
      
                  color: #ffffff;
      
              }
          </style>
      
      </head>
      
      
      
      <body style="margin:0; padding:0;" bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
      
      
      
          <!-- 100% background wrapper (grey background) -->
      
          <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
      
              <tr>
      
                  <td align="center" valign="top" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
      
      
      
                      <br>
      
      
      
                      <!-- 788px container (white background) -->
      
                      <table border="0" width="788" cellpadding="0" cellspacing="0" class="container"
                          style="width:788px;max-width:788px">
      
                          <tr>
      
                              <td class="container-padding content" align="left" style="padding:0;background-color:#ffffff">
      
                                  <div class="title" style="padding-left: 10px;">
      
                                      <a style="color:#4e5c6e;display:inline-block;font-family:Graphik,Arial,sans-serif;font-weight:400;line-height:130%;padding:0;text-align:left;text-decoration:underline"
                                          ses:no-track href="https://flashlly.com">
                                          <img class="atm-logo" alt="" style="-ms-interpolation-mode:bicubic;clear:both;display:block;outline:0;text-decoration:none;" src="https://www.flashlly.com/_next/static/media/logo-dark.e7576dbd.png"   width="143" />
                                      </a>
      
                                      <br>
      
                                  </div>
      
      
      
                                  <!--[if mso]>  <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr><td width="50%" valign="top"><![endif]-->
      
      
      
                                  <table width="550" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row"
                                      style="white-space: wrap;">
      
                                      <tr>
      
                                          <td class="col" valign="top"
                                              style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333;width:100%; padding: 10px;">
      
                                              <h1 style="font-size: 24px;font-weight: 500; line-height: 50px; text-align: left;color: #0B3466;">
                                                  Récapitulatif de votre commande
                                              </h1>
  
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Vous envoyez :  <b> ${objFacture.amount}${objFacture.currency}</b> </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Numéro de transaction: <b>  ${objFacture.order} </b> </p>
  
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Méthode de paiement:<b>  ${objFacture.i_type}  </b> </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Adresse de réception: <b> ${objFacture.address}  </b>  </p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Bénéficiaire: <b>Flashlly SP ZOO </b></p>
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Adresse du bénéficaire: <b>22B Bartycka Street, Office 21A, 00-716 Warsaw, Poland</b></p>
                                              
                                              <p style="font-size: 16px;line-height: 20px;text-align:left;color: #4E5C6E;">Référence bancaire: <b> <a style="pointer-events: none; color: inherit">${objFacture.reference}</a></b></p>
                                           
                                          
                                          </td>
      
                                      </tr>
      
                                  </table>
      
      
      
                                  <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
      
                                  <table class="logo" width="229" border="0" cellpadding="0" cellspacing="0" align="center" class="force-row">
      
                                      <tr>
                                          <td class="col" valign="top" style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333;width:100%; padding-bottom:20px;">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="#4fc172" class="bi bi-receipt-cutoff" viewBox="0 0 16 16">
                                          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                                          <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293 2.354.646zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118l.137-.274z"/>
                                        </svg>
                                          </td>
                                      </tr>
      
                                  </table>
      
                                  <!--[if mso]></td></tr></table><![endif]-->
      
      
      
      
      
                                  <!--/ end example -->
      
      
      
                                  <div class="hr" style="height:1px;border-bottom:1px solid #DBE1E8;clear: both;">&nbsp;</div>
      
      
      
                              </td>
      
                          </tr>
      
                          <tr>
      
                              <td class="container-padding footer-text" align="left"
                                  style="font-family:Graphik, Helvetica, Arial, sans-serif;font-size:18px;line-height:25px;color:#aaaaaa;padding-left:24px;padding-right:24px;color:#B8C2CC; padding-top: 25px">
      
                                  Flashlly 2023<br>
      
                                  <span class="ios-footer">
      
                                      22B Bartycka Street
      
                                      <br>
      
                                      00-716 Warsaw, Poland
      
                                      <br>
      
                                  </span>
      
                              </td>
      
                          </tr>
      
                      </table>
      
                      <!--/788px container -->
      
      
      
      
      
                  </td>
      
              </tr>
      
          </table>
      
          <!--/100% background wrapper-->
      
      
      
      </body>
      
      </html>
  
                  `,
      };

      transporter.sendMail(mailOptions, function (err: any, info: any) {
        if (err) {
          console.log('mail ko');
          console.log('err =========>', err);
          cbretourneur('ko');
          // res.send(err)
        } else {
          console.log('mail envoyE');
          cbretourneur('pl');
          return;
        }
      });
    });
  }
};

export const TransfereSuccessAndPdf = (
  CBFacture: any,
  montantTransfert: any,
  cbretourneur: any,
) => {
  console.log('Object qui sera dans le mail : ', CBFacture);
  const dateReceived = CBFacture.timestamp;
  const formattedDate = moment(dateReceived).format('DD/MM/YYYY [a] H:mm');
  let numberMailSend = 0;

  let objFacture = {
    idOrders: CBFacture.idOrders,
    statutCommande: 'PAID',
    e_courriel: CBFacture.e_courriel,
    nomClient: CBFacture.nom,
    prenomClient: CBFacture.prenom,
    reference: CBFacture.reference,
    amount: CBFacture.i_amount,
    montantTransfert: montantTransfert,
    currency: CBFacture.i_currency,
    o_currency: CBFacture.o_currency,
    montantTotal: CBFacture.amount,
    type: CBFacture.type,
    address: CBFacture.crypto_address,
    addressClient1: CBFacture.address,
    addressClient2: CBFacture.postalCode + ' ' + CBFacture.city,
    addressClient3: CBFacture.country,
    iban: CBFacture.platform === 'verifo' ? bank.verifo.iban : bank.zen.iban,
    bic: CBFacture.platform === 'verifo' ? bank.verifo.bic : bank.zen.bic,
    nameBank: CBFacture.platform === 'verifo' ? bank.verifo.name : bank.zen.name,

    order: utils.DateInvoice() + 'P',
    addressFlashhly: bank.flashlly.address,
    beneficiaire: bank.flashlly.beneficiaire,
    path: `./app/mailer/Facture/pdfFacture/invoice-flashlly.pdf`,
  };
  console.log('objFacture ===>', objFacture);
  for (let index = 0; index < 2; index++) {
    let goodMail = objFacture.e_courriel;
    if (index === 1) {
      goodMail = 'flashlly23@gmail.com';
    }

    const pdfDoc = pdfmake.createPdf(pdfObject(objFacture));
    pdfDoc.getBuffer((buffer: any) => {
      fs.writeFileSync(objFacture.path, buffer); // c'est le path de celui qui l'appel , et non de lui meme

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
        from: `Flashlly Team <${mailEmetteur}>`,
        to: goodMail,
        subject: '🎉 Les fonds vous ont été envoyés avec succès 🚀',
        attachments: [
          {
            filename: `Invoice-Flashlly-${objFacture.order}.pdf`,
            path: objFacture.path,
            contentType: 'application/pdf',
          },
        ],
        html: `
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Document</title>
          </head>
          <body
            style="
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;
            "
          >
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
                    alt=""
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
                    background-color: #ffffff;
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
                        <tr class="double-tab">
                          <td
                            colspan="2"
                            style="
                              text-align: center;
                              border-bottom: 0.1rem solid #cecece;
                              padding: 20px;
                            "
                          >
                          <img style="max-width: 100px; max-height: 100px;" src="https://landing.fra1.cdn.digitaloceanspaces.com/assets/checkMail.jpg" alt="">
                          
                            <p style="font-weight: 700;font-size: large;">Paiement effectué !</p>
                          </td>
                        </tr>
                        <tr></tr>
                        <tr>
                          <td
                            colspan="1"
                            style="
                              padding: 10px;
                              text-align: right;
                              border-bottom: 0.1rem solid #cecece;
                              width: 50%;
                            "
                          >
                            <p style="color: grey; font-size: 0.8rem">
                              <span
                                zeum4c7="PR_33_0"
                                data-ddnwab="PR_33_0"
                                aria-invalid="grammar"
                                class="Lm ng"
                                >Envoyé</span
                              >
                            </p>
                            <p style="font-size: 0.9rem">
                              ${objFacture.amount} ${objFacture.currency}
                            </p>
                          </td>
                          <td
                            colspan="1"
                            style="
                              padding: 5px;
                              text-align: left;
                              border-bottom: 0.1rem solid #cecece;
                            "
                          >
                            <p style="color: grey; font-size: 0.8rem">Recu</p>
                            <p style="font-size: 0.9rem">
                              ${objFacture.montantTransfert} ${objFacture.o_currency}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="2"
                            style="
                              padding: 20px;
                              text-align: left;
                              border-bottom: 0.1rem solid #cecece;
                              text-align: center;
                            "
                          >
                            <p style="color: grey; font-size: 0.8rem">Référence</p>
                            <p style="font-size: 0.9rem">${objFacture.reference}</p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="2"
                            style="
                              padding: 20px;
                              text-align: left;
                              border-bottom: 0.1rem solid #cecece;
                              text-align: center;
                            "
                          >
                            <p style="color: grey; font-size: 0.8rem">Received</p>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 20px; text-align: center">
                            <p style="color: grey; font-size: 0.8rem">Date</p>
                            <p style="font-size: 0.9rem">${formattedDate}UTC</p>
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
                      align="center"
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
        if (err) {
          console.log('mail ko');
          console.log('err =========>', err);
          cbretourneur('ko');
          return;
        } else {
          console.log('mail envoyE', info);

          numberMailSend += 1;

          if (numberMailSend === 2) {
            cbretourneur('les deux mails sont envoyes');
            return;
          }
        }
      });
    });
  }
};
