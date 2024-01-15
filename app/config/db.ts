import fs from 'fs';
import mysql2 from 'mysql2';
import path from 'path';
import { configEnv } from './config.env';

const dirname = path.resolve();

export const pool = mysql2.createPool({
  host: configEnv.DB_HOST,
  user: configEnv.DB_USER,
  password: configEnv.DB_PASSWORD,
  database: configEnv.DB_NAME,
  port: configEnv.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(
      path.join(dirname, 'app', 'config', 'certificats', 'ca-certificate.crt'),
    ) as unknown as string,
  },
});