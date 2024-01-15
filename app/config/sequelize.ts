import { Options, Sequelize } from 'sequelize';
import { configEnv } from './config.env';

export const sequelize = new Sequelize(
  configEnv.DB_NAME,
  configEnv.DB_USER,
  configEnv.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: configEnv.DB_HOST,
    port: configEnv.DB_PORT,
  } as Options,
);

export const connectToDb = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Sequelize connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
