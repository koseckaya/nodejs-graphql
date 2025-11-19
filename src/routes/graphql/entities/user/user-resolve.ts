import { GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Shared } from '../../types/shared.js';
import { UserType } from './user-type.js';

export const userResolve = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_, __, { prisma }: Shared) => {
      return await prisma.user.findMany();
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
