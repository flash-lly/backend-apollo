import dotenv from 'dotenv';
dotenv.config();

import { initApp } from './app/app';
import { connectToDb } from './app/config/sequelize';

initApp().then(() => {
  console.log(`It's work <3`);
});

connectToDb();
