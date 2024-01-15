import { PubSubTopics, pubsub } from '../../services/pubsub.service';

export const notificationsResolver = {
  Subscription: {
    notificationAdded: {
      subscribe: () => pubsub.asyncIterator([PubSubTopics.NOTIFICATION_ADDED]),
    },
  },
};
