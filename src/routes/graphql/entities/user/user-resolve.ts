import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Shared } from '../../types/shared.js';
import { UserType } from './user-type.js';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { User } from '@prisma/client';

export const userResolve = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_, __, { prisma, loaders }: Shared, info: GraphQLResolveInfo) => {
      const parsedInfo = parseResolveInfo(info) as ResolveTree;
      const fields = parsedInfo?.fieldsByTypeName?.User || {};

      const include = {
        userSubscribedTo: Boolean('userSubscribedTo' in fields),
        subscribedToUser: Boolean('subscribedToUser' in fields),
      };

      const users = await prisma.user.findMany({ include });

      if (include.userSubscribedTo || include.subscribedToUser) {
        const usersMap = new Map<string, User>();
        users.forEach((user) => {
          usersMap.set(user.id, user);
        });
        users.forEach((user) => {
          if (user.userSubscribedTo) {
            loaders.userSubscribedToLoader.prime(
              user.id,
              user.userSubscribedTo.map((sub) => usersMap.get(sub.authorId) as User),
            );
          }
          if (user.subscribedToUser) {
            loaders.subscribedToUserLoader.prime(
              user.id,
              user.subscribedToUser.map((sub) => usersMap.get(sub.subscriberId) as User),
            );
          }
        });
      }
      return users;
    },
  },
  user: {
    type: UserType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_, args: { id: string }, { prisma }: Shared) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },
};
