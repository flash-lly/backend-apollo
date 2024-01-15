import { config as configVar } from '../config/config';
import axios from 'axios';
import crypto from 'crypto';
import FormData from 'form-data';

const SUMSUB_BASE_URL = 'https://api.sumsub.com';

var config: any = {};
config.baseURL = SUMSUB_BASE_URL;

function createSignature(config: any) {
  console.log('Creating a signature for the request...Testing...');
  console.log('analyse de config : ', config);
  var ts = Math.floor(Date.now() / 1000);
  console.log('ts', ts);
  const signature = crypto.createHmac('sha256', configVar.SUMSUB_SECRET_KEY);
  console.log('signature', signature);
  signature.update(ts + config.method.toUpperCase() + config.url);
  console.log('avant le if sign deja update : ', signature);

  if (config.data instanceof FormData) {
    console.log('premier if avec FormData');
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    console.log('second else if');
    signature.update(config.data);
  }

  console.log('fin des ifs');
  config.headers['X-App-Access-Ts'] = ts;
  console.log(" apres config.headers['X-App-Access-Ts'] = ts;");
  config.headers['X-App-Access-Sig'] = signature.digest('hex');
  console.log(" apres config.headers['X-App-Access-Sig'] = signature.digest('hex');");
  console.log('fin create a signature..');
  return config;
}

function createApplicant(externalUserId: any, levelName: any) {
  console.log('Creating an applicant...');

  var method = 'post';
  var url = '/resources/applicants?levelName=' + levelName;
  var ts = Math.floor(Date.now() / 1000);

  var body = {
    externalUserId: externalUserId,
  };

  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-App-Token': configVar.SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(body);

  return config;
}

function CreateTransaction(applicantId: any, ObjDataKYT: any) {
  console.log('Create transaction ... ');
  console.log(
    'argument CreateTransaction : applicantId ',
    applicantId,
    ' ObjDataKyt : ',
    ObjDataKYT,
  );
  console.log(' ObjDataKyt : ', ObjDataKYT);
  var method = 'post';
  var url = `/resources/applicants/${applicantId}/kyt/txns/-/data`;

  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-App-Token': configVar.SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(ObjDataKYT);

  return config;
}

function createAccessToken(externalUserId: any, levelName = 'New-One', ttlInSecs = 600) {
  console.log('Creating an access token for initializng SDK...');

  var method = 'post';
  var url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;

  var headers = {
    Accept: 'application/json',
    'X-App-Token': configVar.SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
}

// bien verifier qu'on recoit ces trois arguments , et il faudra creer ObjDataKYT de toute pieces

export const createCheckTransaction = async (
  externalUserId: any,
  applicantId: any,
  ObjDataKYT: any,
) => {
  console.log('ObjDataKYT', ObjDataKYT);
  console.log('externalUserId', externalUserId);
  console.log('applicantId', applicantId);
  let levelName = 'New-One';
  console.log('CreateCheckTransaction ??? ');
  try {
    await axios(createSignature(createAccessToken(externalUserId, levelName, 1200)));

    let response = await axios(
      createSignature(CreateTransaction(applicantId, ObjDataKYT)),
    );
    console.log('Response createSignature:\n', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Error:\n', error.response.data);
    throw error; // Propager l'erreur à l'appelant
  }
};
