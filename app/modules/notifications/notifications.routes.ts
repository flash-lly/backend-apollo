import { notificationsController } from './notifications.controller';
import express from 'express';
import { auth } from '../../middleware/auth';

const notificationsRouter = express.Router();

notificationsRouter.get('/all', auth, notificationsController.findAllNotifs);

notificationsRouter.post(
  '/NotifIdOrder',
  auth,
  notificationsController.findNotifByIdOrder,
);

// TODO: remove -- USELESS - this function is not used in any applications
notificationsRouter.post('/add',auth, notificationsController.create);

// TODO: remove -- USELESS - this function is not used in any applications
notificationsRouter.get('/updateIsRead', auth, notificationsController.UpdateNotif);

export { notificationsRouter };
