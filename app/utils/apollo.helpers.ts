import { ExecutionArgs } from 'graphql';
import { Extra } from 'graphql-ws/lib/use/ws';
import { SubscribeMessage, Context } from 'graphql-ws';
import { verifyJwt } from './jwt';
import { ResponseCodes, ResponseStatuses } from './responses';
import { AppContext, GraphQLFormattedError } from './apollo.types';

export const apolloContext = async (
  ctx: Context<
    Record<string, unknown> | undefined,
    Extra & Partial<Record<PropertyKey, never>>
  >,
  msg: SubscribeMessage,
  args: ExecutionArgs,
) => {
  const context = {} as AppContext;

  if (typeof ctx.connectionParams?.authorization === 'string') {
    const token = ctx.connectionParams?.authorization.split(' ')[1];
    context.jwtUser = verifyJwt(token);
  }

  return context;
};

export const apolloFormatError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
) => {
  console.log('formattedError', formattedError);
  console.log('error', error);

  return {
    status: formattedError?.extensions?.code || ResponseStatuses.INTERNAL_SERVER_ERROR,
    message: formattedError?.message || ResponseCodes.INTERNAL_SERVER_ERROR,
    path: formattedError?.path || 'UNKONWN',
  } as any;
};
