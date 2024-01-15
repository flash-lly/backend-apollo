import { cleanEnv, makeValidator, num, str } from 'envalid';
import { CONFIG_KEYS } from '../utils/global.types';

const validConfigKeys = Object.values(CONFIG_KEYS);

const configValidator = makeValidator<CONFIG_KEYS>((input) => {
  if (!validConfigKeys.includes(input as CONFIG_KEYS)) throw 'Invalid value for CONFIG';
  return input as CONFIG_KEYS;
});

export const configEnv = cleanEnv(process.env, {
  PORT: num(),
  TOKEN_SECRET_KEY: str(),
  CONFIG: configValidator(),

  DB_HOST: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  DB_PORT: num(),
});
