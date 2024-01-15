import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export enum PubSubTopics {
  NOTIFICATION_ADDED = 'NOTIFICATION_ADDED',
}
