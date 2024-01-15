import axios from 'axios';
import { config } from '../config/config';

export const authVenly = async () => {
  const configHeaderVenly = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  let catchresponse;

  const responseFetch = await axios
    .post(
      `${config.venly.endPoint.Auth}/auth/realms/Arkane/protocol/openid-connect/token`,
      config.venly.credential,
      configHeaderVenly,
    )
    .then((response: any) => {
      const accessToken = response.data.access_token;
      return accessToken;
    })
    .catch((error: any) => {
      catchresponse = error;
      return catchresponse?.message;
    });

  return responseFetch;
};

export const createWallet = async (accessToken: any, walletInformation: any) => {
  let catchresponse;

  let returnFetch = await axios
    .post(
      `${config.venly.endPoint.apiWallet}/api/wallets`,
      JSON.stringify(walletInformation),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
    .then((walletResponse: any) => {
      console.log(walletResponse.data);
      return walletResponse.data;
    })
    .catch((error: any) => {
      catchresponse = error;
      return catchresponse?.message;
    });

  return returnFetch;
};

export const checkGas = async () => {
  let responseAccessToken = await authVenly();
  let catchresponse;

  if (responseAccessToken) {
    let objTransaction = {
      type: 'TRANSFER',
      secretType: 'MATIC',
      walletId: '97f297ca-3d87-4c48-b66f-88f1a9d50ff6',
      to: '0x2Eaf85AF290759770CF98BF83aa640DC2A63daDf',
      value: 10,
    };

    let returnFetch = await axios
      .post(
        `${config.venly.endPoint.apiWallet}/api/transactions/build`,
        JSON.stringify(objTransaction),
        {
          headers: {
            Authorization: `Bearer ${responseAccessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((walletResponse) => {
        return walletResponse.data;
      })
      .catch((error) => {
        catchresponse = error;
        return catchresponse?.message;
      });
    return returnFetch;
  }
};
