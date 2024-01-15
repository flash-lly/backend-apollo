import { Request } from 'express';
import { UserJwtPayload } from './jwt';

export interface AppRequest extends Request {
  token?: UserJwtPayload;
}

export enum CONFIG_KEYS {
  LOCAL = 'local',
  LOCALPROD = 'localprod',
  PROD = 'prod',
  TEST = 'test',
  TESTPROD = 'testprod',
}
