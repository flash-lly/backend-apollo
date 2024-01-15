import { Request, Response } from 'express';
import { ResponseCodes } from '../../utils/responses';
import { v4 } from 'uuid';
import { notificationsService } from './notifications.service';
import { OldNotificationModel } from './notifications.old.model';

const oldNotificationModel = new OldNotificationModel();

export const notificationsController = {
  findAllNotifs: async (req: Request, res: Response) => {
    const notifications = await notificationsService.getNotifications();

    return res.send(notifications);
  },

  findNotifByIdOrder: (req: Request, res: Response) => {
    oldNotificationModel.getNotificationsByIdOrder(
      req.body.idOrders,
      (err: any, data: any) => {
        if (!err) return res.send(data);

        if (err.kind === 'not_found')
          return res.status(404).send({ message: ResponseCodes.NOT_FOUND });

        return res.status(500).send({ message: ResponseCodes.RETRIEVING_NOTIFICATION });
      },
    );
  },

  create: async (req: Request | any, res: Response) => {
    console.log("create notification open")
    const result = await notificationsService.createNotification({input: req.body});
    
    return res.status(result?.order_id ? 200 : 500 ).json({result})
  },

  // TODO: remove -- USELESS - this function is not used in any applications
  UpdateNotif: (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: ResponseCodes.CANNOT_EMPTY });

    // UserModel
    // NotificationModel.updateStatutMailByToken(req.body.token, (err: any, data: any) => {
    //   if (!err) return res.send(data);

    //   if (err.kind === 'not_found')
    //     return res.status(404).send({ message: ResponseCodes.NOT_FOUND });

    //   return res.status(500).send({ message: ResponseCodes.UPDATING });
    // });
  },
};
