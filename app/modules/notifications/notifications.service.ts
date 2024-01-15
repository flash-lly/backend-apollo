import { Error } from 'sequelize';
import { PubSubTopics, pubsub } from '../../services/pubsub.service';
import {
  createNotificationValidation,
  CreateNotificationArgs,
} from './notifications.inputs';
import { NotificationModel } from './notifications.model';
import { v4 } from 'uuid';

export const notificationsService = {
  getNotifications: async () => {
    try {
      const notifications = await NotificationModel.findAll({
        where: { is_read: 0 },
        order: [['date', 'DESC']],
      });

      return notifications.map(({ dataValues }) => dataValues);
    } catch (error) {
      return error;
    }
  },

  createNotification: async ({ input }: CreateNotificationArgs): Promise<any> => {
    try {
      const notificationData = await createNotificationValidation.validate(input);

      const notification = await NotificationModel.create({
        ...notificationData,
        date:
          notificationData.date ||
          new Date().toISOString().slice(0, 19).replace('T', ' '),
        idnotifications: v4(),
        is_read: 0,
      });

      pubsub.publish(PubSubTopics.NOTIFICATION_ADDED, {
        notificationAdded: 'Created',
      });

      return notification.dataValues;
    } catch (error: Error | any) {
      return error;
    }
  },
};
