import { CONFIG_KEYS } from '../utils/global.types';
import { configEnv } from './config.env';



type Config = {
  frontURL: string[];
  allowedIps: string[];
  backendAdmin: string[];
  expireToken: string;
  backendGeneral: string;
  SUMSUB_APP_TOKEN: string;
  SUMSUB_SECRET_KEY: string;
  venly: {
    credential: {
      grant_type: string;
      client_id: string;
      client_secret: string;
    };
    endPoint: {
      Auth: string;
      apiWallet: string;
    };
  };
};

type Configs = Required<Record<CONFIG_KEYS, Config>>;

const configs: Configs = {
  local: {
    frontURL: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    allowedIps: ['52.17.21.77/32', '54.204.227.227/32', '18.205.88.246/32', '::1'],
    backendAdmin: ['http://localhost:9000'],
    expireToken: '7d',
    backendGeneral: 'http://localhost:8000',
    SUMSUB_APP_TOKEN: 'prd:Zv3GJlWX0jJhnwCLTCiJfr8a.DrDvuSBESfsLoSnwnGevTIlYDhLdLLv3',
    SUMSUB_SECRET_KEY: '1W0f67P7QZPTiD6ennqiSNlXTORo4ugu',
    venly: {
      credential: {
        grant_type: 'client_credentials',
        client_id: 'Flashlly-capsule',
        client_secret: '0fafe7c9-8070-4655-9b90-545335d8aacf',
      },
      endPoint: {
        Auth: 'https://login-staging.arkane.network',
        apiWallet: 'https://api-wallet-staging.venly.io',
      },
    },
  },

  localprod: {
    frontURL: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    allowedIps: ['52.17.21.77/32', '54.204.227.227/32', '18.205.88.246/32', '::1'],
    backendAdmin: ['http://localhost:9000'],
    expireToken: '7d',
    backendGeneral: 'http://localhost:8000',
    SUMSUB_APP_TOKEN: 'prd:Zv3GJlWX0jJhnwCLTCiJfr8a.DrDvuSBESfsLoSnwnGevTIlYDhLdLLv3',
    SUMSUB_SECRET_KEY: '1W0f67P7QZPTiD6ennqiSNlXTORo4ugu',
    venly: {
      credential: {
        grant_type: 'client_credentials',
        client_id: '84c86933-b5d4-475f-b486-ca2ad74ccb70',
        client_secret: '3f19f8ac-f934-4bc3-bdf5-a11cfcaa7976',
      },
      endPoint: {
        Auth: 'https://login.venly.io',
        apiWallet: 'https://api-wallet.venly.io',
      },
    },
  },

  prod: {
    frontURL: [
      'https://admin-front-rp2m6.ondigitalocean.app',
      'https://seahorse-app-7j5m6.ondigitalocean.app',
      'https://crm.flashlly.io',
      'https://douglas.flashlly.io',
    ],
    // wert "35.156.184.88","10.244.43.150"
    // paybis '52.17.21.77/32', '54.204.227.227/32', '18.205.88.246/32'
    allowedIps: [
      '18.193.226.48',
      '52.17.21.77/32',
      '52.17.21.77',
      '54.204.227.227/32',
      '54.204.227.227',
      '18.205.88.246/32',
      '18.205.88.246',
      '191.96.138.29',
      '35.156.184.88',
      '10.244.43.150',
    ],
    backendAdmin:[ 'https://orca-app-4ymbs.ondigitalocean.app'],
    expireToken: '1d',
    backendGeneral: 'https://api.flashlly.com',
    SUMSUB_APP_TOKEN: 'prd:Zv3GJlWX0jJhnwCLTCiJfr8a.DrDvuSBESfsLoSnwnGevTIlYDhLdLLv3',
    SUMSUB_SECRET_KEY: '1W0f67P7QZPTiD6ennqiSNlXTORo4ugu',
    venly: {
      credential: {
        grant_type: 'client_credentials',
        client_id: '84c86933-b5d4-475f-b486-ca2ad74ccb70',
        client_secret: '3f19f8ac-f934-4bc3-bdf5-a11cfcaa7976',
      },
      endPoint: {
        Auth: 'https://login.venly.io',
        apiWallet: 'https://api-wallet.venly.io',
      },
    },
  },

  test: {
    frontURL: [
      'http://localhost:9000',
      'https://admin-front-rp2m6.ondigitalocean.app',
      'https://seahorse-app-7j5m6.ondigitalocean.app',
      'https://crm.flashlly.io',
      'https://douglas.flashlly.io',
    ],
    allowedIps: [
      '52.17.21.77/32',
      '54.204.227.227/32',
      '18.205.88.246/32',
      '191.96.138.29',
      '35.156.184.88',
      '10.244.43.150',
    ],
    backendAdmin: ['https://back-admin-test-itnjw.ondigitalocean.app'],
    expireToken: '1d',
    backendGeneral: 'https://api.flashlly.com',
    SUMSUB_APP_TOKEN: 'sbx:3SJFVE9t8GJGYCgpgU8l1mlr.qDV1tRLLLoPnT1iDZqbty3l59adptK5Z',
    SUMSUB_SECRET_KEY: 'Yr2AfgwmlwABs3dLZP5fKjrlqwGW3Wi4',
    venly: {
      credential: {
        grant_type: 'client_credentials',
        client_id: 'Flashlly-capsule',
        client_secret: '0fafe7c9-8070-4655-9b90-545335d8aacf',
      },
      endPoint: {
        Auth: 'https://login-staging.arkane.network',
        apiWallet: 'https://api-wallet-staging.venly.io',
      },
    },
  },

  testprod: {
    frontURL: [
      'http://localhost:9000',
      'https://admin-front-rp2m6.ondigitalocean.app',
      'https://seahorse-app-7j5m6.ondigitalocean.app',
      'https://crm.flashlly.io',
      'https://douglas.flashlly.io',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    allowedIps: [
      '52.17.21.77/32',
      '54.204.227.227/32',
      '18.205.88.246/32',
      '191.96.138.29',
      '35.156.184.88',
      '10.244.43.150',
    ],
    backendAdmin: ['https://orca-app-4ymbs.ondigitalocean.app'],
    expireToken: '1d',
    backendGeneral: 'https://api.flashlly.com',
    SUMSUB_APP_TOKEN: 'sbx:3SJFVE9t8GJGYCgpgU8l1mlr.qDV1tRLLLoPnT1iDZqbty3l59adptK5Z',
    SUMSUB_SECRET_KEY: 'Yr2AfgwmlwABs3dLZP5fKjrlqwGW3Wi4',
    venly: {
      credential: {
        grant_type: 'client_credentials',
        client_id: '84c86933-b5d4-475f-b486-ca2ad74ccb70',
        client_secret: '3f19f8ac-f934-4bc3-bdf5-a11cfcaa7976',
      },
      endPoint: {
        Auth: 'https://login.venly.io',
        apiWallet: 'https://api-wallet.venly.io',
      },
    },
  },
};

const config = configs[configEnv.CONFIG];

export { config };
